---
title: C reading list
fg: "#9999aa"
bg: "#fcfcfc"
link: "#6682FE"
linkhover: "#fe8268"
date: 2019-12-27
---

- <https://en.cppreference.com/w/c>
- <http://buildyourownlisp.com/chapter8_error_handling>
- [ ] Learn how to use lldb

## Compile
`cc -std=c99 -Wall hello_world.c -o hello_world`

`cc -std=c99 -Wall prompt.c -ledit -o prompt`

`cc -std=c99 -Wall parsing.c mpc.c -ledit -lm -o parsing`

-ledit and -lm are shortcuts for linking editline and maths library?
