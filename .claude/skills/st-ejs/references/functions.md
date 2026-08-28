# EJS 完整函数与常量参考

来源：写卡知识库 EJS 条目 + 官方文档（zonde306/ST-Prompt-Template docs/reference_cn.md，v1.17.8.1 时点）。标 ※ 的为知识库未收录、官方文档补充。

## 变量函数

```javascript
// 读取
getvar(key)                       // 默认 scope 'cache'（合并变量树）
getvar(key, { defaults: 0 })      // 不存在时返回默认值
getvar(key) !== undefined         // 判断是否存在

// 写入（默认 scope 'message'）
setvar(key, value)                                  // 基本
setvar(key, value, { scope: 'local' })              // 写聊天变量
setvar(key, value, 'global')                        // scope 快捷写法
setvar(key, value, { flags: 'nx' })                 // 仅不存在时写入
setvar(key, value, 'nx')                            // flags 快捷写法

// 增减（支持 min/max 范围限制）
incvar('好感度', 5,  { scope: 'local', min: 0, max: 100 })
decvar('金币', 100, { scope: 'local', min: 0 })

// 删除 / 插入
delvar('key')
delvar('key', '属性名')            // 删除对象属性（知识库用法；官方签名记为 delvar(key, index?, options?)，第二参数语义以实测为准）
insvar('数组', '新元素')           // 追加到数组末尾

// 补丁方式更新
patchVariables(key, change, options)   // ※ change 为 RFC 6902 JSON Patch
```

完整 options 字段（※官方）：

- `GetVarOption`：`defaults`、`scope`、`index`、`noCache`
- `SetVarOption`：`index`、`scope='message'`、`flags='n'`、`results='new'`、`withMsg`、`merge`、`dryRun`、`noCache`
- `GetSetVarOption`（incvar/decvar）：上述 + `min`、`max`
- `flags`：`n` 无条件写（默认）/ `nx` cache 中不存在才写 / `xx` cache 中存在才写 / `nxs`、`xxs` 按目标 scope 判断
- `results`：`'new'` 返回新值（默认）/ `'old'` 返回旧值 / `'fullcache'` 返回整个更新后缓存
- `dryRun: true`：允许在 preparation 阶段执行写入（正常被阻止）

带作用域别名（※官方）：`setLocalVar` / `setGlobalVar` / `setMessageVar` 及对应 `getLocalVar`、`incLocalVar`、`decLocalVar`、`delLocalVar`、`insertLocalVar` 等。

作用域存储位置（※官方）：`global` → extension_settings.variables.global；`local` → chat_metadata.variables；`message` → chat[楼层].variables[swipe]；`cache` → 模板合并变量（不保存）；`initial` → [InitialVariables] 写入的初始消息变量。setvar 无论选哪个 scope 都会同步更新 cache。

`variables` 合并规则（※官方）：消息变量（楼层号从末尾到开头，即最新→最旧）> 聊天(local) > 全局；同键冲突时双方都是数组或都是对象则 `_.merge`，否则直接覆盖；处理某个楼层消息的变量时，当前及更靠后楼层的变量会被排除。

## 世界书函数

```javascript
await getwi('条目名')                       // 自动推断世界书；必须 await
await getwi('世界书名', '条目名')            // 指定世界书
await getwi('条目名', { key: value })       // 传递数据

await activewi('条目名')                    // 普通激活（交给酒馆原生，遵循绿灯/向量化）
await activewi('条目名', true)              // 强制激活
// 应在 [GENERATE:BEFORE] / @@generate_before 中调用（官方：不强制，别处调用下次生成才生效）

await getEnabledWorldInfoEntries(chara, global, persona, charaExtra, onlyExisting)  // ※
getWorldInfoData(name)                      // ※
getWorldInfoActivatedData(name, keyword, condition)   // ※
activateWorldInfoByKeywords(keywords, condition)      // ※
selectActivatedEntries(entries, keywords, condition)  // ※
```

getwi 注意（※官方）：只有 getwi/getWorldInfo 参与递归推断；递归导入内部世界书名会自动解析为当前书；**重复调用会重复执行目标条目代码**；世界书计算在 preparation 和 generate 阶段都会触发。

## 角色 / 预设 / 快速回复

```javascript
await getchar('角色名')                     // 角色定义（getChara 别名）
await getchar('角色名', template, data)     // ※ 自定义输出模板
await getpreset('预设提示词名')             // 预设提示词（getPresetPrompt 别名）
await getqr('集合名', '标签名')             // 快速回复（getQuickReply 别名，仅已启用的 QR 集合）
await getCharData('角色名' | 'current')     // SillyTavern.v1CharData | null，'current' 为当前卡
```

## 消息函数

```javascript
getChatMessage(idx)                          // 指定楼层
getChatMessages(count)                       // 最后 N 条
getChatMessages(start, end)                  // 范围；支持负数深度（-1 最新）
getChatMessages(-1, -1, 'user')              // 楼层范围 + 角色过滤
matchChatMessages(['关键词'])                 // 最后 2 楼关键词匹配
matchChatMessages(['关键词'], { start: -4 })  // 扩大扫描范围
matchChatMessages([/正则/s])                 // 正则匹配
```

## 输出 / 注入 / 正则

```javascript
print(...args)                               // 输出（仅代码块内，不能用于 <%- / <%=）
injectPrompt(key, prompt, order = 100, sticky = 0, uid = '')   // 定义可注入提示词片段
getPromptsInjected(key, postprocess = [])    // 取用（顺序无关）
hasPromptsInjected(key)                      // 是否已定义

activateRegex(/pattern/gi, '替换')                            // 一次性正则
activateRegex(/pattern/gi, '替换', { message: true, html: true })  // 楼层 HTML 替换
activateRegex(/pattern/gi, function(match) { ... })          // ※ 替换值可为函数
```

activateRegex 完整 opts（※官方）：`uuid`、`message`、`html`（需开启 message）、`minDepth`/`maxDepth`、`user`/`assistant`/`worldinfo`/`reasoning`/`generate`/`basic`、`order`、`before`、`sticky`。

## 工具函数

```javascript
parseJSON(text)                  // 宽松解析 LLM 输出的不标准 JSON
jsonPatch(dest, change)          // RFC 6902 补丁应用
setVariableSchema(schema)        // ※ zod 校验变量（根节点须宽松）
evalTemplate(content, data, options)   // 求值另一段模板（返回 Promise，需 await）
execute(cmd)                     // ※ 执行 STscript（如 /setvar），返回 Promise<string>
getSyntaxErrorInfo(code, max_lines = 4)  // ※ 只查语法不执行，返回错误文本或空串
define(name, value, merge = false)       // 定义复用值/函数，页面刷新前有效
```

define 规则：必须 function 语句（`define('fn', function() { return this.getvar('key'); })`），内部用 `this.getvar` / `this.setvar` / `this.variables`；结果保留至页面刷新/关闭。

## 内置常量

| 常量 | 说明 |
|---|---|
| `variables` | 合并后的变量对象（消息→聊天→全局） |
| `_` / `$` | Lodash / jQuery |
| `toastr` | 通知库 |
| `userName` / `charName` | 用户名 / 角色名 |
| `lastMessageId` | 最后消息 ID |
| `lastUserMessage` / `lastCharMessage` | 最后用户 / 角色消息内容 |
| `generateType` | `''`/custom/normal/continue/impersonate/regenerate/swipe/quiet |
| `runType` | generate / preparation / render / render_permanent（render_permanent = 永久修改消息的渲染变体） |
| ※ `SillyTavern` | = SillyTavern.getContext() |
| ※ `faker` | faker.fakerEN / fakerCN… |
| ※ `charLoreBook` / `userLoreBook` / `chatLoreBook` | 各世界书名 |
| ※ `chatId` / `characterId` / `groupId` / `groups` | 标识 |
| ※ `charAvatar` / `userAvatar` / `model` | 头像 / 模型 |
| ※ `lastUserMessageId` / `lastCharMessageId` | 最后消息楼层号 |
| ※ `world_info` / `generateBuffer` / `generateData` | 仅 @@generate_* / [GENERATE:*] 条目内可用 |
| ※ `LAST_SEND_TOKENS` / `LAST_SEND_CHARS` / `LAST_RECEIVE_TOKENS` / `LAST_RECEIVE_CHARS` | 每次生成后的实际统计 |

仅渲染阶段（runType='render'）：`message_id`、`swipe_id`、`name`、`is_last`、`is_user`、`is_system`。

## iframe 侧 EjsTemplate 接口

酒馆助手 iframe（脚本/前端界面）中通过 `window.EjsTemplate` 访问（类型见 @types/iframe/exported.ejstemplate.d.ts；注意该类型文件中属性名 `evaltemplate` 全小写、文档示例用 `evalTemplate`，大小写不一致是类型文件自身问题）：

```typescript
EjsTemplate.evaltemplate(code, context?, options?)        // 求值模板，context 用 prepareContext 的返回值
EjsTemplate.prepareContext(additional_context?, last_message_id?)  // 构造模板上下文
EjsTemplate.getSyntaxErrorInfo(code, output_line_count?)  // 语法检查
EjsTemplate.allVariables(end_message_id?)                 // 同步取合并变量表
EjsTemplate.getFeatures() / setFeatures(partial) / resetFeatures()
// 另有 compileTemplate、saveVariables、refreshWorldInfo、defines、initialVariables（※官方文档）
```

修改已构造的 context 时要原地 `_.merge(env, {...})`，不要展开成新对象（※官方）。

主要设置项（Features，※官方）：`enabled`、`generate_enabled`（处理生成内容）、`generate_loader_enabled`（注入 [GENERATE] 条目）、`inject_loader_enabled`（注入 @INJECT 条目）、`render_enabled`（处理楼层消息）、`render_loader_enabled`（注入 [RENDER] 条目）、`code_blocks_enabled`、`raw_message_evaluation_enabled`、`filter_message_enabled`、`depth_limit`（楼层处理最大深度，-1 无限制）、`autosave_enabled`、`preload_worldinfo_enabled`（立即加载世界书）、`with_context_disabled`、`debug_enabled`、`invert_enabled`（GENERATE/RENDER/INJECT 条目「禁用视为启用」兼容开关）、`compile_workers`、`sandbox`、`cache_enabled`（0 禁用/1 全部/2 仅世界书）、`cache_size`、`cache_hasher`。

## STscript 命令（※官方）

```text
/ejs ctx={ a : 1 } block=true <%= a %>    // 执行 EJS；ctx 传变量，block=true 自动包 <%= %>
/ejs-refresh                              // 重载所有世界书并重新处理（一般无需，编辑后自动）
```
