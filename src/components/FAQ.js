import React, { useEffect, useState } from 'react';
import "./FAQ.css";

function FAQ() {
  const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/FAQ/');
                const jsonData = await response.json();
                setEntries(jsonData);
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <>
    
    <div className="faq-container">
    <div className="h">FAQ</div>
        {entries.map(item => (
            <div key={item.id} className="faq-question">
                <strong>Q: {item.question}</strong>
                    <p>A: {item.answer}</p>
            </div>
        ))}
    </div>
    </>
  );
}

export default FAQ;
