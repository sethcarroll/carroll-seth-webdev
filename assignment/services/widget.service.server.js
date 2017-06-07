var app = require('../../express');

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.put('/page/:pageId/widget', sortWidget);


var widgets = [
    {"_id": "123", "name": "heading1", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "name": "heading2", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {"_id": "345", "name": "image1", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/", "text": "Lorem ipsum"},
    {"_id": "456", "name": "html1", "widgetType": "HTML", "pageId": "321", "text": "<p>American Airlines Group’s total revenue passenger miles (RPMs) were a record 18.6 billion, up 3.1 percent versus April 2016. Total capacity was 22.6 billion available seat miles (ASMs), up 0.8 percent versus April 2016. Total passenger load factor was 82.2 percent, up 1.8 percentage points versus April 2016.</p>"},
    {"_id": "567", "name": "heading3", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {"_id": "678", "name": "youtube1", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "text": "Lorem ipsum"},
    {"_id": "789", "name": "html2", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.send(widget);
}

function findAllWidgetsForPage(req, res) {
    var results = [];
    for (var w in widgets) {
        if (widgets[w].pageId === req.params.pageId) {
            results.push(widgets[w]);
        }
    }
    res.json(results);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.send(widget);
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    for (var wg in widgets) {
        if (widgets[wg]._id === widgetId) {
            widgets[wg] = widget;
            res.sendStatus(200);
            return;
        }
    }
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}

function sortWidget(req, res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
    var cachedWidgets = [];
    var length = widgets.length;
    for (var i = length - 1; i >= 0; i--) {
        if (widgets[i].pageId === req.params.pageId) {
            cachedWidgets.unshift(widgets[i]);
            widgets.splice(i, 1);
        }
    }
    var widget = cachedWidgets[initial];
    cachedWidgets.splice(initial, 1);
    cachedWidgets.splice(final, 0, widget);
    widgets = widgets.concat(cachedWidgets);
    res.sendStatus(200);
}


module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        // console.log(myFile);

        // widget = getWidgetById(widgetId);
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        widget.url = '/uploads/' + filename;

        var callbackUrl = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }
}
