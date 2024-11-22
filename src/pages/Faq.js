import React, { useEffect , useState} from "react";
import Sidebar from "../components/Sidebar";
import "./Faq.css";

const FaqPage = () => {
    const [userData, setUserData] = useState({
        name: "USER",
        points: 0,
      });

    useEffect(() => {
        const name = localStorage.getItem("name") || "Login to see profile!";
        const points = parseInt(localStorage.getItem("loyalty_score"), 10) || 0;
    
        setUserData({ name, points });

      }, []);

      const handleNavigate = (path) => {
        window.location.href = path;
      };
  const faqItems = [
    {
      id: 1,
      question: "Question",
      answer: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      id: 2,
      question: "Question",
      answer: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      id: 3,
      question: "Question",
      answer: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      id: 4,
      question: "Question",
      answer: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      id: 5,
      question: "Question",
      answer: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
  ];

  return (
    <div className="faq-page">
     <Sidebar userData={userData} onNavigate={handleNavigate} />
      <main className="main-content">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqItems.map((item) => (
            <div key={item.id} className="faq-item">
              <h2 className="faq-question">{item.question}</h2>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FaqPage;
