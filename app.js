const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login.ejs');
});

app.post('/', (req, res) => {
    let user = req.body.usuario;
    res.render('index.ejs', {user: user});
})

io.on('connection', socket =>{
    console.log(`socket conectado =${socket.id}`);

    socket.on('sendMessage', data => {
        console.log(data);
    })
});


server.listen(3000,()=>{
    console.log('servidor iniciado');
})
