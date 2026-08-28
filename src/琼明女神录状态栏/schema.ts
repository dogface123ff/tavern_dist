export const Schema = z.object({
  地点位置: z.object({
    大区域: z.string().prefault('中州'),
    子区域: z.string().prefault('寒宫剑宗'),
    具体地点: z.string().prefault('潮断峰母峰'),
  }),
  世界: z.object({
    当前时间: z.string().prefault('3纪5元846年·9月26日·卯时'),
    在场角色: z
      .record(
        z.string().describe('角色名'),
        z.object({
          穿着衣装: z.string().prefault(''),
          当前状态: z.string().prefault(''),
        }),
      )
      .prefault({
        裴语涵: {
          穿着衣装: '墨白单衣，古韵如烟，窈窕若写意',
          当前状态: '静立一旁，等候吩咐',
        },
      }),
  }),
  主角: z.object({
    当前状态: z.string().prefault('于潮断峰母峰静修'),
    境界: z.string().prefault('七境'),
    修炼进度: z.coerce
      .number()
      .transform(v => _.clamp(v, 0, 100))
      .prefault(0),
    所属势力: z.string().prefault('寒宫剑宗'),
    功法面板: z.object({
      主修功法: z.string().prefault('太上忘情剑'),
      功法重数: z.string().prefault('一重'),
      习得心法: z.record(z.string().describe('心法名称'), z.string().describe('描述').prefault('')).prefault({}),
    }),
    储物袋: z.object({
      货币: z.object({
        金元: z.coerce.number().prefault(0),
        银元: z.coerce.number().prefault(0),
        铜元: z.coerce.number().prefault(0),
      }),
      物品: z
        .record(
          z.string().describe('物品名'),
          z.object({
            分类: z.string().describe('丹药/材料/杂物').prefault(''),
            描述: z.string().prefault(''),
            数量: z.coerce.number().prefault(0),
          }),
        )
        .prefault({}),
      装备栏: z.object({
        本命武器: z.string().prefault('名剑“羡鱼”'),
      }),
    }),
  }),
  关系列表: z
    .record(
      z.string().describe('角色名'),
      z.object({
        修为: z.string().prefault(''),
        好感度: z.coerce.number().transform(v => _.clamp(v, 0, 200)).prefault(0),
        关系态度: z.string().prefault(''),
        重要事件: z.string().prefault(''),
      }),
    )
    .prefault({}),
  事件列表: z
    .record(
      z.string().describe('事件名'),
      z.object({
        状态: z.enum(['未触发', '进行中', '已完成', '已失效']).prefault('未触发'),
        阶段: z.string().describe('进行中的一句话进展；终态时为结局摘要').prefault(''),
      }),
    )
    .prefault({
      天魔吞月: { 状态: '未触发', 阶段: '' },
      试道大会: { 状态: '未触发', 阶段: '' },
    }),
});
