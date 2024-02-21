const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("remote_session_saved", () => {
    console.log("Session saved!");
  });

client.on('ready', () => {
    console.log('Client is ready!');
});

let myList = ["917598897894", "919629579216","919123538734"];

client.on("message", async (message) => {
    if (myList.includes(message.from.split("@")[0])) {
      const ans = await run(message.body);
      message.reply(ans);
    }
  });


client.initialize();

async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
 