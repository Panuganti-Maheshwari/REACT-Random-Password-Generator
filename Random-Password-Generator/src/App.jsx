import { useState, useEffect } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let passPool = '';

    if (lowercaseAllowed) passPool += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercaseAllowed) passPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbersAllowed) passPool += '0123456789';
    if (symbolsAllowed) passPool += "!@#$%^&*()_+-=[]{}/?<>.|:;~'";

    if (passPool === '') {
      setPassword('');
      return;
    }

    let tempPass = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * passPool.length);
      tempPass += passPool[randomIndex];
    }

    setPassword(tempPass);
  };

  useEffect(() => {
    let passPool = '';

    if (lowercaseAllowed) passPool += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercaseAllowed) passPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbersAllowed) passPool += '0123456789';
    if (symbolsAllowed) passPool += "!@#$%^&*()_+-=[]{}/?<>.|:;~'";

    if (passPool === '') {
      setPassword('');
      return;
    }

    let tempPass = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * passPool.length);
      tempPass += passPool[randomIndex];
    }

    setPassword(tempPass);
  }, [passwordLength, uppercaseAllowed, lowercaseAllowed, numbersAllowed, symbolsAllowed]);

  const copyPassword = () => {
    if (password === '') return;

    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      generatePassword();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Random Password Generator
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-5">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Select at least one option"
            className="w-full px-3 py-2 rounded bg-gray-700 text-green-400 font-mono outline-none"
          />
          <button
            onClick={copyPassword}
            disabled={password === ''}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium shrink-0"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="mb-5">
          <label htmlFor="lengthSlider" className="block text-sm mb-2">
            Password length: {passwordLength}
          </label>
          <input
            id="lengthSlider"
            type="range"
            min={4}
            max={50}
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <input
              id="uppercase"
              type="checkbox"
              checked={uppercaseAllowed}
              onChange={() => setUppercaseAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="uppercase" className="cursor-pointer">
              Uppercase
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="lowercase"
              type="checkbox"
              checked={lowercaseAllowed}
              onChange={() => setLowercaseAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="lowercase" className="cursor-pointer">
              Lowercase
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="numbers"
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numbers" className="cursor-pointer">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="symbols"
              type="checkbox"
              checked={symbolsAllowed}
              onChange={() => setSymbolsAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="symbols" className="cursor-pointer">
              Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

