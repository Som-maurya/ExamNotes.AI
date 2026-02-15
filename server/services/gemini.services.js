
const Gemini_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
export const generateGeminiResponse = async (prompt) => {
    try {
        // 1. Fetch Call (URL mein key pass ho rahi hai)
        const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        // 2. Response Check
        if (!response.ok) {
            const err = await response.text();
            console.error("Gemini Server Error:", err);
            throw new Error("Gemini API Error");
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No text returned from Gemini");
        }

        // 3. JSON Cleaning (Notes ke liye)
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Gemini Fetch Error:", error.message);
        throw new Error("Gemini API fetch failed: " + error.message);
    }
};
    throw new Error("Gemini API fetch failed");
    }
   
}
