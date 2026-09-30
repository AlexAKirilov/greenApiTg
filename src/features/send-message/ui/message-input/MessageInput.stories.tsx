// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import { MessageInput } from './MessageInput'

const meta = {
	title: 'features/MessageInput',
	component: MessageInput,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Поле ввода и отправки текстового сообщения. Enter отправляет сообщение, Shift+Enter — перенос строки. Ограничение длины задаётся константой `MAX_MESSAGE_LENGTH`.',
			},
		},
	},
	args: {
		onSend: fn(async () => undefined),
		disabled: false,
	},
} satisfies Meta<typeof MessageInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}
