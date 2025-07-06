
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   // Access map with all keys in lowercase
//   const roleAccess = {
//     owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
//     admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
//     dispatch: ['truck'],
//     gatekeeper: ['gate'],
//     report: ['reports'],
//     loader: ['loader'],
//   };

//   // Case insensitive access check
//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim().toLowerCase());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, routeKey, children, ...props }) => {
//     const handleClick = (e) => {
//       if (!canAccess(routeKey)) {
//         e.preventDefault();
//         alert('You do not have rights to access this page.');
//       }
//     };
//     return (
//       <Link
//         to={to}
//         onClick={handleClick}
//         {...props}
//         style={{
//           cursor: canAccess(routeKey) ? 'pointer' : 'not-allowed',
//           opacity: canAccess(routeKey) ? 1 : 0.6,
//         }}
//       >
//         {children}
//       </Link>
//     );
//   };

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setAdminOpen((prev) => {
//                     if (!prev) setDispatcherOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="hover:text-yellow-400 flex items-center"
//               >
//                 Admin Master <span className="ml-1 text-sm">▼</span>
//               </button>
//               {adminOpen && (
//                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/plantmaster" routeKey="plantmaster">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🏭 Plant Master
//                     </span>
//                   </NavLink>
//                   <NavLink to="/usermaster" routeKey="usermaster">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       👤 User Master
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setDispatcherOpen((prev) => {
//                     if (!prev) setAdminOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="hover:text-yellow-400 flex items-center"
//               >
//                 Dispatcher <span className="ml-1 text-sm">▼</span>
//               </button>
//               {dispatcherOpen && (
//                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/truck" routeKey="truck">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🚛 Truck Transaction
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" routeKey="gate">
//               <span className="hover:text-yellow-400 transition-all flex items-center">
//                 🚪 Gate Keeper
//               </span>
//             </NavLink>

//             <NavLink to="/loader" routeKey="loader">
//               <span className="hover:text-yellow-400 flex items-center">
//                 📦 Loader
//               </span>
//             </NavLink>

//             <NavLink to="/reports" routeKey="reports">
//               <span className="hover:text-yellow-400 transition-all flex items-center">
//                 📊 Reports
//               </span>
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             <div>
//               <button
//                 onClick={() => {
//                   setAdminOpen((prev) => {
//                     if (!prev) setDispatcherOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 👨‍💼 Admin ▼
//               </button>
//               {adminOpen && (
//                 <div className="pl-6 space-y-2 mt-2">
//                   <NavLink to="/plantmaster" routeKey="plantmaster">
//                     <span className="block hover:text-yellow-400">🏭 Plant Master</span>
//                   </NavLink>
//                   <NavLink to="/usermaster" routeKey="usermaster">
//                     <span className="block hover:text-yellow-400">👤 User Master</span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <div>
//               <button
//                 onClick={() => {
//                   setDispatcherOpen((prev) => {
//                     if (!prev) setAdminOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 🚛 Dispatcher ▼
//               </button>
//               {dispatcherOpen && (
//                 <div className="pl-6 space-y-2 mt-2">
//                   <NavLink to="/truck" routeKey="truck">
//                     <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
//               🚪 Gate Keeper
//             </NavLink>

//             <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
//               📦 Loader
//             </NavLink>

//             <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
//               📊 Reports
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;///////////////////////////////my code ///////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   // Match roles exactly as stored in DB/localStorage
//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     Admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     Dispatch: ['truck', 'truckfind'],
//     GateKeeper: ['gate'],
//     Report: ['reports'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim()); // no toLowerCase()
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, routeKey, children, ...props }) => (
//     <Link to={to} {...props}>{children}</Link>
//   );

//   // Hide navbar on login page
//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {(canAccess('plantmaster') || canAccess('usermaster')) && (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     if (!adminOpen) setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 {adminOpen && (
//                   <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                     {canAccess('plantmaster') && (
//                       <NavLink to="/plantmaster" routeKey="plantmaster">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           🏭 Plant Master
//                         </span>
//                       </NavLink>
//                     )}
//                     {canAccess('usermaster') && (
//                       <NavLink to="/usermaster" routeKey="usermaster">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           👤 User Master
//                         </span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     if (!dispatcherOpen) setAdminOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 {dispatcherOpen && (
//                   <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                     {canAccess('truck') && (
//                       <NavLink to="/truck" routeKey="truck">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           🚛 Truck Transaction
//                         </span>
//                       </NavLink>
//                     )}
//                     {canAccess('truckfind') && (
//                       <NavLink to="/truckfind" routeKey="truckfind">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           🔍 Truck Transaction Find
//                         </span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate" routeKey="gate">
//                 <span className="hover:text-yellow-400 transition-all flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader" routeKey="loader">
//                 <span className="hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports" routeKey="reports">
//                 <span className="hover:text-yellow-400 transition-all flex items-center">📊 Reports</span>
//               </NavLink>
//             )}

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             {(canAccess('plantmaster') || canAccess('usermaster')) && (
//               <div>
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     if (!adminOpen) setDispatcherOpen(false);
//                   }}
//                   className="w-full text-left hover:text-yellow-400"
//                 >
//                   👨‍💼 Admin ▼
//                 </button>
//                 {adminOpen && (
//                   <div className="pl-6 space-y-2 mt-2">
//                     {canAccess('plantmaster') && (
//                       <NavLink to="/plantmaster" routeKey="plantmaster">
//                         <span className="block hover:text-yellow-400">🏭 Plant Master</span>
//                       </NavLink>
//                     )}
//                     {canAccess('usermaster') && (
//                       <NavLink to="/usermaster" routeKey="usermaster">
//                         <span className="block hover:text-yellow-400">👤 User Master</span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div>
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     if (!dispatcherOpen) setAdminOpen(false);
//                   }}
//                   className="w-full text-left hover:text-yellow-400"
//                 >
//                   🚛 Dispatcher ▼
//                 </button>
//                 {dispatcherOpen && (
//                   <div className="pl-6 space-y-2 mt-2">
//                     {canAccess('truck') && (
//                       <NavLink to="/truck" routeKey="truck">
//                         <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
//                       </NavLink>
//                     )}
//                     {canAccess('truckfind') && (
//                       <NavLink to="/truckfind" routeKey="truckfind">
//                         <span className="block hover:text-yellow-400">🔍 Truck Find</span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
//                 🚪 Gate Keeper
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
//                 📦 Loader
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
//                 📊 Reports
//               </NavLink>
//             )}

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;////////////////////////////////working navbar////////////

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     Admin: ['plantmaster', 'usermaster','userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     Dispatch: ['truck', 'truckfind'],
//     GateKeeper: ['gate'],
//     Report: ['reports'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, routeKey, children, ...props }) => (
//     <Link to={to} {...props} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl text-white">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     if (!adminOpen) setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('plantmaster') && (
//                     <NavLink to="/plantmaster" routeKey="plantmaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//                         🏭 Plant Master
//                       </span>
//                     </NavLink>
//                   )}
//                   {canAccess('usermaster') && (
//                     <NavLink to="/usermaster" routeKey="usermaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//                         👤 User Master
//                       </span>
//                     </NavLink>
//                   )}
//                       {canAccess('userregister') && (
//                     <NavLink to="/userregister" routeKey="userregister">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//                         👤 User Register
//                       </span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     if (!dispatcherOpen) setAdminOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('truck') && (
//                     <NavLink to="/truck" routeKey="truck">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//                         🚛 Truck Transaction
//                       </span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckfind') && (
//                     <NavLink to="/truckfind" routeKey="truckfind">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//                         🔍 Truck Find
//                       </span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink
//                 to="/gate"
//                 routeKey="gate"
//                 onClick={() => {
//                   setDispatcherOpen(false);
//                   setAdminOpen(false);
//                 }}
//               >
//                 <span className="text-white hover:text-yellow-400 transition-all flex items-center no-underline">
//                   🚪 Gate Keeper
//                 </span>
//               </NavLink>
//             )}

//             {canAccess('loader')  && (
//               <NavLink to="/loader" routeKey="loader">
//                 <span className="text-white hover:text-yellow-400 transition-all flex items-center no-underline">
//                   📦 Loader
//                 </span>
//               </NavLink>
//             )}
//           {(canAccess('reports') || canAccess('truckshedule')) && (
//   <div className="relative group">
//     <button
//       onClick={() => {
//         setAdminOpen(false);
//         setDispatcherOpen(false);
//       }}
//       className="hover:text-yellow-400 flex items-center"
//     >
//       📊 Reports <span className="ml-1 text-sm">▼</span>
//     </button>
//     <div className="absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50">
//       {canAccess('reports') && (
//         <NavLink to="/reports" routeKey="reports">
//           <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//             📈 Reports
//           </span>
//         </NavLink>
//       )}
//       {canAccess('truckshedule') && (
//         <NavLink to="/truckshedule" routeKey="truckshedule">
//           <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
//             🚛 Truck Schedule
//           </span>
//         </NavLink>
//       )}
//     </div>
//   </div>
// )}

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 ease-in-out hover:scale-105"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//                 {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-4 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister'))  && (
//               <div>
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     if (!adminOpen) setDispatcherOpen(false);
//                   }}
//                   className="w-full text-left hover:text-yellow-400"
//                 >
//                   👨‍💼 Admin ▼
//                 </button>
//                 {adminOpen && (
//                   <div className="pl-6 space-y-2 mt-2">
//                     {canAccess('plantmaster') && (
//                       <NavLink to="/plantmaster">
//                         <span className="block hover:text-yellow-400">🏭 Plant Master</span>
//                       </NavLink>
//                     )}
//                     {canAccess('usermaster') && (
//                       <NavLink to="/usermaster">
//                         <span className="block hover:text-yellow-400">👤 User Master</span>
//                       </NavLink>
//                     )}
//                     {canAccess('userregister') && (
//                       <NavLink to="/userregister">
//                         <span className="block hover:text-yellow-400">👤 User Master</span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div>
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     if (!dispatcherOpen) setAdminOpen(false);
//                   }}
//                   className="w-full text-left hover:text-yellow-400"
//                 >
//                   🚛 Dispatcher ▼
//                 </button>
//                 {dispatcherOpen && (
//                   <div className="pl-6 space-y-2 mt-2">
//                     {canAccess('truck') && (
//                       <NavLink to="/truck">
//                         <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
//                       </NavLink>
//                     )}
//                     {canAccess('truckfind') && (
//                       <NavLink to="/truckfind">
//                         <span className="block hover:text-yellow-400">🔍 Truck Find</span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <div>
//                 <NavLink to="/gate">
//                   <span className="block hover:text-yellow-400">🚪 Gate Keeper</span>
//                 </NavLink>
//               </div>
//             )}
//             {canAccess('loader') && (
//               <div>
//                 <NavLink to="/loader">
//                   <span className="block hover:text-yellow-400">📦 Loader</span>
//                 </NavLink>
//               </div>
//             )}
//       {(canAccess('reports') || canAccess('truckshedule')) && (
//   <div>
//     {canAccess('reports') && (
//       <NavLink to="/reports">
//         <span className="block hover:text-yellow-400">📊 Reports</span>
//       </NavLink>
//     )}

//     {canAccess('truckshedule') && (
//       <NavLink to="/truckshedule">
//         <span className="block hover:text-yellow-400">🚛 Truck Schedule</span>
//       </NavLink>
//     )}
//   </div>
// )}

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;////////////////////////////////




// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind', 'truckshedule'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children }) => (
//     <Link to={to} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl text-white">Lemon Software Gate Pass</div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {/* Admin Master */}
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     setDispatcherOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('plantmaster') && (
//                     <NavLink to="/plantmaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🏭 Plant Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('usermaster') && (
//                     <NavLink to="/usermaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">👤 User Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('userregister') && (
//                     <NavLink to="/userregister">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📝 User Register</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Dispatcher */}
//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     setAdminOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('truck') && (
//                     <NavLink to="/truck">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Transaction</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckfind') && (
//                     <NavLink to="/truckfind">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🔍 Truck Find</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Gate */}
//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}

//             {/* Loader */}
//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}

//             {/* Reports */}
//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setReportsOpen(!reportsOpen);
//                     setAdminOpen(false);
//                     setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   📊 Reports <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${reportsOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('reports') && (
//                     <NavLink to="/reports">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📈 Reports</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckshedule') && (
//                     <NavLink to="/truckshedule">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Schedule</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Logout */}
//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-4 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div>
//                 <span className="font-bold">👨‍💼 Admin</span>
//                 {canAccess('plantmaster') && (
//                   <NavLink to="/plantmaster"><span className="block hover:text-yellow-400">🏭 Plant Master</span></NavLink>
//                 )}
//                 {canAccess('usermaster') && (
//                   <NavLink to="/usermaster"><span className="block hover:text-yellow-400">👤 User Master</span></NavLink>
//                 )}
//                 {canAccess('userregister') && (
//                   <NavLink to="/userregister"><span className="block hover:text-yellow-400">📝 User Register</span></NavLink>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div>
//                 <span className="font-bold">🚛 Dispatcher</span>
//                 {canAccess('truck') && (
//                   <NavLink to="/truck"><span className="block hover:text-yellow-400">📝 Truck Transaction</span></NavLink>
//                 )}
//                 {canAccess('truckfind') && (
//                   <NavLink to="/truckfind"><span className="block hover:text-yellow-400">🔍 Truck Find</span></NavLink>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate"><span className="block hover:text-yellow-400">🚪 Gate Keeper</span></NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader"><span className="block hover:text-yellow-400">📦 Loader</span></NavLink>
//             )}

//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div>
//                 <span className="font-bold">📊 Reports</span>
//                 {canAccess('reports') && (
//                   <NavLink to="/reports"><span className="block hover:text-yellow-400">📈 Reports</span></NavLink>
//                 )}
//                 {canAccess('truckshedule') && (
//                   <NavLink to="/truckshedule"><span className="block hover:text-yellow-400">🚛 Truck Schedule</span></NavLink>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;///////////////////////////////////full working navbar//////////////

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind', 'truckshedule'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children }) => (
//     <Link to={to} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl text-white">Lemon Software Gate Pass</div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
            
//             {/* Admin Master */}
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     setDispatcherOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('plantmaster') && (
//                     <NavLink to="/plantmaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🏭 Plant Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('usermaster') && (
//                     <NavLink to="/usermaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">👤 User Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('userregister') && (
//                     <NavLink to="/userregister">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📝 User Register</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Dispatcher */}
//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     setAdminOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('truck') && (
//                     <NavLink to="/truck">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Transaction</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckfind') && (
//                     <NavLink to="/truckfind">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🔍 Truck Find</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Gate */}
//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}

//             {/* Loader */}
//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}

//             {/* Reports */}
//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setReportsOpen(!reportsOpen);
//                     setAdminOpen(false);
//                     setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   📊 Reports <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${reportsOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('reports') && (
//                     <NavLink to="/reports">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📈 Reports</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckshedule') && (
//                     <NavLink to="/truckshedule">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Schedule</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Logout */}
//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu - Modern Panel Style */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-4 grid grid-cols-2 gap-4 bg-gray-900 p-4 rounded-xl shadow-2xl text-white font-medium">

//             {canAccess('plantmaster') && (
//               <NavLink to="/plantmaster">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🏭
//                   <span className="mt-2">Plant Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('usermaster') && (
//               <NavLink to="/usermaster">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   👤
//                   <span className="mt-2">User Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('userregister') && (
//               <NavLink to="/userregister">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📝
//                   <span className="mt-2">User Register</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truck') && (
//               <NavLink to="/truck">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚛
//                   <span className="mt-2">Truck Transaction</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckfind') && (
//               <NavLink to="/truckfind">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🔍
//                   <span className="mt-2">Truck Find</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚪
//                   <span className="mt-2">Gate Keeper</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📦
//                   <span className="mt-2">Loader</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📈
//                   <span className="mt-2">Reports</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckshedule') && (
//               <NavLink to="/truckshedule">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚛
//                   <span className="mt-2">Truck Schedule</span>
//                 </div>
//               </NavLink>
//             )}

//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="col-span-2 mt-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-lg"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

////////

// // UPDATED Navbar.jsx with Mobile Panel Logic
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert('You have been logged out.');
//     window.location.href = '/';
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind', 'truckshedule'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children }) => (
//     <Link to={to} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl text-white">Lemon Software Gate Pass</div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button onClick={() => { setAdminOpen(!adminOpen); setDispatcherOpen(false); setReportsOpen(false); }} className="hover:text-yellow-400 flex items-center">
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('plantmaster') && (<NavLink to="/plantmaster"><span className="block px-4 py-2 text-white hover:bg-blue-600">🏭 Plant Master</span></NavLink>)}
//                   {canAccess('usermaster') && (<NavLink to="/usermaster"><span className="block px-4 py-2 text-white hover:bg-blue-600">👤 User Master</span></NavLink>)}
//                   {canAccess('userregister') && (<NavLink to="/userregister"><span className="block px-4 py-2 text-white hover:bg-blue-600">📝 User Register</span></NavLink>)}
//                 </div>
//               </div>
//             )}
//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button onClick={() => { setDispatcherOpen(!dispatcherOpen); setAdminOpen(false); setReportsOpen(false); }} className="hover:text-yellow-400 flex items-center">
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('truck') && (<NavLink to="/truck"><span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Transaction</span></NavLink>)}
//                   {canAccess('truckfind') && (<NavLink to="/truckfind"><span className="block px-4 py-2 text-white hover:bg-blue-600">🔍 Truck Find</span></NavLink>)}
//                 </div>
//               </div>
//             )}
//             {canAccess('gate') && (<NavLink to="/gate"><span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span></NavLink>)}
//             {canAccess('loader') && (<NavLink to="/loader"><span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span></NavLink>)}
//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div className="relative group">
//                 <button onClick={() => { setReportsOpen(!reportsOpen); setAdminOpen(false); setDispatcherOpen(false); }} className="hover:text-yellow-400 flex items-center">
//                   📊 Reports <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${reportsOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('reports') && (<NavLink to="/reports"><span className="block px-4 py-2 text-white hover:bg-blue-600">📈 Reports</span></NavLink>)}
//                   {canAccess('truckshedule') && (<NavLink to="/truckshedule"><span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Schedule</span></NavLink>)}
//                 </div>
//               </div>
//             )}
//             <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105">
//               🔓 Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


////////////////////




// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem("userRole");
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ["plantmaster", "usermaster", "userregister", "truck", "gate", "loader", "reports", "truckfind", "truckshedule"],
//     Admin: ["plantmaster", "usermaster", "userregister", "truck", "gate", "loader", "reports", "truckfind", "truckshedule"],
//     Dispatch: ["truck", "truckfind", "truckshedule"],
//     Report: ["reports", "truckshedule"],
//     GateKeeper: ["gate"],
//     UserMaster: ["usermaster"],
//     UserRegister: ["userregister"],
//     Loader: ["loader"],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(",").map((r) => r.trim());
//     return roles.some((role) => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children }) => (
//     <Link to={to} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === "/") return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl text-white">Lemon Software Gate Pass</div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {(canAccess("plantmaster") || canAccess("usermaster") || canAccess("userregister")) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     setDispatcherOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? "block" : "hidden"}`}>
//                   {canAccess("plantmaster") && <NavLink to="/plantmaster"><span className="block px-4 py-2 text-white hover:bg-blue-600">🏭 Plant Master</span></NavLink>}
//                   {canAccess("usermaster") && <NavLink to="/usermaster"><span className="block px-4 py-2 text-white hover:bg-blue-600">👤 User Master</span></NavLink>}
//                   {canAccess("userregister") && <NavLink to="/userregister"><span className="block px-4 py-2 text-white hover:bg-blue-600">📝 User Register</span></NavLink>}
//                 </div>
//               </div>
//             )}

//             {(canAccess("truck") || canAccess("truckfind")) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     setAdminOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? "block" : "hidden"}`}>
//                   {canAccess("truck") && <NavLink to="/truck"><span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Transaction</span></NavLink>}
//                   {canAccess("truckfind") && <NavLink to="/truckfind"><span className="block px-4 py-2 text-white hover:bg-blue-600">🔍 Truck Find</span></NavLink>}
//                 </div>
//               </div>
//             )}

//             {canAccess("gate") && <NavLink to="/gate"><span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span></NavLink>}
//             {canAccess("loader") && <NavLink to="/loader"><span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span></NavLink>}

//             {(canAccess("reports") || canAccess("truckshedule")) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setReportsOpen(!reportsOpen);
//                     setAdminOpen(false);
//                     setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   📊 Reports <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${reportsOpen ? "block" : "hidden"}`}>
//                   {canAccess("reports") && <NavLink to="/reports"><span className="block px-4 py-2 text-white hover:bg-blue-600">📈 Reports</span></NavLink>}
//                   {canAccess("truckshedule") && <NavLink to="/truckshedule"><span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Schedule</span></NavLink>}
//                 </div>
//               </div>
//             )}

//             <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105">
//               🔓 Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;//////////////////////panel aa rahi hai//

// Complete, professional, next-level responsive Navbar + Home.jsx setup for Truck ERP project

// i/////////////////////////////////////


// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children }) => (
//     <Link to={to} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="flex items-center space-x-3 text-white font-bold text-xl">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg"
//               alt="Lemon Logo"
//               className="w-8 h-8"
//             />
//             <span>Lemon ERP</span>
//           </div>

//           <div className="md:hidden">
//             {/* <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button> */}
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     setDispatcherOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('plantmaster') && (
//                     <NavLink to="/plantmaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🏭 Plant Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('usermaster') && (
//                     <NavLink to="/usermaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">👤 User Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('userregister') && (
//                     <NavLink to="/userregister">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📝 User Register</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     setAdminOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('truck') && (
//                     <NavLink to="/truck">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Transaction</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckfind') && (
//                     <NavLink to="/truckfind">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🔍 Truck Find</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}

//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}

//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setReportsOpen(!reportsOpen);
//                     setAdminOpen(false);
//                     setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   📊 Reports <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${reportsOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('reports') && (
//                     <NavLink to="/reports">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📈 Reports</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckshedule') && (
//                     <NavLink to="/truckshedule">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Schedule</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Panel Style */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-4 grid grid-cols-2 gap-4 bg-gray-900 p-4 rounded-xl shadow-2xl text-white font-medium">

//             {canAccess('plantmaster') && (
//               <NavLink to="/plantmaster">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🏭 <span className="mt-2">Plant Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('usermaster') && (
//               <NavLink to="/usermaster">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   👤 <span className="mt-2">User Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('userregister') && (
//               <NavLink to="/userregister">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📝 <span className="mt-2">User Register</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truck') && (
//               <NavLink to="/truck">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚛 <span className="mt-2">Truck Transaction</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckfind') && (
//               <NavLink to="/truckfind">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🔍 <span className="mt-2">Truck Find</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚪 <span className="mt-2">Gate Keeper</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📦 <span className="mt-2">Loader</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📈 <span className="mt-2">Reports</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckshedule') && (
//               <NavLink to="/truckshedule">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚛 <span className="mt-2">Truck Schedule</span>
//                 </div>
//               </NavLink>
//             )}

//             <button
//               onClick={handleLogout}
//               className="col-span-2 mt-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-lg"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;///////////////////fully working code with mobile panel and desktop menu


// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children, mobile = false }) => (
//     <Link 
//       to={to} 
//       className={`no-underline transition-all duration-200 ${mobile ? 'w-full' : ''}`}
//       onClick={() => setMobileMenuOpen(false)}
//     >
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <NavLink to="/dashboard">
//               <div className="flex items-center space-x-3 group">
//                 <div className="bg-yellow-500 p-2 rounded-xl shadow-lg transform group-hover:rotate-12 transition duration-300">
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg"
//                     alt="Lemon Logo"
//                     className="w-8 h-8"
//                   />
//                 </div>
//                 <span className="text-white font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
//                   Lemon ERP
//                 </span>
//               </div>
//             </NavLink>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               <div className="w-8 space-y-2">
//                 <span className={`block h-1 w-full bg-yellow-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-3' : ''}`}></span>
//                 <span className={`block h-1 w-full bg-yellow-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
//                 <span className={`block h-1 w-full bg-yellow-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-1' : ''}`}></span>
//               </div>
//             </button>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center font-medium">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     setDispatcherOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="text-gray-200 hover:text-yellow-400 flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                 >
//                   <span className="text-yellow-400">⚙️</span>
//                   <span>Admin</span>
//                   <span className={`transition-transform duration-200 ${adminOpen ? 'rotate-180' : ''}`}>▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-1 w-56 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top ${adminOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
//                   <div className="py-1">
//                     {canAccess('plantmaster') && (
//                       <NavLink to="/plantmaster">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">🏭</span>
//                           <span>Plant Master</span>
//                         </div>
//                       </NavLink>
//                     )}
//                     {canAccess('usermaster') && (
//                       <NavLink to="/usermaster">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">👤</span>
//                           <span>User Master</span>
//                         </div>
//                       </NavLink>
//                     )}
//                     {canAccess('userregister') && (
//                       <NavLink to="/userregister">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">📝</span>
//                           <span>User Register</span>
//                         </div>
//                       </NavLink>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     setAdminOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="text-gray-200 hover:text-yellow-400 flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                 >
//                   <span className="text-yellow-400">🚚</span>
//                   <span>Dispatcher</span>
//                   <span className={`transition-transform duration-200 ${dispatcherOpen ? 'rotate-180' : ''}`}>▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-1 w-56 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top ${dispatcherOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
//                   <div className="py-1">
//                     {canAccess('truck') && (
//                       <NavLink to="/truck">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">📦</span>
//                           <span>Truck Transaction</span>
//                         </div>
//                       </NavLink>
//                     )}
//                     {canAccess('truckfind') && (
//                       <NavLink to="/truckfind">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">🔍</span>
//                           <span>Truck Find</span>
//                         </div>
//                       </NavLink>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <div className="text-gray-200 hover:text-yellow-400 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200">
//                   <span className="text-yellow-400">🚪</span>
//                   <span>Gate Keeper</span>
//                 </div>
//               </NavLink>
//             )}

//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <div className="text-gray-200 hover:text-yellow-400 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200">
//                   <span className="text-yellow-400">🏗️</span>
//                   <span>Loader</span>
//                 </div>
//               </NavLink>
//             )}

//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setReportsOpen(!reportsOpen);
//                     setAdminOpen(false);
//                     setDispatcherOpen(false);
//                   }}
//                   className="text-gray-200 hover:text-yellow-400 flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                 >
//                   <span className="text-yellow-400">📊</span>
//                   <span>Reports</span>
//                   <span className={`transition-transform duration-200 ${reportsOpen ? 'rotate-180' : ''}`}>▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-1 w-56 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top ${reportsOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
//                   <div className="py-1">
//                     {canAccess('reports') && (
//                       <NavLink to="/reports">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">📈</span>
//                           <span>Reports</span>
//                         </div>
//                       </NavLink>
//                     )}
//                     {canAccess('truckshedule') && (
//                       <NavLink to="/truckshedule">
//                         <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-200">
//                           <span className="mr-3">🗓️</span>
//                           <span>Truck Schedule</span>
//                         </div>
//                       </NavLink>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg border border-red-700 transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center space-x-2"
//             >
//               <span>🔓</span>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
//           <div className="grid grid-cols-2 gap-3 pt-4">
//             {canAccess('plantmaster') && (
//               <NavLink to="/plantmaster" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">🏭</span>
//                   </div>
//                   <span className="text-white font-medium">Plant Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('usermaster') && (
//               <NavLink to="/usermaster" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">👤</span>
//                   </div>
//                   <span className="text-white font-medium">User Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('userregister') && (
//               <NavLink to="/userregister" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">📝</span>
//                   </div>
//                   <span className="text-white font-medium">User Register</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truck') && (
//               <NavLink to="/truck" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">🚛</span>
//                   </div>
//                   <span className="text-white font-medium">Truck Transaction</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckfind') && (
//               <NavLink to="/truckfind" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">🔍</span>
//                   </div>
//                   <span className="text-white font-medium">Truck Find</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('gate') && (
//               <NavLink to="/gate" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">🚪</span>
//                   </div>
//                   <span className="text-white font-medium">Gate Keeper</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">🏗️</span>
//                   </div>
//                   <span className="text-white font-medium">Loader</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">📊</span>
//                   </div>
//                   <span className="text-white font-medium">Reports</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckshedule') && (
//               <NavLink to="/truckshedule" mobile>
//                 <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-700">
//                   <div className="bg-yellow-500 p-3 rounded-full mb-2">
//                     <span className="text-xl">🗓️</span>
//                   </div>
//                   <span className="text-white font-medium">Truck Schedule</span>
//                 </div>
//               </NavLink>
//             )}
//           </div>

//           <div className="mt-4">
//             <button
//               onClick={handleLogout}
//               className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-2"
//             >
//               <span>🔓</span>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children, mobile = false, className = '' }) => (
//     <Link 
//       to={to} 
//       className={`no-underline transition-all ${mobile ? 'w-full' : ''} ${className}`}
//       onClick={() => setMobileMenuOpen(false)}
//     >
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   const menuItems = [
//     {
//       id: 'admin',
//       label: 'Administration',
//       icon: '🏛️',
//       routes: [
//         { to: '/plantmaster', label: 'Plant Master', icon: '🏭', access: 'plantmaster' },
//         { to: '/usermaster', label: 'User Master', icon: '👥', access: 'usermaster' },
//         { to: '/userregister', label: 'User Register', icon: '📝', access: 'userregister' }
//       ]
//     },
//     {
//       id: 'dispatch',
//       label: 'Dispatch',
//       icon: '🚚',
//       routes: [
//         { to: '/truck', label: 'Truck Transaction', icon: '📦', access: 'truck' },
//         { to: '/truckfind', label: 'Truck Locator', icon: '📍', access: 'truckfind' }
//       ]
//     },
//     {
//       id: 'operations',
//       label: 'Operations',
//       icon: '🏗️',
//       routes: [
//         { to: '/gate', label: 'Gate Control', icon: '🚪', access: 'gate' },
//         { to: '/loader', label: 'Loading Dock', icon: '🏗️', access: 'loader' }
//       ]
//     },
//     {
//       id: 'analytics',
//       label: 'Analytics',
//       icon: '📊',
//       routes: [
//         { to: '/reports', label: 'Operations Report', icon: '📈', access: 'reports' },
//         { to: '/truckshedule', label: 'Schedule Board', icon: '🗓️', access: 'truckshedule' }
//       ]
//     }
//   ];

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-xl' : 'bg-white/95 backdrop-blur-md'}`}>
//       <div className="max-w-8xl mx-auto px-6">
//         <div className="flex justify-between h-20 items-center border-b border-gray-100">
//           {/* Logo */}
//           <NavLink to="/dashboard" className="flex items-center space-x-3">
//             <div className="flex items-center">
//               <div className="bg-blue-600 p-2 rounded-lg shadow-md">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 2.8L18 10v9h-2v-6h-8v6H6v-9l6-5.2z" />
//                 </svg>
//               </div>
//               <span className="ml-3 text-2xl font-bold text-gray-800">
//                 <span className="text-blue-600">Lemon</span> Logistics
//               </span>
//             </div>
//           </NavLink>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {menuItems.map((section) => (
//               (section.routes.some(item => canAccess(item.access))) && (
//                 <div key={section.id} className="relative">
//                   <button
//                     onClick={() => toggleDropdown(section.id)}
//                     className={`flex items-center px-5 py-3 text-sm font-medium rounded-lg transition-all ${activeDropdown === section.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
//                   >
//                     <span className="mr-2 text-lg">{section.icon}</span>
//                     {section.label}
//                     <svg className={`ml-2 w-4 h-4 transition-transform ${activeDropdown === section.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {activeDropdown === section.id && (
//                     <div className="absolute left-0 mt-1 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 animate-fadeIn">
//                       <div className="py-1">
//                         {section.routes.map((item) => (
//                           canAccess(item.access) && (
//                             <NavLink key={item.to} to={item.to}>
//                               <div className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
//                                 <span className="mr-3 text-lg">{item.icon}</span>
//                                 {item.label}
//                               </div>
//                             </NavLink>
//                           )
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )
//             ))}

//             {/* User Profile Dropdown */}
//             <div className="ml-4 relative">
//               <button
//                 onClick={() => toggleDropdown('user')}
//                 className="flex items-center space-x-2 focus:outline-none"
//               >
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
//                   {userRole?.charAt(0) || 'U'}
//                 </div>
//               </button>

//               {activeDropdown === 'user' && (
//                 <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 animate-fadeIn">
//                   <div className="py-1">
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">Signed in as</p>
//                       <p className="text-sm text-gray-500 truncate">{userRole || 'User'}</p>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center transition-colors"
//                     >
//                       <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden flex items-center">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-gray-700 focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               <div className="w-8 space-y-2">
//                 <span className={`block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''}`}></span>
//                 <span className={`block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
//                 <span className={`block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`}></span>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen bg-white shadow-xl' : 'max-h-0'}`}>
//         <div className="px-6 py-4">
//           <div className="space-y-1">
//             {menuItems.map((section) => (
//               (section.routes.some(item => canAccess(item.access))) && (
//                 <div key={section.id} className="pt-2">
//                   <button
//                     onClick={() => toggleDropdown(`${section.id}-mobile`)}
//                     className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center">
//                       <span className="mr-3 text-xl">{section.icon}</span>
//                       {section.label}
//                     </div>
//                     <svg className={`w-5 h-5 transition-transform ${activeDropdown === `${section.id}-mobile` ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {activeDropdown === `${section.id}-mobile` && (
//                     <div className="mt-1 space-y-1 pl-12 pr-4">
//                       {section.routes.map((item) => (
//                         canAccess(item.access) && (
//                           <NavLink key={item.to} to={item.to} mobile>
//                             <div className="flex items-center px-4 py-3 text-base text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
//                               <span className="mr-3 text-lg">{item.icon}</span>
//                               {item.label}
//                             </div>
//                           </NavLink>
//                         )
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )
//             ))}

//             {/* Mobile User Menu */}
//             <div className="pt-4 border-t border-gray-200 mt-4">
//               <div className="flex items-center px-4 py-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold mr-3">
//                   {userRole?.charAt(0) || 'U'}
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">Logged in</p>
//                   <p className="text-sm text-gray-500">{userRole || 'User'}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-2"
//               >
//                 <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 Sign out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiUser, 
  FiClipboard, 
  FiBarChart2, 
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { 
  MdOutlineWarehouse,
  MdOutlineSchedule
} from 'react-icons/md';
import { 
  BsDoorOpen,
  BsBox
} from 'react-icons/bs';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Role-based access control
  const canAccess = (requiredRoles) => {
    if (!userRole) return false;
    const userRoles = userRole.split(',').map(r => r.trim());
    return requiredRoles.some(role => userRoles.includes(role));
  };

  // Menu configuration
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome />,
      roles: ["Owner", "Admin", "Dispatch", "GateKeeper", "Loader", "Report"]
    },
    {
      title: "Admin",
      icon: <FiUser />,
      roles: ["Owner", "Admin"],
      subItems: [
        { title: "Plant Master", path: "/plantmaster", icon: <MdOutlineWarehouse /> },
        { title: "User Management", path: "/usermaster", icon: <FiUser /> },
        { title: "User Register", path: "/userregister", icon: <FiClipboard /> }
      ]
    },
    {
      title: "Dispatch",
      icon: <FiTruck />,
      roles: ["Owner", "Admin", "Dispatch"],
      subItems: [
        { title: "Truck Transaction", path: "/truck", icon: <FiTruck /> },
        { title: "Truck Locator", path: "/truckfind", icon: <FiTruck /> }
      ]
    },
    {
      title: "Gate Control",
      path: "/gate",
      icon: <BsDoorOpen />,
      roles: ["Owner", "Admin", "GateKeeper"]
    },
    {
      title: "Loading",
      path: "/loader",
      icon: <BsBox />,
      roles: ["Owner", "Admin", "Loader"]
    },
    {
      title: "Reports",
      icon: <FiBarChart2 />,
      roles: ["Owner", "Admin", "Report"],
      subItems: [
        { title: "Operations Report", path: "/reports", icon: <FiBarChart2 /> },
        { title: "Schedule Board", path: "/truckshedule", icon: <MdOutlineSchedule /> }
      ]
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    canAccess(item.roles)
  );

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white mr-2">
              <FiTruck className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-gray-800">Lemon Logistics</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredMenuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeDropdown === index 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                      <FiChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {activeDropdown === index && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span className="mr-3">{subItem.icon}</span>
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="ml-4 flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {filteredMenuItems.map((item, index) => (
              <div key={index}>
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </div>
                      <FiChevronDown 
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {activeDropdown === index && (
                      <div className="pl-8">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                          >
                            <span className="mr-3">{subItem.icon}</span>
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 mt-2"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;