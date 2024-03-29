/**
* Menus.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	id: {
      type: 'integer',
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: 'string',
      required: true
    },
    teaser: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    category: {
      type: 'array',
      required: true
    },
    images: {
      type: 'array',
      required: true
    },
    dateofdinner: {
    	type: 'date',
    	required: true,
      defaultsTo: '2015-08-09T22:00:00.000Z'
    },
    price: {
      type: 'integer',
      required: 'true'
    },
    ingrediants: {
      type: 'array',
      required: true
    },
    starter: {
      type: 'string',
    },
    aperatief: {
      type: 'string',
    },
    main: {
      type: 'string'
    },
    desert: {
      type: 'string'
    },
    drinks: {
      type: 'array'
    },
    sides: {
      type: 'array'
    },
    status: {
      type: 'string',
      required: true,
      enum: ['draft', 'pending', 'aproved', 'withdrawn'],
      defaultsTo: 'draft'
    },
    owner: {
      model: 'user'
    }
  },
};
