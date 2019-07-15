if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const axios = require("axios")
const yelpKey = process.env.YELP_API_KEY;
const app = express()

// JUST FOR DEMO PURPOSES, PUT YOUR ACTUAL API CODE HERE
app.get('/api/:location', (request, response) => {
  const { location } = request.params;

  console.log('key: ', process.env.YELP_API_KEY);

  axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}`, {
    headers: {
      "Authorization" : `Bearer ${yelpKey}`,
    }
  })
  .then(resp => response.send(resp.data))
  .catch(error=> response.send({ errors: true, error }))
  
  // response.json({
  //   return: request.type
  // })
})


// END DEMO

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const port = process.env.PORT || 8080
app.listen(
  port,
  () => { console.log(`API listening on port ${port}...`) }
)
