const app = require('./App');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('server is running');
});
