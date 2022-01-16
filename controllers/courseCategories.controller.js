const CourseCategory = require('../models/courseCategory')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const courseCategory = await CourseCategory.findOne({
        where: { id }
    });
    if (!courseCategory) {
        return res.status(404).send({
            message: `No courseCategory found with the id ${id}`,
        });
    }

    return res.status(200).send(courseCategory);
};

exports.getAll = async (req, res) => {
    const courseCategories = await CourseCategory.findAll();

    if (!courseCategories) {
        return res.status(404).send({
            message: `No courseCategory found.`,
        });
    }

    return res.status(200).send(courseCategories);
};

exports.create = async (req, res) => {
    const { categoryId, courseId } = req.body;

    // Checks if the courseCategory fields exists. 
    if (!categoryId || !courseId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and categoryId.",
        });
    }

    // Create courseCategory
    try {

        let newCourseCategory = await CourseCategory.create({
            courseId,
            categoryId
        });
        return res.status(201).send(newCourseCategory);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {

    const { courseId, categoryId } = req.body;

    const { id } = req.params;

    // Checks if the courseCategory fields exists. 
    if (!categoryId || !courseId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and categoryId.",
        });
    }

    const courseCategory = await CourseCategory.findOne({ where: { id } });

    if (!courseCategory) {
        return res.status(400).send({
            message: `No courseCategory exists with the id ${id}`,
        });
    }

    try {

        courseCategory.categoryId = categoryId;
        courseCategory.courseId = courseId;

        courseCategory.save();
        return res.status(200).send({
            message: `CourseCategory ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the courseCategory you are trying to delete.` });


    const courseCategory = await CourseCategory.findOne({ where: { id } });

    if (!courseCategory) {
        return res.status(400).send({ message: `No courseCategory exists with the id ${id}` });
    }

    try {
        await courseCategory.destroy();
        return res.status(204).send({ message: `CourseCategory ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};