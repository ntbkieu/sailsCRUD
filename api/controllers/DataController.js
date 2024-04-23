/* eslint-disable linebreak-style */
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

    // Create a new record in the Data model
    Data.create({ name: name, phone: phone, message: message }).exec((err, newData) => {
      if (err) {
        return res.serverError(err); // Return server error on database error
      }

      // Redirect to home page after successful submission
      res.redirect('/list');
    });
  },


  list: function (req, res) {
    Data.find({}).exec(function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      res.view('pages/list', { list: data });
    });
  },

  edit: function (req, res) {
    let userId = req.param('id');
    Data.findOne({ id: userId }).exec((err, user) => {
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound('User not found');
      }
      res.view('pages/edit', { user: user });
    });
  },

  update: function (req, res) {
    let userId = req.param('id');
    let name = req.body.name;
    let phone = req.body.phone;
    let message = req.body.message;

    Data.updateOne({ id: userId })
      .set({ name: name, phone: phone, message: message })
      .exec((err, updatedUser) => {
        if (err) {
          return res.serverError(err);
        }
        res.redirect('/list');
      });
  },

  delete: function (req, res) {
    let userId = req.param('id');
    Data.destroy({ id: userId }).exec((err) => {
      if (err) {
        return res.serverError(err);
      }
      res.ok('User deleted successfully');
    });
  }

};

