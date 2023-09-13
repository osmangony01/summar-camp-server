const jwt = require('jsonwebtoken');


const createToken = (req, res) => {
    const user = req.body;
    //console.log(user);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    res.send({ token });
}

const verifyToken = (req, res, next) => {
    //console.log('hiting verify jwt')
    //console.log(req.headers.authorization);
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    const token = authorization.split(' ')[1];
    //console.log('token', token);
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(403).send({ error: true, message: 'unauthorized access' });
        }
        req.decoded = decoded;
        next();
    })
}

module.exports = { createToken, verifyToken };