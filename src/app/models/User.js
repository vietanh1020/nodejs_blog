const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const User = new Schema({
    firstName: { type: String, required: true, maxLength: 32, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthday: { type: Date, required: true, },
    email: { type: String, trim: true, required: true, unique },
    encryptedPassword: { type: String, required: true }, 
    salt: { type: String }
})

User.virtual('password')
    .set(()=>{

    })
    .get(()=>{

    })
User.method = {
    authenticate: function(plainPassword){
        return 

    }
}

module.exports = mongoose.model('User', User)