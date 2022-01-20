require("dotenv").config();
const UserRole = require("../models/userRole");
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
const { saltAndHashPassword, comparePasswords } = require("../utils/password");
const { registerValidation, loginValidation } = require("../utils/validation");


exports.register = async (req, res) => {

    // Validate user object
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body)
    const { firstName, lastName, email, password, rolestatus } = req.body;

    // Check if the user is already in the database
    let userEmailExists = await User.findOne({ where: { email } });
    if (userEmailExists) return res.status(400).send({ message: `A user with the email ${email} already exists!` });

    // Hash password
    const hashedPassword = await saltAndHashPassword(password);

    // Create & Save & Authorize User
    try {
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        console.log(newUser)
        // Give default role to the user (authorization concept)
        if (!rolestatus) {
            await setStudentRole(newUser.id);
        } else {
            await setTeacherRole(newUser.id);
        }
        console.log(newUser);

        return res.status(201).send(newUser); // TODO: { user: newUser.id } - best way is to send activation mail, then assign the default user role.
    } catch (err) {
        return res.status(500).send({ message: `Error : ${err.message}` });
    }
};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    // Validate user object
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email exists
    let user = await User.findOne({ //TODO: fetch user roles within these block
        // include: [
        //     {
        //         model: UserRole,
        //         attributes: ["roleId"],
        //         include: [{model: Role, attributes:["name"]}],
        //     },
        // ],
        where: { email },
    });
    if (!user) return res.status(400).send({ message: `Email or password is wrong.` });

    // Check if the password correct
    const validPass = await comparePasswords(password, user.password);
    if (!validPass) return res.status(400).send({ message: `Invalid password.` });

    // Get user claims
    const roles = await getClaims(user.id);
    // Create & assign a token
    const token = jwt.sign(
        { uii: user.id, roles: roles, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXP }
    );

    res.header('Authorization', `Bearer ${token}`).status(200).send({ token: `Bearer ${token}` });

};

const setStudentRole = async (userId) => {
    var studentRole = await Role.findOne({
        where: { name: "Student" }
    });
    let newUserRole = await UserRole.create({
        userId: userId,
        roleId: studentRole.id
    });
    console.log(newUserRole);
}

const setTeacherRole = async (userId) => {
    var teacherRole = await Role.findOne({
        where: { name: "Teacher" }
    });
    let newUserRole = await UserRole.create({
        userId: userId,
        roleId: teacherRole.id
    });
    console.log(newUserRole);
}

const getClaims = async (userId) => {

    const userRoles = await UserRole.findAll({
        where: { userId },
        attributes: ["roleId"],
        include: { model: Role }     // Includes Roles table and selects name field only. 
    });

    console.log("getClaims");
    console.log(userRoles);
    return userRoles;
}