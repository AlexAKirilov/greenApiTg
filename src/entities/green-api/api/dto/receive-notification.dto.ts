/** Query-параметры метода ReceiveNotification (GREEN-API). */
export interface ReceiveNotificationQueryDto {
	/** Таймаут ожидания уведомления, 5–60 секунд (по умолчанию 5). */
	receiveTimeout?: number
}
