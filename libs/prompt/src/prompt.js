"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _vue = _interopRequireDefault(require("vue"));

var _Prompt = _interopRequireDefault(require("./Prompt.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PromptConstructor = _vue.default.extend(_Prompt.default);

function _default(options) {
  var initInstance = data => new PromptConstructor({
    el: document.createElement('div'),
    propsData: data
  });

  var defaults = {
    title: '提示',
    placeHolder: '请输入',
    inputType: 'text',
    validate: val => val.trim() === '',
    closeOnClickModal: false
  };
  return new Promise((resolve, reject) => {
    var defaultCallBack = (action, value) => {
      action === 'prompt' ? resolve(value) : reject(action);
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