const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    className: { type: String },
    image: { type: String },
    instructorName: { type: String },
    instructorEmail: { type: String },
    instructorPhoto: { type: String },
    availableSeat: { type: Number },
    price: { type: Number },
    enrollStudent: { type: Number },
    status: { type: String },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    feedbacks: { type: String }
    
});


const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;