const Rate = require('../models/rate')


exports.getById = async (req, res) => {
    const { id } = req.params;

    const rate = await Rate.findOne({
        where: { id }
    });
    if (!rate) {
        return res.status(404).send({
            message: `No rate found with the id ${id}`,
        });
    }

    return res.status(200).send(rate);
};

exports.getAll = async (req, res) => {
    const rates = await Rate.findAll();

    if (!rates) {
        return res.status(404).send({
            message: `No rates found.`,
        });
    }

    return res.status(200).send(rates);
};

exports.create = async (req, res) => {
    const { point } = req.body;

    // Checks if the rate fields exists. 
    if (!point) {
        return res.status(400).send({
            message: "You need to fill in the rate name.",
        });
    }

    // Checks if the rate name exists
    let contentExists = await Rate.findOne({
        where: { point }
    });
    if (contentExists) return res.status(400).send({ message: `A rate named ${name} already exists!` });

    // Create rate
    try {

        let newContent = await Rate.create({
            name
        });
        return res.status(201).send(newContent);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { name } = req.body;

    const { id } = req.params;

    const rate = await Rate.findOne({ where: { id } });

    if (!rate) {
        return res.status(400).send({
            message: `No rate exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            rate.name = name;
        }

        rate.save();
        return res.status(200).send({
            message: `Rate ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the rate you are trying to delete.` });


    const rate = await Rate.findOne({ where: { id } });

    if (!rate) {
        return res.status(400).send({ message: `No rate exists with the id ${id}` });
    }

    try {
        await rate.destroy();
        return res.status(204).send({ message: `Rate ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};