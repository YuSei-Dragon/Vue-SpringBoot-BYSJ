import {createStore} from 'vuex'

const store = createStore({
    state:{
        isSys:false,
        classes:{
            name:"",
            text:"",
        }
    },
    mutations:{
        saveIdentify(state,issys){
            state.isSys = issys
        },
        saveClasses(state,classes){
            state.classes.name = classes.name
            state.classes.text = classes.text
        },
    }
})
export default store