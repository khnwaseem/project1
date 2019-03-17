const express = require('express');
const hbs = require('hbs')
const fs = require('fs')


var app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log("unable to append the file")
        }
    })
    next();
})

app.get('/',(req,res) => {
    res.render('home.hbs', {
    pageTitle: "worzett",
    
        
    })
})

app.get('/about', (req,res) => {
        res.render('about.hbs', {
            pageTitle: 'worzett',
            
        });
});

app.listen(3000, () => {
    console.log('server is up to port 3000')
});