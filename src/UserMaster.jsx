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



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

const UserMaster = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    loginName: '',
    password: '',
    confirmPassword: '',
    modules: {
      admin: false,
      gatekeeper: false,
      report: false,
      dispatch: false,
      loader: false
    },
    divisions: [],
    timingFrom: '',
    timingTo: '',
    contactNo: ''
  });

  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/plants`)
      .then(res => setPlantList(res.data))
      .catch(err => {
        console.error('Error fetching plants:', err);
        toast.error('Failed to load plant list.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModuleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      modules: { ...prev.modules, [name]: checked }
    }));
  };

  const handleDivisionSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, divisions: selected }));
  };

  const resetForm = () => {
    setFormData({
      employeeName: '',
      loginName: '',
      password: '',
      confirmPassword: '',
      modules: {
        admin: false,
        gatekeeper: false,
        report: false,
        dispatch: false,
        loader: false
      },
      divisions: [],
      timingFrom: '',
      timingTo: '',
      contactNo: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        employeeName: formData.employeeName,
        loginName: formData.loginName,
        password: formData.password,
        modules: Object.keys(formData.modules).filter(key => formData.modules[key]),
        divisions: formData.divisions,
        timingFrom: formData.timingFrom,
        timingTo: formData.timingTo,
        contactNo: formData.contactNo
      };

      await axios.post(`${API_URL}/api/users`, payload);
      toast.success("User created successfully.");
      resetForm();
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Failed to create user.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">👤 User Master</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Employee Name</label>
            <input name="employeeName" value={formData.employeeName} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" required />
          </div>

          <div>
            <label className="block font-medium">Login Name</label>
            <input name="loginName" value={formData.loginName} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" required />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input name="password" value={formData.password} onChange={handleChange} type="password" className="w-full border px-4 py-2 rounded-md" required />
          </div>

          <div>
            <label className="block font-medium">Confirm Password</label>
            <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full border px-4 py-2 rounded-md" required />
          </div>
        </div>

        <div>
          <label className="block font-medium">Module Rights</label>
          <div className="flex gap-4 flex-wrap">
            {['admin', 'gatekeeper', 'report', 'dispatch', 'loader'].map(module => (
              <label key={module} className="capitalize">
                <input type="checkbox" name={module} checked={formData.modules[module]} onChange={handleModuleChange} className="mr-1" />
                {module}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Division Allowed</label>
          <select multiple name="divisions" value={formData.divisions} onChange={handleDivisionSelect} className="w-full border px-4 py-2 rounded-md h-40">
            {plantList.map((plant, i) => (
              <option key={i} value={plant.plantname || plant.PlantName}>
                {plant.plantname || plant.PlantName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">User Timing (From)</label>
            <input type="time" name="timingFrom" value={formData.timingFrom} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block font-medium">User Timing (To)</label>
            <input type="time" name="timingTo" value={formData.timingTo} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
          </div>
        </div>

        <div>
          <label className="block font-medium">Contact No.</label>
          <input name="contactNo" value={formData.contactNo} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" />
        </div>

        <div className="flex justify-between pt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save User</button>
          <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Reset</button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default UserMaster;




//////////////////////////////////////////////////////////////






