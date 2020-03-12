const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname)
    }
  })
  
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})

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

module.exports = router