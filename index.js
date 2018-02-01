/**
 * Created by alex on 31.01.18.
 */
const app = require('./app');
const port = 3000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});