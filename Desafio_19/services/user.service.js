import { User } from '../models/daos/index.js';

class UserService {
      constructor() {}
      async getUserByEmail(email) {
            const user = await User.getUserByEmail(email);
            return user;
      }

      async newUser(data) {
            const user = await User.postItem(data);
            return user;
      }
      async userById(id) {
            const user = await User.getById(id);
            return user;
      }
      async logginUser(req, res) {
            if (!req.isAuthenticated()) {
                  res.render('login');
            } else {
                  const { user } = req;
                  let data = { user: user.email };
                  res.render('home', data);
            }
      }
      async logoutUser(req, res) {
            const { username } = req.body;
            req.logout((error) => {
                  if (!error) {
                        let data = { user: username };
                        res.render('logout', data);
                  } else {
                        logger.error(
                              `Ruta ${req.originalUrl} metodo POST, ${error.message}`
                        );
                        res.send('Ocurrio un  error', error.message);
                  }
            });
      }
}
export default new UserService();
