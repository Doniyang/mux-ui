import VThead from './VThead'
import VTbody from './VTbody'
import Table from './utils/Table';
import VPanel from './VPanel';
import VScrollPanel from './VScrollPanel';
import Scrollbar from './model/Scrollbar';
import roll from './utils/Roll'

export default {
	name: 'VTable',
	props: {
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
		skin: {
			type: String,
			default: 'default',
			validator(v) {
				return ['default', 'row', 'line', 'none'].indexOf(v) > -1
			}
		},
		cellMinWidth: {
			type: [Number, String],
			default: 60
		},
		caption: {
			type: String,
			default: ''
		},
		stripe: {
			type: Boolean,
			default: false
		},
		fixedHeader: {
			type: Boolean,
			default: false
		},
		hScroll: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		loadingText: {
			type: String,
			default: '数据在努力加载中...'
		},
		full: {
			type: Boolean,
			default: false
		},
		noDataText: {
			type: String,
			default: '暂无数据'
		},
		height: {
			type: [Number, String],
			default: 0
		},
		activeIndex: {
			type: Number,
			default: -1
		}
	},
	provide() {
		return {
			smartTable: this
		}
	},
	directives: {
		roll: {
			inserted: roll,
			update: roll
		}
	},
	data() {
		return {
			scrollbar: new Scrollbar(),
			wrapHeight: 0,
			captionHeight: 0,
			headerHeight: 0,
			pagiantionHeight: 0,
		}
	},
	methods: {
		handleSort(key, direction) {
			this.dataItems.sort(function (a, b) {
				let va = a[key], vb = b[key];
				let dir = direction === 'asc' ? 1 : -1;
				if (!isNaN(va) && !isNaN(vb)) {
					return (va - vb) * dir;
				}
				return String(va).localeCompare(String(vb)) * dir;
			})
		},
		setClientHeight(osnap, height) {
			switch (osnap) {
				case 0: {
					this.wrapHeight = height;
					break;
				}
				case 1: {
					this.captionHeight = height;
					break;
				}
				case 2: {
					this.headerHeight = height;
					break;
				}
				case 3: {
					this.pagiantionHeight = height
					break;
				}
				default:
					break;
			}
		},
		setScrollbar(height, width) {
			this.scrollbar.setHeight(height);
			this.scrollbar.setWidth(width)
		},
		handleScroll(e) {
			const target = e.target || e.srcElement
			this.scrollbar.setTop(target.scrollTop);
			this.scrollbar.setLeft(target.scrollLeft);
		},
		genPagiantionContext() {
			return this.$scopedSlots.pagination ? this.$createElement(VPanel, {
				props: {
					osnap: 3,
					full: false
				},
				staticClass: "mux-table-pagination"
			}, this.$scopedSlots.pagination()) : null;
		},
		genCaptionContext() {
			return this.$createElement(VPanel, {
				props: {
					osnap: 1,
					full: false
				},
				staticClass: "mux-table-caption"
			}, this.$scopedSlots.caption ? this.$scopedSlots.caption() : this.caption);
		},
		genMainContext() {
			const colgroup = Table.makeCell(this.colgroup, this.cellMinWidth);
			const columns = Table.makeCell(this.columns, this.cellMinWidth);
			console.log(colgroup, columns);
			return this.$createElement("main", {
				staticClass: "mux-table-container",
				class: {
					"mux-table--is-stripe": this.stripe,
					"mux-table-header--is-fixed": this.fixedHeader,
					"mux-table-is-xscroll": this.hScroll
				},
				on: {
					scroll: e => {
						this.handleScroll(e)
					}
				},
			}, [
				this.genHeaderContext(colgroup, columns),
				this.genBodyContext(colgroup, columns),
				(!Table.has(this.$scopedSlots, ['header', 'body'])) && (!!this.dataItems.length) && (Table.isFixed(colgroup, false) || Table.isFixed(columns, false)) ? this.genFixedTableContext(colgroup, columns, false) : null,
				(!Table.has(this.$scopedSlots, ['header', 'body'])) && (!!this.dataItems.length) && (Table.isFixed(colgroup, true) || Table.isFixed(columns, true)) ? this.genFixedTableContext(colgroup, columns, true) : null
			]);
		},
		genHeaderContext(colgroup, columns) {
			let scopeSlots = {}
			this.genSlotContext('header', 'default', (key, vnode) => scopeSlots[key] = vnode)
			return this.$createElement(VPanel, {
				staticClass: 'mux-table-header',
				props: {
					osnap: 2,
					full: false,
					tag: 'header'
				},
				attrs: {
					role: 'header'
				},
				directives: [{
					name: 'roll',
					value: this.scrollbar.getLeft(),
					arg: 'horizontal',
					modifiers: {enable: this.fixedHeader}
				}]
			}, [this.genTHeadContext({
				colgroup: colgroup,
				columns: columns,
				gutter: this.scrollbar.hasVScrollBar(),
				barWidth: this.scrollbar.getWidth(),
				sealed: (!Table.has(this.$scopedSlots, ['header', 'body'])) && (!!this.dataItems.length) && (Table.sealed(colgroup, columns))
			}, scopeSlots),]);
		},
		genBodyContext(colgroup, columns) {
			const scopedOpts = {};
			const slots = [
				{scoped: "process", slot: "loading"},
				{scoped: "default", slot: "body"},
				{scoped: "empty", slot: "noData"}
			];
			slots.forEach(item => {
				this.genSlotContext(item.slot, item.scoped, (scoped, vnode) => {
					scopedOpts[scoped] = vnode;
				});
			});
			colgroup.forEach(item => {
				if (item.slotable) {
					this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
						scopedOpts[scoped] = vnode;
					});
				}
			});
			columns.forEach(item => {
				if (item.slotable) {
					this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
						scopedOpts[scoped] = vnode;
					});
				}
			});
			return this.$createElement(VScrollPanel, {
				staticClass: 'mux-table-body',
				props: {
					height: this.wrapHeight - this.pagiantionHeight - this.captionHeight - this.headerHeight
				},
				nativeOn: {
					scroll: e => {
						this.handleScroll(e)
					}
				},
				attrs: {
					role: 'body'
				}
			}, [
				this.genTBodyContext({
					skin: this.skin,
					colgroup: colgroup,
					columns: columns,
					dataItems: this.dataItems,
					loading: this.loading,
					loadingText: this.loadingText,
					noDataText: this.noDataText,
					activeIndex: this.activeIndex
				}, scopedOpts)
			])
		},
		genTHeadContext(props, slots) {
			return this.$createElement(VThead, {
				props: props,
				scopedSlots: slots,
				on: {
					'sort:update': (data) => {
						this.handleSort(data.sortKey, data.sortDirection)
					}
				}
			})
		},
		genTBodyContext(props, slots) {
			return this.$createElement(VTbody, {
				props: props,
				scopedSlots: slots,
				on: {
					'click:cell': (item) => {
						this.$emit('click:cell', item)
					}
				}
			})
		},
		genFixedTableContext(colgroup, columns, rtl) {
			let fixedColgroup = Table.makeFrozenCols(colgroup, rtl);
			let fixedColumns = Table.makeFrozenCols(columns, rtl);
			let width = [...fixedColgroup, ...fixedColumns].reduce((curent, next) => curent + (next.isSole() ? next.width : 0), 0)
			return this.$createElement('div', {
				staticClass: 'mux-table-container--is-fixed',
				style: {
					left: rtl ? undefined : 0,
					right: rtl ? this.scrollbar.getWidth() + 'px' : undefined,
					width: width + 'px',
					bottom: this.scrollbar.getHeight() + 'px',
				}
			}, [this.genFixedTheadContext(fixedColgroup, fixedColumns), this.genFixedTBodyContext(fixedColgroup, fixedColumns)])
		},
		genFixedTheadContext(colgroup, columns) {
			return this.$createElement('div', {
				staticClass: 'mux-table-header--wrap',
			}, [this.genTHeadContext({
				colgroup: colgroup,
				columns: columns,
				gutter: false,
				isSealed: true
			}, null)])
		},
		genFixedTBodyContext(colgroup, columns) {
			const scopedOpts = {};
			colgroup.forEach(item => {
				if (item.slotable) {
					this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
						scopedOpts[scoped] = vnode;
					});
				}
			});
			columns.forEach(item => {
				if (item.slotable) {
					this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
						scopedOpts[scoped] = vnode;
					});
				}
			});
			return this.$createElement('div', {
				staticClass: 'mux-table-body--wrap',
				style: {
					height: (this.wrapHeight - this.pagiantionHeight - this.captionHeight - this.headerHeight - this.scrollbar.getHeight()) + 'px'
				},
				directives: [{name: 'roll', value: this.scrollbar.getTop(), arg: 'vertical', modifiers: {enable: true}}]
			}, [
				this.genTBodyContext({
					skin: this.skin,
					colgroup: colgroup,
					columns: columns,
					dataItems: this.dataItems,
					activeIndex: this.activeIndex
				}, scopedOpts)
			])
		},
		genSlotContext(slot, key, callback) {
			if (this.$scopedSlots[slot]) {
				callback.apply(this, [key, props => this.$scopedSlots[slot].call(this, props)])
			}
		}
	},
	render(h) {
		return h(VPanel, {
			staticClass: "components mux-table",
			style: {
				height: this.full ? (undefined) : (isNaN(this.height) ? this.height : this.height + 'px')
			},
			props: {
				full: this.full,
				osnap: 0
			}
		}, [this.genCaptionContext(), this.genMainContext(), this.genPagiantionContext()])
	}
}