---
title:      Notes on 'The Elements of Computing Systems'
fg:         "#9999aa"
bg:         "#fcfcfc"
link:       "#6682FE"
linkhover:  "#fe8268"
tablebg:    "#eeeeee"
date:       2019-12-29
location:   Melbourne, Australia
---

## Introduction
The book *The Elements of Computing Systems* by Noam Nisan and Shimon Schocken explains the design of a modern computer starting at the level of the most basic logic gates and working up to high level programming languages and operating systems.

Each chapter of the book contains a project to be completed, such as designing a CPU, building an assembler and implementing an operating system. Each chapters and project builds on the knowledge and work in the previous chapters (though they could also be completed out of order as independent exercises).

You can find more information about the book here: [From Nand to Tetris](https://www.nand2tetris.org).

These are my notes as I work through the book.

## Chapter 1: Boolean Logic

The project for this chapter is to implement a series of logic gates using only NAND gates as a primitive building block (plus any other gates once you have implemented them). For this chapter, I've shown them all using the NAND gates.

I simulated these using a tool called [Logisim](http://www.cburch.com/logisim/), which is a lot of fun to tinker with. The circuit images for the gates are screenshots from Logisim.

### NAND

|Inputs   | a, b |
|Outputs  | out  |
|Function | If a = b = 1 then out = 0, else out = 1 |

This logic gate outputs a true value (1) except when both inputs are true. Don't need to implement this one - it's the building block for all the rest.

![Circuit diagram of a NAND gate](/assets/images/programming/elements/1-nand.png)

### NOT (1-bit)

|Inputs   | in |
|Outputs  | out |
|Function | If in = 0 then out = 1, else out = 0 |

![Circuit diagram of a NOT gate made from a NAND gate](/assets/images/programming/elements/1-not.png)

### AND (1-bit)

|Inputs   | a, b |
|Outputs  | out |
|Function | If a = b = 1 then out = 1, else out = 0 |

NAND is really NOT+AND, so another NAND gate will turn NAND back into AND.

![Circuit diagram of an AND gate made from two NAND gates](/assets/images/programming/elements/1-and.png)

### OR (1-bit)

|Inputs   | a, b |
|Outputs  | out |
|Function | If a = b = 0 then out = 0, else out = 1 |

Negating the two inputs before they pass through a NAND gate makes an OR gate.

![Circuit diagram of an OR gate made from three NAND gates](/assets/images/programming/elements/1-or.png)

### XOR (1-bit)

|Inputs   | a, b |
|Outputs  | out |
|Function | If a ≠ b then out = 1, else out = 0 |

XOR only outputs true when one of the inputs is true, not both.



### MUX (1-bit)

Multiplexer, can control which input passes through to the output by using a *select* input.

|Inputs   | a, b, sel |
|Outputs  | out |
|Function | If sel = 0 then out = a, else out = b |

### DMUX (1-bit)

Demultiplexer, controls which output the input passes through to.

|Inputs   | a, b |
|Outputs  | out |
|Function | If sel = 0 then { a = in, b = 0 } else { a = 0, b = in }
