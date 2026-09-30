// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { FormError } from './FormError'

const meta = {
	title: 'shared/FormError',
	component: FormError,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Сообщение об ошибке формы. Режим block — отдельный блок; overlay — поверх поля ввода.',
			},
		},
	},
	args: {
		children: 'Проверьте введённые данные',
	},
} satisfies Meta<typeof FormError>

export default meta
type Story = StoryObj<typeof meta>

export const Block: Story = {
	args: {
		placement: 'block',
	},
}

export const Overlay: Story = {
	args: {
		placement: 'overlay',
		children: 'Сообщение не должно превышать 4096 символов',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					position: 'relative',
					minHeight: 48,
					padding: 8,
					border: '1px solid #ccc',
				}}
			>
				<Story />
			</div>
		),
	],
}
