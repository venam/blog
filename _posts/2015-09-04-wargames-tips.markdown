---
layout: post
title:  "Wargames Tips"
date:   2015-09-04
categories: programming
---


Hello fellow readers,  
In this post I'll give some tips that help me while playing
[wargames](https://en.wikipedia.org/wiki/Wargame_(hacking)) and programming
challenges.


Hacking is what got me started in the computing world.

I was mesmerized by the idea of manipulating the system for my benefits, of
having to think outside the box to find exploits, and of analysing the
flow of events.


Since constructive work was more exciting I swapped it with programming.
Building a project satisfies your sense of achievement,
finding flaws satisfies your cognitive achievement.


Months ago I've forced myself to get back into old hobbies to revive the
feelings I've inhibited. Hacking was part of the list.

As a gentle reintroduction I watched video conferences from 
[IronGeek](http://www.irongeek.com/).


Most of the talks were deceiving compared to what I could remember of them.
There used to be a sort of mysticism around the world of hacking.
Now that I have a strong background in computer science
what I watched seemed dull. In a lot of talks the speakers barely know the `why`,
they know the `how to break it`. Even so, it is a good opportunity
for comparing perspectives.


Wargames aren't about "real programming", it's not about software engineering
and creating things that matter to others.
Although, it might indirectly make you a better developer.


The mini challenges force you to adopt deep critical thinking.
They force you to stay alert, to learn new techniques and computer topics, to
be security aware.


However, remember that too much expertise turns you blind to simplicity.


>
> Leonard Mlodinow: In today's world, it seems that we make more mistakes seeing patterns that aren't there rather than missing patterns that are there. In fact, there's a great experiment on that, they put a rat in front of a red light and a green light. And the red light and the green light flash without any pattern, at random. But the green light flashes 75% of the time, and the red light flashes 25% of the time. And the rat, if it guesses correctly which is going to flash, it gets a little sugar water. So when they let the rats do this, they see after a while that the green light is flashing more than the red light and they just start guessing green, green, green, green, green every time. And they get it right 75% of the time and are happy with that.
>
>
> RH: That's what you should do.
>
>　
> Leonard Mlodinow: That's what you should do. Yeah. But people, we think we know better, right? So when they put humans in front of such an experiment, they won't do what the rat does. They've seen that it's 75% green and they'll guess a pattern. They'll go, green, green, red, green, green, green, red.They'll start spewing out these red and greens in some weird pattern that's tailored to be 75% green and 25% red, thinking that they can beat the system, just like the people here in the casino think they can. And when you do that, you end up about, I think, 60% of the time you get it right, instead of 75%. And so the humans are out performed by a rat. That's because we see patterns where there aren't any. That's just the way our minds work. Too clever by half. Or too clever by three quarters, in this case. 
>


More [here](http://www.jasonzweig.com/uploads/11.00Neuroeconomics.pdf).


This post isn't about what vulnerabilities are or how exploits work.
If you want a vague overview of all sorts of exploits watch [why the web is
broken](http://www.irongeek.com/i.php?page=videos/bsidescleveland2015/gs04-why-the-web-is-broken-bill-sempf-sempf) by Bill Sempf.

This post is about tips I've experienced and that could help you getting started.


## Tip1


> Choose the appropriate language for the task


There are multiple kinds of challenges.

Binary analysis, networking, image manipulation, cryptography, mathematics, etc..
The list is extensive.


Many tasks can't be accomplished without writing a program.
You have to decide which language to use depending on what has to be done.


The first concern is that it should be easy to prototype with.
You want to test your ideas as soon as possible, failing early is time saving.


Therefore, scripting languages have an edge in wargames.


The second concern is that the language should have the capabilities required
without a high learning curve.


Thus, languages with many modules and libraries are advantaged.


The third and last concern is that you should be comfortable using that language.


There are tricks in every languages. If you haven't been using it long enough
you'll miss them. Knowing those gives a tremendous boost.


Get to know it before using it!


Personally, I use a mix of Perl and Python.


## Tip2


> Read the documentation


A bunch of challenges are about analysing pieces of code to find a way
to exploit the software.


You might not know the language that's it's written in, you might not know
the environment that it's running on.


Or you might think you know them but you don't know them enough to see what is
going on.


Take your time to read the documentation of every function used.


In a lot of cases the exploits are logic mistakes.


As far as the environment is concerned, 99% of the time it's going to be a Unix-like
box.

If you are not at ease with the command line and the whole system hierarchy you'll have
a lot of problems in wargames.

You should know your way around.


And as time goes on you'll develop a sense for finding those logic bugs.


## Tip3


> What could possibly go wrong



> Everytime you open your application to something your users can touch,
> you open yourself to vulnerabilities.


This quote describes the thoughts I have when playing wargames.


Everything is safe until you open it to the outside world. [Haskellers](http://www.onlamp.com/2007/07/12/introduction-to-haskell-pure-functions.html) refer
to the world as "impure" and they are right about it.


The only way to exploit a program is by interacting with it. Therefore, you
should carefully analyze all the places that are manipulating the messages you
sent.


Focus on what you can access, there's no need in wasting time to find a bug
in a place that you can't even interact with. There rarely are 0-days in wargames anyway.


Finding and listing the parts of the program that are open is the most
meaningful step. It can be hidden under the hood at a sublayer of the program
hierarchy (for example, in webapps, it could be from the JS, the PHP code, the CGI,
the Apache configs, the server configs, etc..)


## Tip4


> When you don't know, you don't know


There'll come a time when you won't be able to solve a challenge.


For me it happens with hard challenges in the following categories:
Cipher, hashing, steganography, encryption, cryptography, buffer overflow or smash the stack.


What that means is that you've stumble upon a learning curve and need to dig
deeper in the subject.


Don't panic or depress, take your time and learn.


There are guys playing wargames on exotic systems they've never encountered before
such as [TempleOS](http://templeos.org/). Trials and errors are a must.


Don't give up and cheat by searching for someone else's solution.
This goes against the idea of playing wargames, this is hypocrisy.


## Tip5


> History


After exploring your possible ways in you should research if any of them has
well known security issues.


For instance you might find an open ports running an old vulnerable application.
Check [exploitdb](http://www.exploit-db.com/) for possibilities.


However, that's rarely what will happen.
It'll be about finding methods or functions that are commonly misused.
Read the do's and don'ts of those functions. How vulnerable they are and how they've
caused trouble to others.


Don't forget that this is closely related to tip 3. Only focus on what manipulates
your inputs.


## Tip6


> When in doubt use bruteforce

- Ken Thompson



The quote is ironic but there's [a lot of implication to it](http://www.catb.org/jargon/html/B/brute-force.html).


As stated earlier, testing and failing is an inherent part of wargames. Wasting time
and thoughts on assumptions is useless.


Thus, bruteforce might be your first trial.


It works well in problems where you have to rapidly pass through a list.


For instance, bruteforcing is a viable option for blind sqli.


It's still important to consider small but meaningful optimizations.

In Perl I've had quite a few issues with the speed when using the [bignum](http://perldoc.perl.org/bignum.html)
module, a 50% slowdown.


There also was that weird problem where a very smart way could reduce a list of
1 million items to 80 thousands but was slower than passing through the whole
1 million after changing the algorithm to use operations that are built in the CPU ALU (In
this case it was the modulo operator).


If bruteforce doesn't work you can fall back to your algorithm and graph
theory books.


NB: If you are using Perl and don't know about [Memoize](http://perldoc.perl.org/Memoize.html) then it's time to. It's the magic for optimizing recursive functions that only depends on their parameters. It was written by the author of the
["Higher-Order Perl"](http://hop.perl.plover.com/) book (which is great by the ways).


## Tip7


> Don't reinvent the wheel


There are a lot of tools that can help you.

From the HTTP request manipulation tools, to the binary debuggers.


Don't rewrite them.


Same goes for libraries and modules, they were written to save you time.


Perl has CPAN and it has everything you think of.

If you can find a module that does what you need, use it. The author probably
thought about optimizing and debugging it in ways you would never think of.


I was doing challenges with primes. I first thought about generating
them using the fastest algorithm I found. Then, because it was too slow,
I thought about downloading a huge list of primes. Then, because it
was still too slow, I researched about clever and faster algorithm. All and all until I
found about a bunch of approximation algorithms to verify if a number is a prime.

...and then I searched on CPAN for a module
[Math::Prime::Util::GMP](https://metacpan.org/pod/Math::Prime::Util::GMP)
that does all the hard work for me.


What tools you could use:

* Browser addons
* Web request interceptors/manipulators
* CLI programs such as cURL, netcat, telnet, resolveip, whois, sqlmap, nmap, xxd, strace, etc..
* Your programming language libraries


## Tip8


> Build your own little helpers


As time pass by you'll notice patterns between challenges.

You don't want to rewrite all the standard things.
When solving challenges you can take notes of important parts and store snippets
that could be useful later.


For example, I need to login everytime I want to take inputs and submit answers to
challenges so I've written a wrapper for it.


You should reach a point where you can combine your mini-notes to
create specific solutions in minutes.


Automating and minimizing the time of exploit reconnaissance should be your goal.


# Conclusion


I'm no expert in wargames but I'm sure those tips will help.

If you are interested, you can play on [wechall](http://www.wechall.net/).
