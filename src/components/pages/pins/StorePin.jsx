import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const storePin = L.divIcon({
    html: '<i class="fa-solid fa-location-dot" style="color: #af0f44; font-size: 24px; margin-bottom: 65px"></i>',
    className: 'custom-marker-icon'
});