const mongoose = require('mongoose')

const incidentSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true,
        trim: true
    },
    operation_id: {
        type: String,
        trim: true
    },
    producer_name: {
        type: String,
        required: true,
        trim: true
    },
    producer_cuit: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: String,
        trim: true
    },
    incident_description: {
        type: String,
        required: true,
        trim: true
    },
    provider_contact: {
        type: String,
        trim: true
    },
    BG_contact: {
        type: String,
        trim: true
    },
    operator_message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: "recibido"
    }
}, {
    timestamps: true
})

const Incident = mongoose.model('Incident', incidentSchema)

module.exports = Incident