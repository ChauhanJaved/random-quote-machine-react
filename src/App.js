import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  let tweetUrl = '';
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
        tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
        // Update the anchor element's href here
        document.getElementById("tweet-quote").href = tweetUrl;
      })
      .catch((error) => {
        console.error("Fetch error", error);
      });
  };
  return (
    <div id="quote-box">
      <div id="text">{quote}</div>
      <div id="author">{author}</div>
      <button id="new-quote" onClick={fetchQuote}>
        New Quote
      </button>
      <a href='' target="_blank"  id="tweet-quote">
        Twitter
      </a>
    </div>
  );
}

export default App;
