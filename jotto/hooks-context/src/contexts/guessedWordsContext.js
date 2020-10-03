import React from "react";

const guessedWordsContext = React.createContext();

/**
 * @function useGuessedWords
 * @returns {array} guessedWordsCOntext value
 */
function useGuessedWords() {
  const context = React.useContext(guessedWordsContext);

  if (!context) {
    throw new Error("useGuessedWords must be used within GuessedWords");
  }
  return context;
}

function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(
    () => [guessedWords, setGuessedWords],
    guessedWords
  );

  return <guessedWordsContext.Provider value={value} {...props} />;
}

export default { GuessedWordsProvider, useGuessedWords };
