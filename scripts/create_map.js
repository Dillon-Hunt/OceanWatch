mapboxgl.accessToken = 'pk.eyJ1IjoiZGlsbG9uLWh1bnQiLCJhIjoiY2xlbWl0bGtmMDRqazNwcGx5bWhrcGswZyJ9.FkIS6A7JJGZEmNmU63AIhA';

navigator.geolocation.getCurrentPosition((position) => {
    create_map(position.coords.longitude, position.coords.latitude)
})

let attacks = []

function create_marker(id, day, month, year, time_frame, type, map) {

    const weight = (((new Date).getFullYear() - year) * 12 + month) / (time_frame * 12)

    const element = document.createElement('div');
    element.classList.add('marker')
    element.classList.add(`${type}_marker`)
    element.style.backgroundColor = `hsla(${weight * 50}, 90%, 60%, 0.7)`
    element.style.borderRadius = '50%'
    element.style.width = `${(1.5 - weight) * 30}px`
    element.style.height = `${(1.5 - weight) * 30}px`
    
    element.addEventListener('click', () => {
        const attack = attacks.find((item) => item.attack_id === id)

        map.flyTo({
            center: [attack.longitude, attack.latitude],
            zoom: 9,
            essential: false
        })

        if (attack.image_url) document.querySelector('.attack__image').style.display = 'block'
        else document.querySelector('.attack__image').style.display = 'none'

        document.querySelector('.attack__image').src = attack.image_url
        document.querySelector('.attack__common_name').textContent = `Common Name: ${ attack.common_name }`
        document.querySelector('.attack__scientific_name').textContent = `Scientific Name: ${ attack.scientific_name }`
        document.querySelector('.attack__location').textContent = `Location: ${ attack.location }`
        document.querySelector('.attack__latitude').textContent = `Longitude: ${ attack.longitude }`
        document.querySelector('.attack__longitude').textContent = `Latitude: ${ attack.latitude }`
        document.querySelector('.attack__date').textContent = `Date: ${ format_date(new Date(attack.year, attack.month - 1, attack.day), attack.day === null) }`
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
        e.target.classList.contains('attack_marker') ? document.querySelector('.attack').classList.add('appear') : document.querySelector('.attack').classList.remove('appear')
    })

    // Update Attacks
    attacks = await fetch(`http://localhost:3005/attacks?year=${time_frame}`, { method: 'GET' })
        .then(response => response.json()
        .then(data => data)
        .catch((error) => console.error(error))) 


    // Create a new marker.
    attacks.forEach(attack => {
        new mapboxgl.Marker(create_marker(attack.attack_id, attack.day, attack.month, attack.year, time_frame, 'attack', map))
            .setLngLat([attack.longitude, attack.latitude])
            .addTo(map)
    })
}
