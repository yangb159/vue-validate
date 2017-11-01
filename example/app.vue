<template>
    <div>
        <input v-model="name" @change="changeName" />
        <div v-show="$validator.name.error">错误的</div>
        <div v-show="$validator.name.success">正确的</div>
        <div v-show="$validator.name.error">{{$validator.name.message}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name:'Bingo Yang'
            }
        },
        methods:{
            changeName(ev){
                console.log(this.name);
                this.$validator.validate('name',this.name);
            }
        }
    }
</script>