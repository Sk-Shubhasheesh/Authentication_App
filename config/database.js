const mongoose = require('mongoose');

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,    // This option tells Mongoose to use the new URL parser provided by the MongoDB driver. It's used to parse the connection string.
        useUnifiedTopology:true  // his option enables the use of the new Server Discovery and Monitoring engine in MongoDB, which is recommended for new applications.
    })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch( (err) => {
        console.log("DB connection issues");
        console.log(err);
        process.exit(1);
    } )

}