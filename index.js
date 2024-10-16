const express = require("express");
var cors = require('cors')
const bcrypt = require('bcrypt')
const registerRoute = require('./routes/SignUp');
const loginRoute = require('./routes/SignIn');
const AddAddressRoute = require("./routes/AddAddressRoute")
const AddToCartRoute = require("./routes/AddToCartRoute")
const DeleteFromCartRoute = require("./routes/DeleteFromCartRoute")

conn_string  = process.env.conn_string

const app = express();
app.use(cors())
app.use(express.json())
app.post('/register', registerRoute);
app.post('/login',loginRoute)
app.post("/AddAddress",AddAddressRoute);
app.post("/AddToCart",AddToCartRoute)
app.post("/DeleteFromCart",DeleteFromCartRoute)
const port = 3001;





app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});