const {Conversation} = require("../models");
const {getQuestions} = require("./QuestionsController");

const logConversation = async (message, question=null) => {
    const last = await Conversation.findAll({
        limit: 1,
        where: {
            from_co: message.from,
        },
        order: [ [ 'createdAt', 'DESC' ]]
    })
    await Conversation.create({
        from_co: message.from,
        answer_co: message.body,
        question_co: question?.id_qu,
    });
    return last;
};

const readOption = async ({body}) => {
    return await getQuestions(body);
}

module.exports = {
    logConversation,
    readOption
};
