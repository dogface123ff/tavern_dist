# EJS 架构模式完整模板

五种模式：A 多阶段人设（控制器+阶段条目）、B 调色盘单条目多阶段、C 动态内容控制器、D @@iframe 状态栏、E YAML 条目实战。

## A. 多阶段人设（控制器 + 禁用阶段条目）

结构：控制器条目（蓝灯永久激活）读变量 → `getwi` 加载对应阶段条目；阶段条目（禁用）被按需加载。

控制器写法：

```ejs
<%_
if (typeof goodwill === 'undefined') var goodwill = getvar('stat_data.好感度', { defaults: 0 });
_%>
<%_ if (goodwill < 30) { _%>
<%- await getwi('角色_阶段01') %>
<%_ } else if (goodwill < 60) { _%>
<%- await getwi('角色_阶段02') %>
<%_ } else { _%>
<%- await getwi('角色_阶段03') %>
<%_ } _%>
```

条目配置：

- 控制器 → 蓝灯永久激活，顺序 100，**不勾防递归**（控制器用 getwi 加载其他条目，参见 SKILL.md 第 8 节）
- 阶段条目 → **禁用**，顺序 98~800

要点：

- 防重复声明（多条目共享变量名时必用）：`if (typeof value === 'undefined') var value = getvar('路径', { defaults: 0 });` 或给条目加 `@@private`
- 被加载条目不要手动开启——否则所有阶段同时进上下文，角色行为混乱

## B. 调色盘单条目多阶段人设

前提：先完成 MVU 变量结构设计（schema.ts + initvar.yaml），确保有好感度、关系状态等阶段判定变量。

核心思路：调色盘、衍生、二次解释写在**同一个 EJS 条目**中，用 if/else 切换。不是"每阶段一个条目+控制器"模式。优势：集中管理、无需禁用条目、底色/主色调随阶段变化、二次解释和衍生紧密联动。

### 结构模板

```ejs
<%_
if (typeof gw === 'undefined') var gw = getvar('stat_data.角色.好感度', { defaults: 0 });
if (typeof rel === 'undefined') var rel = getvar('stat_data.角色.关系状态', { defaults: '陌生人' });
_%>

性格调色盘：人的性格就像调色盘，由多种性格衍生组合而成才是活生生的人

<%_ if (rel !== '恋人') { _%>
<%_ if (gw < 500) { _%>
底色：[阶段1底色]
主色调：[阶段1主色调]
性格点缀：[阶段1点缀]
<%_ } else { _%>
底色：[阶段2底色]
主色调：[阶段2主色调]
性格点缀：[阶段2点缀]
<%_ } _%>
<%_ } else { _%>
底色：[恋人阶段底色]
主色调：[恋人阶段主色调]
性格点缀：[恋人阶段点缀]
<%_ } _%>

<%_ if (gw < 250) { _%>
[阶段1专属衍生]
<%_ } _%>

<%_ if (gw >= 250 && gw < 500) { _%>
[阶段2专属衍生]
<%_ } _%>

<%_ if (gw >= 500 && rel !== '恋人') { _%>
[阶段3专属衍生]
<%_ } _%>

<%_ if (rel === '恋人') { _%>
[恋人阶段专属衍生]
<%_ } _%>

[跨阶段通用衍生——不用if包裹，始终显示]

对角色的理解与思考:

<%_ if (gw < 250) { _%>
[阶段1专属二次解释]
<%_ } _%>

<%_ if (gw >= 250 && gw < 500) { _%>
[阶段2专属二次解释]
<%_ } _%>

<%_ if (gw >= 500 && rel !== '恋人') { _%>
[阶段3专属二次解释]
<%_ } _%>

<%_ if (rel === '恋人') { _%>
[恋人阶段专属二次解释]
<%_ } _%>

[跨阶段通用二次解释——不用if包裹，始终显示]

  总结: |
    这就是[角色名]的性格调色盘...
```

### 阶段划分方式

- 纯好感度：`gw < 250` 初识期 / `>=250 && <500` 熟悉期 / `>=500 && <750` 暧昧期 / `>=750` 深入期
- 好感度+关系状态组合：`rel !== '恋人'` 时按好感度分段；`rel === '恋人'` 用恋人专属内容
- 多变量组合：好感度、信任度、关系状态用 `&&`/`||` 组合

### 实例参考（秋啾啾，双变量控制）

- 变量：`gw = getvar('stat_data.秋啾啾.好感度')`、`rel = getvar('stat_data.秋啾啾.关系状态')`
- 调色盘头部随阶段变化：
  - 非恋人 + gw<500 → 底色：好奇，主色调：莽、心软
  - 非恋人 + gw>=500 → 底色：喜欢，主色调：莽与害羞的拉扯
  - 恋人 → 底色：爱，主色调：撒娇与莽的融合
- 阶段专属衍生：
  - gw<250：好奇衍生（EMOJI收集欲、观察者、越界）
  - gw 250~500：在意衍生（记名字、EMOJI变晴雨表）
  - gw 500~750 非恋人：喜欢衍生（命名、小心翼翼、吃醋）+ 害羞衍生
  - gw>=750 非恋人：藏不住衍生 + 心疼衍生
  - 恋人：恋人衍生（安心、撒娇、莽回归、占有欲、害怕）
- 跨阶段通用衍生（不包在 if 里）：莽衍生、心软衍生、不怕衍生——始终存在
- 二次解释按相同阶段分支：
  - gw<250：关于好奇的本质、关于距离感
  - gw 250~500：关于好奇到在意的过渡
  - gw 500~750 非恋人：关于喜欢的自觉、吃醋、害羞
  - gw>=750 非恋人：关于藏不住、心疼的深度
  - 恋人：关于确认关系后的变化、撒娇、占有欲、害怕
- 跨阶段通用二次解释（不包 if）：关于可爱、关于莽和心软的关系、关于语气词、关于霸凌、关于笑

### 配置

蓝灯常驻（strategy: constant）、角色定义后（position: after_character_definition，order: 99）、递归：不可递归 + 防止进一步递归。

### 易错点

1. 变量路径必须带 `stat_data.` 前缀
2. 必须用 `typeof` 防重复声明
3. 条目顶层声明必须用 `var` 而非 const/let（块内局部 const/let 不受此限）
4. 通用衍生/通用二次解释放在所有 if/else 外面
5. 每个阶段的二次解释要和对应衍生匹配
6. 阶段判定条件的边界值不能重叠也不能遗漏
7. 关系状态判定用 `===` 或 `!==` 而非 `<` `>`

## C. 动态内容控制器（@@preprocessing + getwi）

用途：根据 MVU 变量（地点、角色、事件等）动态加载对应世界书条目，避免所有条目同时激活浪费 token。

```ejs
@@preprocessing
<%_
// 读取变量
if (typeof currentDomain === 'undefined') var currentDomain = getvar('stat_data.世界定位.当前大域', { defaults: '中央神州' });
if (typeof currentArea === 'undefined') var currentArea = getvar('stat_data.世界定位.当前区域', { defaults: '' });
if (typeof currentScene === 'undefined') var currentScene = getvar('stat_data.世界定位.当前场景', { defaults: '' });
if (typeof currentEvent === 'undefined') var currentEvent = getvar('stat_data.世界定位.当前事件', { defaults: '' });
if (typeof presentCharacters === 'undefined') var presentCharacters = getvar('stat_data.在场人物', { defaults: {} });
if (typeof messageText === 'undefined') {
  const userMessages = getChatMessages(-1, -1, 'user');
  var messageText = userMessages.length > 0 ? userMessages[userMessages.length - 1].message : '';
}
_%>

<%_ // 跳过第0楼（开局消息） _%>
<%_ if (lastMessageId > 0) { _%>

<%_ // 根据大域加载地图 _%>
<%_ if (currentDomain.includes('中央神州')) { _%>
<%- await getwi('地图_中央神州') %>
<%_ } else if (currentDomain.includes('东荒妖域')) { _%>
<%- await getwi('地图_东荒妖域') %>
<%_ } _%>

<%_ // 根据场景加载具体地点 _%>
<%_ if (currentArea.includes('万剑山脉') || currentScene.includes('剑宗')) { _%>
<%- await getwi('剑宗') %>
<%_ } _%>

<%_ // 根据事件加载指南 _%>
<%_ if (currentEvent === '炼丹' || messageText.includes('炼丹')) { _%>
<%- await getwi('动态事件_炼丹指南') %>
<%_ } _%>

<%_ // 根据在场角色加载人设（别名映射） _%>
<%_
if (typeof detectedCharacters === 'undefined') {
  const aliasMap = { '冬雪': '殷冬雪', '疏影': '卫疏影' /* ... */ };
  var detectedCharacters = new Set();
  if (presentCharacters && typeof presentCharacters === 'object') {
    for (const name of Object.keys(presentCharacters)) {
      detectedCharacters.add(aliasMap[name] || name);
    }
  }
  for (const alias of Object.keys(aliasMap)) {
    if (messageText.includes(alias)) detectedCharacters.add(aliasMap[alias]);
  }
  detectedCharacters = Array.from(detectedCharacters);
}
_%>
<%_ for (const charName of detectedCharacters) { _%>
<%- await getwi(charName.trim()) %>
<%_ } _%>

<%_ } _%>
```

配置：蓝灯顺序 100，**不勾防递归**（getwi 参与递归推断）。

对知识库原模板的修订（原模板照抄会出错，已修正并在此登记）：

- 原文使用未声明的 `currentEvent`（会 ReferenceError 或条件恒 false）→ 补充声明行
- 原文的 `isFloorZero` 不是任何文档记载的常量 → 改为 `lastMessageId > 0`（开局只有第 0 楼时跳过）
- 原文标签用 `<% %>` → 统一为本 skill 推荐的 `<%_ _%>`（自动去空白）

要点：

1. 必须 `@@preprocessing` 开头
2. 用 `getvar` 读 MVU 变量，用 `getChatMessages` 读用户消息文本
3. 用 `.includes()` 做模糊匹配
4. 角色别名用 Map 映射到标准名
5. 加载的条目可以是禁用或绿灯

### 附：@@preprocessing 动态激活绿灯（轻量版）

```ejs
@@preprocessing
<%_ if (getvar('stat_data.天气') === '晴天') { _%>
晴天关键词
<%_ } _%>
```

条目内容处理后变为"晴天关键词"，激活以此为绿灯关键词的其他条目。

## D. @@iframe 状态栏（仅显示，不发给 AI）

```ejs
@@render_after
@@iframe
@@if !is_user && !is_system
<html>
<head></head>
<body>
<div>
好感度：<%- variables.stat_data.角色.好感度 %>
</div>
</body>
</html>
```

折叠版（带标题自动折叠）：

```ejs
@@render_after
@@iframe 状态栏（点击展开）
@@if !is_user && !is_system
<html>...内容...</html>
```

注意：装饰器顺序如上，`@@if !is_user && !is_system` 排除用户和系统楼层；状态栏走 `@@render_*` 因此不进入 AI 提示词。

## E. YAML 世界书条目实战（本仓库真实用例）

出处：`示例/角色卡示例/世界书/角色/角色阶段.yaml`（全项目唯一真实 EJS 用例）。YAML 格式条目中，把标签行写成 `# :` 开头，使其成为合法 YAML 注释行，分支体保持普通 YAML：

```yaml
白娅当前行为: # 白娅当前依存度为<%= getvar('stat_data.白娅.依存度') _%>，因此将倾向于进行与以下示例类似的行为
  # :<%_ if (getvar('stat_data.白娅.依存度') < 20) { _%>
  消极自毁:
    行为指导: ...
  # :<%_ } else if (getvar('stat_data.白娅.依存度') < 40) { _%>
  渴求注视:
    行为指导: ...
  # :<%_ } else if (getvar('stat_data.白娅.依存度') < 60) { _%>
  暗中靠近:
    行为指导: ...
  # :<%_ } else if (getvar('stat_data.白娅.依存度') < 80) { _%>
  忐忑相依:
    行为指导: ...
  # :<%_ } else { _%>
  柔软依存:
    行为指导: ...
  # :<%_ } _%>
```

要点：

- `<%= expr _%>` 把值插进提示词；`<%_ ... _%>` 驱动分支
- `# :` 前缀让标签行在 YAML 解析器眼里是注释，酒馆侧 EJS 照常执行
- **分支体必须保持在父键（如 `白娅当前行为:`）下方的缩进**（示例中为 2 空格）——顶格写分支内容会产生非法 YAML
- `getvar` 同步调用无需 await（getwi 才需要）
- 阶段语义与 schema.ts 中 `$依存度阶段` transform（<20/40/60/80 → 消极自毁/渴求注视/暗中靠近/忐忑相依/柔软依存）保持一致
