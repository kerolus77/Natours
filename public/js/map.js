export const initializeMap = (locations) => {
   

    if (typeof mapboxgl === 'undefined') { 
        console.error('Mapbox GL JS failed to load.');
        return;
    }



    if (Array.isArray(locations) && locations.length > 0) {
        mapboxgl.accessToken = '';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/btreasure/cmtd15zn9001301s5bst89s75',
           
            scrollZoom: false,
        });

        const bounds = new mapboxgl.LngLatBounds();

        locations.forEach((loc) => {
            const el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker({
                element: el,
                anchor: 'bottom'
            }).setLngLat(loc.coordinates).addTo(map);

            new mapboxgl.Popup({
                offset: 30
            }).setLngLat(loc.coordinates).setHTML(`<p>${loc.day}: ${loc.description}</p>`).addTo(map);

            bounds.extend(loc.coordinates);
        });

        map.fitBounds(bounds, {
            padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMap);
} else {
    initializeMap();
}