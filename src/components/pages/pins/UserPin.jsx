import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const userPin = L.divIcon({
    html: '<i class="fa-solid fa-location-dot" style="color: #3C5B6F; font-size: 24px; margin-bottom: 65px"></i>',
    className: 'custom-marker-icon'
});
