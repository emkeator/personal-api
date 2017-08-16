const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express(),
      user = require('./user'),
      main_ctrl = require('./controllers/main_ctrl'),
      port = 3000;

//Top-level Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/name', main_ctrl.getName);
app.get('/location', main_ctrl.getLocation);
app.get('/title', main_ctrl.getTitle);
app.get('/super-alias', main_ctrl.getSuperAlias);
app.get('/mortal-id', main_ctrl.getMortalID);
app.get('/occupations', main_ctrl.getOccupations);
app.get('/occupations/latest', main_ctrl.getOccupationsLatest);
app.get('/hobbies', main_ctrl.getHobbies);
app.get('/hobbies/:type', main_ctrl.getHobbies);
app.get('/family', main_ctrl.getFamily);
app.get('/family/:gender', main_ctrl.getFamily);
app.get('/restaurants', main_ctrl.getRestaurants);
app.get('/restaurants/:name', main_ctrl.getRestaurants);
app.get('/skills', main_ctrl.getSkills);

app.put('/name', main_ctrl.updateName);
app.put('/location', main_ctrl.updateLocation);
app.put('/family', main_ctrl.updateFamily);
app.put('/restaurants', main_ctrl.updateRestaurant);
app.put('/restaurants/type', main_ctrl.updateRestaurantByType);

app.post('/hobbies', main_ctrl.createHobby)
app.post('/occupations', main_ctrl.createOccupation);
app.post('/family', main_ctrl.createFamilyMember);
app.post('/restaurants', main_ctrl.createRestaurant);
app.post('/skills', main_ctrl.createSkill);

// {
// 	"restaurants": [{
// 		"name": "La Puente",
// 		"type": "mexican",
// 		"rating": 10
		
// 	},
// 	{
// 		"name": "Blue Iguana",
// 		"type": "mexican",
// 		"rating": 8
		
// 	},
// 	{
// 		"name": "Chipotle",
// 		"type": "mexican",
// 		"rating": 9
		
// 	}
// 	]
// }





app.listen(port, ()=> `I'm listening on port ${port}!`);