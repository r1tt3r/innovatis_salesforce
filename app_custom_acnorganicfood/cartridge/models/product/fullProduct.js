'use strict';

var base = module.superModule;

module.exports = function fullProduct(product, apiProduct, options) {
    //var qtd_prod = require('*/cartridge/models/product/decorators/qtd_prod');
    base.call(this, product, apiProduct, options);
    //qtd_prod(product,apiProduct);

    return product;
};
