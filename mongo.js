const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// const password = encodeURIComponent(process.argv[2])
const password = process.argv[2]

const url = `mongodb+srv://sleuthInk531090:${password}@cluster0.ysghu4p.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family:4 })

const noteSchema = new mongoose.Schema({
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    important: Boolean
})

const Note= mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Date test',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})


