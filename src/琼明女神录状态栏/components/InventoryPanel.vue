<template>
  <div class="qj-inventory">
    <!-- 货币 -->
    <section class="qj-card">
      <div class="qj-card__head">
        <span class="qj-card__title">货币</span>
      </div>
      <div class="qj-coin">
        <div class="qj-coin__item">
          <span class="qj-coin__value">{{ store.data.主角.储物袋.货币.金元 }}</span>
          <span class="qj-coin__label">金元</span>
        </div>
        <div class="qj-coin__item">
          <span class="qj-coin__value">{{ store.data.主角.储物袋.货币.银元 }}</span>
          <span class="qj-coin__label">银元</span>
        </div>
        <div class="qj-coin__item">
          <span class="qj-coin__value">{{ store.data.主角.储物袋.货币.铜元 }}</span>
          <span class="qj-coin__label">铜元</span>
        </div>
      </div>
    </section>

    <!-- 装备栏 -->
    <section class="qj-card">
      <div class="qj-card__head">
        <span class="qj-card__title">装备栏</span>
      </div>
      <div class="qj-equip">
        <span class="qj-equip__slot">本命武器</span>
        <span class="qj-equip__value">{{ store.data.主角.储物袋.装备栏.本命武器 }}</span>
      </div>
    </section>

    <!-- 物品 · 平铺，悬停显示分类 -->
    <section class="qj-card">
      <div class="qj-card__head">
        <span class="qj-card__title">储物</span>
        <span class="qj-card__value">{{ 物品总数 }}<i>件</i></span>
      </div>

      <div v-if="物品数组.length" class="qj-item__list">
        <div v-for="item in 物品数组" :key="item.名" class="qj-item" :title="item.物品.分类">
          <div class="qj-item__detail">
            <span class="qj-item__name">{{ item.名 }}</span>
            <span class="qj-item__desc">{{ item.物品.描述 }}</span>
          </div>
          <span class="qj-item__count">×{{ item.物品.数量 }}</span>
          <span class="qj-item__tag">{{ item.物品.分类 }}</span>
        </div>
      </div>
      <div v-else class="qj-item__empty">—— 空空如也 ——</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

// 物品是 record：{ [物品名]: { 分类, 描述, 数量 } }，平铺展示，悬停时浮现分类
const 物品数组 = computed(() => Object.entries(store.data.主角.储物袋.物品).map(([名, 物品]) => ({ 名, 物品 })));

const 物品总数 = computed(() => Object.values(store.data.主角.储物袋.物品).reduce((sum, item) => sum + item.数量, 0));
</script>

<style lang="scss" scoped>
.qj-inventory {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.qj-card {
  position: relative;
  background: linear-gradient(180deg, var(--qj-black-panel), rgba(17, 20, 24, 0.55));
  border: 1px solid var(--qj-moon-dim);
  box-shadow:
    inset 0 0 22px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(0, 0, 0, 0.6);
  padding: 14px 16px;
}

.qj-card::before {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px solid rgba(122, 140, 153, 0.18);
  pointer-events: none;
}

.qj-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 7px;
  border-bottom: 1px dashed var(--qj-moon-dim);
}

.qj-card__title {
  font-family: var(--qj-font-display);
  font-size: 15px;
  letter-spacing: 5px;
  color: var(--qj-moon);
}

.qj-card__value {
  font-family: var(--qj-font-data);
  font-variant-numeric: tabular-nums;
  font-size: 15px;
  color: var(--qj-moon-bright);
}
.qj-card__value i {
  font-family: var(--qj-font-display);
  font-style: normal;
  font-size: 11px;
  color: var(--qj-text-dim);
  margin-left: 2px;
}

/* 货币 */
.qj-coin {
  display: flex;
  gap: 10px;
}

.qj-coin__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 4px;
  border: 1px solid var(--qj-moon-dim);
  background: rgba(0, 0, 0, 0.35);
}

.qj-coin__value {
  font-family: var(--qj-font-data);
  font-variant-numeric: tabular-nums;
  font-size: 19px;
}

.qj-coin__label {
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
}

/* 装备栏 */
.qj-equip {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.qj-equip__slot {
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
  flex-shrink: 0;
}

.qj-equip__value {
  font-family: var(--qj-font-display);
  font-size: 16px;
  color: var(--qj-moon-bright);
  letter-spacing: 1px;
}

/* 物品 · 平铺 */
.qj-item__list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.qj-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  border: 1px solid rgba(122, 140, 153, 0.22);
  background: rgba(0, 0, 0, 0.3);
  transition:
    border-color 0.2s,
    background 0.2s;
}

.qj-item:hover {
  border-color: var(--qj-moon-dim);
  background: rgba(122, 140, 153, 0.06);
}

.qj-item__detail {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.qj-item__name {
  font-size: 13px;
  color: var(--qj-text);
  letter-spacing: 1px;
}

.qj-item__desc {
  font-size: 11px;
  color: var(--qj-text-dim);
  line-height: 1.4;
}

.qj-item__count {
  flex-shrink: 0;
  font-family: var(--qj-font-data);
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  color: var(--qj-moon-bright);
}

/* 悬停浮现的分类角标 */
.qj-item__tag {
  position: absolute;
  right: 8px;
  bottom: 6px;
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--qj-moon-bright);
  border: 1px solid var(--qj-moon-dim);
  background: var(--qj-black);
  padding: 0 6px;
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.2s,
    transform 0.2s;
  pointer-events: none;
}

.qj-item:hover .qj-item__tag {
  opacity: 1;
  transform: translateY(0);
}

.qj-item__empty {
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
  opacity: 0.7;
  padding: 8px 0;
}

@media (max-width: 480px) {
  .qj-coin {
    flex-direction: column;
  }
}
</style>
