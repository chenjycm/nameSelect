import vue from 'vue'
import vuex from 'vuex'
import name from './modules/name'
import date from  './modules/date'

vue.use(vuex)

export default new vuex.Store({
    modules:{
        name,
        date
    },
})