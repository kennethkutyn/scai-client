const prompt = "Hello, how are you?";
const apiKey = "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";

fetch("https://api.openai.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", 
    "Authorization": 'Bearer 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'
  },
  body: JSON.stringify({
    "model": "text-davinci-003",
    "prompt": "what is amplitude analytics",
    "max_tokens": 250,
    "temperature": 0.7
  })
})
.then(response => response.json())
.then(data => console.log(data));



