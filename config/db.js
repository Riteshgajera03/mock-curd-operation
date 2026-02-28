const mongooes = require("mongoose");

mongooes.connect("mongodb://localhost:27017/crud")
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(err);
})
module.exports = mongooes;
