export default {
    name: 'VPanel',
    inject: ['updateClientHeight'],
    props: {
        osnap: {
            type: Number,
            default: 0
        },
        tag: {
            type: String,
            default: 'div'
        },
        full: {
            type: Boolean,
            default: false
        }
    },
    created () {
        const _this = this
        window.addEventListener('resize', function onResize (e) {
            e.stopPropagation()
            _this.updateParentClientHeight()
        }, false)
    },
    updated () {
        this.$nextTick(() => {
            this.updateParentClientHeight()
        })
    },
    mounted () {
        this.$nextTick(() => {
            this.updateParentClientHeight()
        })
    },
    beforeDestroy () {
        const _this = this
        window.removeEventListener('resize', function onResize (e) {
            e.stopPropagation()
            _this.updateParentClientHeight()
        }, false)
    },
    methods: {
        updateParentClientHeight () {
            const { height } = this.$el.getBoundingClientRect()
            this.updateClientHeight(this.osnap, height)
        }
    },
    render (h) {
        return h(this.tag, {
            class: { 'mux-table-panel--is-full': this.full, 'mux-table-panel--has-free-scrollbar': this.hasXYBar },
            on: {
                resize: e => {
                    e.stopPropagation()
                    this.updateParentClientHeight()
                }
            }
        }, this.$slots.default)
    }
}
