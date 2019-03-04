<template>
    <div class="box">

        <p class="marquee">这是一个滚动字幕。</p>

    </div>
</template>


<script>
	import {UserLoginApi} from "../config/Api.js"
	import validate from "../common/validata.js"
	export default {
		data() {
			return {
				checked: false,
			}
		},
		created() {
            this.getUserInfo()
		},
		mounted() {

		},
		methods: {
            lantern($element,speed = 10) {
                    $ul[0].style.transitionDuration = "0s";
                    $ul[0].style.transform = "translateX(0)";

            },
		},


		components: {},
	}
</script>

<style scoped>
    .marquee {
        white-space: nowrap;
        overflow:-webkit-marquee;
        width: 170px;
        -webkit-marquee-direction:left;
        -webkit-marquee-speed:normal;
        -webkit-marquee-style:scroll;
        -webkit-marquee-repetition:1;
        border: 1px solid #0cf;
    }

</style>
