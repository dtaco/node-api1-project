
const express = require('express')

const server = express()

server.get('/api/users', (req, res) => {
    res.json('THE USERS!') //send status and info
})

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})

module.exports = server; 