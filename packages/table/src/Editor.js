import Button from "../../button"
export default {
    name: 'v-editor',
    props: {
        position: {
            type: String,
            default: 'center',
            validator (v) {
                return ['left', 'center', 'right'].indexOf(v) > -1
            }
        },
        cell: {
            type: [Array, Object],
            default: () => []
        },
        field: {
            type: [Number, String]
        }
    },
    data () {
        return {
            edit: ''
        }
    },
    methods: {
        handleInput (e) {
            const target = e.currentTarget || e.target || e.srcElement
            this.edit = target.value
        },
        handleClick (e, isCommit) {
            e.stopPropagation()
           const parent = this.$el.parentElement || this.$el.parentNode
           parent.setAttribute('data-editor-dialog','false')
           if(isCommit){
            if(this.edit){this.$set(this.cell, this.field, this.edit)}
              this.$emit('submit',this.cell,this.field,this.edit)
            }
        },
        genEditorContext () {
            return this.$createElement('div', {
                staticClass: 'mux-editor-wrap'
            }, [
                this.genInputContext(),
                this.genBtnContext(true, 'primary', '确定'),
                this.genBtnContext(false, 'error', '取消')
            ])
        },
        genInputContext () {
            return this.$createElement('input', {
                staticClass: 'mux-editor-field',
                domProps: {
                    value: this.cell[this.field]
                },
                on: {
                    input: e => {
                        this.handleInput(e)
                    },
                    change: e => {
                        this.handleInput(e)
                    }
                }
            })
        },
        genBtnContext (isCommit, color, text) {
            return this.$createElement(Button, {
                props: { 
                    ghost: true,
                    size: 'small',
                    color: color
                },
                on: {
                    click: e => {
                        this.handleClick(e, isCommit)
                    }
                }
            }, text)
        }    
    },
    render (h) {
        return h('div', {
            staticClass: 'component mux-editor',
            class: ['mux-editor--is-' + this.position]
        },[this.genEditorContext()])
    }
}
