// new user gift
import config from '../../config'
import api from '../../api'
const apis={
    tiandi: `${config.gate}/eightwords/`
    // users: `${config.gate}/users`, //列表
    // addwords: `${config.gate}/addwords`, //列表
    // wordscounts:`${config.gate}/wordscounts`, //笔画列表
}

// state
const state={
    // giftInfo:null,
}
// getters
const getters={
    // giftInfo:state=>state.giftInfo,
   
}
// actions
const actions={
    getDateInfo({dispatch,commit},param={}){
        return new Promise((resolve, reject) => {
            api.get(apis.tiandi+param.timestamp).then(data=>{
                let _results=data.results
                resolve(_results)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    
}
// mutations
const mutations={
    // setWordsCounts(state,info){
    //     state.wordscounts=info
    // },
}

export default{
    state,
    getters,
    actions,
    mutations
}
