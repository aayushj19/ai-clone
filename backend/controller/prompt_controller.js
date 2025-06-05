import { configDotenv } from "dotenv";
import OpenAI from "openai";
import Prompt from "../model/prompt_model.js";
configDotenv();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;
  console.log(userId);
    
  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Prompt is required" });
  }
  const userPrompt = await Prompt.create({
    userId,
    role: "user",
    content,
  })

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [
        { role: "user", content }
      ]
    });

    const aiContent = response.choices[0].message.content;

    const aiMessage = await Prompt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default prompt;
