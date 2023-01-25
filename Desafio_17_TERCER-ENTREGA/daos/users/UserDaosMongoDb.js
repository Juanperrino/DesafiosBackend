import UsersModel from '../../model/users.js';
import ContenedorMongoDb from '../../db/ContenedorMongoDb.js';

class UsersDaosMongoDb extends ContenedorMongoDb {
    constructor() {
        super(UsersModel);
    }
}
export default UsersDaosMongoDb;
