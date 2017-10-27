'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blendModeCodes = undefined;
exports.getAllBlendNames = getAllBlendNames;

var _shaders = require('./shaders');

var _shaders2 = _interopRequireDefault(_shaders);

var _glReact = require('gl-react');

var _glReact2 = _interopRequireDefault(_glReact);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAllBlendNames() {
  return Object.keys(_shaders2.default);
}

var blendModeCodes = exports.blendModeCodes = _shaders2.default;

var shaderObjects = getAllBlendNames().reduce(function (processed, name) {
  var formatted = _defineProperty({}, name, {
    frag: '\nprecision highp float;\nvarying vec2 uv;\n\nuniform sampler2D tex;\nuniform vec4 color;\n\n' + _shaders2.default[name] + '\n\nvoid main () {\n  vec4 baseColor = texture2D(tex, uv);\n  vec3 newColor = ' + name + '(baseColor.rgb, color.rgb, color.a);\n  gl_FragColor = vec4(newColor, 1.);\n}'
  });
  return Object.assign({}, processed, formatted);
}, {});

var shaders = _glReact2.default.Shaders.create(shaderObjects);

var ColorBlending = _glReact2.default.createComponent(function (_ref) {
  var tex = _ref.children,
      color = _ref.color,
      _ref$blendMode = _ref.blendMode,
      blendMode = _ref$blendMode === undefined ? 'blendAdd' : _ref$blendMode;
  return _react2.default.createElement(_glReact2.default.Node, {
    shader: shaders[blendMode],
    uniforms: { tex: tex, color: color }
  });
}, {
  displayName: "ColorBlending",
  propTypes: {
    children: _propTypes2.default.any.isRequired,
    color: _propTypes2.default.array,
    blendMode: _propTypes2.default.string
  }
});

exports.default = ColorBlending;
//# sourceMappingURL=index.js.map