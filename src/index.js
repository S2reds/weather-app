import {requestAPI, requestGIF, requestBg} from './main.js'
import './style.css'

const formData = document.querySelector('form')
const input = document.querySelector('input')
const img = document.querySelector('#bg')
const desc = document.querySelector('#desc')

formData.addEventListener('submit', e => {
    e.preventDefault()
    if (!input.value) console.log('No location added')
    const data = Object.fromEntries(new FormData(formData).entries())
    const response = requestAPI(data.location)
    response.then(res => {
        let bg = requestBg(res.weather[0].main)
        desc.textContent = res.weather[0].main
        bg.then(result => {
            console.log(result)
            img.src = result.results[0].urls.regular
        })
    })
    input.value = ''
})

