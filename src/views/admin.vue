<template>
    <div class="main">
        <div class="row">
            <el-input class="input" type="number" v-model="count" placeholder="数笔画，如：6" ></el-input>
        </div>
        <div class="row">
            <el-input type="textarea" class="words" v-model="words" placeholder="请输入相同笔画数的文字，例如：安(土)百(水)冰(水)，以上均为6画的字" ></el-input>
        </div>
        <el-button class="save" type="primary" round @click="addwords">保存</el-button>
    </div>
</template>

<script> 
import { mapActions } from "vuex";
import axios from 'axios'
// import { Message } from 'element-ui';
export default {
    name: 'admin',
    components: {
       
    },
    data () {
        return {
          words:"",
          count: "",
        }
    },
    computed:{
       
    }, 
    mounted(){
        
    },
    methods:{
         ...mapActions(["addWords"]),
        addwords(){
            const { words, count } = this;
            if(!count){
                Message.error({
                    message: '未输入笔画数',
                })
                return
            }
            var arr1 = words.split(')');
            var _arr = [];
            for(var i = 0; i < arr1.length; i++){
                var arrItem = arr1[i].split("(");
                if(arrItem[0]){
                    _arr.push({
                        value: arrItem[0],
                        type: arrItem[1],
                        count: +count,
                    })
                }
            }
            if(_arr.length == 0){
                 Message.error({
                    message: '未输入文字内容，以: 宋(木) 为例',
                })
                return
            }
            this.addWords({data: JSON.stringify(_arr)}).then(data=>{
               let rows = data.rows;
                Message.success({
                    message: "新增数据"+rows+"条",
                })
                this.count = "";
                this.words ="";
            }).catch(err=>{
                Message.error({
                    message: 'err.msg',
                })
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
.main{
    max-width: 1000px;
    text-align: left;
    margin: 0 auto;
    padding: 15px;
    .row{
        margin-bottom: 15px;
    }
    .save{
        float: right;
    }
}
</style>
