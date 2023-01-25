import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from '../model/users.js';
import enviarMail from '../utils/EmailSender.js';
import logger from '../logs/Loggers.js';
import CarritosDaosMongoDb from './../daos/carritos/CarritosDaosMongoDb.js';
import { sendWhatsapp, sendSms } from '../utils/Twilio.js';

const carrito = new CarritosDaosMongoDb();
const salt = bcrypt.genSaltSync(10);

passport.use(
    'sign-in',
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        (email, password, done) => {
            UserModel.findOne({ email })
                .then((user) => {
                    if (!user) {
                        logger.warn(
                            `User with ${email} not found.`
                        );

                        return done(null, false, {
                            message: `El usuario ${email} no fue encontrado`,
                        });
                    }

                    if (
                        !bcrypt.compareSync(password, user.password)
                    ) {
                        logger.warn('Invalid Password');

                        return done(null, false, {
                            message: 'Contraseña invalida',
                        });
                    }
                    done(null, user);
                })
                .catch((error) => {
                    logger.error('Error in login\n', error.message);
                    done(error);
                });
        }
    )
);

passport.use(
    'sign-up',
    new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            UserModel.findOne({ email })
                .then((user) => {
                    if (user) {
                        logger.warn(
                            `User ${email} already exists.`
                        );

                        return done(null, false);
                    } else {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(
                            req.body.password,
                            salt
                        );
                        req.body.password = hash;
                        req.body.avatar = `../img/avatar/${req.file.filename}`;

                        sendWhatsapp(
                            `
                                          Nuevo Registro
                              
                                          Email:${req.body.email}
                                          Nombre:${req.body.nombre}
                                          Direccion:${req.body.direccion}
                                          Avatar:${req.body.avatar}
                                          Edad:${req.body.edad}
                                          Telefono:${req.body.telefono}
                                          `,
                            process.env.TEL_ADMIN
                        );

                        sendSms(
                            `
                                          Nuevo Registro
                              
                                          Email:${req.body.email}
                                          Nombre:${req.body.nombre}
                                          Direccion:${req.body.direccion}
                                          Avatar:${req.body.avatar}
                                          Edad:${req.body.edad}
                                          Telefono:${req.body.telefono}
                                          `,
                            '+541123374410'


                        );


                        enviarMail(
                            'Nuevo registro',
                            `<div>
                                         <h1>Datos Nuevo Registro</h1>
                              <ul>
                              <li>Email:${req.body.email}</li>
                              <li>Nombre:${req.body.nombre}</li>
                              <li>Direccion:${req.body.direccion}</li>
                              <li>Avatar:${req.body.avatar}</li>
                              <li>Edad:${req.body.edad}</li>
                              <li>Telefono:${req.body.telefono}</li>
                              </ul> 
                                          </div>`
                        );
                        carrito.newCart(req.body.email);
                        return UserModel.create(req.body);
                    }
                })
                .then((newUser) => {
                    if (newUser) {
                        logger.info(
                            `User ${newUser.email} registration succesful.`
                        );

                        done(null, newUser);
                    } else {
                        logger.warm(newUser);
                        throw new Error('User already exists');
                    }
                })
                .catch((error) => {
                    logger.error('Error in sign-up', error.message);
                    return done(error);
                });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    UserModel.findOne({ _id })
        .then((user) => done(null, user))
        .catch(done);
});

export default passport;
