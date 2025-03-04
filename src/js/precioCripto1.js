
//const { response } = require('express');

async function getBitcoinPrice() {

  const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCMXN' )
  
  const data = await response.json();  
  console.log(data.price); 

}
getBitcoinPrice();