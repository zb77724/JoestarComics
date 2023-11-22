const whiteList = [
    "http://localhost:3101",
    "http://localhost:3000",
    "undefined"
];

const corsConfig = {
    origin: whiteList,
    credentials: true
}

module.exports = corsConfig;