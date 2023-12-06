
const express = require('express')
const server = express()

const User = require('./users/model')



server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: `Could not get users.`,
                err: err.message,
                stack: err.stack,
            })
        })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})

module.exports = server; 