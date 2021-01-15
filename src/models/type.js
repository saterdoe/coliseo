const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'Recibido'
    }

})

const Type = mongoose.model('Type', typeSchema)

module.exports = Type