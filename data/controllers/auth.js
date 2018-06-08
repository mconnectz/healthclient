const Admin = require('../schema/hospital');
const Pharm = require('../schema/subpharm');
const Lab = require('../schema/sublab');
const Doctor = require('../schema/subdoctor');
const jwt = require('jsonwebtoken');
const secret = 'ZRule-the-World'

module.exports = {

    register:(req, res)=> {
        var role = req.body.role;

        if(role == 'Pharm'){
            const obj = new Pharm(req.body);
            obj.save((err, item) => {
              if (err) {return console.error(err);}
              res.json(item);
            });
          }
        
          else if(role == 'Lab'){
            const obj = new Lab(req.body);
            obj.save((err, item) => {
              if (err) {return console.error(err);}
              res.json(item);
            });
          }
          else if(role == 'Doctor'){
            const obj = new Doctor(req.body);
            obj.save((err, item) => {
              if (err) {return console.error(err);}
              res.json(item);
            });
          }
          else{
            const obj = new Admin(req.body);
            obj.save((err, item) => {
              if (err) {return console.error(err);}
              res.json(item);
            });
          }

      },
      login:(req, res)=> {
        
        var role = req.body.role;

        if(role == 'Pharm'){
          Pharm.findOne({ username: req.body.username }, (err, user) => {
            if (!user) { return res.sendStatus(403); }
            user.comparePassword(req.body.password, (error, isMatch) => {
              if (!isMatch) { return res.sendStatus(403); }
              const token = jwt.sign({ user: user }, secret); // , { expiresIn: 10 } seconds
              res.status(200).json({ token: token });
            });
          });
        }
      
        else if(role == 'Doctor'){
          Doctor.findOne({ username: req.body.username }, (err, user) => {
            if (!user) { return res.sendStatus(403); }
            user.comparePassword(req.body.password, (error, isMatch) => {
              if (!isMatch) { return res.sendStatus(403); }
              const token = jwt.sign({ user: user }, secret); // , { expiresIn: 10 } seconds
              res.status(200).json({ token: token });
            });
          });
        }
      
        else if(role == 'Lab'){
          Lab.findOne({ username: req.body.username }, (err, user) => {
            if (!user) { return res.sendStatus(403); }
            user.comparePassword(req.body.password, (error, isMatch) => {
              if (!isMatch) { return res.sendStatus(403); }
              const token = jwt.sign({ user: user }, secret); // , { expiresIn: 10 } seconds
              res.status(200).json({ token: token });
            });
          });
        }
     
        else {
          Admin.findOne({ username: req.body.username }, (err, user) => {
            if (!user) { return res.sendStatus(403); }
            user.comparePassword(req.body.password, (error, isMatch) => {
              if (!isMatch) { return res.sendStatus(403); }
              const token = jwt.sign({ user: user }, secret); // , { expiresIn: 10 } seconds
              res.status(200).json({ token: token });
            });
          });
        }
      
      },
      authorize:(req,res,next)=>{
        const token = req.headers['authorization']; // Create token found in headers
        jwt.verify(token,secret, (err, decoded) => {
          if (err) {
            res.json({ success: false, message: 'Token invalid: ' + err }); 
          } else {
            req.decoded = decoded; 
            next(); 
          }
        });
      },
      getProfile:(req,res)=>{
        const data = req.decoded;
        res.json(data.user)    
      }
    

}