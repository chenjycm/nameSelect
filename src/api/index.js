import axios from 'axios'
import config from '../config'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials=false

const prepare=function(api,params){
    let _data={
        api:api,
        params:params
    }
    _data.api=api.indexOf("http")==-1?config.api+api:_data.api
    if(_data.api.indexOf("?")==-1){
        _data.api+="?"
    }
    return _data
}

export default{
    post:function(api,params){
        return new Promise((resolve,reject)=>{
            let _data=prepare(api,params)
            let _self=this
            axios.post(_data.api,qs.stringify(params)).then(res=>{
                let _data=_self.before(res.data)
                if(_data && _data.rscode==0){
                    resolve(_data)
                }
                reject(_data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    get:function(api,params,config){
        return new Promise((resolve,reject)=>{
            let _data=prepare(api,params)
            let _self=this
            axios.get(_data.api+qs.stringify(params),{...config}).then(res=>{
                if(typeof(res)=="string"){
                    res=eval("("+res+")")
                }
                let _data=_self.before(res.data)
                if(_data && _data.rscode==0){
                    resolve(_data)
                    return
                }
                reject(_data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    before:function(data){
        if(typeof(data)=="string"){
            data=eval("("+data+")")
        }
        if(data && !data.rscode){
            data.rscode=data.error_no || 0
            data.message=data.error_info || ""
        }
        return data
    }
}