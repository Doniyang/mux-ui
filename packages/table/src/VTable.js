import VThead from './VThead'
import VTbody from './VTbody'
import Table from './utils/Table'
import VPanel from './VPanel'
import VScrollPanel from './VScrollPanel'
import Scrollbar from './model/Scrollbar'
import roll from './directive/Roll'
import Store from './model/Store'
/**
 * @name VTable
 * @description 表格组件，实现静态表格，复杂表头、固定表头，横向滚动及固定前(连续)几列及后(连续)几列的表格
 * @slots
 *   caption @params 无
 *   pagination @params 无
 *   header @params {colgroup,columns}
 *   body @params {columns,loading,loadingText,dataItems,noDataText}
 *   loading @params {loadingText}
 *   noData @params {noDataText}
 *   columns中slotable为true的slot项,参数item
 */
export default {
    name: 'VTable',
    props: {
        /**
         * @description 表头配置
         * @type Array<Cell>,其中text、field必须配
         */
        columns: {
            type: Array,
            default: () => []
        },
        /**
         *@description 数据项
         * @type Array<object>
         */
        dataItems: {
            type: Array,
            default: () => []
        },
        /**
         *@description 表格单元格分割线 default:显示所有的分割线
         *                           row:列割线
         *                           line:行割线
         *                           none:无
         * @type string
         */
        skin: {
            type: String,
            default: 'default',
            validator (v) {
                return ['default', 'row', 'line', 'none'].indexOf(v) > -1
            }
        },
        /**
         *@description 表格尺寸 通过调节表格的字体，间隔
         */
        size: {
            type: String,
            default: 'normal',
            validator (v) {
                return ['small', 'normal', 'large'].indexOf(v) > -1
            }
        },
        /**
         * @description 单元格最小宽,当colgroup及columns的配置中没有width项时有用
         */
        cellMinWidth: {
            type: [Number, String],
            default: 60
        },
        /**
         *@description 表格的caption
         */
        caption: {
            type: String,
            default: ''
        },
        /**
         * @description 是否开启条纹显示
         */
        stripe: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否是自动完成高度计算，也就是静态表格
         */
        autocomplete: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否固定表头
         */
        fixedHeader: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否开启横向滚动
         */
        hScroll: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否正在加载数据 本组件仅实现文字展示。加载动画需要自己在process插槽中实现
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * @description 加载中文字描述
         */
        loadingText: {
            type: String,
            default: '数据在努力加载中...'
        },
        /**
         * @description 最大化显示
         * @example full为true时,会添加v-table-panel--is-full样式，将组件的宽、高设为100%
         */
        full: {
            type: Boolean,
            default: false
        },
        /**
         * @description 无数据时显示
         */
        noDataText: {
            type: String,
            default: '暂无数据'
        },
        /**
         * @description 表格高度,当full或者autocomplete为true时可以不指定，否则必须指定
         */
        height: {
            type: [Number, String],
            default: 0
        },
        /**
         * @description 表格高度,当full或者autocomplete为true时可以不指定，否则必须指定
         */
        maxHeight: {
            type: [Number, String],
            default: null
        },
        /**
         * @description 此项是为农电云-态势分析表格而加，不常用
         */
        activeIndex: {
            type: Number,
            default: -1
        },
        /**
         * @description 是否开启选择 目前仅实现checkbox类型
         */
        selectable: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否高亮
         */
        hoverable: {
            type: Boolean,
            default: false
        },
        /**
         * @description checkbox的宽
         */
        checkboxSize: {
            type: [Number, String],
            default: 40
        },
        /**
         * @description checkbox的样式
         */
        checkboxClass: {
            type: [String, Array],
            default: () => []
        },
        /**
         * @description 选择key值
         */
        selectKey: {
            type: String,
            default: 'id'
        },
        /**
         * @description 选择值
         */
        value: {
            type: Array,
            default: () => []
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
    provide () {
        return {
            updateScrollbarSize: this.setScrollbarSize,
            updateClientHeight: this.setClientHeight
        }
    },
    directives: {
        roll: {
            inserted: roll,
            update: roll
        }
    },
    data () {
        return {
            store: new Store(),
            scrollbar: new Scrollbar(),
            wrapHeight: 0,
            captionHeight: 0,
            headerHeight: 0,
            pagiantionHeight: 0,
            rowSelectIndex: -1
        }
    },
    beforeMount () {
        this.store.update(this.columns, this.cellMinWidth)
    },
    watch: {
        columns: {
            handler (cols) { this.store.update(cols, this.cellMinWidth) },
            deep: true
        },
        cellMinWidth (nv, ov) {
            if (Table.isNotEqual(nv, ov)) { this.store.update(this.columns, nv) }
        }
    },
    methods: {
        handleSort (key, direction) {
            this.dataItems.sort(function (a, b) {
                const va = a[key]
                const vb = b[key]
                const dir = direction === 'asc' ? 1 : -1
                if (!isNaN(va) && !isNaN(vb)) { return (va - vb) * dir }
                return String(va).localeCompare(String(vb)) * dir
            })
        },
        handleSelectAll (isSelected) {
            const value = isSelected ? this.dataItems.map(item => item[this.selectKey]) : []
            this.$emit('input', value)
        },
        setClientHeight (osnap, height) {
            switch (osnap) {
            case 0:
                this.wrapHeight = height
                break
            case 1:
                this.captionHeight = height
                break
            case 2:
                this.headerHeight = height
                break
            case 3:
                this.pagiantionHeight = height
                break
            default:
                break
            }
        },
        setScrollbarSize (height, width) {
            this.scrollbar.setHeight(height)
            this.scrollbar.setWidth(width)
        },
        handleScroll (e) {
            const target = e.target || e.srcElement
            this.scrollbar.setTop(target.scrollTop)
            this.scrollbar.setLeft(target.scrollLeft)
        },
        genPagiantionContext () {
            return this.$scopedSlots.pagination
                ? this.$createElement(VPanel, {
                    props: {
                        osnap: 3,
                        full: false
                    },
                    staticClass: 'mux-table-pagination'
                }, this.$scopedSlots.pagination())
                : null
        },
        genCaptionContext () {
            return this.$createElement(VPanel, {
                props: {
                    osnap: 1,
                    full: false
                },
                staticClass: 'mux-table-caption'
            }, this.$scopedSlots.caption ? this.$scopedSlots.caption() : this.caption)
        },
        hasFixedTable (rtl) {
            return !Table.has(this.$scopedSlots, ['header', 'body']) && !!this.dataItems.length && this.store.isFrozen(rtl)
        },
        genMainContext () {
            return this.$createElement('main', {
                staticClass: 'mux-table-wrap',
                class: { 'mux-table-header--is-fixed': this.fixedHeader, 'mux-table-is-xscroll': this.hScroll, 'mux-table--is-stripe': this.stripe },
                on: {
                    scroll: e => { this.handleScroll(e) }
                }
            }, [
                this.genHeaderContext(this.store.colgroup(), this.store.columns()),
                this.genBodyContext(this.store.columns()),
                this.hasFixedTable(false) ? this.genFixedTableContext(this.store.frozenColgroup(), this.store.frozenColumns(), false) : null,
                this.hasFixedTable(true) ? [this.genFixedTableContext(this.store.frozenColgroup(), this.store.frozenColumns(), true), this.scrollbar.hasVScrollBar() ? this.genScrollBarMask() : null] : null
            ].flat())
        },
        genHeaderContext (colgroup, columns) {
            const scopeSlots = {}
            this.genSlotContext('header', 'default', (key, vnode) => {
                scopeSlots[key] = vnode
            })
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
                    modifiers: { enable: this.fixedHeader }
                }]
            }, [
                this.genTHeadContext({
                    skin: this.skin,
                    size: this.size,
                    colgroup: colgroup,
                    columns: columns,
                    fillWidth: this.fillWidth,
                    preline: this.preline,
                    gutter: this.scrollbar.hasVScrollBar(),
                    barWidth: this.scrollbar.getWidth(),
                    selectable: this.selectable,
                    checkboxSize: this.checkboxSize,
                    checkboxClass: this.checkboxClass,
                    value: Table.checkAllState(this.value, this.dataItems, this.selectKey),
                    indeterminate: Table.checkSomeState(this.value, this.dataItems, this.selectKey),
                    sealed: !Table.has(this.$scopedSlots, ['header', 'body']) && !!this.dataItems.length && Table.sealed(columns)
                },
                scopeSlots)
            ])
        },
        genBodyContext (columns) {
            const scopedOpts = {}
            const slots = [
                { scoped: 'process', slot: 'loading' },
                { scoped: 'default', slot: 'body' },
                { scoped: 'empty', slot: 'noData' }
            ]
            slots.forEach(item => {
                this.genSlotContext(item.slot, item.scoped, (scoped, vnode) => {
                    scopedOpts[scoped] = vnode
                })
            })
            columns.forEach(item => {
                if (item.slotable) {
                    this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
                        scopedOpts[scoped] = vnode
                    })
                }
            })
            return this.$createElement(VScrollPanel, {
                staticClass: 'mux-table-body',
                props: {
                    height: this.autocomplete ? 'auto' : this.wrapHeight - this.pagiantionHeight - this.captionHeight - this.headerHeight,
                    maxHeight: this.maxHeight
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
                    size: this.size,
                    fillWidth: this.fillWidth,
                    columns: columns,
                    dataItems: this.dataItems,
                    loading: this.loading,
                    loadingText: this.loadingText,
                    noDataText: this.noDataText,
                    rowStyle: this.rowStyle,
                    hoverable: this.hoverable,
                    activeIndex: this.activeIndex,
                    selectable: this.selectable,
                    checkboxSize: this.checkboxSize,
                    selectKey: this.selectKey,
                    value: this.value,
                    sealed: !Table.has(this.$scopedSlots, ['header', 'body']) && !!this.dataItems.length && Table.sealed(columns)
                },
                scopedOpts)
            ])
        },
        genTHeadContext (props, slots) {
            return this.$createElement(VThead, {
                props: props,
                scopedSlots: slots,
                on: {
                    'sort:update': data => {
                        this.handleSort(data.sortKey, data.sortDirection)
                    },
                    change: isSelected => {
                        this.handleSelectAll(isSelected)
                    }
                }
            })
        },
        genTBodyContext (props, slots) {
            return this.$createElement(VTbody, {
                props: props,
                scopedSlots: slots,
                on: {
                    'click:cell': item => {
                        this.$emit('click:cell', item)
                    },
                    'cell:input': (row ,key,value) => {
                        this.$emit('input:cell', row ,key,value)
                    },
                    'row:click': index => {
                        this.rowSelectIndex = index
                        this.$emit('click:row', this.dataItems[index])
                    },
                    'row:dblclick': index => {
                        this.rowSelectIndex = index
                        this.$emit('dblclick:row', this.dataItems[index])
                    },
                    change: val => {
                        this.$emit('input', val)
                    }
                }
            })
        },
        genFixedTableContext (colgroup, columns, rtl) {
            const width = colgroup
                .flat()
                .reduce((curent, next) => curent + (next.isSole() ? next.width : 0), 0)
            return this.$createElement('div', {
                staticClass: 'mux-table-container',
                class: { 'mux-table-container--has-scrollbar': rtl && this.scrollbar.hasVScrollBar() },
                style: {
                    left: Table.pixel(rtl ? undefined : 0),
                    right: Table.pixel(rtl ? this.scrollbar.getWidth() : undefined),
                    width: Table.pixel(width + 1),
                    bottom: Table.pixel(this.scrollbar.getHeight())
                }
            }, [this.genFixedTheadContext(colgroup, columns), this.genFixedTBodyContext(columns)])
        },
        genFixedTheadContext (colgroup, columns) {
            return this.$createElement('div', {
                staticClass: 'mux-table-header--wrap'
            }, [
                this.genTHeadContext({
                    skin: this.skin,
                    size: this.size,
                    fillWidth: this.fillWidth,
                    colgroup: colgroup,
                    columns: columns,
                    preline: this.preline,
                    gutter: false,
                    sealed: true,
                    selectable: this.selectable,
                    checkboxSize: this.checkboxSize,
                    checkboxClass: this.checkboxClass,
                    value: Table.checkAllState(this.value, this.dataItems, this.selectKey),
                    indeterminate: Table.checkSomeState(this.value, this.dataItems, this.selectKey)
                },
                null)
            ])
        },
        genScrollBarMask () {
            return this.$createElement('div', {
                staticClass: 'mux-table-scrollbar',
                staticStyle: {
                    width: Table.pixel(this.scrollbar.getWidth()),
                    height: Table.pixel(this.headerHeight)
                },
                attrs: {
                    role: 'scrollbar'
                }
            })
        },
        genFixedTBodyContext (columns) {
            const scopedOpts = {}
            columns.flat().forEach(item => {
                if (item.slotable) {
                    this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
                        scopedOpts[scoped] = vnode
                    })
                }
            })
            return this.$createElement('div', {
                staticClass: 'mux-table-body--wrap',
                style: {
                    height: Table.pixel(this.wrapHeight - this.pagiantionHeight - this.captionHeight - this.headerHeight - this.scrollbar.getHeight())
                },
                directives: [{
                    name: 'roll',
                    value: this.scrollbar.getTop(),
                    arg: 'vertical',
                    modifiers: { enable: true }
                }]
            }, [
                this.genTBodyContext({
                    skin: this.skin,
                    size: this.size,
                    hoverable: this.hoverable,
                    fillWidth: this.fillWidth,
                    columns: columns,
                    dataItems: this.dataItems,
                    rowStyle: this.rowStyle,
                    activeIndex: Table.parse(this.activeIndex, this.rowActiveIndex),
                    selectIndex: this.rowSelectIndex,
                    sealed: true,
                    selectable: this.selectable,
                    checkboxSize: this.checkboxSize,
                    selectKey: this.selectKey,
                    value: this.value
                },
                scopedOpts)
            ])
        },
        genSlotContext (slot, key, callback) {
            if (this.$scopedSlots[slot]) {
                callback.apply(this, [key, props => this.$scopedSlots[slot].call(this, props)])
            }
        }
    },
    render (h) {
        return h(VPanel, {
            staticClass: 'component mux-table',
            style: {
                height: Table.pixel(this.autocomplete || this.full ? undefined : this.height)
            },
            props: {
                full: this.full,
                osnap: 0
            }
        }, [this.genCaptionContext(), this.genMainContext(), this.genPagiantionContext()])
    }
}
