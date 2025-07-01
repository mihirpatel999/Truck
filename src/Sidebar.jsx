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



import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiTruck,
  FiBarChart2,
  FiUser,
  FiClipboard
} from "react-icons/fi";
import { MdOutlineWarehouse } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { PiPackageLight } from "react-icons/pi";

export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
  const location = useLocation();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "");
  }, []);

  const panelList = [
    { name: "Home", path: "/home", icon: <FiHome />, roles: [] },
    { name: "Gate Keeper", path: "/gate", icon: <FiHome />, roles: ["Owner", "Admin", "GateKeeper"] },
    { name: "Truck Transaction", path: "/truck", icon: <FiTruck />, roles: ["Owner", "Admin", "Dispatch"] },
    { name: "Reports", path: "/reports", icon: <FiBarChart2 />, roles: ["Owner", "Admin", "Report"] },
  ];

  const allowedPanels = panelList.filter((p) => {
    if (!userRole) return false;
    if (p.roles.length === 0) return true;
    const roles = userRole.split(",").map((r) => r.trim());
    return roles.some((r) => p.roles.includes(r));
  });

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#0f172a] text-white shadow-2xl transform transition-transform duration-300 z-50 p-6 flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div>
        <div className="flex justify-end mb-6">
          <button onClick={toggleSidebar} className="text-purple-400 hover:text-white text-xl">
            ✖
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-sm">
          {allowedPanels.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={toggleSidebar}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
                location.pathname === item.path ? "bg-blue-700" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[15px]">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="space-y-4 text-sm">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span>🌙 Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="accent-blue-500 w-5 h-5"
          />
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="flex items-center justify-center gap-2 w-full p-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}
