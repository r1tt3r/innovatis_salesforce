'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();

    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct(viewData.product.id);

    var recommendations = [];

    product
        .getRecommendations()
        .toArray()
        .forEach(function (item) {
            recommendations.push(item.recommendedItem.ID);
        });

    viewData.product.recommendations = recommendations;

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
