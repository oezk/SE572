let DB_URI = "mongodb://192.168.0.221:27017/newdb1";

if (process.env.MONGO_DB_URI) {
    DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
    DB_URI
};