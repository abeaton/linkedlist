export default class Node {
	constructor (value) {
		if(!value){
			throw "The value passed into the constructor must be defined.";
		}

		this.value = value;
	}

	getValue(){
		return this.value;
	}

	setNext(next){
		this.next = next;
	}

	setPrevious(previous){
		this.previous = previous;
	}

	getNext(){
		return this.next;
	}

	getPrevious(){
		return this.previous;
	}

	toString(){
		return this.value.toString();
	}
}