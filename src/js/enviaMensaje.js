const axios = require('axios');

const sendWhatsAppMessage = async (phoneNumber, message) => {
  const response = await axios.post(
    `https://graph.facebook.com/v19.0/574899439041724/messages`,
    {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "text",
      //Content-Type: "application/json",  
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer EAAdTF8XEtYABO5j2vos6SUzZA3kGfQjuZB4OHeTTPu1i7ibzeLUeSTbSM5C43XEZBKglgdXasQQlInT1s3Ootb2FahngLcrXm7SIMSD7ZC6FHEUOqOkhBY4Sh5gcGrWgvWv4U0nZCuZCc3gKjxaJnmaVZCC66uFvxB4l6Af6yLxLT0ub0VRskdTwsOlokTAWA0WrPNicyOokrQ7ZCjbDAS3EKxbgArOpbAbWvflYaZBEBHJuZAc85Kq4tD`,
      },
    }
  );
  return response.data;
}; 


 async function enviaMensaje () {   
  // 5526988128 
  console.log("Ejecuta le funcion para enviar el Whatsapp ")
  let regreso = await sendWhatsAppMessage (525535225611, "Mensaje de prueba enviado desde una App ");   
  console.log(" se ejecuto la funcion para mandar mensajes a al Whatapp  ")
  console.log (regreso);   

};  
enviaMensaje();  