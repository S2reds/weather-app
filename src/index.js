import {requestAPI, requestGIF, requestBg} from './main.js'
import './style.css'

const formData = document.querySelector('form')
const input = document.querySelector('input')
const img = document.querySelector('#bg')
const desc = document.querySelector('#desc')
const formDiv = document.querySelector('.inputDiv')
const infoDiv = document.querySelector('.infoDiv')
const gifDiv = document.querySelector('#gif')

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
        desc.textContent = res.weather[0].description + ` @ ${data.location}`
        bg.then(result => {
            console.log(result)
            img.src = result.results[0].urls.regular
            let newGif = requestGIF(gif)
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

