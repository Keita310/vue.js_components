<template>
	<div class="position-relative">
		<div
			class="position-absolute text-black-50"
			style="top:.4rem;left:.7rem;"
			v-if="show"
			@click="focus = true"
		>
			<slot v-cloak></slot>
		</div>
		<textarea
			class="form-control"
			:style="{resize: 'vertical', minHeight: height + 'px'}"
			:value="value"
			@change="emit($event.target.value)"
			@blur="focus = false"
			@focus="focus = true"
		></textarea>
	</div>
</template>

<script>
import Vue from 'vue';

/**
 * HTML対応プレースホルダtextareaコンポーネント
 */
export default {
	name: 'TextareaHtmlPlaceholder',
	data: function () {
		return {
			// フォーカスフラグ
			focus: false,
			// input、textareaタグのdom
			$input: null,
		};
	},
	props: {
		// テキストエリア内容
		value: {
			require: true
		},
		// 高さ指定
		height: {
			type: Number,
			require: false
		},
	},
	computed: {
		// プレースホルダを表示
		show: function() {
			if (!this.value && !this.focus) {
				return true;
			}
			return false;
		}
	},
	watch: {
		// フォーカスの切替
		focus: function() {
			if (this.focus) {
				this.$input.focus();
			} else {
				this.$input.blur();
			}
		},
	},
	mounted: function() {
		// textareaタグのdomを代入
		this.$input = this.$el.querySelector('textarea');
	},
	methods: {

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
</style>
