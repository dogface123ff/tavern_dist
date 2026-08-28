# 知识库与官方文档差异记录

整理时间：2026-08-16。来源：`写卡知识库 (1).json`（SillyTavern 世界书格式，37 条目，其中 8 条 EJS 相关），对照官方仓库 zonde306/ST-Prompt-Template（核对时版本 v1.17.8.1，docs/features_cn.md、docs/reference_cn.md、README）及本仓库 `@types/iframe/exported.ejstemplate.d.ts`、`示例/角色卡示例/世界书/角色/角色阶段.yaml` 实际用例逐条核对。

本 skill 以知识库为主体，官方文档用于纠错和补全。以下记录所有差异，供后续维护判断。

## 一、知识库声明被官方文档纠正的部分（skill 已采用官方版本）

| 知识库原文 | 官方文档 | 处理 |
|---|---|---|
| `@@if` 用 `variables.路径`（暗示只能这样写） | "条件可以为任意 javascript 代码，可以调用函数，例如 getvar 等，仅限单行" | skill 注明可调 getvar，`variables.xxx` 是常用写法 |
| `activewi` 必须在 [GENERATE:BEFORE] / @@generate_before 中使用 | "需要在 [GENERATE:BEFORE] 条目内使用（不强制，但是不在这里调用只能在下次生成才生效）" | skill 改为"应…使用（不强制，别处调用下次生成才生效）" |
| `<%= 表达式 %>` 输出值（HTML转义） | "在通常情况下，<%=的功能与<%-相同，而只有在渲染时才会表现出不同行为"——生成阶段不转义；渲染阶段 <%= 走 messageFormatting（转义/宏/正则/Markdown），<%- 原样 HTML | skill 表格中按渲染阶段区分描述 |
| runType: generate/preparation/render | 另有 `render_permanent` | skill 已补 |
| generateType: normal/continue/regenerate/swipe | 完整为 `''`/custom/normal/continue/impersonate/regenerate/swipe/quiet | skill 已补 |
| 渲染阶段常量: message_id, is_last, is_user, is_system | 另有 `swipe_id`、`name` | skill 已补 |
| scope: global/local/message（+文字提到 cache/initial） | scope 共 5 值（global/local/message/cache/initial）；flags 共 5 值（n/nx/xx/nxs/xxs）；min/max 仅 incvar/decvar 有 | functions.md 已补全 |
| `@@preprocessing` 不能与 @@generate_before/@@generate_after 同用 | 官方文档未见此互斥规则（无法证实也无法证伪） | 保留为知识库规则照录；此处登记其未证实状态 |
| @@preprocessing 需要 SillyTavern 1.13.4+ | 官方文档、manifest（requires: []）、release notes 均无此说法 | skill 删除该版本要求（未采信、无法证实） |

## 二、知识库遗漏、官方文档补充的部分（skill 已收录并标 ※）

- `<% include(...)` **不受支持**，用 getwi/getchar 代替（README Known Issues）
- `<#escape-ejs> ... <#/escape-ejs>` 转义块（输出模板代码字面量）
- 装饰器解析规则：首行开始、参数在第一个空格分割、无法识别的 `@@xxx` 行整行丢弃、`@@@` 前缀转义
- 追加装饰器：`@@message_formatting`、`@@always_enabled`、`@@preload` / `@@only_preload` / `@@dont_preload`；以及"提前加载仅限 preload 标记"默认开启 → **初始化代码必须加 @@preload 才在开卡时执行**
- 追加标题前缀：`[Preprocessing]`、`[GENERATE:{idx}:BEFORE/AFTER]`、`[GENERATE:REGEX:pattern]`（条目内提供 matched_message / matched_message_index / matched_message_role）
- `[InitialVariables]` 同时支持 JSON 和 YAML
- 变量 details：setvar 无论 scope 都同步更新 cache；`results`（old/new/fullcache）；`dryRun`（preparation 阶段写入）；variables 合并时同类型 `_.merge`、处理楼层消息时排除当前及更新楼层；带作用域别名函数族
- @INJECT 排序规则（位置从后往前 → 同位置按世界书顺序 → pos>target>regex）；sticky/cooldown 未实现；不区分蓝绿灯
- getwi 重复调用会重复执行目标条目；世界书计算在 preparation 和 generate 都触发；渲染阶段不触发世界书计算
- injectPrompt 顺序无关；`hasPromptsInjected`
- activateRegex 替换值可为函数；完整 opts
- 追加常量：SillyTavern、faker、世界书名、chatId/characterId 等、world_info/generateBuffer/generateData、LAST_SEND/RECEIVE_TOKENS/CHARS
- 追加函数：getCharData、getWorldInfoData、getWorldInfoActivatedData、activateWorldInfoByKeywords、selectActivatedEntries、setVariableSchema、execute、getSyntaxErrorInfo、patchVariables
- `/ejs`、`/ejs-refresh` STscript 命令
- **token 预算陷阱**：getwi/getvar/getchar 导入内容不计入世界书 Context %/Budget，易超限丢条目
- `@types/iframe/exported.ejstemplate.d.ts` 提供的 `EjsTemplate.*` iframe 侧接口（本项目内可用；注意类型文件中 `evaltemplate` 属性名全小写与文档示例 `evalTemplate` 大小写不一致，是类型文件自身笔误）

## 三、知识库内部（EJS 条目之间/与非 EJS 条目之间）的张力

- **递归勾选**：《EJS动态内容控制器》要求 getwi 控制器"不勾防递归"；《世界书配置指南》总规则是所有条目双勾；《EJS调色盘多阶段自查》要求调色盘条目双勾。skill 的处理：按模式区分——不用 getwi 的条目双勾，用 getwi 的控制器不勾防递归。
- **[GENERATE:BEFORE] 灯色**：EJS 条目记载"仅蓝灯"；官方一致。（[RENDER:BEFORE] 仅蓝灯、[GENERATE:AFTER]/[RENDER:AFTER] 蓝绿均同官方。）
- 非 EJS 条目间的已知冲突（与 EJS 无直接关系，但写 MVU+EJS 卡时会遇到，此处仅登记）：变量列表固定标签 `<status_current_variable>`（MVU_ZOD指南）vs `<status_current_variables>`（MVU自查，复数）；MVU 更新命令集 set/insert/delete/add/move（16_MVU变量框架）vs JSON Patch replace/delta/insert/remove/move（MVU_ZOD指南/MVU自查，当前主流）；《世界书配置指南》"D1+ 不放任何东西" vs MVU 条目使用 D1/D4。引用这些规则时以 MVU_ZOD指南 + 实际模板（琼明女神录、示例/角色卡示例）为准。

## 四、核对结论统计

对知识库 8 个 EJS 条目的核心技术声明逐条核对：绝大多数**证实**（标签语法、执行位置、变量函数签名与默认值、getwi/activewi 签名、装饰器清单与书写规则、标题前缀、@INJECT 语义、injectPrompt/getPromptsInjected、常量表、define 的 this 规则、activateRegex、noCache 规则）；2 处**纠正**（@@if 表达能力、activewi 强制性）；1 处**删除**（无法证实的 ST 1.13.4+ 版本要求）；1 处**保留但登记未证实**（@@preprocessing 与 @@generate_* 互斥规则，见第一节末行）；其余为**遗漏补全**（见第二节）。

## 五、本次整理对知识库模板的修订（登记）

以下问题为知识库原文自带，skill 已修正：

- 《动态内容控制器》模板使用未声明的 `currentEvent` → recipes.md 模式 C 补充声明行
- 同模板的 `isFloorZero` 不是任何文档记载的常量 → 改为 `lastMessageId > 0`
- 同模板标签用 `<% %>` → 统一为 `<%_ _%>`（与知识库《调色盘自查》的推荐一致）
- 《多阶段人设》示例在 recipes.md 中原样保留；模式 E（角色阶段.yaml）转写时补上了原文件中分支体的 2 空格缩进并明确"分支体须保持父键下缩进"的规则
- `delvar('key', '属性名')` 为知识库用法，官方签名记第二参数为 index → SKILL.md/functions.md 保留知识库用法并加注
- functions.md 曾把 `'0-{{lastMessageId}}'` 字符串范围写在 EJS getChatMessages 条目下（实为酒馆助手 API 的用法）→ 已删除

## 六、本仓库内的 EJS 事实

- 全项目（琼明女神录、src/、初始模板）唯一真实 EJS 用例：`示例/角色卡示例/世界书/角色/角色阶段.yaml`（见 recipes.md 模式 E）
- 琼明女神录卡为纯 MVU 卡（{{format_message_variable::stat_data}} 宏），无 EJS
- `示例/角色卡示例/脚本/立即事件/index.ts` 用的是酒馆助手 `injectPrompts`（复数，position:'none' 只用于激活绿灯 + should_scan），不是 EJS 的 injectPrompt——两者勿混
- EJS 模板上下文函数（getvar/getwi 等）只存在于模板内，`@types/` 不声明它们；iframe 侧只能走 `EjsTemplate.evaltemplate`
