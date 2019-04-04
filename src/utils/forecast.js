const request = require('request')

const forecast = (lantitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a58a6d9aed37bdf91b6c0ea44e5c53f3/' + lantitude+","+longitude

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            console.log(body.error)
            callback('Unable to find location')
        } else {
            callback(undefined,
                // summary: response.body.daily.data[0].summary,
                // temperature : response.body.currently.temperature,
                // precipProbability: response.body.currently.precipProbability
                body.daily.data[0].summary + ' It is currently '+body.currently.temperature + ' degrees out. There is '+body.currently.precipProbability+'% chance of rain.'+
                ' High today is '+  body.daily.data[0].temperatureHigh + ' degrees. Low today is '+ body.daily.data[0].temperatureLow +' degrees'
            )
      }
    })
}

module.exports = forecast