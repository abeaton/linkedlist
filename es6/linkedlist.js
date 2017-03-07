import Node from "./linkedListNode.js";

export default class LinkedList {
	constructor(...initialValues){
		this.size = initialValues.length;
		return;
	}

	getHeadValue(){
		return this.head.getValue();
	}

	getHead(){
		return this.head;
	}

	getTailValue(){
		return this.tail
	}

	getTail(){
		return this.tail;
	}

	insertValueHead(value){
		return;
	}

	insertValueTail(value){
		return;
	}

	insertNodeHead(node){
		return;
	}

	insertNodeTail(node){
		return;
	}

	insertValueAtIndex(index, value){
		return;
	}

	insertNodeAtIndex(index, node){
		return;
	}

	removeFromHead(){
		return;
	}

	removeFromTail(){
		return;
	}

	removeAtIndex(index){
		return;
	}

	getValueAtIndex(index){
		return;
	}

	getNodeAtIndex(index){
		return;
	}

	static throwIfNull(input){
		if(!input){
			throw "Error: data was null.";
		}
	}

	static isNode(input){
		return input instanceof Node;
	}

	getSize(){
		return this.size;
	}

	isEmpty(){
		return this.size === 0;
	}

	toString(){
		return "";
	}
}