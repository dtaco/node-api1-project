
const express = require('express')
const server = express()
server.use(express.json())

const User = require('./users/model')



server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(404).json({
                message: "does not exist",
                err: err.message,
                stack: err.stack,
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not retrieve user.",
                err: err.message,
                stack: err.stack,
            })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body;

    if( !user.name || !user.bio ) {
        res.status(422).json({ message: 'Please provide name and bio.' })
    }else{User.insert(user)
        }
    
})

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})

module.exports = server; 