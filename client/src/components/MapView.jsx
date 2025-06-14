import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import StatusBadge from './StatusBadge';

// Fix for default marker icons (using direct imports instead of require)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';





  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={location || [51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>Current Location</Popup>
          </Marker>
        )}
        {deliveries?.map((delivery) => (
          delivery.location && (
            <Marker
              key={delivery._id}
              position={[delivery.location.lat, delivery.location.lng]}
            >
              <Popup>
                <div>
                  <p className="font-bold">{delivery.customerName}</p>
                  <p>{delivery.deliveryAddress}</p>
                  <StatusBadge status={delivery.status} />
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;