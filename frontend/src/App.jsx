import React from 'react';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';

export default function App() {
  const [showList, setShowList] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        {showList ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide">Leads</h1>
              <button
                onClick={() => setShowList(false)}
                className="py-2 px-5 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium transition"
              >
                Add New Lead
              </button>
            </div>
            <LeadList />
          </>
        ) : (
          <LeadForm onAdded={() => setShowList(true)} />
        )}
      </div>
    </div>
  );
}
