import test from 'ava';
import Node from '../es6/linkedListNode.js';

test("Test constructor, null throws", t => {
	t.throws(() => new Node(null));
});

test("Test getValue, int", testGetValue, 2, 2);
test("Test getValue, string", testGetValue, "test", "test");

function testGetValue(t, input, expected){
	var node = new Node(input);
	t.is(node.getValue(), input);
}