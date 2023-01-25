const venom = require('venom-bot');

venom.create().then((client) => start(client));

function start(client) {
    client.onMessage((message) => {
        if (message.body === 'Hi') {
            client.startTyping(message.from);
            console.log(message);
            setTimeout(()=>{
                client.stopTyping(message.from);
                client.sendText(message.from, 'Hola como stas');
            },5000)
        }
    });
}
