const CourseRate = require('../models/courseRates')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const courseRate = await CourseRate.findOne({
        where: { id }
    });
    if (!courseRate) {
        return res.status(404).send({
            message: `No courseRate found with the id ${id}`,
        });
    }

    return res.status(200).send(courseRate);
};

exports.getAll = async (req, res) => {
    const courseRates = await CourseRate.findAll();

    if (!courseRates) {
        return res.status(404).send({
            message: `No courseRates found.`,
        });
    }

    return res.status(200).send(courseRates);
};

exports.create = async (req, res) => {
    const { rateId, courseId } = req.body;

    // Checks if the courseRate fields exists. 
    if (!rateId || !courseId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and rateId.",
        });
    }

    // Create courseRate
    try {

        let newCourseRate = await CourseRate.create({
            courseId,
            rateId
        });
        return res.status(201).send(newCourseRate);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { courseId, rateId } = req.body;

    const { id } = req.params;

    // Checks if the courseRate fields exists. 
    if (!rateId || !courseId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and rateId.",
        });
    }

    const courseRate = await CourseRate.findOne({ where: { id } });

    if (!courseRate) {
        return res.status(400).send({
            message: `No courseRate exists with the id ${id}`,
        });
    }

    try {

        courseRate.rateId = rateId;
        courseRate.courseId = courseId;

        courseRate.save();
        return res.status(200).send({
            message: `CourseRate ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the courseRate you are trying to delete.` });


    const courseRate = await CourseRate.findOne({ where: { id } });

    if (!courseRate) {
        return res.status(400).send({ message: `No courseRate exists with the id ${id}` });
    }

    try {
        await courseRate.destroy();
        return res.status(204).send({ message: `CourseRate ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};