'use strict';

const superagent = require('superagent');
const User = require('../models/user.js');
// const Timeline = require('../models/model.js');

const fs = require('fs');
const express = require('express');
const jsonParser = require('body-parser').json();
const router = express.Router();


router.post('/api/user', jsonParser, function (req, res, next) {
  // console.log('in timelines route b4 new user adding req', req.body);
  new User(req.body).save()
    .then(data => {
      res.json(data);
    })
    .catch(next);
});

router.get('/api/users', function (req, res, next) {
  // currently setup for find all either change it to find one or add a find one route
  console.log('31 get all');
  User.find({})
    .then(users => {
      // console.log('data line 22', users);
      res.json(users);
    })
    .catch(next);
});

router.get('/api/user/:email', function (req, res) {
  console.log(req.params.email, ' 40 req params');
  // currently setup for find all either change it to find one or add a find one route
  User.findOne({email: req.params.email})
    .then((user, err) => {
      console.log(req.params.email, ' 40 req params after find one get');
      console.log('find one get', user);
      if(!user || !Object.keys(user).length){
        // console.log('data line 47', user);
        // console.log('data line 47', err);
        res.status(404).send('user not found');
      }else{
        // console.log('data line 51', err);
        // console.log('data line 52', user);
        res.json(user);
      }
    });
  // User.findOne({ email: req.params.email })
  //   .then(user => {
  //     // console.log('data line 22', user);
  //     res.json(user);
  //   })
});



router.put('/api/user/:email', jsonParser, (req, res) => {
  console.log('req.body.tasks', JSON.stringify(req.body.tasks));
  User.findOneAndUpdate({
    email: req.params.email
  }, {$set: {tasks: req.body.tasks}}).then((user) => {
    console.log('85 new user', req.body);
    res.json(user);
  }).catch((err) => {
    console.log('87 err', err);
  });
});




// yo actually make a var that holds the value for email from the users model pass it through the url so the db can identify it and remove it thanks - love past ix.... :3

router.delete('/api/user/delete/:email', function (req, res) {
  console.log('req params 44 delte router', req.params);
  User.findOneAndUpdate({ email: req.params.email }, 
  {$pull:{task: {name:{}}}})
    .then(data => {
      res.send(204, 'user deleted');
      // console.log(data, 'data removed line 48');
    })
    .catch(err => {
      // console.log(err, 'err line 51');
    });
});







module.exports = router;
