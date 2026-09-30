// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from './Textarea'

const meta = {
	title: 'shared/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Многострочное поле ввода для текста сообщений и других длинных значений.',
			},
		},
	},
	args: {
		placeholder: 'Сообщение...',
		rows: 3,
	},
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
	args: {
		defaultValue: 'Привет! Как дела?',
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: 'Отправка недоступна',
	},
}
