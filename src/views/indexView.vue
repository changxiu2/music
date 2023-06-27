<template>
    <div class="w-screen p-4  bg-gradient-to-b from-purple-200 to-pink-200">
        <!-- 头部 -->
        <header class="h-[30px] flex justify-between box-border mb-[17px]">
            <icon icon="mi:menu" color="black" width="25" />
            <div class="w-[70%] h-screen relative">
                <input type="text" class="w-[100%] h-[30px] pl-[35px] border rounded-full text-[14px] text-[#ccc]" placeholder="Love Is Gone (Acoustic)">
                <icon class="absolute top-[7px] left-[12px]" icon="simple-line-icons:magnifier" color="#666" width="17" />
                <icon class="absolute top-[7px] right-[12px]" icon="lucide:scan-line" color="#666" width="17" />
            </div>
            <icon icon="iconamoon:microphone-light" color="black" width="25" />
        </header>
        <!-- 轮播图 -->
        <div class="swiper mySwiper h-[35vw] mt-[4.537vw] rounded-xl overflow-hidden">
            <div class="swiper-wrapper">
                <div class="swiper-slide " v-for="item in bannerList" :key="item.id">
                    <img :src="item.pic" alt="" class="w-[92.22vw] h-[35.741vw] m-auto rounded-xl">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <!-- 菜单 -->
        <div class="scroll-wrapper overflow-hidden mt-5" ref="scroll">
            <ul class="scroll-content flex w-[193vw]">
                <li class="scroll-item mr-9 text-center" v-for="item in menuList" :key="item.id">
                    <img :src="item.iconUrl" class="red-image w-[50px] h-[50px]" alt="">
                    <p class="text-[10px] text-[#888] mt-2">{{item.name}}</p>
                </li>
            </ul>
        </div>
        <!-- 推荐歌单 -->
        <div class="mt-4">
            <div class="flex justify-between wrapper mb-4">
                <div class="flex items-center">
                    <span class="font-[700]">推荐歌单</span>
                    <icon icon="ep:arrow-right-bold" color="black" width="15" />
                </div>
                <icon icon="ri:more-2-fill" color="black" width="15" />
            </div>
            <div class="scroll-wrapper overflow-hidden" ref="scrollsong">
                <ul class="scroll-content flex w-[210vw]">
                    <li class="scroll-item w-[120px] mr-3" v-for="item in song" :key="item.id">
                        <div class="w-[120px] h-[120px] rounded">
                            <img :src="item.picUrl" alt="" class="w-[120px] h-[120px] rounded-2xl">
                        </div>
                        <p class="w-[120px] text-[13px]">{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 新歌新碟 -->
        <div class="mt-4">
            <div class="flex justify-between wrapper mb-4">
                <div class="flex items-center">
                    <span class="font-[700]">新歌新碟/数字专辑</span>
                    <icon icon="ep:arrow-right-bold" color="black" width="15" />
                </div>
                <icon icon="ri:more-2-fill" color="black" width="15" />
            </div>
            <div class="scroll-wrapper overflow-hidden" ref="newsong">
                <div class="scroll-content flex w-[550vw]">
                    <ul v-for="item in newSong" :key="item.id" class="scroll-item w-[89vw]">
                        <li class=" w-[89vw] h-[14.17vw] mb-4 flex" v-for="item2 in item.resources" :key="item2.id">
                            <img :src="item2.uiElement.image.imageUrl" alt="" class="w-[14.17vw] h-[14.17vw] rounded-xl">
                            <div class="ml-2 ">
                                <p class="font-[700] text-[#000]">{{ item2.uiElement.mainTitle.title }}</p>
                                <p class="text-[13px] text-[#666]">{{item2.uiElement.subTitle.title}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 排行榜 -->
        <div class="mt-4">
            <div class="flex justify-between wrapper mb-4">
                <div class="flex items-center">
                    <span class="font-[700]">排行榜</span>
                    <icon icon="ep:arrow-right-bold" color="black" width="15" />
                </div>
                <icon icon="ri:more-2-fill" color="black" width="15" />
            </div>
            <div class="scroll-wrapper overflow-hidden" ref="scrollcharts">
                <div class="scroll-content flex w-[550vw]">
                    <ul v-for="item in charts" :key="item.id" class="scroll-item w-[85vw] p-[4vw] mr-2 bg-[#fff] rounded-xl shadow-inner">
                        <li class="flex justify-between">
                            <div class="font-[700] flex items-center">
                                <p>{{ item.uiElement.mainTitle?.title }}</p>
                                <icon icon="ep:arrow-right-bold" color="black" width="15" />
                            </div>
                            <p class="text-[11px] text-[#ccc]">{{ item.uiElement.mainTitle?.titleDesc }}</p>
                        </li>
                        <li class="w-[78vw] h-[14.17vw] mb-4 flex justify-between" v-for="(item2,index) in item.resources" :key="item2.id">
                            <img :src="item2.uiElement.image.imageUrl" alt="" class="w-[14.17vw] h-[14.17vw] rounded-xl">
                            <div class="ml-2 flex justify-start">
                                <p class="ml-4 mr-5">{{ index+1 }}</p>
                                <div>
                                    <p class="font-[700] text-[#000]">{{ item2.uiElement.mainTitle.title }}</p>
                                    <p class="text-[13px] text-[#666]">{{item2.uiElement.resourceExtInfo?.artists[0].name}}</p>
                                </div>
                            </div>
                            <p>{{item2.uiElement.labelText?.text}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from '@better-scroll/core';
    import {fetchHomepageBlockPage,fetchHomepageDragonBall,fetchPersonalizedLimit} from '@/request/index';
    export default{
        data(){
            return {
                bannerList:[],//banner数据
                menuList:[],//菜单数据
                song:[],//推荐歌单数据
                newSong:[],//新歌新碟数据
                charts:[],//排行榜数据
            }
        },
        mounted() {
            this.init(this.$refs.scroll);
            this.init(this.$refs.scrollsong);
            this.init(this.$refs.newsong);
            this.init(this.$refs.scrollcharts);
        },
        beforeDestroy() {
            this.bs.destroy()
        },
        methods:{
            init(name) {
                this.bs = new BScroll(name, {
                    scrollX: true,
                    probeType: 3,
                })
            }
        },
        async created(){
            // 轮播图
            const resBanner = await fetchHomepageBlockPage();
            this.bannerList = resBanner.data.data.blocks[0].extInfo.banners;
            // 菜单
            const resMenu = await fetchHomepageDragonBall();
            this.menuList = resMenu.data.data;
            // 推荐歌单
            const resSong = await fetchPersonalizedLimit();
            this.song = resSong.data.result;
            // 新歌新碟
            this.newSong = resBanner.data.data.blocks[5].creatives;
            // 排行榜
            this.charts = resBanner.data.data.blocks[3].creatives;
            console.log(this.charts);
        }
    }
</script>
<style scoped>
    /* scoped 样式隔离 只作用于当前页面，不影响全局的样式 */
    .swiper-pagination-bullet {
        background-color: #fff;
    }
    img{
        max-width: none;
    }
    /* 滚动条整体样式 */
    .menu::-webkit-scrollbar {
        height: 0px;
        width: 20px;
    }
    .red-image {
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }
    
</style>