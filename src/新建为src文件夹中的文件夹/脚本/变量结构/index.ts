import { Schema } from '@/新建为src文件夹中的文件夹/Schema.1';
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

$(() => {
  registerMvuSchema(Schema);
});
