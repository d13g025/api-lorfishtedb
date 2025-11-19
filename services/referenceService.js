const db = require('../config/database');

exports.fishes_listName = async () => {
    const query = `SELECT id_specie_fish, scientific_name_fish
    FROM specie_fish
    ORDER BY scientific_name_fish ASC`;

    const result = await db.query(query);
    return result.rows
};

exports.superfamilies_listName = async () => {
    const query = `SELECT id_superfamily, superfamily_name
        FROM superfamily_wicker
        ORDER BY superfamily_name ASC`;

    const result = await db.query(query);
    return result.rows;
};

exports.orders_listName = async () => {
    const query = `SELECT id_order, order_name
        FROM order_wicker
        ORDER BY order_name ASC`;

    const result = await db.query(query);
    return result.rows;
};

exports.classes_listName = async () => {
    const query = `SELECT id_class, class_name
        FROM class_wicker
        ORDER BY class_name ASC`;
        
    const result = await db.query(query);
    return result.rows;
};