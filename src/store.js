import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        //id\count\price\selected
        car: []
    },
    mutations: {
        addToCar(state, goodinfo) {
            var existItem = state.car.some(function (item, index) {
                if (item.id == goodinfo.id) {
                    item.count = item.count + parseInt(goodinfo.count);
                }
                return item.id == goodinfo.id;
            });
            if (!existItem) {
                state.car.push(goodinfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        MdfToCar(state, goodinfo) {
            var existItem = state.car.some(function (item, index) {
                if (item.id == goodinfo.id) {
                    item.count = parseInt(goodinfo.count);
                }
                return item.id == goodinfo.id;
            });
            if (!existItem) {
                state.car.push(goodinfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        deleteCartItem(state, id) {
            var newInfos = state.car.filter(a => {
                return a.id != id;
            });
            state.car = newInfos;
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateSelected: (state, obj) => {
            state.car.some(item => {
                if (item.id == obj.id) {
                    item.selected = obj.selected;
                }
            });
            localStorage.setItem('car', JSON.stringify(state.car));
        }

    },
    getters: {
        GetAmount(state) {
            var amount = 0;
            state.car.forEach(a => {
                amount += a.count;
            });
            return amount;
        },
        GetGoodAmount: (state) => (id) => {
            var amountinfo = 0;
            state.car.forEach(a => {
                if (a.id === id) {
                    amountinfo = a.count;
                }
            });
            return amountinfo;
        },
        GetTotalAmount: (state) => {
            var total = 0;
            var prices = 0;
            state.car.forEach(item => {
                if (item.selected) {
                    total += item.count;
                    prices += item.price * item.count;
                }
            });
            return { total: total, prices: prices };
        },
        GetSeletedStauts: (state) => {
            var temp=[];
            state.car.forEach(item => {
                temp[item.id] = item.selected;
            });
            console.log(temp);
            return temp;
        }
    }
});

export default store;