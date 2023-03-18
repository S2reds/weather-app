import {requestAPI, requestGIF, requestBg} from './main.js'

const formData = document.querySelector('form')
const input = document.querySelector('input')
formData.addEventListener('submit', e => {
    e.preventDefault()
    if (!input.value) console.log('No location added')
    const data = Object.fromEntries(new FormData(formData).entries())
    const response = requestAPI(data.location)
    response.then(res => console.log(res))
    input.value = ''
})



JXWCSjOE6buim580jJqlMHvwJz4WtZVK24b1uAIgdg8