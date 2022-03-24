export default class Table {
    static sealed (columns) {
        return columns.some(cell => cell.fixed)
    }

    static has (context, keymap) {
        let validator = false
        keymap.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(context, key)) {
                validator = true
            }
        })
        return validator
    }

    static isNotEqual (a, b) {
        return !this.isEqual(a, b)
    }

    static isEqual (a, b) {
        return a === b
    }

    static isFunction (fn) {
        return typeof fn === 'function'
    }

    static checkAllState (selectList, dataItems, key) {
        const list = dataItems.map(item => item[key])
        return (!!list.length &&
            list.every(li => selectList.includes(li)) &&
            selectList.every(it => list.includes(it))
        )
    }

    static checkSomeState (selectList, dataItems, key) {
        const list = dataItems.map(item => item[key])
        return !!selectList.length && list.some(one => !selectList.includes(one))
    }

    static pixel (pixel) {
        return isNaN(pixel) ? pixel : pixel + 'px'
    }
}
