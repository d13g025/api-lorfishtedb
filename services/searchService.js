const db = require('../config/database');

exports.search = async ({ fish, classs, order, superfamily }, limit, offset) => {
    try {
        let where = " WHERE 1=1 ";
        const params = [];

        if (fish) {
            params.push(`%${fish}%`);
            where += ` AND LOWER(fish_name) LIKE LOWER($${params.length})`;
        }

        if (classs) {
            params.push(`%${classs}%`);
            where += ` AND LOWER(class_name) LIKE LOWER($${params.length})`;
        }

        if (order) {
            params.push(`%${order}%`);
            where += ` AND LOWER(order_name) LIKE LOWER($${params.length})`;
        }

        if (superfamily) {
            params.push(`%${superfamily}%`);
            where += ` AND LOWER(superfamily_name) LIKE LOWER($${params.length})`;
        }

        // --------- TOTAL ---------
        const totalQuery = `
            SELECT COUNT(*) AS total
            FROM vw_te_full
            ${where}
        `;

        const totalResult = await db.query(totalQuery, params);
        const total = parseInt(totalResult.rows[0].total);

        // --------- DADOS PAGINADOS ---------
        params.push(limit);
        params.push(offset);

        const dataQuery = `
            SELECT
                genome_id,
                fish_name,
                chromosome,
                start_position,
                end_position,
                strand,
                te_name,
                class_name,
                order_name,
                superfamily_name
            FROM vw_te_full
            ${where}
            ORDER BY fish_name, chromosome, start_position
            LIMIT $${params.length - 1}
            OFFSET $${params.length}
        `;

        const rowsResult = await db.query(dataQuery, params);

        return {
            total,
            rows: rowsResult.rows
        };

    } catch (err) {
        console.error("SearchService error:", err);
        throw err;
    }
};
