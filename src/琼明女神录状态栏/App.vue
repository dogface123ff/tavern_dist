<template>
  <div class="qj-statusbar">
    <!-- 纹理噪点层 -->
    <div class="qj-noise"></div>

    <!-- 悬月 -->
    <div class="qj-moon"></div>

    <!-- 水墨远山 -->
    <svg class="qj-mountains" viewBox="0 0 760 170" preserveAspectRatio="none" aria-hidden="true">
      <path
        class="qj-mountains__far"
        d="M0 128 C 60 96, 120 118, 190 96 C 260 76, 320 106, 390 88 C 460 70, 520 100, 590 82 C 650 68, 710 92, 760 74 L 760 170 L 0 170 Z"
      />
      <path
        class="qj-mountains__near"
        d="M0 150 C 70 122, 130 140, 210 124 C 290 108, 350 132, 430 118 C 510 104, 570 128, 650 114 C 700 105, 740 116, 760 108 L 760 170 L 0 170 Z"
      />
    </svg>

    <!-- 流动雾带 -->
    <div class="qj-mist qj-mist--a"></div>
    <div class="qj-mist qj-mist--b"></div>

    <!-- 仙尘微光 -->
    <div class="qj-motes" aria-hidden="true">
      <i v-for="n in 10" :key="n"></i>
    </div>

    <!-- 四角月白黛青角饰 -->
    <i class="qj-corner qj-corner--tl"></i>
    <i class="qj-corner qj-corner--tr"></i>
    <i class="qj-corner qj-corner--bl"></i>
    <i class="qj-corner qj-corner--br"></i>

    <!-- 顶部云纹饰带 -->
    <div class="qj-meander qj-meander--top"></div>

    <!-- 标题牌匾 -->
    <header class="qj-header">
      <div class="qj-header__rule"></div>
      <div class="qj-header__text">
        <h1 class="qj-title">琼明录</h1>
        <p class="qj-subtitle">他朝若是同淋雪，此生也算共白头。</p>
      </div>
      <div class="qj-header__rule"></div>
    </header>

    <!-- 地点位置 -->
    <LocationBar />

    <!-- 在场角色 · EJS 据此控制角色出场，始终可见 -->
    <PresenceBar />

    <!-- 页签导航 -->
    <TabNav v-model="active_tab" :tabs="tabs" />

    <!-- 内容区域 -->
    <main class="qj-body">
      <transition name="qj-fade" mode="out-in">
        <HomePanel v-if="active_tab === 'home'" key="home" />
        <InventoryPanel v-else-if="active_tab === 'inventory'" key="inventory" />
        <RelationsPanel v-else key="relations" />
      </transition>
    </main>

    <!-- 底部云纹饰带 -->
    <div class="qj-meander qj-meander--bottom"></div>
  </div>
</template>

<script setup lang="ts">
import HomePanel from './components/HomePanel.vue';
import InventoryPanel from './components/InventoryPanel.vue';
import LocationBar from './components/LocationBar.vue';
import PresenceBar from './components/PresenceBar.vue';
import RelationsPanel from './components/RelationsPanel.vue';
import TabNav from './components/TabNav.vue';
import { useDataStore } from './store';

// 建立 MVU 数据连接（内容区渲染数据）
const store = useDataStore();
void store;

const tabs = [
  { id: 'home', label: '主角', glyph: '◇' },
  { id: 'inventory', label: '储物袋', glyph: '◇' },
  { id: 'relations', label: '关系', glyph: '◇' },
];

const active_tab = useLocalStorage<string>('琼明女神录状态栏:active_tab', 'home');
</script>

<style lang="scss" scoped>
.qj-statusbar {
  --qj-pad: 24px;
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: var(--qj-pad);
  color: var(--qj-text);
  font-family: var(--qj-font-body);
  font-size: 14px;
  line-height: 1.6;
  isolation: isolate;
  overflow: hidden;

  /* 玄漆玉雾 · 分层 */
  background:
    /* 雪夜冷照 · 压低暖意，仅余稀薄月色 */
    radial-gradient(circle at 12% 18%, rgba(192, 207, 221, 0.035) 0 1px, transparent 1.5px),
    radial-gradient(circle at 88% 12%, rgba(192, 207, 221, 0.028) 0 1px, transparent 1.5px),
    radial-gradient(circle at 78% 82%, rgba(192, 207, 221, 0.025) 0 1px, transparent 1.5px),
    radial-gradient(circle at 22% 90%, rgba(192, 207, 221, 0.022) 0 1px, transparent 1.5px),
    radial-gradient(circle at 55% 42%, rgba(192, 207, 221, 0.02) 0 1px, transparent 1.5px),
    /* 寒雾沉浮 */ radial-gradient(ellipse 420px 150px at 12% 22%, rgba(123, 143, 162, 0.045), transparent 70%),
    radial-gradient(ellipse 480px 170px at 88% 78%, rgba(112, 132, 153, 0.04), transparent 70%),
    radial-gradient(ellipse 360px 140px at 76% 8%, rgba(135, 153, 171, 0.04), transparent 70%),
    radial-gradient(ellipse 320px 120px at 30% 95%, rgba(108, 128, 148, 0.035), transparent 70%),
    /* 孤月寒光 */ radial-gradient(ellipse at 50% 0%, rgba(181, 199, 216, 0.045), transparent 55%),
    radial-gradient(ellipse at 50% 130%, rgba(0, 0, 0, 0.78), transparent 60%),
    linear-gradient(180deg, #090b10 0%, var(--qj-black) 35%, #07090d 100%);

  /* 月白黛青双线外框 */
  border: 1px solid var(--qj-moon-line);
  box-shadow:
    0 0 0 1px rgba(122, 140, 153, 0.3),
    0 0 0 6px rgba(0, 0, 0, 0.55),
    0 6px 24px rgba(0, 0, 0, 0.5),
    inset 0 0 34px rgba(0, 0, 0, 0.55);
}

/* 玉光斜纹 */
.qj-statusbar::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(105deg, transparent 42%, rgba(206, 217, 225, 0.05) 50%, transparent 58%);
  pointer-events: none;
}

/* 月白黛青内框 */
.qj-statusbar::after {
  content: '';
  position: absolute;
  inset: 8px;
  z-index: 1;
  border: 1px solid var(--qj-moon-line);
  opacity: 0.55;
  pointer-events: none;
}

/* 纹理噪点 */
.qj-noise {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.055;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* 孤月 · 寒光将尽 */
.qj-moon {
  position: absolute;
  top: 28px;
  right: 13%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 1;
  background: radial-gradient(
    circle at 38% 34%,
    #e6ecef 0%,
    #c6d1da 44%,
    rgba(174, 191, 204, 0.4) 69%,
    rgba(174, 191, 204, 0) 80%
  );
  box-shadow:
    0 0 16px 3px rgba(181, 202, 218, 0.1),
    0 0 48px 16px rgba(150, 173, 192, 0.045);
  animation: qj-moon-breathe 12s ease-in-out infinite;
  pointer-events: none;
}
.qj-moon::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 62% 58%, rgba(150, 166, 178, 0.28) 0 6px, transparent 7px),
    radial-gradient(circle at 40% 68%, rgba(150, 166, 178, 0.2) 0 4px, transparent 5px),
    radial-gradient(circle at 68% 34%, rgba(150, 166, 178, 0.18) 0 3px, transparent 4px);
}
@keyframes qj-moon-breathe {
  0%,
  100% {
    box-shadow:
      0 0 16px 3px rgba(181, 202, 218, 0.1),
      0 0 48px 16px rgba(150, 173, 192, 0.045);
  }
  50% {
    box-shadow:
      0 0 20px 4px rgba(181, 202, 218, 0.14),
      0 0 56px 18px rgba(150, 173, 192, 0.065);
  }
}

/* 水墨远山 · 若隐若现 */
.qj-mountains {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 170px;
  z-index: 0;
  pointer-events: none;
}
.qj-mountains__far {
  fill: rgba(90, 108, 126, 0.07);
}
.qj-mountains__near {
  fill: rgba(64, 79, 95, 0.11);
}

/* 流动雾带 · 缓缓漂移 */
.qj-mist {
  position: absolute;
  left: -10%;
  width: 120%;
  height: 220px;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 55% 100% at 50% 50%, rgba(135, 153, 172, 0.04), transparent 72%);
}
.qj-mist--a {
  top: 16%;
  animation: qj-drift-a 46s ease-in-out infinite alternate;
}
.qj-mist--b {
  bottom: 6%;
  height: 260px;
  background: radial-gradient(ellipse 60% 100% at 50% 50%, rgba(116, 137, 157, 0.03), transparent 72%);
  animation: qj-drift-b 62s ease-in-out infinite alternate;
}
@keyframes qj-drift-a {
  from {
    transform: translateX(-4%);
  }
  to {
    transform: translateX(4%);
  }
}
@keyframes qj-drift-b {
  from {
    transform: translateX(5%);
  }
  to {
    transform: translateX(-3%);
  }
}

/* 仙尘微光 · 上浮明灭 */
.qj-motes {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.qj-motes i {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(211, 222, 231, 0.58);
  box-shadow: 0 0 5px 1px rgba(180, 200, 217, 0.22);
  opacity: 0;
  animation: qj-rise linear infinite;
}
.qj-motes i:nth-child(1) {
  left: 8%;
  top: 62%;
  animation-duration: 14s;
}
.qj-motes i:nth-child(2) {
  left: 18%;
  top: 78%;
  animation-duration: 17s;
  animation-delay: 3s;
  width: 2px;
  height: 2px;
}
.qj-motes i:nth-child(3) {
  left: 27%;
  top: 55%;
  animation-duration: 12s;
  animation-delay: 6s;
}
.qj-motes i:nth-child(4) {
  left: 38%;
  top: 70%;
  animation-duration: 19s;
  animation-delay: 1.5s;
  width: 2px;
  height: 2px;
}
.qj-motes i:nth-child(5) {
  left: 49%;
  top: 60%;
  animation-duration: 15s;
  animation-delay: 8s;
}
.qj-motes i:nth-child(6) {
  left: 58%;
  top: 76%;
  animation-duration: 13s;
  animation-delay: 4.5s;
  width: 2px;
  height: 2px;
}
.qj-motes i:nth-child(7) {
  left: 66%;
  top: 58%;
  animation-duration: 18s;
  animation-delay: 2s;
}
.qj-motes i:nth-child(8) {
  left: 74%;
  top: 72%;
  animation-duration: 16s;
  animation-delay: 9s;
  width: 2px;
  height: 2px;
}
.qj-motes i:nth-child(9) {
  left: 83%;
  top: 64%;
  animation-duration: 14.5s;
  animation-delay: 5.5s;
}
.qj-motes i:nth-child(10) {
  left: 91%;
  top: 80%;
  animation-duration: 12.5s;
  animation-delay: 7s;
  width: 2px;
  height: 2px;
}
@keyframes qj-rise {
  0% {
    transform: translateY(8px);
    opacity: 0;
  }
  25% {
    opacity: 0.48;
  }
  60% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-52px);
    opacity: 0;
  }
}

/* 四角角饰 */
.qj-corner {
  position: absolute;
  width: 7px;
  height: 7px;
  background: var(--qj-moon);
  transform: rotate(45deg);
  z-index: 2;
}
.qj-corner--tl {
  top: 4px;
  left: 4px;
}
.qj-corner--tr {
  top: 4px;
  right: 4px;
}
.qj-corner--bl {
  bottom: 4px;
  left: 4px;
}
.qj-corner--br {
  bottom: 4px;
  right: 4px;
}

/* 云纹饰带 · 连绵云头 */
.qj-meander {
  position: relative;
  z-index: 2;
  height: 14px;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='14' viewBox='0 0 20 14'%3E%3Cg fill='none' stroke='%23667480' stroke-width='1'%3E%3Cpath d='M0 11a5 5 0 0 1 10 0a5 5 0 0 1 10 0'/%3E%3Cpath d='M0 13.5h20' opacity='.4'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 20px 14px;
  background-repeat: repeat-x;
}
.qj-meander--top {
  margin-bottom: 12px;
}
.qj-meander--bottom {
  margin-top: 12px;
}

/* 标题牌匾 */
.qj-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 14px);
  padding: 0 8px 12px;
}
.qj-header__rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--qj-moon-line) 30%, var(--qj-moon-line) 70%, transparent);
}
.qj-header__text {
  min-width: 0;
  text-align: center;
  flex-shrink: 0;
}
.qj-title {
  font-family: var(--qj-font-display);
  font-size: 29px;
  letter-spacing: 15px;
  text-indent: 15px;
  font-weight: normal;
  color: #e6eaed;
  text-shadow: 0 0 16px rgba(206, 218, 226, 0.16);
}
.qj-subtitle {
  max-width: min(100%, 32em);
  margin: 8px auto 0;
  font-size: clamp(10px, 2.5vw, 12px);
  line-height: 1.7;
  letter-spacing: clamp(1.5px, 0.55vw, 4px);
  color: #aeb9c3;
  text-wrap: balance;
  overflow-wrap: anywhere;
}

@media (max-width: 560px) {
  .qj-statusbar {
    --qj-pad: 16px;
  }

  .qj-header {
    gap: 8px;
    padding-inline: 0;
  }

  .qj-header__rule {
    min-width: 12px;
  }

  .qj-title {
    font-size: 24px;
    letter-spacing: 8px;
    text-indent: 8px;
  }

  .qj-subtitle {
    max-width: min(100%, 28em);
    font-size: 10px;
    letter-spacing: 2px;
  }

  .qj-moon {
    top: 19px;
    right: 8%;
    width: 36px;
    height: 36px;
    opacity: 0.82;
  }
}

@media (max-width: 360px) {
  .qj-header__rule {
    min-width: 0;
  }

  .qj-title {
    font-size: 22px;
    letter-spacing: 6px;
    text-indent: 6px;
  }

  .qj-subtitle {
    letter-spacing: 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qj-moon,
  .qj-mist,
  .qj-motes i {
    animation: none;
  }
}

.qj-body {
  position: relative;
  z-index: 2;
  min-height: 120px;
  padding: 4px 12px 8px;
}

/* 页面切换过渡 */
.qj-fade-enter-active,
.qj-fade-leave-active {
  transition: opacity 0.18s ease;
}
.qj-fade-enter-from,
.qj-fade-leave-to {
  opacity: 0;
}
</style>
