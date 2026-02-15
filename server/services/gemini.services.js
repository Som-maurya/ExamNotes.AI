// 1. Groq ka stable address
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateGeminiResponse = async (prompt) => {
    try {
        // 2. Fetch call start (Yahan GROQ_API_KEY use hogi)
        const response = await fetch(GROQ_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Llama 3 model ka use jo bohot smart hai
                model: "llama3-8b-8192", 
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant. Always respond in valid JSON format for notes, charts, and diagrams."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                // Isse Groq hamesha sahi JSON hi bhejega
                response_format: { type: "json_object" }
            })
        });

        // 3. Check karo response sahi hai ya nahi
        if (!response.ok) {
            const errBody = await response.text();
            console.error("Groq Server Error:", errBody);
            throw new Error("Groq API Call Failed");
        }

        const data = await response.json();
        
        // Groq se data nikalne ka tarika Gemini se thoda alag hai
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content received from Groq");
        }

        // 4. JSON return karna (Aapka purana logic)
        return JSON.parse(content);

    } catch (error) {
        console.error("Groq Service Error:", error.message);
        throw new Error("Failed to generate notes with Groq");
    }
};
