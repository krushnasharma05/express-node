const sequelize = require('../util/database');

const expenseTable = require('../models/expense');
const userTable = require('../models/user');

exports.postExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { amount, description, category } = req.body;
    const userId = req.user.id;

    // Create a new expense record in the database associated with the user ID
    const result = await expenseTable.create(
      {
        amount: amount,
        description: description,
        category: category,
        userId: userId,
      },
      { transaction: t }
    );

    // Update user's totalExpense
    const user = await userTable.findByPk(userId, { transaction: t });
    await user.update(
      {
        totalExpense: user.totalExpense + parseFloat(amount),
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json(result);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).send({ message: 'Failed to add expense' });
  }
};

exports.getExpense = async (req, res) => {
  try {
    // Fetch all expenses from the database
    const expenses = await expenseTable.findAll({ where: { userId: req.user.id } });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch expenses' });
  }
};

exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    // Find the expense by ID and delete it
    const deletedExpense = await expenseTable.findByPk(id, { transaction: t });
    if (!deletedExpense) {
      await t.rollback();
      return res.status(404).send({ message: 'Expense not found' });
    }

    await deletedExpense.destroy({ transaction: t });

    await t.commit();

    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).send({ message: 'Failed to delete expense' });
  }
};
