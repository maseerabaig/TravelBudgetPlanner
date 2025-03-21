import { Plus,IndianRupee } from "lucide-react";
import { React, useState, useEffect, useContext } from "react";
import { DataContexAPI } from "../../contexAPI/DataContex";
function Overview() {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
const {overData, FetchOverData} = useContext(DataContexAPI);
  useEffect(() => {
    FetchOverData();
  }, [overData]);

  return (
    <>
    <div id="topM"></div>
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Budget</h3>
            <i className="fas fa-wallet text-primary-600"></i>
          </div>
          <p className="text-3xl font-bold text-gray-900 flex items-center"><IndianRupee/> {overData.totalBudget}</p>
          <p className="text-sm text-gray-600 mt-2">Current Trip Budget</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Spent</h3>
            <i className="fas fa-chart-line text-secondary-600"></i>
          </div>
          <p className="text-3xl font-bold text-gray-900 flex items-center"><IndianRupee/>{overData.totalexpenses}</p>
          <p className="text-sm text-gray-600 mt-2">{Math.round((overData.totalexpenses/overData.totalBudget)*100,2)}% of total budget</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Remaining</h3>
            <i className="fas fa-piggy-bank text-accent-600"></i>
          </div>
          <p className="text-3xl font-bold text-gray-900 flex items-center"><IndianRupee/>{overData.remainingBudget}</p>
          <p className="text-sm text-gray-600 mt-2">{(overData.remainingBudget/overData.totalBudget)*100}% remaining</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Daily Avg</h3>
            <i className="fas fa-calculator text-primary-600"></i>
          </div>
          <p className="text-3xl font-bold text-gray-900 flex items-center"><IndianRupee/>{Math.round(overData.dailyAvgSpent).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}

export default Overview;
