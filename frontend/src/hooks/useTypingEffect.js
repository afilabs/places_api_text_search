import { useState, useEffect } from "react";

const useTypingEffect = (text, baseSpeed = 100) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    let index = 0;

    const typeCharacter = () => {
      setDisplayedText(text.slice(0, index + 1));
      index++;


      if (index < text.length) {
        const nextChar = text[index];

        // Set a random speed, slower for spaces and punctuation
        const randomSpeed =
          baseSpeed +
          (nextChar === " " || [".", ",", "!", "?"].includes(nextChar)
            ? Math.floor(Math.random() * 120) + 100 // Longer pause for spaces/punctuation
            : Math.floor(Math.random() * 70)); // Smaller variation for other characters

        setTimeout(typeCharacter, randomSpeed);
      }
    };

    
    typeCharacter(); // Start typing effect

    return () => setDisplayedText(""); // Clean up on text change or unmount
  }, [text]);

  console.log(text);

  return displayedText;
};

export default useTypingEffect;


