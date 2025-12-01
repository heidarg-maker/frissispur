import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question } from '../types';

// Harder fallback questions.
const FALLBACK_QUESTIONS: Question[] = [
  {
    question: "Hvaða ár gaus eldfjallið Laki (Skaftáreldar)?",
    options: ["1783", "1755", "1801", "1698"],
    correctAnswerIndex: 0,
    difficulty: "Erfitt"
  },
  {
    question: "Hver var fyrsti ráðherra Íslands undir heimastjórn?",
    options: ["Jón Sigurðsson", "Hannes Hafstein", "Björn Jónsson", "Sveinn Björnsson"],
    correctAnswerIndex: 1,
    difficulty: "Miðlungs"
  },
  {
    question: "Hvað heitir hæsti foss Íslands (mælt 2011)?",
    options: ["Glymur", "Háifoss", "Morsárfoss", "Dettifoss"],
    correctAnswerIndex: 2,
    difficulty: "Erfitt"
  },
  {
    question: "Í hvaða handriti eru Völuspá og Hávamál varðveitt?",
    options: ["Flateyjarbók", "Konungsbók (Codex Regius)", "Möðruvallabók", "Skarðsbók"],
    correctAnswerIndex: 1,
    difficulty: "Erfitt"
  },
  {
    question: "Hvaða ár voru síðustu aftökurnar á Íslandi framkvæmdar?",
    options: ["1805", "1830", "1855", "1874"],
    correctAnswerIndex: 1,
    difficulty: "Miðlungs"
  },
  {
    question: "Hver samdi leikritið 'Galdra-Loftur'?",
    options: ["Jóhann Sigurjónsson", "Davíð Stefánsson", "Matthías Jochumsson", "Einar Benediktsson"],
    correctAnswerIndex: 0,
    difficulty: "Miðlungs"
  },
  {
    question: "Hvað heitir stærsta eyjan við Ísland (fyrir utan Heimaey)?",
    options: ["Hrísey", "Grímsey", "Flatey", "Viðey"],
    correctAnswerIndex: 0,
    difficulty: "Miðlungs"
  },
  {
    question: "Hvenær var Alþingi endurreist í Reykjavík?",
    options: ["1845", "1874", "1904", "1918"],
    correctAnswerIndex: 0,
    difficulty: "Erfitt"
  },
  {
    question: "Hvaða jökull er sá þriðji stærsti á Íslandi?",
    options: ["Hofsjökull", "Langjökull", "Mýrdalsjökull", "Drangajökull"],
    correctAnswerIndex: 0,
    difficulty: "Erfitt"
  },
  {
    question: "Hver var fyrsta konan til að taka sæti á Alþingi?",
    options: ["Bríet Bjarnhéðinsdóttir", "Ingibjörg H. Bjarnason", "Auður Auðuns", "Ragnhildur Helgadóttir"],
    correctAnswerIndex: 1,
    difficulty: "Miðlungs"
  }
];

export const fetchQuestions = async (): Promise<Question[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("No API Key found, using fallback questions.");
    return FALLBACK_QUESTIONS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const responseSchema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          correctAnswerIndex: { type: Type.INTEGER },
          difficulty: { type: Type.STRING, enum: ['Miðlungs', 'Erfitt'] }
        },
        required: ['question', 'options', 'correctAnswerIndex', 'difficulty']
      }
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Prompt updated to request harder questions specifically
      contents: "Búðu til 10 erfiðar og krefjandi spurningar á íslensku (Icelandic) sem reyna á almenna þekkingu, sögu eða landafræði. Spurningarnar eiga að vera krossaspurningar með 4 svarmöguleikum. Reyndu að hafa þær á erfiðleikastigi 'Miðlungs' eða 'Erfitt'.",
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData as Question[];
      }
    }
    
    return FALLBACK_QUESTIONS;
  } catch (error) {
    console.error("Error fetching questions from Gemini:", error);
    return FALLBACK_QUESTIONS;
  }
};