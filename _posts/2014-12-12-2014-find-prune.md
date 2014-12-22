---
layout: post
title: find -prune
---

`find` is a great workhorse for trundling through filesystems, but has
a ton of options and a long man page that can be hard to understand.

## -prune

Prune is weird, like a double negative, but can save lots of work.  Say you have
a Mac and a huge backup under /Volumes, how do you scan everything except that
folder?  While you're at it how do you also skip /dev, not because it is large
but because it throws errors in your search?  If you use `-not -path` like so

{% highlight console %}
$ sudo find / -not -path /Volumes\* -and -not -path /dev\*
{% endhighlight %}

you might notice like I did that it prints everything out then seems to stall
for hours, printing nothing.  Using `opensnoop` it turns out that find is still
traversing everything, and in that stall period is just busily going through
your backups in /Volumes and over and over deciding that each file matches a
path that should be skipped.

Prune tells find to stop traversing that part of the filesystem, skipping all
work under that directory.  Great, but it also reverses what you might expect
and tells find to report the thing you pruned instead of everything else.

{% highlight console %}
$ find / -prune
/

$ sudo find / -maxdepth 3 -path /Volumes -prune
/Volumes

$ sudo find / -maxdepth 3 -path /Volumes -prune -o -path /dev -prune
/dev
/Volumes
{% endhighlight %}

I added `-maxdepth 3` to the last two examples just to limit work.  Find is
only going to print the two pruned directories, but trundles everything else.
This is doing work on the correct parts of the filesystem, but is the opposite
of what we want to pass to the rest of our search.  So close!

Now use `or print` and you get everything except the pruned paths, and no work
is done in those paths.

{% highlight console %}
$ sudo find / -path /Volumes -prune -o -path /dev -prune -o -print
{% endhighlight %}
