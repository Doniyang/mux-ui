"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _Toast = _interopRequireDefault(require("./Toast.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Toast {
  constructor() {
    var opttions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.initToastComponent(opttions);
  }

  initToastComponent(opttions) {
    var ToastConstructor = _vue.default.extend(_Toast.default);

    var data = {
      text: opttions.text || '',
      visible: opttions.visible || false
    };
    var duration = opttions.timeout || 3000;
    var vm = new ToastConstructor({
      el: document.createElement('div'),
      propsData: data
    });
    document.body.appendChild(vm.$el);
    vm.$nextTick(() => {
      vm.visible = true;
      setTimeout(() => {
        vm.visible = false;
        document.body.removeChild(vm.$el);
      }, duration);
    });
  }

}

exports.default = Toast;