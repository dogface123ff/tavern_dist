<template>
  <div class="qj-location">
    <div class="qj-location__seal">✦</div>
    <div class="qj-location__text">
      <span class="qj-location__region">{{ store.data.地点位置.大区域 }}</span>
      <span class="qj-location__dot">·</span>
      <span class="qj-location__sub">{{ store.data.地点位置.子区域 }}</span>
      <span class="qj-location__dot">·</span>
      <span class="qj-location__place">{{ store.data.地点位置.具体地点 }}</span>
    </div>
    <div class="qj-location__time">{{ store.data.世界.当前时间 }}</div>
    <div class="qj-location__seal qj-location__seal--r">✦</div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.qj-location {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2px 0 12px;
  padding: 9px 14px;
  background: linear-gradient(180deg, rgba(122, 140, 153, 0.08), rgba(122, 140, 153, 0.02) 60%, transparent);
  border-top: 1px solid var(--qj-moon-dim);
  border-bottom: 1px solid var(--qj-moon-dim);
  box-shadow:
    inset 0 0 18px rgba(0, 0, 0, 0.45),
    0 1px 0 rgba(122, 140, 153, 0.25);
}

.qj-location__seal {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: var(--qj-moon);
  border: 1px solid var(--qj-moon-dim);
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.qj-location__seal--r {
  transform: rotate(-45deg);
}

.qj-location__text {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--qj-font-display);
  letter-spacing: 2px;
  min-width: 0;
}

.qj-location__region {
  font-size: 15px;
  color: var(--qj-moon);
}
.qj-location__dot {
  color: var(--qj-moon-dim);
  font-size: 11px;
}
.qj-location__sub {
  font-size: 13px;
  color: var(--qj-text);
}
.qj-location__place {
  font-size: 15px;
  color: var(--qj-moon-bright);
  text-shadow: 0 0 12px rgba(206, 217, 225, 0.25);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qj-location__time {
  flex-shrink: 0;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--qj-text-dim);
  border-left: 1px solid var(--qj-moon-dim);
  padding-left: 12px;
  white-space: nowrap;
}

@media (max-width: 560px) {
  .qj-location {
    flex-wrap: wrap;
    gap: 6px 10px;
  }
  .qj-location__time {
    width: 100%;
    border-left: none;
    padding-left: 0;
    padding-top: 3px;
  }
  .qj-location__seal {
    display: none;
  }
}
</style>
