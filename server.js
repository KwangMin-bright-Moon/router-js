const express = require('express');
const path = require('path');
const app = express();

app.use(
  '/static',
  express.static(path.resolve(__dirname, 'frontend', 'static'))
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(5500, () => console.log('Server started on port 5500'));
