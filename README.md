# ✨ Rewind & Rebuild

> Your 2025 Story • Your 2026 Motivation

A beautiful, introspective web app that helps you reflect on your year and build motivation for the year ahead. Answer thoughtful questions about your journey, and receive a personalized AI-generated story of your year along with custom artwork and an inspiring motivation for what's next.


---

## 🌟 Features

- **📝 Guided Reflection** — 12 thoughtful questions covering highlights, challenges, growth, emotions, and dreams
- **📖 AI-Generated Story** — Your year transformed into a beautiful, personalized narrative
- **🎨 Custom Artwork** — Two unique AI-generated images reflecting your journey and future
- **🚀 Personalized Motivation** — An inspiring message tailored to your experiences and goals
- **✉️ Welcome Letter** — A gentle, mindful introduction to set the right tone
- **🌙 Beautiful UI** — Dreamy purple gradients, floating particles, smooth animations

---

## 🛠️ Tech Stack

| Purpose | Technology |
|---------|------------|
| Frontend | React 18 + Tailwind CSS |
| Story & Motivation | [Cohere API](https://cohere.com) (command-r-plus) |
| Image Generation | [Google Gemini API](https://aistudio.google.com) |
| Fonts | Playfair Display + Crimson Text |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- API Keys:
  - [Cohere API Key](https://dashboard.cohere.com/api-keys)
  - [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rewind-rebuild.git
   cd rewind-rebuild
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_COHERE_API_KEY=your_cohere_api_key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
rewind-rebuild/
├── src/
│   ├── components/
│   │   └── RewindRebuild.jsx    # Main app component
│   ├── App.js
│   └── index.js
├── public/
├── .env.example
├── package.json
└── README.md
```

---

## 🎨 Screenshots

| Welcome Letter | Questions | Your Story | 2026 Motivation |
|----------------|-----------|------------|-----------------|
| A gentle introduction | Guided reflection | AI-generated narrative + artwork | Personalized inspiration |

---

## 💭 The Philosophy

> *"This isn't about guilt or fixing yourself. It's about asking: What was possible? What did I learn? What could I try next time?"*

Rewind & Rebuild is designed as a quiet ritual — not a productivity tool. It's a gentle pause to look back before stepping forward, inspired by the concept of counterfactual thinking as a tool for growth rather than rumination.

---

## 🔮 How It Works

1. **Welcome** — Read a thoughtful letter setting the tone
2. **Reflect** — Answer 12 questions about your year:
   - Highlights & challenges
   - Tears, anger, and love
   - Surprises & proud moments
   - Lessons learned & things let go
   - Dreams for next year
3. **Generate** — AI weaves your answers into:
   - A personalized story of your 2025
   - A custom illustration of your journey
   - An inspiring motivation for 2026
   - Artwork representing your future
4. **Rebuild** — Step into the new year with clarity

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
---

## 👤 Author

**Kevin Jojo**

---

<p align="center">
  <i>"Every ending is a new beginning."</i><br>
  <b>✦ Rewind & Rebuild ✦</b>
</p>
