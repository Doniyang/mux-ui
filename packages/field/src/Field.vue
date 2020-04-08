<template>
  <div class="hz-field-wrapper">
    <div
      class="hz-field-label"
      :class="{ 'hz-field-required': required }"
      :style="labelStyle"
    >
      <slot name="label">
        <label :for="`vir-field-${uuid}`">{{ label }}</label>
      </slot>
    </div>
    <div class="hz-field-container">
      <div class="hz-field-box" :class="`hz-field-align-${align}`">
        <input
          class="hz-field-block"
          ref="vField"
          v-model="currentValue"
          :id="`vir-field-${uuid}`"
          :type="type"
          :name="name"
          :class="{ 'hz-field-is-danger': invalid }"
          :required="required"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
        />
        <span class="hz-field-help" v-if="invalid">{{ message }}</span>
      </div>
      <div class="hz-field-times" v-if="isClear">
        <span class="hz-field-clear" @click.stop="handleClear"></span>
      </div>
    </div>
    <div class="hz-field-icons">
      <slot name="icon"></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    type: {
      type: String,
      default: "text",
      validator(v) {
        return (
          [
            "email",
            "number",
            "password",
            "search",
            "tel",
            "text",
            "url",
          ].indexOf(v) > -1
        );
      },
    },
    attr: Object,
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "XFeild",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: "80px",
    },
    align: {
      type: String,
      default: "left",
      validator(v) {
        return ["left", "center", "right"].indexOf(v) > -1;
      },
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentValue: "",
      uuid: null,
      localize: null,
    };
  },
  computed: {
    isClear() {
      return this.currentValue !== "" && this.clearable && !this.readonly;
    },
    labelStyle() {
      return {
        width: this.labelWidth,
      };
    },
  },
  created() {
    this.uuid = Math.random().toString(32).substring(4, 9);
    this.currentValue = this.value;
  },
  watch: {
    value(nv, ov) {
      if (nv === ov) {
        return;
      }
      this.currentValue = nv;
    },
    attr: {
      handler(attrs) {
        if (!attrs) {
          return;
        }
        this.$nextTick(() => {
          Object.keys(attrs).forEach((name) => {
            this.$refs.vField.setAttribute(name, attrs[name]);
          });
        });
      },
      immediate: true,
    },
    currentValue(nv, ov) {
      if (nv === ov) {
        return;
      }
      this.$emit("input", nv);
    },
  },
  methods: {
    handleClear(e) {
      if (this.readonly) {
        return;
      }
      this.currentValue = "";
      this.$refs.vField.focus();
    },
  },
};
</script>
<style lang="less" scoped>
@input: ~"hz-field";

.@{input} {
  &-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    zoom: 1;
    box-sizing: border-box;
    display: flex;
    height: 46px;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid #dcdcdc;

    @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
      border: none;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: linear-gradient(
        0,
        #dcdcdc,
        #dcdcdc 50%,
        transparent 50%
      );
      background-image: -webkit-linear-gradient(
        90deg,
        #dcdcdc,
        #dcdcdc 50%,
        transparent 50%
      );
    }
  }

  &-label {
    padding-left: 15px;
    font-size: 15px;
    color: #787878;
  }

  &-required {
    position: relative;

    &:before {
      content: "*";
      position: absolute;
      color: red;
      left: 8px;
    }
  }

  &-container {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 12px 0 0;
  }

  &-box {
    flex: 1;
    display: block;
    text-align: left;
    position: relative;
  }

  &-align-right {
    text-align: right;

    & input::-webkit-input-placeholder {
      text-align: right;
    }
  }

  &-align-center {
    text-align: center;

    & input::-webkit-input-placeholder {
      text-align: center;
    }
  }

  &-block {
    width: 100%;
    display: block;
    flex: 1;
    height: 44px;
    font-size: 15px;
    color: #0c0c0c;
    outline: none;
    border: none;
    box-sizing: border-box;
    appearance: none;
    text-align: inherit;

    &input::-webkit-input-placeholder {
      font-size: 15px;
      color: #bcbcbc;
    }
  }

  &-is-danger {
    border: 1px solid #f00;
  }

  &-help {
    position: absolute;
    right: 2px;
    top: 50%;
    color: red;
    font-size: 12px;
    transform: translate3d(0, -50%, 0);
  }

  &-times {
    display: block;
    padding-left: 8px;
  }

  &-clear {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border: 1px solid #aaaaaa;
    border-radius: 100%;
    background-color: #aaaaaa;
    vertical-align: middle;

    &:before,
    &:after {
      position: absolute;
      content: "";
      width: 10px;
      height: 1px;
      right: 2px;
      top: 50%;
      margin-top: -1px;
      background-color: #ffffff;
      transform-origin: center;
    }

    &:before {
      transform: rotate(135deg);
    }

    &:after {
      transform: rotate(45deg);
    }
  }

  &-icons {
    display: block;
  }
}
</style>
