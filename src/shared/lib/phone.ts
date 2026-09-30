export function formatPhoneToChatId(phone: string): string {
	const digits = phone.replace(/\D/g, '')
	if (!digits) {
		throw new Error('Введите номер телефона')
	}
	return `${digits}@c.us`
}

export function formatPhoneDisplay(phone: string): string {
	const digits = phone.replace(/\D/g, '')
	if (digits.startsWith('7') && digits.length === 11) {
		return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
	}
	return phone.startsWith('+') ? phone : `+${digits}`
}
