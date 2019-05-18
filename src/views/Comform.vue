<template>
  <section class="mux-container">
    <v-header title="mux-ui 组件" @back-click="$router.back()"></v-header>
    <form novalidate class="mux-form">
      <field label="姓名" placeholder="请输入姓名" name="user"></field>
      <field label="密码" type="password" placeholder="请输入密码" name="psw"></field>
      <field label="数字" type="number" placeholder="请输入数字" name="num"></field>
      <field label="网址" type="url" placeholder="请输入网址" name="website"></field>
      <field label="电话" type="tel" placeholder="请输入电话" name="telnum"></field>
      <cell>
        <div class="mux-box-label">Switch</div>
        <div class="mux-box-elastic">
          <v-switch v-model="isCase"></v-switch>
        </div>
      </cell>
      <cell>
        <div class="mux-box-label">Radio</div>
        <div class="mux-box-elastic">
          <radio-group v-model="male">
            <radio label="1" name="sex">男</radio>
            <radio label="1" name="sex">女</radio>
          </radio-group>
        </div>
      </cell>
    </form>
  </section>
</template>
<script type="text/javascript">
import { Header, Field, Cell, Switch, RadioGroup, Radio } from 'Packages/index'
export default {
  components: {
    Field,
    Cell,
    RadioGroup,
    Radio,
    'v-header': Header,
    'v-switch': Switch
  },
  data () {
    return {
      isCase: '0',
      male: ''
    }
  }
}

</script>
<style lang="less">
@comvar: ~"mux";

.@{comvar} {

  &-container,
  &-form {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    zoom: 1;
  }

  &-box-label {
    width: 70px;
    padding-left: 15px;
    font-size: 15px;
    color: #787878;
    text-align: left;
  }

  &-box-elastic {
    padding-left: 5px;
    flex: 1;
    color: #0c0c0c;
    font-size: 15px;
    display: block;
    width: 100%;

    &:empty::before {
      color: #787878;
      content: attr(placeholder);
    }
  }
}

</style>
