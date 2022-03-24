import { requestAnimationFrame, cancelAnimationFrame } from './utils/Raf'
import Table from './utils/Table'
export default {
    name: 'VScrollPanel',
    inject: ['updateScrollbarSize'],
    props: {
        height: {
            type: [Number, String],
            default: 0
        },
        maxHeight: {
            type: [Number, String]
        }
    },
    data () {
        return {
            rafId: null,
            stamp: 0
        }
    },
    mounted () {
        this.updateScrollBar()
    },
    beforeDestroy () {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
        }
    },
    methods: {
        updateScrollBar () {
            this.rafId = requestAnimationFrame(this.setParentScrollBar.bind(this))
        },
        setParentScrollBar (time) {
            const el = this.$el
            this.stamp = time
            if (el) { this.updateScrollbarSize(el.offsetHeight - el.clientHeight, el.offsetWidth - el.clientWidth) }
            if (this.rafId) { cancelAnimationFrame(this.rafId) }
            this.updateScrollBar()
        }
    },
    render (h) {
        return h('div', {
            style: {
                height: Table.pixel(this.height),
                maxHeight: Table.pixel(this.maxHeight)
            }
        }, this.$slots.default)
    }
}
