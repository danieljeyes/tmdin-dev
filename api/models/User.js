/**
* User.js
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
    email: {
      type: 'email',
      unique: true
    },
    visablename:{
      type: 'string',
      unique: true
    },
    fname: {
      type: 'string',
      required: true
    },
    lname: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      required: true,
      enum: ['pending', 'confirmed', 'withdrawn'],
      defaultsTo: 'pending'
    },
    groups: {
      type: 'array',
      enum: ['admin', 'user', 'cook'],
      defaultsTo: 'user'
    },
    city: {
      type: 'string',
      required: true
    },
    encryptedPassword: {
      type: 'string',
      required: true
    },
    gravatarUrl: {
      type: 'string',
      required: true
    },
    menus: {
      collection: 'menus',
      via: 'owner'
    }
  },
  };
