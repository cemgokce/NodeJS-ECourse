
const Price = require('../models/Price')


exports.getById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const price = await Price.findOne({
        where: { id }
    });
    if (!price) {
        return res.status(404).send({
            message: `No price found with the id ${id}`,
        });
    }

    return res.status(200).send(price);
};

exports.getAll = async (req, res) => {
    const prices = await Price.findAll();

    if (!prices) {
        return res.status(404).send({
            message: `No product found.`,
        });
    }

    return res.status(200).send(prices);
};

exports.create = async (req, res) => {
    console.log(req.body);
    const { title, usd, euro } = req.body;
    const money = req.body.try;

    // Checks if the product name exists. parentId can be null if the product is a parent product.
    if (!title || !money) {
        return res.status(400).send({
            message: "You need to fill in the price name.",
        });
    }

    // // Checks if the price name exists
    // let courseExists = await Price.findOne({
    //     where: { name }
    // });
    // if (courseExists) return res.status(400).send({ message: `A price named ${name} already exists!` });

    // Create price
    try {

        let newPRice = await Price.create({
            title,
            usd,
            euro,
            try: money
        });
        return res.status(201).send(newPRice);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {

    const { title, usd, euro } = req.body;
    const money = req.body.try;

    const { id } = req.params;

    const price = await Price.findOne({ where: { id } });

    if (!price) {
        return res.status(400).send({
            message: `No price exists with the id ${id}`,
        });
    }

    try {
        if (title) {
            price.title = title;
        }
        if (money) {
            price.try = money;
        }
        if (usd) {
            price.usd = usd;
        }
        if (euro) {
            price.euro = euro;
        }
        price.save();
        return res.status(200).send({
            message: `Price ${title} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the price you are trying to delete.` });


    const price = await Price.findOne({ where: { id } });

    if (!price) {
        return res.status(400).send({ message: `No price exists with the id ${id}` });
    }

    try {
        await price.destroy();
        return res.status(204).send({ message: `Price ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};