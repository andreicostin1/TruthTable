
import { Operator, OpPriority } from './Util';

// Extract operators in standalone variables
const { NOT } = Operator;

class Proposition {
	constructor(notation, value = false, operator = null, compound = false) {
		this.notation = notation;
		this.value = value;
		this.operator = operator;
		this.compound = compound;
	}

	static fromOperator(operator, prop1, prop2) {
		let notation = '';

		if (operator === NOT) {
			if (prop1.compound && prop1.operator !== NOT) {
				notation = operator + `(${prop1.notation})`;
			} else {
				notation = operator + prop1.notation;
			}
		} else {
			if (prop1.compound && OpPriority[operator] > OpPriority[prop1.operator]) notation = `(${prop1.notation})`;
			else notation = prop1.notation;

			notation += operator;

			if (prop2.compound && OpPriority[operator] > OpPriority[prop2.operator]) notation += `(${prop2.notation})`;
			else notation += prop2.notation;
		}

		return new Proposition(notation, null, operator, true);
	}

	static needBrackets(prop, formula) {
		const idx = formula.indexOf('(' + prop + ')');
		if (idx > -1) return true;
		return false;
	}
}

export default Proposition;