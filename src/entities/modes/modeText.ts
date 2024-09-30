import { Mode } from '@entities/Mode.ts'

/**
 * TODO: Use i18n
 */
export const modeText: Record<Mode, string> = {
	[Mode.pomodoro]: 'Focus',
	[Mode.short]: 'Short break',
	[Mode.long]: 'Long break'
}
