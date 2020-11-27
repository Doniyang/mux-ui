import VColgroup from "./VColgroup";

export default {
    name: "VThead",
    props: {
        colgroup: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        gutter: {
            type: Boolean,
            default: false
        },
        barWidth:{
            type:Number,
            default:0
        }
    },
    methods: {
        genColgroupContext() {
            return this.$createElement(VColgroup, {
                props: {
                    columns: this.columns,
                    colgroup: this.colgroup,
                    gutter: this.gutter,
                    barWidth:this.barWidth
                }
            })
        },
        genTHeadContext() {
            return this.$createElement('thead', {}, this.genHeaderChildrenContext())
        },
        genHeaderChildrenContext() {
            return this.$scopedSlots.default ? [this.genSlotContext('default', { colgroup: this.colgroup, columns: this.columns })] : this.genItemsContext()
        },
        genItemsContext() {
            return [this.colgroup, this.columns].reduce((current, next) => {
                if (next.length > 0) { current.push(this.genRowContext(next, this.genColContext)) }
                return current
            }, [])
        },
        genRowContext(cols, callback) {
            return this.$createElement('tr', {}, [].map.call(cols, (item, dx) => callback.apply(this, [item, dx])))
        },
        genColContext(item, key) {
            return this.$createElement('th', {
                staticClass: "v-text-" + (item.align || "center"),
                style:item.style,
                class:item.class,
                attrs: {
                    colspan: item.colspan,
                    rowspan: item.rowspan
                },
                key: `TH_${key}`
            }, [this.genCellContext(item.text)])
        },
        genCellContext(text) {
            return this.$createElement("div", {
                staticClass: "v-table-cell"
            }, text);
        },
        genSlotContext(slot, props) {
            return this.$scopedSlots[slot].call(this, props)
        }
    },
    render(h) {
        return h("table", {
            staticClass: "v-table-box",
            attrs: {
                cellpadding: 0,
                cellspacing: 0,
                border: 0,
            },
        }, [this.genColgroupContext(), this.genTHeadContext()]);
    },
};
