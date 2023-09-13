

const selectedCourse = require('../models/selectedCourseModel');


const selectCourse = async (req, res) => {
    const selectedCourseInfo = req.body;
    //console.log(selectedCourseInfo);
    try {
        const result = await selectedCourse.create(selectedCourseInfo);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Course selected',
          })
    }
    catch (error) {
        // res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Failed to select course',
          })
    }        
}

const getSelectedCourses = async (req, res) => {
    const email = req.query.email;
    const query = { studentEmail: email };
    try {
        const result = await selectedCourse.find(query);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }                
}


const findSelectedCourse = async (req, res) => {
   
    const id = req.params.id;
    const query = { _id: id };

    try {
       const result = await selectedCourse.findOne(query);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
                   
}

const deleteSelectedCourse =  async (req, res) => {
    const id = req.params.id;
    const query = { _id: id };
    //console.log(query)
    try {
        const result = await selectedCourse.deleteOne(query);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Deleted successfully',
          })
    }
    catch (error) {
        //res.status(500).send(error.message);
        res.status(201).json({
            ok: false,
            message: 'Failed to deleted',
          })
    }
                   
}



module.exports = { selectCourse, getSelectedCourses,findSelectedCourse, deleteSelectedCourse };