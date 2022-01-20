const CourseComment = require('../models/courseComments')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const courseComment = await CourseComment.findOne({
        where: { id }
    });
    if (!courseComment) {
        return res.status(404).send({
            message: `No courseComment found with the id ${id}`,
        });
    }

    return res.status(200).send(courseComment);
};

exports.getAll = async (req, res) => {
    const courseComments = await CourseComment.findAll();

    if (!courseComments) {
        return res.status(404).send({
            message: `No courseComments found.`,
        });
    }

    return res.status(200).send(courseComments);
};

exports.create = async (req, res) => {
    const { courseId, commentId } = req.body;

    // Checks if the courseComment fields exists. 
    if (!courseId || !commentId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and rateId.",
        });
    }

    // Create courseComment
    try {

        let newComment = await CourseComment.create({
            courseId,
            commentId
        });
        return res.status(201).send(newComment);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { courseId, commentId } = req.body;

    const { id } = req.params;

    // Checks if the courseComment fields exists. 
    if (!courseId || !commentId) {
        return res.status(400).send({
            message: "You need to fill in the name.",
        });
    }

    const courseComment = await CourseComment.findOne({ where: { id } });

    if (!courseComment) {
        return res.status(400).send({
            message: `No courseComment exists with the id ${id}`,
        });
    }

    try {

        courseComment.courseId = courseId;
        courseComment.commentId = commentId;

        courseComment.save();
        return res.status(200).send({
            message: `CourseComment ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the courseComment you are trying to delete.` });


    const courseComment = await CourseComment.findOne({ where: { id } });

    if (!courseComment) {
        return res.status(400).send({ message: `No courseComment exists with the id ${id}` });
    }

    try {
        await courseComment.destroy();
        return res.status(204).send({ message: `CourseComment ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};