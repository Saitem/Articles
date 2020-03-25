const express = require('express')
const router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { upload } = require('../../utils/FileUpload')

const Model = require('../../models/Model')
const User = require('../../models/User')

router.post('/', upload.single('image'), (req, res) => {
    const token = req.header('access_token')
	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        User.findById({ _id: decoded._id })
        .then(result => {
        
            if(req.file)
                req.file.path = fs.readFileSync(req.file.path, 'base64')
            else 
                req.file = ''
                
            const model = new Model({
                title: req.body.title,
                description: req.body.description,
                image: req.file.path,
                creator_id: result._id,
                creator_name: result.name
            })

            model.save()
                .then(item => {
                    res.send(item)
                }).catch(err => {
                    res.send(err)
                })
        })
    })
})

router.get('/', (req, res) => {
    Model.find()
    .then(item => {
        item = item.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return res.status(200).send(item)
    }).catch(err => {
        return res.status(500).send(err)
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