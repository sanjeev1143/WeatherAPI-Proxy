const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const url = require('url')
const apicache = require('apicache')

let cache = apicache.middleware 


require('dotenv').config()

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY= process.env.API_KEY
const API_KEY_NAME= process.env.API_KEY_NAME


router.get('/',cache('2 minutes'),async (req,res)=>{
    try {

        const params = new URLSearchParams({
            [API_KEY_NAME]:API_KEY,
            ...url.parse(req.url,true).query
        })
        // console.log(params);
        const respo = await axios.get(`${API_BASE_URL}?${params}`)
        const data = respo.data;
        res.status(200).json({
            success:true,
            data:data
        
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error:error
        })
    }
   
})


module.exports = router;
