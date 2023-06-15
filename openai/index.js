const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  try {
    const newMessage = req.body.newMessage;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      //We have am 'id' and 'name' for different movie genres such as Action (id: 28), Adventure (id: 12), Animation (id: 16), Comedy (id: 35), Crime (id: 80), Documentary (id: 99), Drama (id: 18), Romance (id: 10749), History (id: 36), Western (id: 37), Science Fiction (id: 878), TV Movie (id: 10770), Thriller (id: 53), War (id: 10752), Family (id: 10751), Fantasy (id: 14), Horror (id: 27), Music (id: 10402), and Mystery (id: 9648). When asked for movie genres, return the corresponding 'id'. However, if a specific movie name or recommendation is asked for, then return that specific movie name.
      prompt: `\nQ: ${newMessage}?\nA:`,
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['\n'],
    });
    console.log(response.data.choices);

    res.send(response.data.choices[0].text.trim());
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
