/**
 * MenusController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // CREATE MENU
  create: function(req, res, next) {

    var params = req.params.all();

    Menus.create(params, function(err, menu) {
      if (err) return next(err);
      res.status(201);
      res.json(menu);
    });
  },


  findMenu: function (req, res, next) {

    var id = req.param('id');
    console.log('I was here!');

    Menus.findOne('5651e61c1d75bfed14444b74', function(err, menu){
      // if no menu exists, return not fount
      if (menu === undefined) return 'no!';
      // if error, return error
      if (err) return next (err);

      // otherwise return the json
      res.json(menu);
    })

  },

};
