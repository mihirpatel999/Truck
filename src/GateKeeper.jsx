// // GateKeeper.jsx
// // Full code with strict priority validation (integer-only, sequential enforcement)
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });

//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10" style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}>
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;////////////////////// final working code only auto referch 


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     // priority check
//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         // remove from left list on Check In
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//         // 🚀 NEW: on Check Out, remove from checked-in list
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           // on Check In, add to checked-in list
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* left */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* center */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* right */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;//////////// refrech done 


// // ✅ Final version of GateKeeper.jsx with these updates:
// // 1. Quantity chart bars sorted by priority (left to right)
// // 2. Added "From" and "Next" plant info below truck image

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('Unknown');
//   const [nextPlant, setNextPlant] = useState('');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sortedByPriority = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sortedByPriority);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//       // set from/next
//       const pendingRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       setNextPlant(pendingRes.data.nextPlant || '');
//       const currentIndex = sortedByPriority.findIndex(p => p.plantname?.toLowerCase() === selectedPlant.toLowerCase());
//       const from = sortedByPriority.slice(0, currentIndex).filter(p => p.checkinstatus && p.checkoutstatus).pop();
//       setFromPlant(from?.plantname || 'Unknown');
//     } catch (err) {
//       console.error('Error fetching truck data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');
//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }
//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }
//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });
//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* left */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* center */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* 👇 NEW: Source and Destination */}
//           <div className="flex gap-4 justify-between text-sm font-semibold">
//             <div className="bg-gray-100 px-4 py-2 rounded w-1/2">From: {fromPlant}</div>
//             <div className="bg-gray-100 px-4 py-2 rounded w-1/2 text-right">Next: {nextPlant}</div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* right */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

///////////////////

// // ✅ Final GateKeeper.jsx (priority-based sorted chart, proper 'From' and 'Next' handling)
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('Unknown');
//   const [nextPlant, setNextPlant] = useState('');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities`, {
//         params: { truckNo }
//       });

//       const sortedPanels = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sortedPanels);

//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));

//       // set next and from
//       const statusRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });

//       const { hasPending, nextPlant } = statusRes.data;
//       setNextPlant(hasPending ? nextPlant : 'Done');

//       const finishedRes = await axios.get(`${API_URL}/api/finished-plant`, {
//         params: { truckNo }
//       });
//       setFromPlant(finishedRes.data.lastFinished || 'Unknown');

//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="grid grid-cols-2 gap-2 text-sm text-center">
//             <div className="bg-gray-100 rounded p-1">From: {fromPlant}</div>
//             <div className="bg-gray-100 rounded p-1">Next: {nextPlant}</div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;/////


/////////////////////////////////



// ////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;

//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));

//       const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
//       setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
//       setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Panel */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
//             <div>From: <span className="text-blue-800">{fromPlant}</span></div>
//             <div>Next: <span className="text-green-800">{nextPlant}</span></div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;///////////final codeeeeeeeeee

/////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;

//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.',
//       }));

//       const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
//       setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
//       setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     handleTruckSelect(truckNo);

//     const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    
//     if (checkedInTruck) {
//       setFormData(prev => ({
//         ...prev,
//         invoiceNo: checkedInTruck.invoiceNo || '',  // Set invoice number
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.warn('🚛 Please check in the truck first before checking out.');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoicenumber: type === 'Check Out' ? invoiceNo : '',  
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Panel */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = Math.max(...quantityPanels.map(p => p.quantity || 0), 0) ? (panel.quantity / Math.max(...quantityPanels.map(p => p.quantity || 0))) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
//             <div>From: <span className="text-blue-800">{fromPlant}</span></div>
//             <div>Next: <span className="text-green-800">{nextPlant}</span></div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />

//           {/* Invoice Number (conditionally displayed for Checkout) */}
//           {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
//             <input 
//               name="invoiceNo" 
//               value={formData.invoiceNo} 
//               onChange={handleChange} 
//               placeholder="Invoice No" 
//               className="w-full border px-4 py-2 rounded" 
//             />
//           )}

//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;/////fully woking codeeeee



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography, Paper, List, ListItem, ListItemText, Divider, Tooltip
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import truckImage from './assets/Truck.png.png';
import { useNavigate } from 'react-router-dom';
import CancelButton from './CancelButton';

const API_URL = import.meta.env.VITE_API_URL;

export default function GateKeeper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    truckNo: '',
    dispatchDate: new Date().toISOString().split('T')[0],
    invoiceNo: '',
    remarks: 'This is a system-generated remark.',
  });

  const [plantList, setPlantList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [truckNumbers, setTruckNumbers] = useState([]);
  const [checkedInTrucks, setCheckedInTrucks] = useState([]);
  const [quantityPanels, setQuantityPanels] = useState([]);
  const [fromPlant, setFromPlant] = useState('—');
  const [nextPlant, setNextPlant] = useState('—');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
    const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

    axios.get(`${API_URL}/api/plants`, {
      headers: { userid: userId, role }
    })
      .then(res => {
        const filtered = res.data.filter(plant => {
          const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
          return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
        });
        setPlantList(filtered);
      })
      .catch(err => {
        console.error('❌ Error fetching plants:', err);
        toast.error('Failed to fetch plant list');
      });
  }, []);

  useEffect(() => {
    if (!selectedPlant) return;

    setFormData(prev => ({
      ...prev,
      truckNo: '',
      dispatchDate: new Date().toISOString().split('T')[0],
      invoiceNo: '',
      remarks: 'This is a system-generated remark.'
    }));
    setCheckedInTrucks([]);
    setQuantityPanels([]);

    axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
      .then(res => setTruckNumbers(res.data))
      .catch(err => console.error('Error fetching trucks:', err));

    axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
      .then(res => setCheckedInTrucks(res.data))
      .catch(err => console.error('Error fetching checked-in trucks:', err));
  }, [selectedPlant]);

  const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
  const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
  };

  const handleTruckSelect = async (truckNo) => {
    setFormData(prev => ({ ...prev, truckNo }));

    try {
      const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
        params: { plantName: selectedPlant, truckNo }
      });
      const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
      const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
      setQuantityPanels(sorted);

      setFormData(prev => ({
        ...prev,
        remarks: remarksRes.data.remarks || 'No remarks available.',
      }));

      const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
      setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
      setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
    } catch (err) {
      console.error('Error fetching data:', err);
      setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
    }
  };

  const handleCheckedInClick = (truckNo) => {
    handleTruckSelect(truckNo);
    const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    if (checkedInTruck) {
      setFormData(prev => ({
        ...prev,
        invoiceNo: checkedInTruck.invoiceNo || '',
      }));
    }
  };

  const handleSubmit = async (type) => {
    const { truckNo, dispatchDate, invoiceNo } = formData;

    if (!selectedPlant) return toast.warn('Please select a plant first.');
    if (!truckNo) return toast.warn('🚛 Please select a truck number.');
    if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

    try {
      const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
        params: { truckNo, plantName: selectedPlant }
      });
      const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

      if (hasPending && !canProceed) {
        return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
      }
    } catch (error) {
      console.error('Priority check error:', error);
      toast.error('❌ Error checking priority status');
      return;
    }

    if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
      return toast.error('🚫 This truck is already checked in!');
    }

    if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
      return toast.warn('🚛 Please check in the truck first before checking out.');
    }

    try {
      const response = await axios.post(`${API_URL}/api/update-truck-status`, {
        truckNo,
        plantName: selectedPlant,
        type,
        dispatchDate,
        invoicenumber: type === 'Check Out' ? invoiceNo : '',
        quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
      });

      if (response.data.message?.includes('✅')) {
        setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
        if (type === 'Check Out') {
          setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
        } else {
          setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
        }
        toast.success(response.data.message);
        setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
        setQuantityPanels([]);
      } else {
        toast.error(response.data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 4 }}>
      <CancelButton />
      <Grid container spacing={3} maxWidth="lg" mx="auto">
        
        {/* Left Panel */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Select Plant</Typography>
              <Select
                fullWidth
                value={selectedPlant}
                onChange={handlePlantChange}
                displayEmpty
              >
                <MenuItem value=""><em>Select Plant</em></MenuItem>
                {plantList.map((plant, i) => (
                  <MenuItem key={i} value={getPlantName(plant)}>{getPlantName(plant)}</MenuItem>
                ))}
              </Select>

              <Box mt={3}>
                <Typography variant="subtitle1" color="primary">Truck List</Typography>
                <Paper variant="outlined" sx={{ maxHeight: 300, overflow: 'auto', mt: 1 }}>
                  <List>
                    {truckNumbers.length === 0 && (
                      <ListItem>
                        <ListItemText primary="No trucks available" />
                      </ListItem>
                    )}
                    {truckNumbers.map((t, i) => (
                      <ListItem button key={i} onClick={() => handleTruckSelect(getTruckNo(t))}>
                        <ListItemText primary={`🚛 ${getTruckNo(t)}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Center Panel */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box position="relative" textAlign="center">
                <img src={truckImage} alt="Truck" style={{ width: '100%', height: 150, objectFit: 'contain' }} />
                <Box display="flex" justifyContent="center" alignItems="flex-end" position="absolute" bottom={15} left={20} right={20} gap={1}>
                  {quantityPanels.map((panel, index) => {
                    const height = Math.max(...quantityPanels.map(p => p.quantity || 0), 0) ? (panel.quantity / Math.max(...quantityPanels.map(p => p.quantity || 0))) * 100 : 0;
                    const colors = ['success.main', 'primary.main', 'warning.main', 'error.main'];
                    return (
                      <Tooltip title={`${panel.plantname}: ${panel.quantity}`} key={index}>
                        <Box
                          sx={{
                            bgcolor: colors[index % colors.length],
                            width: `${100 / quantityPanels.length}%`,
                            height: `${height}%`,
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                          }}
                        >
                          <Typography variant="caption">📦 {panel.quantity}</Typography>
                          <Typography variant="caption" noWrap>{panel.plantname}</Typography>
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Typography>From: <b>{fromPlant}</b> &nbsp; Next: <b>{nextPlant}</b></Typography>

              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Truck No"
                  name="truckNo"
                  value={formData.truckNo}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Dispatch Date"
                  type="date"
                  name="dispatchDate"
                  value={formData.dispatchDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
                  <TextField
                    label="Invoice No"
                    name="invoiceNo"
                    value={formData.invoiceNo}
                    onChange={handleChange}
                    fullWidth
                  />
                )}
                <TextField
                  label="Remarks"
                  name="remarks"
                  value={formData.remarks}
                  fullWidth
                  multiline
                  rows={3}
                  InputProps={{ readOnly: true }}
                />
                <Box display="flex" gap={2}>
                  <Button variant="contained" color="success" fullWidth onClick={() => handleSubmit('Check In')}>Check In</Button>
                  <Button variant="contained" color="error" fullWidth onClick={() => handleSubmit('Check Out')}>Check Out</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>Checked In Trucks</Typography>
              <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
                <List>
                  {checkedInTrucks.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No checked-in trucks" />
                    </ListItem>
                  )}
                  {checkedInTrucks.map((t, i) => (
                    <ListItem button key={i} onClick={() => handleCheckedInClick(getTruckNo(t))}>
                      <ListItemText primary={`✓ ${getTruckNo(t)}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </Box>
  );
}


