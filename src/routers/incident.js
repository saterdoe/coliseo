const express = require('express')
const Incident = require('../models/incident')
const Type = require('../models/type')

const router = new express.Router()

router.post('/incident',  async (req, res) => {
    const incident = new Incident({
        ...req.body,
    })

    try {
        incident.save()
        res.status(201).send(incident)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/incidents',  async (req, res) => {
    
    try {
        await Incident.find({}, (error, result) => {

            if(error){
                return res.status(400).send()
            }
            if(!result){
                return res.status(404).send()
            }
            if(result){
                res.send(result)
            }
        })
        
    } catch (e) {
        res.status(500).send()
    }
    
})

router.get('/incidents/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const incident = await Incident.findById(_id)

        if (!incident) {
            return res.status(404).send()
        }
        res.send(incident)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/incidents/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['incident_description', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const incident = await Incident.findOne({ _id : req.params.id })

        if (!incident) {
            return res.status(404).send()
        }

        updates.forEach((update) => incident[update] = req.body[update])
        await incident.save()
        res.send(incident)
    } catch (e) {
        return res.status(500).send(e)
    }
})

router.delete('/incidents/:id', async (req, res) => {
    try {
        const incident = await Incident.findOneAndDelete({ _id : req.params.id })

        if (!incident) {
            return res.status(404).send()
        }

        res.send(incident)
    } catch (e) {
        return res.status(500).send()
    }
})

router.post('/type', async (req, res) => {
    const type = new Type({
        ...req.body,
    })
    try {
        type.save()
        res.status(201).send(type)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router