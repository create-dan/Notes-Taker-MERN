const express = require("express");
const dotenv = require('dotenv');
const app = express();
const notes = require("./data/notes");


dotenv.config();
app.get("/", (req, res) => {
  res.send("hwllow duniya");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get('/api/notes/:id', (req,res)=> {
    res.send(notes.find((note)=> note._id==req.params.id));
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is listening on port ${PORT}`));
