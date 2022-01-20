const CourseUser = require('../models/courseUsers')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const courseContent = await CourseUser.findOne({
        where: { id }
    });
    if (!courseContent) {
        return res.status(404).send({
            message: `No courseContent found with the id ${id}`,
        });
    }

    return res.status(200).send(courseContent);
};

exports.getAll = async (req, res) => {
    const courseUsers = await CourseUser.findAll();

    if (!courseUsers) {
        return res.status(404).send({
            message: `No courseUsers found.`,
        });
    }

    return res.status(200).send(courseUsers);
};

exports.create = async (req, res) => {
    const { courseId, userId } = req.body;

    // Checks if the courseContent fields exists. 
    if (!courseId || !userId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and userId.",
        });
    }

    // Create courseContent
    try {

        let newContent = await CourseUser.create({
            courseId,
            userId
        });
        return res.status(201).send(newContent);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { courseId, userId } = req.body;

    const { id } = req.params;

    // Checks if the courseContent fields exists. 
    if (!courseId || !userId) {
        return res.status(400).send({
            message: "You need to fill in the name.",
        });
    }

    const courseContent = await CourseUser.findOne({ where: { id } });

    if (!courseContent) {
        return res.status(400).send({
            message: `No courseContent exists with the id ${id}`,
        });
    }

    try {

        courseContent.courseId = courseId;
        courseContent.userId = userId;

        courseContent.save();
        return res.status(200).send({
            message: `CourseUser ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the courseContent you are trying to delete.` });


    const courseContent = await CourseUser.findOne({ where: { id } });

    if (!courseContent) {
        return res.status(400).send({ message: `No courseContent exists with the id ${id}` });
    }

    try {
        await courseContent.destroy();
        return res.status(204).send({ message: `CourseUser ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};