"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _vue = _interopRequireDefault(require("vue"));

var _Comfirm = _interopRequireDefault(require("./Comfirm.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(options) {
  var ComfirmConstructor = _vue.default.extend(_Comfirm.default);

  var initInstance = data => {
    return new ComfirmConstructor({
      el: document.createElement('div'),
      propsData: data
    });
  };

  var defaults = {
    closeOnClickModal: true
  };
  return new Promise((resolve, reject) => {
    var defaultCallBack = action => {
      action === 'comfirm' ? resolve(action) : reject(action);
    };

    var vm = initInstance(Object.assign({}, defaults, options));
    vm.callBack = defaultCallBack;

    if (!vm.visible) {
      document.body.appendChild(vm.$el);
      vm.$nextTick(() => {
        vm.visible = true;
      });
    }
  });
}