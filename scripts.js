// Handle login form submission
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the form values
        const name = document.getElementById('name').value;
        const rollno = document.getElementById('rollno').value;
        const year = document.getElementById('year').value;

        // Validate form input
        if (name && rollno && year) {
            // Store user info in localStorage
            localStorage.setItem('studentName', name);
            localStorage.setItem('studentRollNo', rollno);
            localStorage.setItem('studentYear', year);

            // Redirect to feedback page
            window.location.href = 'feedback.html';
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// Display student info on feedback page
if (document.getElementById('student-name')) {
    // Retrieve student data from localStorage
    const studentName = localStorage.getItem('studentName');

    // Display student name on feedback page
    if (studentName) {
        document.getElementById('student-name').textContent = studentName;
    }
}

// Feedback form handling (same as previous implementation)
let feedbackList = [];

// Form submission handler for feedback page
if (document.getElementById('feedback-form')) {
    document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const meal = document.getElementById('meal').value;
        const rating = document.getElementById('rating').value;
        const comments = document.getElementById('comments').value;

        if (meal && rating && comments) {
            const feedback = {
                meal,
                rating,
                comments,
                date: new Date().toLocaleString()
            };

            feedbackList.push(feedback);
            displayFeedback();
            document.getElementById('feedback-form').reset();
        } else {
            alert("Please fill out all fields.");
        }
    });
}

// Function to display feedback on the page
function displayFeedback() {
    const feedbackDisplay = document.getElementById('feedback-list');
    feedbackDisplay.innerHTML = '';

    feedbackList.forEach(feedback => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${feedback.meal}</strong> - Rating: ${feedback.rating}/5<br>
                        <small>${feedback.date}</small><br>
                        <p>${feedback.comments}</p>`;
        feedbackDisplay.appendChild(li);
    });
}
