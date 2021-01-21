import Vue from 'vue';
import Loop from './../components/loop.vue';
import TextareaHtmlPlaceholder from './../components/textarea_html_placeholder.vue';

const app = new Vue({
	el: "#app",
	components:{
		'loop': Loop,
		'textarea-html-placeholder': TextareaHtmlPlaceholder
	},
	data: {
		texts: [
			{
				text: 'テキスト1'
			},
			{
				text: 'テキスト2'
			},
		],
		textarea: 'テキストエリア'
	}
});
