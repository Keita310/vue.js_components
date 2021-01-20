<template>
	<div>
		<div>
			<button
				type="button"
				class="btn btn-light"
				@click="add()"
			>
				<i class="fas fa-plus mr-2"></i>追加
			</button>
		</div>
		<div v-dragula="main" drake="items" bag="">
			<div
				v-for="(data, index) in main"
				:key="createKey(data, index)"
				class="my-2"
			>
				<div class="bg-light border border-radius p-2">
					<div class="d-flex justify-content-between align-items-center pb-2">
						<!-- D&Dハンドル -->
						<div class="position-relative p-2">
							<i class="position-absolute fas fa-th" style="top:0;left:0;"></i>
							<div class="drag-handle position-absolute p-2" style="top:0;left:0;cursor:move;"></div>
						</div>
						<!-- 削除ボタン -->
						<button type="button" class="btn p-0" @click="remove(index)">
							<i class="fas fa-times-circle text-danger text-lg"></i>
						</button>
					</div>
					<!-- 編集エリア -->
					<div>
						<slot :data="data" :index="index"></slot>
					</div>
					<!-- 並び替え -->
					<div class="pt-2 d-flex justify-content-end align-items-center">
						<small class="text-muted">並び替え</small>
						<button
							type="button"
							class="btn btn-sm btn-secondary text-white mx-1"
							:class="{'disabled': isFirst(index)}"
							@click="prev(index)"
						>
							<i class="fas fa-arrow-up"></i>
						</button>
						<button
							type="button"
							class="btn btn-sm btn-secondary text-white"
							:class="{'disabled': isLast(index)}"
							@click="next(index)"
						>
							<i class="fas fa-arrow-down"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import Vue from 'vue';
import {Vue2Dragula} from 'vue2-dragula';
Vue.use(Vue2Dragula);

const moment = require('moment');
const sweetalert = require('sweetalert');
const _ = require('lodash');

/**
 * 繰り返し設定用コンポーネント
 */
export default {
	name: 'Loop',
	data: function () {
		return {
			// D&D時の掴んだバナーindex番号
			moveIndex: null,
			// 変更前のmain(配列はwatchで変更前データを取得できない為)
			old_main: [],
		};
	},
	props: {
		// slotで使える変数(モーダル内で編集するデータ)
		value: {
			type: Array,
			default: () => ([]),
			required: true
		},
		// 新規追加ボタンから追加する時のデータ 
		add_data: {
			type: Object,
			default: () => ({}),
			required: false
		},
		// 追加最大数
		limit: {
			type: Number,
			default: null,
			required: false
		},
	},
	created: function () {
		// dragulaの初期設定
		Vue.$dragula.createService({
			drakes: {
				items: {
					// ドラッグのハンドル要素を限定
					moves: (el, source, handle) => {
						return handle.classList.contains('drag-handle');
					},
					// ドラッグ禁止部分を指定
					invalid: (el, handle) => {
						return handle.classList.contains('no-drag');
					}
				}
			},
			eventBus: {
				$emit: (event, target) => {
					// 移動前のバナーindex番号を保持
					if (event === 'drag') {
						this.moveIndex = [].slice.call(target.container.children).indexOf(target.el);
					}
					// 移動後のバナーindex番号を取得して入れ替える
					if (event === 'drop') {
						const moveAtIndex = [].slice.call(target.container.children).indexOf(target.el);
						this.main = this.moveAt(this.main, this.moveIndex, moveAtIndex);
					}
				}
			}
		});
	},
	computed: {
		main: {
			// 編集中のデータ
			get() {
				return this.value;
			},
			set(value) {
				this.emitUpdatValue(value);
			},
		}
	},
	watch: {
		// 登録最大数を超えたらアラート、値を元に戻す
		main: {
			handler: function (value) {
				if (this.limit !== null && this.limit < value.length) {
					this.main = _.cloneDeep(this.old_main);
					sweetalert(this.limit + 'つ以上は登録できません');
				} else {
					this.old_main = _.cloneDeep(value);
				}
			},
			deep: true
		}
	},
	methods: {
		/**
		 * 配列の要素を指定位置に移動
		 * D&D後のdata入れ替えなどに使う
		 *
		 * @param array 配列データ
		 * @param index 指定要素index番号
		 * @param at 移動先index番号
		 * @returns array
		 */
		moveAt: function (array, index, at) {
			if (index === at || index > array.length - 1 || at > array.length - 1) {
				return array;
			}
			const value = array[index];
			const tail = array.slice(index + 1);
			array.splice(index);
			Array.prototype.push.apply(array, tail);
			array.splice(at, 0, value);
			return _.cloneDeep(array);
		},

		// 最初か
		isFirst: function (index) {
			return (index === 0);
		},
		// 最後か
		isLast: function (index) {
			return (this.main.length === index + 1);
		},
		// 追加
		add: function (data) {
			// this.$refs.loop.add(data)でコンポーネント外部から指定データを追加する場合は引数を使う
			if (data === undefined) {
				data = this.add_data;
			}
			this.main.unshift(data);
		},
		// 削除
		remove: function (index) {
			this.main.splice(index, 1);
		},
		// 前へ
		prev: function (index) {
			if (!this.isFirst(index)) {
				this.main = this.moveAt(this.main, index, index - 1);
			}
		},
		// 次へ
		next: function (index) {
			if (!this.isLast(index)) {
				this.main = this.moveAt(this.main, index, index + 1);
			}
		},
		// 並び替え用でキーを生成
		createKey: function (data, index) {
			return JSON.stringify(data) + index + moment().unix() + Math.random();
		},

		// -------------------------
		// emit
		// -------------------------

		// 編集内容で更新
		emitUpdatValue: function (value) {
			this.$emit('input', value);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/bootstrap';
@import '~dragula/dist/dragula.css';
</style>
