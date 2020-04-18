---
title:      Learning C
fg:         "#060d13"
bg:         "#cbb4a5"
link:       "#cc4932"
linkhover:  "#a5b7b7"
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

If I didn't have some inkling about programming this book would be unapproachable. It's very dense and seems very technical.

Chapter 11 talks about destroying a struct. I know C has some memory management, have heard of malloc before. But up to and including this point it hasn't been mentioned.

## Delete a struct?
```
void rat_destroy(rat* rp) {
  if (rp) *rp = (rat){ 0 };
}
```

### 10.2 Pointers and structures
I have struggled a bit with this section and will need to return to it.

Why was this function defined to accept rat (ratio) structs as well as pointers?
```
rat* rat_rma(rat* rp, rat x, rat y) {
  return rat_sumup(rp, rat_get_prod(x, y));
}
```

This section in one explanation also puzzled me, I couldn't work out what the second line was doing... assigning the result of toto_get somehow?
It's not doing anything. It's a declaration of a function... struct toto* is the return type.

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

## Miscellaneous notes (these will be removed or merged into sections above)

- [Modern C](https://modernc.gforge.inria.fr)
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

## Compile
`cc -std=c99 -Wall hello_world.c -o hello_world`

`cc -std=c99 -Wall prompt.c -ledit -o prompt`

`cc -std=c99 -Wall parsing.c mpc.c -ledit -lm -o parsing`

-ledit and -lm are shortcuts for linking editline and maths library?
