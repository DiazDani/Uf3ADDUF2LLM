const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

port = 3010;

app.listen(port, ()=>{
  console.log(`el port::${port} funciona`)
});
