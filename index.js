const express = require('express');
const app = express();

let books = [
    {_id: 1, title: 'Harry Potter 1', autor: 'J.K. Rowling', favorito: true},
    {_id: 2, title: 'Harry Potter 2', autor: 'J.K. Rowling', favorito: false},
    {_id: 3, title: 'Harry Potter 3', autor: 'J.K. Rowling', favorito: true}
];

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        nome: 'Plínio'
    })
});

app.get('/html', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    const id = +(req.params.id);
    const book = books.find(book => book._id === id);
    if (book) {
        res.send(book);
    } else {
        res.sendStatus(404);
    };
});

app.post('/books', (req, res) => {
    const body = req.body;
    if (Array.isArray(body)) {
        body.map(obj => books.push(obj));
    } else {
        books.push(req.body);
    }
    res.send(books);
})

app.delete('/books/:id', (req, res) => {
    const id = +(req.params.id);
    const index = books.findIndex(obj => obj._id === id);
    if (index === -1) {
        res.sendStatus(404);
    } else {
        books.splice(index, 1);
        res.status(200).send(books);
    };
});

app.patch('/books/:id', (req, res) => {
    const id = +(req.params.id);
    const body = req.body;
    const book = books.find(obj => obj._id === id);

    book.title = body.title;
    
    res.send(books);

});

// const hostname = '192.168.2.26';
// app.listen(3000, hostname);
app.listen(5000);