const bcrypt = require("bcryptjs");


const saltAndHashPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports.saltAndHashPassword = saltAndHashPassword;
module.exports.comparePasswords = comparePasswords;