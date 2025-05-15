import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getCurrentLocation } from '../../utils/geolocation'; // Se till att denna fil finns
import 'leaflet/dist/leaflet.css';

const MapCheckIn = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const pos = await getCurrentLocation();
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      } catch (err: any) {
        setError('Kunde inte hämta platsinformation.');
        console.error(err);
      }
    };

    fetchLocation();
  }, []);

  const handleCheckIn = () => {
    // Här skickar du till Firebase eller din backend
    setCheckedIn(true);
  };

  return (
    <div className="w-full h-[80vh] relative rounded-2xl overflow-hidden shadow-xl">
      {position ? (
        <MapContainer center={position} zoom={15} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="text-sm">
                Du är här
                {!checkedIn ? (
                  <button
                    onClick={handleCheckIn}
                    className="mt-2 block bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Checka in
                  </button>
                ) : (
                  <p className="text-green-600 mt-2">Incheckad ✅</p>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          {error || 'Hämtar plats...'}
        </div>
      )}
    </div>
  );
};

export default MapCheckIn;
