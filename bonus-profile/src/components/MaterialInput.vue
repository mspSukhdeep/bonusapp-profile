<template>
    <div class="inpt-wrpr" :class="{'inpt-wrpr--focus': focus, 'inpt-wrpr--err': value.error, 'inpt-wrpr--fl': value.type==='file', 'inpt-wrpr--dsbld': value.disabled}">
        <label class="inpt-lbl" :class="{'inpt-lbl--vsbl': value.data}">{{placeholder}}</label>
        
        <input :type="value.type || 'text'" 
            class="inpt" 
            :placeholder="placeholder" 
            :value="value.data" 
            :readonly="value.disabled"
            @input="$emit('input', getInputData($event.target.value))"
            @focus="!value.disabled && (focus = true)" 
            @blur="focus = false"
        />
        <div class="inpt-err">{{value.error}}</div>
    </div>
</template>
<script>

export default {
    name: 'MaterialInput',
    props: ['value', 'placeholder'],
    
    data: function() {
        return {
            focus: false
        }
    },
    methods: {
        getInputData: function(newInputValue){
            return {
                data: newInputValue,
                error: this.error,
                type: this.value.type,
                disabled: this.value.disabled
            }
        }
    }
}
</script>

<style lang="less">

</style>
