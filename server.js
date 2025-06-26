import express from 'express'
const app = express()
import db from './db.js' 
import bodyParser from 'body-parser'
app.use(bodyParser.json()); //req.body

import dotenv from 'dotenv'
dotenv.config()

const PORT= process.env.PORT || 3000;

// import Person from './models/person.js'
// import menuItem from './models/menuItem.js'

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel!')
})

import personRoutes from './routes/personRoutes.js'
app.use('/person', personRoutes);

import menuRoutes from './routes/menuRoutes.js'
app.use('/menu', menuRoutes);

app.listen(PORT)