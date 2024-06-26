/* eslint-disable linebreak-style */
/**
 * Data.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    message: { type: 'string' }

  },

};

