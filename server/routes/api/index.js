const express = require('express')
const router = express.Router()
const fs = require('fs')
const { upload } = require('../../utils/FileUpload')

const Model = require('../../models/Model')

router.post('/', upload.single('image'), (req, res) => {
    res.send(req.body)
    if(req.file){
        req.file.path = fs.readFileSync(req.file.path, 'base64')
    }else {
        req.file = ''
    }
    
    const model = Model({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        createdAt: req.body.createdAt
    })
        
    model.save()
        .then(item => {
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(400)
        })
})

router.get('/', (req, res) => {
    Model.find()
        .then(item => {
            res.send(item)
        }).catch(err => {
            res.status(500).json({ err })
        })
})

router.get('/:id', (req, res) => {
    Model.findById({_id: req.params.id})
    .then(item => {
        res.json(item)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})


router.delete('/:id', async (req, res) => {
    await Model.deleteOne({_id: req.params.id}, (err, doc) => {
        if(err) return err
        res.send(doc)
    })
    
})

router.put('/:id', async (req, res) => {
    let model 
    try {
        model = await Model.findById(req.params.id)
        model.title = req.body.name
        await model.save()
        res.sendStatus(200)
    }catch (err) {
        res.sendStatus(500)
    }

})

module.exports = router