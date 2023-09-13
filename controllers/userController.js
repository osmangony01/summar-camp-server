const User = require("../models/userModel");
// const { ObjectId } = require('mongodb');

const addUser = async (req, res) => {
    const userInfo = req.body;
    //console.log(userInfo);
    try {
       
        const result = await User.create(userInfo);
        res.status(201).json({
            ok: true,
            message: 'User created',
          })
    }
    catch (error) {
        // res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Failed to create User'
          })
    }

}

const getAllUser = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }

}

const findUser = async (req, res) => {
    const email = req.query.email;
    //console.log('email: ', email);
    if (email) {
        const query = { email: email };
        try {
            const result = await User.findOne(query);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
    else {
        res.send([]);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await User.deleteOne(query);
        res.status(200).send(result);
               
    }
    catch (error) {
        res.status(500).send(error.message);
    }
                
}

const updateUserRole = async (req, res) => {
    const id = req.body.id;
    const roleName = req.body.name;
    const filter = { _id: id };
    const updateDoc = { role: roleName }
    //console.log(filter, updateDoc)
    try {
        const result = await User.findByIdAndUpdate(filter, updateDoc);
        //res.status(200).send(result);
        res.status(201).json({
            ok: true,
            message: 'Role updated',
          })
    }
    catch (error) {
        //res.status(500).send(error.message);
        res.status(500).json({
            ok: false,
            message: 'Failed to update role'
          })
    }
}

module.exports = { addUser, getAllUser, findUser, deleteUser, updateUserRole };