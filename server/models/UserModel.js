const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "İsim alanı boş bırakılamaz"]
    },
    lastName: {
        type: String,
        required: [true, "Soyisim alanı boş bırakılamaz"]
    },
    email: {
        type: String,
        required: [true, "Lütfen email adresinizi giriniz"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Lütfen geçerli bir mail adresi giriniz."
        ]
    },
    password: {
        type: String,
        required: [true, "Şifre alanı zorunludur"],
        minlength: [6, "Şifre en az 6 haneli olmalıdır"],
        select: false
    },
    files: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "files",
        }
    ]
})

UserSchema.pre("save", function(next){
    if(!this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err,salt)=>{
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err,hash)=>{
            if(err) next(err);
            this.password = hash;
            next();
        })
    })
})

UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY} = config;
    const payload = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    return token;
}

module.exports = mongoose.model("user", UserSchema);