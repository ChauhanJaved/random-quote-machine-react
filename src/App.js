import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const color = [
    "#673AB7", // Deep Purple
    "#00796B", // Dark Teal
    "#800000", // Burgundy
    "#FF5722", // Dark Orange
    "#004D40"  // Midnight Green
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
        document.body.style.backgroundColor = color;
        document.body.style.color = color;
        document.getElementById("new-quote").style.backgroundColor = color;
        document.getElementById("new-quote").style.color = "#FFFFFF";
        document.getElementById("tweet-quote").style.color = color;

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
          id="tweet-quote"
          href="https://twitter.com/intent/tweet"
          target="_blank"          
        >          
          Tweet Quote
        </a>
        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>        
      </div>
    </div>
  );
}

export default App;
