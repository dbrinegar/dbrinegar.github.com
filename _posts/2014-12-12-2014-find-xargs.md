---
layout: post
title: find -print0 | xargs -0
---

`find` is a great workhorse for trundling through filesystems, but has
a ton of options and a long man page that can be hard to understand.

## -print0 | xargs -0

Stdout is great for eyeballing find output, but can be complicated to parse if
the filenames have spaces in them.  For robust parsing of output, I use -print0
and pipe find output to `xargs -0`.  This way the receiver will get one file
per parameter regardless of having spaces in a file name.

Example where I want full path of files which have an invalid user, which has
become a common Mac OSX upgrade task:

{% highlight console %}
$ sudo find / -path /Volumes -prune -o -path /dev -prune \
    -o -nouser -print0 | sudo xargs -0 ls -ld
{% endhighlight %}

## tips

### xargs is almost cross-platform compatible

xargs on BSD (like your Mac) and GNU (like in Linux) don't have the same flags
and don't always follow the same spec.  For example, GNU xargs will always call
the worker command even if there is no work to do:

{% highlight console %}
$ echo "" | xargs echo what
{% endhighlight %}

That will run `echo what` on Linux distros, but not on BSD.  You should be able
to solve this particular one with the `xargs -r` flag, which tells GNU xargs to
not run if input is empty.  That flag is also quietly ignored by BSD xargs.

### sudo goes on the outside

If you run `xargs sudo` with sudo on the inside, then you get a poor side
effect with `ARG_MAX` and cannot run anything with input larger than `ARG_MAX /
2`.  xargs normally looks at `ARG_MAX`, subtracts the size of the current
environment, takes off a little 4k buffer in case the called program allocates
some environment variables, then uses the rest of the system capacity to pass
arguments.  The problem with sudo is that it sets an environment variable to
`$SUDO_COMMAND` and blows up this assumption that the program won't need more
than 4k of new environment space, as that huge list of arguments is now copied
to sudo's environment.  It all works fine if you `sudo xargs` instead.
