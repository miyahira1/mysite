import React, { useState, useEffect } from 'react';

function Home() {
  const [weather, setWeather] = useState({ city: 'Loading...', temperature: '--', condition: '--' });
  const [prices, setPrices] = useState({ bitcoin: 'Loading...', ethereum: 'Loading...', sp500: '5,000' });

  useEffect(() => {
    // Fetch weather data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const data = await response.json();
          setWeather({
            city: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`,
            temperature: `${data.current_weather.temperature}°C`,
            condition: 'Clear' // Open-Meteo does not provide a text condition, so we set a default
          });
        } catch (error) {
          console.error("Failed to fetch weather data", error);
          setWeather({ city: 'Could not fetch weather', temperature: '--', condition: '--' });
        }
      });
    } else {
      setWeather({ city: 'Geolocation not supported', temperature: '--', condition: '--' });
    }

    // Fetch crypto prices
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        setPrices(prevPrices => ({
          ...prevPrices,
          bitcoin: `${data.bitcoin.usd.toLocaleString()}`,
          ethereum: `${data.ethereum.usd.toLocaleString()}`
        }));
      } catch (error) {
        console.error("Failed to fetch crypto prices", error);
        setPrices(prevPrices => ({ ...prevPrices, bitcoin: 'Error', ethereum: 'Error' }));
      }
    };

    fetchPrices();
    // S&P 500 data would require an API key from a service like Alpha Vantage or Financial Modeling Prep.
    // Example: const sp500Response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=YOUR_API_KEY');

  }, []);

  return (
    <main className="App-main">
      <h2>Welcome to your Dashboard</h2>
      <p>This is a standard main page created in React.</p>

      <div className="widgets-container">
        <section className="widget weather-forecast">
          <h3>Weather Forecast</h3>
          <p className="city">{weather.city}</p>
          <p className="temp">{weather.temperature}</p>
          <p className="condition">{weather.condition}</p>
        </section>

        <section className="widget financial-prices">
          <h3>Financial Markets</h3>
          <div className="price-item">
            <span className="price-label">Bitcoin:</span>
            <span className="price-value">{prices.bitcoin}</span>
          </div>
          <div className="price-item">
            <span className="price-label">Ethereum:</span>
            <span className="price-value">{prices.ethereum}</span>
          </div>
          <div className="price-item">
            <span className="price-label">S&P 500:</span>
            <span className="price-value">{prices.sp500}</span>
          </div>
        </section>

        <section className="widget news-link">
          <h3>Latest News</h3>
          <p>Check out the latest news articles.</p>
          <a href={process.env.PUBLIC_URL + '/news.html'}>Go to News</a>
        </section>
      </div>
    </main>
  );
}

export default Home;
