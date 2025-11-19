const statisticsService = require('../../services/statisticsService');

exports.getStatistics = async (req, res) => {
    try {
        const fish = req.query.fish;

        if (!fish) {
            return res.status(400).json({ error: "Missing fish parameter" });
        }

        const stats = await statisticsService.getStatistics(fish);

        res.json({
            fish,
            statistics: stats
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error generating statistics" });
    }
};
