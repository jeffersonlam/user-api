var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/users');

app.get('/', function (req,res) {
  res.send('Hello, world!');
});

app.post('/users', function (req, res) {
  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  user.save(function (err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'User added.', data:user });
  });
});

app.get('/users', function (req, res) {
  User.find(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

app.get('/users/:user_id', function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

app.put('/users/:user_id', function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.send(err);
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
});

app.delete('/users/:user_id', function (req, res) {
  User.findByIdAndRemove(req.params.user_id, function (err) {
    if (err) {
      res.send(err);
    }
    res.json({message: 'User removed.'})
  });
});

app.listen(3000);
console.log("App listening on port 3000");
