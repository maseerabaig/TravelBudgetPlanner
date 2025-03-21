import { budgetModel } from "../models/budgetModel.js";
import { expenseModel } from "../models/expenseModel.js";

const createBudget = async (req, res) => {
  try {
    const userId = req.user?.id; // Safe extraction of userId
    console.log("Extracted userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }

    console.log("Extracted userId:", userId); // Debug log

    if (!userId) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const { city, numberOfDays, totalBudget } = req.body;

    if (!city || !numberOfDays || !totalBudget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const budget = await budgetModel.create({
      userId, // Ensure this is passed correctly
      city,
      numberOfDays,
      totalBudget,
      status: true,
    });

    // await budget.save();
    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    console.error("Error creating budget:", error.message); // Debug log
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all budgets for a user
const getBudgets = async (req, res) => {
  try {
    const userId = req.user.id; // Correct extraction of userId
    console.log("Extracted userId:", userId); // Debug log to verify userId

    // Find budgets for the user
    const budgets = await budgetModel.find({ userId }); // Use 'find' instead of 'findAll'

    if (budgets.length === 0) {
      return res.status(404).json({ message: "No budgets found." });
    }

    res.status(200).json({ budgets });
  } catch (error) {
    console.error("Error fetching budgets:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Add an expense to a budget
const addExpenseToBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, description, category, amount } = req.body;

    // Validate input
    if (!date || !description || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch user's active budget (status: true)
    const budget = await budgetModel.findOne({ userId, status: true });

    // Handle case where no active budget exists
    if (!budget) {
      return res.status(404).json({ message: "No active budget found." });
    }
    console.log("Active budget found:", budget); // Debug log
    // Create the expense
    const expense = await expenseModel.create({
      budgetId: budget._id,
      date,
      description,
      category,
      amount,
    });

    // Add the expense reference to the budget's expenses array
    budget.expenses.push(expense._id);
    await budget.save();

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("Error adding expense:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get a budget with its expenses
const getBudgetWithExpenses = async (req, res) => {
  try {
    const { budgetId } = req.params;

    // Find the budget and populate its expenses
    const budget = await budgetModel.findById(budgetId).populate("expenses"); // Populate the `expenses` array with full Expense documents

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ budget });
  } catch (error) {
    console.error("Error fetching budget with expenses:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getActiveBudgets = async (req, res) => {
  try {
    const { userId } = req.user;

    const budgets = await budgetModel.find({ userId, status: true });

    res.status(200).json({ budgets });
  } catch (error) {
    console.error("Error fetching active budgets:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const showBudgetData = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the active budget and populate expenses
    const userBudget = await budgetModel
      .find({ userId, status: true })
      .populate("expenses");

    // Handle no budget found
    if (!userBudget || userBudget.length === 0) {
      return res
        .status(404)
        .json({ message: "No active budget found for this user." });
    }

    const totalBudget = userBudget[0].totalBudget;
    const numberOfDays = userBudget[0].numberOfDays;

    // Initialize variables to calculate totals
    let totalexpenses = 0;
    let remainingBudget = totalBudget;
    let dailyAvgSpent = 0;

    // Calculate expenses for each budget
    userBudget.forEach((budget) => {
      const spent = budget.expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      totalexpenses += spent;
    });

    remainingBudget = totalBudget - totalexpenses;
    dailyAvgSpent = totalexpenses / numberOfDays;

    // Return calculated data
    res.status(200).json({
      totalBudget,
      remainingBudget,
      totalexpenses,
      dailyAvgSpent,
    });
  } catch (error) {
    console.error("Error retrieving budget data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createBudget,
  getBudgets,
  addExpenseToBudget,
  getBudgetWithExpenses,
  getActiveBudgets,
  showBudgetData,
};
