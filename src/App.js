import React, { useEffect, useState } from "react";
import CurrencyRow from "./components/CurrencyRow";

const currencyApiLink = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState("");
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let fromAmount, toAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    fetch(currencyApiLink)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setcurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
    }

    if (
      fromCurrency != null &&
      toCurrency != null &&
      fromCurrency !== toCurrency
    ) {
      fetch(`${currencyApiLink}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          try {
            setExchangeRate(data.rates[toCurrency]);
          } catch (error) {
            console.log(error);
            alert(error);
          }
        });
    }
  }, [fromCurrency, toCurrency]);

  return (
    <>
      <div className="title">Currency Converter</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        handleCurrencyChange={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleInputChange={handleFromAmountChange}
      />
      <div className="equal-sign">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        handleCurrencyChange={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        handleInputChange={handleToAmountChange}
      />
    </>
  );
}

export default App;
