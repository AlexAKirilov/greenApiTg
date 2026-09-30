// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import type { Message } from '../../model/types'

import { MessageList } from './MessageList'

const now = Date.now()

const sampleMessages: Message[] = [
	{
		id: '1',
		text: 'Привет! Как дела?',
		timestamp: now - 3_600_000,
		isOutgoing: false,
	},
	{
		id: '2',
		text: 'Всё отлично, спасибо!',
		timestamp: now - 3_500_000,
		isOutgoing: true,
	},
	{
		id: '3',
		text: 'Отлично, тогда созвонимся позже.',
		timestamp: now - 3_400_000,
		isOutgoing: false,
	},
]

const meta = {
	title: 'entities/MessageList',
	component: MessageList,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Список сообщений чата с пузырьками для входящих и исходящих сообщений. При появлении новых сообщений прокручивается к последнему.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ height: 420, display: 'flex', flexDirection: 'column' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof MessageList>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
	args: {
		messages: [],
	},
}

export const WithConversation: Story = {
	args: {
		messages: sampleMessages,
	},
}

export const OutgoingOnly: Story = {
	args: {
		messages: sampleMessages.filter((message) => message.isOutgoing),
	},
}

export const IncomingOnly: Story = {
	args: {
		messages: sampleMessages.filter((message) => !message.isOutgoing),
	},
}
