const functions = require('firebase-functions');
// Requerimos Firebase Admin
const firebase = require('firebase-admin');
// Creamos un archivo con nuestra configuración.
const config = require('./firebase-config.json');

firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://patitas-online.firebaseio.com",
});

exports.api =  functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const data = firebase.database().ref('/pets');

    if(req.method === 'GET'){
        data.on('value', (snapshot) =>{
            const parseData = Object.keys(snapshot.val() || {}).map(key => snapshot.val()[key]);
            res.json(parseData);
        })
    }
});