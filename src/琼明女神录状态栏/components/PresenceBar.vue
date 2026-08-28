<template>
  <section class="qj-presence">
    <div class="qj-presence__head">
      <span class="qj-presence__seal">◈</span>
      <span class="qj-presence__title">在场</span>
      <span class="qj-presence__count">{{ 角色数组.length }}<i>人</i></span>
    </div>

    <div v-if="角色数组.length" class="qj-presence__list">
      <div v-for="role in 角色数组" :key="role.名" class="qj-presence__role">
        <span class="qj-presence__name">{{ role.名 }}</span>
        <div class="qj-presence__meta">
          <span v-if="role.数据.穿着衣装" class="qj-presence__dress">{{ role.数据.穿着衣装 }}</span>
          <span v-if="role.数据.当前状态" class="qj-presence__state">{{ role.数据.当前状态 }}</span>
        </div>
      </div>
    </div>

    <div v-else class="qj-presence__empty">—— 独行无伴 ——</div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

// 在场角色是 record：{ [角色名]: { 穿着衣装, 当前状态 } }
// EJS 据此控制角色是否出场，故始终置于顶部、不藏入页签
const 角色数组 = computed(() => Object.entries(store.data.世界.在场角色).map(([名, 数据]) => ({ 名, 数据 })));
</script>

<style lang="scss" scoped>
.qj-presence {
  position: relative;
  z-index: 2;
  margin: 0 0 12px;
  padding: 10px 14px 11px;
  background: linear-gradient(180deg, rgba(122, 140, 153, 0.08), rgba(122, 140, 153, 0.02) 60%, transparent);
  border-bottom: 1px solid var(--qj-moon-dim);
  box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.4);
}

.qj-presence__head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.qj-presence__seal {
  font-size: 10px;
  color: var(--qj-moon);
  transform: translateY(1px);
}

.qj-presence__title {
  font-family: var(--qj-font-display);
  font-size: 13px;
  letter-spacing: 4px;
  color: var(--qj-moon);
}

.qj-presence__count {
  margin-left: auto;
  font-family: var(--qj-font-data);
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  color: var(--qj-moon-bright);
}

.qj-presence__count i {
  font-family: var(--qj-font-display);
  font-style: normal;
  font-size: 11px;
  color: var(--qj-text-dim);
  margin-left: 2px;
}

.qj-presence__list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.qj-presence__role {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-left: 9px;
  border-left: 2px solid var(--qj-moon-dim);
  transition: border-color 0.2s;
}

.qj-presence__role:hover {
  border-left-color: var(--qj-moon);
}

.qj-presence__name {
  flex-shrink: 0;
  min-width: 3.5em;
  font-family: var(--qj-font-display);
  font-size: 15px;
  letter-spacing: 1px;
  color: var(--qj-moon-bright);
  text-shadow: 0 0 10px rgba(206, 217, 225, 0.18);
}

.qj-presence__meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  font-family: var(--qj-font-description);
  font-weight: 400;
}

.qj-presence__dress {
  font-size: 11.5px;
  color: var(--qj-text-dim);
  line-height: 1.4;
}

.qj-presence__state {
  font-size: 12.5px;
  color: var(--qj-text);
  line-height: 1.5;
}

.qj-presence__empty {
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--qj-text-dim);
  opacity: 0.7;
  padding: 2px 0;
}

@media (max-width: 560px) {
  .qj-presence__name {
    min-width: 3em;
    font-size: 14px;
  }
}
</style>
