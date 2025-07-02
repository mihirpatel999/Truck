// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function TruckTransaction() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     transactionDate: '',
//     cityName: '',
//     transporter: '',
//     amountPerTon: '',
//     truckWeight: '',
//     deliverPoint: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [newRow, setNewRow] = useState({
//     plantName: '',
//     loadingSlipNo: '',
//     qty: '',
//     priority: '',
//     remarks: '',
//     freight: 'To Pay'
//   });

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         setPlantList([]);
//         console.error('Error fetching plants:', err);
//       });
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
//   };

//   const handleNewRowChange = (e) => {
//     const { name, value } = e.target;
//     setNewRow((prev) => ({
//       ...prev,
//       [name]: value.trim(),
//     }));
//   };

//   const addRow = () => {
//     const { plantName, loadingSlipNo, qty } = newRow;

//     if (!plantName || !loadingSlipNo || !qty) {
//       alert("❌ Please fill in Plant Name, Loading Slip No, and Quantity.");
//       return;
//     }

//     if (isNaN(qty) || Number(qty) <= 0) {
//       alert("❌ Quantity must be a positive number.");
//       return;
//     }

//     const isDuplicate = tableData.some(row =>
//       row.plantName === plantName && row.loadingSlipNo === loadingSlipNo
//     );

//     if (isDuplicate) {
//       alert("❌ Duplicate loading slip for this plant.");
//       return;
//     }

//     setTableData((prevData) => [...prevData, newRow]);

//     setNewRow({
//       plantName: '',
//       loadingSlipNo: '',
//       qty: '',
//       priority: '',
//       remarks: '',
//       freight: 'To Pay',
//     });
//   };

//   const handleDeleteRow = (index) => {
//     setTableData(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     let finalTableData = [...tableData];

//     const isNewRowFilled =
//       newRow.plantName || newRow.loadingSlipNo || newRow.qty || newRow.priority || newRow.remarks;

//     if (isNewRowFilled) {
//       finalTableData.push(newRow);
//     }

//     if (!formData.truckNo || !formData.transactionDate) {
//       return setMessage("❌ Truck No and Transaction Date are required.");
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/truck-transaction`, {
//         formData,
//         tableData: finalTableData,
//       });

//       if (response.data.success) {
//         setMessage("✅ Transaction saved successfully!");
//         setFormData({
//           truckNo: '',
//           transactionDate: '',
//           cityName: '',
//           transporter: '',
//           amountPerTon: '',
//           truckWeight: '',
//           deliverPoint: '',
//           remarks: ''
//         });
//         setTableData([]);
//         setNewRow({
//           plantName: '',
//           loadingSlipNo: '',
//           qty: '',
//           priority: '',
//           remarks: '',
//           freight: 'To Pay'
//         });
//       }
//     } catch (error) {
//       console.error("Submit error:", error);
//       alert(error.response?.data?.message || "Failed to submit data.");
//     }
//   };

//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   return (
//     <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//          <CancelButton/>
//         <h1 className="text-2xl font-bold text-center mb-6">Truck Transaction</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block font-medium">Truck No</label>
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Transaction Date</label>
//             <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">City Name</label>
//             <input name="cityName" value={formData.cityName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Transporter</label>
//             <input name="transporter" value={formData.transporter} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//         </div>

//         <h3 className="text-lg font-semibold mt-6 mb-2">Loading Details</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border text-sm text-left">
//             <thead className="bg-yellow-200">
//               <tr>
//                 <th className="border px-2 py-1">Plant</th>
//                 <th className="border px-2 py-1">Slip No</th>
//                 <th className="border px-2 py-1">Qty</th>
//                 <th className="border px-2 py-1">Priority</th>
//                 <th className="border px-2 py-1">Remarks</th>
//                 <th className="border px-2 py-1">Freight</th>
//                 <th className="border px-2 py-1">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, i) => (
//                 <tr key={i}>
//                   <td className="border px-2 py-1">{row.plantName}</td>
//                   <td className="border px-2 py-1">{row.loadingSlipNo}</td>
//                   <td className="border px-2 py-1">{row.qty}</td>
//                   <td className="border px-2 py-1">{row.priority}</td>
//                   <td className="border px-2 py-1">{row.remarks}</td>
//                   <td className="border px-2 py-1">{row.freight}</td>
//                   <td className="border px-2 py-1 text-center">
//                     <button onClick={() => handleDeleteRow(i)} className="text-red-600 hover:underline">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               <tr>
//                 <td className="border px-2 py-1">
//                   <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full border rounded px-1">
//                     <option value="">Select</option>
//                     {plantList.length === 0 ? (
//                       <option value="" disabled>No plants found</option>
//                     ) : (
//                       [...new Set(plantList.map(getPlantName))]
//                         .filter(name => !!name)
//                         .map((name, i) => (
//                           <option key={i} value={name}>{name}</option>
//                         ))
//                     )}
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input name="loadingSlipNo" value={newRow.loadingSlipNo} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input type="number" name="qty" value={newRow.qty} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input name="priority" value={newRow.priority} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input name="remarks" value={newRow.remarks} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full border rounded px-1">
//                     <option value="To Pay">To Pay</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1 text-center text-gray-400">---</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-2">
//           <button
//             type="button"
//             onClick={addRow}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Add Row
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div>
//             <label className="block font-medium">Amount Per Ton</label>
//             <input type="number" name="amountPerTon" value={formData.amountPerTon} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Deliver Point</label>
//             <input name="deliverPoint" value={formData.deliverPoint} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Truck Weight (In Ton)</label>
//             <input type="number" name="truckWeight" value={formData.truckWeight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block font-medium">Remarks</label>
//           <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded px-2 py-1" rows="4"></textarea>
//         </div>

//         <div className="text-center mt-6">
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Submit
//           </button>
//         </div>

//         {message && (
//           <p className="mt-4 text-center text-lg text-blue-600">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TruckTransaction;////////////////////////my code ///////////////



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function TruckTransaction() {
//   const location = useLocation();
//   const truckNoFromFind = location.state?.truckNo || '';

//   const [formData, setFormData] = useState({
//    transactionId: null,   // 👈 Added this
//     truckNo: '',
//     transactionDate: '',
//     cityName: '',
//     transporter: '',
//     amountPerTon: '',
//     truckWeight: '',
//     deliverPoint: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [newRow, setNewRow] = useState({
//     plantName: '',
//     loadingSlipNo: '',
//     qty: '',
//     priority: '',
//     remarks: '',
//     freight: 'To Pay'
//   });

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         setPlantList([]);
//         console.error('Error fetching plants:', err);
//       });
//   }, []);

//   useEffect(() => {
//     if (truckNoFromFind) {
//       setFormData((prev) => ({ ...prev, truckNo: truckNoFromFind }));
//       fetchTruckDetails(truckNoFromFind);
//     }
//   }, [truckNoFromFind]);

//   const fetchTruckDetails = async (truckNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       if (res.data) {
//         setFormData({

//            transactionId: res.data.master.transactionid || null,  // 👈 Added this
//           truckNo: res.data.master.truckno || '',
//           transactionDate: res.data.master.transactiondate?.split('T')[0] || '',
//           cityName: res.data.master.cityname || '',
//           transporter: res.data.master.transporter || '',
//           amountPerTon: res.data.master.amountperton || '',
//           truckWeight: res.data.master.truckweight || '',
//           deliverPoint: res.data.master.deliverpoint || '',
//           remarks: res.data.master.remarks || ''
//         });
//         setTableData(res.data.details || []);
//       }
//     } catch (err) {
//       console.error('Error loading truck details:', err);
//       alert('Failed to load truck details.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
//   };

//   const handleNewRowChange = (e) => {
//     const { name, value } = e.target;
//     setNewRow((prev) => ({
//       ...prev,
//       [name]: value.trim(),
//     }));
//   };

//   const addRow = () => {
//     const { plantName, loadingSlipNo, qty } = newRow;

//     if (!plantName || !loadingSlipNo || !qty) {
//       alert("❌ Please fill in Plant Name, Loading Slip No, and Quantity.");
//       return;
//     }

//     if (isNaN(qty) || Number(qty) <= 0) {
//       alert("❌ Quantity must be a positive number.");
//       return;
//     }

//     const isDuplicate = tableData.some(row =>
//       row.plantName === plantName && row.loadingSlipNo === loadingSlipNo
//     );

//     if (isDuplicate) {
//       alert("❌ Duplicate loading slip for this plant.");
//       return;
//     }

//     setTableData((prevData) => [...prevData, newRow]);

//     setNewRow({
//       plantName: '',
//       loadingSlipNo: '',
//       qty: '',
//       priority: '',
//       remarks: '',
//       freight: 'To Pay',
//     });
//   };

//   const handleDeleteRow = (index) => {
//     setTableData(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     let finalTableData = [...tableData];

//     const isNewRowFilled =
//       newRow.plantName || newRow.loadingSlipNo || newRow.qty || newRow.priority || newRow.remarks;

//     if (isNewRowFilled) {
//       finalTableData.push(newRow);
//     }

//     if (!formData.truckNo || !formData.transactionDate) {
//       return setMessage("❌ Truck No and Transaction Date are required.");
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/truck-transaction`, {
//         formData,
//         tableData: finalTableData,
//       });

//       if (response.data.success) {
//         setMessage("✅ Transaction saved successfully!");
//         setFormData({
//           truckNo: '',
//           transactionDate: '',
//           cityName: '',
//           transporter: '',
//           amountPerTon: '',
//           truckWeight: '',
//           deliverPoint: '',
//           remarks: ''
//         });
//         setTableData([]);
//         setNewRow({
//           plantName: '',
//           loadingSlipNo: '',
//           qty: '',
//           priority: '',
//           remarks: '',
//           freight: 'To Pay'
//         });
//       }
//     } catch (error) {
//       console.error("Submit error:", error);
//       alert(error.response?.data?.message || "Failed to submit data.");
//     }
//   };

//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   return (
//     <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <CancelButton />
//         <h1 className="text-2xl font-bold text-center mb-6">Truck Transaction</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block font-medium">Truck No</label>
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Transaction Date</label>
//             <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">City Name</label>
//             <input name="cityName" value={formData.cityName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Transporter</label>
//             <input name="transporter" value={formData.transporter} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//         </div>

//         <h3 className="text-lg font-semibold mt-6 mb-2">Loading Details</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border text-sm text-left">
//             <thead className="bg-yellow-200">
//               <tr>
//                 <th className="border px-2 py-1">Plant</th>
//                 <th className="border px-2 py-1">Slip No</th>
//                 <th className="border px-2 py-1">Qty</th>
//                 <th className="border px-2 py-1">Priority</th>
//                 <th className="border px-2 py-1">Remarks</th>
//                 <th className="border px-2 py-1">Freight</th>
//                 <th className="border px-2 py-1">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, i) => (
//                 <tr key={i}>
//                   <td className="border px-2 py-1">{row.plantName}</td>
//                   <td className="border px-2 py-1">{row.loadingSlipNo}</td>
//                   <td className="border px-2 py-1">{row.qty}</td>
//                   <td className="border px-2 py-1">{row.priority}</td>
//                   <td className="border px-2 py-1">{row.remarks}</td>
//                   <td className="border px-2 py-1">{row.freight}</td>
//                   <td className="border px-2 py-1 text-center">
//                     <button onClick={() => handleDeleteRow(i)} className="text-red-600 hover:underline">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               <tr>
//                 <td className="border px-2 py-1">
//                   <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full border rounded px-1">
//                     <option value="">Select</option>
//                     {plantList.length === 0 ? (
//                       <option value="" disabled>No plants found</option>
//                     ) : (
//                       [...new Set(plantList.map(getPlantName))]
//                         .filter(name => !!name)
//                         .map((name, i) => (
//                           <option key={i} value={name}>{name}</option>
//                         ))
//                     )}
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input name="loadingSlipNo" value={newRow.loadingSlipNo} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input type="number" name="qty" value={newRow.qty} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input name="priority" value={newRow.priority} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <input name="remarks" value={newRow.remarks} onChange={handleNewRowChange} className="w-full border rounded px-1" />
//                 </td>
//                 <td className="border px-2 py-1">
//                   <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full border rounded px-1">
//                     <option value="To Pay">To Pay</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1 text-center text-gray-400">---</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-2">
//           <button type="button" onClick={addRow} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Row</button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div>
//             <label className="block font-medium">Amount Per Ton</label>
//             <input type="number" name="amountPerTon" value={formData.amountPerTon} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Deliver Point</label>
//             <input name="deliverPoint" value={formData.deliverPoint} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Truck Weight (In Ton)</label>
//             <input type="number" name="truckWeight" value={formData.truckWeight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block font-medium">Remarks</label>
//           <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded px-2 py-1" rows="4"></textarea>
//         </div>

//         <div className="text-center mt-6">
//           <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Submit</button>
//         </div>

//         {message && (
//           <p className="mt-4 text-center text-lg text-blue-600">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TruckTransaction;




// *********************************
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './TruckTransaction.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function TruckTransaction() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     truckNo: '', transactionDate: '', cityName: '', transporter: '',
//     amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//     priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const truckNo = location?.state?.truck?.TruckNo;
//     if (!truckNo) return;

//     const fetchTruckDetails = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//         const { master, details } = res.data;

//         setFormData({
//           truckNo: master.TruckNo || '',
//           transactionDate: master.TransactionDate?.split('T')[0] || '',
//           cityName: master.CityName || '',
//           transporter: master.Transporter || '',
//           amountPerTon: master.AmountPerTon || '',
//           truckWeight: master.TruckWeight || '',
//           deliverPoint: master.DeliverPoint || '',
//           remarks: master.Remarks || ''
//         });

//         setTableData(details.map(row => ({
//           detailId: row.TruckTransactionDetailsId,
//           plantName: row.PlantName,
//           loadingSlipNo: row.LoadingSlipNo,
//           qty: row.Qty,
//           priority: row.Priority,
//           remarks: row.Remarks,
//           freight: row.Freight
//         })));
//       } catch (err) {
//         console.error('Error loading truck details:', err);
//       }
//     };

//     fetchTruckDetails();
//   }, [location?.state?.truck]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleNewRowChange = (e) => setNewRow({ ...newRow, [e.target.name]: e.target.value });

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;

//     if (editingIndex !== null) {
//       const updated = [...tableData];
//       updated[editingIndex] = { ...newRow };
//       setTableData(updated);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, { ...newRow, detailId: null }]);
//     }

//     setNewRow({
//       detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//       priority: '', remarks: '', freight: 'To Pay'
//     });
//   };

//   const handleEditRow = (idx) => {
//     setNewRow({ ...tableData[idx] });
//     setEditingIndex(idx);
//   };

//   const handleDeleteRow = (idx) => {
//     const updated = tableData.filter((_, i) => i !== idx);
//     setTableData(updated);
//     setEditingIndex(null);
//     setNewRow({
//       detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//       priority: '', remarks: '', freight: 'To Pay'
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       let dataToSubmit = [...tableData];
//       const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');

//       if (isNewRowFilled) {
//         dataToSubmit.push({ ...newRow, detailId: null });
//       }

//       const response = await axios.post(`${API_URL}/api/truck-transaction`, {
//         formData,
//         tableData: dataToSubmit
//       });

//       // if (response.data.success) {
//       //   setMessage('✅ Transaction saved successfully!');
//       //   setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//       //   setTableData([]);
//       // } else {
//       //   setMessage('❌ Error saving transaction.');
//       // }//////////////////my code final////////////////////
//         if (response.data.success) {
//          navigate('/truckfind', {
//         state: {
//         refresh: true,
//         justUpdatedTruckNo: formData.truckNo,
//     },
//   });
// }
//  else {
//   setMessage('❌ Error saving transaction.');
// }




//     } catch (error) {
//       console.error('Submit error:', error);
//       setMessage('❌ Server error while submitting data.');
//     }
//   };

//   return (
//     <div className="truck-transaction-container">
//       <div className="truck-transaction-card">
//         <h1 className="truck-transaction-title">Truck Transaction</h1>

//         <div className="truck-transaction-form-grid">
//           {[{ label: 'Truck No', name: 'truckNo' },
//             { label: 'Transaction Date', name: 'transactionDate', type: 'date' },
//             { label: 'City Name', name: 'cityName' },
//             { label: 'Transporter', name: 'transporter' }
//           ].map(({ label, name, type = 'text' }) => (
//             <div key={name}>
//               <label className="truck-transaction-label">{label}</label>
//               <input type={type} name={name} value={formData[name]} onChange={handleChange} className="truck-transaction-input" />
//             </div>
//           ))}
//         </div>

//         <table className="truck-transaction-table">
//           <thead>
//             <tr>
//               <th>Plant</th><th>Slip No</th><th>Qty</th><th>Priority</th><th>Remarks</th><th>Freight</th><th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, idx) => (
//               <tr key={idx}>
//                 <td>{row.plantName}</td>
//                 <td>{row.loadingSlipNo}</td>
//                 <td>{row.qty}</td>
//                 <td>{row.priority}</td>
//                 <td>{row.remarks}</td>
//                 <td>{row.freight}</td>
//                 <td>
//                   <div className="truck-transaction-action-group">
//                     <button className="truck-transaction-btn edit" onClick={() => handleEditRow(idx)}>Edit</button>
//                     <button className="truck-transaction-btn delete" onClick={() => handleDeleteRow(idx)}>Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td>
//                 <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="truck-transaction-select">
//                   <option value="">Select</option>
//                   {plantList.map((p, i) => (
//                     <option key={i} value={p.PlantName}>{p.PlantName}</option>
//                   ))}
//                 </select>
//               </td>
//               {["loadingSlipNo", "qty", "priority", "remarks"].map((name) => (
//                 <td key={name}>
//                   <input name={name} value={newRow[name]} onChange={handleNewRowChange} className="truck-transaction-input" />
//                 </td>
//               ))}
//               <td>
//                 <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="truck-transaction-select">
//                   <option value="To Pay">To Pay</option>
//                   <option value="Paid">Paid</option>
//                 </select>
//               </td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>

//         <button className="truck-transaction-btn edit" onClick={addOrUpdateRow}>
//           {editingIndex !== null ? 'Update Row' : 'Add Row'}
//         </button>

//         <div className="truck-transaction-form-grid">
//           {[{ label: 'Amount Per Ton', name: 'amountPerTon' },
//             { label: 'Deliver Point', name: 'deliverPoint' },
//             { label: 'Truck Weight (In Ton)', name: 'truckWeight' }
//           ].map(({ label, name }) => (
//             <div key={name}>
//               <label className="truck-transaction-label">{label}</label>
//               <input name={name} value={formData[name]} onChange={handleChange} className="truck-transaction-input" />
//             </div>
//           ))}
//         </div>

//         <label className="truck-transaction-label">Remarks</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="truck-transaction-textarea" />

//         <button className="truck-transaction-btn edit" onClick={handleSubmit}>Submit</button>
//         {message && <p className="truck-transaction-message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default TruckTransaction;

// ///////////////////  final code //////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './TruckTransaction.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function TruckTransaction() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     truckNo: '', transactionDate: '', cityName: '', transporter: '',
//     amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//     priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

  // // useEffect(() => {
  // //   const truckNo = location?.state?.truckNo;
  // //   console.log('truckNo:', truckNo);
  // //   if (!truckNo) return;

  // //   const fetchTruckDetails = async () => {
  // //     try {
  // //       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
  // //       const { master, details } = res.data;

  // //       setFormData({
  // //         truckNo: master.TruckNo || '',
  // //         transactionDate: master.TransactionDate?.split('T')[0] || '',
  // //         cityName: master.CityName || '',
  // //         transporter: master.Transporter || '',
  // //         amountPerTon: master.AmountPerTon || '',
  // //         truckWeight: master.TruckWeight || '',
  // //         deliverPoint: master.DeliverPoint || '',
  // //         remarks: master.Remarks || ''
  // //       });

  // //       setTableData(details.map(row => ({
  // //         detailId: row.TruckTransactionDetailsId,
  // //         plantName: row.PlantName,
  // //         loadingSlipNo: row.LoadingSlipNo,
  // //         qty: row.Qty,
  // //         priority: row.Priority,
  // //         remarks: row.Remarks,
  // //         freight: row.Freight
  // //       })));
  // //     } catch (err) {
  // //       console.error('Error loading truck details:', err);
  // //     }
  // //   };

  //   fetchTruckDetails();
  // }, [location?.state?.truckNo]);

//     useEffect(() => {
//   const truckNo = location?.state?.truckNo;
//   if (!truckNo) return;

//   console.log('truckNo:', truckNo);

//   const fetchTruckDetails = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       const { master, details } = res.data;

//       setFormData({
//         truckNo: master.TruckNo || '',
//         transactionDate: master.TransactionDate?.split('T')[0] || '',
//         cityName: master.CityName || '',
//         transporter: master.Transporter || '',
//         amountPerTon: master.AmountPerTon || '',
//         truckWeight: master.TruckWeight || '',
//         deliverPoint: master.DeliverPoint || '',
//         remarks: master.Remarks || ''
//       });

//       setTableData(details.map(row => ({
//         detailId: row.TruckTransactionDetailsId,
//         plantName: row.PlantName,
//         loadingSlipNo: row.LoadingSlipNo,
//         qty: row.Qty,
//         priority: row.Priority,
//         remarks: row.Remarks,
//         freight: row.Freight
//       })));
//     } catch (err) {
//       console.error('Error loading truck details:', err);
//     }
//   };

//   fetchTruckDetails();
// }, [location?.state]);



//   // useEffect(() => {
//   //   axios.get(`${API_URL}/api/plants`)
//   //     .then(res => setPlantList(res.data))
//   //     .catch(err => console.error('Error fetching plants:', err));
//   // }, []);


//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         setPlantList([]);
//         console.error('Error fetching plants:', err);
//       });
//   }, []);


//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleNewRowChange = (e) => setNewRow({ ...newRow, [e.target.name]: e.target.value });

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;

//     if (editingIndex !== null) {
//       const updated = [...tableData];
//       updated[editingIndex] = { ...newRow };
//       setTableData(updated);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, { ...newRow, detailId: null }]);
//     }

//     setNewRow({
//       detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//       priority: '', remarks: '', freight: 'To Pay'
//     });
//   };

//   const handleEditRow = (idx) => {
//     setNewRow({ ...tableData[idx] });
//     setEditingIndex(idx);
//   };

//   const handleDeleteRow = (idx) => {
//     const updated = tableData.filter((_, i) => i !== idx);
//     setTableData(updated);
//     setEditingIndex(null);
//     setNewRow({
//       detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//       priority: '', remarks: '', freight: 'To Pay'
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       let dataToSubmit = [...tableData];
//       const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');

//       if (isNewRowFilled) {
//         dataToSubmit.push({ ...newRow, detailId: null });
//       }

//       const response = await axios.post(`${API_URL}/api/truck-transaction`, {
//         formData,
//         tableData: dataToSubmit
//       });

//       if (response.data.success) {
//         navigate('/truckfind', {
//           state: {
//             refresh: true,
//             justUpdatedTruckNo: formData.truckNo,
//           },
//         });
//       } else {
//         setMessage('❌ Error saving transaction.');
//       }
//     } catch (error) {
//       console.error('Submit error:', error);
//       setMessage('❌ Server error while submitting data.');
//     }
//   };

//   return (
//     <div className="truck-transaction-container">
//       <div className="truck-transaction-card">
//         <h1 className="truck-transaction-title">Truck Transaction</h1>

//         <div className="truck-transaction-form-grid">
//           {[{ label: 'Truck No', name: 'truckNo' },
//             { label: 'Transaction Date', name: 'transactionDate', type: 'date' },
//             { label: 'City Name', name: 'cityName' },
//             { label: 'Transporter', name: 'transporter' }
//           ].map(({ label, name, type = 'text' }) => (
//             <div key={name}>
//               <label className="truck-transaction-label">{label}</label>
//               <input type={type} name={name} value={formData[name]} onChange={handleChange} className="truck-transaction-input" />
//             </div>
//           ))}
//         </div>

//         <table className="truck-transaction-table">
//           <thead>
//             <tr>
//               <th>Plant</th><th>Slip No</th><th>Qty</th><th>Priority</th><th>Remarks</th><th>Freight</th><th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, idx) => (
//               <tr key={idx}>
//                 <td>{row.plantName}</td>
//                 <td>{row.loadingSlipNo}</td>
//                 <td>{row.qty}</td>
//                 <td>{row.priority}</td>
//                 <td>{row.remarks}</td>
//                 <td>{row.freight}</td>
//                 <td>
//                   <div className="truck-transaction-action-group">
//                     <button className="truck-transaction-btn edit" onClick={() => handleEditRow(idx)}>Edit</button>
//                     <button className="truck-transaction-btn delete" onClick={() => handleDeleteRow(idx)}>Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td>
//                 <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="truck-transaction-select">
//                   <option value="">Select</option>
//                   {plantList.map((p, i) => (
//                     <option key={i} value={p.PlantName}>{p.PlantName}</option>
//                   ))}
//                 </select>
//               </td>
//               {["loadingSlipNo", "qty", "priority", "remarks"].map((name) => (
//                 <td key={name}>
//                   <input name={name} value={newRow[name]} onChange={handleNewRowChange} className="truck-transaction-input" />
//                 </td>
//               ))}
//               <td>
//                 <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="truck-transaction-select">
//                   <option value="To Pay">To Pay</option>
//                   <option value="Paid">Paid</option>
//                 </select>
//               </td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>

//         <button className="truck-transaction-btn edit" onClick={addOrUpdateRow}>
//           {editingIndex !== null ? 'Update Row' : 'Add Row'}
//         </button>

//         <div className="truck-transaction-form-grid">
//           {[{ label: 'Amount Per Ton', name: 'amountPerTon' },
//             { label: 'Deliver Point', name: 'deliverPoint' },
//             { label: 'Truck Weight (In Ton)', name: 'truckWeight' }
//           ].map(({ label, name }) => (
//             <div key={name}>
//               <label className="truck-transaction-label">{label}</label>
//               <input name={name} value={formData[name]} onChange={handleChange} className="truck-transaction-input" />
//             </div>
//           ))}
//         </div>

//         <label className="truck-transaction-label">Remarks</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="truck-transaction-textarea" />

//         <button className="truck-transaction-btn edit" onClick={handleSubmit}>Submit</button>
//         {message && <p className="truck-transaction-message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default TruckTransaction;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// function TruckTransaction() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     transactionId: null,
//     truckNo: '', transactionDate: '', cityName: '', transporter: '',
//     amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const truckNo = location?.state?.truckNo;
//     if (truckNo) fetchTruckDetails(truckNo);
//   }, [location?.state?.truckNo]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(() => setPlantList([]));
//   }, []);

//   const fetchTruckDetails = async (truckNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       const { master, details } = res.data;
//       setFormData({
//         transactionId: master.transactionid,
//         truckNo: master.truckno,
//         transactionDate: master.transactiondate?.split('T')[0] || '',
//         cityName: master.cityname,
//         transporter: master.transporter,
//         amountPerTon: master.amountperton,
//         truckWeight: master.truckweight,
//         deliverPoint: master.deliverpoint,
//         remarks: master.remarks
//       });
//       setTableData(details.map(row => ({
//         plantName: row.plantname,
//         loadingSlipNo: row.loadingslipno,
//         qty: row.qty,
//         priority: row.priority,
//         remarks: row.remarks,
//         freight: row.freight
//       })));
//     } catch {
//       setMessage('❌ Failed to load truck details.');
//     }
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleNewRowChange = (e) => setNewRow({ ...newRow, [e.target.name]: e.target.value });

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;
//     if (editingIndex !== null) {
//       const updated = [...tableData];
//       updated[editingIndex] = { ...newRow };
//       setTableData(updated);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, { ...newRow }]);
//     }
//     setNewRow({ plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleEditRow = (idx) => {
//     setNewRow({ ...tableData[idx] });
//     setEditingIndex(idx);
//   };

//   const handleDeleteRow = (idx) => {
//     setTableData(tableData.filter((_, i) => i !== idx));
//     setEditingIndex(null);
//     setNewRow({ plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     let dataToSubmit = [...tableData];
//   //     if (Object.values(newRow).some(val => val && val.trim?.() !== '')) {
//   //       dataToSubmit.push({ ...newRow });
//   //     }
//   //     const response = await axios.post(`${API_URL}/api/truck-transaction`, {
//   //       formData,
//   //       tableData: dataToSubmit
//   //     });
//   //     if (response.data.success) {
//   //       // navigate('/truckfind', 
//   //        { state: { refresh: true} };
//   //       setMessage('✅ Transaction saved successfully!');
//   //     } else {
//   //       setMessage('❌ Error saving transaction.');
//   //     }
//   //   } catch {
//   //     setMessage('❌ Server error while submitting data.');
//   //   }
//   // };////////////////////////////////////////////////////////////data fill ho raha hai but working code /////////////////////////
//   const handleSubmit = async () => {
//   try {
//     let dataToSubmit = [...tableData];
//     const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');

//     if (isNewRowFilled) {
//       dataToSubmit.push({ ...newRow, detailId: null });
//     }

//     const response = await axios.post(`${API_URL}/api/truck-transaction`, { formData, tableData: dataToSubmit });

//     if (response.data.success) {
//       setMessage('✅ Transaction saved successfully!');

//       // Form Clear
//       setFormData({
//         truckNo: '', transactionDate: '', cityName: '', transporter: '',
//         amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//       });

//       // Table Clear
//       setTableData([]);

//       // New Row Clear
//       setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });

//       setEditingIndex(null);
//     } else {
//       setMessage('❌ Error saving transaction.');
//     }
//   } catch (error) {
//     console.error('Submit error:', error);
//     setMessage('❌ Server error while submitting data.');
//   }
// };


//   return (
//     <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
//         <h1 className="text-2xl font-bold text-center">Truck Transaction</h1>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {['truckNo', 'transactionDate', 'cityName', 'transporter'].map((name, idx) => (
//             <div key={idx}>
//               <label className="block font-medium capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
//               <input
//                 type={name === 'transactionDate' ? 'date' : 'text'}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full border rounded px-2 py-1"
//               />
//             </div>
//           ))}
//         </div>

//         <table className="w-full border text-sm">
//           <thead className="bg-yellow-200">
//             <tr>
//               <th className="border px-2">Plant</th>
//               <th className="border px-2">Slip No</th>
//               <th className="border px-2">Qty</th>
//               <th className="border px-2">Priority</th>
//               <th className="border px-2">Remarks</th>
//               <th className="border px-2">Freight</th>
//               <th className="border px-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, idx) => (
//               <tr key={idx}>
//                 <td className="border px-2">{row.plantName}</td>
//                 <td className="border px-2">{row.loadingSlipNo}</td>
//                 <td className="border px-2">{row.qty}</td>
//                 <td className="border px-2">{row.priority}</td>
//                 <td className="border px-2">{row.remarks}</td>
//                 <td className="border px-2">{row.freight}</td>
//                 <td className="border px-2 space-x-1">
//                   <button onClick={() => handleEditRow(idx)} className="text-blue-600 hover:underline">Edit</button>
//                   <button onClick={() => handleDeleteRow(idx)} className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td className="border px-2">
//                 <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full border rounded">
//                   <option value="">Select</option>
//                   {plantList.map((p, i) => (
//                     <option key={i} value={p.plantname}>{p.plantname}</option>
//                   ))}
//                 </select>
//               </td>
//               {['loadingSlipNo', 'qty', 'priority', 'remarks'].map(name => (
//                 <td key={name} className="border px-2">
//                   <input name={name} value={newRow[name]} onChange={handleNewRowChange} className="w-full border rounded" />
//                 </td>
//               ))}
//               <td className="border px-2">
//                 <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full border rounded">
//                   <option value="To Pay">To Pay</option>
//                   <option value="Paid">Paid</option>
//                 </select>
//               </td>
//               <td className="border px-2"></td>
//             </tr>
//           </tbody>
//         </table>

//         <button onClick={addOrUpdateRow} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           {editingIndex !== null ? 'Update Row' : 'Add Row'}
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {['amountPerTon', 'deliverPoint', 'truckWeight'].map((name, idx) => (
//             <div key={idx}>
//               <label className="block font-medium capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
//               <input
//                 type="text"
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full border rounded px-2 py-1"
//               />
//             </div>
//           ))}
//         </div>

//         <div>
//           <label className="block font-medium">Remarks</label>
//           <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded px-2 py-1" rows="3" />
//         </div>

//         <div className="text-center">
//           <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Submit</button>
//         </div>

//         {message && <p className="text-center text-blue-600 mt-2">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default TruckTransaction;///////////////////////////////////////full working code//////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckTransaction() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     transactionId: null,
//     truckNo: '', transactionDate: '', cityName: '', transporter: '',
//     amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//     priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const truckNo = location?.state?.truckNo;
//     if (truckNo) fetchTruckDetails(truckNo);
//   }, [location?.state?.truckNo]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   const fetchTruckDetails = async (truckNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       const { master, details } = res.data;
//       setFormData({
//         transactionId: master.transactionid,
//         truckNo: master.truckno,
//         transactionDate: master.transactiondate?.split('T')[0] || '',
//         cityName: master.cityname,
//         transporter: master.transporter,
//         amountPerTon: master.amountperton,
//         truckWeight: master.truckweight,
//         deliverPoint: master.deliverpoint,
//         remarks: master.remarks
//       });
//       setTableData(details.map(row => ({
//         detailId: row.detailid,
//         plantName: row.plantname,
//         loadingSlipNo: row.loadingslipno,
//         qty: row.qty,
//         priority: row.priority,
//         remarks: row.remarks,
//         freight: row.freight
//       })));
//     } catch (err) {
//       console.error('Error loading truck details:', err);
//       setMessage('❌ Failed to load truck details.');
//     }
//   };

//   // const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleChange = (e) => {
//   let { name, value } = e.target;

//   if (name === 'truckNo') {
//     // Remove all hyphens and spaces for clean processing
//     value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

//     let formatted = '';

//     if (value.length > 0) formatted += value.substring(0, 2);
//     if (value.length > 2) formatted += '-' + value.substring(2, 4);
//     if (value.length > 4) formatted += '-' + value.substring(4, 6);
//     if (value.length > 6) formatted += '-' + value.substring(6, 10);

//     setFormData({ ...formData, truckNo: formatted });
//   } else {
//     setFormData({ ...formData, [name]: value });
//   }
// };




//   const handleNewRowChange = (e) => setNewRow({ ...newRow, [e.target.name]: e.target.value });

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;

//     if (editingIndex !== null) {
//       const updated = [...tableData];
//       updated[editingIndex] = { ...newRow };
//       setTableData(updated);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, { ...newRow, detailId: null }]);
//     }

//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleEditRow = (idx) => {
//     setNewRow({ ...tableData[idx] });
//     setEditingIndex(idx);
//   };

//   const handleDeleteRow = (idx) => {
//     setTableData(tableData.filter((_, i) => i !== idx));
//     setEditingIndex(null);
//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleSubmit = async () => {
//     try {
//       let dataToSubmit = [...tableData];
//       const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');

//       if (isNewRowFilled) {
//         dataToSubmit.push({ ...newRow, detailId: null });
//       }

//       const response = await axios.post(`${API_URL}/api/truck-transaction`, { formData, tableData: dataToSubmit });

//       if (response.data.success) {
//         setMessage('✅ Transaction saved successfully!');
//         navigate('/truckfind', { state: { refresh: true } });
//       } else {
//         setMessage('❌ Error saving transaction.');
//       }
//     } catch (error) {
//       console.error('Submit error:', error);
//       setMessage('❌ Server error while submitting data.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-50 py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-wide">Truck Transaction</h1>
// {/* 
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           {['truckNo', 'transactionDate', 'cityName', 'transporter'].map((field, idx) => (
//             <div key={idx}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input type={field === 'transactionDate' ? 'date' : 'text'} name={field} value={formData[field]} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//             </div>
//           ))}
//         </div> */}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

//   {/* Truck Number Field */}
//   <div>
//     <label className="font-medium text-slate-700 mb-1 block">Truck No</label>
//     <input
//       type="text"
//       name="truckNo"
//        maxLength={13}
//       value={formData.truckNo}
//       onChange={handleChange}
//       placeholder="e.g., GJ-01-AB-1234"
//       className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//     />
//   </div>

//   {/* बाकी 3 Fields */}
//   {['transactionDate', 'cityName', 'transporter'].map((field, idx) => (
//     <div key={idx}>
//       <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//       <input
//         type={field === 'transactionDate' ? 'date' : 'text'}
//         name={field}
//         value={formData[field]}
//         onChange={handleChange}
//         className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//       />
//     </div>
//   ))}
// </div>


//         <div className="overflow-x-auto mb-6">
//           <table className="w-full text-sm text-left border shadow rounded-xl">
//             <thead className="bg-indigo-500 text-white">
//               <tr>
//                 <th className="p-2">Plant</th>
//                 <th className="p-2">Slip No</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Priority</th>
//                 <th className="p-2">Remarks</th>
//                 <th className="p-2">Freight</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, idx) => (
//                 <tr key={idx} className="bg-white even:bg-slate-50">
//                   <td className="p-2">{row.plantName}</td>
//                   <td className="p-2">{row.loadingSlipNo}</td>
//                   <td className="p-2">{row.qty}</td>
//                   <td className="p-2">{row.priority}</td>
//                   <td className="p-2">{row.remarks}</td>
//                   <td className="p-2">{row.freight}</td>
//                   <td className="p-2 flex gap-2 justify-center">
//                     <button className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full shadow hover:scale-105" onClick={() => handleEditRow(idx)}>Edit</button>
//                     <button className="bg-red-300 text-red-900 px-3 py-1 rounded-full shadow hover:scale-105" onClick={() => handleDeleteRow(idx)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               <tr className="bg-slate-100">
//                 <td className="p-2">
//                   <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="">Select</option>
//                     {plantList.map((p, i) => (<option key={i} value={p.plantname}>{p.plantname}</option>))}
//                   </select>
//                 </td>
//                 {['loadingSlipNo', 'qty', 'priority', 'remarks'].map((name) => (
//                   <td key={name} className="p-2">
//                     <input name={name} value={newRow[name]} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg" />
//                   </td>
//                 ))}
//                 <td className="p-2">
//                   <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="To Pay">To Pay</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </td>
//                 <td className="p-2 text-center">-</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <button onClick={addOrUpdateRow} className="bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow hover:scale-105 mb-6">
//           {editingIndex !== null ? 'Update Row' : 'Add Row'}
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           {['amountPerTon', 'deliverPoint', 'truckWeight'].map((field, idx) => (
//             <div key={idx}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input name={field} value={formData[field]} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//             </div>
//           ))}
//         </div>

//         <label className="font-medium text-slate-700 mb-1 block">Remarks</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"></textarea>

//         <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105">Submit</button>

//         {message && <p className="text-center text-green-600 text-lg font-semibold mt-4">{message}</p>}
//       </div>
//     </div>
//   );
// }////////////////////////working hai redirect hota hai///


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckTransaction() {
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     transactionId: null,
//     truckNo: '', transactionDate: '', cityName: '', transporter: '',
//     amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//     priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const truckNo = location?.state?.truckNo;
//     if (truckNo) fetchTruckDetails(truckNo);
//   }, [location?.state?.truckNo]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   const fetchTruckDetails = async (truckNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       const { master, details } = res.data;
//       setFormData({
//         transactionId: master.transactionid,
//         truckNo: master.truckno,
//         transactionDate: master.transactiondate?.split('T')[0] || '',
//         cityName: master.cityname,
//         transporter: master.transporter,
//         amountPerTon: master.amountperton,
//         truckWeight: master.truckweight,
//         deliverPoint: master.deliverpoint,
//         remarks: master.remarks
//       });
//       setTableData(details.map(row => ({
//         detailId: row.detailid,
//         plantName: row.plantname,
//         loadingSlipNo: row.loadingslipno,
//         qty: row.qty,
//         priority: row.priority,
//         remarks: row.remarks,
//         freight: row.freight
//       })));
//     } catch (err) {
//       console.error('Error loading truck details:', err);
//       setMessage('❌ Failed to load truck details.');
//     }
//   };

//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     if (name === 'truckNo') {
//       value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
//       let formatted = '';
//       if (value.length > 0) formatted += value.substring(0, 2);
//       if (value.length > 2) formatted += '-' + value.substring(2, 4);
//       if (value.length > 4) formatted += '-' + value.substring(4, 6);
//       if (value.length > 6) formatted += '-' + value.substring(6, 10);
//       setFormData({ ...formData, truckNo: formatted });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleNewRowChange = (e) => {
//     setNewRow({ ...newRow, [e.target.name]: e.target.value });
//   };

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;
//     if (editingIndex !== null) {
//       const updated = [...tableData];
//       updated[editingIndex] = { ...newRow };
//       setTableData(updated);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, { ...newRow, detailId: null }]);
//     }
//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleEditRow = (idx) => {
//     setNewRow({ ...tableData[idx] });
//     setEditingIndex(idx);
//   };

//   const handleDeleteRow = (idx) => {
//     setTableData(tableData.filter((_, i) => i !== idx));
//     setEditingIndex(null);
//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleSubmit = async () => {
//     try {
//       let dataToSubmit = [...tableData];
//       const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');
//       if (isNewRowFilled) {
//         dataToSubmit.push({ ...newRow, detailId: null });
//       }
//       const response = await axios.post(`${API_URL}/api/truck-transaction`, { formData, tableData: dataToSubmit });
//       if (response.data.success) {
//         setMessage('✅ Transaction saved successfully!');
//         // CLEAR form
//         setFormData({
//           transactionId: null,
//           truckNo: '', transactionDate: '', cityName: '', transporter: '',
//           amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//         });
//         setTableData([]);
//         setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//       } else {
//         setMessage('❌ Error saving transaction.');
//       }
//     } catch (error) {
//       console.error('Submit error:', error);
//       setMessage('❌ Server error while submitting data.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-50 py-8">
//        <CancelButton />
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-wide">Truck Transaction</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="font-medium text-slate-700 mb-1 block">Truck No</label>
//             <input
//               type="text"
//               name="truckNo"
//               maxLength={13}
//               value={formData.truckNo}
//               onChange={handleChange}
//               placeholder="e.g., GJ-01-AB-1234"
//               className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>
//           {['transactionDate', 'cityName', 'transporter'].map((field, idx) => (
//             <div key={idx}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input
//                 type={field === 'transactionDate' ? 'date' : 'text'}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="overflow-x-auto mb-6">
//           <table className="w-full text-sm text-left border shadow rounded-xl">
//             <thead className="bg-indigo-500 text-white">
//               <tr>
//                 <th className="p-2">Plant</th>
//                 <th className="p-2">Slip No</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Priority</th>
//                 <th className="p-2">Remarks</th>
//                 <th className="p-2">Freight</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, idx) => (
//                 <tr key={idx} className="bg-white even:bg-slate-50">
//                   <td className="p-2">{row.plantName}</td>
//                   <td className="p-2">{row.loadingSlipNo}</td>
//                   <td className="p-2">{row.qty}</td>
//                   <td className="p-2">{row.priority}</td>
//                   <td className="p-2">{row.remarks}</td>
//                   <td className="p-2">{row.freight}</td>
//                   <td className="p-2 flex gap-2 justify-center">
//                     <button className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full shadow hover:scale-105" onClick={() => handleEditRow(idx)}>Edit</button>
//                     <button className="bg-red-300 text-red-900 px-3 py-1 rounded-full shadow hover:scale-105" onClick={() => handleDeleteRow(idx)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               <tr className="bg-slate-100">
//                 <td className="p-2">
//                   <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="">Select</option>
//                     {plantList.map((p, i) => (<option key={i} value={p.plantname}>{p.plantname}</option>))}
//                   </select>
//                 </td>
//                 {['loadingSlipNo', 'qty', 'priority', 'remarks'].map((name) => (
//                   <td key={name} className="p-2">
//                     <input name={name} value={newRow[name]} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg" />
//                   </td>
//                 ))}
//                 <td className="p-2">
//                   <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="To Pay">To Pay</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </td>
//                 <td className="p-2 text-center">-</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <button onClick={addOrUpdateRow} className="bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow hover:scale-105 mb-6">
//           {editingIndex !== null ? 'Update Row' : 'Add Row'}
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           {['amountPerTon', 'deliverPoint', 'truckWeight'].map((field, idx) => (
//             <div key={idx}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input name={field} value={formData[field]} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//             </div>
//           ))}
//         </div>

//         <label className="font-medium text-slate-700 mb-1 block">Remarks</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"></textarea>

//         <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105">Submit</button>

//         {message && <p className="text-center text-green-600 text-lg font-semibold mt-4">{message}</p>}
//       </div>
//     </div>
//   );
// }/////////// working code with cancel button and redirect to truckfind page

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckTransaction() {
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     transactionId: null,
//     truckNo: '', transactionDate: '', cityName: '', transporter: '',
//     amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//     priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const truckNo = location?.state?.truckNo;
//     if (truckNo) fetchTruckDetails(truckNo);
//   }, [location?.state?.truckNo]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   const fetchTruckDetails = async (truckNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       const { master, details } = res.data;
//       setFormData({
//         transactionId: master.transactionid,
//         truckNo: master.truckno,
//         transactionDate: master.transactiondate?.split('T')[0] || '',
//         cityName: master.cityname,
//         transporter: master.transporter,
//         amountPerTon: master.amountperton,
//         truckWeight: master.truckweight,
//         deliverPoint: master.deliverpoint,
//         remarks: master.remarks
//       });
//       setTableData(details.map(row => ({
//         detailId: row.detailid,
//         plantName: row.plantname,
//         loadingSlipNo: row.loadingslipno,
//         qty: row.qty,
//         priority: row.priority,
//         remarks: row.remarks,
//         freight: row.freight
//       })));
//     } catch (err) {
//       if (err.response?.status === 409) {
//         setMessage('🚫 Truck is already in transport. Please complete Check-Out first.');
//       } else if (err.response?.status === 404) {
//         setMessage('Truck not found. You can create a new transaction.');
//       } else {
//         console.error('Error loading truck details:', err);
//         setMessage('❌ Failed to load truck details.');
//       }
//     }
//   };

//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     if (name === 'truckNo') {
//       value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
//       let formatted = '';
//       if (value.length > 0) formatted += value.substring(0, 2);
//       if (value.length > 2) formatted += '-' + value.substring(2, 4);
//       if (value.length > 4) formatted += '-' + value.substring(4, 6);
//       if (value.length > 6) formatted += '-' + value.substring(6, 10);
//       setFormData({ ...formData, truckNo: formatted });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleNewRowChange = (e) => {
//     setNewRow({ ...newRow, [e.target.name]: e.target.value });
//   };

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;
//     if (editingIndex !== null) {
//       const updated = [...tableData];
//       updated[editingIndex] = { ...newRow };
//       setTableData(updated);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, { ...newRow, detailId: null }]);
//     }
//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleEditRow = (idx) => {
//     setNewRow({ ...tableData[idx] });
//     setEditingIndex(idx);
//   };

//   const handleDeleteRow = (idx) => {
//     setTableData(tableData.filter((_, i) => i !== idx));
//     setEditingIndex(null);
//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleSubmit = async () => {
//     try {
//       let dataToSubmit = [...tableData];
//       const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');
//       if (isNewRowFilled) {
//         dataToSubmit.push({ ...newRow, detailId: null });
//       }
//       const response = await axios.post(`${API_URL}/api/truck-transaction`, { formData, tableData: dataToSubmit });
//       if (response.data.success) {
//         setMessage('✅ Transaction saved successfully!');
//         setFormData({
//           transactionId: null,
//           truckNo: '', transactionDate: '', cityName: '', transporter: '',
//           amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//         });
//         setTableData([]);
//         setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//       } else {
//         setMessage('❌ Error saving transaction.');
//       }
//     } catch (error) {
//       if (error.response?.status === 409) {
//         setMessage('🚫 Truck is already in transport. Please complete Check-Out first.');
//       } else {
//         console.error('Submit error:', error);
//         setMessage('❌ Server error while submitting data.');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-50 py-8">
//       <CancelButton />
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-wide">Truck Transaction</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="font-medium text-slate-700 mb-1 block">Truck No</label>
//             <input
//               type="text"
//               name="truckNo"
//               maxLength={13}
//               value={formData.truckNo}
//               onChange={handleChange}
//               placeholder="e.g., GJ-01-AB-1234"
//               className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>
//           {['transactionDate', 'cityName', 'transporter'].map((field, idx) => (
//             <div key={idx}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input
//                 type={field === 'transactionDate' ? 'date' : 'text'}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="overflow-x-auto mb-6">
//           <table className="w-full text-sm text-left border shadow rounded-xl">
//             <thead className="bg-indigo-500 text-white">
//               <tr>
//                 <th className="p-2">Plant</th>
//                 <th className="p-2">Slip No</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Priority</th>
//                 <th className="p-2">Remarks</th>
//                 <th className="p-2">Freight</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, idx) => (
//                 <tr key={idx} className="bg-white even:bg-slate-50">
//                   <td className="p-2">{row.plantName}</td>
//                   <td className="p-2">{row.loadingSlipNo}</td>
//                   <td className="p-2">{row.qty}</td>
//                   <td className="p-2">{row.priority}</td>
//                   <td className="p-2">{row.remarks}</td>
//                   <td className="p-2">{row.freight}</td>
//                   <td className="p-2 flex gap-2 justify-center">
//                     <button className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full shadow hover:scale-105" onClick={() => handleEditRow(idx)}>Edit</button>
//                     <button className="bg-red-300 text-red-900 px-3 py-1 rounded-full shadow hover:scale-105" onClick={() => handleDeleteRow(idx)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               <tr className="bg-slate-100">
//                 <td className="p-2">
//                   <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="">Select</option>
//                     {plantList.map((p, i) => (<option key={i} value={p.plantname}>{p.plantname}</option>))}
//                   </select>
//                 </td>
//                 {['loadingSlipNo', 'qty', 'priority', 'remarks'].map((name) => (
//                   <td key={name} className="p-2">
//                     <input name={name} value={newRow[name]} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg" />
//                   </td>
//                 ))}
//                 <td className="p-2">
//                   <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="To Pay">To Pay</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </td>
//                 <td className="p-2 text-center">-</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <button onClick={addOrUpdateRow} className="bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow hover:scale-105 mb-6">
//           {editingIndex !== null ? 'Update Row' : 'Add Row'}
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           {['amountPerTon', 'deliverPoint', 'truckWeight'].map((field, idx) => (
//             <div key={idx}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input name={field} value={formData[field]} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//             </div>
//           ))}
//         </div>

//         <label className="font-medium text-slate-700 mb-1 block">Remarks</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"></textarea>

//         <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105">Submit</button>

//         {message && <p className="text-center text-green-600 text-lg font-semibold mt-4">{message}</p>}
//       </div>
//     </div>
//   );
// }/////////////////////full work prority set baki hai 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckTransaction() {
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     transactionId: null, truckNo: '', transactionDate: '', cityName: '',
//     transporter: '', amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [newRow, setNewRow] = useState({
//     detailId: null, plantName: '', loadingSlipNo: '', qty: '',
//     priority: '', remarks: '', freight: 'To Pay'
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const truckNo = location?.state?.truckNo;
//     if (truckNo) fetchTruckDetails(truckNo);
//   }, [location?.state?.truckNo]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   const fetchTruckDetails = async (truckNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
//       const { master, details } = res.data;
//       setFormData({
//         transactionId: master.transactionid,
//         truckNo: master.truckno,
//         transactionDate: master.transactiondate?.split('T')[0] || '',
//         cityName: master.cityname,
//         transporter: master.transporter,
//         amountPerTon: master.amountperton,
//         truckWeight: master.truckweight,
//         deliverPoint: master.deliverpoint,
//         remarks: master.remarks
//       });
//       setTableData(details.map(row => ({
//         detailId: row.detailid,
//         plantName: row.plantname,
//         loadingSlipNo: row.loadingslipno,
//         qty: row.qty,
//         priority: row.priority,
//         remarks: row.remarks,
//         freight: row.freight
//       })));
//     } catch (err) {
//       if (err.response?.status === 409) {
//         setMessage('🚫 Truck is already in transport. Please complete Check-Out first.');
//       } else if (err.response?.status === 404) {
//         setMessage('Truck not found. You can create a new transaction.');
//       } else {
//         console.error('Error loading truck details:', err);
//         setMessage('❌ Failed to load truck details.');
//       }
//     }
//   };

//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     if (name === 'truckNo') {
//       value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
//       let formatted = '';
//       if (value.length > 0) formatted += value.substring(0, 2);
//       if (value.length > 2) formatted += '-' + value.substring(2, 4);
//       if (value.length > 4) formatted += '-' + value.substring(4, 6);
//       if (value.length > 6) formatted += '-' + value.substring(6, 10);
//       setFormData({ ...formData, truckNo: formatted });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleNewRowChange = (e) => {
//     setNewRow({ ...newRow, [e.target.name]: e.target.value });
//   };

//   const handleRowChange = (idx, e) => {
//     const updated = [...tableData];
//     updated[idx][e.target.name] = e.target.value;
//     setTableData(updated);
//   };

//   const handleEditRow = (idx) => {
//     setEditingIndex(idx);
//   };

//   const handleUpdateRow = (idx) => {
//     setEditingIndex(null);
//   };

//   const handleDeleteRow = (idx) => {
//     setTableData(tableData.filter((_, i) => i !== idx));
//     setEditingIndex(null);
//   };

//   const addOrUpdateRow = () => {
//     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) {
//       alert("Please fill required fields.");
//       return;
//     }

//     const selectedPlants = tableData.map(r => r.plantName);
//     if (selectedPlants.includes(newRow.plantName)) {
//       alert(`Plant ${newRow.plantName} is already selected.`);
//       return;
//     }

//     setTableData([...tableData, { ...newRow, detailId: null }]);
//     setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/api/truck-transaction`, { formData, tableData });
//       if (response.data.success) {
//         setMessage('✅ Transaction saved successfully!');
//         setFormData({
//           transactionId: null, truckNo: '', transactionDate: '', cityName: '',
//           transporter: '', amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
//         });
//         setTableData([]);
//       } else {
//         setMessage('❌ Error saving transaction.');
//       }
//     } catch (error) {
//       if (error.response?.status === 409) {
//         setMessage('🚫 Truck is already in transport. Please complete Check-Out first.');
//       } else {
//         console.error('Submit error:', error);
//         setMessage('❌ Server error while submitting data.');
//       }
//     }
//   };

//   const selectedPlants = tableData.map((r, idx) => idx === editingIndex ? null : r.plantName);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-50 py-8">
//       <CancelButton />
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-wide">Truck Transaction</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="font-medium text-slate-700 mb-1 block">Truck No</label>
//             <input type="text" name="truckNo" maxLength={13} value={formData.truckNo} onChange={handleChange}
//               placeholder="e.g., GJ-01-AB-1234"
//               className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//           </div>
//           {['transactionDate', 'cityName', 'transporter'].map((field) => (
//             <div key={field}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input type={field === 'transactionDate' ? 'date' : 'text'}
//                 name={field} value={formData[field]} onChange={handleChange}
//                 className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//             </div>
//           ))}
//         </div>

//         <div className="overflow-x-auto mb-6">
//           <table className="w-full text-sm text-left border shadow rounded-xl">
//             <thead className="bg-indigo-500 text-white">
//               <tr>
//                 <th className="p-2">Plant</th>
//                 <th className="p-2">Slip No</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Priority</th>
//                 <th className="p-2">Remarks</th>
//                 <th className="p-2">Freight</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, idx) => (
//                 <tr key={idx} className="bg-white even:bg-slate-50">
//                   {editingIndex === idx ? (
//                     <>
//                       <td className="p-2">
//                         <select name="plantName" value={row.plantName} onChange={(e) => handleRowChange(idx, e)}
//                           className="w-full p-2 border border-slate-300 rounded-lg">
//                           <option value="">Select</option>
//                           {plantList
//                             .filter(p => !selectedPlants.includes(p.plantname) || p.plantname === row.plantName)
//                             .map((p, i) => (
//                               <option key={i} value={p.plantname}>{p.plantname}</option>
//                             ))}
//                         </select>
//                       </td>
//                       {['loadingSlipNo', 'qty', 'priority', 'remarks'].map(name => (
//                         <td key={name} className="p-2">
//                           <input name={name} value={row[name]} onChange={(e) => handleRowChange(idx, e)}
//                             className="w-full p-2 border border-slate-300 rounded-lg" />
//                         </td>
//                       ))}
//                       <td className="p-2">
//                         <select name="freight" value={row.freight} onChange={(e) => handleRowChange(idx, e)}
//                           className="w-full p-2 border border-slate-300 rounded-lg">
//                           <option value="To Pay">To Pay</option>
//                           <option value="Paid">Paid</option>
//                         </select>
//                       </td>
//                       <td className="p-2 text-center">
//                         <button onClick={() => handleUpdateRow(idx)}
//                           className="bg-green-400 text-green-900 px-3 py-1 rounded-full shadow hover:scale-105">Update</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="p-2">{row.plantName}</td>
//                       <td className="p-2">{row.loadingSlipNo}</td>
//                       <td className="p-2">{row.qty}</td>
//                       <td className="p-2">{row.priority}</td>
//                       <td className="p-2">{row.remarks}</td>
//                       <td className="p-2">{row.freight}</td>
//                       <td className="p-2 flex gap-2 justify-center">
//                         <button onClick={() => handleEditRow(idx)}
//                           className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full shadow hover:scale-105">Edit</button>
//                         <button onClick={() => handleDeleteRow(idx)}
//                           className="bg-red-300 text-red-900 px-3 py-1 rounded-full shadow hover:scale-105">Delete</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//               <tr className="bg-slate-100">
//                 <td className="p-2">
//                   <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange}
//                     className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="">Select</option>
//                     {plantList
//                       .filter(p => !selectedPlants.includes(p.plantname))
//                       .map((p, i) => (
//                         <option key={i} value={p.plantname}>{p.plantname}</option>
//                       ))}
//                   </select>
//                 </td>
//                 {['loadingSlipNo', 'qty', 'priority', 'remarks'].map(name => (
//                   <td key={name} className="p-2">
//                     <input name={name} value={newRow[name]} onChange={handleNewRowChange}
//                       className="w-full p-2 border border-slate-300 rounded-lg" />
//                   </td>
//                 ))}
//                 <td className="p-2">
//                   <select name="freight" value={newRow.freight} onChange={handleNewRowChange}
//                     className="w-full p-2 border border-slate-300 rounded-lg">
//                     <option value="To Pay">To Pay</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </td>
//                 <td className="p-2 text-center">-</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <button onClick={addOrUpdateRow}
//           className="bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow hover:scale-105 mb-6">
//           Add Row
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           {['amountPerTon', 'deliverPoint', 'truckWeight'].map((field) => (
//             <div key={field}>
//               <label className="font-medium text-slate-700 mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//               <input name={field} value={formData[field]} onChange={handleChange}
//                 className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
//             </div>
//           ))}
//         </div>

//         <label className="font-medium text-slate-700 mb-1 block">Remarks</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3"
//           className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"></textarea>

//         <button onClick={handleSubmit}
//           className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105">
//           Submit
//         </button>

//         {message && <p className="text-center text-green-600 text-lg font-semibold mt-4">{message}</p>}
//       </div>
//     </div>
//   );
// }


//////


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function TruckTransaction() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    truckNo: '', transactionDate: '', cityName: '', transporter: '',
    amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
  });

  const [plantList, setPlantList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({
    detailId: null, plantName: '', loadingSlipNo: '', qty: '',
    priority: '', remarks: '', freight: 'To Pay'
  });
  const [message, setMessage] = useState('');
  const [truckNoError, setTruckNoError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);

  useEffect(() => {
    const truckNo = location?.state?.truck?.TruckNo;
    if (!truckNo) return;

    const fetchTruckDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
        const { master, details } = res.data;

        setFormData({
          truckNo: master.TruckNo || '',
          transactionDate: master.TransactionDate?.split('T')[0] || '',
          cityName: master.CityName || '',
          transporter: master.Transporter || '',
          amountPerTon: master.AmountPerTon || '',
          truckWeight: master.TruckWeight || '',
          deliverPoint: master.DeliverPoint || '',
          remarks: master.Remarks || ''
        });

        setTableData(details.map(row => ({
          detailId: row.TruckTransactionDetailsId,
          plantName: row.PlantName,
          loadingSlipNo: row.LoadingSlipNo,
          qty: row.Qty,
          priority: row.Priority,
          remarks: row.Remarks,
          freight: row.Freight
        })));
      } catch (err) {
        console.error('Error loading truck details:', err);
      }
    };

    fetchTruckDetails();
  }, [location?.state?.truck]);

  useEffect(() => {
    axios.get(`${API_URL}/api/plants`)
      .then(res => setPlantList(res.data))
      .catch(err => console.error('Error fetching plants:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = (type === 'date' || type === 'number') ? value : value.toUpperCase();
    setFormData({ ...formData, [name]: processedValue });

    if (name === 'truckNo') {
      checkTruckNoExists(processedValue);
    }
  };

  const handleNewRowChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = (type === 'number') ? value : value.toUpperCase();
    setNewRow({ ...newRow, [name]: processedValue });
  };

  const addOrUpdateRow = () => {
    if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty) return;
    if (newRow.priority) {
      const duplicate = tableData.some(row => row.priority === newRow.priority);
      if (duplicate) {
        setPriorityError('This priority already exists in another row.');
        return;
      }
    }
    setPriorityError('');
    setTableData([...tableData, { ...newRow, detailId: null }]);
    setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
  };

  const handleEditRow = (idx) => {
    setEditRow({ ...tableData[idx] });
    setEditRowIndex(idx);
  };

  const handleEditRowChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = (type === 'number') ? value : value.toUpperCase();
    setEditRow({ ...editRow, [name]: processedValue });
  };

  const handleUpdateRow = () => {
    if (!editRow.plantName || !editRow.loadingSlipNo || !editRow.qty) return;
    if (editRow.priority) {
      const duplicate = tableData.some((row, idx) => row.priority === editRow.priority && idx !== editRowIndex);
      if (duplicate) {
        setPriorityError('This priority already exists in another row.');
        return;
      }
    }
    setPriorityError('');
    const updated = [...tableData];
    updated[editRowIndex] = { ...editRow };
    setTableData(updated);
    setEditRow(null);
    setEditRowIndex(null);
  };

  const handleCancelEdit = () => {
    setEditRow(null);
    setEditRowIndex(null);
    setPriorityError('');
  };

  const handleDeleteRow = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    if (editRowIndex === idx) {
      setEditRow(null);
      setEditRowIndex(null);
    }
    setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
  };

  const handleSubmit = async () => {
    if (truckNoError) {
      setMessage('❌ ' + truckNoError);
      return;
    }
    let dataToSubmit = [...tableData];
    const isNewRowFilled = Object.values(newRow).some(val => val && val.trim?.() !== '');
    if (isNewRowFilled) {
      dataToSubmit.push({ ...newRow, detailId: null });
    }
    const priorities = dataToSubmit.map(row => row.priority).filter(Boolean);
    const hasDuplicatePriority = priorities.length !== new Set(priorities).size;
    if (hasDuplicatePriority) {
      setMessage('❌ This priority is already written.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/truck-transaction`, { formData, tableData: dataToSubmit });
      if (response.data.success) {
        setMessage('✅ Transaction saved successfully!');
        setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
        setTableData([]);
      } else {
        setMessage('❌ Error saving transaction.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('❌ Server error while submitting data.');
    }
  };

  const checkTruckNoExists = async (truckNo) => {
    if (!truckNo) return;
    try {
      const res = await axios.get(`${API_URL}/api/check-truck-exists/${truckNo}`);
      setTruckNoError(res.data.exists ? 'This number already exists.' : '');
    } catch (err) {
      setTruckNoError('Error checking truck number.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-wide">Truck Transaction</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Truck No', name: 'truckNo' },
            { label: 'Transaction Date', name: 'transactionDate', type: 'date' },
            { label: 'City Name', name: 'cityName' },
            { label: 'Transporter', name: 'transporter' }
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <label className="font-medium text-slate-700 mb-1 block">{label}</label>
              <input type={type} name={name} value={formData[name]} onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          ))}
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left border shadow rounded-xl">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-2">Plant</th>
                <th className="p-2">Slip No</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Remarks</th>
                <th className="p-2">Freight</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                editRowIndex === idx ? (
                  <tr key={idx} className="bg-white">
                    <td className="p-2">
                      <select name="plantName" value={editRow.plantName} onChange={handleEditRowChange}
                        className="w-full p-2 border border-slate-300 rounded-lg">
                        <option value="">Select</option>
                        {plantList
                          .filter(p => !tableData.some((r, i) => r.plantName === p.PlantName && i !== idx) || p.PlantName === row.plantName)
                          .map((p, i) => (
                            <option key={i} value={p.PlantName}>{p.PlantName}</option>
                          ))}
                      </select>
                    </td>
                    {['loadingSlipNo', 'qty', 'priority', 'remarks'].map(name => (
                      <td key={name} className="p-2">
                        <input name={name} value={editRow[name]} onChange={handleEditRowChange}
                          className="w-full p-2 border border-slate-300 rounded-lg" />
                      </td>
                    ))}
                    <td className="p-2">
                      <select name="freight" value={editRow.freight} onChange={handleEditRowChange}
                        className="w-full p-2 border border-slate-300 rounded-lg">
                        <option value="To Pay">To Pay</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button onClick={handleUpdateRow} className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full shadow hover:scale-105">Update</button>
                      <button onClick={handleCancelEdit} className="bg-red-300 text-red-900 px-3 py-1 rounded-full shadow hover:scale-105">Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={idx} className="bg-white even:bg-slate-50">
                    <td className="p-2">{row.plantName}</td>
                    <td className="p-2">{row.loadingSlipNo}</td>
                    <td className="p-2">{row.qty}</td>
                    <td className="p-2">{row.priority}</td>
                    <td className="p-2">{row.remarks}</td>
                    <td className="p-2">{row.freight}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button onClick={() => handleEditRow(idx)} className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full shadow hover:scale-105">Edit</button>
                      <button onClick={() => handleDeleteRow(idx)} className="bg-red-300 text-red-900 px-3 py-1 rounded-full shadow hover:scale-105">Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addOrUpdateRow} className="bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow hover:scale-105 mb-6">Add Row</button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Amount Per Ton', name: 'amountPerTon' },
            { label: 'Deliver Point', name: 'deliverPoint' },
            { label: 'Truck Weight (In Ton)', name: 'truckWeight' }
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="font-medium text-slate-700 mb-1 block">{label}</label>
              <input name={name} value={formData[name]} onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          ))}
        </div>

        <label className="font-medium text-slate-700 mb-1 block">Remarks</label>
        <textarea name="remarks" value={formData.remarks} onChange={handleChange}
          className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4" rows="3" />

        <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105">Submit</button>

        {message && <p className="text-center text-green-600 text-lg font-semibold mt-4">{message}</p>}
      </div>
    </div>
  );
}
