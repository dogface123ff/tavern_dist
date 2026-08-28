<template>
  <div class="qj-home">
    <!-- 境界主卡 -->
    <section class="qj-card qj-card--realm">
      <div class="qj-realm">
        <span class="qj-realm__label">境界</span>
        <span class="qj-realm__value">{{ store.data.主角.境界 }}</span>
      </div>
      <div class="qj-realm__meta">
        <span class="qj-chip">{{ store.data.主角.所属势力 }}</span>
      </div>
      <div class="qj-realm__status">
        <span class="qj-status-label">当前状态</span>
        <span class="qj-status-text">{{ store.data.主角.当前状态 }}</span>
      </div>
    </section>

    <!-- 修炼进度 -->
    <section class="qj-card">
      <div class="qj-card__head">
        <span class="qj-card__title">修炼进度</span>
        <span class="qj-card__value">{{ Math.round(store.data.主角.修炼进度) }}<i>/100</i></span>
      </div>
      <div class="qj-progress">
        <div class="qj-progress__track">
          <div class="qj-progress__fill" :style="{ width: store.data.主角.修炼进度 + '%' }"></div>
          <div class="qj-progress__glow" :style="{ left: store.data.主角.修炼进度 + '%' }"></div>
        </div>
      </div>
    </section>

    <!-- 功法面板 -->
    <section class="qj-card">
      <div class="qj-card__head">
        <span class="qj-card__title">功法面板</span>
      </div>
      <div class="qj-skill">
        <div class="qj-skill__main">
          <span class="qj-skill__name">{{ store.data.主角.功法面板.主修功法 }}</span>
          <span class="qj-skill__level">{{ store.data.主角.功法面板.功法重数 }}</span>
        </div>
        <div v-if="Object.keys(store.data.主角.功法面板.习得心法).length" class="qj-skill__list">
          <div v-for="(desc, name) in store.data.主角.功法面板.习得心法" :key="name" class="qj-skill__item">
            <span class="qj-skill__item-name">「{{ name }}」</span>
            <span class="qj-skill__item-desc">{{ desc }}</span>
          </div>
        </div>
        <div v-else class="qj-skill__empty">尚未习得心法</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.qj-home {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 通用卡片 */
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

/* 境界卡 */
.qj-card--realm {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.qj-realm {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.qj-realm__label {
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--qj-text-dim);
}

.qj-realm__value {
  font-family: var(--qj-font-display);
  font-size: 34px;
  line-height: 1.2;
  background: linear-gradient(180deg, var(--qj-moon-bright) 20%, var(--qj-moon) 70%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 22px rgba(122, 140, 153, 0.25);
}

.qj-realm__meta {
  display: flex;
  gap: 8px;
}

.qj-chip {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--qj-moon-bright);
  border: 1px solid var(--qj-moon-dim);
  background: rgba(122, 140, 153, 0.08);
  padding: 3px 10px;
}

.qj-realm__status {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-top: 2px;
}

.qj-status-label {
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
  flex-shrink: 0;
}

.qj-status-text {
  font-size: 13px;
  color: var(--qj-text);
  line-height: 1.5;
}

/* 修炼进度 */
.qj-progress__track {
  position: relative;
  height: 10px;
  background: #090b0d;
  border: 1px solid var(--qj-moon-dim);
  overflow: hidden;
}

.qj-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--qj-moon-dim), var(--qj-moon) 60%, var(--qj-moon-bright));
  box-shadow: 0 0 12px rgba(122, 140, 153, 0.5);
  transition: width 0.6s ease;
}

.qj-progress__glow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 26px;
  background: linear-gradient(90deg, transparent, rgba(210, 221, 229, 0.4), transparent);
  animation: qj-scan 2.2s linear infinite;
}

@keyframes qj-scan {
  0% {
    transform: translateX(-26px);
  }
  100% {
    transform: translateX(26px);
  }
}

/* 功法面板 */
.qj-skill__main {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.qj-skill__name {
  font-family: var(--qj-font-display);
  font-size: 19px;
  color: var(--qj-moon-bright);
  letter-spacing: 2px;
}

.qj-skill__level {
  font-size: 12px;
  color: var(--qj-text);
  border: 1px solid var(--qj-moon-dim);
  padding: 1px 7px;
}

.qj-skill__list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.qj-skill__item {
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.55;
  padding-left: 8px;
  border-left: 2px solid var(--qj-moon-dim);
}

.qj-skill__item-name {
  color: var(--qj-moon);
  flex-shrink: 0;
}

.qj-skill__item-desc {
  color: var(--qj-text-dim);
}

.qj-skill__empty {
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--qj-text-dim);
  opacity: 0.8;
}
</style>
