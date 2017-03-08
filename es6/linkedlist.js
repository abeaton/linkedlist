import Node from "./linkedListNode.js";

export default class LinkedList {
	constructor(...initialValues){
		this.size = 0;
		this.head = null;
		this.tail = null;

		if(initialValues && initialValues.length !== 0){
			this._throwIfInvalidConstructionInput(initialValues);

			this.type = typeof(initialValues[0]);

			initialValues.forEach(v => this.insertValueTail(v));
		} else {
			this.type = null;
		}
	}

	_throwIfInvalidConstructionInput(initialValues){
		// TODO something isn't working below

		/*var type = typeof(initialValues[0]);
		var sameType = initialValues.every(v => typeof(v) === type);

		if(!(this.type === "number" || this.type === "string") || !sameType){
			throw "The input to this constructor must be numbers, strings, or empty, & must be of the same type.";
		}*/
	}

	getHeadValue(){
		LinkedList.throwIfNull(this.head);

		return this.head.getValue();
	}

	getHead(){
		return this.head;
	}

	getTailValue(){
		LinkedList.throwIfNull(this.tail);

		return this.tail.getValue();
	}

	getTail(){
		return this.tail;
	}

	insertValueHead(value){
		var nodeToAdd = new Node(value);
		this.insertNodeHead(nodeToAdd);
	}

	insertNodeHead(node){
		if(this.isEmpty()){
			this._insertFirstNodeInList(node);
		} else {
			node.setNext(this.head);
			this.head.setPrevious(node);
			this.head = node;
			this.size += 1;
		}
	}

	insertValueTail(value){
		var nodeToAdd = new Node(value);
		this.insertNodeTail(nodeToAdd);
	}

	insertNodeTail(node){
		if(this.isEmpty()){
			this._insertFirstNodeInList(node);
		} else {
			node.setPrevious(this.tail);
			this.tail.setNext(node);
			this.tail = node;
			this.size += 1;
		}
	}

	insertValueAtIndex(index, value){
		this._throwIfIndexOutOfBoundsInsert(index);

		var node = new Node(value);
		this.insertNodeAtIndex(index, node);
	}

	insertNodeAtIndex(index, node){
		this._throwIfIndexOutOfBoundsInsert(index);

		if(this.isEmpty()){
			this._insertFirstNodeInList(node);
		} else {
			if(index === 0){
				this.insertNodeHead(node);
			} else if(index === this.size){
				this.insertNodeTail(node);
			} else {
				var nodeBeforeIndex = this.getNodeAtIndex(index - 1);

				var nextNode = nodeBeforeIndex.getNext();

				nodeBeforeIndex.setNext(node);
				node.setPrevious(nodeBeforeIndex);

				nextNode.setPrevious(node);
				node.setNext(nextNode);

				this.size += 1;
			}
		}
	}

	_throwIfIndexOutOfBoundsInsert(index){
		if(index < 0 || index > this.size){
			throw "The index is either too large or too small for insertion";
		}
	}

	_insertFirstNodeInList(node){
		this.head = node;
		this.tail = node;
		this.size = 1;
	}

	_emptyOutLinkedList(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	removeFromHead(){
		if(this.isEmpty()){
			throw "You cannot remove from an empty linked list";
		} else if(this.size === 1) {
			this._emptyOutLinkedList();
		} else if(this.size === 2) {
			this.head.setNext(null);
			this.tail = this.head;
			this.size -= 1;
		} else {
			this.head = this.head.getNext();
			this.head.setPrevious(null);
			this.size -= 1;
		}
	}

	removeFromTail(){
		if(this.isEmpty()){
			throw "You cannot remove from an empty linked list";
		} else if(this.size === 1) {
			this._emptyOutLinkedList();
		} else if(this.size === 2) {
			this.tail.setPrevious(null);
			this.head = this.tail;
			this.size -= 1;
		} else {
			this.tail = this.tail.getPrevious();
			this.tail.setNext(null);
			this.size -= 1;
		}
	}

	removeAtIndex(index){
		this._throwIfIndexOutOfBounds(index);

		if(this.isEmpty()){
			throw "You cannot remove from an empty linked list";
		} else if(this.size === 1){
			this._emptyOutLinkedList();
		} else {
			if(index === 0) {
				this.removeFromHead();
			} else if(index === this.size - 1) {
				this.removeFromTail();
			} else {
				var node = this.getNodeAtIndex(index);
				var previousNode = node.getPrevious();
				var nextNode = node.getNext();

				previousNode.setNext(nextNode);
				nextNode.setPrevious(previousNode);
				this.size -= 1;
			}
		}
	}

	getValueAtIndex(index){
		this._throwIfIndexOutOfBounds(index);

		return this.getNodeAtIndex(index).getValue();
	}

	getNodeAtIndex(index){
		this._throwIfIndexOutOfBounds(index);

		var node = this.head;
		for(var i = 0; i < index; i++){
			node = node.getNext();
		}

		return node;
	}

	_throwIfIndexOutOfBounds(index){
		if(index < 0 || index >= this.size){
			throw "Index is out of bounds";
		}
	}

	static throwIfNull(input){
		if(!input){
			throw "Error: shouldn't be null.";
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
		if(this.isEmpty()) {
			return "empty";
		} else {
			var node = this.head;
			var output = node.toString();
			while(node.getNext()){
				node = node.getNext();
				output = output + " -> " + node.toString();
			}
			return output;
		}
	}
}