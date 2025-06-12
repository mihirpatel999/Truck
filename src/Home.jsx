


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="flex items-center px-6 py-3">
//         <h1 className="text-xl font-bold text-indigo-600">Truck_Tracking</h1>

//         <ul className="flex ml-10 space-x-8 text-gray-700 font-medium">
//           <li
//             className="relative cursor-pointer"
//             onMouseEnter={() => setAdminOpen(true)}
//             onMouseLeave={() => setAdminOpen(false)}
//           >
//             Admin
//             {adminOpen && (
//               <ul className="absolute top-8 left-0 bg-white border rounded shadow-md z-10 w-40">
//                 <li className="hover:bg-indigo-100 px-4 py-2">
//                   <Link to="/division">Division Master</Link>
//                 </li>
//                 <li className="hover:bg-indigo-100 px-4 py-2">
//                   <Link to="/zone">Zone Master</Link>
//                 </li>
//                 <li className="hover:bg-indigo-100 px-4 py-2">
//                   <Link to="/user">User Master</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li><Link to="/dispatcher">Dispatcher</Link></li>
//           <li><Link to="/gatekeeper">Gate Keeper</Link></li>
//           <li><Link to="/loader">Loader</Link></li>
//           <li><Link to="/reports">Reports</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;








///////////////////////////////////////////////////////////////////////////  division master code/////////////////////////////////////////////////////////////////////////////////



// import React, { useState } from 'react';

// function DivisionMaster() {
//   const [divisionName, setDivisionName] = useState('');
//   const [description, setDescription] = useState('');

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 to-blue-100">
//       <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-center text-xl font-bold text-indigo-700 mb-6">Division Master</h2>
        
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Division Name</label>
//           <input
//             type="text"
//             value={divisionName}
//             onChange={(e) => setDivisionName(e.target.value)}
//             className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={3}
//             className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300"
//           ></textarea>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
//             Cancel
//           </button>
//           <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DivisionMaster;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////  gate keeper page ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: '',
//     dispatcher: '',
//     contact: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (type) => {
//     alert(`${type} done for Truck: ${formData.truckNo}`);
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* Truck Number Dropdown & Truck Image */}
//         <div className="col-span-1 space-y-4">
//           <select className="w-full border px-4 py-2 rounded-md shadow-sm">
//             <option>TN-09-F-9633</option>
//             <option>GJ-9-Z-2809</option>
//           </select>
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />
//         </div>

//         {/* Center Form Inputs */}
//         <div className="col-span-1 space-y-4">
//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="YYYY-MM-DD"
//               type="date"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold text-gray-700">Dispatcher</label>
//             <input
//               name="dispatcher"
//               value={formData.dispatcher}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Dispatcher Name"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold text-gray-700">Contact No.</label>
//             <input
//               name="contact"
//               value={formData.contact}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Phone Number"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//           <div className="text-right">
//             <button className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded hover:bg-indigo-700">
//               Print Chit
//             </button>
//           </div>
//         </div>

//         {/* Truck List */}
//         <div className="col-span-1">
//           <div className="bg-blue-200 rounded p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               <li>GJ-12-Y-6913</li>
//               <li>CG-04-E-8117</li>
//               <li>RJ-07-GA-4452</li>
//               <li>RJ-14-GB-477</li>
//               <li>GJ-1-BY-6277</li>
//               <li>MH-09-Q-687</li>
//               <li>RJ-32-GA-312</li>
//               <li>RJ-14-GC-8182</li>
//               <li>KA-01-B-2997</li>
//               <li>GJ-6V-5428</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="max-w-6xl mx-auto mt-8">
//         <table className="w-full table-auto border shadow">
//           <thead className="bg-orange-400 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Division Name</th>
//               <th className="px-4 py-2 text-left">Check In Time</th>
//               <th className="px-4 py-2 text-left">Check Out Time</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white text-gray-700">
//             <tr>
//               <td className="px-4 py-2">North Zone</td>
//               <td className="px-4 py-2">10:00 AM</td>
//               <td className="px-4 py-2">--</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default GateKeeper;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-50 to-white">
      
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg" // Lemon icon
          alt="Lemon Logo"
          className="w-20 h-20 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">
          Welcome to Lemon Software Solution
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          We develop modern, scalable ERP solutions designed to streamline operations,
          enhance productivity, and drive growth for businesses of all sizes.
        </p>
      </section>

      {/* ERP Features */}
      <section className="py-12 bg-white px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 shadow rounded-lg border">
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">Inventory Management</h3>
            <p className="text-gray-600">Track, control, and manage your stock levels with ease.</p>
          </div>
          <div className="p-6 shadow rounded-lg border">
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">Billing & Invoicing</h3>
            <p className="text-gray-600">Create automated invoices and manage customer payments smoothly.</p>
          </div>
          <div className="p-6 shadow rounded-lg border">
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">Reports & Analytics</h3>
            <p className="text-gray-600">Make data-driven decisions using real-time reports and dashboards.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-yellow-100 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to grow your business?
        </h2>
        <p className="text-gray-700 mb-6">
          Join hundreds of businesses who trust Lemon Software Solution for their ERP needs.
        </p>
        <a
          href="#"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Get a Free Demo
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} Lemon Software Solution — Building Smart ERP for Smart Businesses.
        </p>
      </footer>
    </div>
  );
}
