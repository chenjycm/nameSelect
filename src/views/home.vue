<template>
    <div class="main">
        <h2 class="title">康熙笔画常用字选名字</h2>
        <tian-di></tian-di>
        <div class="hello">
            <div class="title-row">第一个字</div>
            <div class="inner">
                <el-input class="input" v-model="value1" placeholder="请输入姓"></el-input>
            </div>
            <div class="title-row">第二个字</div>
            <div class="inner">
                <el-select class="select" v-model="value2" placeholder="第二个数笔画">
                    <el-option
                    v-for="item in wordscounts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="select" v-model="value2Shu" placeholder="属性">
                    <el-option
                    v-for="item in valueShuOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="input" v-model="value2Gu" placeholder="固定字"></el-input>
                <el-input class="input" v-model="value2Except" placeholder="第二个字排除"></el-input>
            </div>
            <div  class="title-row">第三个字</div>
            <div class="inner">
                <el-select class="select" v-model="value3" placeholder="第三个数笔画">
                    <el-option
                    v-for="item in wordscounts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="select" v-model="value3Shu" placeholder="属性">
                    <el-option
                    v-for="item in valueShuOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="input" v-model="value3Gu" placeholder="固定字"></el-input>
                <el-input class="input" v-model="value3Except" placeholder="第三个字排除"></el-input>
            </div>
        </div>
        <div class="btn-row">
            <el-button class="btn-get" type="primary" round @click="getName">获取名字</el-button>
        </div>
        <div class="list-box">
            <div class="tag-box" v-if="namesInPage && namesInPage.length > 0">
                <el-tag class="name-item" 
                    v-for="(item, index) in namesInPage" 
                    :key="index"
                >
                    {{item.value}}
                </el-tag>
            </div>
            <div class="pagination-box">
                <el-pagination
                    v-if="names && names.length > 0"
                    background
                    layout="prev, pager, next"
                    :total="names.length"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change="pageChange"
                    >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script> 
import { mapActions, mapGetters } from "vuex";
import kangxi from '../assets/js/kangxi';
import axios from 'axios'
import TianDi from '../components/TianDi';

export default {
    name: 'home',
    components: {
       TianDi
    },
    data () {
        return {
          value1: "", //姓
          value2: "", //第二个数笔画
          value3: "", //第三个数笔画
          value2Gu: "", //第二个 固定文字
          value3Gu: "", //第三个 固定文字
          value2Shu: "", //第二个 属性
          value3Shu: "", //第三个 属性
          value2Except: "", //第二个排除文字
          value3Except: "", //第三个排除文字
          valueShuOptions: kangxi.kxWuxing,
          names: [],
          currentPage: 1,
          pageSize: 48,
        }
    },
    computed:{
        ...mapGetters(["wordscounts"]),
        namesInPage(){
            const size = this.pageSize
            let start = (this.currentPage - 1)* size;
            let end = this.currentPage*size;
            let _arr = this.names.slice(start, end);
            return  _arr
        }
    }, 
    mounted(){
        let tempInfo = localStorage.getItem("tempvalue");
        if(tempInfo){
            tempInfo = JSON.parse(tempInfo);
            this.value1 = tempInfo.value1.value;
            this.value2 = tempInfo.value2.value;
            this.value3= tempInfo.value3.value;
            this.value2Gu= tempInfo.value2.valueGu;
            this.value3Gu= tempInfo.value3.valueGu;
            this.value2Shu= tempInfo.value2.valueShu;
            this.value3Shu= tempInfo.value3.valueShu;
            this.value2Except= tempInfo.value2.valueExcept;
            this.value3Except= tempInfo.value3.valueExcept; 
        }
        // axios.get('http://localhost:3000/users').then(data=>{

        // }).catch(err=>{

        // })
        this.getWordsCount().then(data=>{
        }).catch(err=>{
        })
    },
    methods:{
         ...mapActions(["getWordsCount"]),
        getName(){
            let {value1, value2, value3, value2Gu, value3Gu, value2Shu, value3Shu, value2Except, value3Except} = this;
            this.currentPage = 1;
            this.names = [];
            let val2Arr = kangxi.kxString(value2);
            let val3Arr = kangxi.kxString(value3);
            if(value2Except){
                val2Arr = val2Arr.filter((item,index)=>{
                    return value2Except.indexOf(item.name) == -1
                })
                
            }
            if(value3Except){
                val3Arr = val3Arr.filter((item,index)=>{
                    return value3Except.indexOf(item.name) == -1
                })
            }
            let newArr = [];
            let saveInfo = {
                value1:{
                    value: value1
                } ,
                value2:{
                    value: value2,
                    valueShu: value2Shu || "",
                    valueGu: value2Gu || "",
                    valueExcept: value2Except || ""
                },
                value3:{
                    value: value3,
                    valueShu: value3Shu || "",
                    valueGu: value3Gu || "",
                    valueExcept: value3Except || ""
                }
            }
            localStorage.setItem("tempvalue",JSON.stringify(saveInfo))
            if(value2Gu && !value3Gu){  //第二个字固定，处理第三个字
                for(let j = 0; j < val3Arr.length; j++){
                    let item3 = val3Arr[j];
                    if(value3Shu && item3.type == value3Shu || !value3Shu){ //选择了属性
                        let _name = { value: value1 + value2Gu + item3.name + "（" +  (value2Gu.type||"-") + (item3.type||"-") +"）"};
                        newArr.push(_name)
                    }
                }
            }else if(!value2Gu && value3Gu){ //第3n个字固定，处理第2个字
                for(let i = 0; i < val2Arr.length; i++){
                    let item2 = val2Arr[i];
                    if(value2Shu && value2Shu == item2.type || !value2Shu){
                        let _name = { value: value1 + item2.name + value3Gu + "（" +  (item2.type||"-") + (value3Gu.type||"-") +"）"};
                        newArr.push(_name)
                    }
                }
            }else if(value2Gu && value3Gu){ //两个字都是固定，不处理列表
                newArr.push({ value: value1 + value2Gu + value3Gu})
            }else{  //两个字都不固定
                for(let i = 0; i < val2Arr.length; i++){
                    let item2 = val2Arr[i];
                    if(value2Shu && value2Shu == item2.type || !value2Shu){
                        for(let j = 0; j < val3Arr.length; j++){
                            let item3 = val3Arr[j];
                            if(value3Shu && item3.type == value3Shu || !value3Shu){
                                let _name = { value: value1 + item2.name + item3.name + "（" +  (item2.type||"-") + (item3.type||"-") +"）"};
                                newArr.push(_name)
                            }
                        }
                    }
                }
            }
            this.names = newArr;
        },
        pageChange(page){
            this.currentPage = page;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
@import '../assets/css/home.scss';
</style>
