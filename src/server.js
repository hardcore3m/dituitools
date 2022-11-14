var express = require('express');
var cookieParser = require('cookie-parser');
require('dotenv').config()
var path = require('path');
var app = express();

var cors = require('cors')

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static('./public'));
app.use(cors());

var indexRouter = require('./routes/index.routes');
var applicationsRouter = require('./routes/applications.routes');
var paradigmsRouter = require('./routes/paradigms.routes');
var bookmarksCategoryRouter = require('./routes/bookmarkCategory.routes');

app.use('/applications', applicationsRouter);
app.use('/paradigms', paradigmsRouter);
app.use('/bookmarks/categories', bookmarksCategoryRouter);
app.use('/', indexRouter);

function Main() {
    let startTime = new Date()
    console.log(`Main Function Loaded at ${startTime.toDateString()} ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`);

}

const dbconfig = require("../config/dbconfig");
const db = require("./models");
db.mongoose
    .connect(`${dbconfig}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        Main();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});