const User = require('../models/UserSchema');
const {mongoose}  =  require("mongoose")

await user.save();
await mongoose.connect(conn)