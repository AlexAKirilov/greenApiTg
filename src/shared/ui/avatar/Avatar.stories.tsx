// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta = {
	title: 'shared/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Аватар с инициалом из имени или заголовка чата. Размеры sm и md, тон default и muted.',
			},
		},
	},
	args: {
		name: 'Алексей',
	},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
	args: {
		size: 'sm',
		name: '+7 (999) 123-45-67',
	},
}

export const Muted: Story = {
	args: {
		tone: 'muted',
		name: 'Контакт',
	},
}

export const SmallMuted: Story = {
	args: {
		size: 'sm',
		tone: 'muted',
		name: 'Чат',
	},
}
