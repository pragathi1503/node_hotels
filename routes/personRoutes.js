import express from 'express'
const router= express.Router()
import Person from './../models/person.js'

router.post('/', async (req, res) => {
  try{
    const data= req.body;
    const newPerson= new Person(data);

    const response= await newPerson.save();
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
    const data= await Person.find();
    console.log("Data fetched successfully");
    res.status(200).json(data);
  }
  catch{
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/:workType', async (req, res) => {
  try{
    const workType= req.params.workType;
    if(workType== "chef" || workType== "manager" || workType== "waiter"){
        const response= await Person.find({work: workType});
        console.log("Response fetched");
        res.status(200).json(response);
    } else{
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.put('/:id', async (req, res) => {
    try{
        const personId= req.params.id;
        const updatedPersonData= req.body;
        const response= await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log("Data updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId= req.params.id;
        const response= await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log("Data deleted");
        res.status(200).json({message: 'Person data deleted'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

export default router;