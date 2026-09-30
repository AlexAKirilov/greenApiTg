// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '../input/Input'

import { Field } from './Field'

const meta = {
	title: 'shared/Field',
	component: Field,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Обёртка поля формы с подписью label, связанной с дочерним контролом через htmlFor.',
			},
		},
	},
	args: {
		label: 'API URL',
		htmlFor: 'api-url',
		children: <Input id='api-url' placeholder='https://api.green-api.com' />,
	},
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCompactInput: Story = {
	args: {
		label: 'Номер телефона',
		htmlFor: 'phone',
		children: (
			<Input id='phone' inputSize='compact' placeholder='+7 (999) 123-45-67' />
		),
	},
}
