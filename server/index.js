const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");


// import { Configuration, OpenAIApi} from 'openai';
dotenv.config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
      max_tokens: 300,
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

const __dirname1 = path.resolve();

if(process.env.NODE_ENV== 'production')
{
  app.use(express.static(path.join(__dirname1,"/client/dist")));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"client","dist","index.html"));
  })
}else{
  app.get('/',(req,res)=>{
    res.send("API is Running Successfully");
  })
}

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
