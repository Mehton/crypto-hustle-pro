import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinInfo({ image, name, symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        console.error("Error fetching coin price:", error);
      }
    };

    getCoinPrice();
  }, [symbol]);

  return price ? (
    <li className="main-list" key={symbol}>
      <Link
        style={{ color: "White" }}
        to={`/CoinDetail/${symbol}`}
        key={symbol}
      >
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`}
          alt={`Small icon for ${name} crypto coin`}
        />
        {name} <span className="tab"></span> ${price.USD} USD
      </Link>
    </li>
  ) : null;
}

export default CoinInfo;
