mapboxgl.accessToken = 'pk.eyJ1IjoiZGlsbG9uLWh1bnQiLCJhIjoiY2xlbWl0bGtmMDRqazNwcGx5bWhrcGswZyJ9.FkIS6A7JJGZEmNmU63AIhA';

navigator.geolocation.getCurrentPosition((position) => {
    create_map(position.coords.longitude, position.coords.latitude)
})

let sightings = []

function create_marker(id, type, map) {

    const element = document.createElement('div');
    element.classList.add('marker')
    element.classList.add(`${type}_marker`)
    element.style.backgroundColor = `#61B9D4`
    element.style.borderRadius = '50%'
    element.style.width = '20px'
    element.style.height = '20px'
    
    element.addEventListener('click', () => {
        const sighting = sightings.find((item) => item.sighting_id === id)

        map.flyTo({
            center: [sighting.longitude, sighting.latitude],
            zoom: 9,
            essential: false
        })

        document.querySelector('.sighting__latitude').textContent = `Longitude: ${ sighting.longitude }`
        document.querySelector('.sighting__longitude').textContent = `Latitude: ${ sighting.latitude }`
        document.querySelector('.sighting__date').textContent = `Date: ${ format_date(new Date(sighting.year, sighting.month - 1, sighting.day), sighting.day === null) }`
    })

    return element
}

async function create_map(longitude, latitude) {

    const time_frame = 1

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dillon-hunt/clemjag0t001201qrb3b838e2', // or mapbox://styles/mapbox/satellite-v9 or mapbox://styles/dillon-hunt/clene7ymu000701oa88km68lx
        center: [longitude, latitude],
        zoom: 9,
    })

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Search for a location',
            mapboxgl: mapboxgl,
            marker: false,
            zoom: 9
        })
    )

    document.querySelector('.map').addEventListener('click', (e) => {
        e.target.classList.contains('sighting_marker') ? document.querySelector('.sighting').classList.add('appear') : document.querySelector('.sighting').classList.remove('appear')
    })

    // Update sightings
    sightings = await fetch(`http://localhost:3005/sightings?year=${time_frame}`, { method: 'GET' })
        .then(response => response.json()
        .then(data => data)
        .catch((error) => console.error(error))) 


    // Create a new marker.
    sightings.forEach(sighting => {
        new mapboxgl.Marker(create_marker(sighting.sighting_id, 'sighting', map))
            .setLngLat([sighting.longitude, sighting.latitude])
            .addTo(map)
    })
}
