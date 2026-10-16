import React, { useState } from "react";
import "./App.css";

const SUBJECTS = ["CN", "DBMS", "Java", "Python", "Mathematics"];

function StudentForm({ onAddStudent }) {
const [formData, setFormData] = useState({
name: "",
rollNo: "",
department: "",
CN: "",
DBMS: "",
Java: "",
Python: "",
Mathematics: "",
});

const [error, setError] = useState("");

const handleChange = (e) => {
const { name, value } = e.target;


if (name === "name" && !/^[a-zA-Z ]*$/.test(value)) return;
if (name === "rollNo" && !/^\d*$/.test(value)) return;

if (SUBJECTS.includes(name)) {
  if (!/^\d*$/.test(value)) return;
  if (value !== "" && Number(value) > 100) return;
}

setFormData((prev) => ({ ...prev, [name]: value }));
setError("");


};

const handleSubmit = (e) => {
e.preventDefault();


const name = formData.name.trim();
const rollNo = formData.rollNo.trim();

if (!name || !rollNo || !formData.department) {
  setError("Please fill in all student details.");
  return;
}

if (SUBJECTS.some((subject) => formData[subject] === "")) {
  setError("Please enter marks for all five subjects.");
  return;
}

const student = {
  name,
  rollNo,
  department: formData.department,
  marks: {},
};

SUBJECTS.forEach((subject) => {
  student.marks[subject] = Number(formData[subject]);
});

const added = onAddStudent(student);

if (added) {
  setFormData({
    name: "",
    rollNo: "",
    department: "",
    CN: "",
    DBMS: "",
    Java: "",
    Python: "",
    Mathematics: "",
  });
  setError("");
}


};

return ( <div className="form-card"> <div className="card-heading"> <div className="heading-icon">+</div> <div> <h2>Add Student</h2> <p>Enter student details and subject marks</p> </div> </div>


  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Student Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Enter student name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="rollNo">Roll Number</label>
      <input
        id="rollNo"
        type="text"
        name="rollNo"
        placeholder="Enter roll number"
        value={formData.rollNo}
        onChange={handleChange}
        inputMode="numeric"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="department">Department</label>
      <select
        id="department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Computer Engineering">Computer Engineering</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electronics">Electronics</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Civil">Civil</option>
      </select>
    </div>

    <div className="subject-section">
      <h3>Subject Marks</h3>
      <p>Enter marks out of 100 for each subject.</p>

      <div className="subject-grid">
        {SUBJECTS.map((subject) => (
          <div className="form-group" key={subject}>
            <label htmlFor={subject}>{subject}</label>
            <input
              id={subject}
              type="text"
              name={subject}
              placeholder="0 - 100"
              value={formData[subject]}
              onChange={handleChange}
              inputMode="numeric"
              required
            />
          </div>
        ))}
      </div>
    </div>

    {error && <p className="error-message">{error}</p>}

    <button type="submit" className="submit-button">
      Add Student
    </button>
  </form>
</div>


);
}

function StudentDetails({ students }) {
if (students.length === 0) {
return ( <div className="empty-state"> <div className="empty-icon">S</div> <h3>No Students Added Yet</h3> <p>Added student records will appear here.</p> </div>
);
}

return ( <div className="student-list">
{students.map((student) => {
const total = SUBJECTS.reduce(
(sum, subject) => sum + student.marks[subject],
0
);


    const percentage = total / SUBJECTS.length;
    const passed = SUBJECTS.every(
      (subject) => student.marks[subject] >= 35
    );

    return (
      <div className="student-card" key={student.rollNo}>
        <div className="student-top">
          <div className="student-avatar">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <div className="student-info">
            <h3>{student.name}</h3>
            <p>Roll No: {student.rollNo}</p>
            <p>{student.department}</p>
          </div>

          <span className={`status-badge ${passed ? "pass" : "fail"}`}>
            {passed ? "Pass" : "Fail"}
          </span>
        </div>

        <div className="marks-table">
          {SUBJECTS.map((subject) => (
            <div className="marks-row" key={subject}>
              <span>{subject}</span>
              <strong>{student.marks[subject]} / 100</strong>
            </div>
          ))}
        </div>

        <div className="result-summary">
          <div>
            <span>Total Marks</span>
            <strong>{total} / 500</strong>
          </div>
          <div>
            <span>Percentage</span>
            <strong>{percentage.toFixed(2)}%</strong>
          </div>
        </div>
      </div>
    );
  })}
</div>


);
}

function App() {
const [students, setStudents] = useState([]);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("success");

const addStudent = (student) => {
const duplicate = students.some(
(item) => item.rollNo === student.rollNo
);


if (duplicate) {
  setMessage("This roll number already exists.");
  setMessageType("error");
  return false;
}

setStudents((prev) => [...prev, student]);
setMessage("Student added successfully!");
setMessageType("success");
return true;


};

const averagePercentage =
students.length > 0
? (
students.reduce((sum, student) => {
const total = SUBJECTS.reduce(
(marksSum, subject) => marksSum + student.marks[subject],
0
);
return sum + total / SUBJECTS.length;
}, 0) / students.length
).toFixed(2)
: "0.00";

const departments = new Set(
students.map((student) => student.department)
).size;

return ( <div className="app"> <header className="top-header"> <div className="header-content"> <div className="logo">SI</div> <div> <h1>Student Information System</h1> <p>Student records and academic performance</p> </div> </div> </header>


  <main className="main-container">
    <section className="welcome-section">
      <p className="eyebrow">STUDENT MANAGEMENT</p>
      <h2>Student Dashboard</h2>
      <p className="welcome-text">
        Manage student information and track academic results.
      </p>
    </section>

    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon blue">S</div>
        <div>
          <p>Total Students</p>
          <h3>{students.length}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">%</div>
        <div>
          <p>Average Percentage</p>
          <h3>{averagePercentage}%</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon purple">D</div>
        <div>
          <p>Departments</p>
          <h3>{departments}</h3>
        </div>
      </div>
    </section>

    {message && (
      <div className={`${messageType}-message`} role="status">
        {message}
      </div>
    )}

    <section className="content-grid">
      <StudentForm onAddStudent={addStudent} />

      <div className="details-section">
        <div className="section-heading">
          <div>
            <h2>Student Records</h2>
            <p>Subject-wise marks and final results</p>
          </div>
          <span className="record-count">
            {students.length} Records
          </span>
        </div>

        <StudentDetails students={students} />
      </div>
    </section>

    <footer className="footer">
      Student Information System · Built with React
    </footer>
  </main>
</div>


);
}

export default App;
