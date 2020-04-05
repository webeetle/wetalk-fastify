'use strict'

const axios = require('axios')
const moment = require('moment')

const TICKETS_NUMBER = 30
const USERNAME = 'ddantonio'
const PASSWORD = 'pippo'

const generateData = async (ticketsNumber) => {
  let token = null;

  try {
    const userResponse = await axios.post('http://localhost:3000/signin', {
      username: USERNAME,
      password: PASSWORD
    })

    token = userResponse.data.token
  } catch (e) {
    const userResponse = await axios.post('http://localhost:3000/signup', {
      username: USERNAME,
      password: PASSWORD,
      fullName: 'Davide D\'Antonio'
    })

    token = userResponse.data.token
  }

  try {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: {'Authorization': `Bearer ${token}`}
    })

    // Create 10 tickets
    const elements = Array.from(Array(ticketsNumber || TICKETS_NUMBER).keys())
    const tickets = []
    for (let i of elements) {
      const response = await axiosInstance.post('/ticket', {
        'creation-date': moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        'subject': `This is the title ${i}`,
        'body': `This is the body ${i}`
      })

      tickets.push(response.data._id)
      console.log(`Created ticket ${response.data._id}`)
    }

    console.log('\n\n\n-------------------------------------------\n\n\n')

    for (let id of tickets) {
      console.log(`GET ticket ${id}`)
      await axiosInstance.get(`/ticket/${id}`)

      console.log('GET all tickets')
      await axiosInstance.get('/ticket')

      console.log(`DELETE ticket ${id}`)
      await axiosInstance.delete(`/ticket/${id}`)

      console.log('---------------------------------------')
    }
  } catch (e) {
    console.log(e)
  }
}


const args = process.argv.splice(2)
generateData(parseInt(args[0]))
