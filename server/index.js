const express = require("express");

const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = "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";
// import { Configuration, OpenAIApi} from 'openai';
// dotenv.config();
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.post("/post", async (req, res) => {


  try{const question = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 3000,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
  
    res.status(200).send({
      bot:response.data.choices[0].text
    })
  
    console.log(question);
}catch(error){
    console.log(error);
    res.status(500).send(error || "something went wrong");
}  
  
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
