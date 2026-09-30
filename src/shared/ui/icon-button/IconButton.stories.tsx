// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import { IconButton } from './IconButton'

const meta = {
	title: 'shared/IconButton',
	component: IconButton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Компактная кнопка для иконок и символов в панелях инструментов.',
			},
		},
	},
	args: {
		children: '✏️',
		title: 'Новый чат',
		onClick: fn(),
	},
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Logout: Story = {
	args: {
		children: '⏻',
		title: 'Выйти',
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}
