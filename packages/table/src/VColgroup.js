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
        barWidth: {
            type: Number,
            defalut: 0
        }
    },
    name: 'VColgroup',
    render(h, context) {
        const { props } = context
        const columns = Table.make(props.colgroup,props.columns)
        return h("colgroup", {}, [
            ...columns.map((d, dx) => h('col', {
                attrs: {
                    name: "c-col-" + dx,
                    align: d.align,
                    width: d.width
                }
            })),
            props.gutter ? h('col', {
                attrs: {
                    name: "col-gutter",
                    align: 'center',
                    width: props.barWidth
                }
            }) : null
        ])
    }
}