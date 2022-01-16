const Role = require('../models/Role')


exports.getById = async (req, res) => {
    const { id } = req.params;
    const role = await Role.findOne({
        where: { id }
    });
    if (!role) {
        return res.status(404).send({
            message: `No role found with the id ${id}`,
        });
    }

    return res.status(200).send(role);
};

exports.getAll = async (req, res) => {
    const roles = await Role.findAll();

    if (!roles) {
        return res.status(404).send({
            message: `No role found.`,
        });
    }

    return res.status(200).send(roles);
};

exports.create = async (req, res) => {
    const { name } = req.body;

    // Checks if the role fields exists. 
    if (!name) {
        return res.status(400).send({
            message: "You need to fill in the role name.",
        });
    }

    // Checks if the role name exists
    let roleExists = await Role.findOne({
        where: { name }
    });
    if (roleExists) return res.status(400).send({ message: `A role with the email ${name} already exists!` });

    // Create role
    try {
        let newRole = await Role.create({
           name
        });
        return res.status(201).send(newRole);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {

    const { name } = req.body;

    const { id } = req.params;

    const role = await Role.findOne({ where: { id } });

    if (!role) {
        return res.status(400).send({
            message: `No role exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            role.name = name;
        }        
        role.save();
        return res.status(200).send({
            message: `Role ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the role you are trying to delete.` });

    const role = await Role.findOne({ where: { id } });

    if (!role) {
        return res.status(400).send({ message: `No role exists with the id ${id}` });
    }

    try {
        await role.destroy();
        return res.status(204).send({ message: `Role ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};