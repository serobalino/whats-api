require('dotenv/config');
const express = require('express');
const venom = require("venom-bot");
const {listenMessages} = require("./controller/WhatsappController");
const app = express();
let clienteVenom = null;

const PORT = process.env.PORT || 3000;

function start(client) {
    clienteVenom = client;
    listenMessages(client);
}

app.get('/init', async function (req, res) {
    if(!clienteVenom){
        let aux = await venom.create(
            'session',
            (base64Qr, asciiQR, attempts, urlCode) => {
                const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
                if (matches.length !== 3) {
                    return new Error('Invalid input string');
                }
                response.type = matches[1];
                response.data = new Buffer.from(matches[2], 'base64');
                res.writeHead(200, {
                    'Content-Type': matches[1],
                    'Content-Length': response.data.length
                });
                res.end(response.data);

            },
            (statusSession, session) => {
                console.log('Status Session: ', statusSession);
                //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
                //Create session wss return "serverClose" case server for close
                console.log('Session name: ', session);
            },
            {logQR: false}
        ).then((client) => {
            start(client)
            res.send('Ready!!!! '+ new Date());
        }).catch((e)=>console.log('Error al crear instacia',e));
    }else{
        res.send('Ya tienes iniciada una sesión');
    }
});

app.get('/', function (req, res) {
    if(clienteVenom){
        clienteVenom
            .sendText('593995764837@c.us', '👋 Hello from venom!')
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
    }
    res.send('Hello World! '+PORT+ !!clienteVenom);
});

app.listen(PORT, function () {
    console.log('Está arriba la aplicación! {'+PORT+'} ');
});
