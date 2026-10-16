
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    course: {
        type: String,
        required: true
    },

    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
