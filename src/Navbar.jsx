
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


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [dispatcherOpen, setDispatcherOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    window.location.href = "/";
  };

  const roleAccess = {
    Owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
    Admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
    Dispatch: ['truck', 'truckfind'],
    GateKeeper: ['gate'],
    Report: ['reports'],
    Loader: ['loader'],
  };

  const canAccess = (route) => {
    if (!userRole) return false;
    const roles = userRole.split(',').map(r => r.trim());
    return roles.some(role => roleAccess[role]?.includes(route));
  };

  const NavLink = ({ to, children, ...props }) => (
    <Link to={to} {...props} className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition rounded-lg no-underline">
      {children}
    </Link>
  );

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        <div className="text-yellow-400 text-2xl font-bold">🍋 Lemon Software</div>

        <div className="hidden md:flex space-x-6 items-center text-white font-medium">
          
          {(canAccess('plantmaster') || canAccess('usermaster')) && (
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-yellow-400">Admin ▼</button>
              <div className="absolute hidden group-hover:block bg-gray-800 mt-2 rounded-lg shadow-lg w-48 py-2">
                {canAccess('plantmaster') && <NavLink to="/plantmaster">🏭 Plant Master</NavLink>}
                {canAccess('usermaster') && <NavLink to="/usermaster">👤 User Master</NavLink>}
              </div>
            </div>
          )}

          {(canAccess('truck') || canAccess('truckfind')) && (
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-yellow-400">Dispatcher ▼</button>
              <div className="absolute hidden group-hover:block bg-gray-800 mt-2 rounded-lg shadow-lg w-48 py-2">
                {canAccess('truck') && <NavLink to="/truck">🚛 Truck Transaction</NavLink>}
                {canAccess('truckfind') && <NavLink to="/truckfind">🔍 Truck Find</NavLink>}
              </div>
            </div>
          )}

          {canAccess('gate') && <NavLink to="/gate">🚪 Gate Keeper</NavLink>}
          {canAccess('loader') && <NavLink to="/loader">📦 Loader</NavLink>}
          {canAccess('reports') && <NavLink to="/reports">📊 Reports</NavLink>}

          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-white">
            Logout
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-3 font-medium">
          
          {(canAccess('plantmaster') || canAccess('usermaster')) && (
            <div>
              <button onClick={() => setAdminOpen(!adminOpen)} className="w-full text-left hover:text-yellow-400">👨‍💼 Admin ▼</button>
              {adminOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {canAccess('plantmaster') && <NavLink to="/plantmaster">🏭 Plant Master</NavLink>}
                  {canAccess('usermaster') && <NavLink to="/usermaster">👤 User Master</NavLink>}
                </div>
              )}
            </div>
          )}

          {(canAccess('truck') || canAccess('truckfind')) && (
            <div>
              <button onClick={() => setDispatcherOpen(!dispatcherOpen)} className="w-full text-left hover:text-yellow-400">🚛 Dispatcher ▼</button>
              {dispatcherOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {canAccess('truck') && <NavLink to="/truck">Truck Transaction</NavLink>}
                  {canAccess('truckfind') && <NavLink to="/truckfind">Truck Find</NavLink>}
                </div>
              )}
            </div>
          )}

          {canAccess('gate') && <NavLink to="/gate">🚪 Gate Keeper</NavLink>}
          {canAccess('loader') && <NavLink to="/loader">📦 Loader</NavLink>}
          {canAccess('reports') && <NavLink to="/reports">📊 Reports</NavLink>}

          <button onClick={handleLogout} className="mt-4 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
