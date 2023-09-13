const route = require('express').Router();
const { createToken, verifyToken } = require('../Middleware/jwtAuthentication');
const { addUser, getAllUser,findUser, deleteUser, updateUserRole } = require('../controllers/userController');
const { createCourse, getAllCourse, approveCourse, instructorCourses, getApprovedCourses, giveFeedback } = require('../controllers/courseController');
const { selectCourse, getSelectedCourses,findSelectedCourse, deleteSelectedCourse } = require('../controllers/selectedCourseController')
const { paymentIntent, paymentForCourse, getEnrollCourse } = require('../controllers/enrolledCourseController');


// create jwt when a user make login or register
route.post("/jwt", createToken);


// user routes
route.post('/add-user', addUser); // add user in db

route.get("/all-users", verifyToken, getAllUser); // get all user from db

route.get("/find-user", findUser); //  find a  user from db

route.delete("/delete-user/:id", deleteUser); // delete user from db

route.patch("/user-role", updateUserRole); // admin update user role



// course routes

route.post('/add-course', createCourse);

route.get('/courses', getAllCourse);

route.patch('/course-approve', approveCourse);

route.get('/approve-courses', getApprovedCourses);

route.get('/instructor-courses', instructorCourses);

route.patch("/feedback", giveFeedback);



// select course routes

route.post('/select-course', selectCourse);

route.get('/all-selected-course', getSelectedCourses);

route.get('/selected-course', findSelectedCourse);

route.delete('/delete-selected-course/:id', deleteSelectedCourse);



// enroll and payment routes

route.post("/create-payment-intent", paymentIntent);

route.post("/payment", paymentForCourse);

route.get('/enrolled-courses', getEnrollCourse);




module.exports = route;