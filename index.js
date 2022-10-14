//import express from 'express';
const express = require('express');
const app = express();

const books = [
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
    res.json(books.filter(book => book.favorito));
});

// const hostname = '192.168.2.26';
// app.listen(3000, hostname);
app.listen(3000);