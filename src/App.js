import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const color = [
    ['#333333', '#F5F5F5'],    
    ['#F5F5F5', '#333333'],
    ['#000080', '#87CEEB'],  
    ['#FFFFFF', '#0000FF'],
    ['#006400', '#00FF00'],
    ['#8B0000', '#FF0000'],
    ['#800080', '#E6E6FA'],
    ['#8B4513', '#F5F5DC']
  ];  
  const getRandomColor = () =>{
    return color[Math.floor(Math.random() * color.length)]
  }
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  let tweetUrl = "";
  useEffect(() => {
    fetchQuote();
  }, []);
  const fetchQuote = () => {
    const quoteUrl = "https://api.quotable.io/random";
    fetch(quoteUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
        const tweetText = `${quote} - ${author}`;
        tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}`;
        // Update the anchor element's href here
        document.getElementById("tweet-quote").href = tweetUrl;
        const color = getRandomColor();
        document.body.style.backgroundColor = color[0];
        document.body.style.color = color[1];
      })
      .catch((error) => {
        console.error("Fetch error", error);
      });
  };
  return (
    <div id="quote-box">
      <div id="text">{quote}</div>
      <div id="author">- {author}</div>
      <div id="buttons">
      <a
          href="https://twitter.com/intent/tweet"
          target="_blank"
          id="tweet-quote"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>        
      </div>
    </div>
  );
}

export default App;
