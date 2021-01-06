<template>
	<div class="TimeLine">
		<div class="tl-one" v-for="item in diaryList" :key="item.id">
			<div class="left">
				<p class="title">{{ item.title }}</p>
				<p class="content">{{ item.content }}</p>
				<div class="imgList" v-if="item.imgList.length !== 0">
					<div class="imgc" v-for="(subItem, index) in item.imgList" :key="index">
						<img :src="$withBase(subItem)" alt="" />
					</div>
				</div>
				<span class="more" v-if="item.imgList.length !== 0">DETAILS</span>
			</div>
			<div class="right">
				<div class="date">
					<span class="month">{{ item.month }} {{ item.day }}</span>
					<span class="year">{{ item.year }}</span>
				</div>
			</div>
		</div>
		<!-- <img src="@imgs/avatar.png" alt="" /> -->
	</div>
</template>
<script>
import { diary } from "./diary.js"
export default {
	name: "TimeLine",
	data() {
		return {}
	},
	computed: {
		diaryList() {
			let temp = []
			diary.forEach(item => {
				let arr = item.date.split(".")
				item.year = arr[0]
				// 切割后的是字符串，得转成数字
				item.month = this.changMonth(parseInt(arr[1]))
				item.day = arr[2]
				// 这里顺便做个倒序
				temp.unshift(item)
			})
			return temp
		}
	},
	mounted() {},
	methods: {
		changMonth(str) {
			let arr = [
				{ key: 1, value: "Jan" },
				{ key: 2, value: "Feb" },
				{ key: 3, value: "Mar" },
				{ key: 4, value: "Apr" },
				{ key: 5, value: "May" },
				{ key: 6, value: "June" },
				{ key: 7, value: "July" },
				{ key: 8, value: "Aug" },
				{ key: 9, value: "Sept" },
				{ key: 10, value: "Oct" },
				{ key: 11, value: "Nov" },
				{ key: 12, value: "Dec" }
			]
			// 单纯的想用一下map，可能还没找到使用的正确姿势
			let map = new Map()
			arr.forEach(item => {
				map.set(item.key, item.value)
			})
			return map.get(str)
		}
	}
}
</script>
<style lang="scss">
.TimeLine {
	width: 100%;
	height: 100%;
	.tl-one {
		width: 50%;
		height: auto;
		position: relative;
		display: flex;
		box-sizing: border-box;
		.left {
			width: 450px;
			height: 100%;
			// background: #5bbcd5;
			background: #6596a2;
			border-radius: 5px;
			padding: 20px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			p {
				margin: 0;
			}
			.title {
				font-size: 16px;
				color: #fff;
				font-weight: 600;
				letter-spacing: 2px;
				line-height: 28px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.content {
				font-size: 14px;
				color: #fff;
				font-weight: 400;
				letter-spacing: 1px;
				line-height: 20px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.more {
				width: 100%;
				display: block;
				font-size: 12px;
				color: #eee;
				text-align: right;
				letter-spacing: 1px;
				cursor: pointer;
			}
			.imgList {
				width: 100%;
				margin: 10px auto;
				display: flex;
				align-items: center;
				overflow: hidden;
				.imgc {
					width: 76px;
					height: 76px;
					display: flex;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					flex-shrink: 0;
					margin: 0 3px;
					img {
						display: block;
						max-width: 100%;
						max-height: 100%;
						transition: all 0.2s linear;
						cursor: pointer;
						&:hover {
							transform: scale(1.2);
						}
					}
				}
			}
		}
		.right {
			width: 40px;
			height: 40px;
			position: absolute;
			top: 50%;
			border: 2px solid #fff;
			border-radius: 40px;
			box-sizing: border-box;
			transform: translateY(-50%);
			background: url("../public/img/avatar.png") no-repeat;
			background-size: 100% 100%;
			// 变化的中心点
			background-position: center;
			z-index: 100;
			cursor: pointer;
			// hover中心缩放动画
			transition: all 0.2s linear;
			&:hover {
				background-size: 130% 130%;
			}
			.date {
				position: absolute;
				right: -100%;
				top: 0;
				span {
					display: block;
					font-size: 14px;
					font-weight: 600;
					line-height: 20px;
					// 两边对齐css
					// text-align: justify;
					// text-align-last: justify;
					// text-justify: inter-ideograph;
				}
			}
		}
		&:nth-child(odd) {
			// 第2n的容器样式
			justify-content: flex-start;
			border-right: 4px solid #4996aa;
			&:after {
				content: "";
				width: 46px;
				height: 4px;
				display: block;
				background: #4996aa;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -2px;
			}
			.left {
				align-items: flex-end;
				.title,
				.content {
					text-align: right;
				}
				.more {
					text-align: left;
				}
				.imgList {
					justify-content: flex-end;
				}
			}
			.right {
				right: -20px;
			}
		}
		&:nth-child(even) {
			// 第2n-1的容器样式
			justify-content: flex-end;
			border-left: 4px solid #4996aa;
			margin-left: -4px;
			transform: translate(100%, 0);
			&:before {
				content: "";
				width: 46px;
				height: 4px;
				display: block;
				background: #4996aa;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -2px;
			}
			.left {
				align-items: flex-start;
				.img {
					justify-content: flex-start;
				}
			}
			.right {
				left: -20px;
				.date {
					left: -100%;
				}
			}
		}
	}
}
</style>
