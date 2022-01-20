

export const Operator = {
	OPEN_BRACKET: '(',
	NOT: '¬',
	AND: '∧',
	XOR: '⊕',
	OR: '∨',
	IMPLICATION: '⇒',
	EQUIVALENCE: '≡',
	CLOSE_BRACKET: ')'
};

// Operators' Priority
export const OpPriority = {};
let pr = Object.keys(Operator).length;
for (const op in Operator) OpPriority[Operator[op]] = pr--;

// Returns true if character is an operator
export function isOperator(c) {
	return Object.values(Operator).includes(c);
}

// Determines which symbols are operands
export function isOperand(c) {
	return (c >= 'A' && c <= 'Z');
}

// Determines if char c is T(true) or F(false)
export function isBoolean(c) {
	return (c === 't' || c === 'f');
}

// Set array prototype to return the last element
Array.prototype.top = function() {
	if (this.length == 0) return null;
	return this[this.length - 1];
}

// Set array prototype to return if the array is empty
Array.prototype.empty = function() {
	return (this.length === 0);
}

Array.prototype.includes = function(el) {
	return (this.indexOf(el) !== -1);
}