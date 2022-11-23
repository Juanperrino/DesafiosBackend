import admin from 'firebase-admin';
// import { assert } from 'joi';
import serviceAccount from './CONFIG_DB.json' assert{type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const conect = async () => {
    try {
        const db = admin.firestore();
        console.log('FIREBASE CONECTADO')
        return db
    } catch (error) {
        console.log('ERROR AL CONECTAR A FIREBASE');
    }
}

export { conect };