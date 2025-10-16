import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

import type { CoffeePlace } from '../../types';

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

interface MapProps {
    data: CoffeePlace[];
    selectedPlaceId?: number | null;
    onMarkerSelect?: (place: CoffeePlace) => void;
}

type LatLng = { lat: number; lng: number };

function ClickToAddMarker({ onAdd }: { onAdd: (p: LatLng) => void }) {
    useMapEvents({
        click(e) {
            onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
            console.info(e);
        },
    });
    return null;
}

export default function MapView(props: MapProps) {
    const { data, selectedPlaceId, onMarkerSelect } = props;

    // Center on first provided place if available, otherwise fallback to Young Circle, Hollywood
    const center = useMemo<LatLng>(() => {
        if (data && data.length > 0) {
            return {
                lat: data[0].location.lat,
                lng: data[0].location.lng,
            };
        }
        return { lat: 26.01236, lng: -80.14307 };
    }, [data]);

    // Keep click-added markers separate from data-driven markers
    const [addedMarkers, setAddedMarkers] = useState<LatLng[]>([]);

    // Refs to data-driven markers to open popups programmatically
    const markerRefs = useRef<Record<number, L.Marker | null>>({});

    function FlyToSelected() {
        const map = useMap();
        useEffect(() => {
            if (!selectedPlaceId) return;

            const target = data?.find((p) => p.id === selectedPlaceId);
            if (!target) return;

            const { lat, lng } = target.location;
            map.flyTo([lat, lng], Math.max(map.getZoom(), 18), { duration: 0.5 });
            // Open popup slightly after flyTo to ensure marker is in view
            const marker = markerRefs.current[selectedPlaceId];
            if (marker) {
                // delay to allow map move; small timeout is enough
                setTimeout(() => marker.openPopup(), 200);
            }
        }, [selectedPlaceId, data, map]);
        return null;
    }

    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={18}
            scrollWheelZoom
            id="map"
            style={{ height: '100%', width: '100%' }}
        >
            {/* Controller to react to selection changes */}
            <FlyToSelected />

            {/* Безкоштовні тайли OSM (для легкого трафіку) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickToAddMarker onAdd={(p) => setAddedMarkers((m) => [...m, p])} />

            {/* Markers coming from provided data */}
            {data?.map((place) => (
                <Marker
                    key={`place-${place.id}`}
                    position={[place.location.lat, place.location.lng]}
                    icon={defaultIcon}
                    ref={(ref) => {
                        markerRefs.current[place.id] = ref as unknown as L.Marker | null;
                    }}
                    eventHandlers={{
                        click: () => onMarkerSelect?.(place),
                    }}
                >
                    <Popup>
                        <strong>{place.name}</strong>
                        <br />
                        {place.address}
                        <br />
                        ({place.location.lat.toFixed(5)}, {place.location.lng.toFixed(5)})
                    </Popup>
                </Marker>
            ))}

            {/* Markers added by clicking on the map */}
            {addedMarkers.map((m, i) => (
                <Marker key={`added-${i}`} position={[m.lat, m.lng]} icon={defaultIcon}>
                    <Popup>
                        Custom marker #{i + 1}
                        <br />
                        ({m.lat.toFixed(5)}, {m.lng.toFixed(5)})
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
