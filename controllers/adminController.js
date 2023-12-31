const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const UserTemporary = require("../models/userTemporaryModel");
const Question = require("../models/questionModel");
const login = async (req, res) => {
    if (res.auth) {
        const users = await User.find();
        const user = await User.findOne({ _id: req.user.id });
        const usertemporarys = await UserTemporary.find();
        res.render("admin/manager_account", { user: user, users: users, usertemporarys: JSON.stringify(usertemporarys) });

    } else {
        res.render("admin/login");
    }
    res.end();
};
const manageraccount = async (req, res) => {
    if (res.auth) {
        const users = await User.find();
        const user = await User.findOne({ _id: req.user.id });
        const usertemporarys = await UserTemporary.find();
        res.render("admin/manager_account", { user: user, users: users, usertemporarys: JSON.stringify(usertemporarys) });

    } else {
        res.render("admin/login");
    }
    res.end();
}
const managerquestions = async (req, res) => {
    if (res.auth) {
        const user = await User.findOne({ _id: req.user.id });
        const questions = await Question.find();
        const typeLanguageLevels = [];
        questions.forEach((question) => {
            const { typeLanguage, level } = question;

            // Kiểm tra xem typeLanguage đã tồn tại trong mảng typeLanguageLevels chưa
            const existingTypeLanguage = typeLanguageLevels.find((item) => item.typeLanguage === typeLanguage);

            if (existingTypeLanguage) {
                if (!existingTypeLanguage.levels.includes(level)) {
                    existingTypeLanguage.levels.push(level);
                }
            } else {
                typeLanguageLevels.push({
                    typeLanguage,
                    levels: [level],
                });
            }
        });

        console.log(typeLanguageLevels);
        res.render("admin/manager_questions", { user: user, questions: questions, typeLanguageLevels: typeLanguageLevels });

    } else {
        res.render("admin/login");
    }
    res.end();
}
module.exports = { login, manageraccount, managerquestions };