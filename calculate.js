const matrix =
    [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '=', '0', '=', '0', '0', '0', '0'],
        ['0', '=', '0', '0', '<', '<', '0', '<', '<', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '=', '0', '0', '<', '<', '0', '<', '<', '0'],
        ['0', '0', '0', '>', '0', '>', '=', '0', '0', '0'],
        ['0', '0', '0', '>', '0', '>', '0', '0', '0', '0'],
        ['0', '0', '0', '>', '0', '>', '0', '0', '0', '0'],
        ['0', '0', '0', '>', '0', '>', '0', '0', '0', '0']
    ];
const index = {
    'S': 0,
    'M': 1,
    '[': 2,
    ']': 3,
    '(': 4,
    'a': 5,
    ')': 6,
    'b': 7,
    'c': 8
};

const rules = {
    '[M]' : 'S',
    '(Ma)': 'M',
    'a'   : 'M',
    'b'   : 'M',
    'c'   : 'M'
};

function calculate(msgString) {
	return new Promise((resolve) => {
		const msg = msgString.split('');
	    const stack = [];
	    stack.push('#');
	    stack.push(msg['0']);
	    let i = 1;
	    while (msg[i]!== '#' && i<msg.length && stack.length > 1) {
	        const lastInStack = stack[stack.length - 1];
	        const cur = msg[i];
	        if (matrix[index[lastInStack]][index[cur]] === '<' || matrix[index[lastInStack]][index[cur]] === '=') {
	            stack.push(cur);
	            i++;
	        } else if (matrix[index[lastInStack]][index[cur]] === '>') {
	            convolution(stack);
	        } else {
	            break;
	        }
    }

    convolution(stack);
    if (stack.length === 2 && stack['0'] === '#' && stack[1] === 'S') {
        resolve('Yes');
    } else {
        resolve('No');
    }
	});
    
}

function convolution(stack) {
    let removed = '';
    while (stack.length > 1) {
        const lastRemoved = stack.pop();
        removed = lastRemoved + removed;
        const lastInStack = stack[stack.length - 1];
        const rule = rules[removed];
        if (rule && (lastInStack === '#' || matrix[index[lastInStack]][index[rule]] === '<' ||
            matrix[index[lastInStack]][index[rule]] === '=')) {
            stack.push(rule);
            break;
        }
    }
}
