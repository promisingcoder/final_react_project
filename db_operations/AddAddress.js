const {Address  } = require("../models/UserSchema")
const {mongoose}  =  require("mongoose")


conn =  process.env.conn_string
async function AddAddress(AddressObj){

    await mongoose.connect(conn)
    let  address =  new Address({...AddressObj});
    return address

}
module.exports = AddAddress
