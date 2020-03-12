const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const {registerValidation, loginValidation} = require('../../validation')

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body)	
	if(error) return res.status(400).send(error.details[0].message)

	const emailExist = await User.findOne({ email: req.body.email })
	if(emailExist) return res.status(400).send('Email already exist')

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
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
					name: user.name
				}
			})
		})
	})
	console.log(req.headers)
})

module.exports = router