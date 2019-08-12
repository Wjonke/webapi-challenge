
const express = require("express");

const server = express();

server.use(express.json())



let Chores =[
  {
    id: 1,
    description: "mow Lawn",
    notes: "get gas",
    assignedTo: 1,
    completed: false
  },
  {
    id: 2,
    description: "do dishes",
    notes: "just do it",
    assignedTo: 2,
    completed: false
  },
  {
    id: 3,
    description: "finish Sprint",
    notes: "sign",
    assignedTo: 3,
    completed: true
  }
]

let People =[
  { id:1, name: 'Frodo Baggins' },
  { id:2, name: 'Samwise Gamgee' }, 
  { id:3, name: 'Meriadoc Brandybuck' },
  
]


//////////////////ROUTES//////////////

//tests passed
//GET all chores with added Query to check if completed
server.get("/chores", (req, res) => {

  if (req.query.completed === "true") {
    let completedChores = Chores.filter(chore => chore.completed === true);
    res.status(200).json(completedChores);

  } else if (req.query.completed === "false") {
    let unCompletedChores = Chores.filter(chore => chore.completed !== true);
    res.status(200).json(unCompletedChores);

  } else {
    res.status(200).json(Chores);
  }
});


////Tests Passed!////
// //create a chore and add to a specific persons list//
//if there is a description and its not completed, add new chore and set completed to false//
server.post("/chores/:id", (req, res) => {
  const personId = Number(req.params.id); //changes string to number
  const newChoreInfo = req.body;
  newChoreInfo.id = Chores.length + 1;//increments id of previous chore
  newChoreInfo.assignedTo = personId//assigns assignedTo id of person

  if(newChoreInfo.description) {
    if (!newChoreInfo.hasOwnProperty("completed")) {
      newChoreInfo.completed = false;
      Chores.push(newChoreInfo);
      res.status(201).json(newChoreInfo);
    }
  } else{
    res.status(400).json({ message: "You must add description" });
  }
});
    
    //tests passed !
//DELETE a chore by id
server.delete("/chores/:id", (req, res) => {
  const choreId = Number(req.params.id);
  let selectedChore= Chores.filter(chore=> chore.id ===choreId)

  //sets chroes array to chores that weren't deleted
  Chores= Chores.filter(chore=>{
    if (chore.id !== choreId) {
      return chore;
    }

  })

  res.status(200).json(selectedChore)
});



// //UPDATE a chore 
server.put("/chores/:id", (req, res) => {
  const choreId = Number(req.params.id);
  const changes = req.body;
  
  Chores= Chores.map(chore => {
    if (chore.id === choreId) {
      chore = changes;
      chore.id = choreId;
      return chore;
    }else {
      return chore;
    }
  });
  let changedChore = Chores.filter(chore=> chore.id === choreId);
  res.status(200).json(changedChore);
});


module.exports = server;