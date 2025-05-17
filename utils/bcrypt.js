const bcrypt = require("bcrypt");

exports.getHashedPassword = async(password) => {
    return bcrypt.hash(password, 14);
}

exports.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}