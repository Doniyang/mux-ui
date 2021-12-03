export default function (el, binding) {
    const { arg, value, modifiers } = binding
    if (modifiers.enable) {
        if (arg === 'horizontal') {
            el.scrollLeft = value
        }
        if (arg === 'vertical') {
            el.scrollTop = value
        }
    }
}
