// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       console.log('Truck data:', response.data);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-lg p-0 w-full max-w-3xl relative border border-gray-300">
//         <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200 bg-cyan-100 rounded-t-lg">
//           <h2 className="text-2xl font-bold text-center flex-1 text-black tracking-wide" style={{ letterSpacing: '2px' }}>
//             SEARCH RESULT
//           </h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
//             <p className="mt-2 text-cyan-700 font-medium">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//               <p className="text-red-600 font-medium">❌ {error}</p>
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-400 mt-0">
//               <thead>
//                 <tr className="bg-cyan-700 text-white text-base">
//                   <th className="px-3 py-2 border border-gray-400">TRUCK NO</th>
//                   <th className="px-3 py-2 border border-gray-400">TRANSACTION DATE</th>
//                   <th className="px-3 py-2 border border-gray-400">CITY NAME</th>
//                   <th className="px-3 py-2 border border-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-3 py-2 border border-gray-300 text-blue-800 font-semibold">{truck.truckno || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 font-medium">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-3 py-2 border border-gray-300 text-green-700 font-semibold">{truck.cityname || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-200"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }/////////////////////////////////////final code /////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-lg p-0 w-full max-w-3xl relative border border-gray-300">
//         <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200 bg-cyan-100 rounded-t-lg">
//           <h2 className="text-2xl font-bold text-center flex-1 text-black tracking-wide" style={{ letterSpacing: '2px' }}>
//             SEARCH RESULT
//           </h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
//             <p className="mt-2 text-cyan-700 font-medium">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//               <p className="text-red-600 font-medium">❌ {error}</p>
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-400 mt-0">
//               <thead>
//                 <tr className="bg-cyan-700 text-white text-base">
//                   <th className="px-3 py-2 border border-gray-400">TRUCK NO</th>
//                   <th className="px-3 py-2 border border-gray-400">TRANSACTION DATE</th>
//                   <th className="px-3 py-2 border border-gray-400">CITY NAME</th>
//                   <th className="px-3 py-2 border border-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-3 py-2 border border-gray-300 text-blue-800 font-semibold">{truck.truckno || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 font-medium">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-3 py-2 border border-gray-300 text-green-700 font-semibold">{truck.cityname || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-200"
//                          onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}

//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } /////////////full code/////////////redy//


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-50 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-4 md:p-8 w-full max-w-4xl border border-gray-200">
//         <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-4">
//           <h2 className="text-3xl font-bold text-gray-800 tracking-wider">Search Result</h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition transform duration-300 shadow-md"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
//             <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
//               ❌ {error}
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-300 shadow rounded-lg">
//               <thead className="bg-cyan-600 text-white text-base">
//                 <tr>
//                   <th className="px-4 py-2 border border-gray-300">Truck No</th>
//                   <th className="px-4 py-2 border border-gray-300">Transaction Date</th>
//                   <th className="px-4 py-2 border border-gray-300">City Name</th>
//                   <th className="px-4 py-2 border border-gray-300">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-4 py-2 border border-gray-200 font-semibold text-blue-800 uppercase">
//                         {truck.truckno || '—'}
//                       </td>
//                       <td className="px-4 py-2 border border-gray-200">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-4 py-2 border border-gray-200 font-medium text-green-700">
//                         {truck.cityname || '—'}
//                       </td>
//                       <td className="px-4 py-2 border border-gray-200 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-4 rounded shadow-md transition-all"
//                           onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
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
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-cyan-50 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-4 md:p-10 w-full max-w-5xl border border-gray-100 relative">
        
//         {/* Header */}
//         <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
//           <h2 className="text-3xl font-bold text-gray-800 tracking-widest uppercase">Search Result</h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:from-red-600 hover:to-red-700"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
//             <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
//               ❌ {error}
//             </div>
//           </div>
//         )}

//         {/* Data Table */}
//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh] rounded-xl shadow-inner">
//             <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
//               <thead className="bg-cyan-700 text-white text-base">
//                 <tr>
//                   <th className="px-5 py-3">Truck No</th>
//                   <th className="px-5 py-3">Transaction Date</th>
//                   <th className="px-5 py-3">City Name</th>
//                   <th className="px-5 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr
//                       key={idx}
//                       className={`${
//                         idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'
//                       } hover:bg-cyan-100 transition-all`}
//                     >
//                       <td className="px-5 py-3 font-semibold text-blue-800 uppercase">{truck.truckno || '—'}</td>
//                       <td className="px-5 py-3">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-5 py-3 font-medium text-green-700">{truck.cityname || '—'}</td>
//                       <td className="px-5 py-3 text-center">
//                         <button
//                           className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 px-4 rounded-full shadow-md transform transition-all hover:scale-105"
//                           onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}
//                         >
//                           ✏️ Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
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
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-cyan-50 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-4 md:p-10 w-full max-w-5xl border border-gray-100 relative">

//         {/* Header */}
//         <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-widest uppercase">Search Result</h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:from-red-600 hover:to-red-700"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
//             <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
//               ❌ {error}
//             </div>
//           </div>
//         )}

//         {/* Desktop Table View */}
//         {!loading && !error && (
//           <div className="hidden md:block overflow-x-auto max-h-[70vh] rounded-xl shadow-inner">
//             <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
//               <thead className="bg-cyan-700 text-white text-base">
//                 <tr>
//                   <th className="px-5 py-3">Truck No</th>
//                   <th className="px-5 py-3">Transaction Date</th>
//                   <th className="px-5 py-3">City Name</th>
//                   <th className="px-5 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr
//                       key={idx}
//                       className={`${idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} hover:bg-cyan-100 transition-all`}
//                     >
//                       <td className="px-5 py-3 font-semibold text-blue-800 uppercase">{truck.truckno || '—'}</td>
//                       <td className="px-5 py-3">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-5 py-3 font-medium text-green-700">{truck.cityname || '—'}</td>
//                       <td className="px-5 py-3 text-center">
//                         <button
//                           className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 px-4 rounded-full shadow-md transform transition-all hover:scale-105"
//                           onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}
//                         >
//                           ✏️ Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Mobile Card View */}
//         {!loading && !error && (
//           <div className="block md:hidden space-y-3 max-h-[70vh] overflow-y-auto pr-1">
//             {truckData.length === 0 ? (
//               <p className="text-center text-gray-500">No truck data available</p>
//             ) : (
//               truckData.map((truck, idx) => (
//                 <div key={idx} className="border border-cyan-200 rounded-xl p-4 shadow-sm bg-white space-y-2">
//                   <p className="text-sm"><span className="font-semibold">Truck No:</span> <span className="uppercase text-blue-800">{truck.truckno || '—'}</span></p>
//                   <p className="text-sm"><span className="font-semibold">Transaction Date:</span> {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}</p>
//                   <p className="text-sm"><span className="font-semibold">City Name:</span> <span className="text-green-700">{truck.cityname || '—'}</span></p>
//                   <button
//                     className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 rounded shadow-md transform transition-all hover:scale-105"
//                     onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}
//                   >
//                     ✏️ Edit
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }////////////////// search button nai hai


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function TruckFind() {
  const navigate = useNavigate();
  const [truckData, setTruckData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [truckSearch, setTruckSearch] = useState(''); // 🆕 Added

  useEffect(() => {
    fetchAllTruckData();
  }, []);

  const fetchAllTruckData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/api/truck-find`);
      if (Array.isArray(response.data)) {
        setTruckData(response.data);
      } else {
        setError('Invalid data format from server');
        setTruckData([]);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch truck data');
      setTruckData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // 🆕 Filter by truck number
  const filteredData = truckData.filter(truck =>
    truck.truckno?.toLowerCase().includes(truckSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-cyan-50 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-4 md:p-10 w-full max-w-5xl border border-gray-100 relative">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-widest uppercase">Search Result</h2>
          <button
            onClick={() => navigate('/home')}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:from-red-600 hover:to-red-700"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* 🔍 Truck Search */}
        <div className="flex justify-end mb-3">
          <input
            type="text"
            placeholder="Search Truck No."
            value={truckSearch}
            onChange={(e) => setTruckSearch(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded text-sm w-60 shadow"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
            <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-6">
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
              ❌ {error}
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        {!loading && !error && (
          <div className="hidden md:block overflow-x-auto max-h-[70vh] rounded-xl shadow-inner">
            <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-cyan-700 text-white text-base">
                <tr>
                  <th className="px-5 py-3">Truck No</th>
                  <th className="px-5 py-3">Transaction Date</th>
                  <th className="px-5 py-3">City Name</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      No truck data available
                    </td>
                  </tr>
                ) : (
                  filteredData.map((truck, idx) => (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} hover:bg-cyan-100 transition-all`}
                    >
                      <td className="px-5 py-3 font-semibold text-blue-800 uppercase">{truck.truckno || '—'}</td>
                      <td className="px-5 py-3">{truck.transactiondate ? formatDate(truck.transactiondate) : '—'}</td>
                      <td className="px-5 py-3 font-medium text-green-700">{truck.cityname || '—'}</td>
                      <td className="px-5 py-3 text-center">
                        <button
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 px-4 rounded-full shadow-md transform transition-all hover:scale-105"
                          onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}
                        >
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Card View */}
        {!loading && !error && (
          <div className="block md:hidden space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {filteredData.length === 0 ? (
              <p className="text-center text-gray-500">No truck data available</p>
            ) : (
              filteredData.map((truck, idx) => (
                <div key={idx} className="border border-cyan-200 rounded-xl p-4 shadow-sm bg-white space-y-2">
                  <p className="text-sm"><span className="font-semibold">Truck No:</span> <span className="uppercase text-blue-800">{truck.truckno || '—'}</span></p>
                  <p className="text-sm"><span className="font-semibold">Transaction Date:</span> {truck.transactiondate ? formatDate(truck.transactiondate) : '—'}</p>
                  <p className="text-sm"><span className="font-semibold">City Name:</span> <span className="text-green-700">{truck.cityname || '—'}</span></p>
                  <button
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 rounded shadow-md transform transition-all hover:scale-105"
                    onClick={() => navigate('/truck', { state: { truckNo: truck.truckno } })}
                  >
                    ✏️ Edit
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

