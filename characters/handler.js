document.addEventListener('DOMContentLoaded', function() {
  // Extract the payload from the POST request
  const payload = JSON.parse(window.location.search.substr(1));

  // Extract the "text" parameter from the payload
  const messageText = payload.message.text;

  // Construct the custom response URL
  const customResponseURL = `https://smrecording.github.io/slackapp-responses/characters/${messageText}.html`;

  // Make a GET request to the custom response URL
  fetch(customResponseURL)
  .then(response => response.text())
  .then(data => {
    // Make a POST request to the Slack endpoint with the contents of the customResponseURL
    fetch('https://slack.com/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response_url: data }),
    })
    .then(response => {
      // Handle the response from Slack
      console.log('Response sent to Slack');
    })
    .catch(error => {
      // Handle any errors
      console.error('Error sending response to Slack', error);
    });
  })
  .catch(error => {
    // Handle any errors
    console.error('Error fetching customResponseURL', error);
  });
});
