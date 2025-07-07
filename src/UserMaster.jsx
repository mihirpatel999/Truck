////////////////////////////////////////final full working code ///////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/users`, formData); // ✅ FIXED here
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
//          <CancelButton/>
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
//           <span className="text-4xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-blue-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border p-3 rounded bg-blue-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }///////////////////////final code //////////////////////////////////////////////////////




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/users`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
//       <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-indigo-200">
//         <CancelButton />
//         <h2 className="text-4xl font-bold text-center mb-8 text-indigo-700 flex items-center justify-center gap-2">
//           <span className="text-5xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Username"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Password"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Contact Number"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-slate-700 block mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm bg-indigo-50 px-3 py-1 rounded-full shadow">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-indigo-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="font-semibold text-slate-700 block mb-2">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-indigo-200 p-3 rounded-xl bg-indigo-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }////////////////////////////////final working code ///////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSelectAllPlants = () => {
//     const allPlantIds = plantList.map((plant) => String(plant.plantId || plant.plantid));
//     const isAllSelected = allPlantIds.every((id) => formData.allowedPlants.includes(id));

//     setFormData((prev) => ({
//       ...prev,
//       allowedPlants: isAllSelected ? [] : allPlantIds,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/users`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
//       <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-indigo-200">
//         <CancelButton />
//         <h2 className="text-4xl font-bold text-center mb-8 text-indigo-700 flex items-center justify-center gap-2">
//           <span className="text-5xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Username"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Password"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Contact Number"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-slate-700 block mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader','UserMaster','UserRegister'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm bg-indigo-50 px-3 py-1 rounded-full shadow">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-indigo-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <label className="font-semibold text-slate-700">Allowed Plants</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllPlants}
//                 className="text-indigo-600 text-sm font-medium hover:underline"
//               >
//                 {formData.allowedPlants.length === plantList.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-indigo-200 p-3 rounded-xl bg-indigo-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }///////////// my working code 



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiUser, FiLock, FiPhone, FiX, FiCheck, FiChevronRight } from 'react-icons/fi';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster({ onClose }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plants:', err);
//       toast.error('Failed to load plant list', { position: "top-right" });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSelectAllPlants = () => {
//     const allPlantIds = plantList.map((plant) => String(plant.plantId || plant.plantid));
//     const isAllSelected = allPlantIds.every((id) => formData.allowedPlants.includes(id));

//     setFormData((prev) => ({
//       ...prev,
//       allowedPlants: isAllSelected ? [] : allPlantIds,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       await axios.post(`${API_URL}/api/users`, formData);
//       toast.success('User created successfully!', { position: "top-right" });
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('Error creating user:', err);
//       toast.error(err.response?.data?.message || 'Failed to create user', { position: "top-right" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
//       <ToastContainer />
      
//       <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-indigo-100 backdrop-blur-sm">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 rounded-full hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-colors"
//           aria-label="Close"
//         >
//           <FiX className="w-5 h-5" />
//         </button>

//         <div className="flex flex-col items-center mb-8">
//           <div className="bg-indigo-100 p-3 rounded-full mb-4">
//             <FiUser className="w-8 h-8 text-indigo-600" />
//           </div>
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
//             User Master Registration
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">Create new user accounts with specific access rights</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Username</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiUser className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter username"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter password"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Contact Number</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiPhone className="text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter contact number"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="font-medium text-gray-700 text-sm block mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-2">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'].map((right) => (
//                 <label 
//                   key={right} 
//                   className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all 
//                     ${formData.moduleRights.includes(right) 
//                       ? 'bg-indigo-600 text-white shadow-md' 
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                 >
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="hidden"
//                   />
//                   {formData.moduleRights.includes(right) ? <FiCheck className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//             <div className="flex justify-between items-center mb-3">
//               <label className="font-medium text-gray-700 text-sm">Allowed Plants</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllPlants}
//                 className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1"
//               >
//                 {formData.allowedPlants.length === plantList.length ? (
//                   <>
//                     <FiX className="w-3 h-3" /> Deselect All
//                   </>
//                 ) : (
//                   <>
//                     <FiCheck className="w-3 h-3" /> Select All
//                   </>
//                 )}
//               </button>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label 
//                     key={plantId} 
//                     className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer transition-colors
//                       ${formData.allowedPlants.includes(plantId) 
//                         ? 'bg-indigo-50 border border-indigo-200' 
//                         : 'hover:bg-gray-100'}`}
//                   >
//                     <div className={`w-4 h-4 border rounded-sm flex items-center justify-center 
//                       ${formData.allowedPlants.includes(plantId) 
//                         ? 'bg-indigo-600 border-indigo-600 text-white' 
//                         : 'border-gray-300'}`}>
//                       {formData.allowedPlants.includes(plantId) && <FiCheck className="w-3 h-3" />}
//                     </div>
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="hidden"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition-all
//               ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
//           >
//             {isLoading ? 'Creating User...' : 'Create User'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiUser, FiLock, FiPhone, FiX, FiCheck, FiChevronRight } from 'react-icons/fi';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster({ onClose }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });


//   const [plantList, setPlantList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const loggedInUsername = localStorage.getItem('username');
//   const loggedInRole = localStorage.getItem('userRole');

//   useEffect(() => {
//     if (!loggedInRole?.includes('Admin') && !loggedInRole?.includes('Owner')) {
//       toast.error('You are not authorized to create users');
//       onClose();
//       return;
//     }
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plants:', err);
//       toast.error('Failed to load plant list', { position: "top-right" });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSelectAllPlants = () => {
//     const allPlantIds = plantList.map((plant) => String(plant.plantId || plant.plantid));
//     const isAllSelected = allPlantIds.every((id) => formData.allowedPlants.includes(id));

//     setFormData((prev) => ({
//       ...prev,
//       allowedPlants: isAllSelected ? [] : allPlantIds,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const payload = {
//       ...formData,
//       createdBy: loggedInUsername,
//     };

//     try {
//       await axios.post(`${API_URL}/api/users`, payload);
//       toast.success('User created successfully!', { position: "top-right" });
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('Error creating user:', err);
//       toast.error(err.response?.data?.message || 'Failed to create user', { position: "top-right" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
//       <ToastContainer />

//       <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-indigo-100 backdrop-blur-sm">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 rounded-full hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-colors"
//           aria-label="Close"
//         >
//           <FiX className="w-5 h-5" />
//         </button>

//         <div className="flex flex-col items-center mb-8">
//           <div className="bg-indigo-100 p-3 rounded-full mb-4">
//             <FiUser className="w-8 h-8 text-indigo-600" />
//           </div>
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
//             User Master Registration
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">Create new user accounts with specific access rights</p>
//           <p className="text-gray-500 text-sm mt-1">
//             Logged in as: <span className="font-medium text-indigo-700">{loggedInUsername} ({loggedInRole})</span>
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Username</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiUser className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter username"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter password"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Contact Number</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiPhone className="text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter contact number"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="font-medium text-gray-700 text-sm block mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-2">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'].map((right) => (
//                 <label 
//                   key={right} 
//                   className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all 
//                     ${formData.moduleRights.includes(right) 
//                       ? 'bg-indigo-600 text-white shadow-md' 
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                 >
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="hidden"
//                   />
//                   {formData.moduleRights.includes(right) ? <FiCheck className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//             <div className="flex justify-between items-center mb-3">
//               <label className="font-medium text-gray-700 text-sm">Allowed Plants</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllPlants}
//                 className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1"
//               >
//                 {formData.allowedPlants.length === plantList.length ? (
//                   <>
//                     <FiX className="w-3 h-3" /> Deselect All
//                   </>
//                 ) : (
//                   <>
//                     <FiCheck className="w-3 h-3" /> Select All
//                   </>
//                 )}
//               </button>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label 
//                     key={plantId} 
//                     className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer transition-colors
//                       ${formData.allowedPlants.includes(plantId) 
//                         ? 'bg-indigo-50 border border-indigo-200' 
//                         : 'hover:bg-gray-100'}`}
//                   >
//                     <div className={`w-4 h-4 border rounded-sm flex items-center justify-center 
//                       ${formData.allowedPlants.includes(plantId) 
//                         ? 'bg-indigo-600 border-indigo-600 text-white' 
//                         : 'border-gray-300'}`}>
//                       {formData.allowedPlants.includes(plantId) && <FiCheck className="w-3 h-3" />}
//                     </div>
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="hidden"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition-all
//               ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
//           >
//             {isLoading ? 'Creating User...' : 'Create User'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }/////final



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiUser, FiLock, FiPhone, FiX, FiCheck, FiChevronRight } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster({ onClose }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const loggedInUsername = localStorage.getItem('username');
//   const loggedInRole = localStorage.getItem('userRole');

//   useEffect(() => {
//     if (!loggedInRole?.includes('Admin') && !loggedInRole?.includes('Owner')) {
//       toast.error('You are not authorized to create users');
//       handleClose();
//       return;
//     }
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plants:', err);
//       toast.error('Failed to load plant list', { position: "top-right" });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSelectAllPlants = () => {
//     const allPlantIds = plantList.map((plant) => String(plant.plantId || plant.plantid));
//     const isAllSelected = allPlantIds.every((id) => formData.allowedPlants.includes(id));

//     setFormData((prev) => ({
//       ...prev,
//       allowedPlants: isAllSelected ? [] : allPlantIds,
//     }));
//   };

//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     }
//     navigate('/dashboard');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const payload = {
//       ...formData,
//       createdBy: loggedInUsername,
//     };

//     try {
//       await axios.post(`${API_URL}/api/users`, payload);
//       toast.success('User created successfully!', { position: "top-right" });
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('Error creating user:', err);
//       toast.error(err.response?.data?.message || 'Failed to create user', { position: "top-right" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
//       <ToastContainer />

//       <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-indigo-100 backdrop-blur-sm">
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 p-2 rounded-full hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-colors"
//           aria-label="Close"
//         >
//           <FiX className="w-5 h-5" />
//         </button>

//         <div className="flex flex-col items-center mb-8">
//           <div className="bg-indigo-100 p-3 rounded-full mb-4">
//             <FiUser className="w-8 h-8 text-indigo-600" />
//           </div>
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
//             User Master Registration
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">Create new user accounts with specific access rights</p>
//           <p className="text-gray-500 text-sm mt-1">
//             Logged in as: <span className="font-medium text-indigo-700">{loggedInUsername} ({loggedInRole})</span>
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Username</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiUser className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter username"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter password"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700 text-sm">Contact Number</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiPhone className="text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="Enter contact number"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="font-medium text-gray-700 text-sm block mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-2">
//               {['Admin', 'PlantMaster', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'].map((right) => (
//                 <label 
//                   key={right} 
//                   className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all 
//                     ${formData.moduleRights.includes(right) 
//                       ? 'bg-indigo-600 text-white shadow-md' 
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                 >
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="hidden"
//                   />
//                   {formData.moduleRights.includes(right) ? <FiCheck className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//             <div className="flex justify-between items-center mb-3">
//               <label className="font-medium text-gray-700 text-sm">Allowed Plants</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllPlants}
//                 className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1"
//               >
//                 {formData.allowedPlants.length === plantList.length ? (
//                   <>
//                     <FiX className="w-3 h-3" /> Deselect All
//                   </>
//                 ) : (
//                   <>
//                     <FiCheck className="w-3 h-3" /> Select All
//                   </>
//                 )}
//               </button>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label 
//                     key={plantId} 
//                     className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer transition-colors
//                       ${formData.allowedPlants.includes(plantId) 
//                         ? 'bg-indigo-50 border border-indigo-200' 
//                         : 'hover:bg-gray-100'}`}
//                   >
//                     <div className={`w-4 h-4 border rounded-sm flex items-center justify-center 
//                       ${formData.allowedPlants.includes(plantId) 
//                         ? 'bg-indigo-600 border-indigo-600 text-white' 
//                         : 'border-gray-300'}`}>
//                       {formData.allowedPlants.includes(plantId) && <FiCheck className="w-3 h-3" />}
//                     </div>
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="hidden"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition-all
//               ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
//           >
//             {isLoading ? 'Creating User...' : 'Create User'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiUsers, 
  FiPieChart,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSettings,
  FiClock
} from 'react-icons/fi';
import { 
  MdOutlineWarehouse,
  MdOutlineSchedule
} from 'react-icons/md';
import { 
  BsShieldLock,
  BsBoxSeam
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

  const hasAccess = (requiredRoles) => {
    if (!userRole) return false;
    const userRoles = userRole.split(',').map(r => r.trim());
    return requiredRoles.some(role => userRoles.includes(role));
  };

  const filterSubItems = (subItems) => {
    return subItems.filter(subItem => {
      if (subItem.path === '/plantmaster') {
        return hasAccess(['Owner', 'Admin', 'UserMaster']);
      }
      if (subItem.path === '/usermaster') {
        return hasAccess(['Owner', 'Admin', 'UserMaster']);
      }
      if (subItem.path === '/userregister') {
        return hasAccess(['Owner', 'Admin', 'UserRegister']);
      }
      if (subItem.path === '/truck') {
        return hasAccess(['Owner', 'Admin', 'Dispatch']);
      }
      if (subItem.path === '/truckfind') {
        return hasAccess(['Owner', 'Admin', 'Dispatch']);
      }
      if (subItem.path === '/gate') {
        return hasAccess(['Owner', 'Admin', 'GateKeeper']);
      }
      if (subItem.path === '/loader') {
        return hasAccess(['Owner', 'Admin', 'Loader']);
      }
      if (subItem.path === '/reports') {
        return hasAccess(['Owner', 'Admin', 'Report']);
      }
      if (subItem.path === '/truckshedule') {
        return hasAccess(['Owner', 'Admin', 'Report']);
      }
      return true;
    });
  };

  // Helper function to check if a menu item should have active styling
  const shouldHighlight = (item) => {
    const noHighlightItems = ['Admin', 'Reports', 'Gate Control', 'Loading'];
    return !noHighlightItems.includes(item.title);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="flex-shrink-0" size={18} />,
      roles: ["Owner", "Admin", "Dispatch", "GateKeeper", "Loader", "Report", "UserMaster", "UserRegister"]
    },
    {
      title: "Admin",
      icon: <FiSettings className="flex-shrink-0" size={18} />,
      roles: ["Owner", "Admin", "UserMaster", "UserRegister"],
      subItems: [
        { title: "Plant Master", path: "/plantmaster", icon: <MdOutlineWarehouse size={16} /> },
        { title: "User Management", path: "/usermaster", icon: <FiUsers size={16} /> },
        { title: "User Register", path: "/userregister", icon: <BsShieldLock size={16} /> }
      ]
    },
    {
      title: "Dispatch",
      icon: <FiTruck className="flex-shrink-0" size={18} />,
      roles: ["Owner", "Admin", "Dispatch"],
      subItems: [
        { title: "Truck Transaction", path: "/truck", icon: <FiTruck size={16} /> },
        { title: "Truck Locator", path: "/truckfind", icon: <FiClock size={16} /> }
      ]
    },
    {
      title: "Gate Control",
      path: "/gate",
      icon: <MdOutlineWarehouse className="flex-shrink-0" size={18} />,
      roles: ["Owner", "Admin", "GateKeeper"]
    },
    {
      title: "Loading",
      path: "/loader",
      icon: <BsBoxSeam className="flex-shrink-0" size={18} />,
      roles: ["Owner", "Admin", "Loader"]
    },
    {
      title: "Reports",
      icon: <FiPieChart className="flex-shrink-0" size={18} />,
      roles: ["Owner", "Admin", "Report"],
      subItems: [
        { title: "Operations Report", path: "/reports", icon: <FiPieChart size={16} /> },
        { title: "Schedule Board", path: "/truckshedule", icon: <MdOutlineSchedule size={16} /> }
      ]
    }
  ];

  const filteredMenuItems = menuItems
    .filter(item => hasAccess(item.roles))
    .map(item => {
      if (item.subItems) {
        return {
          ...item,
          subItems: filterSubItems(item.subItems)
        };
      }
      return item;
    })
    .filter(item => !item.subItems || item.subItems.length > 0);

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown !== null) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  if (location.pathname === '/') return null;

  // Check if we should use the compact layout (1-2 menu items)
  const useCompactLayout = filteredMenuItems.length <= 2;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/dashboard" 
                className="flex-shrink-0 flex items-center"
                onClick={closeAllDropdowns}
              >
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow">
                  <FiTruck className="h-5 w-5" />
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-800">Lemon Logistics</span>
              </Link>
              
              {/* Standard layout for 3+ menu items */}
              {!useCompactLayout && (
                <div className="hidden lg:ml-6 lg:flex lg:space-x-1">
                  {filteredMenuItems.map((item, index) => (
                    <div key={index} className="relative">
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={closeAllDropdowns}
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            shouldHighlight(item) && location.pathname === item.path
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          }`}
                          style={{ textDecoration: 'none' }}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                        </Link>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === index ? null : index);
                            }}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              shouldHighlight(item) && (activeDropdown === index || item.subItems?.some(subItem => location.pathname === subItem.path))
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                            style={{ textDecoration: 'none' }}
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
                            <div 
                              className="absolute left-0 mt-1 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={subItem.path}
                                  onClick={closeAllDropdowns}
                                  className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                                    location.pathname === subItem.path
                                      ? 'bg-blue-50 text-blue-700 font-medium'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                  style={{ textDecoration: 'none' }}
                                >
                                  <span className="mr-3 text-gray-500">{subItem.icon}</span>
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Compact layout for 1-2 menu items */}
              {useCompactLayout && (
                <>
                  {filteredMenuItems.map((item, index) => (
                    <div key={index} className="relative">
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={closeAllDropdowns}
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            shouldHighlight(item) && location.pathname === item.path
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          }`}
                          style={{ textDecoration: 'none' }}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                        </Link>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === index ? null : index);
                            }}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              shouldHighlight(item) && (activeDropdown === index || item.subItems?.some(subItem => location.pathname === subItem.path))
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                            style={{ textDecoration: 'none' }}
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
                            <div 
                              className="absolute right-0 mt-1 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={subItem.path}
                                  onClick={closeAllDropdowns}
                                  className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                                    location.pathname === subItem.path
                                      ? 'bg-blue-50 text-blue-700 font-medium'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                  style={{ textDecoration: 'none' }}
                                >
                                  <span className="mr-3 text-gray-500">{subItem.icon}</span>
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="px-4">
          <div className="flex justify-between h-16 items-center">
            <Link 
              to="/dashboard" 
              className="flex items-center"
              onClick={closeAllDropdowns}
              style={{ textDecoration: 'none' }}
            >
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow">
                <FiTruck className="h-5 w-5" />
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-800">Lemon Logistics</span>
            </Link>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div 
          className={`fixed inset-0 z-40 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeAllDropdowns();
            }
          }}
        >
          <div className="relative flex flex-col w-80 max-w-xs h-full bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="text-xl font-semibold text-gray-800">Menu</div>
              <button
                onClick={closeAllDropdowns}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                style={{ textDecoration: 'none' }}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {filteredMenuItems.map((item, index) => (
                <div key={index} className="px-2">
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={closeAllDropdowns}
                      className={`flex items-center px-4 py-3 rounded-lg mx-2 text-base font-medium ${
                        shouldHighlight(item) && location.pathname === item.path
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === index ? null : index);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg mx-2 text-base font-medium ${
                          shouldHighlight(item) && (activeDropdown === index || item.subItems?.some(subItem => location.pathname === subItem.path))
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </div>
                        <FiChevronDown 
                          className={`h-5 w-5 transition-transform ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          activeDropdown === index ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            onClick={closeAllDropdowns}
                            className={`flex items-center pl-12 pr-4 py-2.5 text-base ${
                              location.pathname === subItem.path
                                ? 'bg-blue-100 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            style={{ textDecoration: 'none' }}
                          >
                            <span className="mr-3">{subItem.icon}</span>
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 py-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gray-50 text-red-600 hover:bg-red-50 font-medium"
                style={{ textDecoration: 'none' }}
              >
                <FiLogOut className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
