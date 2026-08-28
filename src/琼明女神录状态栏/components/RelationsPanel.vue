<template>
  <div class="qj-relations">
    <section class="qj-card">
      <div class="qj-card__head">
        <span class="qj-card__title">关系列表</span>
        <span class="qj-card__value">{{ 关系数量 }}<i>人</i></span>
      </div>

      <div v-if="关系数组.length" class="qj-relation__list">
        <div v-for="rel in 关系数组" :key="rel.名" class="qj-relation">
          <div class="qj-relation__head">
            <span class="qj-relation__name">{{ rel.名 }}</span>
            <span class="qj-relation__attitude">{{ rel.数据.关系态度 }}</span>
            <span class="qj-relation__realm">{{ rel.数据.修为 }}</span>
          </div>

          <div class="qj-relation__affect">
            <span class="qj-relation__affect-label">好感</span>
            <div class="qj-relation__affect-track">
              <div class="qj-relation__affect-fill" :style="{ width: (rel.数据.好感度 / 200) * 100 + '%' }"></div>
            </div>
            <span class="qj-relation__affect-value">{{ rel.数据.好感度 }}</span>
          </div>

          <div v-if="rel.数据.重要事件" class="qj-relation__event">
            <span class="qj-relation__event-label">事迹</span>
            <span class="qj-relation__event-text">{{ rel.数据.重要事件 }}</span>
          </div>
        </div>
      </div>

      <div v-else class="qj-relation__empty">—— 尘缘未起 · 尚无相识之人 ——</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 关系数组 = computed(() => Object.entries(store.data.关系列表).map(([名, 数据]) => ({ 名, 数据 })));

const 关系数量 = computed(() => 关系数组.value.length);
</script>

<style lang="scss" scoped>
.qj-relations {
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
  margin-bottom: 12px;
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

/* 关系条目 */
.qj-relation__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.qj-relation {
  border: 1px solid rgba(122, 140, 153, 0.28);
  border-left: 3px solid var(--qj-moon);
  padding: 11px 13px;
  background: rgba(0, 0, 0, 0.32);
  transition:
    border-color 0.2s,
    background 0.2s;
}

.qj-relation:hover {
  border-left-color: var(--qj-moon-bright);
  background: rgba(122, 140, 153, 0.05);
}

.qj-relation__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}

.qj-relation__name {
  font-family: var(--qj-font-display);
  font-size: 18px;
  color: var(--qj-moon-bright);
  letter-spacing: 2px;
}

.qj-relation__attitude {
  font-size: 12px;
  color: var(--qj-text);
  border: 1px solid var(--qj-moon-dim);
  padding: 1px 8px;
}

.qj-relation__realm {
  margin-left: auto;
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--qj-text-dim);
}

/* 好感度条 */
.qj-relation__affect {
  display: flex;
  align-items: center;
  gap: 9px;
}

.qj-relation__affect-label {
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
  flex-shrink: 0;
}

.qj-relation__affect-track {
  flex: 1;
  height: 7px;
  background: #090b0d;
  border: 1px solid var(--qj-moon-dim);
  overflow: hidden;
}

.qj-relation__affect-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--qj-moon-dim), var(--qj-moon) 60%, var(--qj-moon-bright));
  box-shadow: 0 0 8px rgba(122, 140, 153, 0.45);
  transition: width 0.6s ease;
}

.qj-relation__affect-value {
  flex-shrink: 0;
  font-family: var(--qj-font-data);
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  color: var(--qj-moon-bright);
}

/* 事迹 */
.qj-relation__event {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 8px;
  padding-top: 7px;
  border-top: 1px dashed rgba(122, 140, 153, 0.2);
}

.qj-relation__event-label {
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
  flex-shrink: 0;
}

.qj-relation__event-text {
  font-size: 12px;
  color: var(--qj-text-dim);
  line-height: 1.5;
}

.qj-relation__empty {
  text-align: center;
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--qj-text-dim);
  opacity: 0.75;
  padding: 18px 0;
}
</style>
