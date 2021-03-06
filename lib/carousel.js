'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTweenState = require('react-tween-state');

var _reactTweenState2 = _interopRequireDefault(_reactTweenState);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

var reactMixin = require('react-mixin');

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = eventHandle;
  }
};

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = null;
  }
};

var Carousel = (function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    _get(Object.getPrototypeOf(Carousel.prototype), 'constructor', this).call(this, props);
    this.state = {
      currentSlide: this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: this.props.slidesToScroll,
      slideWidth: 0,
      top: 0
    };

    // @TODO Refactor to array + loop, make this a little more concise
    this.onReadyStateChange = this.onReadyStateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getTouchEvents = this.getTouchEvents.bind(this);
    this.getMouseEvents = this.getMouseEvents.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.swipeDirection = this.swipeDirection.bind(this);
    this.autoplayIterator = this.autoplayIterator.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.resetAutoplay = this.resetAutoplay.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.animateSlide = this.animateSlide.bind(this);
    this.getTargetLeft = this.getTargetLeft.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onReadyStateChange = this.onReadyStateChange.bind(this);
    this.unbindEvents = this.unbindEvents.bind(this);
    this.formatChildren = this.formatChildren.bind(this);
    this.setInitialDimensions = this.setInitialDimensions.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.setExternalData = this.setExternalData.bind(this);
    this.getListStyles = this.getListStyles.bind(this);
    this.getFrameStyles = this.getFrameStyles.bind(this);
    this.getSlideStyles = this.getSlideStyles.bind(this);
    this.getSlideTargetPosition = this.getSlideTargetPosition.bind(this);
    this.getSliderStyles = this.getSliderStyles.bind(this);
  }

  _createClass(Carousel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setInitialDimensions();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDimensions();
      this.bindEvents();
      this.setExternalData();
      if (this.props.autoplay) {
        this.startAutoplay();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        slideCount: nextProps.children.length
      });
      this.setDimensions(nextProps);
      if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide) {
        this.goToSlide(nextProps.slideIndex);
      }
      if (this.props.autoplay !== nextProps.autoplay) {
        if (nextProps.autoplay) {
          this.startAutoplay();
        } else {
          this.stopAutoplay();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindEvents();
      this.stopAutoplay();
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var children = _react2['default'].Children.count(this.props.children) > 1 ? this.formatChildren(this.props.children) : this.props.children;
      return _react2['default'].createElement(
        'div',
        { className: ['slider', this.props.className || ''].join(' '), ref: 'slider', style: (0, _objectAssign2['default'])(this.getSliderStyles(), this.props.style || {}) },
        _react2['default'].createElement(
          'div',
          _extends({ className: 'slider-frame',
            ref: 'frame',
            style: this.getFrameStyles()
          }, this.getTouchEvents(), this.getMouseEvents(), {
            onClick: this.handleClick }),
          _react2['default'].createElement(
            'ul',
            { className: 'slider-list', ref: 'list', style: this.getListStyles() },
            children
          )
        ),
        this.props.decorators ? this.props.decorators.map(function (Decorator, index) {
          return _react2['default'].createElement(
            'div',
            {
              style: (0, _objectAssign2['default'])(self.getDecoratorStyles(Decorator.position), Decorator.style || {}),
              className: 'slider-decorator-' + index,
              key: index },
            _react2['default'].createElement(Decorator.component, {
              currentSlide: self.state.currentSlide,
              slideCount: self.state.slideCount,
              frameWidth: self.state.frameWidth,
              slideWidth: self.state.slideWidth,
              slidesToScroll: self.state.slidesToScroll,
              cellSpacing: self.props.cellSpacing,
              slidesToShow: self.props.slidesToShow,
              wrapAround: self.props.wrapAround,
              nextSlide: self.nextSlide,
              previousSlide: self.previousSlide,
              goToSlide: self.goToSlide })
          );
        }) : null,
        _react2['default'].createElement('style', { type: 'text/css', dangerouslySetInnerHTML: { __html: self.getStyleTagStyles() } })
      );
    }

    // Touch Events

  }, {
    key: 'getTouchEvents',
    value: function getTouchEvents() {
      var self = this;

      if (self.props.swiping === false) {
        return null;
      }

      return {
        onTouchStart: function onTouchStart(e) {
          self.touchObject = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };
          self.handleMouseOver();
        },
        onTouchMove: function onTouchMove(e) {
          var direction = self.swipeDirection(self.touchObject.startX, e.touches[0].pageX, self.touchObject.startY, e.touches[0].pageY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = self.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2)));

          self.touchObject = {
            startX: self.touchObject.startX,
            startY: self.touchObject.startY,
            endX: e.touches[0].pageX,
            endY: e.touches[0].pageY,
            length: length,
            direction: direction
          };

          self.setState({
            left: self.props.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
            top: self.props.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
          });
        },
        onTouchEnd: function onTouchEnd(e) {
          self.handleSwipe(e);
          self.handleMouseOut();
        },
        onTouchCancel: function onTouchCancel(e) {
          self.handleSwipe(e);
        }
      };
    }
  }, {
    key: 'getMouseEvents',
    value: function getMouseEvents() {
      var self = this;

      if (this.props.dragging === false) {
        return null;
      }

      return {
        onMouseOver: function onMouseOver() {
          self.handleMouseOver();
        },
        onMouseOut: function onMouseOut() {
          self.handleMouseOut();
        },
        onMouseDown: function onMouseDown(e) {
          self.touchObject = {
            startX: e.clientX,
            startY: e.clientY
          };

          self.setState({
            dragging: true
          });
        },
        onMouseMove: function onMouseMove(e) {
          if (!self.state.dragging) {
            return;
          }

          var direction = self.swipeDirection(self.touchObject.startX, e.clientX, self.touchObject.startY, e.clientY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = self.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2)));

          self.touchObject = {
            startX: self.touchObject.startX,
            startY: self.touchObject.startY,
            endX: e.clientX,
            endY: e.clientY,
            length: length,
            direction: direction
          };

          self.setState({
            left: self.props.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
            top: self.props.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
          });
        },
        onMouseUp: function onMouseUp(e) {
          if (!self.state.dragging) {
            return;
          }

          self.handleSwipe(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          if (!self.state.dragging) {
            return;
          }

          self.handleSwipe(e);
        }
      };
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver() {
      if (this.props.autoplay) {
        this.autoplayPaused = true;
        this.stopAutoplay();
      }
    }
  }, {
    key: 'handleMouseOut',
    value: function handleMouseOut() {
      if (this.props.autoplay && this.autoplayPaused) {
        this.startAutoplay();
        this.autoplayPaused = null;
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.clickSafe === true) {
        e.preventDefault();
        e.stopPropagation();

        if (e.nativeEvent) {
          e.nativeEvent.stopPropagation();
        }
      }
    }
  }, {
    key: 'handleSwipe',
    value: function handleSwipe(e) {
      if (typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44) {
        this.clickSafe = true;
      } else {
        this.clickSafe = false;
      }

      var slidesToShow = this.props.slidesToShow;
      if (this.props.slidesToScroll === 'auto') {
        slidesToShow = this.state.slidesToScroll;
      }

      if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
        if (this.touchObject.direction === 1) {
          if (this.state.currentSlide >= _react2['default'].Children.count(this.props.children) - slidesToShow && !this.props.wrapAround) {
            this.animateSlide(_reactTweenState2['default'].easingTypes[this.props.edgeEasing]);
          } else {
            this.nextSlide();
          }
        } else if (this.touchObject.direction === -1) {
          if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
            this.animateSlide(_reactTweenState2['default'].easingTypes[this.props.edgeEasing]);
          } else {
            this.previousSlide();
          }
        }
      } else {
        this.goToSlide(this.state.currentSlide);
      }

      this.touchObject = {};

      this.setState({
        dragging: false
      });
    }
  }, {
    key: 'swipeDirection',
    value: function swipeDirection(x1, x2, y1, y2) {

      var xDist, yDist, r, swipeAngle;

      xDist = x1 - x2;
      yDist = y1 - y2;
      r = Math.atan2(yDist, xDist);

      swipeAngle = Math.round(r * 180 / Math.PI);
      if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
      }
      if (swipeAngle <= 45 && swipeAngle >= 0) {
        return 1;
      }
      if (swipeAngle <= 360 && swipeAngle >= 315) {
        return 1;
      }
      if (swipeAngle >= 135 && swipeAngle <= 225) {
        return -1;
      }
      if (this.props.vertical === true) {
        if (swipeAngle >= 35 && swipeAngle <= 135) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    }
  }, {
    key: 'autoplayIterator',
    value: function autoplayIterator() {
      if (this.props.wrapAround) {
        return this.nextSlide();
      }
      if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
        this.nextSlide();
      } else {
        this.stopAutoplay();
      }
    }
  }, {
    key: 'startAutoplay',
    value: function startAutoplay() {
      this.autoplayID = setInterval(this.autoplayIterator, this.props.autoplayInterval);
    }
  }, {
    key: 'resetAutoplay',
    value: function resetAutoplay() {
      if (this.props.autoplay && !this.autoplayPaused) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    }
  }, {
    key: 'stopAutoplay',
    value: function stopAutoplay() {
      this.autoplayID && clearInterval(this.autoplayID);
    }

    // Action Methods

  }, {
    key: 'goToSlide',
    value: function goToSlide(index) {
      var self = this;
      if (index >= _react2['default'].Children.count(this.props.children) || index < 0) {
        if (!this.props.wrapAround) {
          return;
        };
        if (index >= _react2['default'].Children.count(this.props.children)) {
          this.props.beforeSlide(this.state.currentSlide, 0);
          return this.setState({
            currentSlide: 0
          }, function () {
            self.animateSlide(null, null, self.getTargetLeft(null, index), function () {
              self.animateSlide(null, 0.01);
              self.props.afterSlide(0);
              self.resetAutoplay();
              self.setExternalData();
            });
          });
        } else {
          var endSlide = _react2['default'].Children.count(this.props.children) - this.state.slidesToScroll;
          this.props.beforeSlide(this.state.currentSlide, endSlide);
          return this.setState({
            currentSlide: endSlide
          }, function () {
            self.animateSlide(null, null, self.getTargetLeft(null, index), function () {
              self.animateSlide(null, 0.01);
              self.props.afterSlide(endSlide);
              self.resetAutoplay();
              self.setExternalData();
            });
          });
        }
      }

      this.props.beforeSlide(this.state.currentSlide, index);

      this.setState({
        currentSlide: index
      }, function () {
        self.animateSlide();
        this.props.afterSlide(index);
        self.resetAutoplay();
        self.setExternalData();
      });
    }
  }, {
    key: 'nextSlide',
    value: function nextSlide() {
      var childrenCount = _react2['default'].Children.count(this.props.children);
      var slidesToShow = this.props.slidesToShow;
      if (this.props.slidesToScroll === 'auto') {
        slidesToShow = this.state.slidesToScroll;
      }
      if (this.state.currentSlide >= childrenCount - slidesToShow && !this.props.wrapAround) {
        return;
      }

      if (this.props.wrapAround) {
        this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
      } else {
        if (this.props.slideWidth !== 1) {
          return this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
        }
        this.goToSlide(Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - slidesToShow));
      }
    }
  }, {
    key: 'previousSlide',
    value: function previousSlide() {
      if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
        return;
      }

      if (this.props.wrapAround) {
        this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
      } else {
        this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
      }
    }

    // Animation

  }, {
    key: 'animateSlide',
    value: function animateSlide(easing, duration, endValue, callback) {
      this.tweenState(this.props.vertical ? 'top' : 'left', {
        easing: easing || _reactTweenState2['default'].easingTypes[this.props.easing],
        duration: duration || this.props.speed,
        endValue: endValue || this.getTargetLeft(),
        onEnd: callback || null
      });
    }
  }, {
    key: 'getTargetLeft',
    value: function getTargetLeft(touchOffset, slide) {
      var offset;
      var target = slide || this.state.currentSlide;
      switch (this.props.cellAlign) {
        case 'left':
          {
            offset = 0;
            offset -= this.props.cellSpacing * target;
            break;
          }
        case 'center':
          {
            offset = (this.state.frameWidth - this.state.slideWidth) / 2;
            offset -= this.props.cellSpacing * target;
            break;
          }
        case 'right':
          {
            offset = this.state.frameWidth - this.state.slideWidth;
            offset -= this.props.cellSpacing * target;
            break;
          }
      }

      var left = this.state.slideWidth * target;

      var lastSlide = this.state.currentSlide > 0 && target + this.state.slidesToScroll >= this.state.slideCount;

      if (lastSlide && this.props.slideWidth !== 1 && !this.props.wrapAround && this.props.slidesToScroll === 'auto') {
        left = this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
        offset = 0;
        offset -= this.props.cellSpacing * (this.state.slideCount - 1);
      }

      offset -= touchOffset || 0;

      return (left - offset) * -1;
    }

    // Bootstrapping

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var self = this;
      if (_exenv2['default'].canUseDOM) {
        addEvent(window, 'resize', self.onResize);
        addEvent(document, 'readystatechange', self.onReadyStateChange);
      }
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      this.setDimensions();
    }
  }, {
    key: 'onReadyStateChange',
    value: function onReadyStateChange() {
      this.setDimensions();
    }
  }, {
    key: 'unbindEvents',
    value: function unbindEvents() {
      var self = this;
      if (_exenv2['default'].canUseDOM) {
        removeEvent(window, 'resize', self.onResize);
        removeEvent(document, 'readystatechange', self.onReadyStateChange);
      }
    }
  }, {
    key: 'formatChildren',
    value: function formatChildren(children) {
      var self = this;
      var positionValue = this.props.vertical ? this.getTweeningValue('top') : this.getTweeningValue('left');
      return _react2['default'].Children.map(children, function (child, index) {
        return _react2['default'].createElement(
          'li',
          { className: 'slider-slide', style: self.getSlideStyles(index, positionValue), key: index },
          child
        );
      });
    }
  }, {
    key: 'setInitialDimensions',
    value: function setInitialDimensions() {
      var self = this,
          slideWidth,
          frameHeight,
          slideHeight;

      slideWidth = this.props.vertical ? this.props.initialSlideHeight || 0 : this.props.initialSlideWidth || 0;
      slideHeight = this.props.initialSlideHeight ? this.props.initialSlideHeight * this.props.slidesToShow : 0;

      frameHeight = slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);

      this.setState({
        slideHeight: slideHeight,
        frameWidth: this.props.vertical ? frameHeight : '100%',
        slideCount: _react2['default'].Children.count(this.props.children),
        slideWidth: slideWidth
      }, function () {
        self.setLeft();
        self.setExternalData();
      });
    }
  }, {
    key: 'setDimensions',
    value: function setDimensions(props) {
      props = props || this.props;

      var self = this,
          slideWidth,
          slidesToScroll,
          firstSlide,
          frame,
          frameWidth,
          frameHeight,
          slideHeight;

      slidesToScroll = props.slidesToScroll;
      frame = this.refs.frame;
      firstSlide = frame.childNodes[0].childNodes[0];
      if (firstSlide) {
        firstSlide.style.height = 'auto';
        slideHeight = this.props.vertical ? firstSlide.offsetHeight * props.slidesToShow : firstSlide.offsetHeight;
      } else {
        slideHeight = 100;
      }

      if (typeof props.slideWidth !== 'number') {
        slideWidth = parseInt(props.slideWidth);
      } else {
        if (props.vertical) {
          slideWidth = slideHeight / props.slidesToShow * props.slideWidth;
        } else {
          slideWidth = frame.offsetWidth / props.slidesToShow * props.slideWidth;
        }
      }

      if (!props.vertical) {
        slideWidth -= props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
      }

      frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);
      frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

      if (props.slidesToScroll === 'auto') {
        slidesToScroll = Math.floor(frameWidth / (slideWidth + props.cellSpacing));
      }

      this.setState({
        slideHeight: slideHeight,
        frameWidth: frameWidth,
        slideWidth: slideWidth,
        slidesToScroll: slidesToScroll,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0
      }, function () {
        self.setLeft();
      });
    }
  }, {
    key: 'setLeft',
    value: function setLeft() {
      this.setState({
        left: this.props.vertical ? 0 : this.getTargetLeft(),
        top: this.props.vertical ? this.getTargetLeft() : 0
      });
    }

    // Data

  }, {
    key: 'setExternalData',
    value: function setExternalData() {
      if (this.props.data) {
        this.props.data();
      }
    }

    // Styles

  }, {
    key: 'getListStyles',
    value: function getListStyles() {
      var listWidth = this.state.slideWidth * _react2['default'].Children.count(this.props.children);
      var spacingOffset = this.props.cellSpacing * _react2['default'].Children.count(this.props.children);
      var transform = 'translate3d(' + this.getTweeningValue('left') + 'px, ' + this.getTweeningValue('top') + 'px, 0)';
      return {
        transform: transform,
        WebkitTransform: transform,
        msTransform: 'translate(' + this.getTweeningValue('left') + 'px, ' + this.getTweeningValue('top') + 'px)',
        position: 'relative',
        display: 'block',
        margin: this.props.vertical ? this.props.cellSpacing / 2 * -1 + 'px 0px' : '0px ' + this.props.cellSpacing / 2 * -1 + 'px',
        padding: 0,
        height: this.props.vertical ? listWidth + spacingOffset : this.state.slideHeight,
        width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
        cursor: this.state.dragging === true ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    }
  }, {
    key: 'getFrameStyles',
    value: function getFrameStyles() {
      return {
        position: 'relative',
        display: 'block',
        overflow: this.props.frameOverflow,
        height: this.props.vertical ? this.state.frameWidth || 'initial' : 'auto',
        margin: this.props.framePadding,
        padding: 0,
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        msTransform: 'translate(0, 0)',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    }
  }, {
    key: 'getSlideStyles',
    value: function getSlideStyles(index, positionValue) {
      var targetPosition = this.getSlideTargetPosition(index, positionValue);
      return {
        position: 'absolute',
        left: this.props.vertical ? 0 : targetPosition,
        top: this.props.vertical ? targetPosition : 0,
        display: this.props.vertical ? 'block' : 'inline-block',
        listStyleType: 'none',
        verticalAlign: 'top',
        width: this.props.vertical ? '100%' : this.state.slideWidth,
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
        marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto'
      };
    }
  }, {
    key: 'getSlideTargetPosition',
    value: function getSlideTargetPosition(index, positionValue) {
      var slidesToShow = this.state.frameWidth / this.state.slideWidth;
      var targetPosition = (this.state.slideWidth + this.props.cellSpacing) * index;
      var end = (this.state.slideWidth + this.props.cellSpacing) * slidesToShow * -1;

      if (this.props.wrapAround) {
        var slidesBefore = Math.ceil(positionValue / this.state.slideWidth);
        if (this.state.slideCount - slidesBefore <= index) {
          return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount - index) * -1;
        }

        var slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth);

        if (this.state.slideWidth !== 1) {
          slidesAfter = Math.ceil((Math.abs(positionValue) - this.state.slideWidth) / this.state.slideWidth);
        }

        if (index <= slidesAfter - 1) {
          return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount + index);
        }
      }

      return targetPosition;
    }
  }, {
    key: 'getSliderStyles',
    value: function getSliderStyles() {
      return {
        position: 'relative',
        display: 'block',
        width: 'calc(' + this.props.width + ' - 80px)',
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        visibility: this.state.slideWidth ? 'visible' : 'hidden',
        margin: '0 40px'
      };
    }
  }, {
    key: 'getStyleTagStyles',
    value: function getStyleTagStyles() {
      return '.slider-slide > img {width: 100%; display: block;}';
    }
  }, {
    key: 'getDecoratorStyles',
    value: function getDecoratorStyles(position) {
      switch (position) {
        case 'TopLeft':
          {
            return {
              position: 'absolute',
              top: 0,
              left: 0
            };
          }
        case 'TopCenter':
          {
            return {
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              WebkitTransform: 'translateX(-50%)',
              msTransform: 'translateX(-50%)'
            };
          }
        case 'TopRight':
          {
            return {
              position: 'absolute',
              top: 0,
              right: 0
            };
          }
        case 'CenterLeft':
          {
            return {
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              WebkitTransform: 'translateY(-50%)',
              msTransform: 'translateY(-50%)'
            };
          }
        case 'CenterCenter':
          {
            return {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              WebkitTransform: 'translate(-50%, -50%)',
              msTransform: 'translate(-50%, -50%)'
            };
          }
        case 'CenterRight':
          {
            return {
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              WebkitTransform: 'translateY(-50%)',
              msTransform: 'translateY(-50%)'
            };
          }
        case 'BottomLeft':
          {
            return {
              position: 'absolute',
              bottom: 0,
              left: 0
            };
          }
        case 'BottomCenter':
          {
            return {
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              WebkitTransform: 'translateX(-50%)',
              msTransform: 'translateX(-50%)'
            };
          }
        case 'Below':
          {
            return {
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%) translateY(100%)',
              WebkitTransform: 'translateX(-50%) translateY(100%)',
              msTransform: 'translateX(-50%) translateY(100%)'
            };
          }
        case 'BottomRight':
          {
            return {
              position: 'absolute',
              bottom: 0,
              right: 0
            };
          }
        default:
          {
            return {
              position: 'absolute',
              top: 0,
              left: 0
            };
          }
      }
    }
  }]);

  return Carousel;
})(_react2['default'].Component);

reactMixin.onClass(Carousel, _reactTweenState2['default'].Mixin);

Carousel.propTypes = {
  afterSlide: _propTypes2['default'].func,
  autoplay: _propTypes2['default'].bool,
  autoplayInterval: _propTypes2['default'].number,
  beforeSlide: _propTypes2['default'].func,
  cellAlign: _propTypes2['default'].oneOf(['left', 'center', 'right']),
  cellSpacing: _propTypes2['default'].number,
  data: _propTypes2['default'].func,
  decorators: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
    component: _propTypes2['default'].func,
    position: _propTypes2['default'].oneOf(['TopLeft', 'TopCenter', 'TopRight', 'CenterLeft', 'CenterCenter', 'CenterRight', 'BottomLeft', 'BottomCenter', 'BottomRight', 'Below']),
    style: _propTypes2['default'].object
  })),
  dragging: _propTypes2['default'].bool,
  easing: _propTypes2['default'].string,
  edgeEasing: _propTypes2['default'].string,
  framePadding: _propTypes2['default'].string,
  frameOverflow: _propTypes2['default'].string,
  initialSlideHeight: _propTypes2['default'].number,
  initialSlideWidth: _propTypes2['default'].number,
  slideIndex: _propTypes2['default'].number,
  slidesToShow: _propTypes2['default'].number,
  slidesToScroll: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].oneOf(['auto'])]),
  slideWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
  speed: _propTypes2['default'].number,
  swiping: _propTypes2['default'].bool,
  vertical: _propTypes2['default'].bool,
  width: _propTypes2['default'].string,
  wrapAround: _propTypes2['default'].bool
};

Carousel.defaultProps = {
  afterSlide: function afterSlide() {},
  autoplay: false,
  autoplayInterval: 3000,
  beforeSlide: function beforeSlide() {},
  cellAlign: 'left',
  cellSpacing: 0,
  data: function data() {},
  decorators: _decorators2['default'],
  dragging: true,
  easing: 'easeOutCirc',
  edgeEasing: 'easeOutElastic',
  framePadding: '0px',
  frameOverflow: 'hidden',
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  slideWidth: 1,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
};

Carousel.ControllerMixin = {
  getInitialState: function getInitialState() {
    return {
      carousels: {}
    };
  },
  setCarouselData: function setCarouselData(carousel) {
    var data = this.state.carousels;
    data[carousel] = this.refs[carousel];
    this.setState({
      carousels: data
    });
  }
};

exports['default'] = Carousel;
module.exports = exports['default'];