# 📚 StudyMate AI

StudyMate AI is an AI-powered study assistant designed to help college students understand academic topics in simple and easy language.

## ✨ Features

- 📖 Enter a subject and topic/question
- 🤖 Get an AI-generated explanation
- 💡 Simple and student-friendly responses
- ✅ Input validation for empty questions
- ⚠️ Error handling for AI service and API quota errors
- 📱 Responsive and simple web interface
- 🌐 Publicly deployed application

## 🔄 How It Works

1. 🎓 The student enters a subject.
2. ✍️ The student enters a topic or question.
3. 🔐 The request is securely sent to the backend.
4. 🧠 The backend creates a structured prompt for the AI model.
5. 🤖 Gemini generates the explanation.
6. 📖 The answer is displayed to the student.

## 🧠 AI Prompt

The application uses a structured prompt that asks the AI to:

- Act as a helpful college study assistant
- Explain topics in simple language
- Use clear points
- Give a small example when useful
- Avoid unnecessary complexity

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Google Gemini API
- Git & GitHub
- Render

## ⚠️ Error Handling

The application handles:

- Empty topic/question input
- Temporary AI service errors
- Gemini API quota limitations
- General API errors

## 📂 Project Structure

```text
StudyMate-AI/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
