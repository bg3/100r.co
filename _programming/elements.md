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

These are my notes as I work through the book. I'm sure there are much better solutions than mine to many of the problems.

## Chapter 1: Boolean Logic

The project for this chapter is to implement a series of logic gates using only NAND gates as a primitive building block (plus any other gates once you have implemented them). For this chapter, I've shown them all using the NAND gates.

I simulated these using a tool called [Logisim](http://www.cburch.com/logisim/), which is a lot of fun to tinker with. The circuit images for the gates are screenshots from Logisim.

### NAND (1-bit)

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

XOR only outputs true when one of the inputs is true, not both. This was the first tricky one for me.
I've marked in the gate functions being performed by clusters of NANDs.

![Circuit diagram of an XOR gate made from five NAND gates](/assets/images/programming/elements/1-xor.png)

### MUX (1-bit)

Multiplexer, can control which input passes through to the output by using a *select* input.

|Inputs   | a, b, sel |
|Outputs  | out |
|Function | If sel = 0 then out = a, else out = b |

![Circuit diagram of a MUX gate made from eight NAND gates](/assets/images/programming/elements/1-mux.png)

### DMUX (1-bit)

Demultiplexer, controls which output the input passes through to.

|Inputs   | in, sel |
|Outputs  | a, b |
|Function | If sel = 0 then { a = in, b = 0 } else { a = 0, b = in }

![Circuit diagram of a DMUX gate made from five NAND gates](/assets/images/programming/elements/1-dmux.png)

### Multi-bit gates

These are simply arrays of the above gates, e.g. an 8-bit OR gate applies an OR function to 8 separate pairs of input bits (a[0 to 7] and b[0 to 7]).

### Multi-way gates

For multi-way gates, the logic applies to all of the inputs at once, not separately. For example, a multi-way OR gate with 8 input bits would have a single output bit that would be true if any of the 8 input bits were true.

### Multi-way OR (8-way)

|Inputs   | in[8] |
|Outputs  | out   |
|Function | out = Or(in[0], in[1], in[2], ..., in[7]) |

Is there a version that uses less gates?

![Circuit diagram of an 8-way OR gate made from 20 NAND gates](/assets/images/programming/elements/1-8-way-or.png)

### 4-way 16-bit MUX

|Inputs   | a[16], b[16], c[16], d[16], sel[2] |
|Outputs  | out[16] |
|Function | If sel = 00 then out = a, else if sel = 01 then out = b, else if sel = 10 then out = c else if sel = 11 then out = d |

A 4-way multiplexer is essentially two multiplexers mashed together. It has two select bits: sel[0] selects between a/b and c/d. The second bit selects between the two 'winners' of the first multiplexer.

I've substituted 16-bit gates for most of this diagram to keep it comprehensible. The *extenders* are turning a 1-bit input into a 16-bit output (all bits are the same as the input).

![Circuit diagram of an 16-bit 4-way MUX gate](/assets/images/programming/elements/1-4-way-mux-16.png)

### 8-way 16-bit MUX

|Inputs   | a[16], b[16], c[16], d[16], e[16], f[16], g[16], h[16], sel[3] |
|Outputs  | out[16] |
|Function | If sel = 000 then out = a, else if sel = 001 then out = b, else if sel = 010 then out = c ... else if sel = 111 then out = h |

Have simplified the diagram for this one by showing 16-bit versions of the gates.

![Circuit diagram of an 16-bit 8-way MUX gate](/assets/images/programming/elements/1-8-way-mux-16.png)

### 4-way 1-bit DMUX

|Inputs   | in, sel[2] |
|Outputs  | a, b, c, d   |
|Function | If sel = 00 then {a = in, b = c = d = 0}, else if sel = 01 then {b = in, a = c = d = 0}, else if sel = 10 then {c = in, a = b = d = 0}, else if sel = 11 then {d = in, a = b = c = 0} |

![Circuit diagram of an 4-way DMUX gate](/assets/images/programming/elements/1-4-way-dmux.png)

### 8-way 1-bit DMUX

|Inputs   | in, sel[3] |
|Outputs  | a, b, c, d, e, f, g, h  |
|Function | If sel = 000 then {a = in, b = c = d = e = f = g = h = 0}, else if sel = 001 then {b = in, a = c = d = e = f = g = h = 0}, else if sel = 010 ... else if sel = 111 then {h = in, a = b = c = d = e = f = g = 0} |

![Circuit diagram of an 8-way DMUX gate](/assets/images/programming/elements/1-8-way-dmux.png)

## Chapter 2: Boolean Arithmetic

The project for this chapter is to implement adder chips, then use these as part of an arithmetic logic unit (ALU).

### Half-adder

My first attempt worked but was a little redundant:
![Circuit diagram of a half-adder](/assets/images/programming/elements/2-half-adder.png)

Improved:
![Circuit diagram of a half-adder](/assets/images/programming/elements/2-half-adder-v2.png)

### Full-adder

*h/a* indicates half-adders.

![Circuit diagram of a full-adder](/assets/images/programming/elements/2-full-adder.png)

### 16-bit adder

This is a chain of full adders, each passing their carry bit to the next adder.

I can't get this to work in Logisim unless I put a constant 0 bit in to the carry pin of the first full adder (see centre top of diagram).
Might come back to this.

![Circuit diagram of a 16-bit adder](/assets/images/programming/elements/2-16-bit-adder.png)

### Arithmetic logic unit (ALU)

There's a lot to explain here. This has been the most interesting exercise in the book so far.

![Circuit diagram of an ALU](/assets/images/programming/elements/2-alu.png)

## Chapter 3: Sequential Logic

### 1-bit register

The square block is a data flip flop (another fundamental piece used as a primitive for the textbook). It has a clock signal feeding into it, and outputs whatever was fed in one clock cycle ago.

Feeding its output back in means it will store the value permanently. I have added a multiplexer however, so we can choose between feeding in the currently stored value (default), or when the load bit is set, storing a new value.

![Circuit diagram of a 1-bit register](/assets/images/programming/elements/3-bit.png)

### 16-bit register

Just many 1-bit registers linked together and sharing a load bit and clock signal.

![Circuit diagram of a 16-bit register](/assets/images/programming/elements/3-register.png)

### RAM

This is 8 x 16-bit registers linked together. The address input will determine which 16-bit register is selected (by the demultiplexers) to load and to output.

![Circuit diagram of RAM](/assets/images/programming/elements/3-ram8.png)

### Program counter

![Circuit diagram of a program counter](/assets/images/programming/elements/3-counter.png)
