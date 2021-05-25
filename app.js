const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;

    if(sort){
        if(!['Rating', 'App'].includes(sort)){
            res.status(400)
                .send('Sort must be of rating or app')
        }
    }

    if(genres){
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
            res.status(400)
                .send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }

    let results = apps
                    .filter(app => 
                        app
                            .Genres
                            .toLowerCase()
                            .includes(genres.toLowerCase())
                            );

    if (sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
                });
            }

    res.json(results)
})

app.listen(8000, () => {
    console.log('Server started on port 8000')
})

