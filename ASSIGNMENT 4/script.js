document.getElementById("myForm").onsubmit = function(event) {

    event.preventDefault();

    // Get values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value.trim();
    let department = document.getElementById("department").value;

    // Clear old errors
    document.querySelectorAll("p").forEach(function(p) {
        p.innerHTML = "";
    });

    let valid = true;

    // Name validation
    if (name === "") {
        document.getElementById("nameError").innerHTML =
            "Name is required";
        valid = false;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerHTML =
            "Enter a valid email";
        valid = false;
    }


// Password validation
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordPattern.test(password)) {
    document.getElementById("passwordError").innerHTML =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    valid = false;
}

    // Phone validation
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Enter a valid 10-digit phone number";
        valid = false;
    }

    // Department validation
    if (department === "") {
        document.getElementById("departmentError").innerHTML =
            "Please select a department";
        valid = false;
    }

    // Final result
    if (valid) {
        document.getElementById("message").innerHTML =
            "Employee Registered Successfully!";

        this.reset();
    }
};