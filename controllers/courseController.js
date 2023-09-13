
const Course = require('../models/courseModel');


const createCourse = async (req, res) => {
    const saveCourse = req.body;
    try {
        const result = await Course.create(saveCourse);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Course created',
          })
    }
    catch (error) {
        //res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Failed to create course'
          })
    }
                   
}


const getAllCourse = async (req, res) => {
    try {
        const result = await Course.find();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
                   
}


const approveCourse = async (req, res) => {
    const id = req.body.id;
    const updatedStatus = req.body.status;
    //console.log(id, updatedStatus);
    const filter = { _id: id};
    const updateDoc = { status: updatedStatus }
           
    try {
        const result = await Course.findByIdAndUpdate(filter, updateDoc);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Course Approved',
          })
    }
    catch (error) {
        //res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Failed to approve course'
          })
    }
                   
}

const instructorCourses = async (req, res) => {
    const email = req.query.email;
    //console.log(email);
    if (!email) {
        res.send([]);
    }
    else {     
        try {
            const query = { instructorEmail: email };
            const result = await Course.find(query);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }                  
}

const getApprovedCourses = async (req, res) => {
    const query = { status: "approved" };
             
    try {
        const result = await Course.find(query);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
                   
}

const giveFeedback = async(req, res) => {
    const id = req.body.id;
    const feedback = req.body.fk;
    //console.log(id, feedback);
    const query = { _id: id };
    const updateDoc = { feedbacks: feedback };

    try {
        const result = await Course.findByIdAndUpdate(query, updateDoc);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Feedback updated',
          })
    }
    catch (error) {
        // res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Failed to feedback',
          })
    }
}

// give feedback 
//         app.patch('/give-feedback', async(req, res)=>{
//             const id = req.body.id;
//             const feedback = req.body.fk;
//             //console.log(id, feedback);
//             const query = { _id: new ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     feedbacks: feedback,
//                 }
//             }
//             const result = await classCollection.updateOne(query, updateDoc);
//             res.send(result)

//         })

module.exports = { createCourse, getAllCourse, approveCourse, instructorCourses, getApprovedCourses, giveFeedback  };


// async (req, res) => {
    
//     try {
//         res.status(200).send(result);
//     }
//     catch (error) {
//         res.status(500).send(error.message);
//     }
                   
// }