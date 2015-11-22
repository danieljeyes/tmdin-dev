module.exports = function emailAddressInUse(){

// access response
  var res = this.res;

  return res.send(409, 'Email address is already taken by another user.');
};
