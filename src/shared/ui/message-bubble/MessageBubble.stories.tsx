// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { MessageBubble } from './MessageBubble'

const now = Date.now()

const meta = {
	title: 'shared/MessageBubble',
	component: MessageBubble,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Пузырёк одного сообщения с текстом и временем. Выравнивание зависит от флага isOutgoing.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 420, padding: 16, background: '#f0f2f5' }}>
				<Story />
			</div>
		),
	],
	args: {
		text: 'Привет! Как дела?',
		timestamp: now - 3_600_000,
		isOutgoing: false,
	},
} satisfies Meta<typeof MessageBubble>

export default meta
type Story = StoryObj<typeof meta>

export const Incoming: Story = {}

export const Outgoing: Story = {
	args: {
		text: 'Всё отлично, спасибо!',
		isOutgoing: true,
	},
}

export const LongText: Story = {
	args: {
		text: 'Длинное сообщение для проверки переноса строк и отображения метки времени в нижней части пузырька.',
		isOutgoing: true,
	},
}
