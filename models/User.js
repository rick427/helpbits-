const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema = ({
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
    password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date
});

//virtual field
userSchema.virtual('password')
.set(function(password){
    //create temp variable 
    this._password = password
    // generate a tiemstamp
    this.salt = uuid()
    //encrypt password
    this.password = this.encryptPassword(password);
})
.get(function(){
    return this._password
})

userSchema.methods = {
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