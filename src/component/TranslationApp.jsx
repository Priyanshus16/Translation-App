
import React, { useState } from 'react';
import axios from 'axios';

const TranslationApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translateText = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage}|${targetLanguage}`
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Translation Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
        
      <h1>Translation App</h1>
      <h3>Note</h3> <p>use language symbol for translation (en) - english</p>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />
      <div className="dropdowns">
        <input
            className='input'
          type="text"
          placeholder="Source Language"
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
        />
        <input
        className='input'
          type="text"
          placeholder="Target Language"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        />
      </div>
      <button onClick={translateText} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
      <div className="result-container">
        <h2 className="result-heading">Translated Text:</h2>
        <p className="result-text">{translatedText}</p>
      </div>
    </div>
  );
};

export default TranslationApp;
