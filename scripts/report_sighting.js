mapboxgl.accessToken = 'pk.eyJ1IjoiZGlsbG9uLWh1bnQiLCJhIjoiY2xlbWl0bGtmMDRqazNwcGx5bWhrcGswZyJ9.FkIS6A7JJGZEmNmU63AIhA';

let map = null

navigator.geolocation.getCurrentPosition((position) => {
    map = create_map(position.coords.longitude, position.coords.latitude)
})


async function create_map(longitude, latitude) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dillon-hunt/clene7ymu000701oa88km68lx', // or mapbox://styles/mapbox/satellite-v9 or mapbox://styles/dillon-hunt/clene7ymu000701oa88km68lx
        center: [longitude, latitude],
        zoom: 9,
    })

    document.querySelector('input[name=longitude]').value =  Math.round(map.getCenter().lng * 1000) / 1000
    document.querySelector('input[name=latitude]').value =  Math.round(map.getCenter().lat * 1000) / 1000

    map.on('move', function() {
        const center = map.getCenter();
        const longitude = Math.round(center.lng * 1000) / 1000
        const latitude = Math.round(center.lat * 1000) / 1000

        document.querySelector('input[name=longitude]').value = longitude
        document.querySelector('input[name=latitude]').value = latitude
    })

    return map
}