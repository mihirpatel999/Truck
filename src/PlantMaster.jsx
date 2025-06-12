



// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // export default function PlantMaster() {
// // //   const [formData, setFormData] = useState({
// // //     plantName: '',
// // //     plantAddress: '',
// // //     contactPerson: '',
// // //     mobileNo: '',
// // //     remarks: ''
// // //   });

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.post('http://localhost:3001/api/plantmaster', formData);
// // //       alert('Plant data saved successfully!');
// // //     } catch (err) {
// // //       alert('Error saving data');
// // //       console.error(err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
// // //       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
// // //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Plant Master</h2>
// // //         <form className="space-y-4" onSubmit={handleSubmit}>
// // //           {/* Plant Name */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Plant Name</label>
// // //             <input
// // //               type="text"
// // //               name="plantName"
// // //               value={formData.plantName}
// // //               onChange={handleChange}
// // //               placeholder="Enter Plant Name"
// // //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// // //             />
// // //           </div>
// // //           {/* Plant Address */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Plant Address</label>
// // //             <textarea
// // //               name="plantAddress"
// // //               value={formData.plantAddress}
// // //               onChange={handleChange}
// // //               placeholder="Enter Plant Address"
// // //               rows="2"
// // //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// // //             ></textarea>
// // //           </div>
// // //           {/* Contact Person */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Contact Person</label>
// // //             <input
// // //               type="text"
// // //               name="contactPerson"
// // //               value={formData.contactPerson}
// // //               onChange={handleChange}
// // //               placeholder="Enter Contact Person Name"
// // //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// // //             />
// // //           </div>
// // //           {/* Mobile No */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Mobile No</label>
// // //             <input
// // //               type="tel"
// // //               name="mobileNo"
// // //               value={formData.mobileNo}
// // //               onChange={handleChange}
// // //               placeholder="Enter Mobile Number"
// // //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// // //             />
// // //           </div>
// // //           {/* Remarks */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Remarks</label>
// // //             <textarea
// // //               name="remarks"
// // //               value={formData.remarks}
// // //               onChange={handleChange}
// // //               placeholder="Enter Remarks"
// // //               rows="2"
// // //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// // //             ></textarea>
// // //           </div>
// // //           {/* Buttons */}
// // //           <div className="flex justify-between mt-6">
// // //             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
// // //               Save
// // //             </button>
// // //             <button type="reset" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export default function PlantMaster() {
// //   const emptyForm = {
// //     plantName: "",
// //     plantAddress: "",
// //     contactPerson: "",
// //     mobileNo: "",
// //     remarks: "",
// //   };

// //   const [formData, setFormData]   = useState(emptyForm);
// //   const [plantList, setPlantList] = useState([]);
// //   const [isEdit, setIsEdit]       = useState(false);   // ← toggles Update vs Save

// //   /* ───────────────────────────────────────────────
// //      Load all plant names once
// //   ─────────────────────────────────────────────── */
// //   useEffect(() => {
// //     (async () => {
// //       const { data } = await axios.get("http://localhost:3001/api/plants");
// //       setPlantList(data);                               // ["Plant A","Plant B", …]
// //     })().catch(console.error);
// //   }, []);

// //   /* ───────────────────────────────────────────────
// //      Helpers
// //   ─────────────────────────────────────────────── */
// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   async function handleSelect(e) {
// //     const name = e.target.value;
// //     if (!name) return;
// //     // 1) lock dropdown value immediately
// //     setFormData((prev) => ({ ...prev, plantName: name }));
// //     setIsEdit(true);

// //     // 2) fetch full record
// //     try {
// //       const { data } = await axios.get(
// //         `http://localhost:3001/api/plantmaster/${encodeURIComponent(name)}`
// //       );
// //       // keep plantName from dropdown in case recordset is empty
// //       setFormData({ ...data, plantName: name });
// //     } catch (err) {
// //       console.error("Load error:", err);
// //       alert("Plant not found on server");
// //       setIsEdit(false);
// //     }
// //   }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     try {
// //       if (isEdit) {
// //         // PUT update
// //         await axios.put(
// //           `http://localhost:3001/api/plantmaster/${encodeURIComponent(
// //             formData.plantName
// //           )}`,
// //           formData
// //         );
// //         alert("✔ Plant updated");
// //       } else {
// //         // POST create
// //         await axios.post("http://localhost:3001/api/plantmaster", formData);
// //         alert("✔ Plant saved");
// //       }
// //       // refresh list + reset form
// //       const { data } = await axios.get("http://localhost:3001/api/plants");
// //       setPlantList(data);
// //       setFormData(emptyForm);
// //       setIsEdit(false);
// //     } catch (err) {
// //       console.error("Save/update error:", err);
// //       alert("❌ Operation failed (see console)");
// //     }
// //   }

// //   /* ───────────────────────────────────────────────
// //      Render
// //   ─────────────────────────────────────────────── */
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
// //       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
// //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
// //           Plant Master
// //         </h2>

// //         {/* ► Dropdown to enter Edit mode */}
// //         <div className="mb-6">
// //           <label className="block text-sm font-medium text-gray-700 mb-1">
// //             Edit existing plant
// //           </label>
// //           <select
// //             value={isEdit ? formData.plantName : ""}
// //             onChange={handleSelect}
// //             className="w-full border border-gray-300 rounded-lg p-2"
// //           >
// //             <option value="">-- Select plant to edit --</option>
// //             {plantList.map((p) => (
// //               <option key={p} value={p}>
// //                 {p}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* ► Form */}
// //         <form className="space-y-4" onSubmit={handleSubmit}>
// //           {/* Plant Name (readonly in edit mode) */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Plant Name
// //             </label>
// //             <input
// //               name="plantName"
// //               value={formData.plantName}
// //               onChange={handleChange}
// //               disabled={isEdit}
// //               placeholder="Enter Plant Name"
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2 bg-gray-100 disabled:cursor-not-allowed"
// //               required
// //             />
// //           </div>

// //           {/* Address */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Plant Address
// //             </label>
// //             <textarea
// //               name="plantAddress"
// //               rows="2"
// //               value={formData.plantAddress}
// //               onChange={handleChange}
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //               required
// //             />
// //           </div>

// //           {/* Contact Person */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Contact Person
// //             </label>
// //             <input
// //               name="contactPerson"
// //               value={formData.contactPerson}
// //               onChange={handleChange}
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //               required
// //             />
// //           </div>

// //           {/* Mobile */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Mobile No
// //             </label>
// //             <input
// //               name="mobileNo"
// //               value={formData.mobileNo}
// //               onChange={handleChange}
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //               required
// //             />
// //           </div>

// //           {/* Remarks */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Remarks
// //             </label>
// //             <textarea
// //               name="remarks"
// //               rows="2"
// //               value={formData.remarks}
// //               onChange={handleChange}
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //             />
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex justify-between mt-6">
// //             <button
// //               type="submit"
// //               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //             >
// //               {isEdit ? "Update" : "Save"}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 setFormData(emptyForm);
// //                 setIsEdit(false);
// //               }}
// //               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // // }
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // export default function PlantMaster() {
// //   const [formData, setFormData] = useState({
// //     plantName: '',
// //     plantAddress: '',
// //     contactPerson: '',
// //     mobileNo: '',
// //     remarks: ''
// //   });

// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [plantList, setPlantList] = useState([]);

// //   useEffect(() => {
// //     // Fetch all plant names for dropdown
// //     const fetchPlants = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:3001/api/plants');
// //         setPlantList(res.data);
// //       } catch (err) {
// //         console.error('Error fetching plant names:', err);
// //       }
// //     };

// //     fetchPlants();
// //   }, []);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleEditClick = () => {
// //     setIsEditMode(true);
// //   };

// //   const handleDropdownChange = async (e) => {
// //     const selectedPlant = e.target.value;
// //     try {
// //       const res = await axios.get(`http://localhost:3001/api/plantmaster/${selectedPlant}`);
// //       if (res.data) {
// //         setFormData(res.data);
// //       }
// //     } catch (err) {
// //       console.error('Error loading plant data:', err);
// //     }
// //   };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   try {
// //     if (isEditMode && formData.plantId) {
// //       await axios.put(
// //         `http://localhost:3001/api/plantmaster/update/${formData.plantId}`,
// //         {
// //           plantName: formData.plantName,
// //           plantAddress: formData.plantAddress,
// //           contactPerson: formData.contactPerson,
// //           mobileNo: formData.mobileNo,
// //           remarks: formData.remarks
// //         }
// //       );
// //       alert("✅ Plant updated!");
// //     } else {
// //       await axios.post("http://localhost:3001/api/plantmaster", formData);
// //       alert("✅ Plant saved!");
// //     }
// //   } catch (err) {
// //     console.error("Error saving/updating plant", err);
// //     alert("❌ Error occurred.");
// //   }
// // };


// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
// //       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
// //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Plant Master</h2>

// //         {/* Edit Button */}
// //         <div className="mb-4 text-right">
// //           <button
// //             type="button"
// //             onClick={handleEditClick}
// //             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
// //           >
// //             Edit
// //           </button>
// //         </div>

// //         <form className="space-y-4" onSubmit={handleSubmit}>
// //           {/* Plant Name */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Plant Name</label>
// //             {isEditMode ? (
// //               <select
// //                 name="plantName"
// //                 value={formData.plantName}
// //                 onChange={handleDropdownChange}
// //                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //               >
// //                 <option value="">Select Plant</option>
// //                 {plantList.map((name, index) => (
// //                   <option key={index} value={name}>
// //                     {name}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : (
// //               <input
// //                 type="text"
// //                 name="plantName"
// //                 value={formData.plantName}
// //                 onChange={handleChange}
// //                 placeholder="Enter Plant Name"
// //                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //               />
// //             )}
// //           </div>

// //           {/* Plant Address */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Plant Address</label>
// //             <textarea
// //               name="plantAddress"
// //               value={formData.plantAddress}
// //               onChange={handleChange}
// //               placeholder="Enter Plant Address"
// //               rows="2"
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //             ></textarea>
// //           </div>

// //           {/* Contact Person */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Contact Person</label>
// //             <input
// //               type="text"
// //               name="contactPerson"
// //               value={formData.contactPerson}
// //               onChange={handleChange}
// //               placeholder="Enter Contact Person Name"
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //             />
// //           </div>

// //           {/* Mobile No */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Mobile No</label>
// //             <input
// //               type="tel"
// //               name="mobileNo"
// //               value={formData.mobileNo}
// //               onChange={handleChange}
// //               placeholder="Enter Mobile Number"
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //             />
// //           </div>

// //           {/* Remarks */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Remarks</label>
// //             <textarea
// //               name="remarks"
// //               value={formData.remarks}
// //               onChange={handleChange}
// //               placeholder="Enter Remarks"
// //               rows="2"
// //               className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
// //             ></textarea>
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex justify-between mt-6">
// //             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
// //               Save
// //             </button>
// //             <button type="reset" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function PlantMaster() {
//   const [formData, setFormData] = useState({
//     plantId: null,
//     plantName: '',
//     plantAddress: '',
//     contactPerson: '',
//     mobileNo: '',
//     remarks: ''
//   });
//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [showEditButton, setShowEditButton] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/plants');
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plant list:', err);
//     }
//   };

//   const handlePlantSelect = (e) => {
//     const plantName = e.target.value;
//     setSelectedPlant(plantName);
//     setShowEditButton(!!plantName);
//   };

//   const handleEditClick = async () => {
//     if (!selectedPlant) return;
//     try {
//       const res = await axios.get(`http://localhost:3001/api/plantmaster/${encodeURIComponent(selectedPlant)}`);
//       if (res.data && res.data.PlantID) {
//         setFormData({
//           plantId: res.data.PlantID,
//           plantName: res.data.PlantName,
//           plantAddress: res.data.PlantAddress,
//           contactPerson: res.data.ContactPerson,
//           mobileNo: res.data.MobileNo,
//           remarks: res.data.Remarks
//         });
//         setEditMode(true);
//       } else {
//         console.error('No valid plant data returned');
//         alert('❌ Invalid plant selected or no data found');
//       }
//     } catch (err) {
//       console.error('Error fetching plant:', err);
//       alert('❌ Error fetching plant data');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBack = () => {
//     setFormData({
//       plantId: null,
//       plantName: '',
//       plantAddress: '',
//       contactPerson: '',
//       mobileNo: '',
//       remarks: ''
//     });
//     setEditMode(false);
//     setSelectedPlant('');
//     setShowEditButton(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.plantId) {
//         await axios.put(`http://localhost:3001/api/plantmaster/update/${formData.plantId}`, formData);
//         alert('✅ Plant updated successfully!');
//       } else {
//         await axios.post('http://localhost:3001/api/plantmaster', formData);
//         alert('✅ Plant data saved successfully!');
//       }
//       fetchPlants();
//       handleBack();
//     } catch (err) {
//       alert('❌ Error saving data');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Plant Master</h2>
//         {!editMode ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Select Plant to Edit</label>
//               <select value={selectedPlant} onChange={handlePlantSelect} className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2">
//                 <option value="">-- Select --</option>
//                 {plantList.map((plant, index) => (
//                   <option key={index} value={plant.PlantName}>{plant.PlantName}</option>
//                 ))}
//               </select>
//             </div>
//             {showEditButton && (
//               <button
//                 onClick={handleEditClick}
//                 className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//               >
//                 Edit Selected Plant
//               </button>
//             )}
//             <button
//               onClick={() => setEditMode(true)}
//               className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               + Add New Plant
//             </button>
//           </div>
//         ) : (
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Plant Name</label>
//               <input
//                 type="text"
//                 name="plantName"
//                 value={formData.plantName}
//                 onChange={handleChange}
//                 placeholder="Enter Plant Name"
//                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Plant Address</label>
//               <textarea
//                 name="plantAddress"
//                 value={formData.plantAddress}
//                 onChange={handleChange}
//                 placeholder="Enter Plant Address"
//                 rows="2"
//                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
//               ></textarea>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Contact Person</label>
//               <input
//                 type="text"
//                 name="contactPerson"
//                 value={formData.contactPerson}
//                 onChange={handleChange}
//                 placeholder="Enter Contact Person Name"
//                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Mobile No</label>
//               <input
//                 type="tel"
//                 name="mobileNo"
//                 value={formData.mobileNo}
//                 onChange={handleChange}
//                 placeholder="Enter Mobile Number"
//                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Remarks</label>
//               <textarea
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleChange}
//                 placeholder="Enter Remarks"
//                 rows="2"
//                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
//               ></textarea>
//             </div>
//             <div className="flex justify-between mt-6">
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//                 {formData.plantId ? 'Update' : 'Save'}
//               </button>
//               <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
//                 Back
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PlantMaster() {
  const [formData, setFormData] = useState({
    plantId: null,
    plantName: '',
    plantAddress: '',
    contactPerson: '',
    mobileNo: '',
    remarks: ''
  });
  const [plantList, setPlantList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/plants');
      setPlantList(res.data);
    } catch (err) {
      console.error('Error fetching plant list:', err);
    }
  };

  const handlePlantSelect = (e) => {
    const plantName = e.target.value;
    setSelectedPlant(plantName);
    setShowEditButton(!!plantName);
  };

  const handleEditClick = async () => {
    if (!selectedPlant) return;
    try {
      const res = await axios.get(`http://localhost:3001/api/plantmaster/${encodeURIComponent(selectedPlant)}`);
      if (res.data && (res.data.PlantID || res.data.PlantId)) {
        setFormData({
          plantId: res.data.PlantID || res.data.PlantId,
          plantName: res.data.PlantName,
          plantAddress: res.data.PlantAddress,
          contactPerson: res.data.ContactPerson,
          mobileNo: res.data.MobileNo,
          remarks: res.data.Remarks
        });
        setEditMode(true);
      } else {
        console.error('No valid plant data returned');
        alert('❌ Invalid plant selected or no data found');
      }
    } catch (err) {
      console.error('Error fetching plant:', err);
      alert('❌ Error fetching plant data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setFormData({
      plantId: null,
      plantName: '',
      plantAddress: '',
      contactPerson: '',
      mobileNo: '',
      remarks: ''
    });
    setEditMode(false);
    setSelectedPlant('');
    setShowEditButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.plantId) {
        await axios.put(`http://localhost:3001/api/plantmaster/update/${formData.plantId}`, formData);
        alert('✅ Plant updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/plantmaster', formData);
        alert('✅ Plant data saved successfully!');
      }
      fetchPlants();
      handleBack();
    } catch (err) {
      alert('❌ Error saving data');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Plant Master</h2>
        {!editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Plant to Edit</label>
              <select value={selectedPlant} onChange={handlePlantSelect} className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2">
                <option value="">-- Select --</option>
                {[...new Set(plantList.map((plant) => plant.PlantName))].map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
            {showEditButton && (
              <button
                onClick={handleEditClick}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Edit Selected Plant
              </button>
            )}
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              + Add New Plant
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant Name</label>
              <input
                type="text"
                name="plantName"
                value={formData.plantName}
                onChange={handleChange}
                placeholder="Enter Plant Name"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant Address</label>
              <textarea
                name="plantAddress"
                value={formData.plantAddress}
                onChange={handleChange}
                placeholder="Enter Plant Address"
                rows="2"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Enter Contact Person Name"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile No</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Enter Remarks"
                rows="2"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
              ></textarea>
            </div>
            <div className="flex justify-between mt-6">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {formData.plantId ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}