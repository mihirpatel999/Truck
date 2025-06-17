
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

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
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleNewRowChange = (e) => {
//   //   setNewRow({ ...newRow, [e.target.name]: e.target.value });
//   // };

//   // const addRow = () => {
//   //   if (newRow.plantName && newRow.loadingSlipNo && newRow.qty) {
//   //     setTableData([...tableData, newRow]);
//   //     setNewRow({
//   //       plantName: '',
//   //       loadingSlipNo: '',
//   //       qty: '',
//   //       priority: '',
//   //       remarks: '',
//   //       freight: 'To Pay'
//   //     });
//   //   }
//   // };

// const handleNewRowChange = (e) => {
//   const { name, value } = e.target;
//   setNewRow((prev) => ({
//     ...prev,
//     [name]: value.trim(), // Trim whitespace
//   }));
// };

// // const addRow = () => {
// //   const { plantName, loadingSlipNo, qty } = newRow;

// //   // Check required fields
// //   if (!plantName || !loadingSlipNo || !qty) {
// //     alert("❌ Please fill in Plant Name, Loading Slip No, and Quantity.");
// //     return;
// //   }

// //   // Optional: Check if qty is a valid number
// //   if (isNaN(qty) || Number(qty) <= 0) {
// //     alert("❌ Quantity must be a positive number.");
// //     return;
// //   }

// //   // Add new row
// //   setTableData((prevData) => [...prevData, newRow]);

// //   // Reset input fields
// //   setNewRow({
// //     plantName: '',
// //     loadingSlipNo: '',
// //     qty: '',
// //     priority: '',
// //     remarks: '',
// //     freight: 'To Pay',
// //   });
// // };



//   const addRow = () => {
//   const { plantName, loadingSlipNo, qty, freight } = newRow;

//   if (!plantName || !loadingSlipNo || !qty || !freight) {
//     alert("❌ Please fill in all required fields (Plant Name, Loading Slip No, Qty, Freight).");
//     return;
//   }

//   if (isNaN(qty) || Number(qty) <= 0) {
//     alert("❌ Quantity must be a positive number.");
//     return;
//   }

//   setTableData((prevData) => [...prevData, newRow]);

//   setNewRow({
//     plantName: '',
//     loadingSlipNo: '',
//     qty: '',
//     priority: '',
//     remarks: '',
//     freight: 'To Pay', // ✅ Default value must be set
//   });
// };




 

// // const handleSubmit = async () => {
// // let finalTableData = tableData.filter(row => row.plantName && row.loadingSlipNo && row.qty);

// // if (newRow.plantName && newRow.loadingSlipNo && newRow.qty) {
// //   finalTableData.push(newRow);
// // }

// //   // ✅ Rename fields if needed
// //   finalTableData = finalTableData.map(row => ({
// //     plantName: row.plantName,
// //     slipNo: row.loadingSlipNo,
// //     qty: row.qty,
// //     priority: row.priority,
// //     remarks: row.remarks,
// //     freight: row.freight
// //   }));

// //   try {
// //     const response = await axios.post('https://truck-lh56.onrender.com/api/truck-transaction', {
// //       formData,
// //       tableData: finalTableData
// //     });

// //     if (response.data.success) {
// //       setMessage('✅ Transaction saved successfully!');
// //       setFormData({ truckNo: '', transactionDate: '', cityName: '', transporter: '', amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: '' });
// //       setTableData([]);
// //       setNewRow({ plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
// //     } else {
// //       setMessage('❌ Error saving transaction.');
// //     }
// //   } catch (error) {
// //     console.error('Submit error:', error);
// //     setMessage('❌ Server error while submitting data.');
// //   }
// // };

  
// const handleSubmit = async () => {
//   const validRows = tableData.filter(
//     (row) => row.plantName && row.loadingSlipNo && row.qty && row.freight
//   );

//   if (newRow.plantName && newRow.loadingSlipNo && newRow.qty && newRow.freight) {
//     validRows.push(newRow); // Add unsaved last row
//   }

//   if (validRows.length === 0) {
//     alert("❌ No valid rows to submit");
//     return;
//   }

//   // ✅ DEBUG LOG YAHAN LAGAO
//   console.log("🚀 Final data sent to backend:", {
//     formData,
//     tableData: validRows
//   });

//   try {
//     const res = await axios.post("http://localhost:3001/api/truck-transaction", {
//       formData,
//       tableData: validRows,
//     });

//     if (res.data.success) {
//       alert("✅ Transaction submitted successfully!");
//       // Reset if needed
//     } else {
//       alert("❌ Submission failed.");
//     }
//   } catch (err) {
//     console.error("Submit error:", err);
//     alert("❌ Failed to submit data.");
//   }
// };






  

//   // Helper to get plant name robustly (for future-proofing)
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   return (
//     <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
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

//         {/* Loading Details Table */}
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
//                   <input name="qty" value={newRow.qty} onChange={handleNewRowChange} className="w-full border rounded px-1" />
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
//             <input name="amountPerTon" value={formData.amountPerTon} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Deliver Point</label>
//             <input name="deliverPoint" value={formData.deliverPoint} onChange={handleChange} className="w-full border rounded px-2 py-1" />
//           </div>
//           <div>
//             <label className="block font-medium">Truck Weight (In Ton)</label>
//             <input name="truckWeight" value={formData.truckWeight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
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

// export default TruckTransaction;





// 
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// function TruckTransaction() {
//   const [formData, setFormData] = useState({
//     truckNo: 'GJ-09-B-1122',
//     transactionDate: '2025-06-17',
//     cityName: 'Ahmedabad',
//     transporter: 'ABC Logistics',
//     amountPerTon: '450',
//     truckWeight: '15',
//     deliverPoint: 'Godown 3',
//     remarks: 'Urgent delivery',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [tableData, setTableData] = useState([
//     {
//       plantName: 'Plant A',
//       loadingSlipNo: 'SLIP-001',
//       qty: '8',
//       priority: 'High',
//       remarks: 'First load',
//       freight: 'To Pay',
//     },
//     {
//       plantName: 'Plant B',
//       loadingSlipNo: 'SLIP-002',
//       qty: '7',
//       priority: 'Medium',
//       remarks: '',
//       freight: 'Paid',
//     }
//   ]);

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
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNewRowChange = (e) => {
//     const { name, value } = e.target;
//     setNewRow((prev) => ({
//       ...prev,
//       [name]: value.trim(),
//     }));
//   };

//   const addRow = () => {
//     const { plantName, loadingSlipNo, qty, freight } = newRow;

//     if (!plantName || !loadingSlipNo || !qty || !freight) {
//       alert("❌ Please fill in all required fields (Plant Name, Loading Slip No, Qty, Freight).");
//       return;
//     }

//     if (isNaN(qty) || Number(qty) <= 0) {
//       alert("❌ Quantity must be a positive number.");
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

//   const handleSubmit = async () => {
//     const validRows = tableData.filter(
//       (row) => row.plantName && row.loadingSlipNo && row.qty && row.freight
//     );

//     if (newRow.plantName && newRow.loadingSlipNo && newRow.qty && newRow.freight) {
//       validRows.push(newRow);
//     }

//     if (validRows.length === 0) {
//       alert("❌ No valid rows to submit");
//       return;
//     }

//     // ✅ Log final payload
//     console.log("🚀 Final data sent to backend:", {
//       formData,
//       tableData: validRows
//     });

//     try {
//       const res = await axios.post(`${API_URL}/api/truck-transaction`, {
//         formData,
//         tableData: validRows,
//       });

//       if (res.data.success) {
//         alert("✅ Transaction submitted successfully!");
//         setFormData({
//           truckNo: '',
//           transactionDate: '',
//           cityName: '',
//           transporter: '',
//           amountPerTon: '',
//           truckWeight: '',
//           deliverPoint: '',
//           remarks: '',
//         });
//         setTableData([]);
//         setNewRow({
//           plantName: '',
//           loadingSlipNo: '',
//           qty: '',
//           priority: '',
//           remarks: '',
//           freight: 'To Pay',
//         });
//         setMessage('');
//       } else {
//         alert("❌ Submission failed.");
//       }
//     } catch (err) {
//       console.error("Submit error:", err);
//       alert("❌ Failed to submit data.");
//     }
//   };

//   const getPlantName = (plant) =>
//     plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   return (
//     <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-6">Truck Transaction</h1>

//         {/* Basic Form */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="border p-2 rounded" />
//           <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleChange} className="border p-2 rounded" />
//           <input name="cityName" value={formData.cityName} onChange={handleChange} placeholder="City Name" className="border p-2 rounded" />
//           <input name="transporter" value={formData.transporter} onChange={handleChange} placeholder="Transporter" className="border p-2 rounded" />
//           <input name="amountPerTon" value={formData.amountPerTon} onChange={handleChange} placeholder="Amount Per Ton" className="border p-2 rounded" />
//           <input name="truckWeight" value={formData.truckWeight} onChange={handleChange} placeholder="Truck Weight" className="border p-2 rounded" />
//           <input name="deliverPoint" value={formData.deliverPoint} onChange={handleChange} placeholder="Delivery Point" className="border p-2 rounded" />
//         </div>

//         <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" className="border p-2 w-full mb-4 rounded" rows="2" />

//         {/* Table Section */}
//         <h3 className="text-lg font-semibold mb-2">Loading Details</h3>
//         <table className="w-full text-sm border mb-4">
//           <thead className="bg-yellow-200">
//             <tr>
//               <th className="border p-1">Plant</th>
//               <th className="border p-1">Slip No</th>
//               <th className="border p-1">Qty</th>
//               <th className="border p-1">Priority</th>
//               <th className="border p-1">Remarks</th>
//               <th className="border p-1">Freight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, i) => (
//               <tr key={i}>
//                 <td className="border p-1">{row.plantName}</td>
//                 <td className="border p-1">{row.loadingSlipNo}</td>
//                 <td className="border p-1">{row.qty}</td>
//                 <td className="border p-1">{row.priority}</td>
//                 <td className="border p-1">{row.remarks}</td>
//                 <td className="border p-1">{row.freight}</td>
//               </tr>
//             ))}
//             <tr>
//               <td className="border p-1">
//                 <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="border rounded w-full">
//                   <option value="">Select</option>
//                   {[...new Set(plantList.map(getPlantName))].map((name, idx) => (
//                     <option key={idx} value={name}>{name}</option>
//                   ))}
//                 </select>
//               </td>
//               <td className="border p-1">
//                 <input name="loadingSlipNo" value={newRow.loadingSlipNo} onChange={handleNewRowChange} className="border rounded w-full" />
//               </td>
//               <td className="border p-1">
//                 <input name="qty" value={newRow.qty} onChange={handleNewRowChange} className="border rounded w-full" />
//               </td>
//               <td className="border p-1">
//                 <input name="priority" value={newRow.priority} onChange={handleNewRowChange} className="border rounded w-full" />
//               </td>
//               <td className="border p-1">
//                 <input name="remarks" value={newRow.remarks} onChange={handleNewRowChange} className="border rounded w-full" />
//               </td>
//               <td className="border p-1">
//                 <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="border rounded w-full">
//                   <option value="To Pay">To Pay</option>
//                   <option value="Paid">Paid</option>
//                 </select>
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <button onClick={addRow} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Row</button>

//         <div className="text-center mt-6">
//           <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//             Submit
//           </button>
//         </div>

//         {message && <p className="mt-4 text-center text-lg text-blue-600">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default TruckTransaction;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function TruckTransaction() {
  const [formData, setFormData] = useState({
    truckNo: '',
    transactionDate: '',
    cityName: '',
    transporter: '',
    amountPerTon: '',
    truckWeight: '',
    deliverPoint: '',
    remarks: ''
  });

  const [plantList, setPlantList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({
    plantName: '',
    loadingSlipNo: '',
    qty: '',
    priority: '',
    remarks: '',
    freight: 'To Pay'
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/plants`)
      .then(res => setPlantList(res.data))
      .catch(err => {
        setPlantList([]);
        console.error('Error fetching plants:', err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const addRow = () => {
    const { plantName, loadingSlipNo, qty, freight } = newRow;
    if (!plantName || !loadingSlipNo || !qty || !freight) {
      alert("❌ Please fill in all required fields (Plant Name, Loading Slip No, Qty, Freight).”);
      return;
    }
    if (isNaN(qty) || Number(qty) <= 0) {
      alert("❌ Quantity must be a positive number.");
      return;
    }
    setTableData((prevData) => [...prevData, newRow]);
    setNewRow({
      plantName: '',
      loadingSlipNo: '',
      qty: '',
      priority: '',
      remarks: '',
      freight: 'To Pay'
    });
  };

  const handleSubmit = async () => {
    const validRows = tableData.filter(row => row.plantName && row.loadingSlipNo && row.qty && row.freight);
    if (newRow.plantName && newRow.loadingSlipNo && newRow.qty && newRow.freight) {
      validRows.push(newRow);
    }
    if (validRows.length === 0) {
      alert("❌ No valid rows to submit");
      return;
    }

    console.log("🚀 Final data sent to backend:", { formData, tableData: validRows });

    try {
      const res = await axios.post(`${API_URL}/api/truck-transaction`, {
        formData,
        tableData: validRows
      });

      if (res.data.success) {
        alert("✅ Transaction submitted successfully!");
        setFormData({ truckNo: '', transactionDate: '', cityName: '', transporter: '', amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: '' });
        setTableData([]);
        setNewRow({ plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay' });
      } else {
        alert("❌ Submission failed.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Failed to submit data.");
    }
  };

  const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

  return (
    <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Truck Transaction</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div><label className="block font-medium">Truck No</label>
            <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-2 py-1" /></div>
          <div><label className="block font-medium">Transaction Date</label>
            <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleChange} className="w-full border rounded px-2 py-1" /></div>
          <div><label className="block font-medium">City Name</label>
            <input name="cityName" value={formData.cityName} onChange={handleChange} className="w-full border rounded px-2 py-1" /></div>
          <div><label className="block font-medium">Transporter</label>
            <input name="transporter" value={formData.transporter} onChange={handleChange} className="w-full border rounded px-2 py-1" /></div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Loading Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-left">
            <thead className="bg-yellow-200">
              <tr>
                <th className="border px-2 py-1">Plant</th>
                <th className="border px-2 py-1">Slip No</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1">Priority</th>
                <th className="border px-2 py-1">Remarks</th>
                <th className="border px-2 py-1">Freight</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{row.plantName}</td>
                  <td className="border px-2 py-1">{row.loadingSlipNo}</td>
                  <td className="border px-2 py-1">{row.qty}</td>
                  <td className="border px-2 py-1">{row.priority}</td>
                  <td className="border px-2 py-1">{row.remarks}</td>
                  <td className="border px-2 py-1">{row.freight}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-2 py-1">
                  <select name="plantName" value={newRow.plantName} onChange={handleNewRowChange} className="w-full border rounded px-1">
                    <option value="">Select</option>
                    {plantList.length === 0 ? (
                      <option value="" disabled>No plants found</option>
                    ) : (
                      [...new Set(plantList.map(getPlantName))].filter(name => !!name).map((name, i) => (
                        <option key={i} value={name}>{name}</option>
                      ))
                    )}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input name="loadingSlipNo" value={newRow.loadingSlipNo} onChange={handleNewRowChange} className="w-full border rounded px-1" />
                </td>
                <td className="border px-2 py-1">
                  <input name="qty" value={newRow.qty} onChange={handleNewRowChange} className="w-full border rounded px-1" />
                </td>
                <td className="border px-2 py-1">
                  <input name="priority" value={newRow.priority} onChange={handleNewRowChange} className="w-full border rounded px-1" />
                </td>
                <td className="border px-2 py-1">
                  <input name="remarks" value={newRow.remarks} onChange={handleNewRowChange} className="w-full border rounded px-1" />
                </td>
                <td className="border px-2 py-1">
                  <select name="freight" value={newRow.freight} onChange={handleNewRowChange} className="w-full border rounded px-1">
                    <option value="To Pay">To Pay</option>
                    <option value="Paid">Paid</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2">
          <button type="button" onClick={addRow} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Row</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block font-medium">Amount Per Ton</label>
            <input name="amountPerTon" value={formData.amountPerTon} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block font-medium">Deliver Point</label>
            <input name="deliverPoint" value={formData.deliverPoint} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block font-medium">Truck Weight (In Ton)</label>
            <input name="truckWeight" value={formData.truckWeight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-medium">Remarks</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded px-2 py-1" rows="4"></textarea>
        </div>

        <div className="text-center mt-6">
          <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Submit</button>
        </div>

        {message && (
          <p className="mt-4 text-center text-lg text-blue-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default TruckTransaction;



