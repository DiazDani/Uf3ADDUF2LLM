const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

port = 3010;

app.listen(port, ()=>{
  console.log(`el port::${port} funciona`)
});
var admin = require("firebase-admin");

var serviceAccount = require("./exdanidiaztorio-firebase-adminsdk-zuxza-78220fd102.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.post('/DaniDiaz/mvp/:nom_jugador', async (req, res) => {
  const nomJugador = req.params.nom_jugador;
  const docRef = db.collection('qatar22Diaz').doc('final22Diaz');
  try {
    await docRef.update({
      millor_jugador: nomJugador
    });

    res.status(200).send('afegit correctament.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al actualizar el document.');
  }
});

app.get('/DaniDiaz/jugadors', async (req, res) => {
  try {
    const snapshot = await db.collection('final22Diaz').get();
    let jugadorUnGol = null;

    snapshot.forEach((doc) => {
      const jugador = doc.data().info.find((info) => info.gols.length === 1);

      if (jugador) {
        jugadorUnGol = jugador.equip;
      }
    });

    if (jugadorUnGol) {
      res.status(200).json({ jugador: jugadorUnGol });
    } else {
      res.status(404).send('cap jugador te només un gol.');
    }
  } catch (error) {
    console.error('error al obtener les dades:', error);
    res.status(500).send('error al obtener les dades.');
  }
});
