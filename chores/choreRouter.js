const express = require('express')

const server = express.Router();
const Chores = require("../data/data");
const People = require("../data/data");


///////////custom middleware////////////

function validateChoreId(req, res, next) {
  const ID = req.params.id;
  Chores.getById(ID)
    .then(chore => {
      if (chore) {
        req.chore = chore;
        next();
      } else {
        res.status(400).json({ message: "Invalid chore ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error validating chore ID" });
    });
}

const validateChore = (req, res, next) => {
  if(!req.body){
    res.status(400).send({message: "missing data"})
  }
  if(!req.body.description){
    res.status(400).send({message: "error, missing info"})
  }
  if(!req.body.assignedTo){
    res.status(400).send({message: "error, missing info"})
  }if(!req.body.completed){
    res.status(400).send({message: "error, missing info"})
  }
  next()
}


const validatePerson = (req, res, next) => {
 
  if(!req.body || req.body === {}){
    res.status(400).send({message: "missing data"})
  }
  if(!req.body.id){
    res.status(400).send({message: "no such person"})
  }
  next()
}
//////////////////ROUTES//////////////
server.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from Node'})
})
//GET all chores
server.get("/chores", (req, res) => {
  Chores.get()
    .then(chores => {
      res.status(200).json(chores);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get all chores" });
    });
});



//create a user's chore//
server.post("/chores/:id", validateChore, (req, res) => {
  const choreInfo = req.body;
  choreInfo.id = req.params.id;
  
  Chores.insert(choreInfo)
    .then(chore => {
      res.status(200).json(chore);
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding a chore for that user" });
    });
});


//DELETE chore using its ID, return deleted chore
server.delete("/chores/:id", validateChoreId, (req, res) => {
  const choreId = req.params.id;
  let selectedchore;

  Chores.getById(choreId)
    .then(chore => {
      selectedchore = chore;
      Chores.remove(choreId)
        .then(selectedChore => {res.status(200).json(selectedchore);
        })
        .catch(error => {
          res
            .status(500)
            .json({ message: "Could not delete chore using that ID" });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Things went wrong!" });
    });
});



//UPDATE chore using its ID and supplying changes in body
server.put("/chores/:id", validateChoreId, validateChore, (req, res) => {
  const choreId = req.params.id;
  const changes = req.body;
  Chores.update(choreId, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({ message: "error posting" });
    });
});

//find chores of person by ID
server.get('/:id/chores', validatePerson,  (req, res) => {
  const ID = req.params.id;
  People.getUserChores(ID)
    .then(chores => {
      res.status(200).json(chores);
    })
    .catch(error => {
      res.status(500).json({ message: "Users chores could not be retrieved" });
    });
});


module.exports = server;