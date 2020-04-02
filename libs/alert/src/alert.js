"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _vue = _interopRequireDefault(require("vue"));

var _Alert = _interopRequireDefault(require("./Alert.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(options) {
  var AlertConstructor = _vue.default.extend(_Alert.default);

  var initInstance = data => {
    return new AlertConstructor({
      el: document.createElement('div'),
      propsData: data
    });
  };

  var defaults = {
    closeOnClickModal: false
  };
  return new Promise((resolve, reject) => {
    var vm = initInstance(Object.assign({}, defaults, options));

    var defaultCallBack = action => {
      resolve(action);
    };

    vm.callBack = defaultCallBack;

    if (!vm.visible) {
      document.body.appendChild(vm.$el);
      vm.$nextTick(() => {
        vm.visible = true;
      });
    }
  });
}