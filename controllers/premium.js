const expenseTable = require('../models/expense');
const sequelize = require('sequelize');
const usertable = require('../models/user');

exports.showLeaderboard = async (req, res, next) => {
    try {
        const results = await expenseTable.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
                'userId'
            ],
            group: 'userId',
            include: [{
                model: usertable,
                attributes: ['id', 'name']
            }]
        });

        // Extract necessary data and transform the response
        const leaderboardData = results.map(result => ({
            userId: result.user.id,
            name: result.user.name,
            total_amount: result.dataValues.total_amount
        }));

        console.log('Leaderboard data:', leaderboardData);
        res.json(leaderboardData);

    } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};