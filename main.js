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
  } else {
    role = document.getElementById('other-text').value;
  }

  const companyNameInput = document.getElementById('company-name-input').value;

  var numResponses = 0;

  console.log('Prospect Role:', role);
  console.log('Company Name:', companyNameInput);

  getNews(companyNameInput);


  const promptArray = [
      [
        'Provide a high level overview (2-3 sentences) on the company background of ' + companyNameInput + ', their products, and their business model, and if they have a parent company', 
        'List 2-3 trends in  ' + companyNameInput + 's industry',
        'list ' + companyNameInput + '  top 3 direct competitors, and mention if there is a well-known internation company with a similar business model',
        'Whare are likely priorities for the ' + role + ' at ' + companyNameInput + ' - 3 sentences on the likely focus/priorities for this person in this company',
        'Brief me on ' + companyNameInput + 's digital innovation strategy',
        'Brifely list the technology stack and software products that ' + companyNameInput + '  uses to build their products and caputure, store, and analyze user behaviour. State how certain you are or if you are making a guess based on similar companies.',
        'Identify the top 3 use cases for Amplitude products that might interest the ' +role +' at ' + companyNameInput + 'and specifically mention Amplitude features that will address those use cases.',
        'Identify 3 key ways Amplitude can drive value for ' + role + ' at ' + companyNameInput + ', specifically as it relates to analysis of their customer experiences'
      ],
      [
        "Company Background",
        "Industry Trends",
        "Competitors",
        "Priorities",
        "Digital Innovation Strategy",
        "Tech Stack",
        "Use Cases",
        "Value Selling"
      ]
  ]

  
  document.getElementById('input-form').remove();
  document.getElementById('app-description').remove()
  // Get the element with ID "Main"
  const mainElement = document.getElementById("main");
  // Create a new h1 element
  const loadingElement = document.createElement("h1");
  // Set the inner text to "loading"
  loadingElement.innerText = "Loading. This will take about 30 seconds.";
  // Set the ID attribute to "loading"
  loadingElement.setAttribute("id", "loading");
  // Append the h1 element to the main element
  mainElement.appendChild(loadingElement);

  for (let i=0; i<promptArray[0].length; i++){
    makeCall(promptArray[0][i], promptArray[1][i]);
  }

}

function responseReady(data, section) {
  console.log(data);

  document.getElementById(section).innerHTML = data;

  //mainElement.style.display = "none";

  // Create a new h1 element
  //const responseElement = document.createElement("p");
  // Set the inner text to "loading"
  //responseElement.innerText = data;
  // Set the ID attribute to "loading"
  //responseElement.setAttribute("id", "response");
  // Append the h1 element to the main element
  //mainElement.appendChild(responseElement);
  //mainElement.style.display = "block";

}


function toggleContent(container) {
  console.log(container);
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
  console.log(data);
  document.getElementById('loading').remove();

  const mainElement = document.getElementById("main");
  mainElement.style.display = "block";
  document.getElementById("helpful-links").style.display = "block";
  mainElement.style.display = "block";
  document.getElementById("linkURL1").innerHTML = data.news[0].title;
  document.getElementById("linkURL2").innerHTML = data.news[1].title;
  document.getElementById("linkURL3").innerHTML = data.news[2].title;
  document.getElementById("linkURL1").href = data.news[0].url;
  document.getElementById("linkURL2").href = data.news[1].url;
  document.getElementById("linkURL3").href = data.news[2].url;
  document.getElementById("news").style.display = "block";
}
