---
layout: post
title:  "Green on black?"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---


# Why the green on black colorscheme?

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2075))


# Intro #


This episode is more or less offtopic but relates to changes we're going
to do on the forums.

The topic is: Green on black colorschemes and terminal themes.

We see those rather often around the Unix world. It's probably one
of the thing the average person thinks about when they hear the term
"Unix system".

Why are we using those? Where did that took off and is it really proven
that they give less eye strain?

After listening to the episode you can expand the topic on the forums
so that we can create a new forums theme.


## Where does it come from ##


The idea of green text on black background comes from the "Green screens"
aka monochrome monitors.

It was nicknamed Green screen even though the monochrome monitor came
in many other different colors other than green.

A monochrome monitor is a monitor that only has one color, as the name
implies.

It was used before color screens were invented in the early days of
computing, from 60s till the 80s, as a successor to the teletype terminal,
which was a typewriter, with papers connected to a machine.

The technology used to display colors on the screen was a cathode ray
tube with phosphor as the luminescent substance to create a glow.

The cathode ray tube was actually invented way back in 1897 by Karl
Ferdinand Braun.

Depending on the different type of phosphor used the glow is of a
different color.

For example phosphor P1 gives a green glow, P3 an amber glow, and P4 a
white glow.

Some of those displays could even change the intensity of the glow
creating more depth.

However it wasn't too popular because of how much more memory it used
and consequently how costly it was.

At this point some claimed, with no basis to support it, that amber
phosphor was more ergonomic and reduced eye strain. It was probably a
marketing/public relation move to promote selling amber phosphor screens
because it was produce and cost a bit more.

I don't have the exact prices, just a guess.

Monochrome monitors were widely used on almost all dumb terminals and
text applications because of its reputation for sharp an readable text,
even after color display first appeared.

The reason was that monochrome monitors, unlike color CRT and today's
LCD displays, use pixel for pixel precision.

On an LCD screen for example, a pixel is composed of 3 subpixels,
usually red green and blue. On monochrome displays there's no subdivision
of pixels.

Still we didn't answer why green was the most used phosphor. The reason
is simple, green was the most cost effective, it was cheaper. And so it
was used everywhere, from oscilloscopes to radars.

What about televisions you might ask, they also were black and white and
used the same technology. Why didn't we have black and white monitors
instead of green on black?

Again the answer is that it wasn't cost effective.

TVs simply take a signal and display it while computers have to create
a representation of binary code on the screen.

The computers of the early 60s didn't have video cards nor the processing
power to do display and process at the same time.

This all changed once the processing power increased and primitive video
cards were created. The role of a video card being to turn instructions
into graphical points on the screen.

There's another reason why green was the preferred phosphor color chosen
and it has to do with screen refresh rate.

A monitor has to keep track of changes and refresh the output of the
screen every once in a while. The rate of this cycle is measured in Hertz.

In the 60s the max rate was around 30-40Hz, which is pretty low. Today
we usually have a refresh rate of around 60Hz.

A low refresh rates means you would notice the screen flickering.

To counter this engineers abused how the brain perceives motions as
continuous creating a sort of hollow effect.

A sort of afterglow effect.

The technical term was called persistence time, that is how long the
glow of the phosphor persists before giving off.

Different phosphors have different persistence time. And as you would
guess now, the green phosphor had the longest persistence time, amber
phosphor also have a long persistence time.

However high intensity phosphor glow may burn/discolor the monitor,
this is where the name screensaver stems from.

There was a need for a program to avoid burning the screen.

You can also notice sometimes that the glow stays a bit after the screen
has been turned off creating a ghosting effect.

So in the end this is all about money. Companies such as IBM and DEC
opted for green and amber screens to save production costs.


## Why did it took off ##


So why did the green screen display persist in our culture, why do
programmers still use this sort of colorscheme?

The answer is unclear.

It's all probably a sign of cultural heritage, it's iconic.

Hollywood uses uses it in many movies for its archaic mysticism and how
tied it is to the early computer world.

In hacking movies it's used as a meme of the super nerdy character that
has super hacking powers. It's a way to frighten the average person with
what is unknown to them.

But there's more to it.

The afterglow, ghosting effect of terminal is also iconic.

The way the screen stays briefly visible when you cut its power source is
an attractive eye-catching visual used in many movies such as The Matrix
when the green text moves along the screen and in "Ghost in the Shell".

It's part of the pop culture even though the ghosting effect is now
obsolete. It's now attached to the idea of futuristic computer generated
text.


## Programming world ##


So what about programmers, they certainly know better than Hollywood cliches.

Well, also in the world of programming there's a sort of epic look at
days where we had sharp crisp text on a glowing green on black screen.

I don't know how the idea emerged then that green on black was better
for programming and for working longer hours.

Most of the reports are anecdotal.

We often hear:

> I feel it greatly eases the stress on my eyes after long hours of
> coding. 99% white screen on a bright monitor is asking for a headache.

While for the most part it seems like personal preferences that is
created by a cultural background.

For instance someone might venerate the old unix days or the DOS days ,
or they might think it's cool to use a dark background, or it might have
been the default they used for a certain editor or software and they
got used to it, or simply because they find it artistically appealing.

Most claims that they use their current colorscheme because of the
contrast it creates.

Colors truly are important in the terminal.

But do all this talk hold up against empirical facts?


## Does it hold up together ##


Everyone has a different sensibility to colors and so things might
differ but isn't there a base we can test the dark colorscheme hypothesis
against?

Road signs are white on blue or faint yellow on blue to make it easier
for drivers to read.

Text on paper is dark on a light background.

Should we emulate the paper experience and have pitch black on white?

Well paper isn't white white and black.

What does the science of readability say?

Many studies where conducted and concluded that people read faster and
more accurately when the text was dark on white.

But more studies confirmed that this was due to the surrounding environment.

This is all reflected in how brightness and contrast are perceived by
the person.

During the day, green on black is very contrasted with the light in the
environment. Every time you look at the screen your iris has to refocus,
not knowing if it should expand to let more light in because its dark
or contract because the glow is too bright.

This gives rise to horrific eyestrain and headaches and muscle ache when
squinting too much.

It's the contrast between the screen and the environment that is
important, it should be as small as possible.

And the contrasts for the colors on the screen itself is good but not
too much for the same exact reasons.

So in the end, surprisingly, white backgrounds work well in well lit
rooms while dark backgrounds work better at late hours in the darkness.

None of them is better than the other.


## My personal opinion ###


I'd like to push an idea here.

Reading slower isn't necessarily something negative.

Actually, it has been shown that whatever the colorscheme, reading on
screen is always slower and less accurate than reading on paper.

One thing we need to take in consideration is that some studies have
found that making the text harder to read on paper made the participants
have a higher rate of successfully answering questions.

It incited more thinking, more decision making, more remembering.

This was induced because of the forced focus.

So maybe that helps.

Nevertheless, looking at anything for an extended period of time increases
strains and headaches.


## Changing the theme of the forums ##


And so that brings up the topic of the forums colorscheme or any terminal
colorscheme.

There are some good graphic design theory on how to make dark themes such
as adding more space for readability to reduce the strain and using the
right amount of contrast.

Everything rotates around making it less cluttered and eye straining.

I'm not sure what we'll work on but I'm open to ideas.

It would be fun to add some twist to the theme and make it automatically
switch between a light version during the day and darker one at night.

Well, that's it, it was all for this episode.

It was a last minute idea so that I could postpone the preparation of
a bigger topic to next week.

I hope it got you thinking a bit and that you're going to help with the
forums theme creation.

Cheers.

-----

Music: <https://commons.wikimedia.org/wiki/File:Drozerix_-_Girl_From_Mars.wav>

-----

- <http://www.bunkerofdoom.com/tubes/crt/crt_phosphor_research.pdf>
- <https://en.wikipedia.org/wiki/Monochrome_monitor>
- <http://www.paclink.com/~ascott/why.htm>
- <https://en.wikipedia.org/wiki/Computer_terminal>
- <https://superuser.com/questions/49633/what-are-healthy-color-settings-for-a-terminal-window>
- <https://wynnnetherland.com/journal/a-stylesheet-author-s-guide-to-terminal-colors/>
- <https://community.spiceworks.com/topic/1051795-the-computer-screen-of-the-future-was-once-green>
- <https://blog.tatham.oddie.com.au/2008/10/13/why-light-text-on-dark-background-is-a-bad-idea/>
- <http://gizmodo.com/the-surprising-reason-computer-screens-arent-green-on-b-1643025374>
- <https://www.quora.com/What-is-the-best-font-color-for-text-on-a-grey-background-screen/answer/Oliver-Hoffmann-5>
- <https://hbr.org/2012/03/hard-to-read-fonts-promote-better-recall>
- <https://digest.bps.org.uk/2010/12/17/harder-to-read-fonts-boost-student-learning/>
- <https://www.ischool.utexas.edu/~adillon/Journals/Reading.htm>
- <http://www.webdesignerdepot.com/2009/08/the-dos-and-donts-of-dark-web-design/>
- <http://softwareengineering.stackexchange.com/questions/230115/why-are-dark-color-schemes-in-editors-so-popular>
- <https://science.slashdot.org/story/08/04/08/2213222/what-font-color-is-best-for-eyes>
- <http://stackoverflow.com/questions/2985174/programming-with-white-text-on-black-background>
