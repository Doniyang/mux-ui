export default {
	name: 'VPanel',
	inject: ['smartTable'],
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
	created() {
		const _this = this
		window.addEventListener('resize', function onResize(e) {
			e.stopPropagation();
			_this.updateClientHeight()
		}, false)
	},
	updated() {
		this.$nextTick(() => {
			this.updateClientHeight()
		})
	},
	mounted() {
		this.$nextTick(() => {
			this.updateClientHeight()
		})
	},
	beforeDestroy() {
		const _this = this
		window.removeEventListener('resize', function onResize(e) {
			e.stopPropagation();
			_this.updateClientHeight()
		}, false)
	},
	methods: {
		updateClientHeight() {
			const {height} = this.$el.getBoundingClientRect();
			this.smartTable.setClientHeight(this.osnap, height);
		}
	},
	render(h) {
		return h(this.tag, {
			class: {"mux-table-panel--is-full": this.full},
		}, this.$slots.default);
	}
}