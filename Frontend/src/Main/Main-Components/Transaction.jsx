import { React, useContext, useEffect } from "react";
import { DataContexAPI } from "../../contexAPI/DataContex";

function Transaction() {
  const { transaction, FetchTransaction } = useContext(DataContexAPI);

  // Safely access the nested budget and expenses
  const transactionFilter = transaction?.budget || {};
  const expenses = transactionFilter.expenses || [];

  useEffect(() => {
    FetchTransaction(); // Fetch data only on initial render
  }, []); // Prevent re-execution by using an empty dependency array

  return (
    <div id="transaction" className="bg-white border border-gray-200 rounded-lg p-6 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        {/* <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm">{expense.description}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        expense.category === "Accommodation"
                          ? "bg-blue-100 text-blue-800"
                          : expense.category === "Food"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    {expense.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-3 px-4 text-sm text-center text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
