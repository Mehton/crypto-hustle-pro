import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const detailsResponse = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const descriptionResponse = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`
        );

        if (!detailsResponse.ok || !descriptionResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const detailsJson = await detailsResponse.json();
        const descripJson = await descriptionResponse.json();

        setFullDetails({
          numbers: detailsJson.DISPLAY,
          textData: descripJson.Data,
        });
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    getCoinDetail();
  }, [params.symbol]);

  if (!fullDetails) {
    return <div>Loading...</div>; // Add a loading state
  }

  const { textData, numbers } = fullDetails;
  const coinData = textData[params.symbol];

  return (
    <>
      <h1>{coinData.FullName ? coinData.FullName : coinData.Name || "NA"}</h1>
      <img
        className="images"
        src={`https://www.cryptocompare.com${
          numbers[params.symbol].USD.IMAGEURL
        }`}
        alt={`Small icon for ${params.symbol} crypto coin`}
      />
      <div>{coinData.Description}</div>
      <br></br>
      <div>This coin was built with the algorithm {coinData.Algorithm} </div>
      <br />
      <br />
      <br />

      <table style={{ margin: "0 auto" }}>
        <tbody>
          <tr>
            <th style={{ textAlign: "center" }}>Launch Date</th>
            <td style={{ textAlign: "center" }}>
              {coinData.AssetLaunchDate || "N/A"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Website</th>
            <td style={{ textAlign: "center" }}>
              <a
                href={coinData.AssetWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coinData.AssetWebsiteUrl}
              </a>
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Whitepaper</th>
            <td style={{ textAlign: "center" }}>
              <a
                href={coinData.AssetWhitepaperUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coinData.AssetWhitepaperUrl}
              </a>
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Monetary Symbol</th>
            <td style={{ textAlign: "center" }}>{params.symbol}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Market</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.MARKET}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Last Transaction</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.LASTUPDATE}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Last Transaction Value</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.LASTVOLUME}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Volume</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.VOLUME24HOUR}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Today's Open Price</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.OPEN24HOUR}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>
              Highest Price during the Day
            </th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.HIGH24HOUR}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Lowest Price during the Day</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.LOW24HOUR}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Change from Previous Day</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.CHANGEPCT24HOUR}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Market Cap</th>
            <td style={{ textAlign: "center" }}>
              {numbers[params.symbol].USD.MKTCAP}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CoinDetail;
