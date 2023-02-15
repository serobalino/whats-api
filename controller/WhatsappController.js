const {logConversation, readOption} = require("./ConversationController");

const readTiming = [1000, 30000];
const typingTiming = [1000, 5000];
const nextMessage = [100, 2000];

const listenMessages = (client) => {
    client.onMessage((message) => {
        setRead(client, message, ()=>{
            readyToReply(client, message, async () => {
                logConversation(message);
                const questions = await readOption(message);
                client.sendText(message.from, parseQueryToMsg(questions));
                let buttons = [
                    {
                        url: 'https://orkestral.io/',
                        text: 'Prueba de link'
                    },
                    {
                        phoneNumber: '+55 11 91438-0641',
                        text: 'Suporte Orkestral'
                    },
                    {
                        id: '1',
                        text: 'Button 1'
                    }
                ];
                client.sendButtons(message.from, "Title", buttons, "Description").catch((e)=>{
                    console.log('err',e)
                })
            })
        });
    }).catch();
};

const readyToReply = (client, message,callback) => {
    setTimeout(()=>{
        client.stopTyping(message.from);
        callback();
    }, getRnd(typingTiming[0], typingTiming[1]))
}

const setRead = (client, message, callback) => {
    setTimeout(() => {
        client.sendSeen(message.from);
        client.startTyping(message.from);
        callback()
    }, getRnd(readTiming[0], readTiming[1]))
}

const addExit = (msg) => {
    return msg.concat('\n*0* Para regresar el menú anterior');
}

const parseQueryToMsg = (list=[],key='question_qu') => {
    return list.map((j,i)=>'*'+(i+1)+'* '+j[key]).join('\n')
}

const getRnd = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
    listenMessages,
};
