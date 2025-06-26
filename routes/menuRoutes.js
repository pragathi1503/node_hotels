import express from 'express'
const router= express.Router()
import menuItem from './../models/menuItem.js'

router.post('/', async (req, res) => {
  try{
    const data= req.body;
    const newItem= new menuItem(data);

    const response= await newItem.save();
    console.log("Data saved successfully");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/', async (req, res) => {
  try{
    const data= await menuItem.find();
    console.log("Data fetched successfully");
    res.status(200).json(data);
  }
  catch{
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/:tasteType', async (req, res) => {
    try{
        const tasteType= req.params.tasteType;
        if(tasteType== "spicy" || tasteType== "sweet" || tasteType== "sour"){
            const response= await menuItem.find({taste: tasteType});
            console.log("Response fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

export default router;