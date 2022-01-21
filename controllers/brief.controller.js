const Brief = require('../models/brief')


exports.getById = async (req, res) => {
    const { id } = req.params;

    const brief = await Brief.findOne({
        where: { id }
    });
    if (!brief) {
        return res.status(404).send({
            message: `No brief found with the id ${id}`,
        });
    }

    return res.status(200).send(brief);
};

exports.getAll = async (req, res) => {
    const briefs = await Brief.findAll();

    if (!briefs) {
        return res.status(404).send({
            message: `No brief found.`,
        });
    }

    return res.status(200).send(briefs);
};

exports.create = async (req, res) => {
    const { name } = req.body;

    // Checks if the brief fields exists. 
    if (!name) {
        return res.status(400).send({
            message: "You need to fill in the brief name.",
        });
    }

    
    // Create brief
    try {

        let newBrief = await Brief.create({
            name
        });
        return res.status(201).send(newBrief);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { name } = req.body;

    const { id } = req.params;

    const brief = await Brief.findOne({ where: { id } });

    if (!brief) {
        return res.status(400).send({
            message: `No brief exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            brief.name = name;
        }

        brief.save();
        return res.status(200).send({
            message: `Brief ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the brief you are trying to delete.` });


    const brief = await Brief.findOne({ where: { id } });

    if (!brief) {
        return res.status(400).send({ message: `No brief exists with the id ${id}` });
    }

    try {
        await brief.destroy();
        return res.status(204).send({ message: `Brief ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};