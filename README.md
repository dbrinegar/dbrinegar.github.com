## about this repo

This is my tech blog on https://dbrinegar.github.io with posts that are mostly
notes to myself, but written in a style that might be useful to someone else
one day.  I find that writing in public is good exercise.

Design goals are: simple, readable, works on mobile, and optionally integrates
with Twitter, Github, Google Analytics, Disqus.  It uses the built-in Jekyll
publishing system on Github, so a post is just a Markdown file and publishing
is just `git push`.  You can read more about this feature here:
https://pages.github.com/

## forking

If you want a quick-n-dirty blog for similar reasons you should be able to
follow these steps:

* fork this repo in github, call your repo `"youraccount".github.io` to
trigger the GitHub Pages workflow
* clone your new repo to your dev environment
* edit `_config.yml`  so you aren't using my accounts
* `rm _posts/*` so you aren't publishing my posts
* `./start-server` to install tools, build the site, start a local server, open
a browser window to see the blog
* `git add --all`
* `git commit -m "blog fork"`  to save your work locally
* `git push`  to go live

