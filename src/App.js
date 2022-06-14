import './App.css';
import React, { useState, useEffect } from 'react';
import quotes from './quotes.json';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

function App() {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quoteGen, toggleQuoteGen] = useState(false);

  useEffect(() => {
    if(!quoteGen) {
      setTimeout(()=>{
        const index = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[index].quote);
        setAuthor(quotes[index].name);
        toggleQuoteGen(true);
      },500);
    }
  }, [quoteGen]);


  return (
    <div className="App">
      <h5>Office Quotes Generator</h5>
      <Transition in={quoteGen} timeout={duration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            <div id="quoteContainer">
              <p className={quoteGen ? 'fade-text' : 'fade-text-too'}>{quote}</p>
              <p id="quoteGenius" className={quoteGen ? 'fade-text' : 'fade-text-too'}>{author}</p>
            </div>
          </div>
        )}
      </Transition>
      <div id="buttonContainer" onClick={() => { toggleQuoteGen(false) }}>
        <a href="#" id="quoteButton">Generate Quote</a>
      </div>
    </div>
  );
}

export default App;
