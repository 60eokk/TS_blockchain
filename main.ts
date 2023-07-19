import { Router } from "svelte-routing";

let a1 = 'hello'
let x = "herro"
let b1 : boolean = true
let c1 = [1,2,3]
c1.push("1")      // this line doesn't work because you cannot assign a string to number array

let a : number[] = [1,2];
let b:string[] = ["i1", "1"];
let c : boolean[] = [true]


//object name "object", 
const player1 = {
    name: "oneguy"
}

//below is an example when everyone in player has a name, but only some has age
const player2 : {
    name:string,
    age?:number;     // when age is optional
} = {
    name: "twoguy"
}

if (player2.age && player2.age < 10) {     // writing this twice protects it
    console.log("young!")
}


const playerLynn : {
    name:string,
    age?:number
} = {
    name: "lynn",
    age: 12
}

//but what if you want to createa a LOT of players, you woudl have to repleat so many times.
//thus, look below
//instead of having to repeat name: string, age?: number for every person, make a TYPE and then do the rest like below

type Player = {
    name: string,
    age?: number
}

const nico : Player = {
    name: "nico"
}

const lynn : Player = {
    name: "lynn",
    age: 12
}

function playerMaker1 (name:string) {
    return {
        name:name
    }
}

// playerMaker2 will receive a "name" which is a string
// Player in line 64 means specifies the TYPE of return type
function playerMaker2 (name:string) : Player {     // this is how you specify the TYPE of argument
    return {
        name
    }
}

const jiwon = playerMaker2("jiwon")
jiwon.age = 20
// 언제든지 xxxx : type 이런식으로 TYPE정리한다.

//playMaker2 and 3 are the same function
const playMaker3 = (name:string) : Player => ({name})

//readonly property
type Age = number;
type Name = string;
type Players = {
    readonly name:Name     // If I try to modify the name of a Player, TS will stop me from doing so
    age?:Age
}

const playerMaker3 = (name:string) : Players => ({name})
const ellen = playerMaker3("ellen")
ellen.age = 12
ellen.name = "las"      // this line doesn't work because name in Players is readonly

// Tuple: create arrays that need to have min length and need to have certain types in certain positions
const playerMaker4: [string, number, boolean] = ["jiwon", 1, true]     // some APIs give their data in this way, so read the documentation

let x1: null
let x2: undefined
let x3: []   // assumes x3 is any
// users use any when they want to escape out of TS protection


let m1: unknown
// if I want to do something with m1 as a certain type, always need the if statement like below
if (typeof m1 === 'number') {
    let m2 = m1 + 1
}

function hello() {    // hover over the function and you will notice that it is a void, because it doesn't return anything
    console.log("x")
}

function bye():never {
    // return "X"     // this line would not work because the function is "never", which never returns
    throw new Error("XXX ")
}
// never function can be used in else if statements in the "else" part where something is never supposed to happen


// We will learn about functions below
// Call Signatures
const add1 = (a:number, b:number) => a+b

type Add = (a:number, b:number) => number;     // this is creating a TYPE of a call signature of a function (line 118)
const add2: Add = (a, b) => a+b     // line 118 is the same as line 120+121
// the reason why we do it like line 120, 121 is because this way, we don't have to tell TS a,b is a umber inside paranthesis


//Overloading is not written by developers a lot, instead is used in libraries
// Overloading happens when function has multiple, different call signatures
type Addsame = {     // longer way of writing call signature in line 120
    (a:number, b:number) : number
}

// there is a following function that can be used in NextJS
Router.push({     // we can send an object like this
    path: "/home"
    state: 1
})

.push("/home")     // or we can send a string like this

// So how would we show line 134-137 or line 139 in TS?
// the type 'Push' has two signatures on line 148, 149
type Config = {
    path: string
    state: object
}
type Push = {
    (path: string) : void     // takes a string and returns void
    (config: Config) : void   // takes Config object and returns void
}

const push: Push = (config) => {     // define 'push' function with type 'Push' which handles both types string or Config
    if (typeof config === "string") {console.log(config)}
    else {
        console.log(config.path)
    }
}
// end of overloading


// Polymorphism is when you want to morph multiple elements using "generics"
// In the example below, superPrint1, you cannot print arrays like line 184. But for superPrint2, you can.
type SuperPrint1 = {
    (arr:number[]): void
    (arr:string[]): void
    (arr:boolean[]):void
}

const superPrint1: SuperPrint1 = (arr) => {     // means superPrint1 will RECEIVE an array, and RETURN line 170
    arr.forEach (i => console.log(i))
}
superPrint1([1,2,3,4])
superPrint1(["a","b","c"])
superPrint1([true, false])

// You can replace <TypePlaceholder> with any kind of name you want
type SuperPrint2 = {
    <TypePlaceholder> (arr: TypePlaceholder[])
}

const superPrint2: SuperPrint2 = (arr) => {     // 
    arr.forEach (i => console.log(i))
}
superPrint2(["a", 1, true])

// just another way of writing SuperPrint2
type SuperPrint3 = <X> (a: X[]) => X     

const superPrint3: SuperPrint3 = (a) => a[0]     // this will print the first element of array a
superPrint3(["a", 1, true])

// Generics could be multiple
type SuperPrint4 = <T, V> (a: T[], b: V) => T

const superPrint4: SuperPrint4 = (a, b) => a[0]
superPrint4(["a", 1, true], "C")


// another way of writing SuperPrint3 + superPrint3
function superPrint5<V> (a: V[]) {
    return a[0]
}

type newPlayer<E> {
    name: string
    extraInfo: E
}

const sally: newPlayer<{favFood:string}> = {
    name: "sally",
    extraInfo: {
        favFood: "kimchi"
    }
}

// Classes
class PPlayer {
    constructor(
        private firstName1: string,
        private lastName1: string,
        public nickname1: string
    ) {}
}

const corgi = new PPlayer("corgi", "welsh", "KOGI")


// abstract class is a class that other classes can inherit from, but cannot make an instance of directly
// this means that you cannot do "new User" on line 250
abstract class User {
    constructor (
        private firstName2: string,
        private lastName2: string,
        private nickname2: string     // changed this to private to show how "protected it used"
    ) {}

    // method: method means a function inside a class
    // if it is private getFullName, line 251 would not work
    getFullName() {
        return '${this.firstName1} ${this.lastName1'
    }
}

class PPPlayer extends User {
    getNickName() {
        console.log(this.nickname2)     // this line doesn't work. But, if you change line232,233,234 to protected, it works
    }
}

const poodle = new PPPlayer("poodle", "standard", "poopoo")
poodle.getFullName()


// create type Words, makes you create limited amounts of property for "key string"
type Words = {
    [key:string]: string     // the key here is just a name (index), you can change it to anything
}                            // use the following when you don't know the name of property, but know the type of the property

let dictExample: Words = {
    "potato" : "food"
}

class Word {
    constructor(
        public term: string, 
        public def: string
    ) {}
}

class Dict {
    private words: Words
    constructor() {       
        this.words = {}   // initialized property manually inside constructor
    }
    add(word:Word) {      // use class as a type
        if(this.words[word.term] === undefined) {  // "this" is a term used in TS, JS which refers to "instance" of that class
            this.words[word.term] = word.def;      // we use "this" to access properties of the same instance
        }        
    }
    define(term:string) {
        return this.words[term]     
    }
}

const kimchi = new Word("kimchi", "korean food")

const dict = new Dict()
dict.add(kimchi)
dict.define("kimchi")



// Interfaces are similar to types. Interfaces specify shapes of objects. Used a lot with react.js
type XXX1 = {
    //
}

interface XXX2 {
    // almost the same as XX1
}

interface User2 {
    name: string
}

interface Player5 extends User2 {
}

const peter: Player5 = {
    name: "peter"
}


// Interfaces & Class
abstract class User6 {
    constructor (
        protected firstName: string,
        protected lastName: string
    ) {}
    abstract fullName(): string     // this abstract function will return a string
    abstract sayHi(name:string): string // parameter name, and also return string
}

class Player6 extends User6 {
    fullName(){
        return '${this.firstName} ${this.lastName}'
    }
    sayHi(name:string) {
        return 'Hello ${name}. My name is ${this.fullName}'
    }
}

// Now, will do the same (User6, Player6 stuff) using interface
interface User7 {
    firstName: string,
    lastName: string,
    sayHi(name:string): string,
    fullName(): string
}

interface Health7 {     // added a new function to use in line 345
    health: number
}

class Player7 implements User7, Health7 {
    constructor(
        public firstName: string,     // they need to be public
        public lastName: string,     // they need to be public
        public health: number
    ) {}
    fullName(){
        return '${this.firstName} ${this.lastName}'
    }
    sayHi(name:string) {
        return 'Hello ${name}. My name is ${this.fullName}'
    }
}