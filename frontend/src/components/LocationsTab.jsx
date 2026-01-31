import React from 'react';

function LocationsTab({ locations }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">World Locations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-2">{location.name}</h4>
            <p className="text-blue-400 mb-2 capitalize">{location.type}</p>
            <p className="text-gray-300">{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationsTab;
