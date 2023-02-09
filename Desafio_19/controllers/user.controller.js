import UserService from '../services/user.service.js';

class UserController {
      constructor() {}
      async getUserByEmail(email) {
            const user = await UserService.getUserByEmail(email);
            return user;
      }
      async newUser(data) {
            const user = await UserService.newUser(data);
            return user;
      }
      async userById(id) {
            const user = await UserService.userById(id);
            return user;
      }
      async logginUser(req, res) {
            await UserService.logginUser(req, res);
      }
      async logoutUser(req, res) {
            await UserService.logoutUser(req, res);
      }
}

export default new UserController();
