const Content = require('../models/content')


exports.getById = async (req, res) => {
    const { id } = req.params;

    const content = await Content.findOne({
        where: { id }
    });
    if (!content) {
        return res.status(404).send({
            message: `No content found with the id ${id}`,
        });
    }

    return res.status(200).send(content);
};

exports.getAll = async (req, res) => {
    const contents = await Content.findAll();

    if (!contents) {
        return res.status(404).send({
            message: `No contents found.`,
        });
    }

    return res.status(200).send(contents);
};

exports.create = async (req, res) => {
    const { name, description, file } = req.body;

    // Checks if the content fields exists. 
    if (!name || !description || !file) {
        return res.status(400).send({
            message: "You need to fill in the content name.",
        });
    }


    // Create content
    try {

        let newContent = await Content.create({
            name,
            description,
            file
        });
        return res.status(201).send(newContent);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { name, description, file } = req.body;

    const { id } = req.params;

    const content = await Content.findOne({ where: { id } });

    if (!content) {
        return res.status(400).send({
            message: `No content exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            content.name = name;
        }
        if (description) {
            content.description = description;
        }
        if (file) {
            content.file = file;
        }

        content.save();
        return res.status(200).send({
            message: `Content ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the content you are trying to delete.` });


    const content = await Content.findOne({ where: { id } });

    if (!content) {
        return res.status(400).send({ message: `No content exists with the id ${id}` });
    }

    try {
        await content.destroy();
        return res.status(204).send({ message: `Content ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};