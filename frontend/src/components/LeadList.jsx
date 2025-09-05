import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getLeads = (params) => API.get('/leads', { params });
export const deleteLead = (id) => API.delete(`/leads/${id}`);

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [d, setD] = useState('');

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getLeads({ d });
      setLeads(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete lead?')) return;
    await deleteLead(id);
    setLeads(leads.filter(l => l._id !== id));
  };

  // Status change logic removed

  if (loading) return <div className="p-6 rounded-xl bg-gray-900 text-center text-cyan-400 shadow">Loading...</div>;

  return (
    <div className="bg-gray-900 bg-opacity-90 rounded-3xl p-6 shadow-xl max-w-full overflow-x-auto mx-auto">
      <div className="flex gap-3 mb-5">
        <input
          placeholder="Search name/email/phone"
          value={d}
          onChange={e => setD(e.target.value)}
          className="flex-grow rounded-xl border border-gray-700 bg-transparent px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button
          onClick={fetch}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl px-6 py-3 shadow-lg transition"
        >
          Search
        </button>
      </div>
      <table className="w-full text-gray-300 table-auto border-collapse border border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-cyan-900">
            <th className="p-4 text-left font-semibold">Name</th>
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Phone</th>
            <th className="p-4 text-left font-semibold">Source</th>
            {/* Status column removed */}
            <th className="p-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {leads.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500 select-none">
                No leads found.
              </td>
            </tr>
          )}
          {leads.map(lead => (
            <tr key={lead._id} className="hover:bg-cyan-800 transition rounded-lg">
              <td className="p-4">{lead.name}</td>
              <td className="p-4">{lead.email}</td>
              <td className="p-4">{lead.phone}</td>
              <td className="p-4">{lead.source}</td>
              {/* Status select removed */}
              <td className="p-4">
                <button
                  onClick={() => remove(lead._id)}
                  className="bg-red-700 hover:bg-red-800 rounded-xl px-5 py-2 text-white font-semibold shadow-lg transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
