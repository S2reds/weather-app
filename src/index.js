import {requestAPI, requestGIF, requestBg} from './helper.js'
import './style.css'

const formData = document.querySelector('form')
const input = document.querySelector('input')
const img = document.querySelector('#bg')
const desc = document.querySelector('#desc')
const formDiv = document.querySelector('.inputDiv')
const infoDiv = document.querySelector('.infoDiv')
const gifDiv = document.querySelector('#gif')
const name = document.querySelector('#locationName')
const weather = document.querySelector('#locationWeather')
const temp = document.querySelector('#locationTemp')
const feelslike = document.querySelector('#feelslike')
const humid = document.querySelector('#humid')
const wind = document.querySelector('#wind')
const box2 = document.querySelector('#box2')
const sunsetter = document.querySelector('#sunset')

window.addEventListener('load', e => {
    let bg = requestBg()
    bg.then(res => img.src = res.results[0].urls.regular)
})

formData.addEventListener('submit', e => {
    e.preventDefault()
    if (!input.value) console.log('No location added')
    const data = Object.fromEntries(new FormData(formData).entries())
    const response = requestAPI(data.location)
    let gif
    response.then(res => {
        console.log(res)
        gif = res.weather[0].main
        let bg = requestBg(res.weather[0].description)
        name.textContent = res.name
        weather.textContent = res.weather[0].description
        temp.innerHTML = `${Math.floor(res.main.temp)}<sup>°F</sup>`
        feelslike.innerHTML = `${Math.floor(res.main.feels_like)}<sup>°F</sup>`
        humid.textContent = `${res.main.humidity}%`
        wind.textContent = `${Math.ceil(res.wind.speed)} mph`
        let sunset = new Date(res.sys.sunset * 1000)
        let hours = sunset.getHours();
        let minutes = '0' + sunset.getMinutes();
        let seconds = '0' + sunset.getSeconds();
        let time = hours + ":" + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(time)
        console.log(sunset)
        sunsetter.textContent = time
        bg.then(result => {
            console.log(result)
            img.src = result.results[0].urls.regular
            let newGif = requestGIF(gif+" weather")
            newGif.then(pic => {
                console.log(pic)
                gifDiv.src = pic.data.images.original.url
        })

        })
    })
    input.value = ''
    formDiv.classList.add('slide-up')
    infoDiv.style.display = 'grid';
})

