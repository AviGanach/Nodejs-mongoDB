const express = require("express");
// const cors = require("cors");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const checkAuth = require("./api/middlewares/checkAuth");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.jspmdy3.mongodb.net/test?retryWrites=true&w=majority`)
mongoose.connection.on('connected',() => {
    console.log("mongodb connected");
})

const articleRoutes = require("./api/routes/articles");
const categoryRoutes = require("./api/routes/categories");
const usersRoutes = require("./api/routes/users");

// app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
});
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));

app.use("/articles", articleRoutes);
app.use("/categories", checkAuth, categoryRoutes);
app.use("/users", usersRoutes);

app.use((req, res, next) => {
    const error = new Error("Error loading");
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({ error:{ message: error.message} });
})

module.exports = app;
