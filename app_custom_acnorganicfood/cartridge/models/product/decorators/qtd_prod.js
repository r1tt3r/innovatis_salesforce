'use strict';

module.exports = function (object, apiProduct) {
    Object.defineProperty(object, 'qtd_prod', {
        enumerable: true,
        value: apiProduct.custom.qtd_prod
    });
};
