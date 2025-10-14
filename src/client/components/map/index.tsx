import { useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import './style.scss';

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

type LatLng = { lat: number; lng: number };

function ClickToAddMarker({ onAdd }: { onAdd: (p: LatLng) => void }) {
    useMapEvents({
        click(e) {
            onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
}

export default function MapView() {
    const [center] = useState<LatLng>({ lat: 26.0125373, lng: -80.1439554 }); // Київ
    const [markers, setMarkers] = useState<LatLng[]>([
        { lat: 26.0125373, lng: -80.1439554  },
    ]);

    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={20}
            scrollWheelZoom
            id="map"
            style={{ height: '100%', width: '100%' }}
        >
            {/* Безкоштовні тайли OSM (для легкого трафіку) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickToAddMarker onAdd={(p) => setMarkers((m) => [...m, p])} />
            {markers.map((m, i) => (
                <Marker key={i} position={[m.lat, m.lng]} icon={defaultIcon}>
                    <Popup>Маркер #{i + 1}<br/>({m.lat.toFixed(5)}, {m.lng.toFixed(5)})</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
