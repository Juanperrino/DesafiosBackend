import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import userController from '../controllers/user.controller.js';
import logger from '../helpers/logger.js';

const salt = bcrypt.genSaltSync(10);
passport.use(
      'sign-in',
      new LocalStrategy(
            {
                  usernameField: 'email',
            },
            (email, password, done) => {
                  userController
                        .getUserByEmail(email)
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
                              logger.error(`Error in login , ${error.message}`);
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
                  userController
                        .getUserByEmail(email)
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

                                    return userController.newUser(req.body);
                              }
                        })
                        .then((newUser) => {
                              if (newUser) {
                                    logger.info(
                                          `User ${newUser.email} registration succesful.`
                                    );

                                    done(null, newUser);
                              } else {
                                    throw new Error('User already exists');
                              }
                        })
                        .catch((error) => {
                              logger.error(
                                    `Error in sign-up , ${error.message}`
                              );
                              return done(error);
                        });
            }
      )
);

passport.serializeUser((user, done) => {
      done(null, user._id);
});

passport.deserializeUser((_id, done) => {
      userController
            .userById(_id)
            .then((user) => done(null, user))
            .catch(done);
});

export default passport;
