---
layout: post
title: weird bash bug
---

I'm just going to leave this here in case someone else finds themselves in this rabbit hole.  Bash can break pipes with the debug trap.  I circled around it but didn't find a fix other than "don't run external programs in the debug trap"

## context

Bash has a few special trap handlers just for the shell. One is "debug" which executes at various points.  You can see it like so:

{% highlight console %}
trap 'echo trap' debug
{% endhighlight %}

where it can print things to the shell before commands are executed.

## the bug

It appears to me that if the trap handler calls any external program--even if there is no output--then pipes are blocked at 64k.  In the example above, echo is a bash built-in and seems to not cause this behavior.  So let's use the system /bin/echo to trigger the bug:

{% highlight console %}
$ trap '/bin/echo trap' debug
$ jot -b '' 65537 | wc -l
trap
trap
{% endhighlight %}

... hangs.  If you hit Ctrl-C you'll see that `wc` got 64k of the output but blocked on that last byte.

{% highlight console %}
^C
   65536
trap
{% endhighlight %}

I got bit by this because I was calling `tput sgr0` in the debug trap.  The work around is to capture what tput outputs in a bash variable outside of the trap handler, then inside the trap handler use the builtin `printf` to send to the console.

Looked at a few things with dtruss and the system source to rule out an ioctl call, but nothing obvious jumps out as the explanation.  Let me know if you figure it out!
