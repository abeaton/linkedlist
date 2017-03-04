import test from 'ava';
import Node from '../es6/linkedListNode.js';

test("Test constructor, null throws", testConstructorThrows, null);
test("Test constructor, null throws", testConstructorThrows, { x: 5 });

function testConstructorThrows(t, input){
	t.throws(() => new Node(input));
}

test("Test getValue, int", testGetValue, 2, 2);
test("Test getValue, string", testGetValue, "test", "test");
test("Test getValue, double", testGetValue, 3.2, 3.2);

function testGetValue(t, input, expected){
	var node = new Node(input);
	t.is(node.getValue(), expected);
}

test("Test set and get next, non null node", t => {
	var node = new Node(5);
	var nextValue = 100;
	var nextNode = new Node(nextValue);
	node.setNext(nextNode);

	t.is(node.getNext().getValue(), nextValue);
});

test("Test set and get next, null node", t => {
	var node = new Node(5);
	node.setNext(null);

	t.is(node.getNext(), null);
});

test("Test set and get previous, non null node", t => {
	var node = new Node(5);
	var previousValue = 100;
	var previousNode = new Node(previousValue);
	node.setPrevious(previousNode);

	t.is(node.getPrevious().getValue(), previousValue);
});

test("Test set and get next, null node", t => {
	var node = new Node(5);
	node.setPrevious(null);

	t.is(node.getPrevious(), null);
});


test("Test toString, int", testToString, 101, "101");
test("Test toString, string", testToString, "test", "test");

function testToString(t, input, expected){
	var node = new Node(input);
	t.is(node.toString(), expected);
}