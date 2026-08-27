const e='qj-mvu-editor-launcher',t=window.parent===window?window:window.parent,a=t.document;let r=null;function o(){return t.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'none':'width 240ms cubic-bezier(.22, 1, .36, 1), height 240ms cubic-bezier(.22, 1, .36, 1), border-color 180ms ease, border-radius 180ms ease, box-shadow 180ms ease'}const n=String.raw`<!doctype html>
<html lang="zh-CN" data-mode="collapsed">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>琼明女神录 · stat_data</title>
<style>
:root {
  color-scheme: dark;
  --ink: #edf1f4;
  --muted: #a3acb6;
  --dim: #707985;
  --line: rgba(220, 227, 234, .18);
  --line-strong: rgba(231, 237, 242, .38);
  --panel: #080a0e;
  --panel-soft: rgba(14, 17, 23, .9);
  --jade: #d7dfe6;
  --jade-deep: #84909b;
  --gold: #e7ebef;
  --danger: #d7b7b7;
}
* { box-sizing: border-box; }
html, body, #app { min-height: 100%; }
html, body { margin: 0; }
body {
  overflow: hidden;
  background: transparent;
  color: var(--ink);
  font-family: "LXGW WenKai", "STKaiti", "KaiTi", "Microsoft YaHei", serif;
  -webkit-font-smoothing: antialiased;
}
button, input, textarea, select { font: inherit; }
button, select, input, textarea { touch-action: manipulation; }
button { cursor: pointer; }
.app { width: 100%; height: 100%; min-height: 100vh; padding: 12px; overflow: hidden; }
html[data-mode="collapsed"], html[data-mode="collapsed"] body, html[data-mode="collapsed"] #app { width: 142px; height: 64px; min-height: 64px; }
html[data-mode="collapsed"] body { overflow: hidden; }
html[data-mode="collapsed"] .app { width: 142px; height: 64px; min-height: 64px; padding: 0; }
html[data-mode="collapsed"] .seal { width: 142px; height: 64px; min-width: 142px; min-height: 64px; }
html[data-mode="open"], html[data-mode="open"] body, html[data-mode="open"] #app { width: 100%; height: 100%; min-height: 100%; overflow: hidden; }
[data-drag-handle] { cursor: grab; user-select: none; }
[data-drag-handle]:active { cursor: grabbing; }
.seal {
  display: inline-flex;
  min-width: 142px;
  min-height: 64px;
  align-items: center;
  gap: 11px;
  padding: 8px 17px 8px 9px;
  border: 1px solid rgba(189, 220, 205, .48);
  border-radius: 999px;
  background: linear-gradient(135deg, #1d3636, #0b1419 68%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, .26), inset 0 1px rgba(236, 242, 222, .12);
  color: #e9ede0;
}
.seal:hover, .seal:focus-visible { border-color: #e4e7cf; }
.seal__moon {
  width: 46px;
  aspect-ratio: 1;
  border: 1px solid rgba(233, 235, 211, .5);
  border-radius: 50%;
  background: radial-gradient(circle at 36% 34%, #f0ebd9 0 6%, #acc9bd 38%, rgba(100, 152, 145, .25) 68%, transparent 72%), #0e2526;
  box-shadow: 0 0 20px rgba(147, 207, 187, .27);
}
.seal__copy { display: grid; text-align: left; }
.seal__copy b { font-size: 16px; letter-spacing: .18em; }
.seal__copy small { margin-top: 2px; color: #a7c2b6; font: 10px "Segoe UI", "Microsoft YaHei", sans-serif; letter-spacing: .14em; }
.panel {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  max-width: 680px;
  padding: clamp(14px, 2vw, 18px);
  border-radius: 8px;
  border: 1px solid var(--line-strong);
  background: radial-gradient(circle at 90% 3%, rgba(149, 197, 182, .13), transparent 23%), radial-gradient(circle at 11% 82%, rgba(61, 103, 110, .18), transparent 30%), linear-gradient(145deg, #112025 0%, #091116 54%, #081013 100%);
  box-shadow: 0 0 0 5px rgba(5, 9, 11, .68), 0 20px 45px rgba(0, 0, 0, .35), inset 0 0 46px rgba(0, 0, 0, .48);
}
.tree::-webkit-scrollbar { width: 6px; height: 6px; }
.tree::-webkit-scrollbar-thumb { border-radius: 999px; background: rgba(157, 199, 185, .32); }
.tree::-webkit-scrollbar-track { background: transparent; }
.panel::before { content: ""; position: absolute; inset: 7px; border: 1px solid rgba(225, 236, 221, .12); pointer-events: none; }
.panel::after { content: ""; position: absolute; right: -28px; bottom: -42px; width: 62%; height: 180px; opacity: .2; background: linear-gradient(140deg, transparent 8%, #668985 9% 32%, transparent 33%), linear-gradient(160deg, transparent 22%, #314d54 23% 53%, transparent 54%); pointer-events: none; }
.header, .category-nav, .workspace, .empty { position: relative; z-index: 1; }
.header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 0 10px; border-bottom: 1px solid var(--line); touch-action: none; }
.header__handle, .header__actions { display: flex; align-items: center; }
.header__handle { min-width: 0; gap: 10px; color: #a7c8ba; }
.header__grip { display: grid; width: 42px; height: 42px; flex: 0 0 42px; place-items: center; border: 1px solid rgba(189, 220, 205, .26); border-radius: 4px; background: rgba(214, 232, 218, .05); }
.header__context { overflow: hidden; color: #b6d2c4; font: 12px "Segoe UI", "Microsoft YaHei", sans-serif; letter-spacing: .08em; text-overflow: ellipsis; white-space: nowrap; }
.header__actions { gap: 6px; }
.icon-button { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid rgba(206, 227, 215, .22); background: rgba(214, 232, 218, .04); color: #b8d1c4; }
.icon-button:hover, .icon-button:focus-visible { border-color: rgba(225, 234, 216, .54); color: #edf0df; }
svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.6; }
.header__grip svg { width: 19px; height: 19px; }
.button { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; gap: 7px; padding: 0 13px; border-radius: 3px; }
.button--ghost { border: 1px solid rgba(198, 219, 208, .28); background: rgba(211, 226, 215, .04); color: #b6cbc1; }
.button--primary { border: 1px solid rgba(192, 221, 201, .7); background: linear-gradient(135deg, #9ac6b3, #6da191); color: #081111; font-weight: 700; }
.button:hover:not(:disabled), .tab:hover { filter: brightness(1.12); }
.button:disabled { cursor: not-allowed; opacity: .42; }
.notice { position: relative; z-index: 1; min-height: 32px; margin-top: 10px; padding: 7px 10px; border-left: 2px solid #8ab7a8; background: rgba(99, 155, 140, .1); color: #c5ded0; font-size: 11px; line-height: 1.4; }
.notice--error { border-color: var(--danger); background: rgba(163, 84, 71, .13); color: #efb9ab; }
.notice--info { border-color: #a5b9ad; background: rgba(165, 185, 173, .08); }
.category-nav { display: flex; flex-shrink: 0; flex-wrap: wrap; gap: 6px; margin-top: 10px; padding: 6px; border: 1px solid rgba(181, 215, 201, .13); border-radius: 5px; background: rgba(2, 10, 12, .3); }
.category-tab { display: inline-flex; min-height: 38px; flex: 1 1 112px; align-items: center; justify-content: space-between; gap: 8px; padding: 0 10px; border: 1px solid rgba(170, 207, 193, .16); border-radius: 3px; background: rgba(7, 19, 21, .46); color: #94b0a5; font-size: 12px; text-align: left; }
.category-tab:hover, .category-tab:focus-visible { border-color: rgba(204, 231, 214, .48); color: #e1eadf; }
.category-tab--active { border-color: rgba(190, 225, 207, .7); background: linear-gradient(135deg, rgba(111, 169, 149, .3), rgba(52, 93, 88, .26)); color: #edf0df; box-shadow: inset 0 1px rgba(236, 242, 222, .12); }
.category-tab small { color: #6e9589; font: 10px "Segoe UI", "Microsoft YaHei", sans-serif; white-space: nowrap; }
.category-tab--active small { color: #c2dfcf; }
.workspace { display: flex; min-height: 0; flex: 1; flex-direction: column; padding-top: 10px; }
.tree { display: grid; min-height: 0; flex: 1; gap: 6px; margin-top: 11px; overflow-x: hidden; overflow-y: auto; padding: 1px 3px 2px 1px; border: 1px solid rgba(181, 215, 201, .13); border-radius: 5px; background: rgba(2, 10, 12, .3); }
.node { border-left: 1px solid rgba(135, 179, 170, .2); }
.node--root { border-left: 0; }
.node__head { display: grid; grid-template-columns: minmax(108px, .85fr) 62px minmax(110px, 1.5fr) 38px; align-items: center; gap: 7px; min-height: 40px; padding: 6px 8px; border: 1px solid rgba(183, 208, 198, .13); border-radius: 3px; background: rgba(5, 13, 16, .34); }
.node--root > .node__head { border-color: rgba(190, 222, 207, .32); background: linear-gradient(90deg, rgba(91, 144, 133, .22), rgba(6, 14, 17, .48)); }
.node__key { min-width: 0; overflow-wrap: anywhere; color: #c8ded4; letter-spacing: .04em; }
.node__type { justify-self: start; padding: 3px 6px; border: 1px solid rgba(148, 191, 178, .22); border-radius: 999px; color: #a8cbbd; font: 10px "Segoe UI", "Microsoft YaHei", sans-serif; }
.node__value { min-width: 0; width: 100%; border: 1px solid rgba(179, 209, 198, .2); border-radius: 3px; background: rgba(1, 7, 9, .62); color: #e4e9dc; }
textarea.node__value { min-height: 34px; resize: none; overflow: hidden; padding: 7px 8px; line-height: 1.35; }
input.node__value { height: 34px; padding: 0 8px; }
.node__constant { color: #87a69d; font: 12px "Cascadia Mono", Consolas, monospace; }
.node__boolean { min-height: 32px; justify-self: start; padding: 0 10px; border: 1px solid rgba(148, 191, 178, .34); border-radius: 999px; background: rgba(93, 151, 136, .15); color: #bfe2d2; }
.node__boolean--false { border-color: rgba(195, 149, 130, .34); background: rgba(141, 83, 69, .14); color: #d7aa9c; }
.node__delete, .node__fold { display: grid; width: 30px; height: 30px; place-items: center; border: 0; background: transparent; color: #998b85; }
.node__delete:hover, .node__fold:hover { color: #e2a695; }
.node__summary { min-width: 0; overflow: hidden; color: #87a69d; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.node__toggle { margin: 4px 0 2px 7px; color: #789b91; font: 10px "Segoe UI", "Microsoft YaHei", sans-serif; letter-spacing: .08em; cursor: pointer; }
.node__toggle::marker { color: #a4cabb; }
.node__children { display: grid; gap: 6px; margin: 5px 0 5px 15px; padding-left: 9px; }
.node__add { width: fit-content; min-height: 36px; padding: 0 10px; border: 1px dashed rgba(156, 199, 187, .35); border-radius: 3px; background: rgba(85, 139, 126, .08); color: #afcfc4; font-size: 12px; }
.panel[hidden], .seal[hidden] { display: none; }
.actions { display: flex; flex-shrink: 0; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(194, 220, 207, .18); }
.empty { display: flex; align-items: center; gap: 12px; padding: 28px 7px 8px; color: #91aaa1; }
.empty svg { width: 31px; height: 31px; color: #a4c5b9; }
.empty h2 { margin: 0 0 3px; color: #d3e0d7; font-size: 16px; font-weight: 500; }
.empty p { margin: 0; font-size: 12px; }
:focus-visible { outline: 2px solid #e6ead4; outline-offset: 3px; }
@media (max-width: 650px) {
  .app { padding: 8px; }
  .panel { height: 100%; min-height: 0; padding: 15px; }
  .node__head { grid-template-columns: minmax(90px, 1fr) 66px 36px; }
  .node__value, .node__summary, .node__boolean, .node__constant { grid-column: 1 / -1; }
  .node__delete { grid-column: 3; grid-row: 1; }
  .actions { align-items: stretch; flex-direction: column; }
  .actions .button { flex: 1; }
}
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; animation: none !important; } }

/* 冷月残卷：以月相作为唯一的视觉记忆点，数据层保持克制。 */
html[data-mode="collapsed"], html[data-mode="collapsed"] body, html[data-mode="collapsed"] #app { width: 44px; height: 44px; min-height: 44px; background: transparent !important; }
html[data-mode="collapsed"] .app { width: 44px; height: 44px; min-height: 44px; background: transparent !important; box-shadow: none !important; }
html[data-mode="collapsed"] .seal { width: 44px; height: 44px; min-width: 44px; min-height: 44px; background: transparent !important; border: 0 !important; box-shadow: none !important; outline: 0 !important; }
.seal {
  position: relative;
  display: grid;
  width: 44px;
  min-width: 44px;
  height: 44px;
  min-height: 44px;
  place-items: center;
  padding: 0;
  overflow: visible;
  isolation: isolate;
  border: 0;
  border-radius: 50%;
  background: transparent;
  box-shadow: none;
  color: var(--ink);
  transition: transform 240ms cubic-bezier(.22, 1, .36, 1), filter 240ms ease;
  animation: qj-moon-settle 420ms cubic-bezier(.22, 1, .36, 1) both;
}
.seal:hover, .seal:focus-visible {
  box-shadow: none;
  filter: brightness(1.05);
  transform: translateY(-1px) scale(1.02);
}
.seal__orbit { display: none; }
.seal__moon {
  position: relative;
  z-index: 1;
  display: block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 0;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 64% 71%, rgba(77, 94, 108, .15) 0 7%, transparent 12%),
    radial-gradient(ellipse at 35% 62%, rgba(113, 128, 141, .12) 0 9%, transparent 15%),
    radial-gradient(ellipse at 71% 31%, rgba(113, 128, 141, .11) 0 5%, transparent 10%),
    radial-gradient(circle at 35% 29%, #fbfcfa 0 4%, #eff2f1 20%, #d9e0e3 49%, #bec8ce 74%, #a4b0b9 100%);
  box-shadow: inset -5px -6px 9px rgba(82, 99, 112, .15), inset 3px 3px 6px rgba(255, 255, 255, .48), 0 0 4px rgba(216, 229, 239, .18);
  transition: transform 260ms cubic-bezier(.22, 1, .36, 1), box-shadow 260ms ease;
}
.seal__moon::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse at 61% 56%, rgba(78, 94, 106, .17) 0 8%, transparent 13%), radial-gradient(ellipse at 39% 72%, rgba(103, 117, 129, .12) 0 6%, transparent 11%), radial-gradient(ellipse at 73% 40%, rgba(95, 110, 122, .1) 0 4%, transparent 8%), linear-gradient(122deg, rgba(255, 255, 255, .12), transparent 34%);
  opacity: .88;
}
.seal:hover .seal__moon, .seal:focus-visible .seal__moon { transform: scale(1.02); box-shadow: inset -5px -6px 9px rgba(82, 99, 112, .13), inset 3px 3px 6px rgba(255, 255, 255, .52), 0 0 7px rgba(226, 237, 246, .24); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }

.panel {
  border-color: rgba(229, 235, 241, .34);
  border-radius: 12px;
  background: linear-gradient(145deg, #14171d 0%, #0a0c11 43%, #06070a 100%);
  box-shadow: 0 0 0 5px rgba(3, 4, 6, .72), 0 26px 68px rgba(0, 0, 0, .52), inset 0 1px rgba(255, 255, 255, .08), inset 0 -52px 80px rgba(0, 0, 0, .42);
  transform-origin: 100% 100%;
}
.panel::before, .panel::after { content: none; }
.lunar-backdrop { position: absolute; z-index: 0; inset: 0; overflow: hidden; pointer-events: none; background: radial-gradient(circle at 8% 84%, rgba(158, 171, 184, .06), transparent 31%), linear-gradient(150deg, rgba(255, 255, 255, .025), transparent 34%); }
.lunar-backdrop::after { content: ""; position: absolute; inset: 7px; border: 1px solid rgba(236, 241, 245, .1); border-radius: 7px; }
.lunar-backdrop__glow { position: absolute; top: -220px; right: -76px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(240, 245, 248, .16), rgba(182, 197, 210, .045) 46%, transparent 70%); filter: blur(13px); opacity: .42; }
.lunar-backdrop__moon { position: absolute; top: -208px; right: -62px; width: 360px; height: 360px; overflow: hidden; border: 1px solid rgba(250, 253, 255, .22); border-radius: 50%; background: radial-gradient(ellipse at 61% 64%, rgba(92, 107, 120, .25) 0 7%, transparent 12%), radial-gradient(ellipse at 38% 56%, rgba(106, 121, 135, .2) 0 8%, transparent 13%), radial-gradient(circle at 39% 34%, #edf1f2 0 23%, #bdc7d0 52%, #84919d 79%, #49535e 100%); box-shadow: inset -38px -42px 70px rgba(34, 42, 51, .45), inset 10px 14px 34px rgba(255, 255, 255, .36), 0 0 66px rgba(220, 230, 239, .12); opacity: .38; }
.lunar-backdrop__moon::after { content: ""; position: absolute; top: -16px; right: -18px; width: 354px; height: 354px; border: 1px solid rgba(128, 140, 152, .08); border-radius: 50%; background: radial-gradient(circle at 25% 34%, #1b2027, #080a0f 72%); box-shadow: -15px 0 31px rgba(4, 5, 8, .78); }
.lunar-backdrop__dust { position: absolute; inset: 0; opacity: .45; background-image: radial-gradient(circle at 23% 22%, rgba(238, 243, 246, .62) 0 1px, transparent 1.5px), radial-gradient(circle at 72% 67%, rgba(200, 211, 221, .32) 0 1px, transparent 1.5px), radial-gradient(circle at 39% 78%, rgba(245, 248, 250, .26) 0 .8px, transparent 1.3px); }
.header, .category-nav, .workspace, .empty { z-index: 1; }
.header { padding: 1px 1px 12px; border-color: rgba(223, 231, 238, .18); }
.header__handle { color: #c9d2da; }
.header__grip { border-color: rgba(226, 234, 240, .26); border-radius: 50%; background: radial-gradient(circle at 34% 28%, rgba(255, 255, 255, .14), rgba(214, 225, 233, .045) 56%, transparent 57%); color: #dfe8ee; }
.header__context { color: #c4ccd4; font-family: "Cascadia Mono", "Microsoft YaHei", sans-serif; letter-spacing: .12em; }
.icon-button { border-color: rgba(226, 234, 240, .2); border-radius: 5px; background: rgba(244, 247, 249, .035); color: #c5ced6; transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease; }
.icon-button:hover, .icon-button:focus-visible { border-color: rgba(247, 250, 252, .66); background: rgba(244, 247, 249, .1); color: #fff; transform: translateY(-1px); }
.button { border-radius: 5px; transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease; }
.button--ghost { border-color: rgba(223, 230, 236, .26); background: rgba(239, 244, 247, .035); color: #c9d1d8; }
.button--primary { border-color: rgba(250, 253, 255, .72); background: linear-gradient(135deg, #f2f5f6, #aeb8c1); color: #080a0e; box-shadow: inset 0 1px rgba(255, 255, 255, .78), 0 5px 16px rgba(0, 0, 0, .26); }
.button:hover:not(:disabled), .tab:hover { filter: none; transform: translateY(-1px); }
.notice { border-left-color: #d6dee5; background: linear-gradient(90deg, rgba(230, 237, 243, .09), rgba(230, 237, 243, .025)); color: #d7dfe5; }
.notice--error { border-color: #d4aaaa; background: rgba(150, 90, 90, .15); color: #ebc8c8; }
.notice--info { border-color: #b4bdc6; background: rgba(188, 198, 207, .08); }
.category-nav { border-color: rgba(222, 230, 237, .13); border-radius: 7px; background: rgba(1, 2, 4, .35); }
.category-tab { border-color: rgba(219, 228, 235, .15); border-radius: 5px; background: rgba(18, 22, 28, .58); color: #aab4bd; transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease; }
.category-tab:hover, .category-tab:focus-visible { border-color: rgba(241, 246, 249, .52); background: rgba(218, 229, 237, .08); color: #f4f7f8; transform: translateY(-1px); }
.category-tab--active { border-color: rgba(241, 246, 249, .56); background: linear-gradient(135deg, rgba(229, 237, 242, .16), rgba(116, 130, 144, .12)); color: #fbfdff; box-shadow: inset 0 1px rgba(255, 255, 255, .11); }
.category-tab small { color: #7f8b96; }
.category-tab--active small { color: #d7e0e6; }
.tree { border-color: rgba(220, 229, 235, .13); border-radius: 7px; background: rgba(1, 3, 6, .38); }
.tree::-webkit-scrollbar-thumb { background: rgba(211, 222, 230, .3); }
.node { border-left-color: rgba(190, 204, 216, .18); }
.node__head { border-color: rgba(219, 228, 234, .12); border-radius: 5px; background: rgba(12, 15, 20, .52); }
.node--root > .node__head { border-color: rgba(231, 239, 244, .34); background: linear-gradient(90deg, rgba(216, 228, 237, .16), rgba(10, 13, 18, .58)); }
.node__key { color: #d8e0e6; }
.node__type { border-color: rgba(201, 214, 224, .22); color: #b8c3cc; }
.node__value { border-color: rgba(211, 222, 230, .2); border-radius: 4px; background: rgba(0, 2, 5, .66); color: #f1f4f5; transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease; }
.node__value:focus { border-color: rgba(244, 248, 251, .7); background: rgba(6, 9, 13, .92); box-shadow: 0 0 0 3px rgba(219, 230, 239, .1); outline: none; }
.node__constant, .node__summary { color: #96a2ac; }
.node__boolean { border-color: rgba(204, 216, 226, .34); background: rgba(190, 203, 214, .11); color: #d8e2e8; }
.node__boolean--false { border-color: rgba(169, 177, 185, .32); background: rgba(132, 140, 149, .1); color: #c1c8ce; }
.node__delete, .node__fold { color: #89939d; transition: color 160ms ease, transform 160ms ease; }
.node__delete:hover, .node__fold:hover { color: #f3f6f8; transform: translateY(-1px); }
.node__toggle { color: #99a5af; }
.node__toggle::marker { color: #d5dee5; }
.node__add { border-color: rgba(207, 219, 228, .35); background: rgba(207, 219, 228, .06); color: #ccd5dc; transition: border-color 180ms ease, background 180ms ease, color 180ms ease; }
.node__add:hover, .node__add:focus-visible { border-color: rgba(246, 250, 252, .63); background: rgba(232, 240, 245, .12); color: #fff; }
.actions { border-color: rgba(220, 229, 235, .17); }
.empty { color: #aab3bc; }
.empty svg { color: #d0d9e0; }
.empty h2 { color: #edf1f4; }
:focus-visible { outline-color: #f4f7f9; }

#app.is-open .panel { animation: qj-panel-arrive 430ms cubic-bezier(.22, 1, .36, 1) both; }
#app.is-open .lunar-backdrop__moon { animation: qj-crescent-reveal 680ms 40ms cubic-bezier(.18, 1, .3, 1) both; }
#app.is-open .lunar-backdrop__glow { animation: qj-glow-arrive 620ms 80ms ease-out both; }
#app.is-open .lunar-backdrop__dust { animation: qj-dust-appear 520ms 130ms ease-out both; }
@keyframes qj-moon-settle { from { opacity: 0; transform: translateY(4px) scale(.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes qj-panel-arrive { from { opacity: 0; transform: translate3d(0, 16px, 0) scale(.975); } to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); } }
@keyframes qj-crescent-reveal { from { opacity: 0; transform: translate3d(30px, -20px, 0) rotate(9deg) scale(.84); } 64% { opacity: .44; } to { opacity: .38; transform: translate3d(0, 0, 0) rotate(0) scale(1); } }
@keyframes qj-glow-arrive { from { opacity: 0; transform: scale(.78); } to { opacity: .42; transform: scale(1); } }
@keyframes qj-dust-appear { from { opacity: 0; transform: translate3d(-8px, 5px, 0); } to { opacity: .45; transform: translate3d(0, 0, 0); } }
</style>
</head>
<body>
<div id="app">
  <div class="app">
    <button class="seal" data-editor-open data-drag-handle type="button" aria-label="展开琼明女神录 MVU 编辑器">
      <span class="seal__moon" aria-hidden="true"></span>
      <span class="sr-only">展开琼明女神录 MVU 编辑器</span>
    </button>
    <main class="panel" hidden aria-label="琼明女神录 stat_data 面板">
      <div class="lunar-backdrop" aria-hidden="true">
        <span class="lunar-backdrop__glow"></span>
        <span class="lunar-backdrop__moon"></span>
        <span class="lunar-backdrop__dust"></span>
      </div>
      <header class="header" data-drag-handle>
        <div class="header__handle" aria-label="拖动面板" title="拖动面板">
          <span class="header__grip" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 15.4A8 8 0 1 1 8.6 4 6.4 6.4 0 0 0 20 15.4Z" /></svg></span>
          <span class="header__context">最新 AI 回复</span>
        </div>
        <div class="header__actions">
          <button id="refresh" class="icon-button" type="button" aria-label="刷新最新 AI 回复" title="刷新">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0 2 5.2M20 5v6h-6" /></svg>
          </button>
          <button class="icon-button" data-editor-close type="button" aria-label="收起编辑器" title="收起">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </div>
      </header>
      <div id="notice" class="notice" role="status" aria-live="polite">正在读取最新 AI 回复的 stat_data…</div>
      <nav id="category-nav" class="category-nav" role="tablist" aria-label="stat_data 分类"></nav>
      <section class="workspace">
        <div id="tree-view" class="tree" role="tabpanel" aria-label="数据树编辑"></div>
        <footer class="actions">
          <button id="discard" class="button button--ghost" type="button" disabled>放弃改动</button>
          <button id="save" class="button button--primary" type="button" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9.2 17 19 7" /></svg>写回 stat_data
          </button>
        </footer>
      </section>
    </main>
  </div>
</div>
<script>
(function () {
  'use strict';
  var host = window.parent;
  var Mvu = host.Mvu;
  var helper = host.TavernHelper;
  var hasOwn = Object.prototype.hasOwnProperty;
  var state = { messageId: 'latest', draft: null, source: null, activeCategory: '', loading: false, saving: false, remoteChanged: false };
  var app = document.getElementById('app');
  var seal = document.querySelector('[data-editor-open]');
  var panel = document.querySelector('.panel');
  var notice = document.getElementById('notice');
  var categoryNav = document.getElementById('category-nav');
  var treeView = document.getElementById('tree-view');
  var refreshButton = document.getElementById('refresh');
  var discardButton = document.getElementById('discard');
  var saveButton = document.getElementById('save');
  var categoryOrder = ['地点位置', '世界', '主角', '关系列表', '事件列表'];

  function clone(value) { return value === undefined ? undefined : JSON.parse(JSON.stringify(value)); }
  function stringify(value) { return JSON.stringify(value, null, 2); }
  function kind(value) {
    if (value === null) return ['null', '空值'];
    if (Array.isArray(value)) return ['array', '列表'];
    if (typeof value === 'object') return ['object', '对象'];
    if (typeof value === 'number') return ['number', '数字'];
    if (typeof value === 'boolean') return ['boolean', '真假'];
    return ['string', '文本'];
  }
  function pathGet(path) { var value = state.draft; path.forEach(function (key) { value = value == null ? undefined : value[key]; }); return value; }
  function pathSet(path, value) {
    if (!path.length) { state.draft = value; return; }
    var parent = pathGet(path.slice(0, -1));
    if (parent == null) return;
    parent[path[path.length - 1]] = value;
  }
  function pathDelete(path) {
    if (!path.length) return;
    var parent = pathGet(path.slice(0, -1));
    if (Array.isArray(parent)) parent.splice(Number(path[path.length - 1]), 1);
    else if (parent && typeof parent === 'object') delete parent[path[path.length - 1]];
  }
  function markDirty() {
    updateMeta();
  }
  function isDirty() { return stringify(state.draft) !== stringify(state.source); }
  function setNotice(type, text) { notice.className = 'notice notice--' + type; notice.textContent = text; }
  function notifyParent(type, payload) {
    window.parent.postMessage(Object.assign({ source: 'qj-mvu-editor', type: type }, payload || {}), '*');
  }
  function setOpen(open) {
    seal.hidden = open;
    panel.hidden = !open;
    document.documentElement.dataset.mode = open ? 'open' : 'collapsed';
    app.classList.toggle('is-open', open);
    notifyParent(open ? 'open' : 'close');
  }
  function latestAssistantMessageId() {
    try {
      if (!helper || typeof helper.getChatMessages !== 'function' || typeof helper.getLastMessageId !== 'function') return 'latest';
      var lastId = Number(helper.getLastMessageId());
      if (!Number.isInteger(lastId) || lastId < 0) return 'latest';
      var messages = helper.getChatMessages('0-' + lastId, { role: 'assistant' });
      for (var index = messages.length - 1; index >= 0; index -= 1) {
        if (messages[index].is_hidden !== true && Number.isInteger(Number(messages[index].message_id))) return Number(messages[index].message_id);
      }
      return 'latest';
    } catch (error) {
      console.warn('[琼明 MVU 编辑器] 获取最新 AI 楼层失败，回退到 latest。', error);
      return 'latest';
    }
  }
  function option() {
    return { type: 'message', message_id: state.messageId };
  }
  function getData() {
    if (!Mvu || typeof Mvu.getMvuData !== 'function') throw Error('未检测到 MVU 变量框架，请确认 MVU 已启用。');
    var all = Mvu.getMvuData(option());
    if (!all || !hasOwn.call(all, 'stat_data')) throw Error('最新 AI 回复没有 stat_data。');
    return clone(all.stat_data);
  }
  function categoryKeys(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
    var keys = Object.keys(value);
    return categoryOrder.filter(function (key) { return hasOwn.call(value, key); }).concat(keys.filter(function (key) { return categoryOrder.indexOf(key) === -1; }));
  }
  function renderCategoryNav() {
    categoryNav.replaceChildren();
    var keys = categoryKeys(state.draft);
    if (keys.indexOf(state.activeCategory) === -1) state.activeCategory = keys[0] || '';
    keys.forEach(function (key) {
      var button = document.createElement('button');
      var value = state.draft[key];
      var count = value && typeof value === 'object' ? Object.keys(value).length : 1;
      var active = key === state.activeCategory;
      button.className = 'category-tab' + (active ? ' category-tab--active' : '');
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(active));
      button.setAttribute('aria-label', '显示 ' + key);
      button.dataset.category = key;
      var name = document.createElement('span');
      name.textContent = key;
      var size = document.createElement('small');
      size.textContent = count + (value && typeof value === 'object' ? '项' : '值');
      button.appendChild(name);
      button.appendChild(size);
      categoryNav.appendChild(button);
    });
  }
  function updateMeta() {
    discardButton.disabled = !isDirty() || state.saving;
    saveButton.disabled = !state.draft || state.saving;
  }
  function nodeElement(key, value, path, depth, root) {
    var article = document.createElement('article');
    var pair = kind(value);
    article.className = 'node node--' + pair[0] + (root ? ' node--root' : '');
    var head = document.createElement('div');
    head.className = 'node__head';
    var label = document.createElement('span');
    label.className = 'node__key';
    label.textContent = root ? (path.length ? String(key) : 'stat_data') : String(key);
    head.appendChild(label);
    var type = document.createElement('span');
    type.className = 'node__type';
    type.textContent = pair[1];
    head.appendChild(type);
    if (pair[0] === 'object' || pair[0] === 'array') {
      var summary = document.createElement('span');
      summary.className = 'node__summary';
      summary.textContent = Object.keys(value).length + (pair[0] === 'array' ? ' 项' : ' 个字段');
      head.appendChild(summary);
    } else if (pair[0] === 'string') {
      var input = document.createElement('textarea');
      input.className = 'node__value';
      input.name = 'qj-stat-' + path.join('.');
      input.setAttribute('aria-label', '编辑 ' + String(key));
      input.rows = 1;
      input.value = value == null ? '' : String(value);
      input.addEventListener('input', function () { pathSet(path, input.value); markDirty(); });
      head.appendChild(input);
    } else if (pair[0] === 'number') {
      var number = document.createElement('input');
      number.className = 'node__value';
      number.name = 'qj-stat-' + path.join('.');
      number.setAttribute('aria-label', '编辑 ' + String(key));
      number.type = 'number';
      number.value = String(value);
      number.addEventListener('input', function () { var next = Number(number.value); if (Number.isFinite(next)) { pathSet(path, next); markDirty(); } });
      head.appendChild(number);
    } else if (pair[0] === 'boolean') {
      var toggle = document.createElement('button');
      toggle.className = 'node__boolean' + (value ? '' : ' node__boolean--false');
      toggle.type = 'button';
      toggle.textContent = value ? '真' : '假';
      toggle.setAttribute('aria-pressed', String(value));
      toggle.addEventListener('click', function () { pathSet(path, !pathGet(path)); render(); });
      head.appendChild(toggle);
    } else {
      var constant = document.createElement('span');
      constant.className = 'node__constant';
      constant.textContent = 'null';
      head.appendChild(constant);
    }
    if (!root) {
      var del = document.createElement('button');
      del.className = 'node__delete';
      del.type = 'button';
      del.title = '删除字段';
      del.setAttribute('aria-label', '删除 ' + String(key));
      del.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M9 7V4h6v3M8 10v7M12 10v7M16 10v7M6.5 7l.8 13h9.4l.8-13" /></svg>';
      del.addEventListener('click', function () { if (window.confirm('删除字段“' + String(key) + '”？')) { pathDelete(path); markDirty(); render(); } });
      head.appendChild(del);
    } else {
      var spacer = document.createElement('span');
      head.appendChild(spacer);
    }
    article.appendChild(head);
    if (pair[0] === 'object' || pair[0] === 'array') {
      var details = document.createElement('details');
      details.open = depth < 2 || root;
      var detailsSummary = document.createElement('summary');
      detailsSummary.className = 'node__toggle';
      detailsSummary.textContent = pair[0] === 'array' ? '项目列表' : '字段详情';
      details.appendChild(detailsSummary);
      var children = document.createElement('div');
      children.className = 'node__children';
      Object.keys(value).forEach(function (childKey) { children.appendChild(nodeElement(childKey, value[childKey], path.concat(childKey), depth + 1, false)); });
      var add = document.createElement('button');
      add.className = 'node__add';
      add.type = 'button';
      add.textContent = pair[0] === 'array' ? '+ 添加项目' : '+ 添加字段';
      add.addEventListener('click', function () {
        if (pair[0] === 'array') value.push('');
        else { var name = window.prompt('新字段名称'); if (!name || hasOwn.call(value, name)) { if (name) setNotice('error', '字段名称为空或已存在。'); return; } value[name] = ''; }
        markDirty(); render();
      });
      children.appendChild(add);
      details.appendChild(children);
      article.appendChild(details);
    }
    return article;
  }
  function render() {
    treeView.replaceChildren();
    renderCategoryNav();
    if (state.draft !== null) {
      var keys = categoryKeys(state.draft);
      if (keys.length && state.activeCategory) treeView.appendChild(nodeElement(state.activeCategory, state.draft[state.activeCategory], [state.activeCategory], 0, true));
      else treeView.appendChild(nodeElement('', state.draft, [], 0, true));
    }
    updateMeta();
  }
  function refresh() {
    if (state.loading) return;
    state.loading = true;
    refreshButton.disabled = true;
    try {
      state.messageId = latestAssistantMessageId();
      var next = getData();
      state.draft = clone(next);
      state.source = clone(next);
      state.remoteChanged = false;
      render();
      setNotice('success', '已读取最新 AI 回复 · 第 ' + (state.messageId === 'latest' ? '最新' : state.messageId) + ' 层。');
    } catch (error) {
      state.draft = null;
      state.source = null;
      treeView.replaceChildren();
      updateMeta();
      setNotice('error', error instanceof Error ? error.message : '读取 stat_data 失败。');
    } finally { state.loading = false; refreshButton.disabled = false; }
  }
  function discard() { state.draft = clone(state.source); state.remoteChanged = false; render(); setNotice('info', '已放弃未写回的改动。'); }
  async function save() {
    if (state.saving) return;
    var next = clone(state.draft);
    state.saving = true;
    updateMeta();
    try {
      var target = option();
      var current = Mvu && Mvu.getMvuData(target);
      if (!current || !Mvu || typeof Mvu.replaceMvuData !== 'function') throw Error('未检测到 MVU 变量框架。');
      await Promise.resolve(Mvu.replaceMvuData(Object.assign({}, current, { stat_data: clone(next) }), target));
      state.draft = clone(next);
      state.source = clone(next);
      state.remoteChanged = false;
      render();
      setNotice('success', '已写回最新 AI 回复 · 第 ' + (state.messageId === 'latest' ? '最新' : state.messageId) + ' 层。');
    } catch (error) { setNotice('error', error instanceof Error ? '写回失败：' + error.message : '写回 stat_data 失败。'); }
    finally { state.saving = false; updateMeta(); }
  }
  seal.addEventListener('click', function () { setOpen(true); });
  document.querySelector('[data-editor-close]').addEventListener('click', function () { setOpen(false); });
  categoryNav.addEventListener('click', function (event) {
    var target = event.target;
    var button = target instanceof Element ? target.closest('[data-category]') : null;
    if (!button) return;
    state.activeCategory = button.getAttribute('data-category') || '';
    render();
  });
  refreshButton.addEventListener('click', refresh);
  discardButton.addEventListener('click', discard);
  saveButton.addEventListener('click', save);
  state.messageId = latestAssistantMessageId();
  refresh();
  if (typeof host.eventOn === 'function' && Mvu && Mvu.events && Mvu.events.VARIABLE_UPDATE_ENDED) {
    host.eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, function () { if (isDirty()) { state.remoteChanged = true; setNotice('info', '最新 AI 回复的数据已在外部更新；当前草稿尚未覆盖它。'); } else refresh(); });
  }
})();
${'</'}script>
</body>
</html>`;function i(e,a){Object.assign(e.style,{width:a?'min(680px, calc(100vw - 28px))':'44px',height:a?'min(580px, calc(100vh - 28px))':'44px',border:a?'1px solid rgba(229, 235, 241, 0.38)':'0',borderRadius:a?'12px':'50%',boxShadow:a?'0 26px 68px rgba(0, 0, 0, 0.52)':'none'}),function(e,a){const r=Number.parseFloat(e.style.left),o=Number.parseFloat(e.style.top);if(!Number.isFinite(r)||!Number.isFinite(o))return;const n=a?Math.min(680,Math.max(16,t.innerWidth-28)):44,i=a?Math.min(580,Math.max(16,t.innerHeight-28)):44,d=Math.max(8,t.innerWidth-n-8),s=Math.max(8,t.innerHeight-i-8),l=Math.min(Math.max(r,8),d),c=Math.min(Math.max(o,8),s);Object.assign(e.style,{left:`${l}px`,top:`${c}px`,right:'auto',bottom:'auto'})}(e,a),e.style.transform='',e.style.willChange='width, height',e.dataset.open=String(a)}function d(e,a){let r=!1,n=!1,i=-1,d=0,s=0,l=0,c=0,p=0,b=0,g=0,u=0,h=null,m=null,f=null,x=0;const v=(e,t,a)=>Math.min(Math.max(e,t),a),y=()=>{h=null,e.style.transform=`translate3d(${p-l}px, ${b-c}px, 0)`},w=e=>{const t=e.screenX-d,a=e.screenY-s;!n&&t*t+a*a<25||(n=!0,p=v(l+t,8,g),b=v(c+a,8,u))},k=d=>{if(r&&(!d||d.pointerId===i)){d&&w(d),r=!1,a.removeEventListener('pointermove',M),a.removeEventListener('pointerup',k),a.removeEventListener('pointercancel',k),null!==h&&(t.cancelAnimationFrame(h),h=null),y(),e.style.left=`${p}px`,e.style.top=`${b}px`,e.style.transform='',e.style.willChange='width, height';try{i>=0&&f?.hasPointerCapture?.(i)&&f.releasePointerCapture(i)}catch(e){console.debug('[琼明 MVU 编辑器] 指针捕获释放失败。',e)}i=-1,f=null,m&&(m.style.cursor=''),n&&m?.matches('.seal')&&(x=Date.now()+600),m=null,e.style.transition=o()}},M=e=>{r&&e.pointerId===i&&(w(e),n&&(e.preventDefault(),null===h&&(h=t.requestAnimationFrame(y))))};a.addEventListener('pointerdown',o=>{const h=o.target;if(0!==o.button||!h?.closest('[data-drag-handle]'))return;if(h.closest('[data-editor-close], input, select, textarea'))return;if(m=h.closest('[data-drag-handle]'),m?.matches('.header')&&h.closest('button'))return;const v=e.getBoundingClientRect();l=v.left,c=v.top,p=v.left,b=v.top,g=Math.max(8,t.innerWidth-v.width-8),u=Math.max(8,t.innerHeight-v.height-8),d=o.screenX,s=o.screenY,x=0,r=!0,n=!1,i=o.pointerId,e.style.transition='none',e.style.left=`${l}px`,e.style.top=`${c}px`,e.style.right='auto',e.style.bottom='auto',e.style.transform='translate3d(0, 0, 0)',e.style.willChange='transform',m&&(m.style.cursor='grabbing'),f=h instanceof HTMLElement?h:m;try{f?.setPointerCapture?.(o.pointerId)}catch(e){console.debug('[琼明 MVU 编辑器] 指针捕获不可用。',e)}a.addEventListener('pointermove',M,{passive:!1}),a.addEventListener('pointerup',k),a.addEventListener('pointercancel',k)}),a.addEventListener('click',e=>{x&&(Date.now()>x?x=0:(x=0,e.preventDefault(),e.stopImmediatePropagation()))},!0)}function s(){r?.(),a.getElementById(e)?.remove();const s=a.createElement('iframe');s.id=e,s.title='琼明女神录 MVU 变量编辑器',s.setAttribute('allow','clipboard-write'),s.setAttribute('frameborder','0'),Object.assign(s.style,{position:'fixed',right:'14px',bottom:'14px',zIndex:'10000',maxWidth:'calc(100vw - 28px)',maxHeight:'calc(100vh - 28px)',borderRadius:'8px',background:'transparent',outline:'none',boxShadow:'none',display:'block',transition:o(),willChange:'width, height, transform',contain:'layout paint'}),s.setAttribute('allowtransparency','true'),s.style.setProperty('background-color','transparent','important'),i(s,!1),a.body.append(s),r=function(e){const a=t=>{if(t.source!==e.contentWindow)return;const a=t.data;a&&'qj-mvu-editor'===a.source&&('open'===a.type&&i(e,!0),'close'===a.type&&i(e,!1))};return t.addEventListener('message',a),()=>t.removeEventListener('message',a)}(s),s.addEventListener('load',()=>{const e=s.contentDocument;e&&d(s,e)}),s.srcdoc=n,console.info('[琼明 MVU 编辑器] 已挂载无外部资源的独立浮球。')}async function l(){'function'==typeof t.waitGlobalInitialized&&await t.waitGlobalInitialized('Mvu'),s()}const c=t.$??window.$;c?c(()=>{l().catch(e=>console.error('[琼明 MVU 编辑器] 初始化失败。',e))}):l().catch(e=>console.error('[琼明 MVU 编辑器] 初始化失败。',e)),$(window).on('pagehide',()=>{r?.(),r=null,a.getElementById(e)?.remove()});
//# sourceMappingURL=index.js.map