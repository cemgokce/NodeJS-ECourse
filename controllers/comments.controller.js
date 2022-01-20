const Comment = require('../models/comment')


exports.getById = async (req, res) => {
    const { id } = req.params;

    const comment = await Comment.findOne({
        where: { id }
    });
    if (!comment) {
        return res.status(404).send({
            message: `No comment found with the id ${id}`,
        });
    }

    return res.status(200).send(comment);
};

exports.getAll = async (req, res) => {
    const comments = await Comment.findAll();

    if (!comments) {
        return res.status(404).send({
            message: `No comments found.`,
        });
    }

    return res.status(200).send(comments);
};

exports.create = async (req, res) => {
    const { name } = req.body;

    // Checks if the comment fields exists. 
    if (!name) {
        return res.status(400).send({
            message: "You need to fill in the comment name.",
        });
    }

    // Checks if the comment name exists
    let commentExists = await Comment.findOne({
        where: { name }
    });
    if (commentExists) return res.status(400).send({ message: `A comment named ${name} already exists!` });

    // Create comment
    try {

        let newComment = await Comment.create({
            name
        });
        return res.status(201).send(newComment);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { name } = req.body;

    const { id } = req.params;

    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
        return res.status(400).send({
            message: `No comment exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            comment.name = name;
        }

        comment.save();
        return res.status(200).send({
            message: `Comment ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the comment you are trying to delete.` });


    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
        return res.status(400).send({ message: `No comment exists with the id ${id}` });
    }

    try {
        await comment.destroy();
        return res.status(204).send({ message: `Comment ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};