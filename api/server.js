
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
        res.status(400).json({ message: 'Please provide name and bio.' })
    }else{
        User.insert(user)
        .then(createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(500).json({
                message: "error creating user",
                err: err.message,
                stack: err.stack,
            })
        })
    }  
})

server.delete('/api/users/:id', async (req, res) => {
    const possibleUser = await User.findById(req.params.id)

    try {
        if(!possibleUser) {
            res.status(404).json({
                message: 'id does not exist'
            })
        }else{
            const deletedUser = await User.remove(possibleUser.id)
            res.status(200).json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "error creating user",
            err: err.message,
            stack: err.stack,
        })
    }
})

server.put('/api/users/:id', async (req, res ) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        const user = req.body;

        if(!possibleUser) {
            res.status(404).json({
                message: 'User id does not exist'
            })
        } else {
            if (!user.name || !user.bio){
                res.status(400).json ({
                    message: 'Please provide name and bio'
                })
            } else{
                const updatedUser = await User.update(
                    req.params.id, 
                    req.body,
                    )
                res.status(200).json(updatedUser)
            }
            
        }
    } catch (err) {
        res.status(500).json({
            message: "error updating user",
            err: err.message,
            stack: err.stack,
        })
    }
})

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})

module.exports = server; 