<template>
    <div class="tiandi block">
        <span class="demonstration">出生日期：</span>
        <el-date-picker
            v-model="date"
            type="datetime"
            placeholder="选择出生日期（阳历）"
            @change="selectDate"
        >
        </el-date-picker>
        <div class="row">阳历：{{dateInfo && dateInfo.solarDate}}</div>
        <div class="row">阴历：{{dateInfo && dateInfo.lunarDate}}</div>
        <div class="row">
            八字：
            <div class="row box-ganzhi" v-if="dateInfo">
                <div class="ganzhi">
                    <span>{{dateInfo.gzDay.substr(0,1)}}</span>
                    <span>{{dateInfo.gzDay.substr(1,2)}}</span>
                    <div class="tag">天</div>
                </div>
                <div class="ganzhi">
                    <span>{{dateInfo.gzMonth.substr(0,1)}}</span>
                    <span>{{dateInfo.gzMonth.substr(1,2)}}</span>
                    <div class="tag">月</div>
                </div>
                <div class="ganzhi">
                    <span>{{dateInfo.gzYear.substr(0,1)}}</span>
                    <span>{{dateInfo.gzYear.substr(1,2)}}</span>
                    <div class="tag">年</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex"
import {DatePicker} from  "element-ui"
import calender  from '../_util/calender'
import formater from '../_util/formater'
export default {
    name: 'TianDi',
    data(){
        return {
            date: "",
            dateInfo: "",
        }
    },
    computed:{

    },
    mounted(){

    },
    methods:{
        ...mapActions(['getDateInfo']),
        selectDate(dateObj){
            if(dateObj){
                this.getDateInfo({timestamp: dateObj.getTime()}).then(res=>{
                     this.dateInfo = res
                })
            }else{
                this.dateInfo = ""
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tiandi{
    .row{
        margin: 10px 0;
    }
    .box-ganzhi{
        width: 400px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        max-width:100%; 
        .ganzhi{
            padding: 20px;
            border: 1px solid #333;
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            span{
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
            }
            .tag{
                position: absolute;
                right: 4px;
                bottom: 4px;
                font-size: 12px;
            }
        }
    }
}
</style>