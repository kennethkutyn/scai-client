amplitude.init('32ace3152113b258257617f25cc45d23');
amplitude.track('Form Loaded');


var numResponses = 0;

function submitForm() {
  let selectedOption;
  if (document.getElementById('option1').checked) {
    role = document.getElementById('option1').value;
  } else if (document.getElementById('option2').checked) {
    role = document.getElementById('option2').value;
  } else if (document.getElementById('option3').checked) {
    role = document.getElementById('option3').value;
  } else if (document.getElementById('option4').checked) {
    role = document.getElementById('option4').value;
  } else if (document.getElementById('option5').checked) {
    role = document.getElementById('option5').value;
  } else if (document.getElementById('option6').checked) {
    role = document.getElementById('option6').value;
  } else {
    role = document.getElementById('other-text').value;
  }


  if (document.getElementById('amprole1').checked) {
    amprole = document.getElementById('amprole1').value;
  } else if (document.getElementById('amprole2').checked) {
    amprole = document.getElementById('amprole2').value;
  } else if (document.getElementById('amprole3').checked) {
    amprole = document.getElementById('amprole3').value;
  } else if (document.getElementById('amprole4').checked) {
    amprole = document.getElementById('amprole4').value;
  }


  const companyNameInput = document.getElementById('company-name-input').value;


  const identifyEvent = new amplitude.Identify();
  identifyEvent.set('Amp Role', amprole);
  amplitude.identify(identifyEvent);  
  
  
  const eventProperties = {
    ProspectRole: role,
    Company: companyNameInput,
    };
  amplitude.track('Submit', eventProperties);

  document.getElementById("input").style.display = "none";
  document.getElementById("loading").style.display = "block";

  getNews(companyNameInput);


  const promptArray = [
      [
        'Provide a high level overview (2-3 sentences) on the company background of ' + companyNameInput + ', their products, and their business model, and if they have a parent company', 
        'List 2-3 trends in  ' + companyNameInput + 's industry, in numbered bullet points. No need for extra introductory text.',
        'list ' + companyNameInput + '  top 3 direct competitors in numbered bullet points, and mention if there is a well-known internation company with a similar business model',
        'Whare are likely priorities for the ' + role + ' at ' + companyNameInput + ' - 3 sentences on the likely focus/priorities for this person in this company, in numbered bullet points',
        'Brief me on ' + companyNameInput + 's digital innovation strategy',
        'Brifely list the technology stack and software products that ' + companyNameInput + '  uses to build their products and caputure, store, and analyze user behaviour. List in numbered bullet points please. ',
        'Provide 3 open-ended discovery questions that a salesperson at Amplitude might use to better understand the opportunity for Amplitude products to be used at ' + companyNameInput + ' by the ' + role,
        'Identify the top 3 use cases in numbered bullet points for Amplitude products that might interest the ' +role +' at ' + companyNameInput + 'and specifically mention Amplitude features that will address those use cases.',
        'Identify 3 key ways Amplitude can drive value for ' + role + ' at ' + companyNameInput + ', specifically as it relates to analysis of their customer experiences. Format your response in numbered bullet points.'
      ],
      [
        "Company Background",
        "Industry Trends",
        "Competitors",
        "Priorities",
        "Digital Innovation Strategy",
        "Tech Stack",
        "Discovery",
        "Use Cases",
        "Value Selling"
      ]
  ]

  for (let i=0; i<promptArray[0].length; i++){
    makeCall(promptArray[0][i], promptArray[1][i]);
  }

}

function responseReady(data, section) {
  numResponses = numResponses + 1;
  if (numResponses == 6){
    document.getElementById("response-content").style.display = "block";
    document.getElementById("loading").style.display = "none";
    amplitude.track('Responses Loaded & Rendered');
    document.getElementById("popup").style.display = "block";

  }

  if (numResponses == 9){
    amplitude.track('All AI API calls returned');
  }

  document.getElementById(section).innerText = data;

}


function toggleContent(container) {
  if (!container.classList.contains('expanded')) {
    const eventProperties = {
      Section: container.querySelector('h2').textContent,
      };
    amplitude.track('Expand Section', eventProperties);
    }
  
  container.classList.toggle('expanded');
  const arrow = container.querySelector('.arrow');
  arrow.innerHTML = container.classList.contains('expanded') ? '&#x25BC;' : '&#x25B6;';
  
}

function makeCall(prompt, section){
  fetch("https://scai.herokuapp.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "type": "AI"
    },
    body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {"role": "user", "content": prompt}
            ],
            max_tokens: 1000,
            temperature: 0.7
    })
  })
  .then(response => response.json())
  .then(data => responseReady(data.choices[0].message.content, section));
}


function getNews(company){
  
  const newsUrl = 'https://scai.herokuapp.com/search-news?text=' +  company + '&sort=sentiment&api-key=c3e5517153c24a58b91d694115234283';

  fetch(newsUrl, {
    method: "GET",
    headers: {
      "type": "NEWS"
    },
  })
    .then(response => response.json())
    .then(data => handleNews(data))
    .catch(error => console.error(error));
}

function handleNews(data){
  amplitude.track('News Response Loaded');
  document.getElementById("linkURL1").innerHTML = data.news[0].title.slice(0, 90);
  document.getElementById("linkURL2").innerHTML = data.news[1].title.slice(0, 90);
  document.getElementById("linkURL3").innerHTML = data.news[2].title.slice(0, 90);
  document.getElementById("linkURL1").href = data.news[0].url;
  document.getElementById("linkURL2").href = data.news[1].url;
  document.getElementById("linkURL3").href = data.news[2].url;
}


function feedbackMinutes(minutes) {
  const eventProperties = {
    time : minutes,
    };
  amplitude.track('Feedback sent', eventProperties);
  document.getElementById("popup").style.display = "none";
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}