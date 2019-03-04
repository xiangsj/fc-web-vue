import Vue from "vue"
import Vuex from "vuex"
import state from "./state.js"
Vue.use(Vuex);


let vuex = new Vuex.Store({
    state:state,
});
export default vuex;
