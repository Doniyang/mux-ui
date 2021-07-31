import Table from "./utils/Table"

export default {
  functional: true,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    colgroup: {
      type: Array,
      default: () => []
    },
    gutter: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    checkboxSize: {
      type: [Number, String],
      default: 70
    },
    barWidth: {
      type: Number,
      defalut: 0
    }
  },
  name: "VColgroup",
  render (h, context) {
    const { props } = context
    const columns = Table.merge(props.colgroup, props.columns)
    return h("colgroup", {}, [
      props.selectable ? h("col", {
        staticStyle:{
          width:Table.pixel(props.checkboxSize),
          minWidth:Table.pixel(props.checkboxSize),
        },
        attrs: {
          name: "col-checkbox",
          align: "center",
          width: props.checkboxSize
        }
      }) : null,
      columns.map((d, dx) => h("col", {
        staticStyle:{
          width:Table.pixel(d.width),
          minWidth:Table.pixel(d.width),
        },
        attrs: {
          name: "c-col-" + dx,
          align: d.align,
          width: d.width
        }
      })),
      props.gutter ? h("col", {
        staticStyle:{
          width:Table.pixel(props.barWidth),
          minWidth:Table.pixel(props.barWidth),
        },
        attrs: {
          name: "col-gutter",
          align: "center",
          width: props.barWidth
        }
      }) : null
    ].flat())
  }
}
