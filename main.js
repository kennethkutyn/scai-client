function submitForm() {
  let selectedOption;
  if (document.getElementById('option1').checked) {
    role = document.getElementById('option1').value;
  } else if (document.getElementById('option2').checked) {
    role = document.getElementById('option2').value;
  } else if (document.getElementById('option3').checked) {
    role = document.getElementById('option3').value;
  } else {
    role = document.getElementById('other-text').value;
  }

  const companyNameInput = document.getElementById('company-name-input').value;

  console.log('Prospect Role:', role);
  console.log('Company Name:', companyNameInput);

  const prompt = 'Provide a briefing doc for a sales person at amplitude analytics to talk to the ' + role + ' of ' + companyNameInput + '. Include the following sections:' +
                  '1. company background - 2-3 sentences on what ' + companyNameInput + ' does, their products, and their business model' +
                  '2. Competitors - list ' + companyNameInput + '  top 3 competitors' +
                  '3. Priorities for ' + role + ' - 3 sentences on the likely focus/priorities for this person in this company' +
                  '4. Amplitude use cases - Identify the top 3 use cases for Amplitude product that might interest the ' +role +' at ' + companyNameInput +
                  '5. Objections - Identify 3 objections the ' + role + ' might have' +
                  '6. Value selling - identify 3 key ways Amplitude can drive value for this persona and company, specifically as it relates to analysis of their customer experiences';

  document.getElementById('input-form').remove()
  // Get the element with ID "Main"
  const mainElement = document.getElementById("main");
  // Create a new h1 element
  const loadingElement = document.createElement("h1");
  // Set the inner text to "loading"
  loadingElement.innerText = "Loading...";
  // Set the ID attribute to "loading"
  loadingElement.setAttribute("id", "loading");
  // Append the h1 element to the main element
  mainElement.appendChild(loadingElement);


  fetch("https://scai.herokuapp.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", 
  },
  body: JSON.stringify({
    "model": "text-davinci-003",
    "prompt": prompt,
    "max_tokens": 1000,
    "temperature": 0.7
  })
})
.then(response => response.json())
.then(data => responseReady(data.choices));

}

function responseReady(data) {
  console.log(data);
  document.getElementById('loading').remove();

  const mainElement = document.getElementById("main");
  // Create a new h1 element
  const responseElement = document.createElement("p");
  // Set the inner text to "loading"
  responseElement.innerText = data[0].text;
  // Set the ID attribute to "loading"
  responseElement.setAttribute("id", "response");
  // Append the h1 element to the main element
  mainElement.appendChild(responseElement);

}

