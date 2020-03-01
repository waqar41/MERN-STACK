const router = require('express').Router();
let Exercise = require('../models/exercise.model');
//GET
router.route('/').get((req,res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error ' + err));
})
//ADD
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    newExercise.save()
    .then(()=> res.json('exercise added'))
    .catch(err => res.status(400).json('ERROR ' + ERR));
});
// **************Find by ID************
router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('error ' + err));
});
// ************Delete by ID*************
router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('exercise deleted'))
    .catch(err => res.status(400).json('ERROR')+ err);
});

// ************** update by ID************

router.route('/update/:id').post((req,res) =>{
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username =req.body.username;
            exercise.description= req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

           exercise.save()
            .then(()=> res.json('exercise updated'))
            .catch(err => res.status(400).json('err' + err));
         })
    .catch(err => res.status(400).json('ERROR' + err) );
})


module.exports = router;