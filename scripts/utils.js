function get_param(key) {
    address = window.location.search
    parameterList = new URLSearchParams(address)
    return parameterList.get(key)
}

function format_date(milliseconds, day) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(milliseconds)
    return`${day ? days[date.getDay()] : ''}${day ? ` ${date.getDate()}` : ''} ${months[date.getMonth()]} ${date.getFullYear()}` // ${date.getFullYear()}
}

// https://fungenerators.com/random/facts/geography/ocean
function get_fact() {
    const facts = [
        'Man has explored less than five percent of the oceans on earth.',
        'Approximately 94% of the life on earth is made up of aquatic life forms.',
        'The ocean is home to 230,000 known species.',
        'There are hundreds of thousands of marine life forms known to man but it is estimated that there may actually be millions of marine life forms in existence.',
        'Volcanoes, earthquakes and landslides that occur in the oceans can cause tsunamis which are large sea waves. When they reach land they can be traveling at speeds of hundreds of kilometers an hour.',
        'The deepest known part of the ocean is Mariana Trench, which is located east of the Mariana Islands. It is around 11,000 meters deep at its deepest point.',
        'The largest mountain range on earth is actually below the surface of the ocean,  called the Mid-Oceanic Ridge. It makes up 23% of the earth\'s surface.',
        'The Arctic Ocean is almost completely covered in ice in the winter.',
        'The Pacific Ocean is the largest ocean on earth and covers approximately 30% of the surface of the earth.',
        'The ocean covers approximately 70% of the earth\'s surface.',,
        '\'Pacific Ocean\' means \'peaceful sea\'',
        'Pollution in the air contributes to 33% of the toxic contaminants that land in the ocean. 44% of the contaminants that land in the ocean are from rivers and streams.',
        'The Atlantic Ocean is the second largest ocean in the world and covers more than 21% of the surface of the earth.',
        'There are approximately 350 species of sharks living in the world\'s oceans. Of these 350 species of sharks only 32 have been known to attack people.',

    ]

    return facts[Math.floor(Math.random() * facts.length)]
}