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

  console.log('Prospect Role:', role);
  console.log('Company Name:', companyNameInput);

  const prompt = 'Provide a briefing doc for a sales person at amplitude analytics to talk to the ' + role + ' of ' + companyNameInput + '. Include the following sections:' +
                  '1. company background - 2-3 sentences on what ' + companyNameInput + ' does, their products, and their business model, and if they have a parent company' +
                  '2. Trends - list 2-3 trends in  ' + companyNameInput + 's industry' +
                  '3. Competitors - list ' + companyNameInput + '  top 3 direct competitors, and mention if there is a well-known internation company with a similar business model ' +
                  '4. Priorities for ' + role + ' - 3 sentences on the likely focus/priorities for this person in this company' +
                  '4. Tech Stack - brifely list the technology stack and software products that ' + companyNameInput + '  uses to build their products and caputure, store and analyze user behaviour. Only include software products that you have a high degree of certainty they use. Dont list any products just because they are commonly used for similar purposes or similar companies.' +
                  '5. Amplitude use cases - Identify the top 3 use cases for Amplitude product that might interest the ' +role +' at ' + companyNameInput + 'and specifically mention Amplitude features that will address those use cases. ' +
                  '6. Competition - mention 3 specific features or solutions of Amplitude  that will be relevant for the ' + role + ' of ' + companyNameInput + ' where Amplitude has a competitive advantage over other analytics solutions' +
                  '7. Objections - Identify 3 objections the ' + role + ' might have' +
                  '8. Value selling - identify 3 key ways Amplitude can drive value for this persona and company, specifically as it relates to analysis of their customer experiences';

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


  fetch("https://scai.herokuapp.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", 
    "type": "AI"
  },
  body: JSON.stringify({
    "model": "text-davinci-003",
    messages: [
            {"role": "user", "content": prompt}
          ],
    "max_tokens": 1000,
    "temperature": 0.7
  })
})
.then(response => response.json())
.then(data => responseReady(data.choices[0].message.content, companyNameInput));

}

function responseReady(data, companyNameInput) {
  console.log(data);

  getNews(companyNameInput);

  const mainElement = document.getElementById("main");
  mainElement.style.display = "none";

  
  // Create a new h1 element
  const responseElement = document.createElement("p");
  // Set the inner text to "loading"
  responseElement.innerText = data[0].text;
  // Set the ID attribute to "loading"
  responseElement.setAttribute("id", "response");
  // Append the h1 element to the main element
  mainElement.appendChild(responseElement);




/*  const linksElement = document.createElement("a");
  // Set the inner text to 
  linksElement.innerText = "Customer Stories can be found here";
  // Set the ID attribute
  linksElement.setAttribute("id", "customer-stories");

  linksElement.setAttribute("target", "_blank");
  // Append the h1 element to the main element
  linksElement.setAttribute("href", "https://docs.google.com/presentation/d/1MC6F2xUXEAXOEnp8-a9tnIfoXvXVXo4YUia6o0hQtz4/edit#slide=id.g119542d2666_0_0" );
  mainElement.appendChild(linksElement);

  const spacer = document.createElement("a");
  // Set the inner text to 
  spacer.innerText = "      ";
  mainElement.appendChild(spacer);

  const linksElement2 = document.createElement("a");
  // Set the inner text to 
  linksElement2.innerText = "Value selling resources can be found here";
  // Set the ID attribute
  linksElement2.setAttribute("id", "value-selling");

  linksElement2.setAttribute("target", "_blank");
  // Append the h1 element to the main element
  linksElement2.setAttribute("href", "https://docs.google.com/presentation/d/1Cva1vkCkVxa6NXW3y5FxpEP7BF-81YjTQGjGdoExwGE/edit#slide=id.g13e4e65eb19_1_3036" );
  mainElement.appendChild(linksElement2);
*/
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
