import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { productType} from './productTypes'
import { orderType} from './orderType'
import { salesType } from './salesType'
import { heroType } from './heroType'
import { homeSection } from "./homeSection";
import { featuredProducts } from './featuredProducts'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType, salesType, heroType, homeSection, featuredProducts],
}
