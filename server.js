
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



// //create a chore and add to a specific persons list//
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
    
    
// //DELETE a chore 
// server.delete("/chores/:id", validateChoreId, (req, res) => {
//   const choreId = req.params.id;
//   let selectedchore;

//   Chores.getById(choreId)
//     .then(chore => {
//       selectedchore = chore;
//       Chores.remove(choreId)
//         .then(selectedChore => {res.status(200).json(selectedchore);
//         })
//         .catch(error => {
//           res
//             .status(500)
//             .json({ message: "Could not delete chore using that ID" });
//         });
//     })
//     .catch(error => {
//       res.status(500).json({ message: "Things went wrong!" });
//     });
// });



// //UPDATE a chore 
// server.put("/chores/:id", validateChoreId, validateChore, (req, res) => {
//   const choreId = req.params.id;
//   const changes = req.body;
//   Chores.update(choreId, changes)
//     .then(updated => {
//       res.status(200).json(updated);
//     })
//     .catch(error => {
//       res.status(500).json({ message: "error posting" });
//     });
// });

// //find all chores of person by ID
// server.get('/:id/chores', validatePerson,  (req, res) => {
//   const ID = req.params.id;
//   People.getUserChores(ID)
//     .then(chores => {
//       res.status(200).json(chores);
//     })
//     .catch(error => {
//       res.status(500).json({ message: "Users chores could not be retrieved" });
//     });
// });


module.exports = server;