// requiring express module 
const express = require('express');
const fs = require('fs');
const path = require('path'); 

// if port is any route or 3001
const PORT = process.env.PORT || 3001; 

// instantiate the server
const app = express(); 

// parse incoming string or array data
app.use(express.urlencoded ( { extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for public files
app.use(express.static('public')); 

//request data
const { notes } = require ('.data/db.json');

// function handling taking the data from req.body and adding it to our db.json file

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);

    //path to write file
    fs.writeFileSync(
        path.join(__dirname, '.data/db.json'),
        JSON.stringify({ notes : notesArray }, null, 2)
    );
    //return finsihed code to post route for response
    return note;
};

//validating data
function validateNote (note) {

    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};






// chain listen() method onto our servers
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
