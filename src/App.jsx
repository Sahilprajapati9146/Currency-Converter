import { useState } from "react";
import axios from "axios";

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const convert = async () => {
    try {
      
      const res = await axios.get(
        `https://open.er-api.com/v6/latest/${from}`
      );

      console.log("API Response:", res.data);

      if (res.data && res.data.rates && res.data.rates[to]) {
        const rate = res.data.rates[to];
        setResult(rate * amount);
      } else {
        alert("Conversion failed. Invalid response.");
      }
    } catch (error) {
      console.error(error);
      alert("Conversion failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>💱 Currency Converter</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option>USD</option>
        <option>INR</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>

      <span> ➝ </span>

      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option>USD</option>
        <option>INR</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>

      <button onClick={convert}>Convert</button>

      {result && (
        <h2>
          {amount} {from} = {result.toFixed(2)} {to}
        </h2>
      )}
    </div>
  );
}

export default App;
