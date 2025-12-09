require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Note = require('./models/note')


const app = express()
let notes = []

const requestLogger = (req, res, next)=>{
    console.log('Method: ', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---', )
    next()
}
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))
app.use(morgan('tiny'))


app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to your notes</h1>
        <p1>/api/notes on the same port to see all your notes</p1>
        `)
})

app.get('/api/notes', (req, res)=>{
    Note.find({}).then(notes=>{
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res)=>{
    Note.findById(req.params.id).then(note => {
        res.json(note)
    })
})


app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content){
        return res.status(400).json({error: 'content is missing'})
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    note.save().then(savedNote => {
        res.json(savedNote)
    })
})

app.delete('/api/notes/:id', (req, res)=>{
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

const unknownEndpoint = (req, res) => {
    res.status(400).send({error: 'unknown endpoint'})
}

const PORT = process.env.PORT 
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
})
