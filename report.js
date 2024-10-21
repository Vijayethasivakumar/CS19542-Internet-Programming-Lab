// Handle report form submission
document.getElementById('report-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const issueDescription = document.getElementById('issue-description').value;

    // Here you could save this to a server or log it
    // For now, we'll just log it to the console
    console.log('Reported Issue:', issueDescription);

    // Optionally, you could clear the form
    document.getElementById('report-form').reset();
    alert('Your issue has been reported successfully!');
});
