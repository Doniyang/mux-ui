import VColgroup from './VColgroup'
import Editor from './Editor'
import Checkbox from "../../checkbox"
import Table from './utils/Table'
export default {
    name: 'VTbody',
    props: {
        skin: {
            type: String
        },
        size: {
            type: String
        },
        columns: {
            type: Array,
            default: () => []
        },
        dataItems: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: '数据正在努力加载中...'
        },
        noDataText: {
            type: String,
            default: ''
        },
        selectIndex: {
            type: Number,
            default: -1
        },
        hoverable: {
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
        selectKey: {
            type: String,
            default: 'id'
        },
        value: {
            type: Array,
            default: () => []
        },
        sealed: {
            type: Boolean,
            default: false
        },
        activeIndex: {
            type: Number,
            default: -1
        },
        fillWidth: {
            type: Boolean,
            default: false
        },
        rowStyle: {
            type: [Object, Function],
            default: () => ({})
        }
    },
    methods: {
        handleClick (e, cfg, item) {
            if (cfg.clickable) {
                this.$emit('click:cell', item)
            }
            if (cfg.editable) {
                const target = e.currentTarget || e.target || e.srcElement
                target.setAttribute('data-editor-dialog','true')
            }
        },
        getComputedStyle (row, props) {
            return props === null ? props : Table.isFunction(this.rowStyle) ? this.rowStyle.apply(this, [row, props.ariaRowIndex]) : this.rowStyle
        },
        genColgroupContext () {
            return this.$createElement(VColgroup, {
                props: {
                    columns: this.columns,
                    gutter: false,
                    selectable: this.selectable,
                    checkboxSize: this.checkboxSize
                }
            })
        },
        genTBodyContext () {
            return this.$createElement('tbody', {}, [this.genTBodyChildrenContext()])
        },
        genTBodyChildrenContext () {
            const props = {
                columns: this.columns,
                loading: this.loading,
                loadingText: this.loadingText,
                dataItems: this.dataItems,
                noDataText: this.noDataText
            }
            return this.$scopedSlots.default ? [this.genSlotContext('default', props)] : this.genItemsContext(props)
        },
        genItemsContext (props) {
            const { columns, loading, dataItems, noDataText, loadingText } = props
            if (loading) {
                return [
                    this.genRowContext(Math.max(columns.length, 1), loadingText, null, 'loading', '', this.genLoadingContext)
                ]
            }
            if (dataItems.length === 0) {
                return [
                    this.genRowContext(Math.max(columns.length, 1), noDataText, null, 'empty', '', this.genNoDataContext)
                ]
            }
            return dataItems.map((item, dx) => this.genRowContext(item, columns, {
                'aria-rowindex': dx,
                'aria-pressed': dx === this.activeIndex,
                'aria-selected': dx === this.selectIndex
            }, dx, 'ROW_', this.genColContext))
        },
        genRowContext (row, col, props, key, prefix, callback) {
            return this.$createElement('tr', {
                key: prefix + key,
                style: this.getComputedStyle(row, props),
                domProps: props,
                attrs: props,
                on: {
                    click: e => {
                        e.stopPropagation()
                        this.$emit('row:click', key)
                    },
                    dblclick: e => {
                        e.stopPropagation()
                        this.$emit('row:dblclick', key)
                    }
                }
            }, callback.apply(this, [row, col]))
        },
        genColContext (row, cols) {
            const children = []
            if (this.selectable) {
                children.push(this.genColCheckboxContext(row, this.selectKey))
            }
            return cols.reduce((accum, current, dx, ary) => {
                accum.push(this.genColItemContext(row, current, dx, ary.length - 1))
                return accum
            }, children)
        },
        genColItemContext (row, item, dx, max) {
            return this.$createElement('td', {
                staticClass: 'mux-text-' + item.align,
                style: Table.isFunction(item.cellStyle) ? item.cellStyle.apply(this, [row, item.field, dx]) : item.cellStyle,
                class: { 'mux-table-cell--is-editable': item.editable },
                domProps: {
                    ariaLabel: item.field,
                    ariaColIndex: dx,
                    ariaModal: 'false'
                },
                attrs:{"data-editor-dialog":"false"},
                on: {
                    click: e => {
                        this.handleClick(e, item, row)
                    }
                },
                key: `TD_${dx}`
            }, [
                item.slotable ? this.genSlotContext(item.slot, { item: row }) : this.genCellContext(item.formatter(row, item.field)),
                item.editable ? this.genEditContext(row, item.field, dx, max) : null
            ])
        },
        genColCheckboxContext (row, key) {
            return this.$createElement('td', {
                staticClass: 'mux-text-center',
                key: 'TD_CHECKBOX'
            }, [this.genCheckboxWrapContext(row, key)])
        },
        genCheckboxWrapContext (row, key) {
            return this.$createElement('div', {
                staticClass: 'mux-table-cell mux-table-cell--is-checkbox',
                domProps: { role: 'checkbox' }
            }, [this.genCheckboxContext(row, key)])
        },
        genCheckboxContext (row, key) {
            return this.$createElement(Checkbox, {
                props: {
                    checkboxValue: row[key],
                    value: this.value
                },
                on: {
                    input: val => {
                        this.$emit('change', val)
                    }
                }
            })
        },
        genEditContext (row, field, index, max) {
            return this.$createElement(Editor, {
                props: {
                    cell: row,
                    field: field,
                    position: index === 0 ? 'left' : index === max ? 'right' : 'center'
                },
                on: {
                    submit: (row ,key,value)=> {
                        this.$emit('cell:input', row,key,value)
                    }
                }
            })
        },
        genLoadingContext (colspan, txt) {
            return [
                this.$createElement('td', {
                    staticClass: 'mux-text-center mux-table--is-loading',
                    attrs: {
                        colspan: colspan
                    }
                }, this.$scopedSlots.process ? this.genSlotContext('process', { loadingText: txt }) : [this.genCellContext(txt)])
            ]
        },
        genNoDataContext (colspan, txt) {
            return [
                this.$createElement('td', {
                    staticClass: 'mux-text-center mux-table--is-empty',
                    attrs: {
                        colspan: colspan
                    }
                }, this.$scopedSlots.empty ? this.genSlotContext('empty', { noDataText: txt }) : [this.genCellContext(txt)])
            ]
        },
        genCellContext (txt) {
            return this.$createElement('div', {
                domProps: {
                    title: txt
                },
                staticClass: 'mux-table-cell',
                class: { 'mux-table-cell-ellipsis': this.sealed }
            }, txt)
        },
        genSlotContext (slot, props) {
            return this.$scopedSlots[slot].call(this, props)
        }
    },
    render (h) {
        return h('table', {
            staticClass: 'mux-table-meta',
            class: { 'mux-table--is-fill-width': this.fillWidth || this.loading || this.dataItems.length === 0, 'mux-table--is-hoverable': this.hoverable },
            attrs: {
                skin: this.skin,
                size: this.size,
                cellpadding: 0,
                cellspacing: 0,
                border: 0
            }
        }, [this.genColgroupContext(), this.genTBodyContext()])
    }
}
