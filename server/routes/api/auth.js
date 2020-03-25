const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const mongoose = require('mongoose')

const User = require('../../models/User')

const {registerValidation, loginValidation} = require('../../utils/validation')
const { upload } = require('../../utils/FileUpload')

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body)	
	if(error) return res.status(400).send(error.details[0].message)

	const emailExist = await User.findOne({ email: req.body.email })
	if(emailExist) return res.status(400).send('Email already exist')

	const usernameExist = await User.findOne({ name: req.body.name })
	if(usernameExist) return res.status(400).send('Username already exist')

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({	
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	})	

	try {
		const savedUser = user.save()
		res.send({ user: user._id })	
	} catch (err) {
		res.status(400).send(err)
	}
})

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body)	
	if(error) return res.status(400).send(error.details[0].message)

	const user = await User.findOne({email: req.body.email})
	if(!user) return res.status(400).send('Email is not found') 

	const validPass = await bcrypt.compare(req.body.password, user.password)
	if(!validPass) return res.status(400).send('Invalid password')

	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
	res.header('access_token', token).send(token)
})

router.get('/info', (req, res) => {
	const token = req.header('access_token')
	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if(err) return res.status(401).send('Accses Denied')

		User.findOne({ _id: decoded._id }, (err, user) => {
			if (err) return console.log(err)

			return res.status(200).json({
				user: {
					email: user.email,
					name: user.name,
					fullname: user.fullname,
					image: user.image,
					_id: user._id
				}
			})
		})
	})
})

router.put('/info', upload.single('image'), (req, res) => {
	const token = req.header('access_token')
	jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
		if(err) return res.status(401).send('Accses Denied')
		
		const usernameExist = await User.findOne({ name: req.body.name })
		if(usernameExist) return res.status(400).send('Username already exist')
		
		if(req.file) req.file.path = fs.readFileSync(req.file.path, 'base64')
		else req.file = ''

		let user 
		try {
			user = await User.findOne({_id: decoded._id})
			user.name = req.body.name
			user.fullname = req.body.fullname
			user.image = req.file.path
			
			await user.save()
			res.sendStatus(200)
		}catch (err) {
			res.sendStatus(500)
		}
	})
})


router.get('/users', (req, res) => {
	User.find()
		.then(item => {
			res.json(item)
		}).catch(err => {
			console.log(err)
			res.sendStatus(500)
		})
})

router.get('/user/:id', (req, res) => {
	User.findById({ _id: req.params.id })
	.then(item => {
		res.json(item)
	}).catch(err => {
		console.log(err)
		res.sendStatus(500)
	})
})

module.exports = router
