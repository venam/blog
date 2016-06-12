---
layout: post
title:  "Current Projects"
date:   2016-02-28
categories: programming
---

Hello fellow readers,
This post is about the recent projects I've been working on and planning.

### GF Birthday Gift###

I don't like material gifts, they are throwaway and normally shitty.  


I prefer the minimalist way.


For my girlfriend's birthday I thought I would give her a memorable and pleasant
experience. The "Wows" are better than the most pricey objects.

I sat down and designed a little story on paper.

I then gave it live.

I used a library called [d3js](http://d3js.org/) that specializes in animating data.

The hardest part of the project, or so I thought, was the hand writing simulation.

I wrote her name on paper in an elegant manner, scanned it, fired inkscape
and redrew it with vector graphics. Then I wondered how I would make it draw it step by step.

I noticed that you can choose where the svg path drawing starts and ends, 
adding that feature with d3js transition it creates the writing effect.

The end result is sweet and she loved it.  

[Here](http://venam.nixers.net/a_gift) it is. The source code is also on Github.


### JS Encryption###

Someone requested that I create a one of a kind javascript obfuscation.

I replied that it was useless because the code runs on the client side but he insisted.

I made a research and found techniques that are not used in normal obfuscator.

You can check some of the things on [GH](https://github.com/venam/JS-Encrypt).
Mixing the techniques will give pretty good results, but again, this is useless.


### Socks Rotator###

I have a bunch of servers laying around... A lot of them.  
Some are just jump points, others are VPS, microwaves, or home machines.

I wanted to use them as a private network that auto rotates proxies in a round robin fashion.

The problems were the following:

* I couldn't upload my ssh key on them.
* The connection to the host could hang at any moment and I should re-establish it automatically.
* The pre-made solutions for that all use key-based authentication.
* Haproxy, which I wanted to use for the roundrobin entry point does not support socks5 proxy (which are created with the ssh connection).

Hopefully I solved all those issues.

Here's a schema of what this is about:

![proxy network]({{site.baseurl}}/assets/proxy_network.jpg)

I used the program `delegate` to tunnel the socks5 to http proxy.

You can find the code on [GH](https://github.com/venam/SSH-Tunnel-Password-Based-Auto-Reconnect)


### Telnet Transference###

How to upload a binary on many small embedded devices that have
busybox installed and nothing else.

The connection to them is done via telnet.

No wget, scp, netcat, or other installed on those hosts.

I couldn't find an answer to that question and so made my own.

The idea is simple: Use a program that you are sure is installed on any
machine: `echo`.

`echo` has the `-e` flag which interprets escape characters.   
I converted the binary to shellcode (such as `\x1A`) and then let the hosts echo
that data into a file. The file would then contain the binary.

However, the hosts have a limit of characters that can be transfered at the same time.
I had to split the programs into chunks, the shellcode was too big.(30KB binary -> 300KB shellcode)

Another issue was that the hosts couldn't handle the large amount of decoding requests.
Adding a delay between the transfers fixed that.

It works, that's not bad.
[Check it out!](https://github.com/venam/Telnet-Transference)


### Reddit Unixporn Theme###
There's a [contest](https://www.reddit.com/r/unixporn/comments/43g60f/its_finally_here_announcing_the_unixporn_css/) running on /r/unixporn subreddit.

I'm participating, here's my [entry](https://www.reddit.com/r/unixporn/comments/43g60f/its_finally_here_announcing_the_unixporn_css/czs0zo4), and this is what it looks like:


![reddit theme]({{site.baseurl}}/assets/reddit_theme.png)

My goal was to make it look like a window manager.

Along the way I learned new CSS3 tricks and hacks.


The best css minifying I've found is [cssnano](http://cssnano.co/).

The next step is to write a script that can change the "fake-terminal" colors to match the X11 terminal colors of the user.


### Blog Sections Designs###

I redesigned my whole blog.


I normally start on paper, here's the artsy page:
![Art Section design]({{site.baseurl}}/assets/art_section.jpg)

The quotes section was designed by my girlfriend and the upcoming "ascii-arts and
screenshots" section will also be designed by her.


### Secret projects NB 0, 1, 2, & 3###

Those are projects I can't mention directly.

I'll just talk about the nice things I've learned.

For one project I've done automations using phantomjs.

It's frustrating to use, the blackbox where you execute javascript from javascript is hell.
... Callbacks never end.  
The external factors in a real browser are endless, you can never know what is going to happen.


In another project I've used postgresql to make some flexible queries to more than 4 millions rows of data. It takes a lot of time to fill that database. That same project is using my socks rotator.


In Project number 2 I've created a website where you control access to images that are outside of the webroot and distributed from php.
Those images are watermarked using imagemagick.


The next project web-interface was built using reactjs.
It's ironic how components are available online but not as web-components. I've struggled with node for a while then gave up and wrote my own thing.  

This makes you wonder why javascript fan-boys keep rewriting their own libraries.


In the last project I've used low level sockets in C.
This was less of a hassle than to work with node.
However, I've found a library that wrapped the manipulation and it was even easier to implement.


### EP Project###

The Evolutionary Psychology simplified explanation of life project...  

I have been working on this project since the beginning of last year.
It's a huge project that I believe will contribute to the world.

We're still half way through filtering, organising, and linking the large amount of notes
I've taken from multiple researches on Evolutionary Psychology.

I've also chosen the way I'm going to represent the information, it's going to be
an explorable explanation.


### A Message I want To Transmit###

This project is actually my upcoming post. A post that was suppose to come before this one.

However I got an idea while taking a poop (I get ideas while taking dumps).

I'm gonna turn it into an explorable explanation test-bed to see if people can learn from it.

This should be done in a week or two as I just got the idea. (very fresh :D !)

### Ascii Art Projects###

This isn't really a programming-related project but I started to research about it.

I'm gonna learn new ascii-arts techniques with [the nixers](https://nixers.net/showthread.php?tid=1849)!
That's also related to the upcoming ascii-art section.

### Gantt Chart For Planning###
I need a software to plan the relaunch of the podcast.  
This project is not started yet either.


----


That's about it...  
If you have any inquiry hit me up and I'll be glad to reply.
