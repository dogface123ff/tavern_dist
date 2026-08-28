export const Schema = z.object({
  地点位置: z.object({
    大区域: z.string().prefault('中州'),
    子区域: z.string().prefault('寒宫剑宗'),
    具体地点: z.string().prefault('潮断峰母峰'),
  }),
  世界: z.object({
    当前时间: z.string().prefault('3纪 5元 846年 · 9月 26日'),
    在场角色: z.object().prefault('裴语涵'),
    角色当前状态: z.string().prefault('正在指导主角修炼'),
  }),
  主角: z.object({
    当前状态: z.string().prefault('正常'),
    境界: z.string().prefault('七境'),
    修炼进度: z.coerce
      .number()
      .transform(v => _.clamp(v, 0, 100))
      .prefault(0),
    所属势力: z.string().prefault('广寒剑宫'),
    功法面板: z.object({
      主修功法: z.string().prefault('太上忘情剑'),
      功法重数: z.string().prefault('六重'),
      习得心法: z.record(z.string().describe('心法名称'), z.string().describe('描述')).prefault({}),
    }),
    储物袋: z.object({
      货币: z.object({
        金元: z.coerce.number().prefault(0),
        银元: z.coerce.number().prefault(0),
        铜元: z.coerce.number().prefault(0),
      }),
      丹药: z
        .record(z.string().describe('物品名'), z.object({ 描述: z.string(), 数量: z.coerce.number() }))
        .prefault({}),
      材料: z
        .record(z.string().describe('物品名'), z.object({ 描述: z.string(), 数量: z.coerce.number() }))
        .prefault({}),
      杂物: z
        .record(z.string().describe('物品名'), z.object({ 描述: z.string(), 数量: z.coerce.number() }))
        .prefault({}),
      装备栏: z.object({
        本命武器: z.string().prefault('名剑“羡鱼”'),
      }),
    }),
    关系列表: z
      .record(
        z.string().describe('角色名'),
        z.object({
          修为: z.string(),
          好感度: z.coerce.number().transform(v => _.clamp(v, 0, 200)),
          关系态度: z.string(),
          重要事件: z.string(),
        }),
      )
      .prefault({}),
  }),
});


