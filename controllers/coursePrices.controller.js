//Controller for course prices
const CoursePrice = require('../models/coursePrices')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const coursePrice = await CoursePrice.findOne({
        where: { id }
    });
    if (!coursePrice) {
        return res.status(404).send({
            message: `No coursePrice found with the id ${id}`,
        });
    }

    return res.status(200).send(coursePrice);
};

exports.getAll = async (req, res) => {
    const coursePrices = await CoursePrice.findAll();

    if (!coursePrices) {
        return res.status(404).send({
            message: `No coursePrice found.`,
        });
    }

    return res.status(200).send(coursePrices);
};

exports.create = async (req, res) => {
    const { priceId, courseId } = req.body;

    // Checks if the coursePrice fields exists. 
    if (!priceId || !courseId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and priceId.",
        });
    }

    // Create coursePrice
    try {

        let newCoursePrice = await CoursePrice.create({
            courseId,
            priceId
        });
        return res.status(201).send(newCoursePrice);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {

    const { courseId, priceId } = req.body;

    const { id } = req.params;

    // Checks if the coursePrice fields exists. 
    if (!priceId || !courseId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and priceId.",
        });
    }

    const coursePrice = await CoursePrice.findOne({ where: { id } });

    if (!coursePrice) {
        return res.status(400).send({
            message: `No coursePrice exists with the id ${id}`,
        });
    }

    try {

        coursePrice.priceId = priceId;
        coursePrice.courseId = courseId;

        coursePrice.save();
        return res.status(200).send({
            message: `CoursePrice ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the coursePrice you are trying to delete.` });


    const coursePrice = await CoursePrice.findOne({ where: { id } });

    if (!coursePrice) {
        return res.status(400).send({ message: `No coursePrice exists with the id ${id}` });
    }

    try {
        await coursePrice.destroy();
        return res.status(204).send({ message: `CoursePrice ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};