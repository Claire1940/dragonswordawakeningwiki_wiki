import type { LucideIcon } from 'lucide-react'
import {
	BookOpen,
	Users,
	Swords,
	Trophy,
	Gamepad2,
	Gift,
	CalendarDays,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'guide' -> t('nav.guide')
	path: string // URL 路径，如 '/guide'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'characters', path: '/characters', icon: Users, isContentType: true },
	{ key: 'combat', path: '/combat', icon: Swords, isContentType: true },
	{ key: 'tierList', path: '/tier-list', icon: Trophy, isContentType: true },
	{ key: 'gameplay', path: '/gameplay', icon: Gamepad2, isContentType: true },
	{ key: 'gacha', path: '/gacha', icon: Gift, isContentType: true },
	{ key: 'release', path: '/release', icon: CalendarDays, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['guide', 'characters', ...]

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
