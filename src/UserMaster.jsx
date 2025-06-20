// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// const UserMaster = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     plants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         console.error('Error fetching plants:', err);
//         toast.error('Failed to load plant list.');
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePlantSelect = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(option => option.value);
//     setFormData(prev => ({ ...prev, plants: selected }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.warn("Passwords do not match.");
//       return;
//     }

//     try {
//       await axios.post(`${API_URL}/api/users`, formData);
//       toast.success("User created successfully.");
//       setFormData({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         role: '',
//         plants: [],
//       });
//     } catch (err) {
//       console.error("Error creating user:", err);
//       toast.error("Failed to create user.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">👤 User Master</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Full Name</label>
//           <input
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             type="text"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Email</label>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Password</label>
//           <input
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Confirm Password</label>
//           <input
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             type="password"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="staff">Staff</option>
//           </select>
//         </div>

//         {formData.role === 'staff' && (
//           <div>
//             <label className="block font-medium">Select Plants (for Staff)</label>
//             <select
//               multiple
//               name="plants"
//               value={formData.plants}
//               onChange={handlePlantSelect}
//               className="w-full border px-4 py-2 rounded-md h-40"
//             >
//               {plantList.map((plant, i) => (
//                 <option key={i} value={plant.plantname || plant.PlantName}>
//                   {plant.plantname || plant.PlantName}
//                 </option>
//               ))}
//             </select>
//             <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</p>
//           </div>
//         )}

//         <div className="flex justify-between pt-4">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save User
//           </button>
//           <button
//             type="button"
//             onClick={() => setFormData({
//               fullName: '',
//               email: '',
//               password: '',
//               confirmPassword: '',
//               role: '',
//               plants: [],
//             })}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Reset
//           </button>
//         </div>
//       </form>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default UserMaster;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// const UserMaster = () => {
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     loginName: '',
//     password: '',
//     confirmPassword: '',
//     modules: {
//       admin: false,
//       gatekeeper: false,
//       report: false,
//       dispatch: false,
//       loader: false
//     },
//     divisions: [],
//     timingFrom: '',
//     timingTo: '',
//     contactNo: ''
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         console.error('Error fetching plants:', err);
//         toast.error('Failed to load plant list.');
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleModuleChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       modules: { ...prev.modules, [name]: checked }
//     }));
//   };

//   const handleDivisionSelect = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(option => option.value);
//     setFormData(prev => ({ ...prev, divisions: selected }));
//   };

//   const resetForm = () => {
//     setFormData({
//       employeeName: '',
//       loginName: '',
//       password: '',
//       confirmPassword: '',
//       modules: {
//         admin: false,
//         gatekeeper: false,
//         report: false,
//         dispatch: false,
//         loader: false
//       },
//       divisions: [],
//       timingFrom: '',
//       timingTo: '',
//       contactNo: ''
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.warn("Passwords do not match.");
//       return;
//     }

//     try {
//       const payload = {
//         employeeName: formData.employeeName,
//         loginName: formData.loginName,
//         password: formData.password,
//         modules: Object.keys(formData.modules).filter(key => formData.modules[key]),
//         divisions: formData.divisions,
//         timingFrom: formData.timingFrom,
//         timingTo: formData.timingTo,
//         contactNo: formData.contactNo
//       };

//       await axios.post(`${API_URL}/api/users`, payload);
//       toast.success("User created successfully.");
//       resetForm();
//     } catch (err) {
//       console.error("Error creating user:", err);
//       toast.error("Failed to create user.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">👤 User Master</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Employee Name</label>
//             <input name="employeeName" value={formData.employeeName} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" required />
//           </div>

//           <div>
//             <label className="block font-medium">Login Name</label>
//             <input name="loginName" value={formData.loginName} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" required />
//           </div>

//           <div>
//             <label className="block font-medium">Password</label>
//             <input name="password" value={formData.password} onChange={handleChange} type="password" className="w-full border px-4 py-2 rounded-md" required />
//           </div>

//           <div>
//             <label className="block font-medium">Confirm Password</label>
//             <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full border px-4 py-2 rounded-md" required />
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Module Rights</label>
//           <div className="flex gap-4 flex-wrap">
//             {['admin', 'gatekeeper', 'report', 'dispatch', 'loader'].map(module => (
//               <label key={module} className="capitalize">
//                 <input type="checkbox" name={module} checked={formData.modules[module]} onChange={handleModuleChange} className="mr-1" />
//                 {module}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Division Allowed</label>
//           <select multiple name="divisions" value={formData.divisions} onChange={handleDivisionSelect} className="w-full border px-4 py-2 rounded-md h-40">
//             {plantList.map((plant, i) => (
//               <option key={i} value={plant.plantname || plant.PlantName}>
//                 {plant.plantname || plant.PlantName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">User Timing (From)</label>
//             <input type="time" name="timingFrom" value={formData.timingFrom} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
//           </div>

//           <div>
//             <label className="block font-medium">User Timing (To)</label>
//             <input type="time" name="timingTo" value={formData.timingTo} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Contact No.</label>
//           <input name="contactNo" value={formData.contactNo} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" />
//         </div>

//         <div className="flex justify-between pt-4">
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save User</button>
//           <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Reset</button>
//         </div>
//       </form>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default UserMaster;




//////////////////////////////////////////////////////////////





// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user')) || {};
//   let rights = user.rights || {};

//   if (user.role === 'admin') {
//     rights = {
//       admin: true,
//       gatekeeper: true,
//       report: true,
//       dispatch: true,
//       loader: true
//     };
//   }

//   const showAccessDenied = () => toast.error("❌ You are not authorized to access this module");

//   const handleDropdownToggle = (menu) => {
//     if (menu === 'admin' && !rights.admin) return showAccessDenied();
//     if (menu === 'dispatch' && !rights.dispatch) return showAccessDenied();

//     setAdminOpen(menu === 'admin' ? !adminOpen : false);
//     setDispatcherOpen(menu === 'dispatch' ? !dispatcherOpen : false);
//   };

//   const closeAllMenus = () => {
//     setAdminOpen(false);
//     setDispatcherOpen(false);
//     setMobileMenuOpen(false);
//   };

//   const NavLink = ({ to, label, icon, rightKey }) => (
//     <button
//       onClick={() => {
//         if (!rights[rightKey]) return showAccessDenied();
//       }}
//       className="text-white no-underline hover:text-yellow-400 transition duration-300 hover:scale-105 flex items-center"
//     >
//       <Link
//         to={rights[rightKey] ? to : '#'}
//         onClick={closeAllMenus}
//         className="flex items-center w-full"
//       >
//         {icon} {label}
//       </Link>
//     </button>
//   );

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="text-white font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transform transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             <div className="relative">
//               <button
//                 onClick={() => handleDropdownToggle('admin')}
//                 className="hover:text-yellow-400 flex items-center focus:outline-none transition duration-300 hover:scale-105"
//               >
//                 Admin <span className="ml-1 text-sm">▼</span>
//               </button>
//               {adminOpen && (
//                 <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/plantmaster" label="Plant Master" icon="🏭" rightKey="admin" />
//                   <NavLink to="/usermaster" label="User Master" icon="👤" rightKey="admin" />
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => handleDropdownToggle('dispatch')}
//                 className="hover:text-yellow-400 flex items-center focus:outline-none transition duration-300 hover:scale-105"
//               >
//                 Dispatcher <span className="ml-1 text-sm">▼</span>
//               </button>
//               {dispatcherOpen && (
//                 <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/truck" label="Truck Transaction" icon="🚛" rightKey="dispatch" />
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" label="Gate Keeper" icon="🚪" rightKey="gatekeeper" />
//             <NavLink to="/loader" label="Loader" icon="📦" rightKey="loader" />
//             <NavLink to="/reports" label="Reports" icon="📊" rightKey="report" />
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium border border-gray-700">
//             <div>
//               <button
//                 onClick={() => handleDropdownToggle('admin')}
//                 className="w-full text-left hover:text-yellow-400 transition duration-300 flex items-center"
//               >
//                 👨‍💼 Admin <span className="ml-1 text-sm">▼</span>
//               </button>
//               {adminOpen && (
//                 <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
//                   <NavLink to="/plantmaster" label="Plant Master" icon="🏭" rightKey="admin" />
//                   <NavLink to="/usermaster" label="User Master" icon="👤" rightKey="admin" />
//                 </div>
//               )}
//             </div>

//             <div>
//               <button
//                 onClick={() => handleDropdownToggle('dispatch')}
//                 className="w-full text-left hover:text-yellow-400 transition duration-300 flex items-center"
//               >
//                 🚛 Dispatcher <span className="ml-1 text-sm">▼</span>
//               </button>
//               {dispatcherOpen && (
//                 <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
//                   <NavLink to="/truck" label="Truck Transaction" icon="📝" rightKey="dispatch" />
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" label="Gate Keeper" icon="🚪" rightKey="gatekeeper" />
//             <NavLink to="/loader" label="Loader" icon="📦" rightKey="loader" />
//             <NavLink to="/reports" label="Reports" icon="📊" rightKey="report" />
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [dispatcherOpen, setDispatcherOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  let rights = user.rights || {};

  // ✅ Ensure admin always gets full rights
  if (user.role === 'admin') {
    rights = {
      admin: true,
      gatekeeper: true,
      report: true,
      dispatch: true,
      loader: true
    };
  }

  const showAccessDenied = () => toast.error("❌ You are not authorized to access this module");

  const handleDropdownToggle = (menu) => {
    if (menu === 'admin' && !rights.admin) return showAccessDenied();
    if (menu === 'dispatch' && !rights.dispatch) return showAccessDenied();

    setAdminOpen(menu === 'admin' ? !adminOpen : false);
    setDispatcherOpen(menu === 'dispatch' ? !dispatcherOpen : false);
  };

  const closeAllMenus = () => {
    setAdminOpen(false);
    setDispatcherOpen(false);
    setMobileMenuOpen(false);
  };

  const NavLink = ({ to, label, icon, rightKey }) => (
    <button
      onClick={() => {
        if (!rights[rightKey]) return showAccessDenied();
      }}
      className="text-white no-underline hover:text-yellow-400 transition duration-300 hover:scale-105 flex items-center"
    >
      <Link
        to={rights[rightKey] ? to : '#'}
        onClick={closeAllMenus}
        className="flex items-center w-full"
      >
        {icon} {label}
      </Link>
    </button>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="text-white font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Lemon Software Gate Pass
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none text-2xl transform transition-all duration-300 hover:scale-110"
            >
              ☰
            </button>
          </div>

          <div className="hidden md:flex space-x-8 items-center font-medium text-white">
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('admin')}
                className="hover:text-yellow-400 flex items-center focus:outline-none transition duration-300 hover:scale-105"
              >
                Admin <span className="ml-1 text-sm">▼</span>
              </button>
              {adminOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
                  <NavLink to="/plantmaster" label="Plant Master" icon="🏭" rightKey="admin" />
                  <NavLink to="/usermaster" label="User Master" icon="👤" rightKey="admin" />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('dispatch')}
                className="hover:text-yellow-400 flex items-center focus:outline-none transition duration-300 hover:scale-105"
              >
                Dispatcher <span className="ml-1 text-sm">▼</span>
              </button>
              {dispatcherOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
                  <NavLink to="/truck" label="Truck Transaction" icon="🚛" rightKey="dispatch" />
                </div>
              )}
            </div>

            <NavLink to="/gate" label="Gate Keeper" icon="🚪" rightKey="gatekeeper" />
            <NavLink to="/loader" label="Loader" icon="📦" rightKey="loader" />
            <NavLink to="/reports" label="Reports" icon="📊" rightKey="report" />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium border border-gray-700">
            <div>
              <button
                onClick={() => handleDropdownToggle('admin')}
                className="w-full text-left hover:text-yellow-400 transition duration-300 flex items-center"
              >
                👨‍💼 Admin <span className="ml-1 text-sm">▼</span>
              </button>
              {adminOpen && (
                <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
                  <NavLink to="/plantmaster" label="Plant Master" icon="🏭" rightKey="admin" />
                  <NavLink to="/usermaster" label="User Master" icon="👤" rightKey="admin" />
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => handleDropdownToggle('dispatch')}
                className="w-full text-left hover:text-yellow-400 transition duration-300 flex items-center"
              >
                🚛 Dispatcher <span className="ml-1 text-sm">▼</span>
              </button>
              {dispatcherOpen && (
                <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
                  <NavLink to="/truck" label="Truck Transaction" icon="📝" rightKey="dispatch" />
                </div>
              )}
            </div>

            <NavLink to="/gate" label="Gate Keeper" icon="🚪" rightKey="gatekeeper" />
            <NavLink to="/loader" label="Loader" icon="📦" rightKey="loader" />
            <NavLink to="/reports" label="Reports" icon="📊" rightKey="report" />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

