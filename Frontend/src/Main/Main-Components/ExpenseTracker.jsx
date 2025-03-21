import React, { useState, useEffect, useContext } from "react";
import { DataContexAPI } from "../../contexAPI/DataContex";
const ExpenseTracker = () => {
  // use context api
  const { FetchOverData, overData, FetchTransaction } = useContext(DataContexAPI);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days");
  const [selectedSortBy, setSelectedSortBy] = useState("Most Recent");
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [msg, setMsg] = useState("");
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  // console.log(isLogin)

  const categories = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Accommodation",
    "Healthcare",
    "Shopping",
    "Utilities",
    "Others",
  ];

  const handleAddExpense = async (newExpense) => {
    try {
      if (overData.totalBudget - newExpense.amount < 0) {
        setMsg("Your Budget Limit Exceeds");
        return;
      }
  
      const expenseData = { ...newExpense };
      // console.log("Expense Data:", expenseData, isLogin.accessToken);
  
      const createResponse = await fetch(
        "https://travelbudgettool.onrender.com/user/budgets/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.accessToken}`,
          },
          body: JSON.stringify(expenseData),
        }
      );
  
      if (!createResponse.ok) {
        const errorDetails = await createResponse.json();
        console.error("Server Error:", errorDetails);
        throw new Error(errorDetails.message || "Failed to add expense");
      }
  
      const savedExpense = await createResponse.json();
      console.log("Saved Expense:", savedExpense);
  
      FetchOverData();
      FetchTransaction();
      setExpenses((prevExpenses) => [...prevExpenses, savedExpense]);
      setShowAddExpense(false);
      setMsg("");
    } catch (error) {
      console.error("Error adding expense:", error.message);
      setMsg("Failed to add expense. Please try again.");
    }
  };
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAddExpense(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* Filter and Sort Options */}
      <div className="flex space-x-4 mb-4">
        {/* <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All Categories">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select> */}

        {/* <select
          value={selectedSortBy}
          onChange={(e) => setSelectedSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Most Recent">Most Recent</option>
          <option value="Highest Amount">Highest Amount</option>
          <option value="Lowest Amount">Lowest Amount</option>
        </select> */}
      </div>

      {/* Expense List */}
      {/* <div>
        {filteredExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredExpenses.map((expense, index) => (
              <li
                key={index}
                className="p-4 border rounded flex justify-between items-center"
              >
                <span>{expense.description}</span>
                <span>
                  {expense.amount} {selectedCurrency}
                </span>
                <span>{expense.date}</span>
                <span>{expense.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold">Add New Expense</h3>

            <p className="m-2 text-center text-red-600">{msg}</p>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowAddExpense(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newExpense = {
                  date: e.target.date.value,
                  description: e.target.description.value,
                  category: e.target.category.value,
                  amount: parseFloat(e.target.amount.value),
                };
                handleAddExpense(newExpense);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="date" className="block text-sm font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="border p-2 rounded w-full"
                  required
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="border p-2 rounded w-full"
                  step="0.01"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Add Expense
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddExpense(!showAddExpense);
                  setMsg("");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
