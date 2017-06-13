var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widget) {
            pageModel.addWidget(pageId, widget._id);
            return widget;
        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        // remember to sort each time you use find().
        .sort('order')
        .populate('_page')
        .exec(function(err, docs) { return docs; });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(widgetId);
        });
}

function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({_page: pageId}, function (err, docs) {
            widgets = docs.map(function (d) { return d.toObject() });
            var widget = widgets[start];
            widgets.splice(start, 1);
            widgets.splice(end, 0, widget);

            for (var w in widgets) {
                widgets[w].order = w;
            }

            return widgetModel.remove({_page: pageId}, function(err, docs) {
                return widgetModel.create(widgets, function (err, docs) { return docs; });
            });
        })
        .sort('order')
        .exec(function(err, docs) { return docs; });
}