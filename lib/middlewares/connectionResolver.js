"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolve = resolve;

var _continuationLocalStorage = require("continuation-local-storage");

var _connectionManager = require("../connectionManager");

// Create a namespace for the application.
var nameSpace = (0, _continuationLocalStorage.createNamespace)('unique context');
/**
 * Get the connection instance for the given tenant's slug and set it to the current context.
 */

function resolve(req, res, next) {
  var slug = req.query.slug;

  if (!slug) {
    res.json({
      message: "Please provide tenant's slug to connect."
    });
    return;
  } // Run the application in the defined namespace. It will contextualize every underlying function calls.


  nameSpace.run(function () {
    nameSpace.set('connection', (0, _connectionManager.getConnectionBySlug)(slug));
    next();
  });
}