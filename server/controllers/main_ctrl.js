const user = require('./../user'),
      userSkills = require('./../skills');

module.exports  = {
    getName: (req, res) => {
        res.status(200).send({name: user.name});
    },
    getTitle: (req, res) => {
        res.status(200).send({title: user.title});
    },
    getSuperAlias: (req, res) => {
        res.status(200).send({superAlias: user.superAlias});
    }, 
    getMortalID: (req, res) => {
        res.status(200).send({mortalID: user.mortalID});
    },
    getLocation: (req, res) => {
        res.status(200).send({location: user.location});
    },
    getOccupations: (req, res) => {
        let occupations = user.occupations.slice(0);
        if(req.query.order) {
            if(req.query.order === 'desc') {
                occupations.sort().reverse()
            } else if(req.query.order === 'asc'){
                occupations.sort()
            }
        }
        res.status(200).send({occupations});
    },
    getOccupationsLatest: (req, res) => {
        res.status(200).send({latestOccupation: user.occupations[0]});
    },
    getHobbies: (req, res) => {
        let hobbies = user.hobbies;
        if(req.params.type) {
            hobbies = hobbies.filter((e) =>{
                if(e.type === req.params.type) return e;
            });
        }
        res.status(200).send({hobbies});
    },
    getFamily: (req, res) => {
        let family = user.family;
        if(req.params.gender) {
            family = family.filter((e) =>{
                if(e.gender === req.params.gender) return e;
            });
        }

        if(req.query.relation) {
            let relation = req.query.relation.split('+').join(' ');
            family = family.filter((e) =>{
                if(e.relation.includes(relation)) return e;
            });
        }
        res.status(200).send({family});
    },
    getRestaurants: (req, res) => {
        let restaurants = user.restaurants;
        
        if(req.params.name) {
            let name = req.params.name.split('+').join(' ');
            restaurants = restaurants.filter((e) =>{
                if(e.name.includes(name)) return e;
            });
        }

        if(req.query.rating) {
            restaurants = restaurants.filter((e) =>{
                if(e.rating >= req.query.rating) return e;
            });
        }
        res.status(200).send({restaurants});
    },
    updateName: (req, res) => {
        user.name = req.body.name;
        res.status(200).send({name: user.name});
    },
    updateLocation: (req, res) => {
        user.location = req.body.location;
        res.status(200).send({location: user.location});
    },
    createHobby: (req, res) => {
        user.hobbies.push(req.body);
        res.status(200).send({hobbies: user.hobbies});
    },
    createOccupation: (req, res) => {
        user.occupations.unshift(...req.body.occupation);
        res.status(200).send({occupations: user.occupations});
    },
    createFamilyMember: (req, res) => {
        user.family.push(...req.body.family);
        res.status(200).send({family: user.family});
    },
    createRestaurant: (req, res) => {
        user.restaurants.push(...req.body.restaurants);
        res.status(200).send({restaurants: user.restaurants});
    },
    getSkills: (req, res) => {
        let skills = userSkills;

        if(req.query.experience) {
            skills = skills.filter((e) => {
                if(e.experience.toLowerCase() === req.query.experience.toLowerCase()) return e;
            })
        }
        res.status(200).send({skills});
    },
    createSkill: (req, res) => {
        for (let i = 0; i < req.body.skills.length; i++) {
            userSkills.push(Object.assign(req.body.skills[i], {id: userSkills.length+1}));
        }
        // userSkills.push(...req.body.skills);
        res.status(200).send({skills: userSkills});
    },
    updateFamily: (req,res) => {
        let {name, status, relation} = req.body;
        user.family.map((person) =>{
            if(person.name.includes(name)){
                person.status = status;
                person.relation = relation;
            }
        });
        res.status(200).send({family: user.family});
    },
    updateRestaurant: (req,res) => {
        let {name} = req.body;
        user.restaurants.map((e) =>{
            if(e.name.includes(name)){
                if(req.body.type) e.type = req.body.type;
                if(req.body.rating) e.rating = req.body.rating;
            }
        });
        res.status(200).send({restaurants: user.restaurants});
    },
    updateRestaurantByType: (req,res) => {
        let {type} = req.body;
        user.restaurants.map((e) =>{
            if(e.type === type){
                if(req.body.rating) e.rating = req.body.rating;
            }
        });
        res.status(200).send({restaurants: user.restaurants});
    }
    
}