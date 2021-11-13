const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt =require('bcrypt')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        require:true,
        trim: true,
        
    },
    email: {
        type: String,
        unique:true, // email k dc trung nhau
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default:1,
        required:true,
        validate(value) {
            if (value < 0) {
                return JSON.stringify(
                    {
                        'err':'Age must be positive number',
                       })
            }
        }
    }
})

userSchema.statics.findByCredentials=async(email,password)=>{
  
    const user=await User.findOne({email})
    if(!user){
      
       return JSON.stringify(
           {
           'err':'Email is not exist',
          }
           )
    }
    console.log( await bcrypt.hash(password,8))
    console.log(user.password)
    const isMatch=await bcrypt.compare(password,user.password)
    console.log(isMatch)
    if(!isMatch){
        return JSON.stringify(
            {
                'err':'Password is wrong',
               })
    }
    return user

}
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User