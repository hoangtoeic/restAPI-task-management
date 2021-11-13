
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const router = new express.Router()


function validateEmail2(email) {

    var filters = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!filters.test(email))
        return false
    return true
}


router.post('/users', async (req, res) => {
    //  console.log(req.body.password)

    var regex = new RegExp('^[^\\s]+$')//not include whitespace

    var whitespace = regex.test(req.body.password)
    console.log(whitespace)
    if (isNaN(req.body.age) || req.body.age < 0 || req.body.age > 100) {

        res.status(201).send(JSON.stringify({ 'err': 'Age must be a number between (1-100)' }))
    }
    else if (!whitespace) {
        res.status(201).send(JSON.stringify({ 'err': 'Password is not include whitespace' }))
    }
    else {
        var regex2 = new RegExp('^.{8,12}$')
        var dodai = regex2.test(req.body.password)
        //  console.log(dodai)
        if (dodai) {         // check email
            console.log(req.body.email)
    var email = req.body.email
    var d = validateEmail2(email)
    console.log(d)
    console.log("0")
    const user2 = await User.findOne({ email })
    console.log(user2)
    if (!user2) {
        const user = new User(req.body)
        console.log("1")
        try {
            console.log("2")
            await user.save()
            res.status(201).send(user)
        }
        catch (e) {
            console.log(e)
            res.status(200).send(JSON.stringify({ 'err': 'Gmail wrong' }))
          }}
    else {
        res.status(201).send( JSON.stringify(
            {
                'err': 'Email exist',
            }
        ))

    }
        }
        else {
            { res.status(201).send(JSON.stringify({ 'err': 'Password length should be between 8-12 character' })) }
        }
    }

    







})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)

    } catch (error) {
        res.status(500).send(e)

    }

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    console.log(isValidOperation)
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()


        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {

    try {
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.status(200).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router