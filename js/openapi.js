// --- Weather codes ---
const conditions = {
    0:"☀️ Clear sky", 1:"🌤️ Mainly clear", 2:"⛅ Partly cloudy", 3:"☁️ Overcast",
    61:"🌧️ Rain", 63:"🌧️ Rain", 71:"❄️ Snow", 95:"⚡ Thunderstorm"
}

// FETCH #1 — Current Temperature
async function fetchTemperature(lat, lon, city) {

    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`)

    if(!response.ok){
        throw new Error(response.status)
    }

    let data = await response.json()

    const tempC = Math.round(data.current.temperature_2m)
    const tempF = Math.round(tempC * 9/5 + 32)
    const code = data.current.weathercode

    document.querySelector('#cityName').textContent = city
    document.querySelector('#resultValue').textContent = `${tempF}°F / ${tempC}°C`
    document.querySelector('#resultSub').textContent = conditions[code] || "🌡️ N/A"
    document.querySelector('#result').style.display = 'block'
    document.querySelector('#forecast').style.display = 'none'
}

// FETCH #2 — 7-Day Forecast
async function fetchForecast(lat, lon, city) {

    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto`)

    if(!response.ok){
        throw new Error(response.status)
    }

    let data = await response.json()

    document.querySelector('#cityName').textContent = city + ' — 7-Day Forecast'
    document.querySelector('#resultValue').textContent = ''
    document.querySelector('#resultSub').textContent = ''
    document.querySelector('#result').style.display = 'block'

    let forecastDiv = document.querySelector('#forecast')
    forecastDiv.innerHTML = ''

    for(let i = 0; i < data.daily.time.length; i++){
        let maxF = Math.round(data.daily.temperature_2m_max[i] * 9/5 + 32)
        let minF = Math.round(data.daily.temperature_2m_min[i] * 9/5 + 32)
        let icon = conditions[data.daily.weathercode[i]] || "🌡️"
        let date = new Date(data.daily.time[i] + 'T00:00:00')
        let dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

        let dayEl = document.createElement('div')
        dayEl.classList.add('forecast-day')
        dayEl.innerHTML = `
            <span class="day-name">${dayName}</span>
            <span class="day-icon">${icon.split(' ')[0]}</span>
            <span class="day-temps">${maxF}°F / ${minF}°F</span>
        `
        forecastDiv.appendChild(dayEl)
    }

    forecastDiv.style.display = 'flex'
}

// Event Listeners (UNA sola vez, no dentro de cada función)
let selectedType = 'temp'

let buttonTemperature = document.querySelector('#temperature')
let buttonCondition = document.querySelector('#conditions')

buttonTemperature.addEventListener('click', function(){
    selectedType = 'temp'
    buttonTemperature.classList.add('active')
    buttonCondition.classList.remove('active')
})

buttonCondition.addEventListener('click', function(){
    selectedType = 'cond'
    buttonCondition.classList.add('active')
    buttonTemperature.classList.remove('active')
})

buttonTemperature.classList.add('active')

let form = document.querySelector('form')

form.addEventListener('submit', async function(event){
    event.preventDefault()

    let city = event.target.city.value
    let lat, lon

    if(city === "New York"){
        lat = 40.71
        lon = -74.01
    }
    else if(city === "Los Angeles"){
        lat = 34.05
        lon = -118.24
    }
    else if(city === "Chicago"){
        lat = 41.88
        lon = -87.63
    }
    else if(city === "Atlanta"){
        lat = 33.75
        lon = -84.39
    }
    else if(city === "Miami"){
        lat = 25.76
        lon = -80.19
    }
    else {
        document.querySelector('#resultValue').textContent = '❌ City not found'
        document.querySelector('#result').style.display = 'block'
        return
    }

    try {
        if(selectedType === 'temp'){
            await fetchTemperature(lat, lon, city)   // <-- FETCH #1
        } else {
            await fetchForecast(lat, lon, city)      // <-- FETCH #2
        }
    } catch (error) {
        console.error('An error occurred', error)
        document.querySelector('#resultValue').textContent = '⚠️ Error fetching data'
        document.querySelector('#result').style.display = 'block'
    }
})