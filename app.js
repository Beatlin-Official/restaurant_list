const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
app.use(express.static('public'))

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting routes 
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList })
})

app.get('/search', (req, res) => {
    if (!req.query.keywords) {
        res.redirect('/')
    }
    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()
    const filterRestaurants = restaurantList.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.includes(keyword)
    )
    res.render('index', { restaurants: filterRestaurants, keywords })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.find(restaurant =>
        restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})