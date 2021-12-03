import Cell from './Cell'


export default class Store {
    constructor(columns, width) {
        this.rootKey = this.guid = 0
        this.initialize(columns, width, this.rootKey)
    }

    initialize(columns, width, parentKey) {
        columns.forEach(cfg => {
            const key = this.stamp()
            this.set(new Cell(cfg, width, key, parentKey))
            if (Array.isArray(cfg.children)) {
                this.initialize(cfg.children, width, key)
            }
        })
    }

    set(cell) {
        this.map.push(cell)
    }

    stamp() {
        return ++this.guid
    }

    isFrozen(rtl) {
        const columns = this.columns()
        const len = columns.length
        return Boolean(len) && columns[rtl ? len - 1 : 0].fixed
    }

    max() {
        return Math.max.apply(null, this.map.map(cell => cell.weight))
    }

    make(map, key) {
        return map
            .filter(node => node.parentKey === key)
            .map(cell => (cell.isOverlap() ? cell : this.make(map, cell.key)))
    }

    columns() {
        return this.make(this.map, this.rootKey).flat(this.max() + 2)
    }

    colgroup() {
        return Array.from(new Set(this.map.map(cell => cell.weight)))
            .sort((a, b) => b - a)
            .map(lvl => this.map.filter(item => item.weight === lvl))
    }

    frozenColumns() {
        const max = this.max()
        return this.make(
            this.map.filter(cell => cell.weight === max && cell.fixed),
            this.rootKey
        ).flat(max + 2)
    }

    frozenColgroup() {
        return Array.from(new Set(this.map.map(cell => cell.weight)))
            .sort((a, b) => b - a)
            .map(lvl => this.map.filter(item => item.weight === lvl && item.fixed))
            .filter(ary => Boolean(ary.length))
    }
}