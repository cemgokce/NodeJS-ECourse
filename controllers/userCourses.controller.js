const UserCourse = require('../models/userCourses')
const Course = require('../models/Course')

exports.getById = async (req, res) => {
    const { id } = req.params;

    const userCourse = await UserCourse.findOne({
        where: { id }
    });
    if (!userCourse) {
        return res.status(404).send({
            message: `No userCourse found with the id ${id}`,
        });
    }

    return res.status(200).send(userCourse);
};

exports.getAll = async (req, res) => {
    const userCourses = await UserCourse.findAll();

    if (!userCourses) {
        return res.status(404).send({
            message: `No userCourses found.`,
        });
    }

    return res.status(200).send(userCourses);
};

exports.create = async (req, res) => {
    const { courseId, userId } = req.body;

    // Checks if the userCourse fields exists. 
    if (!courseId || !userId) {
        return res.status(400).send({
            message: "You need to fill in the courseId and userId.",
        });
    }

    // Create userCourse
    try {

        let newContent = await UserCourse.create({
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

    // Checks if the userCourse fields exists. 
    if (!courseId || !userId) {
        return res.status(400).send({
            message: "You need to fill in the name.",
        });
    }

    const userCourse = await UserCourse.findOne({ where: { id } });

    if (!userCourse) {
        return res.status(400).send({
            message: `No userCourse exists with the id ${id}`,
        });
    }

    try {

        userCourse.courseId = courseId;
        userCourse.userId = userId;

        userCourse.save();
        return res.status(200).send({
            message: `UserCourse ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the userCourse you are trying to delete.` });


    const userCourse = await UserCourse.findOne({ where: { id } });

    if (!userCourse) {
        return res.status(400).send({ message: `No userCourse exists with the id ${id}` });
    }

    try {
        await userCourse.destroy();
        return res.status(204).send({ message: `UserCourse ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};

exports.getByTeacherId = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const course = await UserCourse.findAll({
        include: [
            {
                model: Course,
            }
        ],
        where: { userId: id },
    });
    if (!course) {
        return res.status(404).send({
            message: `No courses found with the id ${id}`,
        });
    }

    return res.status(200).send(course);
}

