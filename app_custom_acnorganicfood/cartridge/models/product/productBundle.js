'use strict';

var base = module.superModule;

module.exports = function bundleProduct(product, apiProduct, options,factory) {
    var qtd_prod = require('*/cartridge/models/product/decorators/qtd_prod');
    base.call(this, product, apiProduct, options, factory);
    qtd_prod(product,apiProduct);
    return product;
};
