if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const axios = require("axios")
const yelpKey = process.env.YELP_API_KEY;
const app = express()

app.get('/api/:latitude/:longitude', (request, response) => {
  const { latitude, longitude } = request.params;
  axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`, {
      headers: { "Authorization" : `Bearer ${yelpKey}` }
    })
    .then(resp => response.send(resp.data))
    .catch(error=> response.send({ errors: true, error }))
})

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
