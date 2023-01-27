require('dotenv/config');
const express = require('express');
const venom = require("venom-bot");
const app = express();
let clienteVenom = null;

const PORT = process.env.PORT || 3000;

function start(client) {
    clienteVenom = client;
    client.onMessage((message) => {
        if (message.body === 'Hi') {
            client.startTyping(message.from);
            setTimeout(() => {
                client.stopTyping(message.from);
                client.sendText(message.from, 'Hola como stas');
            }, 5000)
        }
    }).catch();
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
            undefined,
            {logQR: false}
        ).then((client) => start(client)).catch((e)=>console.log('Error al crear instacia',e));
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
    console.log('Está arriba la aplicación!');
});
