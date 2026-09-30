// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
	title: 'shared/Input',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Текстовое поле ввода с размерами default и compact.',
			},
		},
	},
	args: {
		placeholder: 'Введите значение',
	},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Compact: Story = {
	args: {
		inputSize: 'compact',
		placeholder: '+7 (999) 123-45-67',
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		value: 'Недоступно для редактирования',
	},
}
