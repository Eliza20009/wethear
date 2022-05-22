let form = document.querySelector('#form')
let input = document.querySelector('.form__input')
let button = document.querySelector('.form__btn')
let name = document.querySelector('.name')
let region = document.querySelector('.region')
let temp = document.querySelector('.temp')
let image = document.querySelector('.image')
let tempStatus = document.querySelector('.tempStatus')
let infoTitle = document.querySelectorAll('.info-weather__title')
let pressure = document.querySelector('.pressure')
let speedWind = document.querySelector('.speedWind')
let humidity = document.querySelector('.humidity')
let visibility = document.querySelector('.visibility')
let sunrise = document.querySelector('.sunrise')
let sunset = document.querySelector('.sunset')
button.addEventListener('click', (e) => {
    e.preventDefault()
    // document.guerySelector('.info-weather__circle').classList.add('open-info')
    // document.guerySelector('.info-weather__circle').classList.add('open-info')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=0d54e2c99f5135987d576129179b6bf1`)
        .then((res) => res.json())
        .then((resolve) => {
            console.log(resolve)
            name.textContent = `${resolve.name}`
            region.textContent = `${resolve.sys.country}`
            temp.textContent = `${Math.round(resolve.main.temp)-273}°C`
            image.src = `http://openweathermap.org/img/wn/${resolve.weather[0]["icon"]}@2x.png`;
            tempStatus.textContent = `${resolve.weather[0].main}`
            if (resolve.weather[0]["main"] === "Clouds") {
                tempStatus.textContent = "Облачно";
            } else if (resolve.weather[0]["main"] === "Clear") {
                tempStatus.textContent = "Ясное небо";
            } else if (resolve.weather[0]["main"] === "Rain") {
                tempStatus.textContent = "Дождь";
            } else if (resolve.weather[0]["main"] === "Snow") {
                tempStatus.textContent = "Снег";
            } else if (resolve.weather[0]["main"] === "Thunderstorm") {
                tempStatus.textContent = "Гроза";
            } else if (resolve.weather[0]["main"] === "Drizzle") {
                tempStatus.textContent = "Мелкий дождь";
            } else if (resolve.weather[0]["main"] === "Mist") {
                tempStatus.textContent = "Туман";
            } else if (resolve.weather[0]["main"] === "Haze") {
                tempStatus.textContent = "Дымка";
            } else if (resolve.weather[0]["main"] === "Fog") {
                tempStatus.textContent = "Мгла";
            } else {
                tempStatus.textContent = resolve.weather[0]["main"];
            }
            pressure.textContent = `${resolve.main.pressure} Па`
            speedWind.textContent = `${resolve.wind.speed} м/с`
            humidity.textContent = `${resolve.main.humidity}%`
            visibility.textContent = `${resolve.visibility / 1000} км`
            let date = new Date(resolve.sys.sunrise * 1000)
            sunrise.textContent = date.toLocaleTimeString()
            let date1 = new Date(resolve.sys.sunset * 1000)
            sunset.textContent = date1.toLocaleTimeString()
        })
        .catch((err) => {
            input.placeholder = 'Неверное название'
            input.value = ''
            input.classList.add('error')
        })
})
