const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const cache = {};


app.get(`/`, (req, res) => {
    const imdbId = req.query.i;
    let title = req.query.t;
    
    var type = '';

    if (imdbId){
        type = imdbId
    }   else if (title) {
        type = title
    }

    switch(type){
    
    case imdbId:

    if (cache.hasOwnProperty(imdbId)) {
        res.json(cache[imdbId]);
    } 
    else {
        axios.get('http://www.omdbapi.com/?apikey=8730e0e&i=' + imdbId)
        .then(response => {
            cache[imdbId] = response.data;
            res.json(cache[imdbId]);
        })
        .catch(error => {
            console.log('error', error)
        })
    };
    break;
    case title:
    title = title.replace(/ /g, '%20');
    if (cache.hasOwnProperty(title)) {
        res.json(cache[title]);
    } 
    else {
        axios.get('http://www.omdbapi.com/?apikey=8730e0e&t=' + title)
        .then(response => {
            cache[title] = response.data;
            res.json(cache[title]);
        })
        .catch(error => {
            console.log('error', error)
        })
    };
    break;
    case '':
    break;
 };
});




module.exports = app;



// app.get(`/`, (req, res) => {
//     const imdbId = req.query.i;
//     if (cache.hasOwnProperty(imdbId)) {
//         res.json(cache[imdbId]);
//     } else {
//         axios.get('http://www.omdbapi.com/?apikey=8730e0e&i=' + imdbId)
//         .then(response => {
//             cache[imdbId] = response.data;
//             res.json(cache[imdbId]);
//         })
//         .catch(error => {
//             console.log('error', error)
//         })
//     }
// });


