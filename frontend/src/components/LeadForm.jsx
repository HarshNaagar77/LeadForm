import React, { useState } from 'react';
import axios from 'axios';

// API setup
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
export const createLead = (data) => API.post('/leads', data);


export default function LeadForm({ onAdded }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', source:'' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits';
    if (!form.source) e.source = 'Source is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      const res = await createLead(form);
  setForm({ name:'', email:'', phone:'', source:'' });
      onAdded && onAdded(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to save lead');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <section>
          <form onSubmit={submit} className="max-w-md space-y-6 bg-gray-900 bg-opacity-80 p-8 rounded-3xl shadow-lg border border-cyan-700 mx-auto">
            {['name', 'email', 'phone'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block mb-2 text-gray-300 font-semibold capitalize">
                  {field}
                </label>
                <input
                  id={field}
                  type="text"
                  value={form[field]}
                  placeholder={field === 'phone' ? '10-digit phone' : `Enter ${field}`}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className={`w-full rounded-xl bg-transparent border px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition ${
                    errors[field] ? 'border-red-600 focus:ring-red-400' : 'border-gray-700'
                  }`}
                  autoComplete="off"
                />
                {errors[field] && <p className="text-red-500 mt-1 text-sm">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="source" className="block mb-2 text-gray-300 font-semibold">Source</label>
              <select
                id="source"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className={`w-full rounded-xl bg-transparent border px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition ${
                  errors.source ? 'border-red-600 focus:ring-red-400' : 'border-gray-700'
                }`}
              >
                <option value="">Select source</option>
                <option>Youtube</option>
                <option>Referral</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>
              {errors.source && <p className="text-red-500 mt-1 text-sm">{errors.source}</p>}
            </div>

            {/* Status field removed */}

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-white font-semibold shadow-lg transition focus:ring-4 focus:ring-cyan-400"
            >
              Save Lead
            </button>
          </form>
        </section>
        <section className="text-center max-w-md mx-auto">
          <h2 className="text-6xl font-bold text-white mb-6">Manage Leads Easily</h2>
          <p className="text-gray-400 mb-12 leading-relaxed">
            Quickly add leads and navigate to your complete lead list to manage your sales pipeline effectively.
          </p>
          <button
            onClick={() => onAdded()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full px-12 py-5 shadow-lg text-xl tracking-wide transition transform hover:scale-105"
          >
            Go to Lead List
          </button>
        </section>
      </div>
    </div>
  );
}
