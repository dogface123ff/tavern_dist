---
name: st-ejs
description: 编写或审查酒馆(SillyTavern)角色卡中的 EJS/提示词模板代码时使用——世界书条目、预设、角色卡、消息内的 <%_ %> 模板；getvar/setvar/getwi 变量与条目加载；@@装饰器与 @INJECT 注入；多阶段人设、性格调色盘、动态内容控制器、@@iframe 状态栏。Use when writing/reviewing EJS template code (ST-Prompt-Template extension) for SillyTavern cards.
---

# 酒馆 EJS（ST-Prompt-Template 提示词模板）写卡指南

来源：本项目 `写卡知识库 (1).json` 中 8 个 EJS 条目，经官方文档（zonde306/ST-Prompt-Template v1.17.8.1）逐条核对补全。与官方文档的差异记录见 [references/kb-vs-docs.md](references/kb-vs-docs.md)。

## 0. 定位与适用场景

- EJS 指 SillyTavern 扩展「**提示词模板**」（ST-Prompt-Template，作者 zonde306，https://github.com/zonde306/ST-Prompt-Template ），不是酒馆助手（Tavern Helper）。
- **可执行位置**：世界书条目、预设提示词、角色卡定义、消息中。处理时机：向 LLM 发送提示词时、渲染楼层时。
- **核心用途**：根据变量值动态控制发给 AI 的提示词——多阶段人设、条件分支、按需动态加载条目省 token、状态栏渲染。
- **勿混淆两套 API**（本项目两种都会碰到）：

| | EJS 扩展（本 skill） | 酒馆助手 Tavern Helper |
|---|---|---|
| 运行处 | 世界书/预设/角色卡/消息内的 `<% %>` 模板 | iframe 脚本 / 前端界面（src/、示例/） |
| 读变量 | `getvar('stat_data.角色.好感度')` | `getVariables({type:'message'})`、`getAllVariables()` |
| 注入 | `injectPrompt(key, prompt)`（单数） | `injectPrompts([...])`（复数，@types/function/inject.d.ts） |
| 类型定义 | 模板上下文注入，无 ts 类型 | `@types/iframe/exported.ejstemplate.d.ts` 提供 `EjsTemplate.*` |

两者共享同一份 stat_data 变量数据，但函数不可混用。

## 1. 标签语法

| 标签 | 作用 |
|---|---|
| `<%_ 代码 _%>` | 执行代码不输出，自动去除前后空白（**推荐**） |
| `<%= 表达式 %>` | 输出值。生成阶段与 `<%-` 等价；**仅在楼层渲染阶段**会做转义/宏/正则/Markdown 处理 |
| `<%- 表达式 %>` | 原样输出（渲染阶段注入原始 HTML 用这个） |
| `<%# 注释 %>` | 注释，不执行 |

- 标签外的文本是普通提示词，原样发给 AI。
- **不支持 `<% include(...)`**——用 `<%- await getwi(...) %>` / `<%- await getchar(...) %>` 代替。
- 输出模板代码字面量（教玩家写 EJS 的条目）：用 `<#escape-ejs> ... <#/escape-ejs>` 包裹，内部 `<%`/`%>` 自动变为字面量。
- 隐藏消息里的 EJS 代码不发给 AI：可配提示词正则 `/<%.*?%>/g` 删空；渲染只改显示 DOM，不改原始消息。

条件分支示例（好感度分段）：

```ejs
<%_ if (getvar('stat_data.角色.好感度') < 30) { _%>
好感度低时AI看到的提示词
<%_ } else if (getvar('stat_data.角色.好感度') < 60) { _%>
中等好感度提示词
<%_ } else { _%>
高好感度提示词
<%_ } _%>
```

文本相等用 `===`/`!==`（不用 `==`）；多条件用 `&&`/`||`：

```ejs
<%_ if (getvar('stat_data.好感度') > 50 && getvar('stat_data.信任') > 30) { _%>
```

## 2. 变量系统

### 2.1 读写函数

| 函数 | 说明 |
|---|---|
| `getvar('路径')` | 读值；`getvar('路径', { defaults: 0 })` 不存在时返回默认值 |
| `getvar('路径') !== undefined` | 判断变量是否存在 |
| `setvar('key', value, { scope: 'local' })` | 写入；快捷写法 `setvar('key', value, 'global')`（scope）/ `setvar('key', value, 'nx')`（flags） |
| `incvar('好感度', 5, { scope: 'local', min: 0, max: 100 })` | +5 并限制范围 |
| `decvar('金币', 100, { scope: 'local', min: 0 })` | -100 不低于 0 |
| `delvar('key')` | 删变量 |
| `delvar('key', '属性名')` | 删对象属性（知识库用法；官方签名第二参数记为 index，语义以酒馆内实测为准） |
| `insvar('数组', '新元素')` | 追加到数组末尾 |
| `define('fn', function() { return this.getvar('key'); })` | 定义跨条目复用的函数；**必须 function 语句、内部用 this**（箭头函数无 this） |

### 2.2 作用域（5 种）

| scope | 含义 |
|---|---|
| `global` | 全局变量，持久化，跨角色跨对话共享 |
| `local` | 聊天变量，持久化，当前聊天记录 |
| `message` | 消息变量，持久化，绑定楼层（**setvar 默认**） |
| `cache` | 临时变量，不持久化（**getvar 默认读取源**，即合并后的 variables） |
| `initial` | 初始变量（来自 [InitialVariables]），只读 |

- 读取优先级（高→低）：消息变量（最新楼层→最旧楼层）→ 聊天变量 → 全局变量。同键冲突：同为数组/对象则 `_.merge`，否则覆盖。
- 合并结果就是内置常量 `variables`，可直接 `variables.stat_data.角色.好感度` 访问。
- **setvar 后立即读取要加 `{ noCache: true }`**——缓存只在开始时加载，中途不更新。
- preparation 阶段酒馆会多次计算提示词，写操作默认被阻止；确需写（如配合 dryRun 判断）用 `{ dryRun: true }`。
- 另有带作用域的别名函数：`setLocalVar` / `setGlobalVar` / `setMessageVar`、`getLocalVar`…、`incLocalVar`…、`decLocalVar`…、`delLocalVar`…、`insertLocalVar`…

### 2.3 MVU 集成（stat_data 约定）

- **MVU 变量路径必须带 `stat_data.` 前缀**：✅ `getvar('stat_data.角色.好感度')` ❌ `getvar('角色.好感度')`
- **不需要 `[0]` 索引**：✅ `getvar('stat_data.角色.好感度')` ❌ `getvar('stat_data.角色.好感度[0]')`
- 路径对照（别写混）：
  - EJS / 状态栏读：`stat_data.角色.好感度`
  - AI 的 JSON Patch 写：`/角色/好感度`（无 stat_data 前缀，`/` 分隔，op 为 replace/delta/insert/remove）
- stat_data 字段前缀：无前缀 = AI 可见可改；`_` 前缀 = AI 可见只读；`$` 前缀 = AI 不可见但脚本/提示词可改。EJS 能读到 `_` 字段。
- 把变量填进提示词：
  - `<%= getvar('stat_data.好感度') %>`
  - `<%= YAML.stringify(getvar('stat_data'), { blockQuote: 'literal' }) %>`
  - `<%= JSON.stringify(getvar('stat_data')) %>`

## 3. 输出与条目加载

### 3.1 print 输出

```ejs
<%_
if (getvar('stat_data.天气') === '晴天') {
  print('【阳光明媚，适合出门】');
}
_%>
```

`print` 只能在 `<%_ %>` 代码块里用，不能放进 `<%-` / `<%=`。

### 3.2 getwi 加载其他世界书条目（**必须 await**）

```ejs
<%_
if (getvar('stat_data.好感度') < 30) {
  print(await getwi('角色_阶段01'));
} else {
  print(await getwi('角色_阶段02'));
}
_%>
```

等价写法：`<%- await getwi('条目名') %>`。❌ `<%- getwi('条目名') %>`（漏 await）

三种重载：

| 写法 | 说明 |
|---|---|
| `await getwi('条目名')` | 自动推断世界书 |
| `await getwi('世界书名', '条目名')` | 指定世界书 |
| `await getwi('条目名', { key: value })` | 传递数据 |

注意：同一 getwi 重复调用会**重复执行**目标条目的代码；世界书计算在 preparation 和 generate 两个阶段都会触发，防副作用代码要考虑幂等。

### 3.3 activewi 激活条目（交给酒馆原生处理，遵循绿灯/向量化）

| 写法 | 说明 |
|---|---|
| `await activewi('条目名')` | 普通激活 |
| `await activewi('条目名', true)` | 强制激活 |

应在 `[GENERATE:BEFORE]` 或 `@@generate_before` 条目中使用（官方：不强制，但在别处调用要下次生成才生效）。

### 3.4 聊天消息读取

| 函数 | 说明 |
|---|---|
| `getChatMessage(idx)` | 指定楼层消息 |
| `getChatMessages(count)` | 最后 N 条 |
| `getChatMessages(start, end)` | 范围；支持负数（-1 最新） |
| `matchChatMessages(['关键词'])` | 最后 2 楼是否包含关键词 |
| `matchChatMessages(['关键词'], { start: -4 })` | 扩大扫描范围 |
| `matchChatMessages([/正则/s])` | 正则匹配 |

## 4. 装饰器（@@）

书写规则（违反即失效）：

- 必须在**条目内容第一行**开始，每行一个，装饰器之间**不能有空行**或其他内容；
- 参数在**第一个空格**处分割（`@@if variables.好感度 > 50`）；
- 无法识别的 `@@xxx` 行会被**整行丢弃**（不会保留为文本）；想保留字面 `@@activate` 写 `@@@activate`。

| 装饰器 | 作用 |
|---|---|
| `@@activate` | 视为蓝灯永久激活 |
| `@@dont_activate` | 完全禁止激活 |
| `@@generate_before` | 注入到提示词开头 |
| `@@generate_after` | 注入到提示词末尾 |
| `@@render_before` | 渲染到消息开头（不发给 AI） |
| `@@render_after` | 渲染到消息末尾（不发给 AI） |
| `@@preprocessing` | 在世界书处理前执行（用于动态生成绿灯关键词激活其他条目；**不能与 @@generate_before/@@generate_after 同用**） |
| `@@initial_variables` | 将内容视为初始变量 |
| `@@private` | 自动包裹作用域，避免变量重复声明 |
| `@@if 条件` | 条件为 false 时排除此条目。条件是**任意单行 JS，可调用 getvar 等函数**（官方明确支持，`variables.路径` 只是常用写法） |
| `@@iframe` | 创建 iframe 包裹，避免样式污染 |
| `@@iframe 标题文字` | 自动折叠的 iframe |
| `@@message_formatting` ※ | 输出为 HTML 代码，仅 [RENDER]/@@render 模式；把渲染交给酒馆助手等界面扩展 |
| `@@always_enabled` ※ | 强制启用特殊条目 |
| `@@preload` / `@@only_preload` / `@@dont_preload` ※ | 预加载标记。设置「提前加载仅限 preload 标记」默认开启：立即加载阶段**只处理**带 @@preload/@@only_preload 的条目——**初始化代码（define、变量初始化）必须显式加 @@preload 才会在打开卡时执行**。[InitialVariables] 豁免。优先级 dont_preload > preload/only_preload > 设置 |

※ = 知识库未收录、官方文档补充。

示例——按好感度条件发送：

```ejs
@@if variables.好感度 >= 90
好感度很高时才发送的内容
```

## 5. 内容注入

### 5.1 标题/备忘前缀（写在条目标题或备忘开头）

| 前缀 | 位置 | 灯色限制 |
|---|---|---|
| `[GENERATE:BEFORE]` | 提示词开头 | 仅蓝灯 |
| `[GENERATE:AFTER]` | 提示词末尾 | 蓝灯和绿灯 |
| `[RENDER:BEFORE]` | 消息开头渲染（不发给 AI） | 仅蓝灯 |
| `[RENDER:AFTER]` | 消息末尾渲染（不发给 AI） | 蓝灯和绿灯 |
| `[InitialVariables]` | 内容视为初始变量写入初始消息变量；支持 JSON **和 YAML**，必须是对象 | — |
| `[Preprocessing]` ※ | 同 @@preprocessing | — |
| `[GENERATE:{idx}:BEFORE]` ※ | 注入到发给 LLM 的第 idx 条消息开头（0 起） | 仅蓝灯 |
| `[GENERATE:{idx}:AFTER]` ※ | 注入到发给 LLM 的第 idx 条消息末尾（0 起） | 蓝灯和绿灯 |
| `[GENERATE:REGEX:pattern]` ※ | 任何消息匹配正则（不区分大小写）时激活；条目内可用 matched_message / matched_message_index / matched_message_role | — |

需开启扩展设置「立即加载世界书」。

### 5.2 @INJECT 独立消息注入（**条目必须设为禁用**）

以独立 `{role, content}` 消息插入 Prompt（比世界书合并更精确）：

```ejs
@INJECT pos=1,role=system                               绝对位置（从1起，支持负数）
@INJECT pos=-1,role=user                                最后一条消息位置
@INJECT target=user,index=1,at=before,role=system       目标消息前（target: user/assistant/system）
@INJECT target=assistant,index=-1,at=after,role=user    最后一条助手消息后
@INJECT regex=你好,at=before,role=system                 正则匹配（不区分大小写）
```

排序规则：先按插入位置从后往前；同位置按世界书顺序（小在前）；类型优先级 pos > target > regex。支持条目触发概率；sticky/cooldown 未实现；不区分蓝灯绿灯。

### 5.3 injectPrompt 依赖倒置注入

世界书中定义、预设中取用（顺序无关，injectPrompt 晚于 getPromptsInjected 执行也行）：

```ejs
世界书条目内：<% injectPrompt("CoT", `思考步骤内容`) %>
预设中取用：<%- getPromptsInjected("CoT") %>
判断是否存在：hasPromptsInjected("CoT")
```

完整签名：`injectPrompt(key, prompt, order = 100, sticky = 0, uid = '')`。

### 5.4 activateRegex 正则激活

```ejs
activateRegex(/<think>[\s\S]*?<\/think>/gi, "");                      // 隐藏思维链
activateRegex(/pattern/gi, '替换', { message: true, html: true });     // 楼层HTML替换
```

替换值可以是函数（酒馆原生正则不支持函数）。

## 6. 内置常量与调试

### 6.1 常量

| 常量 | 说明 |
|---|---|
| `variables` | 合并后的所有变量对象（消息→聊天→全局） |
| `_` / `$` | Lodash / jQuery |
| `toastr` | 通知：`toastr.info/success/warning/error` |
| `userName` / `charName` | 用户名 / 角色名 |
| `lastMessageId` / `lastUserMessage` / `lastCharMessage` | 最后楼层 ID / 最后用户消息 / 最后角色消息 |
| `generateType` | `''`/custom/normal/continue/impersonate/regenerate/swipe/quiet |
| `runType` | generate / preparation / render / render_permanent |

仅渲染阶段（`runType='render'`）可用：`message_id`、`swipe_id`、`name`、`is_last`、`is_user`、`is_system`。

※ 官方补充常量：`SillyTavern`（getContext()）、`faker`、`charLoreBook/userLoreBook/chatLoreBook`、`chatId`、`characterId`、`groupId`、`groups`、`charAvatar/userAvatar`、`lastUserMessageId/lastCharMessageId`、`model`；仅 @@generate_*/[GENERATE:*] 内：`world_info`、`generateBuffer`、`generateData`；每次生成后：`LAST_SEND_TOKENS/CHARS`、`LAST_RECEIVE_TOKENS/CHARS`。

### 6.2 调试

| 方法 | 用法 |
|---|---|
| 提示词查看器 | 输入框左下角魔棒 → 提示词查看器，看实际发送内容 |
| 弹窗 | `alert('消息')`（重调试时用，日常优先 toastr） |
| 通知 | `toastr.info('消息')`（比 alert 少打断） |
| 控制台 | `console.log('消息')`（F12 → Console） |
| 断点 | `<%_ debugger; _%>`（F12 打开后暂停执行） |
| 语法检查 | `getSyntaxErrorInfo(code)` 不执行只查语法 |
| STscript | `/ejs code` 直接执行 EJS（`ctx="{ a: 1 }"` 传变量、`block=true` 自动包 `<%= %>`）；`/ejs-refresh` 重载所有世界书 |

## 7. 常用架构模式

完整模板见 [references/recipes.md](references/recipes.md)。

| 模式 | 结构 | 适用 |
|---|---|---|
| A. 多阶段人设 | 控制器（蓝灯）读变量 → `getwi` 加载对应**禁用**的阶段条目 | 阶段内容很长、想分条目管理 |
| B. 调色盘单条目多阶段 | 一个条目内 if/else 切换底色/主色调/衍生/二次解释 | 阶段内容集中管理、底色随阶段变化 |
| C. 动态内容控制器 | `@@preprocessing` + getwi 按地点/在场角色/事件动态加载 | 大世界地图/多角色，按需加载省 token |
| D. @@iframe 状态栏 | `@@render_after` + `@@iframe` + `@@if !is_user && !is_system` | 楼层内纯显示状态栏（不发给 AI） |
| E. YAML 条目实战 | YAML 世界书条目里标签行加 `# :` 前缀保持 YAML 合法 | 条目是 .yaml 格式（见 示例/角色卡示例/世界书/角色/角色阶段.yaml） |

## 8. 世界书条目配置

| 条目类型 | 配置 |
|---|---|
| EJS 控制器 / 调色盘条目 | 蓝灯常驻（strategy: constant）、角色定义后（after_character_definition）、顺序 99~100 |
| 被加载的阶段/内容条目 | 顺序 98~800，由控制器按需加载。多阶段人设的阶段条目**必须禁用（enabled: false）**——手动开启会把所有阶段同时灌进上下文导致角色行为混乱；动态内容控制器加载的条目可以是禁用**或绿灯**（getwi 无视激活状态都能加载，绿灯还能让酒馆原生逻辑也触发它） |
| 递归 | 不使用 getwi 的条目（调色盘等）：勾选不可递归 + 防止进一步递归；使用 getwi 的控制器：按知识库《动态内容控制器》**不勾防递归**（getwi 参与递归推断） |

顺序参考阶梯：世界观总纲 1 → 区域/背景 2-3 → 角色速览 4 → 场景/事件 50-98 → 核心角色详细 99 → NPC/EJS控制器 100。

**token 陷阱**：通过 getwi/getvar/getchar 导入的内容**不计入**世界书 Context %/Budget 统计，容易超限导致其他条目被静默丢弃。用 `LAST_SEND_TOKENS` 等常量核对实际发送量。

## 9. 易错点清单

1. `getwi` 必须加 `await`：✅ `<%- await getwi('条目名') %>`
2. MVU 变量路径必须带 `stat_data.` 前缀
3. 不需要 `[0]` 索引
4. 多条目共享变量名用 `typeof` 防重复声明，且条目顶层声明必须用 `var` 不用 const/let（块内局部 const/let 不受此限）：
   ✅ `if (typeof v === 'undefined') var v = getvar('路径');`
   （或给条目加 `@@private` 自动包裹作用域）
5. `activewi` 应在 `[GENERATE:BEFORE]` 或 `@@generate_before` 中使用
6. `@INJECT` 条目必须设为禁用状态
7. 装饰器在条目首行开始、每行一个、之间不能有空行；`@@if` 条件仅限单行
8. `define` 函数内必须用 `this` 访问 getvar/setvar 等，必须 function 语句不能用箭头函数
9. `@@preprocessing` 不能和 `@@generate_before`/`@@generate_after` 同时使用
10. `setvar` 后立即读取需要 `{ noCache: true }`
11. 阶段判定边界不能重叠也不能遗漏：✅ `<250` / `>=250 && <500` / `>=500`；❌ `<250` / `>200 && <500`（重叠）、`<250` / `>=300`（250~299 遗漏）
12. 关系状态等字符串判定用 `===`/`!==`，不能用 `<`/`>`
13. 组合条件注意逻辑宽度：✅ `gw >= 500 && rel !== '恋人'`（好感高但非恋人）；❌ `gw >= 500 || rel !== '恋人'`（逻辑太宽，几乎恒真）
14. 跨阶段通用内容（通用衍生/通用二次解释）放在所有 if/else **外面**
15. 每个阶段的二次解释要与对应衍生 if 条件一致，且放在衍生之后
16. `<% include(...)` 不被支持，用 getwi/getchar

## 10. 完成后自查

前提：

- [ ] MVU 变量结构（schema.ts）已定义好感度/关系状态等阶段判定变量？initvar.yaml 有初始值？变量更新规则含这些变量？

EJS 语法：

- [ ] 变量读取用 `typeof` 防重复声明 + `var`（非 const/let）？
- [ ] MVU 路径带 `stat_data.` 前缀？
- [ ] 标签用 `<%_ _%>`（自动去空白）？
- [ ] 每个 `{` 都有配对 `}`？

调色盘结构（模式 B）：

- [ ] 有调色盘头部（底色/主色调/点缀）且随阶段变化？
- [ ] 每阶段至少 2-3 个专属衍生？有跨阶段通用衍生（if 外）？
- [ ] 有「对角色的理解与思考:」二次解释部分和总结？
- [ ] 二次解释与衍生的 if 条件一致、解释在衍生之后？
- [ ] 每个阶段专属衍生有对应的阶段专属二次解释？跨阶段通用衍生有对应的通用二次解释？
- [ ] 不存在任何变量值组合（好感度 × 关系状态 × …）未被任何分支覆盖？（如某个关系状态值没有对应分支）

条目配置：

- [ ] 蓝灯常驻、角色定义后、顺序 99~100？
- [ ] 递归选项按第 8 节规则勾选？
- [ ] 多阶段人设的阶段条目处于禁用状态（动态内容控制器的被加载条目允许绿灯）？
- [ ] 调色盘是单条目（不是控制器+禁用条目模式）？

## 参考

- [references/functions.md](references/functions.md) —— 完整函数签名与常量参考
- [references/recipes.md](references/recipes.md) —— 五种模式完整代码模板（含实战示例）
- [references/kb-vs-docs.md](references/kb-vs-docs.md) —— 知识库与官方文档差异、本次整理的出处记录
