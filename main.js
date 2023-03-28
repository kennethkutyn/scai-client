const prompt = "Hello, how are you?";
const apiKey = "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";

fetch(" https://scai.herokuapp.com/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: text-davinci-002,
    prompt: prompt,
    temperature: 1.0,
    max_tokens: 50,
    n: 1,
    stop: "\n"
  })
})
.then(response => response.json())
.then(data => console.log(data));



