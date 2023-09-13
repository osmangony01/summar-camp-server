const mongoose = require('mongoose');

const enrolledCourseSchema = mongoose.Schema({
    // I do not have necessary to write schema because I  insert data manually in mongodb
    selectedClassId: { type: String },
    classId: { type: String },
    className: { type: String },
    image: { type: String },
    studentName: { type: String },
    studentEmail: { type: String },
    instructorEmail: { type: String },
    instructorName: { type: String },
    price: { type: Number },
    date: { type: String },
    transactionId: { type: String },
    paymentStatus: { type: String },

});


const enrolledCourseModel = mongoose.model("enrolledCourse", enrolledCourseSchema);

module.exports = enrolledCourseModel;