

/////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`
//       );
//       console.log('API raw data:', response.data);

//       if (Array.isArray(response.data)) {
//         // Normalize keys to a consistent camelCase shape
//         const normalized = response.data.map((row) => ({
//           truckNo: row.truckno || row.truckNo || '',
//           plantName: row.plantname || row.plantName || '',
//           checkInTime: row.checkintime || row.checkInTime || null,
//           checkOutTime: row.checkouttime || row.checkOutTime || null,
//           loadingSlipNo: row.loadingslipno || row.loadingSlipNo || '',
//           qty: row.qty ?? null,
//           freight: row.freight ?? null,
//           priority: row.priority ?? null,
//           remarks: row.remarks || ''
//         }));
//         setReportData(normalized);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Truck Movement Report
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             onClick={fetchReport}
//             className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && <div className="text-center text-red-500 font-medium">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No data found. Try another truck number.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////


// import React, { useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`
//       );

//       if (Array.isArray(response.data)) {
//         const normalized = response.data.map((row) => ({
//           truckNo: row.truckno || row.truckNo || '',
//           plantName: row.plantname || row.plantName || '',
//           checkInTime: row.checkintime || row.checkInTime || null,
//           checkOutTime: row.checkouttime || row.checkOutTime || null,
//           loadingSlipNo: row.loadingslipno || row.loadingSlipNo || '',
//           qty: row.qty ?? null,
//           freight: row.freight ?? null,
//           priority: row.priority ?? null,
//           remarks: row.remarks || ''
//         }));
//         setReportData(normalized);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      
//       <div className="bg-white w-full max-w-6xl rounded shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
//           Gate Pass Register
//         </h2>

//         <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-60"
//           />
//           <button
//             onClick={fetchReport}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-indigo-600 font-medium mb-4">Loading report...</div>
//         )}
//         {error && <div className="text-center text-red-500 font-medium mb-4">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500 mb-4">
//             No data found. Try another truck number.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-auto border border-gray-300 rounded-md">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Truck No</th>
//                   <th className="px-4 py-2">Plant Name</th>
//                   <th className="px-4 py-2">Check-In</th>
//                   <th className="px-4 py-2">Check-Out</th>
//                   <th className="px-4 py-2">Loading Slip</th>
//                   <th className="px-4 py-2">Qty</th>
//                   <th className="px-4 py-2">Freight</th>
//                   <th className="px-4 py-2">Priority</th>
//                   <th className="px-4 py-2">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{item.plantName || '—'}</td>
//                     <td className="px-4 py-2">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-2">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-2">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-2">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-2">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-2">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-2">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////////////////k////////////////////////////////////////////////////k


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState('');
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlants(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || !plant) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-report`, {
//         params: { fromDate, toDate, plant }
//       });
//       setReportData(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
//       <div className="bg-white w-full max-w-6xl rounded shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
//           Gate Pass Register
//         </h2>

//         {/* Filter Section */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">From:</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">To:</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">Plant:</label>
//             <select
//               value={plant}
//               onChange={(e) => setPlant(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Plant</option>
//               {plants.map((p) => (
//                 <option key={p.plantid} value={p.plantid}>
//                   {p.plantname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={fetchReport}
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Search
//           </button>
//         </div>

//         {/* Error & Loading */}
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         {loading && <div className="text-indigo-600 text-center mb-4">Loading...</div>}

//         {/* Table */}
//         {reportData.length > 0 && (
//           <div className="overflow-auto border border-gray-300 rounded mb-4">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Truck No</th>
//                   <th className="px-4 py-2">Freight</th>
//                   <th className="px-4 py-2">Amount Per</th>
//                   <th className="px-4 py-2">Zone Name</th>
//                   <th className="px-4 py-2">Party Name</th>
//                   <th className="px-4 py-2">City Name</th>
//                   <th className="px-4 py-2">Truck Weight</th>
//                   <th className="px-4 py-2">Dispatcher Name</th>
//                   <th className="px-4 py-2">Contact No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((row, idx) => (
//                   <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2">{row.date || '—'}</td>
//                     <td className="px-4 py-2">{row.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{row.freight || '—'}</td>
//                     <td className="px-4 py-2">{row.amountPer || '—'}</td>
//                     <td className="px-4 py-2">{row.zoneName || '—'}</td>
//                     <td className="px-4 py-2">{row.partyName || '—'}</td>
//                     <td className="px-4 py-2">{row.cityName || '—'}</td>
//                     <td className="px-4 py-2">{row.truckWeight || '—'}</td>
//                     <td className="px-4 py-2">{row.dispatcherName || '—'}</td>
//                     <td className="px-4 py-2">{row.contactNo || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Export Button */}
//         {reportData.length > 0 && (
//           <div className="text-center">
//             <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//               Export Excel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState('');
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlants(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || !plant) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-report`, {
//         params: { fromDate, toDate, plant }
//       });
//       setReportData(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
//       <div className="bg-white w-full max-w-6xl rounded shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
//           Gate Pass Register
//         </h2>

//         {/* Filter Section */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">From:</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">To:</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">Plant:</label>
//             <select
//               value={plant}
//               onChange={(e) => setPlant(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Plant</option>
//               {plants.map((p) => (
//                 <option key={p.plantid} value={p.plantid}>
//                   {p.plantname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={fetchReport}
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Search
//           </button>
//         </div>

//         {/* Error & Loading */}
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         {loading && <div className="text-indigo-600 text-center mb-4">Loading...</div>}

//         {/* Table */}
//         {reportData.length > 0 && (
//           <div className="overflow-auto border border-gray-300 rounded mb-4">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Truck No</th>
//                   <th className="px-4 py-2">Freight</th>
//                   <th className="px-4 py-2">Amount Per</th>
//                   <th className="px-4 py-2">Zone Name</th>
//                   <th className="px-4 py-2">Party Name</th>
//                   <th className="px-4 py-2">City Name</th>
//                   <th className="px-4 py-2">Truck Weight</th>
//                   <th className="px-4 py-2">Dispatcher Name</th>
//                   <th className="px-4 py-2">Contact No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((row, idx) => (
//                   <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2">{row.date || '—'}</td>
//                     <td className="px-4 py-2">{row.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{row.freight || '—'}</td>
//                     <td className="px-4 py-2">{row.amountPer || '—'}</td>
//                     <td className="px-4 py-2">{row.zoneName || '—'}</td>
//                     <td className="px-4 py-2">{row.partyName || '—'}</td>
//                     <td className="px-4 py-2">{row.cityName || '—'}</td>
//                     <td className="px-4 py-2">{row.truckWeight || '—'}</td>
//                     <td className="px-4 py-2">{row.dispatcherName || '—'}</td>
//                     <td className="px-4 py-2">{row.contactNo || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Export Button */}
//         {reportData.length > 0 && (
//           <div className="text-center">
//             <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//               Export Excel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState('');
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // ✅ Fetch all plants for dropdown
// useEffect(() => {
//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`, {
//         headers: {
//           userid: localStorage.getItem('userId'),
//           role: localStorage.getItem('role')
//         }
//       });
//       console.log(res.data);  // 👈 Console me response dekhna
//       setPlants(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch plants');
//     }
//   };
//   fetchPlants();
// }, []);


//   // ✅ Fetch report based on filters
//   const fetchReport = async () => {
//     if (!fromDate || !toDate || !plant) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     try {
//       const res = await axios.get(
//         `${API_URL}/api/truck-report?fromDate=${fromDate}&toDate=${toDate}&plant=${plant}`
//       );

//       console.log('API raw response:', res.data);

//       if (res.data.success && Array.isArray(res.data.data)) {
//         setReportData(res.data.data);
//       } else if (Array.isArray(res.data)) {
//         setReportData(res.data); // In case backend is returning raw array
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-6xl">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Truck Movement Report
//         </h2>

//         {/* 🔵 Filters Section */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="flex flex-col w-full sm:w-1/4">
//             <label className="mb-1 font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full sm:w-1/4">
//             <label className="mb-1 font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full sm:w-1/4">
//             <label className="mb-1 font-medium">Plant</label>
//             <select
//               value={plant}
//               onChange={(e) => setPlant(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="">Select Plant</option>
//               {plants.map((p) => (
//                 <option key={p.plantid} value={p.plantid}>
//                   {p.plantname}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-end w-full sm:w-auto">
//             <button
//               onClick={fetchReport}
//               className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300 w-full"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* 🔵 Loading / Error / No Data */}
//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && (
//           <div className="text-center text-red-500 font-medium">{error}</div>
//         )}
//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No records found for selected filters.
//           </div>
//         )}

//         {/* 🔵 Report Table */}
//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Transaction Date</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }///////////////////////////final working code //////////////////



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState('');
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`, {
//         headers: {
//           userid: localStorage.getItem('userId'),
//           role: localStorage.getItem('role')
//         }
//       });
//       setPlants(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch plants');
//     }
//   };

//   const fetchReport = async (selectedPlant = plant) => {
//     if (!fromDate || !toDate || !selectedPlant) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     try {
//       const res = await axios.get(
//         `${API_URL}/api/truck-report?fromDate=${fromDate}&toDate=${toDate}&plant=${selectedPlant}`
//       );

//       if (res.data.success && Array.isArray(res.data.data)) {
//         setReportData(res.data.data);
//       } else if (Array.isArray(res.data)) {
//         setReportData(res.data);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectAll = () => {
//     setPlant('ALL');
//     fetchReport('ALL');
//   };

//   const handleDeselectAll = () => {
//     setPlant('');
//     setReportData([]);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-7xl border border-indigo-200">
//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
//           🚛 Truck Movement Report
//         </h2>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="flex flex-col w-full sm:w-1/4">
//             <label className="mb-1 font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full sm:w-1/4">
//             <label className="mb-1 font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full sm:w-1/4">
//             <label className="mb-1 font-medium">Plant</label>
//             <select
//               value={plant}
//               onChange={(e) => setPlant(e.target.value)}
//               className="p-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="">Select Plant</option>
//               {plants.map((p) => (
//                 <option key={p.plantid} value={p.plantid}>
//                   {p.plantname}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-end gap-2 w-full sm:w-auto">
//             <button
//               onClick={() => fetchReport()}
//               className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-transform transform hover:scale-105"
//             >
//               Search
//             </button>
//             <button
//               onClick={handleSelectAll}
//               className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-transform transform hover:scale-105"
//             >
//               Select All
//             </button>
//             <button
//               onClick={handleDeselectAll}
//               className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform transform hover:scale-105"
//             >
//               Deselect
//             </button>
//           </div>
//         </div>

//         {/* Loading, Error, No Data */}
//         {loading && <div className="text-center text-indigo-600 font-medium">Loading report...</div>}
//         {error && <div className="text-center text-red-500 font-medium">{error}</div>}
//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">No records found for selected filters.</div>
//         )}

//         {/* Report Table */}
//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Transaction Date</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/plants`, {
//           headers: {
//             userid: localStorage.getItem('userId'),
//             role: localStorage.getItem('role')
//           }
//         });
//         setPlants(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch plants');
//       }
//     };
//     fetchPlants();
//   }, []);

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || plant.length === 0) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-report`, {
//         params: {
//           fromDate,
//           toDate,
//           plant: JSON.stringify(plant)
//         }
//       });
//       setReportData(res.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePlant = (plantId) => {
//     setPlant((prev) =>
//       prev.includes(plantId)
//         ? prev.filter((id) => id !== plantId)
//         : [...prev, plantId]
//     );
//   };

//   const selectAllPlants = () => {
//     const allIds = plants.map((p) => String(p.plantid));
//     setPlant(allIds);
//   };

//   const deselectAllPlants = () => {
//     setPlant([]);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-7xl">
        
//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 flex items-center justify-center gap-2">
//           🚚 Truck Movement Report
//         </h2>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          
//           <div className="flex flex-col w-full md:w-1/4">
//             <label className="mb-1 font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full md:w-1/4">
//             <label className="mb-1 font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full md:w-1/3">
//             <label className="mb-1 font-medium">Select Plants</label>
//             <div className="grid grid-cols-2 gap-2 bg-indigo-50 p-3 rounded-xl max-h-40 overflow-y-auto border border-indigo-200">
//               {plants.map((p) => (
//                 <label key={p.plantid} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     value={p.plantid}
//                     checked={plant.includes(String(p.plantid))}
//                     onChange={() => togglePlant(String(p.plantid))}
//                     className="w-4 h-4 rounded-full accent-green-600"
//                   />
//                   {p.plantname}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="flex gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchReport}
//               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105 w-full"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Select/Deselect All */}
//         <div className="flex gap-3 mb-4">
//           <button
//             onClick={selectAllPlants}
//             className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow transition transform hover:scale-105"
//           >
//             Select All
//           </button>
//           <button
//             onClick={deselectAllPlants}
//             className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition transform hover:scale-105"
//           >
//             Deselect
//           </button>
//         </div>

//         {/* Error / Loading / Table */}
//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && (
//           <div className="text-center text-red-500 font-medium">{error}</div>
//         )}
//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No records found for selected filters.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Transaction Date</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

/////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import truckImg from './assets/Truck.png.png'; // example illustration
import CancelButton from './CancelButton';

const API_URL = import.meta.env.VITE_API_URL;

export default function Report() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [plants, setPlants] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/plants`, {
          headers: {
            userid: localStorage.getItem('userId'),
            role: localStorage.getItem('role'),
          },
        });
        setPlants(data);
        setSelectedPlants(data.map(p => String(p.plantid)));
      } catch {
        setError('Failed to fetch plants');
      }
    })();
  }, []);

  const togglePlant = id => {
    setSelectedPlants(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedPlants(plants.map(p => String(p.plantid)));
  const deselectAll = () => setSelectedPlants([]);

  const fetchReport = async () => {
    if (!fromDate || !toDate || selectedPlants.length === 0) {
      setError('Please select date range and at least one plant');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${API_URL}/api/truck-report`, {
        params: { fromDate, toDate, plant: JSON.stringify(selectedPlants) },
      });
      setReportData(data);
    } catch {
      setError('Failed to fetch report');
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col items-center">
       <CancelButton />
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
          🚚 Truck Movement Report
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium">Select Plants</label>
            <div className="flex flex-wrap gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg max-h-40 overflow-y-auto">
              {plants.map(p => (
                <label key={p.plantid} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedPlants.includes(String(p.plantid))}
                    onChange={() => togglePlant(String(p.plantid))}
                    className="w-4 h-4 accent-indigo-600"
                  />
                  {p.plantname}
                </label>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={selectAll} className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Select All
              </button>
              <button onClick={deselectAll} className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Deselect
              </button>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="text-center mb-6">
          <button
            onClick={fetchReport}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700"
          >
            Search
          </button>
        </div>

        {/* Status */}
        {loading && <p className="text-center text-indigo-600">Loading report...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && reportData.length === 0 && (
          <div className="text-center text-gray-500">No records found.</div>
        )}

        {/* Desktop Table */}
        {!loading && reportData.length > 0 && (
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-inner">
            <table className="w-full text-sm text-left">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  {['Truck No', 'Txn Date', 'Plant', 'Check‑In', 'Check‑Out', 'Slip', 'Qty', 'Freight', 'Priority', 'Remarks'].map(h => (
                    <th key={h} className="px-4 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((r, i) => (
                  <tr key={i} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 uppercase font-semibold">{r.truckNo || '—'}</td>
                    <td className="px-4 py-2">{new Date(r.transactionDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{r.plantName || '—'}</td>
                    <td className="px-4 py-2">{new Date(r.checkInTime).toLocaleString()}</td>
                    <td className="px-4 py-2">{new Date(r.checkOutTime).toLocaleString()}</td>
                    <td className="px-4 py-2">{r.loadingSlipNo}</td>
                    <td className="px-4 py-2">{r.qty}</td>
                    <td className="px-4 py-2">{r.freight}</td>
                    <td className="px-4 py-2">{r.priority}</td>
                    <td className="px-4 py-2">{r.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Card View */}
        {!loading && reportData.length > 0 && (
          <div className="block md:hidden space-y-4">
            {reportData.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md space-y-2">
                <p className="text-sm"><strong>Truck No:</strong> <span className="uppercase text-indigo-700">{r.truckNo}</span></p>
                <p className="text-sm"><strong>Txn Date:</strong> {new Date(r.transactionDate).toLocaleDateString()}</p>
                <p className="text-sm"><strong>Plant:</strong> {r.plantName}</p>
                <p className="text-sm"><strong>Check-In:</strong> {new Date(r.checkInTime).toLocaleTimeString()}</p>
                <p className="text-sm"><strong>Check-Out:</strong> {new Date(r.checkOutTime).toLocaleTimeString()}</p>
                <p className="text-sm"><strong>Slip:</strong> {r.loadingSlipNo}</p>
                <p className="text-sm"><strong>Qty:</strong> {r.qty}</p>
                <p className="text-sm"><strong>Freight:</strong> {r.freight}</p>
                <p className="text-sm"><strong>Priority:</strong> {r.priority}</p>
                <p className="text-sm"><strong>Remarks:</strong> {r.remarks}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}