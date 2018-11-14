let path = require('path');
let express = require('express');
let app = express();
let publicPath = path.join(__dirname, '..', 'public');
let port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server js is up')
})