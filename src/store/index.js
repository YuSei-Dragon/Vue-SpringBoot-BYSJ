import {createStore} from 'vuex'

const store = createStore({
    state:{
        isSys:false,
    },
    mutations:{
        saveIdentify(state,issys){
            state.isSys = issys
        }
    }
})
export default store