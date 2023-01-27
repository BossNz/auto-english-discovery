"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var engdis =
/*#__PURE__*/
function () {
  function engdis() {
    var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://edservices.engdis.com/api/";
    var authorization = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    _classCallCheck(this, engdis);

    _axios["default"].defaults.baseURL = baseURL;
    if (authorization) _axios["default"].defaults.headers.authorization = "Bearer " + authorization;
  } // 5232957 for KMITL.


  _createClass(engdis, [{
    key: "Login",
    value: function Login(username, password) {
      var InstitutionId,
          _ref,
          data,
          _args = arguments;

      return regeneratorRuntime.async(function Login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              InstitutionId = _args.length > 2 && _args[2] !== undefined ? _args[2] : "5232957";
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(_axios["default"].post("Auth", {
                CommunityVersion: "100",
                InstitutionId: InstitutionId,
                Password: password,
                UserName: username
              }));

            case 4:
              _ref = _context.sent;
              data = _ref.data;
              return _context.abrupt("return", data);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", {
                isSuccess: false
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }, {
    key: "Logout",
    value: function Logout() {
      var _ref2, data;

      return regeneratorRuntime.async(function Logout$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("Auth/Logout"));

            case 3:
              _ref2 = _context2.sent;
              data = _ref2.data;
              return _context2.abrupt("return", data);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                isSuccess: false
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getGetDefaultCourseProgress",
    value: function getGetDefaultCourseProgress() {
      var _ref3, data;

      return regeneratorRuntime.async(function getGetDefaultCourseProgress$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("CourseTree/GetDefaultCourseProgress"));

            case 3:
              _ref3 = _context3.sent;
              data = _ref3.data;
              return _context3.abrupt("return", {
                isSuccess: true,
                data: data.CourseProgressTree.Children
              });

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", {
                isSuccess: false,
                data: _context3.t0.response.data
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getCourseTree",
    value: function getCourseTree(NodeId, ParentNodeId) {
      var NodeType,
          _ref4,
          data,
          _args4 = arguments;

      return regeneratorRuntime.async(function getCourseTree$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              NodeType = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 2;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(_axios["default"].post("CourseTree/GetUserNodeProgress/" + ParentNodeId, [{
                ParticleId: NodeId,
                NodeType: NodeType,
                LockedNodes: null,
                particleHasProgress: true,
                lowestNodeType: 5
              }]));

            case 4:
              _ref4 = _context4.sent;
              data = _ref4.data;
              return _context4.abrupt("return", {
                isSuccess: true,
                data: data[0].Children
              });

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", {
                isSuccess: false,
                data: _context4.t0.response.data
              });

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }, {
    key: "practiceGetItem",
    value: function practiceGetItem(NodeId, code) {
      var number,
          _ref5,
          data,
          _args5 = arguments;

      return regeneratorRuntime.async(function practiceGetItem$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              number = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 1;
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(_axios["default"].get("/practiceManager/GetItem/".concat(NodeId, "/").concat(code, "t").concat(String(number).padStart(2, "0"), "/25/0/6/")));

            case 4:
              _ref5 = _context5.sent;
              data = _ref5.data;
              return _context5.abrupt("return", {
                isSuccess: true,
                data: data
              });

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](1);
              console.log(_context5.t0.response.data);
              return _context5.abrupt("return", {
                isSuccess: false
              });

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }, {
    key: "SaveUserTestV1",
    value: function SaveUserTestV1(nodeId, ParentNodeId, body) {
      var _ref6, data;

      return regeneratorRuntime.async(function SaveUserTestV1$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].post("/UserTestV1/SaveUserTest/".concat(nodeId, "/").concat(ParentNodeId, "/true"), {
                t: 32000,
                a: body
              }));

            case 3:
              _ref6 = _context6.sent;
              data = _ref6.data;
              return _context6.abrupt("return", {
                isSuccess: true,
                data: data
              });

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0.response.data);
              return _context6.abrupt("return", {
                isSuccess: false
              });

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "setSucessTask",
    value: function setSucessTask(CourseId, ItemId) {
      var _ref7, data;

      return regeneratorRuntime.async(function setSucessTask$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].post("Progress/SetProgressPerTask", {
                CourseId: CourseId,
                ItemId: ItemId
              }));

            case 3:
              _ref7 = _context7.sent;
              data = _ref7.data;
              return _context7.abrupt("return", {
                isSuccess: true,
                data: data
              });

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", {
                isSuccess: false
              });

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return engdis;
}();

exports["default"] = engdis;