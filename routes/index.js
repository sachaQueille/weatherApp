var express = require('express');
var router = express.Router();
var request = require('sync-request');
let cities = require('../models/cities');
var cityModel = require('../models/cities');
let {userSchema, UserModel} = require('../models/users.js')

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login');
});

router.get('/weather', async function(req, res, next){
  var cityList = await cityModel.find();

  res.render('weather', {cityList})
});

router.post('/add-city', async function(req, res, next){
  var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`) 
  var dataAPI = JSON.parse(data.body)

  var alreadyExist = await cityModel.findOne({ name: req.body.newcity.toLowerCase() });

  if(alreadyExist == null && dataAPI.name){
    var newCity = new cityModel({
      name: req.body.newcity.toLowerCase(),
      desc:  dataAPI.weather[0].description,
      img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
      lon: dataAPI.coord.lon,
      lat: dataAPI.coord.lat,
    });

    await newCity.save();
  }

  cityList = await cityModel.find();

  res.render('weather', {cityList})
});

router.get('/delete-city', async function(req, res, next){
  await cityModel.deleteOne({
    _id: req.query.id
  })

  var cityList = await cityModel.find();

  res.render('weather', {cityList})
});

router.get('/update-cities', async function(req, res, next){
  var cityList = await cityModel.find();

  for(var i = 0; i< cityList.length; i++){
    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`) 
    var dataAPI = JSON.parse(data.body)

    await cityModel.updateOne({
      _id: cityList[i].id
    }, {
      name: cityList[i].name,
      desc:  dataAPI.weather[0].description,
      img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
      lon: dataAPI.coord.lon,
      lat: dataAPI.coord.lat,
    })
  }

  var cityList = await cityModel.find();

  res.render('weather', {cityList})
});



router.post('/sign-up', async(req, res, next) => {

  let newUser = new UserModel ({
    name: req.body.user,
    mail: req.body.mail,
    pwd: req.body.pwd,
  })
  
  let checkMail = await UserModel.findOne({mail: req.body.mail});
  
  console.log(checkMail);
  //console.log(userSaved)
  if(checkMail == null) {
    let userSaved = await newUser.save();
    req.session.userName = userSaved.name;
    //console.log(req.session.name);
    req.session.userId = userSaved._id;
    //console.log(req.session)
    res.redirect('/weather');
  } else {
    res.redirect('/');
  }

});

router.post('/sign-in', async(req, res, next) => {

  let userExist = await UserModel.findOne({mail: req.body.email, pwd: req.body.password});

  if(userExist) {
    req.session.userName = userExist.name;
    req.session.userID = userExist._id;
    res.redirect('/weather');
  } else {
    res.redirect('/');
  }
 
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});




module.exports = router;
