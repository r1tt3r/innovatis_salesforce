'use strict';
​
var server = require('server');
​
server.get('Show', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url('Newsletter-Subscribe').toString();
    var newsletterForm = server.forms.getForm('newsletter');
    newsletterForm.clear();
    res.render('/newsletter/newsletter', {
        actionURL: actionUrl,
        newsletterForm: newsletterForm
    });
    next();
});
​
server.post('Subscribe', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var newsletterForm = server.forms.getForm('newsletter');
    var transaction = require('dw/system/Transaction');
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var formErrors = require('*/cartridge/scripts/formErrors');
​
    // form validation
    if (!newsletterForm.fullName.value.split(' ')[1]) {
        newsletterForm.valid = false;
        newsletterForm.fullName.valid = false;
        newsletterForm.fullName.error =
            "Por favor preencha o nome completo";
    }
​
    if (newsletterForm.valid) {

        var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
        var Site = require('dw/system/Site');

        var newSubscribeObjects = {
            email: newsletterForm.contactInfoFields.email.value,
            fullName: newsletterForm.fullName.value,
            body: newsletterForm.subject.value,
            uri: URLUtils.https('Home-Show')
        };

        var emailObj = {
            to: newsletterForm.contactInfoFields.email.value,
            subject: 'E-mail enviado com sucesso!',
            from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganicfood.com',
            type: emailHelpers.emailTypes.registration
        };

        emailHelpers.send(emailObj, 'newsletter/newsletterEmail', newSubscribeObjects);

        res.render('/newsletter/newsletter', {
            newsletterForm: newsletterForm
        });

    }
​
    next();
});
​
module.exports = server.exports();
