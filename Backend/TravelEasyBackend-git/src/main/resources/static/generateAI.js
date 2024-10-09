const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateContent(prompt) {
    const genAI = new GoogleGenerativeAI("AIzaSyDZL1Q-dkwvQmpQ6ZQ-haZp6qiDgIZVWrU");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());  // Ensure this logs the response
    } catch (error) {
        console.error("Error generating content:", error);  // Log errors to the console
    }
}

// Fetch the prompt from command line arguments
const prompt = process.argv[2];
generateContent(prompt);

