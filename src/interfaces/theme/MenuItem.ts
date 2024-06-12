import { UserType } from '@/enums/auth'
import { RouteName } from '@/enums/system'
import { RouteLocationNamedRaw } from 'vue-router'

export interface MenuLink {
  type: 'link'

  icon?: string
  route: RouteLocationNamedRaw
  title: RouteName
  userType?: UserType[]
  active?: boolean
}

export interface MenuLinkWithChildren {
  type: 'linkWithChildren'

  icon?: string
  title: RouteName
  userType?: UserType[]
  active?: boolean
  children: Array<MenuLink | MenuLinkWithChildren>
  isOpen?: boolean
}

export interface MenuDevider {
  type: 'devider'

  userType?: UserType[]
}

export interface MenuItemTypesRegistry {
  MenuLink: MenuLink
  MenuLinkWithChildren: MenuLinkWithChildren
  MenuDevider: MenuDevider
}

export type MenuItem = MenuItemTypesRegistry[keyof MenuItemTypesRegistry]
