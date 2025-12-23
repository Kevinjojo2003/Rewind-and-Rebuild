import React, { useState } from 'react';

export default function App() {
  const [stage, setStage] = useState('welcome'); // welcome, intro, collect, processing, story, motivation
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [processingProgress, setProcessingProgress] = useState(0);
  const [generatedStory, setGeneratedStory] = useState('');
  const [generatedMotivation, setGeneratedMotivation] = useState('');
  const [storyImage, setStoryImage] = useState('');
  const [motivationImage, setMotivationImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [fadeIn, setFadeIn] = useState(true);

  const GEMINI_API_KEY = 'AIzaSyAOqvpIyUab0QWlqfW0kMFAhjsgpmM_J4U';

  const questions = [
    {
      id: 'name',
      emoji: '✨',
      question: "First, what should I call you?",
      placeholder: "Your name...",
      type: 'text'
    },
    {
      id: 'highlight',
      emoji: '🌟',
      question: "What was your biggest highlight this year?",
      placeholder: "That moment that made you feel alive...",
      type: 'textarea'
    },
    {
      id: 'challenge',
      emoji: '🌊',
      question: "What was your toughest challenge?",
      placeholder: "The storm you weathered...",
      type: 'textarea'
    },
    {
      id: 'growth',
      emoji: '🌱',
      question: "How did you grow as a person?",
      placeholder: "The ways you changed...",
      type: 'textarea'
    },
    {
      id: 'tears',
      emoji: '💧',
      question: "What made you cry this year?",
      placeholder: "Tears of joy, sadness, or relief...",
      type: 'textarea'
    },
    {
      id: 'anger',
      emoji: '🔥',
      question: "What made you feel anger or frustration?",
      placeholder: "What pushed your limits...",
      type: 'textarea'
    },
    {
      id: 'love',
      emoji: '💗',
      question: "What or who did you love deeply?",
      placeholder: "People, moments, or things that filled your heart...",
      type: 'textarea'
    },
    {
      id: 'surprise',
      emoji: '🎁',
      question: "What surprised you unexpectedly?",
      placeholder: "The plot twists of your year...",
      type: 'textarea'
    },
    {
      id: 'proud',
      emoji: '🏆',
      question: "What are you most proud of?",
      placeholder: "Your wins, big or small...",
      type: 'textarea'
    },
    {
      id: 'letgo',
      emoji: '🍂',
      question: "What did you have to let go of?",
      placeholder: "What you released to move forward...",
      type: 'textarea'
    },
    {
      id: 'lesson',
      emoji: '📚',
      question: "What's the biggest lesson you learned?",
      placeholder: "Wisdom gained through experience...",
      type: 'textarea'
    },
    {
      id: 'nextyear',
      emoji: '🚀',
      question: "What do you want for next year?",
      placeholder: "Your hopes and dreams for 2026...",
      type: 'textarea'
    }
  ];

  const transition = (newStage) => {
    setFadeIn(false);
    setTimeout(() => {
      setStage(newStage);
      setFadeIn(true);
    }, 500);
  };

  const handleAnswer = (value) => {
    const q = questions[currentQuestion];
    if (q.id === 'name') {
      setUserName(value);
    }
    setAnswers(prev => ({ ...prev, [q.id]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setFadeIn(true);
      }, 300);
    } else {
      generateStory();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setFadeIn(true);
      }, 300);
    }
  };

  const generateStory = async () => {
    transition('processing');
    setIsLoading(true);

    // Simulate processing animation
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 50));
      setProcessingProgress(i);
    }

    try {
      const response = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer pKAwujTavEae5XJtEzYQGiB6AsXkn4Oh3Cy3G5B3"
        },
        body: JSON.stringify({
          model: "command-r-plus",
          messages: [{
            role: "user",
            content: `You are a warm, poetic storyteller creating a personal year-in-review narrative. Based on these reflections from ${userName || 'this person'}, write a beautiful, touching 3-4 paragraph story of their 2025 journey. Make it personal, emotional, and meaningful. Use second person ("you"). Don't use bullet points or lists - write flowing prose.

Their reflections:
- Biggest highlight: ${answers.highlight || 'Not shared'}
- Toughest challenge: ${answers.challenge || 'Not shared'}
- Personal growth: ${answers.growth || 'Not shared'}
- What made them cry: ${answers.tears || 'Not shared'}
- What made them angry: ${answers.anger || 'Not shared'}
- What they loved: ${answers.love || 'Not shared'}
- Surprises: ${answers.surprise || 'Not shared'}
- Proudest moment: ${answers.proud || 'Not shared'}
- What they let go of: ${answers.letgo || 'Not shared'}
- Biggest lesson: ${answers.lesson || 'Not shared'}

Write a beautiful narrative story of their year. Be specific to their experiences. Make them feel seen.`
          }]
        })
      });

      const data = await response.json();
      const story = data.message?.content?.[0]?.text || "Your 2025 was a tapestry of moments - each thread woven with purpose.";
      setGeneratedStory(story);

      // Generate motivation
      const motivationResponse = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer pKAwujTavEae5XJtEzYQGiB6AsXkn4Oh3Cy3G5B3"
        },
        body: JSON.stringify({
          model: "command-r-plus",
          messages: [{
            role: "user",
            content: `You are an inspiring life coach creating a powerful motivation message for ${userName || 'someone'} entering 2026. Based on their journey and what they want for next year, write an uplifting, personalized 2-3 paragraph motivation. Be specific to their experiences and dreams. Use second person. No lists or bullet points.

Their 2025 journey included:
- Highlight: ${answers.highlight || 'Not shared'}
- Challenge overcome: ${answers.challenge || 'Not shared'}
- Growth: ${answers.growth || 'Not shared'}
- Lesson learned: ${answers.lesson || 'Not shared'}
- Proudest moment: ${answers.proud || 'Not shared'}

For 2026, they want: ${answers.nextyear || 'Not shared'}

Write a powerful, personalized motivation that acknowledges their strength, celebrates their growth, and fuels their dreams for 2026. Make them feel unstoppable.`
          }]
        })
      });

      const motivationData = await motivationResponse.json();
      const motivation = motivationData.message?.content?.[0]?.text || "2026 is calling. You've proven your strength. Now it's time to soar.";
      setGeneratedMotivation(motivation);

      // Generate 2025 Reflection Image using Gemini
      try {
        const storyImagePrompt = `Create a beautiful, artistic, dreamy illustration representing someone's 2025 year journey. The image should evoke nostalgia, reflection, and emotional depth. Include visual metaphors for: ${answers.highlight || 'achievements'}, overcoming ${answers.challenge || 'challenges'}, and ${answers.growth || 'personal growth'}. Style: ethereal, warm golden and purple tones, cinematic lighting, painterly style. No text in image.`;
        
        const storyImgResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: storyImagePrompt }] }],
            generationConfig: { 
              responseModalities: ["image", "text"],
              imageSafetySetting: "block_low_and_above"
            }
          })
        });
        
        const storyImgData = await storyImgResponse.json();
        if (storyImgData.candidates?.[0]?.content?.parts) {
          const imagePart = storyImgData.candidates[0].content.parts.find(p => p.inlineData);
          if (imagePart) {
            setStoryImage(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
          }
        }
      } catch (imgError) {
        console.error("Error generating story image:", imgError);
      }

      // Generate 2026 Motivation Image using Gemini
      try {
        const motivationImagePrompt = `Create an inspiring, uplifting illustration representing hope and motivation for 2026. The image should evoke excitement, possibility, and new beginnings. Include visual metaphors for: ${answers.nextyear || 'dreams and goals'}, rising up, and moving forward with strength. Style: vibrant, hopeful, sunrise colors with gold and warm tones, dynamic composition, inspirational mood. No text in image.`;
        
        const motivationImgResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: motivationImagePrompt }] }],
            generationConfig: { 
              responseModalities: ["image", "text"],
              imageSafetySetting: "block_low_and_above"
            }
          })
        });
        
        const motivationImgData = await motivationImgResponse.json();
        if (motivationImgData.candidates?.[0]?.content?.parts) {
          const imagePart = motivationImgData.candidates[0].content.parts.find(p => p.inlineData);
          if (imagePart) {
            setMotivationImage(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
          }
        }
      } catch (imgError) {
        console.error("Error generating motivation image:", imgError);
      }

      transition('story');
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedStory("Your 2025 was a tapestry of moments - each thread woven with purpose. Through every challenge and triumph, you've grown in ways you're only beginning to understand.");
      setGeneratedMotivation("2026 is calling. You've proven your strength. Now it's time to soar.");
      transition('story');
    }

    setIsLoading(false);
  };

  const FloatingParticles = () => (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      fontFamily: "'Crimson Text', Georgia, serif",
      color: '#f8f4e3',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 128, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 128, 0.5); }
        }
        
        .fade-transition {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-out {
          opacity: 0;
          transform: translateY(-20px);
        }
        
        textarea:focus, input:focus {
          outline: none;
          border-color: #ffd780 !important;
          box-shadow: 0 0 30px rgba(255, 215, 128, 0.2);
        }
        
        .story-text {
          line-height: 1.9;
          font-size: 1.2rem;
          white-space: pre-wrap;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #ffd780 0%, #ffb347 100%);
          color: #1a1a2e;
          border: none;
          padding: 16px 40px;
          font-size: 1.1rem;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(255, 215, 128, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 12px 30px;
          font-size: 1rem;
          font-family: 'Crimson Text', serif;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .progress-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .progress-dot.active {
          background: #ffd780;
          box-shadow: 0 0 15px rgba(255, 215, 128, 0.6);
        }
        
        .progress-dot.completed {
          background: rgba(255, 215, 128, 0.5);
        }
        
        .progress-dot.pending {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <FloatingParticles />

      {/* Welcome Note Stage */}
      {stage === 'welcome' && (
        <div 
          className={`fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            maxWidth: '700px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '25px',
            padding: 'clamp(30px, 6vw, 50px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              ✉️
            </div>
            
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '500',
              marginBottom: '25px',
              textAlign: 'center',
              fontStyle: 'italic',
              opacity: 0.9
            }}>
              A note before you begin
            </h2>
            
            <div style={{
              fontSize: '1.05rem',
              lineHeight: '1.9',
              opacity: 0.85,
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '20px' }}>
                Hi there,
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                This isn't a productivity tool or a system to optimize. Think of it more like a quiet ritual — a gentle pause to look back before stepping forward.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                If you can, find a calm space: a cozy corner, a café, a park bench. Bring a cup of something warm. Give yourself 10-15 minutes. No pressure. No performance. Just you and your year.
              </p>
              
              <p style={{ marginBottom: '20px', fontStyle: 'italic', opacity: 0.7 }}>
                "Reflection isn't about ruminating on what went wrong — it's about seeing clearly where you had agency, what you learned, and what you might try next time."
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                <strong style={{ color: '#ffd780' }}>Here's the invitation:</strong>
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                <strong>Rewind.</strong> We'll walk through your year together — the highlights, the struggles, the tears, the growth. Write down what comes to mind. Keep it honest. Keep it real.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                <strong>Reflect.</strong> Notice what patterns emerge. What made you stronger? What do you want to carry forward? What do you want to leave behind?
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                <strong>Rebuild.</strong> We'll weave your reflections into a story of your year and create a personalized motivation for what's ahead. Not a grand resolution — just a clearer perspective and a gentler path forward.
              </p>
              
              <p style={{ marginBottom: '25px', opacity: 0.8 }}>
                This isn't about guilt or fixing yourself. It's about asking: <em>What was possible? What did I learn? What could I try next time?</em>
              </p>
              
              <p style={{ marginBottom: '0' }}>
                A small change can open a different path — and sometimes that's all we need.
              </p>
            </div>
            
            <div style={{
              marginTop: '35px',
              paddingTop: '25px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'right',
              fontStyle: 'italic',
              opacity: 0.7
            }}>
              <p style={{ marginBottom: '5px' }}>See you on the other side of the page.</p>
              <p style={{ color: '#ffd780' }}>— Kevin Jojo</p>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                className="btn-primary"
                onClick={() => transition('intro')}
                style={{ animation: 'glow 2s ease-in-out infinite' }}
              >
                I'm Ready to Begin ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Intro Stage */}
      {stage === 'intro' && (
        <div 
          className={`fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            textAlign: 'center',
            maxWidth: '700px'
          }}>
            <div style={{
              fontSize: '5rem',
              marginBottom: '20px',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
              ✦
            </div>
            
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: '600',
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #ffd780 0%, #fff 50%, #ffd780 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite'
            }}>
              Rewind & Rebuild
            </h1>
            
            <p style={{
              fontSize: '1.4rem',
              fontStyle: 'italic',
              opacity: 0.8,
              marginBottom: '40px',
              letterSpacing: '2px'
            }}>
              Your 2025 Story • Your 2026 Motivation
            </p>
            
            <p style={{
              fontSize: '1.15rem',
              lineHeight: '1.8',
              opacity: 0.9,
              marginBottom: '50px',
              maxWidth: '550px',
              margin: '0 auto 50px'
            }}>
              Every year writes a chapter of your life. Let's turn back the pages of 2025 together — 
              the moments of joy, the tears, the growth, the lessons. Then, let's write your 
              motivation for the year ahead.
            </p>
            
            <button 
              className="btn-primary"
              onClick={() => transition('collect')}
              style={{ animation: 'glow 2s ease-in-out infinite' }}
            >
              Begin Your Journey
            </button>
            
            <p style={{
              marginTop: '30px',
              fontSize: '0.9rem',
              opacity: 0.5
            }}>
              ~ 5 minutes of reflection ~
            </p>
            
            <button
              onClick={() => transition('welcome')}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: 'rgba(255, 215, 128, 0.7)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontFamily: "'Crimson Text', serif",
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffd780'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 215, 128, 0.7)'}
            >
              ✉️ Read the welcome letter again
            </button>
          </div>
        </div>
      )}

      {/* Collection Stage */}
      {stage === 'collect' && (
        <div 
          className={`fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Progress Indicator */}
          <div style={{
            position: 'fixed',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {questions.map((_, i) => (
              <div
                key={i}
                className={`progress-dot ${i === currentQuestion ? 'active' : i < currentQuestion ? 'completed' : 'pending'}`}
              />
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              {questions[currentQuestion].emoji}
            </div>
            
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              fontWeight: '500',
              marginBottom: '30px',
              lineHeight: '1.4'
            }}>
              {questions[currentQuestion].question}
            </h2>
            
            {questions[currentQuestion].type === 'text' ? (
              <input
                type="text"
                value={answers[questions[currentQuestion].id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={questions[currentQuestion].placeholder}
                style={{
                  width: '100%',
                  padding: '20px 25px',
                  fontSize: '1.2rem',
                  fontFamily: "'Crimson Text', serif",
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  color: '#f8f4e3',
                  marginBottom: '30px',
                  transition: 'all 0.3s ease'
                }}
              />
            ) : (
              <textarea
                value={answers[questions[currentQuestion].id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={questions[currentQuestion].placeholder}
                rows={4}
                style={{
                  width: '100%',
                  padding: '20px 25px',
                  fontSize: '1.15rem',
                  fontFamily: "'Crimson Text', serif",
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  color: '#f8f4e3',
                  marginBottom: '30px',
                  resize: 'none',
                  transition: 'all 0.3s ease',
                  lineHeight: '1.7'
                }}
              />
            )}
            
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {currentQuestion > 0 && (
                <button className="btn-secondary" onClick={prevQuestion}>
                  ← Back
                </button>
              )}
              
              <button 
                className="btn-primary" 
                onClick={nextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
                style={{
                  opacity: answers[questions[currentQuestion].id] ? 1 : 0.5,
                  cursor: answers[questions[currentQuestion].id] ? 'pointer' : 'not-allowed'
                }}
              >
                {currentQuestion === questions.length - 1 ? 'Create My Story' : 'Continue →'}
              </button>
            </div>
            
            <p style={{
              marginTop: '40px',
              fontSize: '0.9rem',
              opacity: 0.4
            }}>
              {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>
      )}

      {/* Processing Stage */}
      {stage === 'processing' && (
        <div 
          className={`fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '30px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              ⏳
            </div>
            
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              fontWeight: '500',
              marginBottom: '20px'
            }}>
              Weaving Your Story...
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.7,
              marginBottom: '40px',
              fontStyle: 'italic'
            }}>
              Gathering the threads of your year
            </p>
            
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${processingProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ffd780, #ffb347)',
                borderRadius: '10px',
                transition: 'width 0.1s ease'
              }} />
            </div>
            
            <p style={{
              marginTop: '20px',
              fontSize: '0.9rem',
              opacity: 0.5
            }}>
              {processingProgress < 30 && "Reading your memories..."}
              {processingProgress >= 30 && processingProgress < 60 && "Finding the golden threads..."}
              {processingProgress >= 60 && processingProgress < 90 && "Crafting your narrative..."}
              {processingProgress >= 90 && "Almost there..."}
            </p>
          </div>
        </div>
      )}

      {/* Story Stage */}
      {stage === 'story' && (
        <div 
          className={`fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px 20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            maxWidth: '750px',
            width: '100%'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                📖
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: '600',
                marginBottom: '10px',
                background: 'linear-gradient(135deg, #ffd780 0%, #fff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {userName ? `${userName}'s 2025` : 'Your 2025'}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                opacity: 0.6,
                fontStyle: 'italic'
              }}>
                The Year in Review
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '25px',
              padding: 'clamp(30px, 5vw, 50px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '40px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              {storyImage && (
                <div style={{
                  marginBottom: '30px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
                }}>
                  <img 
                    src={storyImage} 
                    alt="Your 2025 Journey" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              )}
              <p className="story-text">
                {generatedStory}
              </p>
              
              <div style={{
                marginTop: '30px',
                paddingTop: '25px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  opacity: 0.7,
                  lineHeight: '1.8',
                  color: '#ffd780'
                }}>
                  "This isn't about guilt or fixing yourself. It's about asking:<br/>
                  What was possible? What did I learn? What could I try next time?"
                </p>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn-primary"
                onClick={() => transition('motivation')}
              >
                See Your 2026 Motivation →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Motivation Stage */}
      {stage === 'motivation' && (
        <div 
          className={`fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px 20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            maxWidth: '750px',
            width: '100%'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                🚀
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: '600',
                marginBottom: '10px',
                background: 'linear-gradient(135deg, #ffd780 0%, #fff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Your 2026 Awaits
              </h2>
              <p style={{
                fontSize: '1.1rem',
                opacity: 0.6,
                fontStyle: 'italic'
              }}>
                Rebuild • Rise • Shine
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 128, 0.1) 0%, rgba(255, 179, 71, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '25px',
              padding: 'clamp(30px, 5vw, 50px)',
              border: '1px solid rgba(255, 215, 128, 0.2)',
              marginBottom: '40px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 215, 128, 0.1)'
            }}>
              {motivationImage && (
                <div style={{
                  marginBottom: '30px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 128, 0.2)'
                }}>
                  <img 
                    src={motivationImage} 
                    alt="Your 2026 Motivation" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              )}
              <p className="story-text">
                {generatedMotivation}
              </p>
            </div>
            
            <div style={{ 
              textAlign: 'center',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                className="btn-secondary"
                onClick={() => transition('story')}
              >
                ← Back to Story
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setGeneratedStory('');
                  setGeneratedMotivation('');
                  setStoryImage('');
                  setMotivationImage('');
                  setUserName('');
                  setFadeIn(true);
                  transition('welcome');
                }}
              >
                Start Fresh
              </button>
            </div>
            
            <div style={{
              textAlign: 'center',
              marginTop: '60px',
              padding: '30px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                fontSize: '1.3rem',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                opacity: 0.8
              }}>
                "Every ending is a new beginning."
              </p>
              <p style={{
                fontSize: '0.9rem',
                opacity: 0.4,
                marginTop: '15px'
              }}>
                ✦ Rewind & Rebuild ✦
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
