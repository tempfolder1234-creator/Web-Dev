
const form = document.getElementById("resultForm");
const resultBody = document.getElementById("resultBody");

const students = [];

const fields = [
    document.getElementById("htmlMarks"),
    document.getElementById("cssMarks"),
    document.getElementById("jsMarks")
];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const roll = document.getElementById("roll").value.trim();
    const name = document.getElementById("name").value.trim();

    const marks = fields.map(field => Number(field.value));

    if (!roll || !name) {
        alert("Please enter the roll number and student name.");
        return;
    }

    if (students.some(student =>
        student.roll.toLowerCase() === roll.toLowerCase()
    )) {
        alert("This roll number already exists.");
        return;
    }

    if (fields.some(field => field.value.trim() === "") ||
        marks.some(mark =>
            !Number.isFinite(mark) ||
            mark < 0 ||
            mark > 100 ||
            !Number.isInteger(mark)
        )) {
        alert("Enter valid whole-number marks between 0 and 100.");
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (total / 300) * 100;

    students.push({
        roll,
        name,
        marks,
        total,
        percentage
    });

    form.reset();
    renderRecords();
});

function renderRecords() {
    resultBody.replaceChildren();

    if (students.length === 0) {
        const row = resultBody.insertRow();
        const cell = row.insertCell();

        cell.colSpan = 9;
        cell.className = "empty";
        cell.textContent = "No student records available.";
    } else {
        // Highest percentage appears first.
        const sortedStudents = [...students].sort(
            (a, b) => b.percentage - a.percentage
        );

        const topper = sortedStudents[0];

        sortedStudents.forEach(student => {
            const row = resultBody.insertRow();

            if (student.percentage === topper.percentage) {
                row.classList.add("topper-row");
            }

            // textContent safely displays user-entered text.
            const values = [
                student.roll,
                student.name,
                ...student.marks,
                `${student.total}/300`,
                `${student.percentage.toFixed(2)}%`
            ];

            values.forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });

            const resultCell = row.insertCell();
            const passed = student.marks.every(mark => mark >= 35);

            resultCell.textContent = passed ? "PASS" : "FAIL";
            resultCell.className = passed
                ? "result-pass"
                : "result-fail";

            const actionCell = row.insertCell();
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.type = "button";

            deleteButton.addEventListener("click", () => {
                const index = students.indexOf(student);

                if (index !== -1) {
                    students.splice(index, 1);
                    renderRecords();
                }
            });

            actionCell.appendChild(deleteButton);
        });
    }

    updateStatistics();
}

function updateStatistics() {
    document.getElementById("studentCount").textContent =
        students.length;

    if (students.length === 0) {
        document.getElementById("classAverage").textContent = "0%";
        document.getElementById("topperName").textContent =
            "Not available";
        document.getElementById("topperPercentage").textContent =
            "Add student results";
        return;
    }

    const average = students.reduce(
        (sum, student) => sum + student.percentage, 0
    ) / students.length;

    const highestPercentage = Math.max(
        ...students.map(student => student.percentage)
    );

    // Display all toppers in case of a tie.
    const toppers = students.filter(
        student => student.percentage === highestPercentage
    );

    document.getElementById("classAverage").textContent =
        `${average.toFixed(2)}%`;

    document.getElementById("topperName").textContent =
        toppers.map(student => student.name).join(", ");

    document.getElementById("topperPercentage").textContent =
        `${highestPercentage.toFixed(2)}%`;
}

document.getElementById("clearAll").addEventListener("click", () => {
    if (students.length === 0) return;

    if (confirm("Are you sure you want to delete all student records?")) {
        students.length = 0;
        renderRecords();
    }
});

renderRecords();
