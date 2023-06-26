// import Vue from 'vue/dist/vue.esm';
import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import indexView from './index.vue';
Vue.component('Icon', Icon);

const vm = new Vue({
    // 挂载节点
    el: '#app',
    // 指令是出现在模板中
    // 模版语法： 指令
    // 模版在一定程度上与html片段非常相似 html + 指令 === template
    // template: '<h1>vuejs,hello!</h1>',
    // template: '<div id="app123">{{msg}}</div>', // => <div id="app123">hello, vuejs!</div>
    // 当我不传递template选项时，存不存在template？如果存在，是什么？
    // 如果不传递template 它就会检查有没有传递el，如果传递，则将el.outHTML获取到并作为template传入
    // el.outHTML是template默认值
    // template取值流程：手动传递的模版 > el.outHTML > undefined
    render:h => h(indexView),
});

window.vm = vm;
console.log(vm);
// 以_开头的变量是私有变量或私有属性，不希望其他人去使用

// 一般情况下：我们在实例化vue传递的配置项 a => $a

// el => $el
// data => $data

// vm.msg === vm.$dara.msg; //true    对象属性代理


// function VM(config) {
//     const defaultOptions = {
//         components: {},
//         directives: {},
//         filters: {},
//     };
//     this.$options = Object.assign(defaultOptions, config);
    
//     // 实例化操作开始
//     typeof this.$options.beforeInit === "function" && this.$options.beforeInit.call(this);

//     this.$set = function(key,value){
//         this.$data[key] = value;
//         Object.defineProperty(this,key())
//     }

//     this.$data =
//         typeof this.$options.data === 'function'
//         ? this.$options.data()
//         : this.$options.data;
//     Object.keys(this.$data).forEach((key) => {
//         Object.defineProperty(this, key, {
//             get() {
//                 return this.$data[key];
//             },
//             set(value) {
//                 this.$data[key] = value;
//             },
//         });
//     });
//     Object.keys(this.$options.methods).forEach((key) => {
//         Object.defineProperty(this, key, {
//             get() {
//                 return this.$options.methods[key];
//             },
//             set(value) {
//                 this.$options.methods[key] = value;
//             },
//         });
//     });
//     // 实例化操作结束
//     typeof this.$options.afterInit === "function" && this.$options.afterInit.call(this);
// }

// const _vm = new VM({
//     el: '#app',
//     data() {
//         return {
//             msg: '123',
//             menu:[],
//         };
//     },
//     methods: {
//         fn() {
//             this.msg = [123, 321];
//         },
//     },
//     created(){
//         axios.get('https://netease-cloud-music-api-five-roan-88.vercel.app/playlist/hot').then(res=>{
//             console.log(res);
//             this.menu = res.data.tags;
//         }).catch(err=>{
//             console.log(err);
//         })
//     },
//     // 回调函数（生命周期函数）
//     // 自发执行 this指向实例对象
//     beforeInit(){//beforeCreate
//         console.log('开始初始化');
//     },
//     afterInit(){//created
//         // this.xyz = true;//没有联动效果
//         this.$set(this,'xyz',true);
//         console.log('初始化完成');
//     }
// });

// window._vm = _vm;
// _vm.fn();

// _vm对象代理了_vm.$options.methods.fn这个方法
// _vm.$options.methods.fn.bind(_vm)()