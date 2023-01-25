/*Verificacion para saber si el usuario es admin o cliente*/
const controlUser = async (user, url, metodo) => {
    let admin = user == 'true';

    if (!admin || admin.length === 0) {
        let response = {
            codigo: 401,
            descripcion: `ruta ${url}`,
            método: metodo,
            autorizado: 'no autorizado',
        };
        return response;
    } else {
        let response = {
            codigo: 200,
            descripcion: `ruta ${url}`,
            método: metodo,
            autorizado: 'autorizado',
        };
        return response;
    }
};
export default controlUser;
