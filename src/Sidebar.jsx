// import React from "react";
// import { Link } from "react-router-dom";

// export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-[#111827] text-white shadow-xl transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300 z-50 p-5`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-bold">Lemon ERP</h2>
//         <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">✖</button>
//       </div>

//       {/* Links */}
//       <div className="space-y-4">
//         <Link to="/home" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🏠 <span>Home</span>
//         </Link>
//         <Link to="/gate" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🚪 <span>Gate Keeper</span>
//         </Link>
//         <Link to="/truck" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🚛 <span>Truck Transaction</span>
//         </Link>
//         <Link to="/reports" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           📊 <span>Reports</span>
//         </Link>

//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//           className="flex items-center gap-3 p-2 hover:bg-red-600 rounded text-red-400"
//         >
//           🔓 <span>Logout</span>
//         </button>

//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between mt-8">
//           <span>🌙 Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={(e) => setDarkMode(e.target.checked)}
//             className="accent-blue-500 w-5 h-5"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
///////////////////



// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   FiHome,
//   FiSettings,
//   FiLogOut,
//   FiTruck,
//   FiBarChart2,
//   FiUser,
//   FiClipboard
// } from "react-icons/fi";
// import { MdOutlineWarehouse } from "react-icons/md";
// import { AiOutlineSchedule } from "react-icons/ai";
// import { PiPackageLight } from "react-icons/pi";

// export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
//   const location = useLocation();
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     setUserRole(localStorage.getItem("userRole") || "");
//   }, []);

//   const panelList = [
//     { name: "Home", path: "/home", icon: <FiHome />, roles: [] },
//     { name: "Gate Keeper", path: "/gate", icon: <FiHome />, roles: ["Owner", "Admin", "GateKeeper"] },
//     { name: "Truck Transaction", path: "/truck", icon: <FiTruck />, roles: ["Owner", "Admin", "Dispatch"] },
//     { name: "Reports", path: "/reports", icon: <FiBarChart2 />, roles: ["Owner", "Admin", "Report"] },
//   ];

//   const allowedPanels = panelList.filter((p) => {
//     if (!userRole) return false;
//     if (p.roles.length === 0) return true;
//     const roles = userRole.split(",").map((r) => r.trim());
//     return roles.some((r) => p.roles.includes(r));
//   });

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-[#0f172a] text-white shadow-2xl transform transition-transform duration-300 z-50 p-6 flex flex-col justify-between ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       {/* Close Button */}
//       <div>
//         <div className="flex justify-end mb-6">
//           <button onClick={toggleSidebar} className="text-purple-400 hover:text-white text-xl">
//             ✖
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-2 text-sm">
//           {allowedPanels.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               onClick={toggleSidebar}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
//                 location.pathname === item.path ? "bg-blue-700" : ""
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-[15px]">{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Footer Section */}
//       <div className="space-y-4 text-sm">
//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between">
//           <span>🌙 Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={(e) => setDarkMode(e.target.checked)}
//             className="accent-blue-500 w-5 h-5"
//           />
//         </div>

//         {/* Logout */}
//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//           className="flex items-center justify-center gap-2 w-full p-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
//         >
//           <FiLogOut /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }



import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiTruck,
  FiBarChart2,
  FiUser,
  FiClipboard,
  FiChevronRight
} from "react-icons/fi";
import { 
  MdOutlineWarehouse,
  MdOutlineDashboard,
  MdOutlineSecurity
} from "react-icons/md";
import { 
  AiOutlineSchedule,
  AiOutlineControl
} from "react-icons/ai";
import { 
  PiPackageLight,
  PiGearSixLight
} from "react-icons/pi";
import { 
  BsDoorOpen,
  BsMoonStars,
  BsSun
} from "react-icons/bs";

export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
  const location = useLocation();
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "");
    setUserName(localStorage.getItem("userName") || "User");
    setUserEmail(localStorage.getItem("userEmail") || "");
  }, []);

  const menuSections = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboard className="text-lg" />, roles: [] }
      ]
    },
    {
      title: "Operations",
      items: [
        { name: "Gate Control", path: "/gate", icon: <BsDoorOpen className="text-lg" />, roles: ["Owner", "Admin", "GateKeeper"] },
        { name: "Truck Management", path: "/truck", icon: <FiTruck className="text-lg" />, roles: ["Owner", "Admin", "Dispatch"] },
        { name: "Loading Dock", path: "/loader", icon: <PiPackageLight className="text-lg" />, roles: ["Owner", "Admin", "Loader"] }
      ]
    },
    {
      title: "Administration",
      items: [
        { name: "Plant Master", path: "/plantmaster", icon: <MdOutlineWarehouse className="text-lg" />, roles: ["Owner", "Admin"] },
        { name: "User Management", path: "/usermaster", icon: <FiUser className="text-lg" />, roles: ["Owner", "Admin"] },
        { name: "Access Control", path: "/userregister", icon: <MdOutlineSecurity className="text-lg" />, roles: ["Owner", "Admin"] }
      ]
    },
    {
      title: "Analytics",
      items: [
        { name: "Operations Report", path: "/reports", icon: <FiBarChart2 className="text-lg" />, roles: ["Owner", "Admin", "Report"] },
        { name: "Schedule Board", path: "/truckshedule", icon: <AiOutlineSchedule className="text-lg" />, roles: ["Owner", "Admin", "Report"] }
      ]
    }
  ];

  const hasAccess = (roles) => {
    if (!userRole) return false;
    if (roles.length === 0) return true;
    const userRoles = userRole.split(",").map((r) => r.trim());
    return userRoles.some((r) => roles.includes(r));
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 shadow-xl transform transition-all duration-300 z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 2.8L18 10v9h-2v-6h-8v6H6v-9l6-5.2z" />
            </svg>
          </div>
          <span className="text-xl font-semibold">Lemon Logistics</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-5 border-b border-gray-700 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-medium">{userName}</div>
          <div className="text-xs text-gray-400">{userEmail}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section, sectionIndex) => {
          const filteredItems = section.items.filter(item => hasAccess(item.roles));
          if (filteredItems.length === 0) return null;
          
          return (
            <div key={sectionIndex} className="mb-6">
              <h3 className="px-5 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <nav className="space-y-1">
                {filteredItems.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={`flex items-center justify-between mx-2 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.path 
                        ? "bg-blue-900/50 text-white border-l-4 border-blue-500" 
                        : "hover:bg-gray-700/50 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`${location.pathname === item.path ? "text-blue-400" : "text-gray-400"}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {location.pathname === item.path && (
                      <FiChevronRight className="text-blue-400" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {/* Settings */}
        <Link
          to="/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-700/50 text-gray-300"
        >
          <PiGearSixLight className="text-lg text-gray-400" />
          <span>Settings</span>
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700/50 text-gray-300"
        >
          <div className="flex items-center space-x-3">
            {darkMode ? (
              <BsSun className="text-lg text-yellow-400" />
            ) : (
              <BsMoonStars className="text-lg text-gray-400" />
            )}
            <span>Dark Mode</span>
          </div>
          <div className={`w-10 h-5 rounded-full flex items-center transition-colors duration-200 ${
            darkMode ? "bg-blue-600 justify-end" : "bg-gray-600 justify-start"
          }`}>
            <div className="w-4 h-4 rounded-full bg-white mx-0.5"></div>
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-900/50 text-red-400 hover:text-red-300"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}