const User = require('../schema/hospital');
const Pharm = require('../schema/subpharm');
const Lab = require('../schema/sublab');
const Doctor = require('../schema/subdoctor');

module.exports = {
  
  getAll:(req, res)=> {
      User.find({}, (err, docs) => {
        if (err) { return console.error(err); }
        res.status(200).json(docs);
      });
  },
  count:(req, res)=> {
      User.count((err, count) => {
        if (err) { return console.error(err); }
        res.status(200).json(count);
      });
  },
  insert: async (req, res,next) => {

    const {id} = req.params;
    const obj = new User(req.body);
    const admin = await Admin.findById(id);
    await obj.save();
    admin.hospital(obj);
    await admin.save();
    res.send(obj);

  },
  get:(req, res) => {
      const {id} = req.params;
      User.findById(id, (err, item) => {
        if (err) { return console.error(err); }
        res.status(200).json(item);
      });
  },
  update:(req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
  },
  remove:(req, res) => {
      const {id} = req.params;
      User.findOneAndRemove(id, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
  },
  search:(req,res)=>{
      
      var query = new RegExp('^'+req.body.search,'i');

      User.find({
          "$or":[
                  {name:{$regex:query}},
                  {phone:{$regex:query}}
              ]},(err, data) => {
                  res.json(data);
      });    
   
  },

  getallLab:async(req,res,next)=>{
    const {id} = req.params;
    const admin = await User.findById(id)
    res.status(200).json(admin.lab);
  },
  getLabCount:(req,res)=>{
    Lab.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  },
  getallPharm:async(req,res,next)=>{
    const {id} = req.params;
    const admin = await User.findById(id)
    res.status(200).json(admin.pharm);
  },
  getallDoctor:async(req,res,next)=>{
    const {id} = req.params;
    const admin = await User.findById(id)
    res.status(200).json(admin.doctor);
  },
  createLab:async(req,res,next)=>{
    const {id} = req.params;
    const newLab = new Lab(req.body);
    const admin = await User.findById(id);
    await newLab.save();
    admin.lab.push(newLab);
    await admin.save()
    res.send(newLab);
  },
  createPharm:async(req,res,next)=>{
    const {id} = req.params;
    const newPharm = new Pharm(req.body);
    const admin = await User.findById(id);
    await newPharm.save();
    admin.pharm.push(newPharm);
    await admin.save()
    res.send(newPharm);
  },
  createDoctor:async(req,res,next)=>{
    const {id} = req.params;
    const newDoctor = new Doctor(req.body);
    const admin = await User.findById(id);
    await newDoctor.save();
    admin.doctor.push(newDoctor);
    await admin.save()
    res.send(newDoctor);
  }
  
}