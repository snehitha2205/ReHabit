import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Heart, CheckCircle, Sparkles } from "lucide-react";

export default function AboutPage() {
  const sections = [
    {
      title: "What is HabitSync?",
      content: `HabitSync is a simple yet powerful tool designed to help you take control of your daily life, one habit at a time. We all have dreams and goals — but reaching them starts with consistent action. HabitSync transforms those big ambitions into small, achievable steps that fit naturally into your day.

With HabitSync, you can easily create, track, and maintain habits that align with your lifestyle and aspirations. Whether it's waking up early, reading every night, drinking more water, or learning a new skill, our system helps you stay consistent by visualizing your growth and celebrating every win.`,
      position: "left",
      icon: Target,
      slideFrom: "left"
    },
    {
      title: "How is HabitSync useful?",
      content: `Most of us start new habits with excitement, only to lose motivation after a few days. HabitSync solves that by keeping you accountable in a gentle, rewarding way. You can track your daily, weekly, and monthly performance with simple streak visuals, insightful progress charts, and personalized reminders that keep you on track without overwhelming you.

HabitSync also helps you understand your behavior patterns — showing which habits you stick to and where you might need a little extra push. It's not just about checking boxes — it's about understanding yourself and making mindful, lasting changes.`,
      position: "right",
      icon: TrendingUp,
      slideFrom: "right"
    },
    {
      title: "Why choose HabitSync?",
      content: `There are countless habit trackers out there — so why choose ours?

Because HabitSync isn't just another productivity app. It's a habit companion. We built it to make your journey genuinely motivating, not mechanical. Our interface is clean, distraction-free, and built to make you feel good about your progress.

We focus on emotion as much as efficiency — using encouraging visuals, small motivational quotes, and progress reflections that remind you why you started. Your data stays private, your achievements feel personal, and your goals stay within reach.`,
      position: "left",
      icon: Heart,
      slideFrom: "left"
    },
    {
      title: "How to use HabitSync?",
      content: `Getting started is effortless:

1. Sign up to create your personal dashboard.
2. Add habits you want to build or break — like "Exercise 30 mins," "No sugar," or "Read 10 pages."
3. Track daily — check off each habit as you complete it.
4. Stay motivated with progress streaks, achievements, and subtle reminders.
5. Reflect every week — see what's working and adjust your goals easily.

That's it! With HabitSync, every small win adds up. You'll begin to see patterns, improve consistency, and watch as your discipline turns into your superpower.`,
      position: "right",
      icon: CheckCircle,
      slideFrom: "right"
    },
    {
      title: "Ready to begin your journey?",
      content: `Success doesn't come overnight — it's built one habit at a time. HabitSync gives you the structure, insight, and motivation to stay on track even when life gets busy. Whether you're chasing fitness goals, personal growth, or just trying to be a better version of yourself, HabitSync will help you get there — steadily, confidently, and joyfully.

Start your transformation today and discover what consistent action can truly do.`,
      position: "center",
      icon: Sparkles,
      slideFrom: "bottom"
    },
  ];

  return (
    <div className="about-page-wrapper">
      <div className="about-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Add this to your About page CSS */
.about-page-wrapper {
  background: linear-gradient(135deg, #1a1a1d 0%, #2a1a2d 100%);
  min-height: 100vh;
  width: 100%;
}

.about-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1d 0%, #2a1a2d 100%);
  color: #fffafe;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 20px 80px;
  gap: 100px;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
  position: relative;
  width: 100%; /* Ensure full width */
}

        /* Floating background bubbles */
        .about-container::before,
        .about-container::after {
          content: '';
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 20s infinite ease-in-out;
          z-index: 0;
        }

        .about-container::before {
          width: 500px;
          height: 500px;
          background: #d6304c;
          top: -100px;
          left: -150px;
        }

        .about-container::after {
          width: 400px;
          height: 400px;
          background: #da746f;
          bottom: -100px;
          right: -150px;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 30px) scale(1.1);
          }
        }

        .bubble-section {
          position: relative;
          max-width: 900px;
          width: 100%;
          z-index: 1;
        }

        .bubble-card {
          background: rgba(255, 250, 254, 0.05);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(214, 48, 76, 0.3);
          border-radius: 40px;
          padding: 50px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .bubble-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(214, 48, 76, 0.1) 0%,
            transparent 70%
          );
          animation: bubble-glow 8s infinite;
          pointer-events: none;
        }

        @keyframes bubble-glow {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: translate(20%, 20%);
            opacity: 0.8;
          }
        }

        .bubble-card:hover {
          transform: translateY(-10px);
          border-color: rgba(214, 48, 76, 0.6);
          box-shadow: 
            0 20px 60px rgba(214, 48, 76, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Icon Container */
        .icon-container {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #d6304c, #da746f);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(214, 48, 76, 0.4);
          position: relative;
          z-index: 2;
        }

        .icon-container::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d6304c, #da746f);
          opacity: 0.3;
          filter: blur(10px);
          z-index: -1;
          animation: icon-pulse 3s infinite;
        }

        @keyframes icon-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        .bubble-card:hover .icon-container {
          animation: icon-bounce 0.6s ease;
        }

        @keyframes icon-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Content wrapper */
        .content-wrapper {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        /* Decorative bubbles */
        .bubble-decoration {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(218, 116, 111, 0.4),
            rgba(214, 48, 76, 0.2)
          );
          filter: blur(1px);
          pointer-events: none;
        }

        .bubble-1 {
          width: 80px;
          height: 80px;
          top: -30px;
          right: 40px;
          animation: float-bubble 6s infinite ease-in-out;
        }

        .bubble-2 {
          width: 50px;
          height: 50px;
          bottom: 30px;
          left: 30px;
          animation: float-bubble 8s infinite ease-in-out 1s;
        }

        .bubble-3 {
          width: 30px;
          height: 30px;
          top: 50%;
          right: -10px;
          animation: float-bubble 7s infinite ease-in-out 2s;
        }

        @keyframes float-bubble {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
          }
        }

        .bubble-title {
          color: #d6304c;
          font-size: 2.5rem;
          margin-bottom: 25px;
          font-weight: 700;
          position: relative;
          display: inline-block;
          text-shadow: 0 2px 10px rgba(214, 48, 76, 0.3);
        }

        .bubble-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #d6304c, #da746f);
          border-radius: 2px;
          animation: line-grow 0.8s ease-out;
        }

        @keyframes line-grow {
          from {
            width: 0;
          }
          to {
            width: 60px;
          }
        }

        .bubble-text {
          font-size: 1.1rem;
          color: #fffafe;
          opacity: 0.95;
          line-height: 1.9;
          white-space: pre-line;
        }

        .position-left {
          margin-right: auto;
        }

        .position-right {
          margin-left: auto;
        }

        .position-center {
          margin-left: auto;
          margin-right: auto;
        }

        .center-content {
          text-align: center;
          flex-direction: column;
          align-items: center;
        }

        .try-now-btn {
          display: inline-block;
          margin-top: 40px;
          background: linear-gradient(135deg, #da746f, #d6304c);
          color: #fffafe;
          padding: 18px 50px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.2rem;
          text-decoration: none;
          box-shadow: 
            0 10px 30px rgba(214, 48, 76, 0.4),
            0 0 20px rgba(218, 116, 111, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .try-now-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .try-now-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .try-now-btn:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 15px 40px rgba(214, 48, 76, 0.5),
            0 0 30px rgba(218, 116, 111, 0.4);
        }

        .try-now-btn:active {
          transform: translateY(-1px);
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1d;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d6304c, #da746f);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #d6304c;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .about-container {
            padding: 80px 15px 60px;
            gap: 70px;
          }

          .bubble-card {
            padding: 40px 25px;
            border-radius: 30px;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .icon-container {
            width: 70px;
            height: 70px;
          }

          .bubble-title {
            font-size: 2rem;
          }

          .bubble-text {
            font-size: 1rem;
          }

          .try-now-btn {
            padding: 15px 40px;
            font-size: 1.1rem;
          }

          .bubble-1 {
            width: 60px;
            height: 60px;
          }

          .bubble-2 {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      {sections.map((sec, index) => {
        const IconComponent = sec.icon;
        const slideDirection = sec.slideFrom === "left" ? -100 : 
                              sec.slideFrom === "right" ? 100 : 0;
        const slideY = sec.slideFrom === "bottom" ? 100 : 0;
        
        return (
          <motion.section
            key={index}
            className={`bubble-section position-${sec.position}`}
            initial={{ 
              opacity: 0, 
              x: slideDirection,
              y: slideY,
              scale: 0.9,
              rotate: sec.slideFrom === "left" ? -5 : sec.slideFrom === "right" ? 5 : 0
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0
            }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.15,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className={`bubble-card ${sec.position === "center" ? "center-content" : ""}`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bubble-decoration bubble-1"></div>
              <div className="bubble-decoration bubble-2"></div>
              <div className="bubble-decoration bubble-3"></div>
              
              <motion.div 
                className="icon-container"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.15 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                <IconComponent size={40} color="#fffafe" strokeWidth={2.5} />
              </motion.div>

              <div className="content-wrapper">
                <motion.h2 
                  className="bubble-title"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {sec.title}
                </motion.h2>
                
                <motion.p 
                  className="bubble-text"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {sec.content}
                </motion.p>

                {sec.title === "Ready to begin your journey?" && (
                  <motion.a
                    href="/dashboard"
                    className="try-now-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: index * 0.15 + 0.6 }}
                    viewport={{ once: true }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Try Now</span>
                  </motion.a>
                )}
              </div>
            
            </motion.div>
          </motion.section>
        );
      })}
    </div>
      </div>
  );
}