## about this repo

This is my tech blog on https://dbrinegar.github.io with posts that are mostly
notes to myself, hopefully useful to someone else too.

Design goals are: simple, readable, works on mobile, reusable, and optionally
integrates with Twitter, Github, Google Analytics, Disqus.  Uses a simple
fluid layout based on width of browser, which you can see in `js/resize.js`.

It uses the built-in Jekyll publishing system on Github, so a post is just a
Markdown file and publishing is just `git push`.  You can read more about this
feature here: https://pages.github.com/

## forking

You can have a blog like this following these steps:

* fork this repo in github, call your repo `"youraccount".github.io` to
trigger the GitHub Pages workflow
* clone your new repo to your dev environment
* edit `_config.yml`  so you aren't using my accounts
* `rm _posts/*` so you aren't publishing my posts
* `./start-server` to install tools, build the site, start a local server, open
a browser window to see the local version of the blog

License: BSD

## _config.yml

At miniumum, set author and url in the custom variables.  These show up in
the templates as `{{ site.author }}` and `{{ site.url }}` if you want to see
how things work. You can leave the optional variables empty.

```yaml
# custom, required
author: 'your name here'
url: 'https://your_account_here.github.io'

# custom, optional
email:
google_analytics_account:
github_account:
disqus_account:
twitter_account:
twitter_widget_id:
```

Please see the integration page code in `_includes/` for details on these.

## publishing with git

* `git add --all`
* `git commit -m "blog fork"`  to save your work locally
* `git push`  to go live on github.io
