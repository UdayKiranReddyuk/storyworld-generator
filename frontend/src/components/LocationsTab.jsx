import React from 'react';
import { MapPin, Map } from 'lucide-react';

function LocationsTab({ locations }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Map className="text-green-400" size={28} />
        <h3 className="text-2xl font-bold text-white">World Locations</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
          >
            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600 w-full"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">{location.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={14} className="text-green-400" />
                    <span className="text-green-300 text-sm font-medium capitalize">{location.type}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
                {location.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationsTab;
