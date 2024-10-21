// Initialize poll results (could be stored in localStorage or fetched from a server)
let pollResults = JSON.parse(localStorage.getItem('pollResults')) || {};

// Function to display poll results
function displayPollResults() {
    const pollList = document.getElementById('poll-list');
    pollList.innerHTML = ''; // Clear existing results

    // Loop through results and display them
    for (const [meal, votes] of Object.entries(pollResults)) {
        const li = document.createElement('li');
        li.textContent = `${meal}: ${votes} vote(s)`;
        pollList.appendChild(li);
    }
}

// Handle poll form submission
document.getElementById('poll-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedMeal = document.getElementById('meal-option').value;

    // Increment the vote for the selected meal
    if (!pollResults[selectedMeal]) {
        pollResults[selectedMeal] = 0;
    }
    pollResults[selectedMeal]++;

    // Save results to localStorage
    localStorage.setItem('pollResults', JSON.stringify(pollResults));

    // Display updated results
    displayPollResults();
});

// Display results on page load
displayPollResults();
