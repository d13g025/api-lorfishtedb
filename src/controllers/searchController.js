const searchService = require('../../services/searchService');

exports.getSearches = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const offset = (page - 1) * limit;

        const filters = {
            fish: req.query.fish,
            classs: req.query.class,
            order: req.query.order,
            superfamily: req.query.superfamily
        };

        const result = await searchService.search(filters, limit, offset);

        res.json({
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit),
            data: result.rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error performing search" });
    }
};
