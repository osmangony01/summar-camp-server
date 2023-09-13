
// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()
// const jwt = require('jsonwebtoken');


// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

// app.get("/", (req, res) => {
//     res.send("Summar Camp is running...")
// })

// const verifyJWT = (req, res, next) => {
//     //console.log('hiting verify jwt')
//     //console.log(req.headers.authorization);
//     const authorization = req.headers.authorization;
//     if (!authorization) {
//         return res.status(401).send({ error: true, message: 'unauthorized access' })
//     }
//     const token = authorization.split(' ')[1];
//     //console.log('token', token);
//     jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
//         if (error) {
//             return res.status(403).send({ error: true, message: 'unauthorized access' });
//         }
//         req.decoded = decoded;
//         next();
//     })
// }

// const isAdmin = ()=>{

// }

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l6kpz6n.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         client.connect();
//         // Send a ping to confirm a successful connection

//         const userCollection = client.db('summarCamp').collection('users');
//         const classCollection = client.db('summarCamp').collection('class');
//         const selectedClassCollection = client.db('summarCamp').collection('selectedClass');
//         const enrolledClassCollection = client.db('summarCamp').collection('enrolledClass');


//         // add user in database
//         app.post("/users", async (req, res) => {
//             const user = req.body;
//             //console.log(user);
//             const query = { email: user.email };
//             const existingUser = await userCollection.findOne(query);
//             //console.log(existingUser);
//             if (existingUser) {
//                 return res.send({ message: 'user already exists' });
//             }
//             const result = await userCollection.insertOne(user);
//             res.send(result);
//         })

//         // get all users
//         app.get("/users", verifyJWT, async (req, res) => {
//             const result = await userCollection.find().toArray();
//             res.send(result);
//         })

//         // get specific user
//         app.get("/user", async (req, res) => {
//             const email = req.query.email;
//             //console.log('email: ', email);
//             if (email) {
//                 const query = { email: email };
//                 const result = await userCollection.findOne(query);
//                 //console.log(result)
//                 res.send(result);
//             }
//             else {
//                 res.send([]);
//             }
//         })

//         // jwt token
//         app.post("/jwt", (req, res) => {
//             const user = req.body;
//             //console.log(user);
//             const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
//             res.send({ token });
//         })


//         // delete user
//         app.delete("/users/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await userCollection.deleteOne(query);
//             //console.log(id);
//             res.send(result);
//         })

       
//         // update role by admin
//         app.patch("/user-role/", async (req, res) => {
//             const id = req.body.id;
//             const roleName = req.body.name;
//             //console.log(id, roleName);
//             const filter = { _id: new ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     role: roleName
//                 }
//             }
//             const result = await userCollection.updateOne(filter, updateDoc);
//             res.send(result)
//         })


//         // insert class 
//         app.post("/addclass", async (req, res) => {
//             const saveClass = req.body;
//             //console.log(saveClass);
//             const result = await classCollection.insertOne(saveClass);
//             res.send(result);
//         })

//         // find instructor classes
//         app.get("/instructor/classes", async (req, res) => {
//             const email = req.query.email;
//             //console.log(email);
//             if (!email) {
//                 res.send([]);
//             }
//             else {
//                 const query = { instructorEmail: email };
//                 const result = await classCollection.find(query).toArray();
//                 res.send(result);
//             }
//         })

//         // show all classes
//         app.get("/all-classes", async (req, res) => {
//             const result = await classCollection.find().toArray();
//             res.send(result);
//         })

//         // update class approved
//         app.patch("/update-status", async (req, res) => {
//             const id = req.body.id;
//             const updatedStatus = req.body.status;
//             //console.log(id, updatedStatus);
//             const filter = { _id: new ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     status: updatedStatus
//                 }
//             }
//             const result = await classCollection.updateOne(filter, updateDoc);
//             res.send(result)
//         })

//         // get approved classes
//         app.get("/approved-classes", async (req, res) => {
//             const query = { status: "approved" };
//             const result = await classCollection.find(query).toArray();
//             res.send(result);
//         })

//         // save selected class for student
//         app.post("/save-selected-class", async (req, res) => {
//             const selectedClass = req.body;
//             //console.log(selectedClass);
//             const result = await selectedClassCollection.insertOne(selectedClass);
//             res.send(result);
//         })

//         // get user booked classes
//         app.get("/booked-classes", async (req, res) => {
//             const email = req.query.email;
//             // //console.log(user);
//             const query = { studentEmail: email };
//             const result = await selectedClassCollection.find(query).toArray();
//             res.send(result);
//         })

//         app.get("/booked-class/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await selectedClassCollection.findOne(query);
//             //console.log(id);
//             res.send(result);
//         })


//         // create payment intent
//         app.post("/create-payment-intent", async (req, res) => {
//             const { price } = req.body;
//             const amount = price * 100;
//             //console.log(price, amount);

//             // Create a PaymentIntent with the order amount and currency
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: amount,
//                 currency: "usd",
//                 automatic_payment_methods: {
//                     enabled: true,
//                 },
//             });

//             res.send({
//                 clientSecret: paymentIntent.client_secret,
//             });
//         });

//         // payment
//         app.post("/payment", async (req, res) => {
//             const enrolledClass = req.body;
//             //console.log(enrolledClass);

//             const selectedClassId = enrolledClass.selectedClassId;
//             const classId = enrolledClass.classId;

//             // delete selected class
//             const query1 = { _id: new ObjectId(selectedClassId) };
//             const deleteClass = await selectedClassCollection.deleteOne(query1);

//             // find class
//             const query2 = { _id: new ObjectId(classId) };
//             const findClass = await classCollection.findOne(query2);

//             // update enroll, available seats of a class 
//             if (findClass) {
//                 const enrollStudent = parseInt(findClass.enrollStudent);
//                 const newEnrollStudent = enrollStudent + 1;

//                 const availableSeats = parseInt(findClass.availableSeat);
//                 const newAvailableSeats = availableSeats - 1;

//                 const updateDoc = {
//                     $set: {
//                         enrollStudent: newEnrollStudent,
//                         availableSeat: newAvailableSeats
//                     }
//                 }
//                 const result = await classCollection.updateOne(query2, updateDoc);
//             }

//             const result = await enrolledClassCollection.insertOne(enrolledClass);
//             res.send(result);
//         })


//         // get enrolled classes
//         app.get("/enrolled-classes", async (req, res) => {
//             const email = req.query.email;
//             const filter = { studentEmail: email };
//             const result = await enrolledClassCollection.find(filter).toArray();
//             res.send(result);
//         })

//         // delete selected class
//         app.delete("/delete-selected-class/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await selectedClassCollection.deleteOne(query);
//             //console.log(id);
//             res.send(result);
//         })


//         // give feedback 
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


//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         //await client.close();
//     }
// }
// run().catch(console.dir);


const app = require("./app");
const config = require('./config/config');

const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

