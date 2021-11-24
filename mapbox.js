//MapBox
mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXpoaWZ0eSIsImEiOiJja3djbWJyZm0xanR3MnFwMnp2cTAyNDBrIn0.QNlyBRhAhJJqX8Yr7tDTfw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/codezhifty/ckwcmeekv14ou14l3mhe1qj0n',
    center: [10.5549, 45.1764],
    zoom: 2
});
document.querySelector(".mapboxgl-ctrl-bottom-right").style.display = "none";
document.querySelector(".mapboxgl-ctrl-bottom-left").style.display = "none";
function flyTo(lon, lat) {
    map.flyTo({
        center: [
            lon,
            lat
        ],
        zoom: 15,
        essential: true
    });

    const size = 100;

    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        
        onAdd: function () {
        const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },
        
        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;
            
            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;
            
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(0, 0, 0, ${1 - t})`;
            context.fill();
            
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
            
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;
            
            map.triggerRepaint();
            
            return true;
        }
    };

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    
    map.addSource('dot-point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lon, lat] // icon position [lng, lat]
                }
            }]
        }
    });
   
    map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
}