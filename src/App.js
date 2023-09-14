import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const gemstoneColors = [
    { name: "Amethyst", color: "#64609A" },
    { name: "Citrine", color: "#933709" },
    { name: "Emerald", color: "#14A989" },
    { name: "Jade", color: "#469A84" },
    { name: "Jasper", color: "#D05340" },
    { name: "Lapis Lazuli", color: "#436CB9" },
    { name: "Malachite", color: "#469496" },
    { name: "Moonstone", color: "#3AA8C1" },
    { name: "Onyx", color: "#353839" },
    { name: "Peridot", color: "#ABAD48" },
    { name: "Pink Pearl", color: "#B07080" },
    { name: "Rose Quartz", color: "#BD559C" },
    { name: "Ruby", color: "#AA4069" },
    { name: "Sapphire", color: "#2D5DA1" },
    { name: "Smokey Topaz", color: "#832A0D" },
    { name: "Tiger's Eye", color: "#B56917" }
  ];
  
  const getRandomColor = () =>{
    return gemstoneColors[Math.floor(Math.random() * gemstoneColors.length)]
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
        const randomColor = getRandomColor();
        document.body.style.backgroundColor = randomColor.color;
        document.body.style.color = randomColor.color;
        document.getElementById("new-quote").style.backgroundColor = randomColor.color;
        document.getElementById("new-quote").style.color = "#FFFFFF";
        document.getElementById("tweet-quote").style.color = randomColor.color;

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
