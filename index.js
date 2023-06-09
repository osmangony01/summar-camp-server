
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Summar Camp is running...")
})

const verifyJWT = (req, res, next) => {
    console.log('hiting verify jwt')
    console.log(req.headers.authorization);
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    const token = authorization.split(' ')[1];
    console.log('token', token);
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(403).send({ error: true, message: 'unauthorized access' });
        }
        req.decoded = decoded;
        next();
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l6kpz6n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        const userCollection = client.db('summarCamp').collection('users');
        const classCollection = client.db('summarCamp').collection('class');


        // add user in database
        app.post("/users", async (req, res) => {
            const user = req.body;
            //console.log(user);
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            //console.log(existingUser);
            if (existingUser) {
                return res.send({ message: 'user already exists' });
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // get all users
        app.get("/users", verifyJWT, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        // get specific user
        app.get("/user", async (req, res) => {
            const email = req.query.email;
            console.log('email: ', email);
            if (email) {
                const query = { email: email };
                const result = await userCollection.findOne(query);
                console.log(result)
                res.send(result);
            }
            else {
                res.send([]);
            }
        })

        // jwt token
        app.post("/jwt", (req, res) => {
            const user = req.body;
            console.log(user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
            res.send({ token });
        })


        // delete user
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            console.log(id);
            res.send(result);
        })

        // update user role as a admin or instructor
        // app.patch("/user-role/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: new ObjectId(id) };
        //     const updateDoc = {
        //         $set: {
        //             role: 'admin'
        //         }
        //     }
        //     const result = await userCollection.updateOne(filter, updateDoc);
        //     res.send(result)
        // })
        app.patch("/user-role/", async (req, res) => {
            const id = req.body.id;
            const roleName = req.body.name;
            console.log(id, roleName);
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: roleName
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result)
        })


        // insert class 
        app.post("/addclass", async (req, res) => {
            const saveClass = req.body;
            //console.log(saveClass);
            const result = await classCollection.insertOne(saveClass);
            res.send(result);
        })

        // find instructor classes
        app.get("/instructor/classes", async(req, res)=>{
            const email = req.query.email;
            console.log(email);
            if (!email) {
                res.send([]);
            }
            else {
                const query = { instructorEmail: email };
                const result = await classCollection.find(query).toArray();
                res.send(result);
            }
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);





app.listen(PORT, () => {
    console.log(`Summar camp is running on PORT : ${PORT}`)
})