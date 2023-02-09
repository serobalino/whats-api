const {Question} = require("../models");

const getQuestions = async (number=null) => {
    let nrm = null;
    if (number>0){
        nrm=number;
    }
    return await Question.findAll({
        where: {
            sub_questions: nrm
        }
    });
};

module.exports = {
    getQuestions,
};
