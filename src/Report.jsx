
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import truckImg from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     (async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/api/plants`, {
//           headers: { userid: userId, role }
//         });
//         const filtered = data.filter(plant => {
//           const pid = String(plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlants(filtered);
//         setSelectedPlants(filtered.map(p => String(p.plantid)));
//       } catch {
//         setError('Failed to fetch plants');
//       }
//     })();
//   }, []);

//   const togglePlant = id =>
//     setSelectedPlants(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );

//   const selectAll = () => setSelectedPlants(plants.map(p => String(p.plantid)));
//   const deselectAll = () => setSelectedPlants([]);

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || selectedPlants.length === 0) {
//       setError('Please select date range and at least one plant');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       const { data } = await axios.get(`${API_URL}/api/truck-report`, {
//         params: { fromDate, toDate, plant: JSON.stringify(selectedPlants) }
//       });
//       setReportData(data);
//     } catch {
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = dateStr => {
//     if (!dateStr) return '—';
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime()) || date.getFullYear() === 1970) return '—';
//     return date.toLocaleDateString();
//   };

//   const formatDateTime = dateStr => {
//     if (!dateStr) return '—';
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime()) || date.getFullYear() === 1970) return '—';
//     return date.toLocaleString();
//   };

//   const formatTime = dateStr => {
//     if (!dateStr) return '—';
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime()) || date.getFullYear() === 1970) return '—';
//     return date.toLocaleTimeString();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col items-center">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-6 md:p-10">
//         <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
//           🚚 Truck Movement Report
//         </h2>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={e => setFromDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={e => setToDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>
//           <div className="flex flex-col md:col-span-2">
//             <label className="mb-1 font-medium">Select Plants</label>
//             <div className="flex flex-wrap gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg max-h-40 overflow-y-auto">
//               {plants.map(p => (
//                 <label key={p.plantid} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={selectedPlants.includes(String(p.plantid))}
//                     onChange={() => togglePlant(String(p.plantid))}
//                     className="w-4 h-4 accent-indigo-600"
//                   />
//                   {p.plantname}
//                 </label>
//               ))}
//             </div>
//             <div className="mt-2 flex gap-2">
//               <button onClick={selectAll} className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                 Select All
//               </button>
//               <button onClick={deselectAll} className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
//                 Deselect
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Action button */}
//         <div className="text-center mb-6">
//           <button
//             onClick={fetchReport}
//             className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700"
//           >
//             Search
//           </button>
//         </div>

//         {/* Record Count */}
//         {!loading && reportData.length > 0 && (
//           <div className="mb-4 text-indigo-700 font-semibold text-center">
//             <span className="px-3 py-1 bg-indigo-100 rounded-full shadow-sm">
//               📦 Found {reportData.length} record(s)
//             </span>
//           </div>
//         )}

//         {/* Status */}
//         {loading && <p className="text-center text-indigo-600">Loading report...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}
//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">No records found.</div>
//         )}

//         {/* Desktop Table */}
//         {!loading && reportData.length > 0 && (
//           <div className="hidden md:block overflow-x-auto rounded-xl shadow-inner">
//             <table className="w-full text-sm text-left">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   {['Truck No', 'Txn Date', 'Plant', 'Check‑In', 'Check‑Out', 'Slip', 'Qty', 'Freight', 'Priority', 'Remarks'].map(h => (
//                     <th key={h} className="px-4 py-2">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((r, i) => (
//                   <tr key={i} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2 uppercase font-semibold">{r.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{formatDate(r.transactionDate)}</td>
//                     <td className="px-4 py-2">{r.plantName || '—'}</td>
//                     <td className="px-4 py-2">{formatDateTime(r.checkInTime)}</td>
//                     <td className="px-4 py-2">{formatDateTime(r.checkOutTime)}</td>
//                     <td className="px-4 py-2">{r.loadingSlipNo}</td>
//                     <td className="px-4 py-2">{r.qty}</td>
//                     <td className="px-4 py-2">{r.freight}</td>
//                     <td className="px-4 py-2">{r.priority}</td>
//                     <td className="px-4 py-2">{r.remarks}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Mobile Card View */}
//         {!loading && reportData.length > 0 && (
//           <div className="block md:hidden space-y-4">
//             {reportData.map((r, i) => (
//               <div key={i} className="bg-white p-4 rounded-xl shadow-md space-y-2">
//                 <p className="text-sm"><strong>Truck No:</strong> <span className="uppercase text-indigo-700">{r.truckNo}</span></p>
//                 <p className="text-sm"><strong>Txn Date:</strong> {formatDate(r.transactionDate)}</p>
//                 <p className="text-sm"><strong>Plant:</strong> {r.plantName}</p>
//                 <p className="text-sm"><strong>Check-In:</strong> {formatTime(r.checkInTime)}</p>
//                 <p className="text-sm"><strong>Check-Out:</strong> {formatTime(r.checkOutTime)}</p>
//                 <p className="text-sm"><strong>Slip:</strong> {r.loadingSlipNo}</p>
//                 <p className="text-sm"><strong>Qty:</strong> {r.qty}</p>
//                 <p className="text-sm"><strong>Freight:</strong> {r.freight}</p>
//                 <p className="text-sm"><strong>Priority:</strong> {r.priority}</p>
//                 <p className="text-sm"><strong>Remarks:</strong> {r.remarks}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import truckImg from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     (async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/api/plants`, {
//           headers: { userid: userId, role }
//         });
//         const filtered = data.filter(plant => {
//           const pid = String(plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlants(filtered);
//         setSelectedPlants(filtered.map(p => String(p.plantid)));
//       } catch {
//         setError('Failed to fetch plants');
//       }
//     })();
//   }, []);

//   const togglePlant = id =>
//     setSelectedPlants(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );

//   const selectAll = () => setSelectedPlants(plants.map(p => String(p.plantid)));
//   const deselectAll = () => setSelectedPlants([]);

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || selectedPlants.length === 0) {
//       setError('Please select date range and at least one plant');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       const { data } = await axios.get(`${API_URL}/api/truck-report`, {
//         params: { fromDate, toDate, plant: JSON.stringify(selectedPlants) }
//       });
//       setReportData(data);
//     } catch {
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = dateStr => {
//     if (!dateStr) return '—';
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime()) || date.getFullYear() === 1970) return '—';
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col items-center">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-6 md:p-10">
//         <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
//           🚚 Truck Movement Report
//         </h2>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={e => setFromDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={e => setToDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>
//           <div className="flex flex-col md:col-span-2">
//             <label className="mb-1 font-medium">Select Plants</label>
//             <div className="flex flex-wrap gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg max-h-40 overflow-y-auto">
//               {plants.map(p => (
//                 <label key={p.plantid} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={selectedPlants.includes(String(p.plantid))}
//                     onChange={() => togglePlant(String(p.plantid))}
//                     className="w-4 h-4 accent-indigo-600"
//                   />
//                   {p.plantname}
//                 </label>
//               ))}
//             </div>
//             <div className="mt-2 flex gap-2">
//               <button onClick={selectAll} className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                 Select All
//               </button>
//               <button onClick={deselectAll} className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
//                 Deselect
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Action button */}
//         <div className="text-center mb-6">
//           <button
//             onClick={fetchReport}
//             className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700"
//           >
//             Search
//           </button>
//         </div>

//         {/* Record Count */}
//         {!loading && reportData.length > 0 && (
//           <div className="mb-4 text-indigo-700 font-semibold text-center">
//             <span className="px-3 py-1 bg-indigo-100 rounded-full shadow-sm">
//               📦 Found {reportData.length} record(s)
//             </span>
//           </div>
//         )}

//         {/* Status */}
//         {loading && <p className="text-center text-indigo-600">Loading report...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}
//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">No records found.</div>
//         )}

//         {/* Desktop Table */}
//         {!loading && reportData.length > 0 && (
//           <div className="hidden md:block overflow-x-auto rounded-xl shadow-inner">
//             <table className="w-full text-sm text-left">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   {['Truck No', 'Txn Date', 'Plant', 'Check‑In', 'Check‑Out', 'Slip', 'Qty', 'Freight', 'Priority', 'Remarks'].map(h => (
//                     <th key={h} className="px-4 py-2">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((r, i) => (
//                   <tr key={i} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2 uppercase font-semibold">{r.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{formatDate(r.transactionDate)}</td>
//                     <td className="px-4 py-2">{r.plantName || '—'}</td>
//                     <td className="px-4 py-2">{r.checkInTime || '—'}</td>
//                     <td className="px-4 py-2">{r.checkOutTime || '—'}</td>
//                     <td className="px-4 py-2">{r.loadingSlipNo}</td>
//                     <td className="px-4 py-2">{r.qty}</td>
//                     <td className="px-4 py-2">{r.freight}</td>
//                     <td className="px-4 py-2">{r.priority}</td>
//                     <td className="px-4 py-2">{r.remarks}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Mobile Card View */}
//         {!loading && reportData.length > 0 && (
//           <div className="block md:hidden space-y-4">
//             {reportData.map((r, i) => (
//               <div key={i} className="bg-white p-4 rounded-xl shadow-md space-y-2">
//                 <p className="text-sm"><strong>Truck No:</strong> <span className="uppercase text-indigo-700">{r.truckNo}</span></p>
//                 <p className="text-sm"><strong>Txn Date:</strong> {formatDate(r.transactionDate)}</p>
//                 <p className="text-sm"><strong>Plant:</strong> {r.plantName}</p>
//                 <p className="text-sm"><strong>Check-In:</strong> {r.checkInTime || '—'}</p>
//                 <p className="text-sm"><strong>Check-Out:</strong> {r.checkOutTime || '—'}</p>
//                 <p className="text-sm"><strong>Slip:</strong> {r.loadingSlipNo}</p>
//                 <p className="text-sm"><strong>Qty:</strong> {r.qty}</p>
//                 <p className="text-sm"><strong>Freight:</strong> {r.freight}</p>
//                 <p className="text-sm"><strong>Priority:</strong> {r.priority}</p>
//                 <p className="text-sm"><strong>Remarks:</strong> {r.remarks}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import truckImg from './assets/Truck.png.png';
const API_URL = import.meta.env.VITE_API_URL;

export default function Report() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [plants, setPlants] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ... (keep all existing useEffect and functions exactly the same)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Truck Movement Report</h1>
              <p className="text-blue-100">Track and analyze your fleet operations</p>
            </div>
            <div className="mt-4 md:mt-0">
              <img 
                src={truckIllustration} 
                alt="Truck illustration" 
                className="h-24 md:h-32 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="md:col-span-1">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Select Plants</label>
                <div className="flex space-x-2">
                  <button 
                    onClick={selectAll}
                    className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-all"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={deselectAll}
                    className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-all"
                  >
                    Deselect
                  </button>
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto p-3 border border-gray-300 rounded-xl bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plants.map(p => (
                    <label key={p.plantid} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedPlants.includes(String(p.plantid))}
                        onChange={() => togglePlant(String(p.plantid))}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{p.plantname}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={fetchReport}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Report...
                </span>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && reportData.length === 0 && !error && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <p className="text-blue-700">No records found. Please adjust your filters and try again.</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {reportData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Report Results
                <span className="ml-auto bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  {reportData.length} records
                </span>
              </h3>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {['Truck No', 'Date', 'Plant', 'Check-In', 'Check-Out', 'Slip', 'Qty', 'Freight', 'Priority', 'Remarks'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50'}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 uppercase">
                        {row.truckNo || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {formatDate(row.transactionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {row.plantName || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {row.checkInTime || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {row.checkOutTime || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {row.loadingSlipNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {row.qty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          row.freight === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.freight}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {row.priority}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {row.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {reportData.map((row, index) => (
                <div key={index} className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Truck No</p>
                      <p className="font-medium uppercase">{row.truckNo || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Date</p>
                      <p>{formatDate(row.transactionDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Plant</p>
                      <p>{row.plantName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Slip</p>
                      <p>{row.loadingSlipNo}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Check-In</p>
                      <p>{row.checkInTime || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Check-Out</p>
                      <p>{row.checkOutTime || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Qty</p>
                      <p>{row.qty}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Freight</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        row.freight === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {row.freight}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Priority</p>
                      <p>{row.priority}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-medium text-gray-500">Remarks</p>
                      <p>{row.remarks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}