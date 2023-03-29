const prompt = "Hello, how are you?";
const apiKey = "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";



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
  const companyLocationInput = document.getElementById('company-location-input').value;

  console.log('Prospect Role', role);
  console.log('Company Name:', companyNameInput);
  console.log('Company Location', companyLocationInput);

  const prompt = "write a briefing doc for a sales person at Amplitude Analytics. They are going to a meeting with a " + role + " at " + companyNameInput + ". The doc should includ several sections: 1. The main concerns and focuses of a person in this role. 2. The Amplitude functionality that may be most relevant to this person. 3. Value selling consdierations - how to map Amplitude solutions to value drivers this person cares about."

  fetch("https://scai.herokuapp.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", 
  },
  body: JSON.stringify({
    "model": "text-davinci-003",
    "prompt": prompt,
    "max_tokens": 250,
    "temperature": 0.7
  })
})
.then(response => response.json())
.then(data => console.log(data.choices[0].text));

}

