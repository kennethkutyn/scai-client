const prompt = "Hello, how are you?";
const apiKey = "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";

fetch(" https://scai.herokuapp.com/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "text-davinci-003",
    "prompt": "Write a limmerick about APIs",
    "max_tokens": 250,
    "temperature": 0.7
  })
})
.then(response => response.json())
.then(data => console.log(data));



