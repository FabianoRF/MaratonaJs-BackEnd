const express = require('express')
const bcrypt=require('bcrypt')
const { Account } =require('../models')

const router = express.Router()

const saltRounds=10; 


//rota para autenticacao
router.get('/sign-in', (req, res)=>{
    return res.json('Sign-in')
})



//rota para cadastro
router.get('/sign-up', async (req, res)=>{

    const { email, password } = req.body

    const account = await Account.findOne({where: {email}})
    if(account) return res.json('Account already exists')//caso já exista


    const hash=bcrypt.hashSync(password, saltRounds)
    const resul= await Account.create({email, password: hash})
    


    return res.json({ email, password })
})

module.exports=router