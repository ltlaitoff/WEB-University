import { Mode } from '@entities/Mode.ts'

export function getNextMode(selectedMode: Mode, currentApproach: number): Mode {
	if (selectedMode === Mode.pomodoro) {
		return currentApproach >= 4 ? Mode.long : Mode.short
	}

	return Mode.pomodoro
}
