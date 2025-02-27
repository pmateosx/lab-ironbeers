const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
      .then(beers => {
        res.render("beers", { beers: beers })
      })
      .catch(error => console.log(error))
})

app.get('/randomBeers', (req, res) => {
  punkAPI
  .getRandom()
    .then(randomBeers => {
      res.render('randomBeers',{randomBeers})
      console.log("randomBeers", {randomBeers});
    })
    .catch(error => console.log(error))
})

// 404 error
app.use((req, res) => {
  res.status(404).send("Not found wey");
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
