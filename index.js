const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log(`Online in PORT: ${process.env.PORT}`);
});
