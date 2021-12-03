/**
 * @format
 * @description 用于格式化表头
 * @author niyang
 */

export default class Cell {
    constructor (options, width, key, parentKey) {
        this.key = key
        this.parentKey = parentKey
        this.width = width
        this.text = null
        this.field = null
        this.align = 'center'
        this.weight = 0
        this.style = null
        this.class = null
        this.colspan = 1
        this.rowspan = 1
        this.slot = null
        this.editable = false
        this.sortable = false
        this.fixed = false
        this.slotable = false
        this.cellStyle = null
        this.formatter = (row, key) => row[key]

        for (const key in options) {
            this.set(this, key, options[key])
        }
    }

    set (context, key, value) {
        if (
            [
                'text',
                'field',
                'width',
                'weight',
                'align',
                'style',
                'class',
                'colspan',
                'rowspan',
                'slot',
                'editable',
                'sortable',
                'fixed',
                'slotable',
                'cellStyle',
                'formatter'
            ].includes(key)
        ) {
            context[key] = value
        }
    }

    isSole () {
        return this.colspan === 1
    }

    isOverlap () {
        return this.rowspan > Math.max(this.weight, 0)
    }
}
