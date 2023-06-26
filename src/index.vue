<!-- index.template + index.js -->
<template>
    <div class="w-screen h-screen font-[30px]">
        <div class="w-screen mt-5">
            <icon icon="ci:chevron-left" color="#000" width="30" class="float-left" />
            <h3 class="w-[80px] font-[700] text-[20px] m-auto">歌单广场</h3>
        </div>
        
        <ul class="w-screen h-[26px] overflow-hidden mt-5 mb-5 pl-8">
            <li v-for="item in menu" :key="item.id" v-on:click="toggleMenu(item.name)" class="mx-4 h-[26px] float-left mr-6 text-decoration-[#ccc]" v-bind:class="{active:item.name === activeMenuItem}">
                {{item.name}}
            </li>
        </ul>
        <ul class="flex flex-wrap justify-center">
            <li v-for="item in playlists" class="w-[90px] ml-5 mr-5 self-start align-items">
                <div class="w-[90px] h-[90px] rounded overflow-hidden">
                    <img :src="item.coverImgUrl" alt="" class="w-[90px] h-[90px] rounded-2xl">
                </div>
                <p class="w-[90px]">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                msg:'123',
                menu:[],
                activeMenuItem:'',
                playlists:[]
            }
        },
        methods:{
            toggleMenu(name){
                this.activeMenuItem = name;
                this.fetchPlaylists(name);
            },
            fetchPlaylists(cat){
                axios.get('https://netease-cloud-music-api-five-roan-88.vercel.app/top/playlist',{
                    params:{cat}
                }).then((res)=>{
                    // console.log(res.data.playlists);
                    this.playlists = res.data.playlists;
                }).catch(err=>{
                    console.log(err);
                })
            }
            // reverseMsg(){
            //     console.log(vm === this);
            //     this.$data.msg = '321';
            // }
        },
        created(){
            axios.get('https://netease-cloud-music-api-five-roan-88.vercel.app/playlist/hot')
            .then(res=>{
                // console.log(res);
                this.menu = res.data.tags;
                return this.activeMenuItem = this.menu[0].name;
            })
            .then((cat)=>{
                this.fetchPlaylists(cat);
            })
            .catch(err=>{
                console.log(err);
            })
            
        },
    }
</script>
<style>
    .active {
        color: #000;
        font-weight: 700;
        position: relative;
        z-index: 1;
    }

    .active::after {
        content: '';
        width: 100%;
        height: 5px;
        background-color: red;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 5px;
    }
</style>
<!-- 国际化自定义代码块 -->
<!-- <i18n></i18n> -->