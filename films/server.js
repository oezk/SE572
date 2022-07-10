const app = require("./app");
const { DB_URI } = require("./src/conifg");
const mongoose = require("mongoose");
mongoose.connect(DB_URI);

app.listen(3001, () => {
    console.log("running on port 3001");
    console.log("--------------------------");

});