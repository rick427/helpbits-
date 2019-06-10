const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello from express server'));

const port = 5000;
app.listen(port, () => console.log(`Server connected on port ${port}`));