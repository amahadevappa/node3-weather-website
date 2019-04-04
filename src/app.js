const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('.//utils/forecast')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Asha M'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Asha M'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help U',
        message: 'This application will provide weather details for a requested City',
        name: 'Asha M'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'You must provide an address property'
        })
    }
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(longitude,latitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Asha M'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Asha M'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})