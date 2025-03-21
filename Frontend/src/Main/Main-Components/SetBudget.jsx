import React, { useState, useEffect, useContext } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { DataContexAPI } from "../../contexAPI/DataContex";
function SetBudget() {
  const [msg, setMsg] = useState("");
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  // console.log(isLogin);
  const { overData, FetchOverData } = useContext(DataContexAPI);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    totalBudget: "",
    numberOfDays: "",
  });
  const [error, setError] = useState(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setError(null);
    setMsg("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  //   // testing
  // console.log(token, accessToken);
  // async function Fetching() {
  //   try {
  //     const response = await fetch(
  //       "https://travelbudgettool.onrender.com/user/budgets",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${isLogin.accessToken}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`Failed to create budget: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log("Budget created:", data);
  //     setIsOpen(false);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError(error.message);
  //   }
  // }
  // useEffect(() => {
  //   // Fetching();
  // }, []);

  //   // testing

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch existing budgets
      const response = await fetch(
        "https://travelbudgettool.onrender.com/user/budgets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        // If no budgets exist, this could be a 404 or other error
        if (response.status === 404) {
          console.log("No budgets found, you can create a new one.");
        } else {
          throw new Error(`Failed to fetch budgets: ${response.status}`);
        }
      }

      const existingBudgets = await response.json();
      console.log("Fetched budgets:", existingBudgets);

      // Ensure existingBudgets is an array
      const budgetsArray = Array.isArray(existingBudgets)
        ? existingBudgets
        : existingBudgets.budgets || [];

      // Check if any budget with `status: true` exists
      const activeBudget = budgetsArray.find(
        (budget) => budget.status === true
      );

      if (activeBudget) {
        setMsg(`You already have an active budget: ${activeBudget.city}`);
        return; // Prevent submission if an active budget exists
      }

      // If no active budget exists, proceed to create a new budget
      const budgetData = {
        ...formData,
        status: true, // New budget is active
        userId: isLogin.token, // Replace with dynamic user ID if available
      };

      // Create new budget
      const createResponse = await fetch(
        "https://travelbudgettool.onrender.com/user/budgets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.accessToken}`,
          },
          body: JSON.stringify(budgetData),
        }
      );

      if (!createResponse.ok) {
        throw new Error(`Failed to create budget: ${createResponse.status}`);
      }

      const createdBudget = await createResponse.json();
      console.log("Budget created:", createdBudget);
      FetchOverData();
      setIsOpen(false); // Close popup
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="App flex justify-start p-4">
      <button
        onClick={togglePopup}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex"
      >
        <Plus className="mr-1" />
        Set New Budget
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={(e) => e.target === e.currentTarget && togglePopup()} // Close on outside click
        >
          <div className="bg-white p-10 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-2xl font-bold mb-6">Set Budget</h2>
            <p className="mb-2 text-red-500">{msg !== "" && msg}</p>
            {error && (
              <div className="text-red-500 mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 mt-2 border rounded"
                />
              </label>
              <label className="block mb-4">
                Enter Budget Amount:
                <input
                  type="number"
                  name="totalBudget"
                  value={formData.totalBudget}
                  onChange={handleChange}
                  required
                  className="w-full p-3 mt-2 border rounded"
                  min="0"
                />
              </label>
              <label className="block mb-6">
                Number Of Days:
                <input
                  type="number"
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  required
                  className="w-full p-3 mt-2 border rounded"
                  min="1"
                />
              </label>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded"
                >
                  Set Budget
                </button>
                <button
                  type="button"
                  onClick={togglePopup}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetBudget;
