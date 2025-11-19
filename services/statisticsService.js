const db = require('../config/database');

exports.getStatistics = async (fish) => {
    try {
        const stats = {
            classes: [],
            orders: [],
            superfamilies: []
        };

        // Classes
        const classQuery = `
            SELECT class_name AS name, COUNT(*) AS total
            FROM vw_te_full
            WHERE LOWER(fish_name) = LOWER($1)
            GROUP BY class_name
            ORDER BY total DESC;
        `;
        const classResult = await db.query(classQuery, [fish]);
        stats.classes = classResult.rows;

        // Orders
        const orderQuery = `
            SELECT order_name AS name, COUNT(*) AS total
            FROM vw_te_full
            WHERE LOWER(fish_name) = LOWER($1)
            GROUP BY order_name
            ORDER BY total DESC;
        `;
        const orderResult = await db.query(orderQuery, [fish]);
        stats.orders = orderResult.rows;

        // Superfamilies
        const sfQuery = `
            SELECT superfamily_name AS name, COUNT(*) AS total
            FROM vw_te_full
            WHERE LOWER(fish_name) = LOWER($1)
            GROUP BY superfamily_name
            ORDER BY total DESC;
        `;
        const sfResult = await db.query(sfQuery, [fish]);
        stats.superfamilies = sfResult.rows;

        return stats;

    } catch (err) {
        console.error("Error in statistics service:", err);
        throw err;
    }
};
