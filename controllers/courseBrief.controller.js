const CourseBrief = require('../models/courseBriefs')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const courseBrief = await CourseBrief.findOne({
        where: { id }
    });
    if (!courseBrief) {
        return res.status(404).send({
            message: `No courseBrief found with the id ${id}`,
        });
    }

    return res.status(200).send(courseBrief);
};

exports.getAll = async (req, res) => {
    const courseBriefs = await CourseBrief.findAll();

    if (!courseBriefs) {
        return res.status(404).send({
            message: `No courseBriefs found.`,
        });
    }

    return res.status(200).send(courseBriefs);
};

exports.create = async (req, res) => {
    const { courseId, briefId } = req.body;

    // Checks if the courseBrief fields exists. 
    if (!courseId || !briefId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and rateId.",
        });
    }

    // Create courseBrief
    try {

        let newBrief = await CourseBrief.create({
            courseId,
            briefId
        });
        return res.status(201).send(newBrief);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {

    const { courseId, briefId } = req.body;

    const { id } = req.params;

    // Checks if the courseBrief fields exists. 
    if (!courseId || !briefId) {
        return res.status(400).send({
            message: "You need to fill in the name.",
        });
    }

    const courseBrief = await CourseBrief.findOne({ where: { id } });

    if (!courseBrief) {
        return res.status(400).send({
            message: `No courseBrief exists with the id ${id}`,
        });
    }

    try {

        courseBrief.courseId = courseId; 
        courseBrief.briefId = briefId;

        courseBrief.save();
        return res.status(200).send({
            message: `CourseBrief ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the courseBrief you are trying to delete.` });


    const courseBrief = await CourseBrief.findOne({ where: { id } });

    if (!courseBrief) {
        return res.status(400).send({ message: `No courseBrief exists with the id ${id}` });
    }

    try {
        await courseBrief.destroy();
        return res.status(204).send({ message: `CourseBrief ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};