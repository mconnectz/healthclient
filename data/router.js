const express = require('express');
const app = express.Router();
const auth = require('./controllers/auth');
const hospital = require('./controllers/hospital');
const doctor = require('./controllers/doctor');
const pharm = require('./controllers/pharm');
const lab = require('./controllers/lab');


app.post('/register',auth.register);
app.post('/login',auth.login);

app.get('/getProfile',auth.authorize,auth.getProfile);
                              
app.route('/hospital').post(hospital.insert)
                      .get(hospital.getAll);

app.route('/hospital/:id').put(hospital.update)
                          .delete(hospital.remove)
                          .get(hospital.get);

app.route('/hospital/count').get(hospital.count)

app.route('/hospital/search').post(hospital.search);

app.route('/hospital/:id/lab').get(hospital.getallLab)
                              .post(hospital.createLab);

app.route('/hospital/:id/lab/count').get(hospital.getLabCount)

app.route('/hospital/:id/pharm').get(hospital.getallPharm)
                                .post(hospital.createPharm);

app.route('/hospital/:id/doctor').get(hospital.getallDoctor)
                                 .post(hospital.createDoctor);
                                 
app.route('/doctor').post(doctor.insert)
                    .get(doctor.getAll)
                    .get(doctor.count);

app.route('/doctor/:id').put(doctor.update)
                          .delete(doctor.remove)
                          .get(doctor.get);

app.route('/doctor/search').post(doctor.search);

app.route('/pharm').post(pharm.insert)
                     .get(pharm.getAll)
                     .get(pharm.count);

app.route('/pharm/:id').put(pharm.update)
                         .delete(pharm.remove)
                         .get(pharm.get);

app.route('/pharm/search').post(pharm.search);

app.route('/lab').post(lab.insert)
                     .get(lab.getAll)
                     .get(lab.count);

app.route('/lab/:id').put(lab.update)
                         .delete(lab.remove)
                         .get(lab.get);

app.route('/lab/search').post(lab.search);


module.exports = app ;