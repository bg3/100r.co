---
title:      Learning C
fg:           "#111111"
bg:           "#fffff9"
link:         "#fa5c5c"
linkhover:    "#fe8268"
date:       2019-12-27
update:     2020-04-10
location:   Melbourne, Australia
---

This page is a journal of my efforts to learn C. It details the resources I used, what I learned from them and whether I would recommend them. Most recent entries are towards the bottom.

## Prior knowledge

I have tinkered with computers since I was a kid, but never became proficient in any area. I can clumsily put together HTML and CSS, I get a lot out of Excel, get something moving around in an engine like Unity and make something simple with a scripting language and a lot of Stack Overflow searches.

My programming knowledge is shallow - I know what variables and loops and functions are but not continuations or callbacks or generics. I have difficulty creating anything complex without it becoming overwhelming.

## Why C?

I had managed to cobble together a single page web application at work using HTML and JavaScript. It took some poorly formatted CSV records and validated them against a set of business rules, allowing the user to fix the errors before exporting the corrected versions in the original format. The heavy lifting was done by some libraries ([Tabulator](http://tabulator.info) and [Papa Parse](https://www.papaparse.com)) but I was still amazed that I had managed to make a complete _thing_.

I like the approachability of HTML, CSS and JavaScript. If you have a browser, you have everything you need to develop and run something. None of those three languages are fussy - if you make a mistake, you still get _something_ on the screen instead of a complete failure to launch.

So, I should carry on with that and learn JavaScript inside and out right? That was the plan - a friend sent me a link to a free Codecademy web development course he was working through and I flew through the HTML and CSS stuff and rushed through the beginner JavaScript sections. Something was nagging at me though.

I joined a game jam making HyperCard stacks on emulated Macintoshes. I managed to make something in about 10-15 hours work. It was pretty rough but the process was fun and I came away with some ideas for more things to make. I started doing some research on how I might make a software renderer in the browser.

I started with writing some matrix and vector functions, but when it came to drawing some pixels on the screen I got stuck. I couldn't get past the layers and layers that this renderer would exist on. The browser was a complex application of its own and I was using it to display a document and then hijacking a portion fo that to display a single pixel. Even thought it was (relatively) easy and approachable, it seemed so inefficient and wasteful.

This feeling had been growing over time. A year or so back I reached some sort of zenith of my need for complex technology when I bought an Apple Watch. It was too much - I was soon embarrassed to wear it and sold it a few months later.

So, why not start at the other end of things? Something portable, low-level and not built on layers and layers of abstraction. There were languages old and new I could have chosen, but I settled on C. This was largely based on feeling rather than reason, so there's not much I can say to defend it. That feeling probably came from the composting of dozens of articles and blog posts I read that mentioned C and other languages over the years.

## April 2020: Modern C

I found this book in a Hacker News [comment](https://news.ycombinator.com/item?id=22519876) and searching for some other comments indicated it was probably okay to start with. It's divided into three sections, _Acquaintance_, _Cognition_ and _Experience_, corresponding to beginner, intermediate and advanced.

If I didn't have some inkling about programming this book would be unapproachable. It's very dense and some things are not explained at all - extern and static are used and I have no idea what they do. Same with the [...] operator for areas and (...) for functions.

This is not saying it is a bad book - it seems to be vert good. The density I appreciate, because I am not having to skim and skip over filler. It is not an introductory text though.

### 10.2 Pointers and structures
I have struggled a bit with this section and will need to return to it.

This talks about destroying a struct. I know C has some memory management, have heard of malloc before. But up to and including this point it hasn't been mentioned.

```
void rat_destroy(rat* rp) {
  if (rp) *rp = (rat){ 0 };
}
```

Why was this function defined to accept rat (ratio) structs as well as pointers?
```
rat* rat_rma(rat* rp, rat x, rat y) {
  return rat_sumup(rp, rat_get_prod(x, y));
}
```

This section in one explanation also puzzled me, I couldn't work out what the second line was doing... assigning the result of toto_get somehow?
It's not doing anything. It's a declaration of a function... struct toto\* is the return type.

```
/* forward declaration of struct toto */
struct toto;
struct toto* toto_get(void);
void toto_destroy(struct toto*);
void toto_doit(struct toto*, unsigned);
```

### 10.3 Pointers and arrays
This is interesting. Pointers and arrays can be accessed interchangeably.

So these are equivalent:

```
A[i]
*(A+i)
```

And so are these:
```
A[m][n]
(*A)[n]
```

### 11.4 Function Pointers

```
typedef void atexit_function(void);
// Two equivalent definitions of the same type, which hides a pointer
typedef atexit_function* atexit_function_pointer;
typedef void (*atexit_function_pointer)(void);
// Five equivalent declarations for the same function
void atexit(void f(void));
void atexit(void (*f)(void));
void atexit(atexit_function f);
void atexit(atexit_function* f);
void atexit(atexit_function_pointer f);
```

I'm not sure what's happening here. p146.
I understand the idea, but not the syntax.

### 12.2 Unions
This is interesting. It seems simpler than the explanation, actually.

## Kilo text editor
At this point I was almost finished with the intermediate section of the book and wanted to follow along with making something. I found a tutorial on building a simple text editor, only 1000 lines of code.

[Build Your Own Text Editor](https://viewsourcecode.org/snaptoken/kilo/index.html)

The first thing I notice is that there are a lot of arcane structures, functions and flags required to work with the editor. I looked up man pages online for some of these, which gives me comfort that these are all documented _somewhere_. But the man pages are still very cryptic for me. How could I work out on my own that a particular terminal needs XYZ flag set in order to do something, whereas in Windows some additional flag must be set?

This sort of things is intimidating sometimes - it feels undiscoverable and dissuades experimentation. Too easy to get lost trying to figure out a tiny little thing that you're just supposed to know. Obviously tutorials like the one linked above explain these things, but it's back to the feeling of layers upon layers.

### 1 May 2020

I can follow along with how this program works. The tutorial is very clearly written. If I was to start on something of my own however, I don't know when and how to use all the memory allocation functions as well as many other parts of the standard libraries.

I will keep a list of some important ones to review, that I may have difficulty searching for later due to not knowing how to describe them. I will need to look back over the parts of the tutorial I have already covered.

- memmove - this is like memcpy but safe to use when src and dest arrays overlap. Why use memcpy at all then? [link](https://flak.tedunangst.com/post/memcpy-vs-memmove)
- free
- malloc

### 2 May 2020

I take another detour and start trying to write something of my own. Beginning with [Advent of Code 2015](https://adventofcode.com/2015). I complete the first day's exercises, but decide to refine the answer so it reads the data from an input file instead of a literal. First roadblock... reading from a file. Safely.

I will continue with the text editor for the moment. I notice I have been typing in some parts of the code for this editor without really thinking about how they work. I will make more of an effort to understand each part.

### 3 May 2020

```
E.cx = match - row->render;
```

"Otherwise, we loop through all the rows of the file. We use strstr() to check if query is a substring of the current row. It returns NULL if there is no match, otherwise it returns a pointer to the matching substring. To convert that into an index that we can set E.cx to, we subtract the row->render pointer from the match pointer, since match is a pointer into the row->render string."

I do not understand how this pointer subtraction works.

```
char *editorPrompt(char* prompt, void (*callback)(char*, int));
```

I've been aligning the asterisks to the left so far, but how does it work in this case? ```(* callback)```? 

## Miscellaneous notes (these will be removed or merged into sections above)

- [Ask HN: How do I learn C properly?](https://news.ycombinator.com/item?id=22519876)
- [To become a good C programmer](http://fabiensanglard.net/c/)
- [How to C in 2016](https://matt.sh/howto-c)
- [A Ray Tracer](https://www.purplealienplanet.com/node/20)
- [Elite - The New Kind source](https://github.com/fesh0r/newkind)
- [Raylib](https://www.raylib.com)
- [Expert C Programming](https://www.amazon.com.au/Expert-Programming-Peter-van-Linden/dp/0131774298)
- <https://en.cppreference.com/w/c>
- <http://buildyourownlisp.com>
- [ ] Learn how to use lldb
- [ ] https://github.com/glouw/gel/blob/master/main.c
- <https://github.com/glouw/gel/blob/master/main.c>
- <https://github.com/rby90/Project-Based-Tutorials-in-C>
- <https://viewsourcecode.org/snaptoken/kilo/05.aTextEditor.html>
