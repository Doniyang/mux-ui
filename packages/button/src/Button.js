export default {
	functional: true,
	name: "mx-button",
	props: {
		block: {
			type: Boolean,
			default: false
		},
		disable: {
			type: Boolean,
			default: false
		},
		plain: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: "normal",
			validator(v) {
				return ["small", "normal", "large"].includes(v);
			}
		},
		type: {
			type: String,
			default: "default",
			validator(v) {
				return ["default", "primary", "danger"].includes(v);
			}
		}
	},

	render(h, context) {
		return h("button", context.data, context.children);
	}
};
