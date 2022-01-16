const UserRole = require('../models/userRole')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const userRole = await UserRole.findOne({
        where: { id }
    });
    if (!userRole) {
        return res.status(404).send({
            message: `No userRole found with the id ${id}`,
        });
    }

    return res.status(200).send(userRole);
};

exports.getAll = async (req, res) => {
    const userRoles = await UserRole.findAll();

    if (!userRoles) {
        return res.status(404).send({
            message: `No userRole found.`,
        });
    }

    return res.status(200).send(userRoles);
};

exports.create = async (req, res) => {
    const { userId, roleId } = req.body;

    // Checks if the userRole fields exists. 
    if (!userId || !roleId) {
        return res.status(400).send({
            message: "You need to fill in the roleId and userId.",
        });
    }

    // Create userRole
    try {

        let newUserRole = await UserRole.create({
            roleId,
            userId
        });
        return res.status(201).send(newUserRole);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {

    const { roleId, userId } = req.body;

    const { id } = req.params;

    // Checks if the userRole fields exists. 
    if (!userId || !roleId) {
        return res.status(400).send({
            message: "You need to fill in the roleId and userId.",
        });
    }

    const userRole = await UserRole.findOne({ where: { id } });

    if (!userRole) {
        return res.status(400).send({
            message: `No userRole exists with the id ${id}`,
        });
    }

    try {

        userRole.userId = userId;
        userRole.roleId = roleId;

        userRole.save();
        return res.status(200).send({
            message: `UserRole ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the userRole you are trying to delete.` });


    const userRole = await UserRole.findOne({ where: { id } });

    if (!userRole) {
        return res.status(400).send({ message: `No userRole exists with the id ${id}` });
    }

    try {
        await userRole.destroy();
        return res.status(204).send({ message: `UserRole ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};