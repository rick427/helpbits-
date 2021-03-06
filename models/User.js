const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{type: ObjectId, ref: 'User'}],
    followers: [{type: ObjectId, ref: 'User'}]
});

//virtual fields
UserSchema.virtual('password')
.set(function(password){
    //create temp variable 
    this._password = password

    // generate a tiemstamp
    this.salt = uuid()

    //encrypt password
    this.hash_password = this.encryptPassword(password);
})
.get(function(){
    return this._password
})


UserSchema.methods = {
    authenticate: function(plainText) {
       return this.encryptPassword(plainText) === this.hash_password
    },

    encryptPassword: function(password) {
        if(!password) return "";

        try {
          return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err){
           return ""
        }
    }
}

module.exports = mongoose.model("User", UserSchema);