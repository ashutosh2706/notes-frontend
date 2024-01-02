const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

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

app.post('/register', (req, res)=> {
    res.status(200).json({ message: 'Registration successful' });

});

app.post('/login', (req, res) => {

    const {username, password} = req.body;
    //verify user
    res.status(401).render('info', {
        title: 'Login Failed',
        message: 'Check your credentials and try again.' 
    });

    /*
    TODO:
        on successful login render homepage.ejs
        otherwise send file info.html and redirect to /login on 'OK' action click
    */

    const imagePath = path.join(__dirname, 'public', '404.html');
    res.sendFile(imagePath);

    // res.redirect('/login') {on error}
});

app.get('/home', (req,res)=>{
    res.status(200).render('homepage', {
        username: 'user'
    });

});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});