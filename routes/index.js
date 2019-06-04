let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

const server = '127.0.0.1:27017'
const database = 'smsdb'


mongoose.connect(process.env.MONGODB_URI || `mongodb://${server}/${database}`, {useNewUrlParser: true});
const db = mongoose.connection;

let smsSchema = new mongoose.Schema({
    shortCode:String,
    trace_id:String,
    link_id:String,
    operator:String,
    phone_number:String,
    message:String
})

let smsrec = mongoose.model('smsrec',smsSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HiveCube' });
});

router.post('/hopesms', (req, res, next)=> {
  //create sms object 
  const sms = {
    shortCode: req.body.shortCode,
    trace_id: req.body.trace_id,
    link_id: req.body.link_id,
    operator: req.body.operator,
    phone_number: req.body.phone_number,
    message: req.body.message
  }
console.log(sms)
  const _sms = new smsrec(sms)
  _sms.save((err, smsrec) => {
    if (err) return console.error(error);
    console.log(smsrec.message + "- - - This sms has been saved - - -");
    res.send("Successful")
  });
})
module.exports = router;
