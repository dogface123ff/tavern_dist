<template>
  <nav class="qj-tabs" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="qj-tabs__btn"
      :class="{ 'qj-tabs__btn--active': model === tab.id }"
      role="tab"
      :aria-selected="model === tab.id"
      @click="model = tab.id"
    >
      <span class="qj-tabs__glyph">{{ tab.glyph }}</span>
      <span class="qj-tabs__label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: { id: string; label: string; glyph: string }[];
}>();

const model = defineModel<string>({ required: true });
void props;
</script>

<style lang="scss" scoped>
.qj-tabs {
  position: relative;
  z-index: 2;
  display: flex;
  margin: 0 2px 14px;
  border-bottom: 1px solid var(--qj-moon-dim);
  gap: 0;
}

.qj-tabs__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: var(--qj-font-display);
  font-size: 14px;
  letter-spacing: 4px;
  text-indent: 4px;
  color: var(--qj-text-dim);
  position: relative;
  transition:
    color 0.2s,
    background 0.2s;
}

.qj-tabs__btn:hover {
  color: var(--qj-moon-bright);
  background: linear-gradient(180deg, rgba(122, 140, 153, 0.07), transparent);
}

.qj-tabs__btn--active {
  color: var(--qj-moon-bright);
  text-shadow: 0 0 14px rgba(206, 217, 225, 0.35);
  background: linear-gradient(180deg, rgba(122, 140, 153, 0.12), rgba(122, 140, 153, 0.02));
}

/* 选中项下方的描金指示线 */
.qj-tabs__btn--active::after {
  content: '';
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: -1px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--qj-moon-bright), transparent);
  box-shadow: 0 0 10px rgba(206, 217, 225, 0.6);
}

.qj-tabs__glyph {
  font-size: 12px;
  color: var(--qj-moon);
}

.qj-tabs__label {
  font-family: var(--qj-font-display);
}

@media (max-width: 560px) {
  .qj-tabs__btn {
    font-size: 13px;
    letter-spacing: 2px;
    text-indent: 2px;
  }
  .qj-tabs__glyph {
    display: none;
  }
}
</style>
