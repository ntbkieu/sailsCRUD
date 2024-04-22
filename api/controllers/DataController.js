/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  add: function (req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let message = req.body.message;

    Data.create({ name: name, phone: phone, message: message }).exec((err) => {
      if (err) {
        res.send(500, { err: 'Database error' });
      }

      res.redirect('/');
      alert('Submit successfully');
    });
  }

};

