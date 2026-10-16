
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./student.model");

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Student Management API is running!");
});

// POST: Add a new student
app.post("/api/students", async (req, res) => {
    try {
        const { rollNo, name, email, course, marks } = req.body;

        const student = new Student({
            rollNo,
            name,
            email,
            course,
            marks
        });

        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student added successfully!",
            student: savedStudent
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to add student",
            error: error.message
        });
    }
});


app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            message: "Students fetched successfully!",
            count: students.length,
            students: students
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students",
            error: error.message
        });
    }
});


app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully!",
            student: student
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update student",
            error: error.message
        });
    }
});



// Start server after connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })

    

    .catch(error => {
        console.error("MongoDB connection failed:", error.message);
    });
