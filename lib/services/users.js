"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;

var _connectionManager = require("../connectionManager");

/**
 * Get all the users.
 **/
function getAll() {
  return (0, _connectionManager.getConnection)().select('*').from('users');
}