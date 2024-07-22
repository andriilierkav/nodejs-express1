const Contact = require("../models/contacts");

const AbstractController = require('./abstract-controller');
class ContactController extends AbstractController {
    getContacts = (req, res) => {
        const title = 'Contacts Page';
        Contact.find().then(contacts => {
            res.render(this.createPath('contacts'), { title, contacts });
        }).catch((error) => {
            this.logger.log(error);
        });
    }
}

module.exports = ContactController;