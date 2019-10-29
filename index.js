// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors());

//add a user
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if(name && bio){
        db.insert({name, bio})
        .then(user => {
            const {id} = user;
            db.findById(id)
            .then(user => {
                res.status(201).json(user);
            })
        })
        .catch(err => res.status(500).json({error: 'There was an error while saving the user to the database'}));
    }else{
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
    }
})

//get users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'});
    })
})

//get user by id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(user => {
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: 'The user with the specified ID does not exist.'});
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'});
    })
})

//delete user by id
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
    .then(deleted => {
        if(deleted){
            res.status(200).json({message: `User with ID ${id} successfully deleted`});
        }else{
            res.status(404).json({message: 'The user with the specified ID does not exist.'});
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The user could not be removed'});
    })
})

//update user by id
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, bio} = req.body;

    if(name && bio){
        db.update(id, {name, bio})
        .then(updated => {
            if(updated){
                db.findById(id)
                .then(user => {
                    res.status(200).json(user);
                })
            }else{
                res.status(404).json({message: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'The user information could not be modified'})
        })
    }else{
        res.status(400).json({errorMessage: 'Please provide name and bio for the user'});
    }
})

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));