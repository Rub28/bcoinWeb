const axios = require('axios');

async function getBitcoinPrice() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCMXN');
    console.log('Precio de Bitcoin (BTCMXN):', response.data.price);
    // BTCUSDT  
  } catch (error) {
    console.error('Error:', error.message);
  } 
  // bde3ace6-c6f0-4168-908e-b0385b4c922d
}

getBitcoinPrice();