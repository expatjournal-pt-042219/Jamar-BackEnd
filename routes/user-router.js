const express  = require('express');
const axios = require('axios');

const Users = require('../models/user-model');
const Posts = require('../models/post-model');
const Photos = require('../models/photo-model');
const Comments = require('../models/comment-model');

const { authenticate } = require('../auth/authenticate');

const router = express.Router();


router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Users.findById(id)
    .then(user => {
        if(!user){
            res.status(404).json({message: `User not found!`})
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        console.log(err)
        // return err;
        res.status(500).json({ message: 'error checking for user'})
    })
})

router.get('/posts/:id', authenticate, (req, res) => {
    const { id } = req.params;
    Posts.findAllPostsByUser(id)
    // const decodedtoken =  req.decodedJwt
    // console.log("decodedtoken", decodedtoken)
    .then(posts => {
        if(!posts){
            res.status(404).json({message: "this user has no posts or you forgot to enter the user id number"})
        } else {
            res.status(200).json(posts)
        }
    })
    .catch(err => {
        console.log('get all users posts error', err)
    })
});

router.get('/photos/:id', authenticate, (req, res) => {
    const { id } = req.params;
    Photos.findAllPhotosByUser(id)
    .then(photos => {
        if(!photos){
            res.status(404).json({message: "this user has no posts or you forgot to enter the user id number"})
        } else {
            res.status(200).json(photos)
        }
    })
    .catch(err => {
        console.log('get all users posts error', err)
    })
});

router.get('/comments/:id', authenticate, (req, res) => {
    const { id } = req.params;
    Comments.findAllCommentsByUser(id)
    .then(comments => {
        if(!comments){
            res.status(404).json({message: "this user has no posts or you forgot to enter the user id number"})
        } else {
            res.status(200).json(comments)
        }
    })
    .catch(err => {
        console.log('get all users posts error', err)
    })
})



module.exports = router;