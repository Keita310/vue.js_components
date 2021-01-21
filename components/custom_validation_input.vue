<template>
	<input
		class="form-control"
		:value="value"
		@change="emit($event.target.value)"
	>
</template>

<script>
import Vue from 'vue';

const $ = require('jquery');

// バリデーションメッセージ定義
const INVALID_MESSAGES = {
	LENGTH_OVER: '文字数を減らしてください',
	FULL_KATAKANA: '全角カタカナで入力してください',
	HALF_NUMBER: '半角数値で入力してください',
};

/**
 * カスタムバリデーションinputコンポーネント
 */
export default {
	name: 'CustomValidationInput',
	props: {
		// input内容
		value: {
			require: true
		},
		// 全角最大文字数
		full_max_width: {
			type: Number,
			require: false
		},
		// 半角最大文字数
		half_max_width: {
			type: Number,
			require: false
		},
		// 全角カタカナ
		full_katakana: {
			type: Boolean,
			require: false,
		},
		// 半角数字
		half_number: {
			type: Boolean,
			require: false
		},
	},
	computed: {
		// 最大文字数の案内文言(CSSのcontentで表示)
		maxWidthInfo: function () {
			if (this.full_max_width) {
				return '全角' + this.full_max_width + '文字';
			}
			if (this.half_max_width) {
				return '半角' + this.half_max_width + '文字';
			}
			return '';
		},
	},
	watch: {
		value: function() {
			this.updateCustomValidity();
		},
	},
	mounted: function() {
		// 初回チェック
		this.updateCustomValidity();
		// 文字数案内を表示する
		this.showMaxWidthInfo();
	},
	methods: {
		// 文字数案内を表示する
		showMaxWidthInfo: function () {
			if (this.maxWidthInfo) {
				const scope = this.$el.attributes[0].name;
				$(this.$el).wrap('<div class="input-wrap" data-max-width-info="' + this.maxWidthInfo + '" ' + scope + '>');
			}
		},
		// カスタムバリデーションメッセージを更新する
		updateCustomValidity: function () {
			let message = '';
			if (this.isOver()) {
				message = INVALID_MESSAGES.LENGTH_OVER;
			}
			if (!this.isMatchValue(this.full_katakana, /^[ァ-ヶー　]+$/)) {
				message = INVALID_MESSAGES.FULL_KATAKANA;
			}
			if (!this.isMatchValue(this.half_number, /^[0-9]+$/)) {
				message = INVALID_MESSAGES.HALF_NUMBER;
			}
			this.$el.setCustomValidity(message);
		},
		// 文字数オーバーしているか
		isOver: function() {
			// 空、nullはチェックしない
			if (!this.value) {
				return false;
			}
			let length = 0;
			for (let i=0; i<this.value.length; i++) {
				if (this.value[i].match(/[ -~\n]/) ) {
					length += 1;
				} else {
					length += 2;
				}
			}
			if (this.full_max_width && length > (this.full_max_width * 2)) {
				return true;
			}
			if (this.half_max_width && length > this.half_max_width) {
				return true;
			}
			return false;
		},
		// 入力内容が指定の正規表現にマッチしているか
		isMatchValue: function (boolean, reg) {
			// 空、nullはtrue
			if (!boolean || !this.value) {
				return true;
			}
			if (reg.test(this.value)) {
				return true;
			}
			return false;
		},

		// -------------------------
		// emit
		// -------------------------

		// フォームの内容を更新したら通知
		emit: function(value) {
			this.$emit('input', value);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/bootstrap';
.input-wrap {
	position: relative;

	input {
		padding-right: 6rem;
	}

	&::after {
		content: attr(data-max-width-info);
		position: absolute;
		top: .5rem;
		right: .6rem;
		color: #ccc;
		font-size: .9rem;
	}
}
</style>
