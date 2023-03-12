const express  = require('express')
const post = require('../models/Post');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');

//Creating a user using POST /api/auth/signup request.
router.post('/addPost', fetchuser ,async (req, res)=>{
    try {
        console.log(req.User.id)
        let newpost = await post.create({
            user: req.User.id,
            content: req.body.content,
            name: req.body.name,
            userImage: req.body.userImage,
            image: req.body.image,
            audio: req.body.audio,
            month: req.body.month,
            date: req.body.date,
            year:req.body.year
        });
        res.json({newpost})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchProfilePosts', fetchuser , async (req, res)=>{
    try {
        const allPosts = await post.find({user: req.User.id});
        res.json(allPosts)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchHomePosts', fetchuser , async (req, res)=>{
    try {
        const allPosts = await post.find({user: req.User.id});
        res.json({allPosts:allPosts, userId:req.User.id})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

module.exports = router