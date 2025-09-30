import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { productType} from './productTypes'
import { orderType} from './orderType'
import { salesType } from './salesType'
import { brandType } from './brandType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType, salesType, brandType],
}
