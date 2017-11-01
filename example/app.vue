<template>
    <div>
        <input v-model="title" @change="changeName" />
        <div v-show="$validator.title.error">错误的</div>
        <div v-show="$validator.title.success">正确的</div>
        <div v-show="$validator.title.error">{{$validator.title.message}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                title:'Bingo Yang'

            }
        },
        methods:{
            changeName(ev){
                this.$validator.validate('title',this.title);
            }
        }
    }
</script>