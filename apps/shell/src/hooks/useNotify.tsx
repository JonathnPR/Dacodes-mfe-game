import type { NotificationArgsProps } from 'antd'
import type { NotificationInstance } from 'antd/es/notification/interface'
import { useCallback } from 'react'
import queryClient from '../config/query.client'

type NotificationPlacement = NotificationArgsProps['placement']
type NotificationType = 'success' | 'info' | 'warning' | 'error'
interface Notify {
	message: string
	type?: NotificationType
	description?: string
	placement?: NotificationPlacement
}

export default function useNotify() {
	const api = queryClient.getQueryData<NotificationInstance>(['notify'])!

	return useCallback(
		({
			message,
			placement = 'bottomRight',
			type = 'success',
			description,
		}: Notify) => {
			api[type]({
				message,
				description,
				placement,
			})
		},
		[],
	)
}
