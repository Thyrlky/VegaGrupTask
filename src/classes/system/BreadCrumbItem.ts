import { RouteName } from '@/enums/system'
import { RouteLocationNamedRaw } from 'vue-router'

export class BreadCrumbItem {
  route?: RouteLocationNamedRaw
  routeName?: RouteName // RouteName yoksa title bakılacak
  title?: string
  icon?: string
  active?: boolean
}
