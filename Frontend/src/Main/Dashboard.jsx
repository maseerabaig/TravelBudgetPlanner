import React, { useState } from "react";
import {
  Bell,
  Home,
  BarChart2,
  FileText,
  Wallet,
  File,
  Repeat,
  Settings,
  ChevronLeft,
  User,
} from "lucide-react";
import Overview from "./Main-Components/Overview";
import Transaction from "./Main-Components/Transaction";
import Profile from "./Main-Components/Profile";
import ExpenseTracker from "./Main-Components/ExpenseTracker";
import SetBudget from "./Main-Components/SetBudget";

function Dashboard() {
  // check is login
  let session = JSON.parse(localStorage.getItem("isLogin"));
  // const accessToken = localStorage.getItem("accessToken");

  // console.log(session, accessToken)
  if (!session) {
    window.location.href = "/login";
    return null;
  }
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false); // Close notification if profile is open
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false); // Close profile if notification is open
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeMenus = () => {
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex-1 py-6">
          {/* <a href="#layout" className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200">
            <Home className="w-5 h-5" />
            <span className="ml-3">Home</span>
          </a> */}
          <a
            href="/dashboard"
            className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200"
          >
            <BarChart2 className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </a>
          <a
            href="/dashboard"
            className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200"
          >
            <Wallet className="w-5 h-5" />
            <span className="ml-3">Budget</span>
          </a>
          <a
            href="#transaction"
            className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200"
          >
            <FileText className="w-5 h-5" />
            <span className="ml-3">Expenses Tracker</span>
          </a>
          <a
            href="#transaction"
            className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200"
          >
            <FileText className="w-5 h-5" />
            <span className="ml-3">Recent Transactions</span>
          </a>
          {/* <a
            href="#reports"
            className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200"
          >
            <File className="w-5 h-5" />
            <span className="ml-3">Reports</span>
          </a> */}
          {/* <a
            href="#converter"
            className="flex items-center px-6 py-3 text-primary-100 hover:bg-primary-800 transition-colors duration-200"
          >
            <User className="w-5 h-5" />
            <span className="ml-3">Profile</span>
          </a> */}
        </div>
        {/* Hide Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-800 text-white px-4 py-2 rounded-full shadow-md md:hidden"
        >
          {isSidebarOpen && <ChevronLeft />}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-black text-white p-4 shadow-md">
          <button onClick={toggleSidebar} className="md:hidden">
            <span className="text-lg">&#9776;</span>
          </button>
          <div className="text-2xl font-bold">TravelBudget</div>
          <div className="flex items-center space-x-4 relative">
            {/* Notification Icon */}
            <button onClick={toggleNotificationMenu} className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            {isNotificationOpen && (
              <div
                className="absolute right-16 top-12 bg-white text-black w-64 rounded-lg shadow-lg border border-gray-200"
                onMouseLeave={closeMenus}
              >
                {/* <div className="p-4 font-bold border-b">Notifications</div>
                <div className="p-4 hover:bg-gray-100">Notification 1</div>
                <div className="p-4 hover:bg-gray-100">Notification 2</div>
                <div className="p-4 hover:bg-gray-100">Notification 3</div> */}
              </div>
            )}

            {/* Profile Dropdown */}
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2"
            >
              <span className="outline outline-3 outline-white px-2 rounded-full">
                {session.name[0]}
              </span>
              <span>{session.name}</span>
            </button>
            {isProfileOpen && (
              <div
                className="absolute right-0 top-12 bg-white text-black w-48 rounded-lg shadow-lg border border-gray-200"
                onMouseLeave={closeMenus}
              >
                <a
                  href="#profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Overview Component */}
        <div className="flex-1 p-6 bg-gray-100 md:ml-64 overflow-y-auto">
          <div className="flex items-center justify-between">
            <SetBudget />
            <ExpenseTracker />
          </div>
          <Overview />
          <Transaction />
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
