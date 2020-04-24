"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectAllDb = connectAllDb;
exports.getConnectionBySlug = getConnectionBySlug;
exports.getConnection = getConnection;

var _knex = _interopRequireDefault(require("knex"));

var _continuationLocalStorage = require("continuation-local-storage");

var _commonDBConnection = _interopRequireDefault(require("./commonDBConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connectionMap;
/**
 * Create knex instance for all the tenants defined in common database and store in a map.
 **/

function connectAllDb() {
  return _connectAllDb.apply(this, arguments);
}
/**
 *  Create configuration object for the given tenant.
 **/


function _connectAllDb() {
  _connectAllDb = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var tenants;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _commonDBConnection["default"].select('*').from('tenants');

          case 3:
            tenants = _context.sent;
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log('error', _context.t0);
            return _context.abrupt("return");

          case 10:
            connectionMap = tenants.map(function (tenant) {
              return _defineProperty({}, tenant.slug, (0, _knex["default"])(createConnectionConfig(tenant)));
            }).reduce(function (prev, next) {
              return Object.assign({}, prev, next);
            }, {});

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _connectAllDb.apply(this, arguments);
}

function createConnectionConfig(tenant) {
  return {
    client: process.env.DB_CLIENT,
    connection: {
      host: tenant.db_host,
      port: tenant.db_port,
      user: tenant.db_username,
      database: tenant.db_name,
      password: tenant.db_password
    },
    pool: {
      min: 2,
      max: 20
    }
  };
}
/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */


function getConnectionBySlug(slug) {
  if (connectionMap) {
    console.log("Getting connection for ".concat(slug));
    return connectionMap[slug];
  }
}
/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */


function getConnection() {
  var nameSpace = (0, _continuationLocalStorage.getNamespace)('unique context');
  var conn = nameSpace.get('connection');

  if (!conn) {
    throw 'Connection is not set for any tenant database.';
  }

  return conn;
}