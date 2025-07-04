
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

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
    const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/plants`, {
          headers: { userid: userId, role }
        });
        const filtered = data.filter(plant => {
          const pid = String(plant.plantid || '');
          return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
        });
        setPlants(filtered);
        setSelectedPlants(filtered.map(p => String(p.plantid)));
      } catch {
        setError('Failed to fetch plants');
      }
    })();
  }, []);

  const togglePlant = id =>
    setSelectedPlants(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

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
        params: { fromDate, toDate, plant: JSON.stringify(selectedPlants) }
      });
      setReportData(data);
    } catch {
      setError('Failed to fetch report');
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = dateStr => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    if (isNaN(date.getTime()) || date.getFullYear() === 1970) return '—';
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col items-center">
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

        {/* Record Count */}
        {!loading && reportData.length > 0 && (
          <div className="mb-4 text-indigo-700 font-semibold text-center">
            <span className="px-3 py-1 bg-indigo-100 rounded-full shadow-sm">
              📦 Found {reportData.length} record(s)
            </span>
          </div>
        )}

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
                    <td className="px-4 py-2">{formatDate(r.transactionDate)}</td>
                    <td className="px-4 py-2">{r.plantName || '—'}</td>
                    <td className="px-4 py-2">{r.checkInTime || '—'}</td>
                    <td className="px-4 py-2">{r.checkOutTime || '—'}</td>
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
                <p className="text-sm"><strong>Txn Date:</strong> {formatDate(r.transactionDate)}</p>
                <p className="text-sm"><strong>Plant:</strong> {r.plantName}</p>
                <p className="text-sm"><strong>Check-In:</strong> {r.checkInTime || '—'}</p>
                <p className="text-sm"><strong>Check-Out:</strong> {r.checkOutTime || '—'}</p>
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

