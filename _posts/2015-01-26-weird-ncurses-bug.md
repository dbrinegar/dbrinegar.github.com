---
layout: post
title: weird ncurses bug
---

# ncurses breaks pipes

I'm just going to leave this here in case someone else finds themselves in this rabbit hole.

Do this on a Mac running the default Bash:

```
trap 'tput -V' debug
jot -b '' 65537 | wc -l
```

It hangs, yay a super weird bug! You have to hit Ctl-C and you'll see it got to 65536:

```
$ trap 'tput -V' DEBUG
ncurses 5.7.20081102
$ jot -b '' 65537 | wc -l
ncurses 5.7.20081102
ncurses 5.7.20081102
^C
   65536
ncurses 5.7.20081102
$ 
```

You can replace `tput -V` with any ncurses program, like tic or toe, and they don't have to do anything but run and exit, as far as I can tell.  Any invocation of any ncurses program in the bash debug trap handler will cause pipes to stall at 64k.

Source is here: <http://www.opensource.apple.com/source/ncurses/ncurses-44/ncurses/progs/>

The work around is to: not invoke any ncurses programs in the bash debug trap handler.  Catch tput output outside of the trap handler and printf or echo it inside the handler, and it'll be fine.
