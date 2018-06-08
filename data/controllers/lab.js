const User = require('../schema/subpharm');


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
    const obj = new User(req.body);
    obj.save((err, item) => {
      if (err && err.code === 11000) {res.sendStatus(400)}
      if (err) {return console.error(err);}
      res.status(200).json(item);
    });
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

}