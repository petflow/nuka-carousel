'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DefaultDecorators = [{
  component: (function (_React$Component) {
    _inherits(component, _React$Component);

    function component() {
      _classCallCheck(this, component);

      _get(Object.getPrototypeOf(component.prototype), 'constructor', this).call(this);
      this.handleClick = this.handleClick.bind(this);
    }

    _createClass(component, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'button',
          {
            style: this.getButtonStyles(this.props.currentSlide === 0 && !this.props.wrapAround),
            onClick: this.handleClick },
          'PREV'
        );
      }
    }, {
      key: 'handleClick',
      value: function handleClick(e) {
        e.preventDefault();
        this.props.previousSlide();
      }
    }, {
      key: 'getButtonStyles',
      value: function getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
        };
      }
    }]);

    return component;
  })(_react2['default'].Component),
  position: 'CenterLeft'
}, {
  component: (function (_React$Component2) {
    _inherits(component, _React$Component2);

    function component() {
      _classCallCheck(this, component);

      _get(Object.getPrototypeOf(component.prototype), 'constructor', this).call(this);
      this.handleClick = this.handleClick.bind(this);
    }

    _createClass(component, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'button',
          {
            style: this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround),
            onClick: this.handleClick },
          'NEXT'
        );
      }
    }, {
      key: 'handleClick',
      value: function handleClick(e) {
        e.preventDefault();
        this.props.nextSlide();
      }
    }, {
      key: 'getButtonStyles',
      value: function getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
        };
      }
    }]);

    return component;
  })(_react2['default'].Component),
  position: 'CenterRight'
}, {
  component: (function (_React$Component3) {
    _inherits(component, _React$Component3);

    function component() {
      _classCallCheck(this, component);

      _get(Object.getPrototypeOf(component.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(component, [{
      key: 'render',
      value: function render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return _react2['default'].createElement(
          'ul',
          { style: self.getListStyles() },
          indexes.map(function (index) {
            return _react2['default'].createElement(
              'li',
              { style: self.getListItemStyles(), key: index },
              _react2['default'].createElement(
                'button',
                {
                  style: self.getButtonStyles(self.props.currentSlide === index),
                  onClick: self.props.goToSlide.bind(null, index) },
                '•'
              )
            );
          })
        );
      }
    }, {
      key: 'getIndexes',
      value: function getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      }
    }, {
      key: 'getListStyles',
      value: function getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: -10,
          padding: 0
        };
      }
    }, {
      key: 'getListItemStyles',
      value: function getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        };
      }
    }, {
      key: 'getButtonStyles',
      value: function getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: 'black',
          cursor: 'pointer',
          padding: 10,
          outline: 0,
          fontSize: 24,
          opacity: active ? 1 : 0.5
        };
      }
    }]);

    return component;
  })(_react2['default'].Component),
  position: 'BottomCenter'
}];

exports['default'] = DefaultDecorators;
module.exports = exports['default'];