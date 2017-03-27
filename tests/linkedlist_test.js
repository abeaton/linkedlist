import test from 'ava';
import LinkedList from '../es6/linkedlist.js';
import Node from '../es6/linkedListNode.js';

/**
 * constructor
 */

test("Test empty", testConstruction, [], "empty", 0)
test("Test multiple numbers", testConstruction, [2, 3, 1, 5, 7], "2 -> 3 -> 1 -> 5 -> 7", 5);
test("Test a single number", testConstruction, [15], "15", 1);
test("Test two numbers", testConstruction, [15, 16], "15 -> 16", 2);
test("Test three numbers", testConstruction, [3, 4, 5], "3 -> 4 -> 5", 3);

function testConstruction(t, initialValues, expectedString, expectedSize){
	var linkedlist = new LinkedList(...initialValues);
	t.is(linkedlist.toString(), expectedString);
	t.is(linkedlist.getSize(), expectedSize);
}

test("Test different types", testInvalidConstruction, [2, "test"]);
test("Test throws - object", testInvalidConstruction, [{x:13}]);
test("Test throws - array of objects", testInvalidConstruction, [{x:10, y:11}, {x:1, y:1}]);

function testInvalidConstruction(t, initialValues){
	t.throws(() => new LinkedList(...initialValues));
}

/**
 * getHeadValue
 */

test("Test multiple numbers", testGetHeadValue, 2, [2, 3, 1, 5, 7]);
test("Test a single number", testGetHeadValue, 15, [15]);
test("Test two numbers", testGetHeadValue, 15, [15, 16]);
test("Test three numbers", testGetHeadValue, 3, [3, 4, 5]);

function testGetHeadValue(t, expected, initialValues){
	var linkedlist = new LinkedList(...initialValues);
	t.is(linkedlist.getHeadValue(), expected);
}

test("Test null head throws", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.getHeadValue());
});

/**
 * getTailValue
 */

test("Test multiple numbers", testGetTailValue, 7, [2, 3, 1, 5, 7]);
test("Test a single number", testGetTailValue, 15, [15]);
test("Test two numbers", testGetTailValue, 16, [15, 16]);
test("Test three numbers", testGetTailValue, 5, [3, 4, 5]);

function testGetTailValue(t, expected, initialValues){
	var linkedlist = new LinkedList(...initialValues);
	t.is(linkedlist.getTailValue(), expected);
}

test("Test null tail throws", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.getTailValue());
});

/**
 * insertValueHead
 */

test("Test empty to start", testInsertValueHead, [], 1, "1", 1);
test("Test 1 value", testInsertValueHead, [1], 2, "2 -> 1", 2);
test("Test 2 values", testInsertValueHead, [2, 1], 3, "3 -> 2 -> 1", 3);
test("Test multiple values", testInsertValueHead, [3, 2, 1], 4, "4 -> 3 -> 2 -> 1", 4);

function testInsertValueHead(t, initialValues, inserted, expectedString, expectedSize){
	var linkedlist = new LinkedList(...initialValues);
	linkedlist.insertValueHead(inserted);

	t.is(linkedlist.toString(), expectedString);
	t.is(linkedlist.getSize(), expectedSize);
}

test("Insert invalid value head", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.insertValueHead(null));
	t.throws(() => linkedlist.insertValueHead({x: 5}));
});

/**
 * insertValueTail
 */

test("Test empty to start", testInsertValueTail, [], 1, "1", 1);
test("Test 1 value", testInsertValueTail, [1], 2, "1 -> 2", 2);
test("Test 2 values", testInsertValueTail, [1, 2], 3, "1 -> 2 -> 3", 3);
test("Test multiple values", testInsertValueTail, [1, 2, 3], 4, "1 -> 2 -> 3 -> 4", 4);

function testInsertValueTail(t, initialValues, inserted, expectedString, expectedSize){
	var linkedlist = new LinkedList(...initialValues);
	linkedlist.insertValueTail(inserted);
	
	t.is(linkedlist.toString(), expectedString);
	t.is(linkedlist.getSize(), expectedSize);
}

test("Insert invalid value tail", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.insertValueTail(null));
	t.throws(() => linkedlist.insertValueTail({x: 5}));
});

/**
 * insertValueAtIndex
 */

test("Equivalent to insert head / tail", t => {
	var linkedlist = new LinkedList();

	t.is(linkedlist.getHead(), null);
	t.is(linkedlist.getTail(), null);
	t.is(linkedlist.isEmpty(), true);

	linkedlist.insertValueAtIndex(0, 15);
	t.is(linkedlist.getHeadValue(), 15);
	t.is(linkedlist.getTailValue(), 15);
	t.is(linkedlist.getSize(), 1);
});

test("Equivalent to insert head, non empty linkedlist", t => {
	var linkedlist = new LinkedList(4, 3, 2);

	t.is(linkedlist.getHeadValue(), 4);
	t.is(linkedlist.getSize(), 3);

	linkedlist.insertValueAtIndex(0, 1);
	t.is(linkedlist.toString(), "1 -> 4 -> 3 -> 2");
	t.is(linkedlist.getSize(), 4);
});

test("Equivalent to insert tail, non empty linkedlist", t => {
	var linkedlist = new LinkedList(3, 2, 8);

	t.is(linkedlist.getTailValue(), 8);
	t.is(linkedlist.getSize(), 3);

	linkedlist.insertValueAtIndex(3, 15);
	t.is(linkedlist.toString(), "3 -> 2 -> 8 -> 15");
	t.is(linkedlist.getSize(), 4);
});

test("General insert", t => {
	var linkedlist = new LinkedList(3, 2, 8);

	t.is(linkedlist.getSize(), 3);

	linkedlist.insertValueAtIndex(1, 15);

	t.is(linkedlist.toString(), "3 -> 15 -> 2 -> 8");
	t.is(linkedlist.getSize(), 4);
});

test("Index too small", testInsertAtInvalidIndex, new LinkedList(), -1);
test("Index too large", testInsertAtInvalidIndex, new LinkedList(), 1);
test("Index too small, non empty linkedlist", testInsertAtInvalidIndex, new LinkedList(3, 2, 8), -1);
test("Index too large, non empty linkedlist", testInsertAtInvalidIndex, new LinkedList(1, 2, 3, 4), 5);

function testInsertAtInvalidIndex(t, linkedlist, index){
	t.throws(() => linkedlist.insertValueAtIndex(index, 1));
}

test("Invalid value: null", testInsertInvalidValue, null);
test("Invalid value: object", testInsertInvalidValue, {x:13});
test("Invalid value: array", testInsertInvalidValue, []);

function testInsertInvalidValue(t, value){
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.insertValueAtIndex(0, value));
}

test("Invalid value: null", testInsertInvalidNode, null);
test("Invalid value: object", testInsertInvalidNode, {x:13});
test("Invalid value: array", testInsertInvalidNode, []);

function testInsertInvalidNode(t, value){
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.insertNodeAtIndex(0, value));
}

/**
 * removeFromHead
 */

test("Remove head from empty list - throws", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.removeFromHead());
});

test("Remove from head, non empty linkedlist", t => {
	var linkedlist = new LinkedList(4, 3, 2);

	t.is(linkedlist.getHeadValue(), 4);
	t.is(linkedlist.getSize(), 3);

	linkedlist.removeFromHead();
	t.is(linkedlist.getHeadValue(), 3);
	t.is(linkedlist.toString(), "3 -> 2");
	t.is(linkedlist.getSize(), 2);
});

/**
 * removeFromTail
 */

test("Remove tail from empty list - throws", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.removeFromTail());
});

test("Remove from tail, non empty linkedlist", t => {
	var linkedlist = new LinkedList(3, 2, 8);

	t.is(linkedlist.getTailValue(), 8);
	t.is(linkedlist.getSize(), 3);

	linkedlist.removeFromTail();
	t.is(linkedlist.getTailValue(), 2);
	t.is(linkedlist.toString(), "3 -> 2");
	t.is(linkedlist.getSize(), 2);
});

/**
 * removeAtIndex
 */

test("Equivalent to remove head & tail", t => {
	var linkedlist = new LinkedList(11);

	t.is(linkedlist.getHeadValue(), 11);
	t.is(linkedlist.getTailValue(), 11);
	t.is(linkedlist.getSize(), 1);

	linkedlist.removeAtIndex(0);
	t.is(linkedlist.getHead(), null);
	t.is(linkedlist.getTail(), null);
	t.is(linkedlist.isEmpty(), true);
});

test("Equivalent to remove head, non empty linkedlist", t => {
	var linkedlist = new LinkedList(4, 3, 2);

	t.is(linkedlist.getHeadValue(), 4);
	t.is(linkedlist.getSize(), 3);

	linkedlist.removeAtIndex(0);
	t.is(linkedlist.toString(), "3 -> 2");
	t.is(linkedlist.getHeadValue(), 3);
});

test("Equivalent to remove tail, non empty linkedlist", t => {
	var linkedlist = new LinkedList(3, 2, 8);

	t.is(linkedlist.getTailValue(), 8);
	t.is(linkedlist.getSize(), 3);

	linkedlist.removeAtIndex(2);
	t.is(linkedlist.toString(), "3 -> 2");
	t.is(linkedlist.getTailValue(), 2);
	t.is(linkedlist.getSize(), 2);
});

test("General remove at index", t => {
	var linkedlist = new LinkedList(3, 2, 8, 15);

	t.is(linkedlist.getSize(), 4);

	linkedlist.removeAtIndex(2);

	t.is(linkedlist.toString(), "3 -> 2 -> 15");
	t.is(linkedlist.getSize(), 3);
});

test("Remove at index - empty", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.removeAtIndex(0));
});

test("Remove at index - too small", t => {
	var linkedlist = new LinkedList(1, 2, 3);
	t.throws(() => linkedlist.removeAtIndex(-1));
});

test("Remove at index - too large", t => {
	var linkedlist = new LinkedList(1, 2, 3);
	t.throws(() => linkedlist.removeAtIndex(3));
});

/**
 * getValueAtIndex
 */

test("First index", testGetValueAtIndex, new LinkedList(7, 8, 9), 0, 7);
test("Second index", testGetValueAtIndex, new LinkedList(7, 8, 9), 1, 8);
test("Third index", testGetValueAtIndex, new LinkedList(7, 8, 9), 2, 9);

function testGetValueAtIndex(t, linkedlist, index, expected){
	t.is(linkedlist.getValueAtIndex(index), expected);
}

test("Get value at index - empty linked list", t => {
	var linkedlist = new LinkedList();
	t.throws(() => linkedlist.getValueAtIndex(0));
});

test("Get value at index - too small", t => {
	var linkedlist = new LinkedList(1, 2, 3);
	t.throws(() => linkedlist.getValueAtIndex(-1));
});

test("Get value at index - too large", t => {
	var linkedlist = new LinkedList(1, 2, 3);
	t.throws(() => linkedlist.getValueAtIndex(3));
});

/**
 * throwIfNull
 */

test("Test throw when null", t => {
	t.throws(() => LinkedList.throwIfNull(null));
	t.notThrows(() => LinkedList.throwIfNull(new Node("test")));
	t.notThrows(() => LinkedList.throwIfNull(1));
});

/**
 * isNode
 */

test("Node", testIsNode, new Node(5), true);
test("Number", testIsNode, 1, false);
test("Null", testIsNode, null, false);
test("Object", testIsNode, {x:5}, false);

function testIsNode(t, value, expected){
	var isNode = LinkedList.isNode(value);
	t.is(isNode, expected);
}