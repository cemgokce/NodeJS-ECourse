const Category = require('../models/Category')


exports.getById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const category = await Category.findOne({
        where: { id }
    });
    if (!category) {
        return res.status(404).send({
            message: `No category found with the id ${id}`,
        });
    }

    return res.status(200).send(category);
};

exports.getAll = async (req, res) => {
    const categories = await Category.findAll();

    if (!categories) {
        return res.status(404).send({
            message: `No category found.`,
        });
    }

    return res.status(200).send(categories);
};

exports.create = async (req, res) => {
    console.log(req.body);
    const { name } = req.body;

    // Checks if the category fields exists. 
    if (!name) {
        return res.status(400).send({
            message: "You need to fill in the category name.",
        });
    }

    // Checks if the category name exists
    let categoryExists = await Category.findOne({
        where: { name }
    });
    if (categoryExists) return res.status(400).send({ message: `A category named ${name} already exists!` });

    // Create category
    try {

        let newCategory = await Category.create({
            name
        });
        return res.status(201).send(newCategory);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {

    const { name } = req.body;
    const money = req.body.try;

    const { id } = req.params;

    const category = await Category.findOne({ where: { id } });

    if (!category) {
        return res.status(400).send({
            message: `No category exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            category.name = name;
        }

        category.save();
        return res.status(200).send({
            message: `Category ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the category you are trying to delete.` });


    const category = await Category.findOne({ where: { id } });

    if (!category) {
        return res.status(400).send({ message: `No category exists with the id ${id}` });
    }

    try {
        await category.destroy();
        return res.status(204).send({ message: `Category ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};