import { Mode } from '@entities/Mode'

export const modeText: Record<Mode, string> = {
	[Mode.pomodoro]: 'Focus',
	[Mode.short]: 'Short break',
	[Mode.long]: 'Long break'
}
