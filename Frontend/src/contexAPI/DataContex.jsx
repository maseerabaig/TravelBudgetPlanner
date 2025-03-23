import { React, createContext, useState } from "react";

export const DataContexAPI = createContext();

function DataContex({ children }) {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const [allDataUser, setAllDataUser] = useState([]);
  const [overData, setOverData] = useState({});
  const [transaction, setTransaction] = useState([]);

  const FetchTransaction = async () => {
    try {
      // Get budget ID
      const responseGetBudget = await fetch(
        "https://travelbudgetplanner-sywj.onrender.com/user/budgets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.accessToken}`,
          },
        }
      );

      if (!responseGetBudget.ok) {
        if (responseGetBudget.status === 404) {
          console.log("No budgets found, you can create a new one.");
          return;
        } else {
          throw new Error(
            `Failed to fetch budgets: ${responseGetBudget.status}`
          );
        }
      }

      const existingBudgets = await responseGetBudget.json();

      // Ensure existingBudgets is an array
      const budgetsArray = Array.isArray(existingBudgets)
        ? existingBudgets
        : existingBudgets.budgets || [];

      // Check if any budget with `status: true` exists
      const activeBudget = budgetsArray.find(
        (budget) => budget.status === true
      );

      if (!activeBudget) {
        console.log("No active budget found.");
        return;
      }

      const globalBudgetId = activeBudget._id;
      console.log("Active Budget ID:", globalBudgetId);

      const response = await fetch(
        `https://travelbudgetplanner-sywj.onrender.com/user/budgets/${globalBudgetId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }

      const data = await response.json();
      setTransaction(data); // Update transaction state with fetched data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch budgets/showdata
  const FetchOverData = async () => {
    try {
      const response = await fetch(
        "https://travelbudgetplanner-sywj.onrender.com/user/budgets/showdata/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLogin.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch over data: ${response.status}`);
      }

      const data = await response.json();
      setOverData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DataContexAPI.Provider
      value={{
        allDataUser,
        setAllDataUser,
        overData,
        FetchOverData,
        FetchTransaction,
        transaction,
      }}
    >
      {children}
    </DataContexAPI.Provider>
  );
}

export default DataContex;
