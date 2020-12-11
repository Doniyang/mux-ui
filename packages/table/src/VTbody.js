import Table from "./utils/Table"
import VColgroup from "./VColgroup"

export default {
	name: 'VTbody',
	props: {
		skin: {
			type: String
		},
		colgroup: {
			type: Array,
			default: () => []
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
		activeIndex: {
			type: Number,
			default: -1
		}
	},
	methods: {
		handleClick(clickable, item) {
			if (clickable) this.$emit('click:cell', item)
		},
		genColgroupContext() {
			return this.$createElement(VColgroup, {
				props: {
					columns: this.columns,
					colgroup: this.colgroup,
					gutter: false
				}
			})
		},
		genTBodyContext() {
			return this.$createElement('tbody', {}, [this.genTBodyChildrenContext()])
		},
		genTBodyChildrenContext() {
			let columns = Table.make(this.colgroup, this.columns);
			let props = {
				columns: columns,
				loading: this.loading,
				loadingText: this.loadingText,
				dataItems: this.dataItems,
				noDataText: this.noDataText
			}
			return this.$scopedSlots.default ? [this.genSlotContext('default', props)] : this.genItemsContext(props);
		},
		genItemsContext(props) {
			const {columns, loading, dataItems, noDataText, loadingText} = props
			if (loading) {
				console.log()
				return [this.genRowContext(columns.length, loadingText, null, 'loading', this.genLoadingContext)]
			}
			if (dataItems.length === 0) {
				return [this.genRowContext(columns.length, noDataText, null, 'empty', this.genNoDataContext)]
			}
			return dataItems.map((item, dx) => this.genRowContext(item, columns, {
				ariaRowIndex: dx,
				ariaBusy: dx === this.activeIndex
			}, 'TD' + dx, this.genColContext))
		},
		genRowContext(row, col, props, key, callback) {
			return this.$createElement('tr', {
				key: key,
				domProps: props
			}, callback.apply(this, [row, col]))
		},
		genColContext(row, cols) {
			return cols.map((item, dx) => this.$createElement('td', {
				staticClass: "mux-text-" + item.align,
				class: {"mux-table--is-editable": item.editable},
				on: {
					click: () => {
						this.handleClick(item.clickable, row);
					}
				},
				key: `TD_${dx}`
			}, [item.slotable ? this.genSlotContext(item.slot, {item: row}) : this.genCellContext(item.formator(row[item.field]))]))
		},
		genLoadingContext(colspan, txt) {
			return [this.$createElement('td', {
				staticClass: "mux-text-center mux-table--is-loading",
				attrs: {
					colspan: colspan
				}
			}, this.$scopedSlots.process ? this.genSlotContext('process', {loadingText: txt}) : [this.genCellContext(txt)])]
		},
		genNoDataContext(colspan, txt) {
			return [this.$createElement('td', {
				staticClass: "mux-text-center mux-table--is-empty",
				attrs: {
					colspan: colspan
				}
			}, this.$scopedSlots.empty ? this.genSlotContext('empty', {noDataText: txt}) : [this.genCellContext(txt)])]
		},
		genCellContext(txt) {
			return this.$createElement("div", {
				staticClass: "mux-table-cell"
			}, txt);
		},
		genSlotContext(slot, props) {
			return this.$scopedSlots[slot].call(this, props)
		}
	},
	render(h) {
		return h('table', {
			staticClass: "mux-table-wrap",
			attrs: {
				skin: this.skin,
				cellpadding: 0,
				cellspacing: 0,
				border: 0
			}
		}, [this.genColgroupContext(), this.genTBodyContext()])
	}

}