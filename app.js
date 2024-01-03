const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {

    const requestOptions = {
        url: process.env.API_BASE_URL + '/register',
        method: 'POST',
        form: {
            username: req.body.username,
            password: req.body.password,
        }
    };

    request(requestOptions, (error, response, body) => {
        if (response.statusCode === 200) {
            res.status(200).json({ message: 'Registration successful' });
        } else {
            res.status(401).render('info', {
                title: 'Register Failed',
                message: body
            });
        }
    });


});

app.post('/login', async (req, res) => {

    const requestOptions = {
        url: process.env.API_BASE_URL + '/login',
        method: 'POST',
        form: {
            username: req.body.username,
            password: req.body.password,
        }
    };

    const obj = await fetch(process.env.API_BASE_URL + "/all");
    const obj2 = await fetch(process.env.API_BASE_URL + "/all/" + req.body.username);
    if(obj.ok) {
        var list1 = await obj.json();
    }
    if(obj2.ok) {
        var list2 = await obj2.json();    
    }
    
    request(requestOptions, (error, response, body) => {
        if (response.statusCode === 200) {

            res.status(200)
                .render('homepage', {
                    username: req.body.username,
                    API_BASE_URL: process.env.API_BASE_URL,
                    all_files : list1,
                    my_files : list2
                });

        } else {
            res.status(401).render('info', {
                title: 'Login Failed',
                message: body
            });
        }
    });
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});