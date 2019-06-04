let mongoose = require('mongoose')
const server = '127.0.0.1:27017'
const database = 'smsdb'

class Database {
    constructor(){
        this._connect()
    }
    _connect(){
        mongoose.connect(`mongodb://${server}/${database}`).then(
            () => {
                console.log('Database connection successful')
            }).catch(
                err => {
                    console.error('Database connection error')
                }
            )
    }
}

let smsSchema = new mongoose.Schema({
    shortCode:String,
    trace_id:String,
    link_id:String,
    operator:String,
    phone_number:String,
    message:String
})

module.exports = mongoose.model('smsconfirmed', smsSchema)