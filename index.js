require('dotenv/config');
const express = require('express');
const venom = require("venom-bot");
const app = express();
let clienteVenom = null;

function start(client) {
    clienteVenom = client;
    client.onMessage((message) => {
        if (message.body === 'Hi') {
            client.startTyping(message.from);
            console.log(message);
            setTimeout(() => {
                client.stopTyping(message.from);
                client.sendText(message.from, 'Hola como stas');
            }, 5000)
        }
    });
}

app.get('/init', async function (req, res) {
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
    ).then((client) => start(client));
    res.send(aux);
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
    res.send('Hello World! '+process.env.VARIABLE_A+ !!clienteVenom);
});

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!');
});
