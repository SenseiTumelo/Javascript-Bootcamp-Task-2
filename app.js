// Get form and result elements
const gradeForm = document.getElementById('gradeForm');
const resultDiv = document.getElementById('result');
const resultContent = document.getElementById('resultContent');
const studentsList = document.getElementById('studentsList');
const studentsListContent = document.getElementById('studentsListContent');

// Array to store all submitted students
let submittedStudents = [];

// Function to determine grade category
function getGradeCategory(mark) {
    if (mark >= 80 && mark <= 100) {
        return { status: 'PASSED WITH DISTINCTION', passed: true };
    } else if (mark >= 65 && mark <= 79) {
        return { status: 'PASSED WITH MERIT', passed: true };
    } else if (mark >= 50 && mark <= 64) {
        return { status: 'PASSED', passed: true };
    } else if (mark >= 0 && mark < 50) {
        return { status: 'FAILED', passed: false };
    } else {
        return { status: 'INVALID MARK', passed: false };
    }
}

// Add event listener to form
gradeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const studentName = document.getElementById('studentName').value.trim();
    const studentMark = parseFloat(document.getElementById('studentMark').value);

    // Validate inputs
    if (!studentName || isNaN(studentMark)) {
        alert('Please enter valid student name and mark');
        return;
    }

    if (studentMark < 0 || studentMark > 100) {
        alert('Mark must be between 0 and 100');
        return;
    }

    // Get grade category
    const gradeInfo = getGradeCategory(studentMark);

    // Add student to the array
    submittedStudents.push({
        name: studentName,
        mark: studentMark,
        status: gradeInfo.status,
        passed: gradeInfo.passed
    });

    // Display result
    displayResult(studentName, studentMark, gradeInfo);

    // Update students list
    updateStudentsList();

    // Clear form
    gradeForm.reset();
});

// Function to display result
function displayResult(name, mark, gradeInfo) {
    // Remove hidden class to show result
    resultDiv.classList.remove('hidden');

    // Apply pass or fail styling
    resultDiv.classList.remove('pass', 'fail');
    resultDiv.classList.add(gradeInfo.passed ? 'pass' : 'fail');

    // Build result message
    const status = gradeInfo.status;
    const message = `
        <div class="result-name">${name}</div>
        <div class="result-mark">Mark: ${mark}/100</div>
        <div class="result-status">${status}</div>
    `;

    resultContent.innerHTML = message;

    // Scroll to result (optional, for better UX)
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to update and display students list
function updateStudentsList() {
    // Show the list container
    studentsList.classList.remove('hidden');

    // Clear existing list
    studentsListContent.innerHTML = '';

    // Add each student to the list
    submittedStudents.forEach((student, index) => {
        const listItem = document.createElement('li');
        const statusClass = student.passed ? 'pass' : 'fail';

        listItem.innerHTML = `
            <div class="student-item ${statusClass}">
                <div class="student-name">${student.name}</div>
                <div class="student-mark">Mark: ${student.mark}/100</div>
                <div class="student-status ${statusClass}">${student.status}</div>
            </div>
        `;

        studentsListContent.appendChild(listItem);
    });
}
