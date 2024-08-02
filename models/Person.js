const mongoose = require('mongoose')
const bycrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
});

personSchema.pre('save', async function (next) {

    const person = this;
    if (!person.isModified('password')) next();

    try {
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(person.password, salt)
        person.password = hashedPassword;
        next();

    } catch (error) {
        return next(error);
    }
});

personSchema.methods.comparePassword = async function (candidatePassword){
    try {
        const isMatch = await bycrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (error) {
        
    }
}


const Person = mongoose.model('mongoose', personSchema);
module.exports = Person;