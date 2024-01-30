const { connect } = require("mongoose");
const { MONGO_URL, DB_NAME } = require("dotenv").config().parsed;
const connect_to_db = async () => {
  connect(MONGO_URL + "/" + DB_NAME)
    .then(() => console.log("connection good with mongodb -_^"))
    .catch((err) => console.log(err));
};

connect_to_db()