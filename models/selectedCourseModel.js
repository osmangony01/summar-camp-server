const mongoose = require('mongoose');

const selectedCourseSchema = mongoose.Schema({

    classId: { type: String },
    className: { type: String },
    image: { type: String },
    studentName: { type: String },
    studentEmail: { type: String },
    instructorEmail: { type: String },
    instructorName: { type: String },
    availableSeat: { type: Number },
    price: { type: Number },
    description: { type: String },

});


const selectedCourseModel = mongoose.model("selectedCourse", selectedCourseSchema);

module.exports = selectedCourseModel;