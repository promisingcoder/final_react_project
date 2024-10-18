const express = require("express");
var cors = require('cors')
const bcrypt = require('bcrypt')
const registerRoute = require('./routes/SignUp');
const loginRoute = require('./routes/SignIn');
const AddAddressRoute = require("./routes/AddAddressRoute")
const AddToCartRoute = require("./routes/AddToCartRoute")
const DeleteFromCartRoute = require("./routes/DeleteFromCartRoute");
const { GetProducts } = require("./db_operations/GetProducts");
const {mongoose}  =  require("mongoose")
const getLatestRoute =  require("./routes/LatestRoute")
async function main(){
const app = express();
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json())
await mongoose.connect(conn)
app.post('/register', registerRoute);
app.post('/login',loginRoute)
app.post("/AddAddress",AddAddressRoute);
app.post("/AddToCart",AddToCartRoute)
app.post("/DeleteFromCart",DeleteFromCartRoute)
app.get("/products",(req,res) => {
  GetProducts(process.env.conn_string).then((data) => res.json(data))

})
app.get("/latest",getLatestRoute)

const port = 3000;





app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
}
main()