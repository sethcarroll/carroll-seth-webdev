var app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');

// for image uploads
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.put('/page/:pageId/widget', reorderWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);


function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;

    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.send(err);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.send(err);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.send(err);
        });
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function reorderWidget(req, res) {
    var start = req.query['start'];
    var end = req.query['end'];
    var pageId = req.params.pageId;

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.send(err);
        });
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget){
            widget.url = '/assignment/uploads/' + filename;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function () {
                    var callbackUrl   = "/assignment/#/user/" + userId + "/website/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    res.send(err);
                });
        });
}