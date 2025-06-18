import React, { useState } from 'react';
import axios from 'axios';

export default function Report() {
  const [truckNo, setTruckNo] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    if (!truckNo.trim()) {
      setError('Please enter a truck number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`);
      setReportData(response.data);
    } catch (err) {
      setError('Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">🚚 Truck Movement Report</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Truck Number"
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={truckNo}
            onChange={(e) => setTruckNo(e.target.value)}
          />
          <button
            onClick={fetchReport}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="text-center text-indigo-600 font-medium">Loading report...</div>
        )}

        {error && (
          <div className="text-center text-red-500 font-medium">{error}</div>
        )}

        {!loading && reportData.length === 0 && !error && (
          <div className="text-center text-gray-500">No data found. Try searching for a truck number.</div>
        )}

        {reportData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="px-4 py-3 text-left">Plant Name</th>
                  <th className="px-4 py-3 text-left">Check-In Time</th>
                  <th className="px-4 py-3 text-left">Check-Out Time</th>
                  <th className="px-4 py-3 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-4 py-3">{item.plantname}</td>
                    <td className="px-4 py-3">
                      {item.checkintime
                        ? new Date(item.checkintime).toLocaleString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {item.checkouttime
                        ? new Date(item.checkouttime).toLocaleString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3">{item.remarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
