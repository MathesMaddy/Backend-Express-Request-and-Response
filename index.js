const express = require('express');
const app = express();
const path = require('path')

app.get('/index.html', (req,res) => {
    res.sendFile(path.join(__dirname,'pages','index.html'));
})

app.get('/concat', (req,res)=> {
    try {
        const { fname, lname, dob } = req.query
        if(fname && lname && dob) {
            if( fname !== 'null' && lname !== 'null' && dob !== 'null') {   

                return res.status(200).json({
                    "fname" : `${fname}`,
                    "lname" : `${lname}`,
                    "dob" : `${dob}`
                });
            }
            else {
                return res.status(400).json({"error" : "Invalid input"});
            }
        }
        else {
            return res.status(400).json("error Invalid input.");
        }
    }
    catch(e) {
        return res.status(500).json("Input is not given.");
    }
});

app.get('/math', (req,res) => {
    try {
        const { firstVal, secondVal, subType } = req.query
        let val1 = Number(firstVal)
        let val2 = Number(secondVal)
        if(subType === "add" && val1 > 0 && val2 > 0) {
            return res.status(200).json({ "ADD" : `${val1 + val2}` });
        }
        else if(subType === "sub" && val1 > 0 && val2 > 0) {
            return res.status(200).json({ "SUB" : `${val1 - val2}` }) 
        }
        else if(subType === "mul" && val1 > 0 && val2 > 0) {
            return res.status(200).json({ "MUL" : `${val1 * val2}` }) 
        }
        else if(subType === "div" && val1 > 0 && val2 > 0) {
            return res.status(200).json({ "DIV" : `${val1 / val2}` }) 
        }
        else {
            return res.status(400).send('Error Invalid Input');
        }
    }
    catch(e) {
        return res.status(400).json(`Invalid Input.`);
    }
})


app.get('/login', (req,res) => {
    try {
        const userDetail = {
            username : "RENAMBL",
            password : "R1E2N3"
        }
        const { username, password } = req.query
        if(userDetail.username === username && userDetail.password === password) {
            return res.status(200).send('Login Success')
        }
        else {
            return res.status(401).send('Username or Password is invalid.');
        }
    }
    catch(e) {
        return res.status(500).send('Invalid Input.')
    }
})

app.get('/*', (req,res) => {
    res.status(404).json('Page Not Found.');
})

app.listen(4000, console.log(`Server is running ${4000}`));