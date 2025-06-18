// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="text-white font-bold text-xl">Lemon Software  Gate Pass</div>

//           {/* Hamburger button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white focus:outline-none text-2xl"
//             >
//               ☰
//             </button>
//           </div>

//         {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center font-medium text-white">
//             {/* Admin Dropdown (on click) */}
//             <div className="relative">
//               <button
//                 onClick={() => setAdminOpen(!adminOpen)}
//                 className="hover:text-yellow-400 flex items-center focus:outline-none"
//               >
//                 Admin <span className="ml-1">▼</span>
//               </button>
//               {adminOpen && (
//                 <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50 py-2">
//                   <Link to="/plantmaster" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">Plant Master</Link>
//                   {/* <Link to="/zone-master" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">Zone Master</Link>
//                   <Link to="/user-master" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">User Master</Link> */}
//                 </div>
//               )}
//             </div>

//             {/* Dispatcher Dropdown (on click) */}
//             <div className="relative">
//               <button
//                 onClick={() => setDispatcherOpen(!dispatcherOpen)}
//                 className="hover:text-yellow-400 flex items-center focus:outline-none"
//               >
//                 Dispatcher <span className="ml-1">▼</span>
//               </button>
//               {dispatcherOpen && (
//                 <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50 py-2">
//                   <Link to="/truck" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">Truck Transaction</Link>
//                 </div>
//               )}
//             </div>

//             {/* Static Links */}
//             <Link to="/gate" style={{ textDecoration: 'none' }} className="text-white hover:text-yellow-400">Gate Keeper</Link>
//             <Link to="/loader" style={{ textDecoration: 'none' }} className="text-white hover:text-yellow-400">Loader</Link>
//             <Link to="/reports" style={{ textDecoration: 'none' }} className="text-white hover:text-yellow-400">Reports</Link>
//           </div>
//         </div>


//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-900 p-4 rounded shadow-md text-white font-medium z-50">
//             {/* Admin mobile */}
//             <div>
//               <button
//                 onClick={() => setAdminOpen(!adminOpen)}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 Admin ▼
//               </button>
//               {adminOpen && (
//                 <div className="pl-4 space-y-1 mt-1">
//                   <Link to="/plantmaster" className="block hover:text-yellow-400">Plant Master</Link>
//                   {/* <Link to="/zone-master" className="block hover:text-yellow-400">Zone Master</Link>
//                   <Link to="/user-master" className="block hover:text-yellow-400">User Master</Link> */}
//                 </div>
//               )}
//             </div>

//             {/* Dispatcher mobile */}
//             <div>
//               <button
//                 onClick={() => setDispatcherOpen(!dispatcherOpen)}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 Dispatcher ▼
//               </button>
//               {dispatcherOpen && (
//                 <div className="pl-4 space-y-1 mt-1">
//                   <Link to="/truck" className="block hover:text-yellow-400">Truck Transaction</Link>
//                 </div>
//               )}
//             </div>

//             <Link to="/gate" className="block hover:text-yellow-400">Gate Keeper</Link>
//             <Link to="/loader" className="block hover:text-yellow-400">Loader</Link>
//             <Link to="/reports" className="block hover:text-yellow-400">Reports</Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#111827] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-white text-xl font-bold">Lemon Software Gate Pass</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            {/* Admin dropdown */}
            <div className="relative group">
              <button className="hover:text-yellow-400">Admin</button>
              <div className="absolute hidden group-hover:block bg-gray-800 mt-2 rounded shadow-lg w-48 py-2">
                <Link to="/plantmaster" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">Plant Master</Link>
              </div>
            </div>

            {/* Dispatcher dropdown */}
            <div className="relative group">
              <button className="hover:text-yellow-400">Dispatcher</button>
              <div className="absolute hidden group-hover:block bg-gray-800 mt-2 rounded shadow-lg w-56 py-2">
                <Link to="/truck" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">Truck Transaction</Link>
              </div>
            </div>

            <Link to="/gate" className="hover:text-yellow-400">Gate Keeper</Link>
            <Link to="/loader" className="hover:text-yellow-400">Loader</Link>
            <Link to="/reports" className="hover:text-yellow-400">Reports</Link>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 text-white px-4 py-4 rounded shadow space-y-2 text-sm">
            <details className="group">
              <summary className="cursor-pointer hover:text-yellow-400">Admin</summary>
              <div className="pl-4 mt-1 space-y-1">
                <Link to="/plantmaster" className="block hover:text-yellow-400">Plant Master</Link>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer hover:text-yellow-400">Dispatcher</summary>
              <div className="pl-4 mt-1 space-y-1">
                <Link to="/truck" className="block hover:text-yellow-400">Truck Transaction</Link>
              </div>
            </details>

            <Link to="/gate" className="block hover:text-yellow-400">Gate Keeper</Link>
            <Link to="/loader" className="block hover:text-yellow-400">Loader</Link>
            <Link to="/reports" className="block hover:text-yellow-400">Reports</Link>
          </div>
        )}
      </div>
    </nav>
  );
}







