const fs = require("fs");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  let notes = require("../db/db.json");

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.get("/api/notes/:id", function(req, res) {
    const id = req.params.id;
    notes.forEach(item => {
      if(id === item.id){
        return res.json(item);
      }
    })
    return res.json(false);
  });

app.post("/api/notes", (req,res)=>{
  const freshNote = req.body;
  freshNote.id = notes.length + 1;
  notes.push(freshNote);
  let jsonNote = JSON.stringify(notes);
  fs.writeFile("./db/db.json", jsonNote, err => {
    if (err) throw err;
    console.log("Notes updated");
  });
  res.json(true);
})


  app.delete("/api/notes/:id", (req, res)=> {
    const id = req.params.id;
    notes.forEach((item, index) => {
      if(id === item.id) {
        notes.splice(index, 1);
      }
      let jsonNote = JSON.stringify(notes);
      fs.writeFile("./db/db.json", jsonNote, err => {
        if (err) throw err;
        console.log(`Note ${item.id} deleted`);
      })
    })
    res.json(true);
  });

};
