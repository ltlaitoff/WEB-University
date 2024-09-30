/**
 * Add leading zero to a digit if it is less than 10
 *
 * @author Ivan Shchedrovskyi
 */
export const formatDigit = (digit: number) => {
	if (digit >= 10) return String(digit)

	return '0' + String(digit)
}
