const referenceService = require('../../services/referenceService');


exports.getFishes = async (req, res) => {
    try {
        const data = await referenceService.fishes_listName();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred fetching fishes.');
    }
};


exports.getSuperfamilies = async (req, res) => {
    try {
        const data = await referenceService.superfamilies_listName();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred fetching superfamilies.');
    }
};


exports.getOrders = async (req, res) => {
    try {
        const data = await referenceService.orders_listName();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred fetching orders.');
    }
};


exports.getClasses = async (req, res) => {
    try {
        const data = await referenceService.classes_listName();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred fetching classes.');
    }
};
