import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApiPage.css"
// import millify from "millify";


const SinglePage = () => {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins"
        );
        const data = await response.data
        console.log(data);

        setCoin(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCoinData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th></th>
            <th>price</th>
            <th>24h</th>
            <th>24h Volume</th>
            <th>Market</th>
            <th>Last 7 days</th>
          </tr>
        </thead>

        <tbody>
          {coin.map((coin, index) => (
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
              <span style={{marginRight: '1rem'}}>
                {/* eslint-disable-next-line */}
                  <img src={coin.image.thumb} />
                </span>
                <span>{coin.id}</span>
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.market_data.current_price.usd}</td>
              <td>{coin.market_data.market_cap_change_percentage_24h.toFixed(2) + "%"}</td>
              <td>{`$ ${Number(coin.market_data.market_cap_change_24h_in_currency['usd']).toLocaleString()}`}</td>
              <td>{`$ ${Number(coin.market_data.market_cap['usd']).toLocaleString()}`}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SinglePage;
