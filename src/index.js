import Vue from 'vue';
import Loop from './../components/loop.vue';

const app = new Vue({
	el: "#app",
	components:{
		'loop': Loop
	},
	data: {
		texts: [
			{
				text: 'テキスト1'
			},
			{
				text: 'テキスト2'
			},
		]
	}
});
