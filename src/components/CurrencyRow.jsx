import React from "react";

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    handleCurrencyChange,
    amount,
    handleInputChange,
  } = props;
  return (
    <div className="currency-row">
      <input type="number" value={amount} onChange={handleInputChange} />
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
