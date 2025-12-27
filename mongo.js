const mongoose = require('mongoose')

const url =  'mongodb+srv://sleuthInk531090:milkofmorrow@cluster0.ysghu4p.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)

mongoose.connect(url, { family:4 })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  important: Boolean
})

const Note= mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})