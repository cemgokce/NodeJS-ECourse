const Course = require('../models/Course')
const CourseCategory = require('../models/courseCategory')
const CoursePrice = require('../models/coursePrices')
const CourseRate = require('../models/courseRates')
const CourseComment = require('../models/courseComments')
const CourseContent = require('../models/courseContents')
const CourseBrief = require('../models/courseBriefs')
const Price = require('../models/Price')
const Category = require('../models/category')
const Rate = require('../models/rate')
const Brief = require('../models/brief')
const Comment = require('../models/comment')
const Content = require('../models/content')
const UserCourse = require('../models/userCourses')


const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;


exports.getById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const course = await Course.findOne({
        include: [
            {
                model: CourseCategory,
                include: [{ model: Category }]
            },
            {
                model: CoursePrice,
                include: [{ model: Price }]
            },
            {
                model: CourseRate,
                include: [{ model: Rate }]
            },
            {
                model: CourseBrief,
                include: [{ model: Brief }]
            },
            {
                model: CourseContent,
                include: [{ model: Content }]
            },
            {
                model: CourseComment,
                include: [{ model: Comment }]
            },
        ],
        where: { id }
    });
    if (!course) {
        return res.status(404).send({
            message: `No course found with the id ${id}`,
        });
    }

    return res.status(200).send(course);
};
exports.getAll = async (req, res) => {
    const courses = await Course.findAll();

    if (!courses) {
        return res.status(404).send({
            message: `No product found.`,
        });
    }

    return res.status(200).send(courses);
};
exports.create = async (req, res) => {
    console.log(req.body);
    const { name, photo, description, rate, hour } = req.body;
    // Checks if the product name exists. parentId can be null if the product is a parent product.
    if (!name || !description) {
        return res.status(400).send({
            message: "You need to fill in the course name.",
        });
    }

    // Checks if the product name exists
    let courseExists = await Course.findOne({
        where: { name }
    });
    if (courseExists) return res.status(400).send({ message: `A course named ${name} already exists!` });

    // Create product
    try {

        let newCourse = await Course.create({
            name,
            photo,
            description,
            rate,
            hour
        });
        return res.status(201).send(newCourse);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};
exports.update = async (req, res) => {
    const { name, photo, description, rate, hour } = req.body;
    const { id } = req.params;

    const course = await Course.findOne({ where: { id } });

    if (!course) {
        return res.status(400).send({
            message: `No course exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            course.name = name;
        }
        if (photo) {
            course.photo = photo;
        }
        if (description) {
            course.description = description;
        }
        if (rate) {
            course.rate = rate;
        }
        if (hour) {
            course.hour = hour;
        }
        course.save();
        return res.status(200).send({
            message: `Course ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};
exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the course you are trying to delete.` });


    const course = await Course.findOne({ where: { id } });

    if (!course) {
        return res.status(400).send({ message: `No course exists with the id ${id}` });
    }

    try {
        await course.destroy();
        return res.status(204).send({ message: `Course ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};
exports.getByCategoryId = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const course = await Category.findOne({
        include: [
            {
                model: CourseCategory,
                include: [{ model: Course }]
            }
        ],
        where: { id }
    });
    if (!course) {
        return res.status(404).send({
            message: `No courses found with the id ${id}`,
        });
    }

    return res.status(200).send(course);
};
exports.getByName = async (req, res) => {
    const { name } = req.params;
    const course = await Course.findAll({
        where: {
            name: {
                [Op.substring]: name
            }
        }
    });
    if (!course) {
        return res.status(404).send({
            message: `No courses found with the id ${id}`,
        });
    }

    return res.status(200).send(course);

};


