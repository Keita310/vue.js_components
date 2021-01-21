import Vue from 'vue';
import Loop from './../components/loop.vue';
import TextareaHtmlPlaceholder from './../components/textarea_html_placeholder.vue';
import CustomValidationInput from './../components/custom_validation_input.vue';

const sweetalert = require('sweetalert');

const app = new Vue({
	el: "#app",
	data: function() {
		return {
			texts: [
				{
					text: 'テキスト1'
				},
				{
					text: 'テキスト2'
				},
			],
			textarea: 'テキストエリア',
			input1: '',
			input2: '',
		};
	},
	components:{
		'loop': Loop,
		'textarea-html-placeholder': TextareaHtmlPlaceholder,
		'custom-validation-input': CustomValidationInput,
	},
	methods: {
		// 送信チェック
		send: function (e) {
			// HTML5のバリデーションエラーの場合はそのままフォーム送信する
			if (!e.target.form.checkValidity()) {
				return;
			}
			e.preventDefault();
			sweetalert('valid!');
		}
	},
});
