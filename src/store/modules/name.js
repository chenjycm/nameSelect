// new user gift
import config from '../../config'
import api from '../../api'
const apis={
    users: `${config.gate}/users`, //列表
    addwords: `${config.gate}/addwords`, //列表
    wordscounts:`${config.gate}/wordscounts`, //笔画列表
}

// state
const state={
    // giftInfo:null,
    wordscounts: null,
}
// getters
const getters={
    // giftInfo:state=>state.giftInfo,
    wordscounts: state=>state.wordscounts,
}
// actions
const actions={
    //获取直播列表，type 0 是直播list， 1 是 录播list
    getUser({dispatch,commit},param={}){
        let params = {
            size: '',  //一页条数
        }
        return new Promise((resolve, reject) => {
            api.get(apis.users, params).then(data=>{
                let _results=data.results
                resolve(_results)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    addWords({dispatch, commit},param={}){
        let params = param
        return new Promise((resolve, reject) =>{
            api.post(apis.addwords, params).then(data=>{
                let _results=data.results
                resolve(_results)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    getWordsCount({dispatch, commit}, param={}){
        return new Promise((resolve, reject) => {
            api.get(apis.wordscounts,{}).then(data=>{
                let _results = data.results
                commit('setWordsCounts', _results)
                resolve(_results)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}
// mutations
const mutations={
    setWordsCounts(state,info){
        state.wordscounts=info
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}
