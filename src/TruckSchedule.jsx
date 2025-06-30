import React, { useState } from 'react';
import axios from 'axios';
import truckImg from './truck.png'; // You can replace this with your actual truck image

const API_URL = import.meta.env.VITE_API_URL;

export default function TruckSchedule() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (selectedStatus) => {
    if (!fromDate || !toDate) {
      setError('Please select dates');
      return;
    }

    setLoading(true);
    setError('');
    setStatus(selectedStatus);

    try {
      const res = await axios.get(`${API_URL}/api/truck-schedule`, {
        params: {
          fromDate,
          toDate,
          status: selectedStatus,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Truck Schedule</h1>

      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-lg mb-6 w-full max-w-4xl">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex gap-2 mt-6 sm:mt-0">
          {['Dispatched', 'InTransit', 'CheckedOut', 'All'].map((btn) => (
            <button
              key={btn}
              onClick={() => fetchData(btn)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                status === btn ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
              } hover:bg-indigo-200`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="relative bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl text-center">
        <img src={truckImg} alt="Truck" className="mx-auto h-40 mb-4" />

        {loading && <p className="text-indigo-600 font-medium">Loading...</p>}
        {error && <p className="text-red-500 font-medium">{error}</p>}
        {!loading && data.length === 0 && !error && (
          <p className="text-gray-500">No trucks found for selected filters</p>
        )}

        {data.length > 0 && (
          <table className="min-w-full mt-4 border border-gray-300 rounded-xl overflow-hidden text-left">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="px-4 py-2">Truck No.</th>
                <th className="px-4 py-2">Plant</th>
                <th className="px-4 py-2">Check-In Time</th>
                <th className="px-4 py-2">Check-Out Time</th>
                <th className="px-4 py-2">Loading Slip</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Freight</th>
                <th className="px-4 py-2">Priority</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="odd:bg-gray-50">
                  <td className="px-4 py-2">{item.truckNo || '—'}</td>
                  <td className="px-4 py-2">{item.plantName || '—'}</td>
                  <td className="px-4 py-2">
                    {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-2">
                    {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-2">{item.loadingSlipNo || '—'}</td>
                  <td className="px-4 py-2">{item.qty ?? '—'}</td>
                  <td className="px-4 py-2">{item.freight ?? '—'}</td>
                  <td className="px-4 py-2">{item.priority ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
