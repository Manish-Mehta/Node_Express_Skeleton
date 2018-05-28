const router = require('express').Router()


router.get('/', (req,res)=>{
	res.send({data:"Server Response"})
})

module.exports = router

