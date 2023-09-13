

const enrolledCourse = require('../models/enrolledCourseModel');
const course = require('../models/courseModel');
const selectedCourse = require('../models/selectedCourseModel');
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);


const paymentIntent = async (req, res) => {
    const { price } = req.body;
    const amount = price * 100;
    //console.log(price, amount);

    // Create a PaymentIntent with the order amount and currency
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }

}

const paymentForCourse = async (req, res) => {
    const enrolledCourseInfo = req.body;
    //console.log(enrolledCourseInfo);

    const selectedClassId = enrolledCourseInfo.selectedClassId;
    const classId = enrolledCourseInfo.classId;


    // delete selected course
    const query1 = { _id: selectedClassId };
    const deleteClass = await selectedCourse.deleteOne(query1);


    //console.log('find')
    // find course
    const query2 = { _id: classId };
    const findClass = await course.findOne(query2);
    //console.log(findClass)

    // update enroll, available seats of a class
    try {
        if (findClass) {
            const enrollStudent = parseInt(findClass.enrollStudent);
            const newEnrollStudent = enrollStudent + 1;

            const availableSeats = parseInt(findClass.availableSeat);
            const newAvailableSeats = availableSeats - 1;

            const updateDoc = {
                    enrollStudent: newEnrollStudent,
                    availableSeat: newAvailableSeats
                }
            
            const result = await course.findByIdAndUpdate(query2, updateDoc);
        }

        const result = await enrolledCourse.create(enrolledCourseInfo);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Payment successfully',
        })
    }
    catch (error) {
        //res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Payment failed',
        })
    }

}

const getEnrollCourse = async (req, res) => {
    
    const email = req.query.email;
    //console.log(email)
    const filter = { studentEmail: email };
    try {
        const result = await enrolledCourse.find(filter);
        //console.log(result)
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = { paymentIntent, paymentForCourse, getEnrollCourse };

