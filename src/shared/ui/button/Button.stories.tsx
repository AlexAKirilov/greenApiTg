// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import { Button } from './Button'

const meta = {
	title: 'shared/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Базовая кнопка с вариантом primary и размерами default, compact и icon.',
			},
		},
	},
	args: {
		children: 'Отправить',
		onClick: fn(),
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Compact: Story = {
	args: {
		size: 'compact',
	},
}

export const Icon: Story = {
	args: {
		size: 'icon',
		children: '➤',
		title: 'Отправить',
	},
}

export const FullWidth: Story = {
	args: {
		fullWidth: true,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}
