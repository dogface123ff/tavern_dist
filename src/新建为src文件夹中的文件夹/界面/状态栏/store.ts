import { Schema } from '@/新建为src文件夹中的文件夹/Schema.1';
import { defineMvuDataStore } from '@util/mvu';

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });
