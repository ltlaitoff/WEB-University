import { Mode } from '@entities/Mode.ts'
import BedIcon from '@shared/icons/bed.svg'
import BrainIcon from '@shared/icons/brain.svg'
import CupIcon from '@shared/icons/cup.svg'

export const modeIcons: Record<Mode, string> = {
	[Mode.pomodoro]: BrainIcon,
	[Mode.short]: CupIcon,
	[Mode.long]: BedIcon
}
