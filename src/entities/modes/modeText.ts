import { Mode } from '@entities/Mode.ts'

export const modeText: Record<Mode, string> = {
	[Mode.pomodoro]: 'Focus',
	[Mode.short]: 'Short break',
	[Mode.long]: 'Long break'
}
