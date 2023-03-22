async function requestAPI(location='Irvine') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=d5d59bec2b8f1088db91bfb3dc8e9c6b&units=imperial`)
    const json = await response.json()
    return json
}

async function requestGIF(val='cats') {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=KCxJKhRuXqVWLLJbDfgdjvqw9BSFiv5C&s=${val}`)
    const json = await response.json()
    return json
}

async function requestBg(val='forest') {
    const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=JXWCSjOE6buim580jJqlMHvwJz4WtZVK24b1uAIgdg8&query=${val}&orientation=landscape&color=blue`)
    const json = await response.json()
    return json
}

export {requestAPI, requestGIF, requestBg}