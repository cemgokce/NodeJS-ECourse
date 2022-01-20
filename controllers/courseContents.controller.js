const CourseContent = require('../models/courseContents')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const courseContent = await CourseContent.findOne({
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
    const courseContents = await CourseContent.findAll();

    if (!courseContents) {
        return res.status(404).send({
            message: `No courseContents found.`,
        });
    }

    return res.status(200).send(courseContents);
};

exports.create = async (req, res) => {
    const { courseId, contentId } = req.body;

    // Checks if the courseContent fields exists. 
    if (!courseId || !contentId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and contentId.",
        });
    }

    // Create courseContent
    try {

        let newContent = await CourseContent.create({
            courseId,
            contentId
        });
        return res.status(201).send(newContent);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { courseId, contentId } = req.body;

    const { id } = req.params;

    // Checks if the courseContent fields exists. 
    if (!courseId || !contentId) {
        return res.status(400).send({
            message: "You need to fill in the name.",
        });
    }

    const courseContent = await CourseContent.findOne({ where: { id } });

    if (!courseContent) {
        return res.status(400).send({
            message: `No courseContent exists with the id ${id}`,
        });
    }

    try {

        courseContent.courseId = courseId;
        courseContent.contentId = contentId;

        courseContent.save();
        return res.status(200).send({
            message: `CourseContent ${id} has been updated!`,
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


    const courseContent = await CourseContent.findOne({ where: { id } });

    if (!courseContent) {
        return res.status(400).send({ message: `No courseContent exists with the id ${id}` });
    }

    try {
        await courseContent.destroy();
        return res.status(204).send({ message: `CourseContent ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};