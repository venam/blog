---
layout: post
title:  "Unix philosophy"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---

# Unix Philosophy #

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1996))


Understanding the Unix philosophy and what makes a Unix system Unixy.

A follow up on this thread: <https://nixers.net/showthread.php?tid=1985>
Let the good discussion flow, let all arguments and ideas be put down
on the table.

----

The Unix philosophy is a subject that is overly discussed.

In this episode I'm not going to go the un-original and common route of
the "yeah yeah, I'm just reading a list" type of Unix-philosophy.
I'll be revisiting the philosophy in another way.
I hope it'll bring a new approach to it.

# Intro -  An Burning Energetic And Polemic Debate

Let's start by asking a question many forget to ask when describing the
Unix philosophy.

What's philosophy?

Philosophy is a wide subject, it studies so many existential questions,
values, reason, mind, and language.

Philosophy is almost always coined with wisdom, knowledge and the path
to learn.
It's important to say that philosophy are deeply engrained in tradition
and culture, there are no philosophy that live outside of culture.

With that said, what is the Unix philosophy?
What's its culture?
What wisdom does it teach?
Where is it applied?
Why is it so vehemently debated?
And, like all culture, shouldn't it evolve to adapt?

Let's start with a disclaimer, it's so frequent to stumble or get caught
in an argument, in the online realm, concerning the Unix philosophy.

The internet like all means of communication has the drawback of dwindling
the content of what someone wants to transmit, his the ideas are reduced
to cliche, cherry picking what the person said and strawmaning their
views.

This is all because the same story has many facets and ways it can
be told.  Everyone is right in some way in their arguments.  It's just
a notion of perspectives.


# The Development Story


Philosophies gets to be named philosophies when some people lived and
adhered to those principle or norms, and that others want to recreate
it for themselves.

It's taking a zeitgeist and applying it somewhere else.

Let's start with that.

The Unix philosophy is not about Unix it's about the environment and
ideologies that revolved around it.

It's about taking the ideas the developers had during the development,
the environment they had, the approach they took to solve problems,
the things they cared about and applying them somewhere else, keeping
the same norms and concepts alive.

People like to follow philosophy because of multiple aspects, the social
adherence aspect, the consistency aspect, and because it helps in reaching
the same state of mind the ones who came up with this philosophy had.

The operating system is just the embodiment of the what the creator
thought was great, their way of life.

So, who were those devs that we want to meta or tele-communicate with,
to reach higher grounds?
What do they have to say about this philosoraptor thingy?

We're gonna talk about:

    Ken Thompson
    Dennis Ritchie
    Brian Kernighan
    Douglas McIlroy
    Rob Pike

I excuse myself for the names I don't have the time to mention.


Unix was developed in the 1970s at the Bell Labs research center.

Research centers are think tanks, colleagues work together in an open
environment that breeds new ideas.

People there are paid to be imaginative and go on tangents.

Ken Thompson is the one that created the original Unix, it was his idea
to write a new operating system.
A new operating system, yes, because at the time he was working on a
time sharing OS called Multics and he got sick of the complexity.

A bold rebellious and exciting move.

The Multics projects was also on a pinch, it was slowly but surely running
out of money. This shows how money can affect strategic decisions. (It's
quite amazing how this completely ignores that the "rebellious move"
was (kind of) enforced by the cut of funding for Multics.

(<https://www.bell-labs.com/usr/dmr/www/hist.html>)

He started from scratch with his previous experience as knowledge, probably
despising complexity and embrace simplicity and minimalism.

The ones that were working on Multics got curious.

The first to stop working on Multics and help Ken was Dennis Ritchie.
Later on joined many others such as Brian Kernighan and Douglas McIlroy.

They got illuminated by the new philosophy that Ken brought up.
Maybe because they were sick of what they had and wanted novelty, they
wanted to take back the power.

While Multics was from the beginning a commercial product Unix was just
Ken side project used only inside the lab.
It was only later on that it was commercialized.

Here's a quote from Douglas McIlroy:

> Much good came from Unix having been forced to fly under Bell Labs
> budgetary radar. Had it been richly endowed, it could not have percolated
> so fast and far, and might well have ended up a niche system like Multics.

This is a key point, they wanted to take the power and fun back, saying
"this is enough, it's non-sense, way too complex, it's piling up"

Dennis was the sort of evangelist, bringing the joy around.
At the time Unix was written in assembly and that was machine specific,
he took upon himself to write a higher level language that would simplify
everything, from porting the operating system to other architecture,
to contributing by modifying the source, to writing system utilities.

Unix was rewritten in C.

Soon people were easily able to contribute by building tools for the system.

Brian Kernighan joined in on the development to write tool, Douglas
McIlroy too, Rob Pike, amongst many others.

The multitasking, multiuser aspect of the system took its meaning.

Everyone could access everything, nothing was hidden, everything is
clear and understandable, everything is textual.

That's a human-like approach to computing.

With simplicity in mind the don't repeat yourself mentality kept ringing
hard into everyone's head.

No one wanted something that was too hard to grasp.
Everything should be understandable, self documented, simplistic.

And also, everyone wanted to contribute something unique, something that
needed to be done, not a repetition of already written tools.

The unix shell is wonderful for that matter, it has a built-in scripting
ability that let's you write programs using other programs.

But it didn't take it's power until Douglas McIlroy created the pipe in 1973.

The pipe allows to plug programs together to solve more complicated
tasks without reinventing the wheel.
Programs are plugged using text streams, because text is simple.

This is a bottom up collaborative approach.

With both of those, the don't repeat yourself and the ability to plug
programs together as premise we can deduce that it gives rise to an
environment where you want to have simple tools that do their job and
do them well.

This is less overwhelming than giant monolithic softwares, those little tools
can fit into someone's head.
Also because they are small the developer has the time to write
documentation for it.

They had time for completeness, to the level where they could even
include bug lists inside manual pages.

The system was clear, understandable, simple, self documented.
An open environment for development, research, and education.

With the entry barrier lifted, playing around with the system was easy
and it opened the door to more and more contributions.

Partly due to the modularity too, splitting problems that could be
done with a large program into multiple cooperating processes,
the so called multiprogramming or multiprocessing.

Multiprogramming is a nice name and cooperation is the keyword here.

The programmer that wants to solve a new problem only focuses on plugging
them together, focusing on an interface that is clear, transparent,
and textual.

Cooperation goes beyond the programs themselves.

Dennis Ritchie

> What we wanted to preserve was not just a good environment in which to do
> programming, but a system around which a fellowship could form. We knew
> from experience that the essence of communal computing, as supplied by
> remote-access, time-shared machines, is not just to type programs into
> a terminal instead of a keypunch, but to encourage close communication.


Until 1975 Unix stayed internal to the Bell lab until a license for the
source code was sold to the university of Illinois.

Like all softwares at the time, it was distributed with the source code.

The appeal took off from this point onward.

Especially when the code for the TCP/IP developed for UNIX was released
in the open domain in 1989.

Worldwide network of collaborative programming on Unix systems started.

Multiuser systems took a whole new meaning.


I quote Douglas McIlroy:


> The astonishingly capable little system attracted visitors like flies.
> Folks immediately saw how they could use it for their own purposes.
> Because it was cheap they could convince their management to let them
> try it.

This was the spirit of their time, a rebellious one, that wants to avoid
complexity, give power to users to change things and build new ones while
at the same time increasing communal development by making the system
understandable and human, emphasising on minimal and complete tools that
do only one thing well.


# The Commercial/Industrial And Standards Follow Up


The original was already more or less commercial or more precisely built
under a commercial setting and later sold as a commercial product.

But the initial conception of it didn't have any commercial purpose,
as in it wasn't built to please anyone or make money out of.
This was just a collateral thing.

At first it was sold really cheap, with the source, and was released
for free for universities.

As with BBSes, everyone starting from the 1970 wanted a piece of the pie,
everyone wants a share and make things commercials.

So during the late 1970s and early 1980s commercial startups started taking
advantages of the hype to make money.
There were companies such as Sequent for hardwares, HP-UX, Solaris, AIX,
and Xenix amongst others for closed source operating systems.

The closed source Unix-like OS are relatively costly and contain tools
that are specific to them, tools that might not be straight forward
to use.

However, it can be argued that a lot of those closed source operating system
brought new ideas and concepts to the table.


QNX released in 1982 is a real-time Unix-like operating system.
It brought the first commercial microkernel.

HP-UX in 1984 brought the concept of access control lists.
Bringing Access control lists

IBM AIX in 1986 brought the first journaling filesystem.

IRIX in 1988 brough another journaling filesystem called XFS and did
improvement on the X11 graphical environment.

Overall, you can really say that commercialization and money makes or
forces people to innovate, that's an incentive after all.

It's not the same setup as the early Unix.
Unix in that situation is the commercial system.


Wih all those different Unix-like OS there's a need for standards across
them, something that makes them coherent with one another.

Commercial setups bring those kind of questions.

The first of those standards is POSIX.
Portable Operating System Interface, it started in 1988 theoretically but
before 1997 there was only scattered standards.

This assured the compatibility between Unix-like operating systems.
Yes, because now we had systems that looked like the original UNIX but
that were modified.

The standard wasn't even meant for Unix but for operating systems
compatibility in general, Unix infrastructure was chosen because it was
"manufacturer-neutral".

Then in 1984 there was the open software foundation, to create open standards
to create UNIX OS.
Also in the same year, 1984, there was the X/Open Company, which was a
consortium to promote UNIX standards.
And in 1996 they merged to create the open group to manage all the standards
and certifications around UNIX.
They hold the UNIX trademark and published the Single UNIX Specification
standards.

They hold the gun to say if you are Unix or not.

And actually the only systems that are certified Single UNIX Specification
and or POSIX are all closed source:

The only true Unix are the proprietary ones:
	AIX
	HP-UX
	Inspur K-UX
	OS X
	Solaris
	z/OS

Let's conclude on this.
This is another taste to the Unix philosophy.
A stable robust operating system that is closed to stay at the top of
standards and high quality.

This is radically different than the previous one.
However, it's part of the Unix history and culture.
Culture being part of the philosophy.

Those systems are not affordable, not openly documented, have a barrier
of entry, and are not open sourced.

This is not the open environment for development, research, and education,
that is easy to grasp and cheap but a solid company product that you
can rely on.

Now this depends on your view of the matter.

The first UNIX was made under a company as a side project and then
commercialized by the company.
Commercialization happens all the time everywhere and it brings nice
features.

We also needed standards and they had a greater chance to be written
when the people are money driven.
Today, to be certified UNIX you have to pay.

Some say that:
> The difference between a certified POSIX system and a POSIX-compliant
> system is the fancy certificate.

Some say that those systems don't feel Unixy enough, that they feel stuck
and don't give the power to the user.

Some say that Unix is social first, that it's multiuser purpose must
live on and not stay enclosed, that it's code sharing ability should too.

Then let's tackle that side of the Unix culture and philosophy, the open
source movement and its critics in the Unix world.


# The Community Follow Up


Somewhere in the late 80s early 90s the computing world started to go
conservative on their source codes and openness.

Companies wanted to maximize gain and this was the only way.

Opposite movements rose up, the free software movement, and open source.

But what does it have to do with the Unix philosophy?

It has to do with the idea of community and contributions, which mostly
created the UNIX in the early days and made devs leave behind Multics
for UNIX.

It has to do with the entry barrier to the open and simple development
environment UNIX was supposed to be.

It also has to do with the fact that when we hear Unix today we most of
the time think of the BSDs and of Linux. And that they are on both sides
open source but aren't certified neither POSIX nor UNIX, but people say
they do feel Unixy.

And most importantly it has to do with this rebellious mindset that first
gave rise to UNIX, the saying that you didn't agree with the direction
things are going.

Let's discuss the story of BSDs and Linux.

In 1975 Ken Thompson the original UNIX creator gave a visit to the
Berkeley university and during his visit introduced some students to
UNIX by installing version 6 on their machines.

Ken was spreading his message of love.

Unix was distributed to universities for free, and with the source.

Soon many other universities, as in students, became interested and
contributed to their local Berkeley university based UNIX.
This was just them adding stuffs over the base Ken gave them.

It was a university network of open contributions, improvements, and
good ideas.
Sort of like the academic field with research papers.

They were all motivated by the same thing.

However this didn't last long.
Their version of Unix incorporated proprietary code from the original Unix
and they soon found themselves subject to a lawsuit.

Licenses had become very expensive, Unix was not cheap, it wasn't for
anyone to use and contribute to.

At the same time the university had created the TCP/IP networking code
and many were asking them to release it outside the AT&T code, which
was the company holding the Unix licensing and trademark.
Thus, in June 1989, Berkeley released their networking code under a
free license.

This is the advent of the close relation between the internet and Unix
and this was one of the first big rebellious open source move, just like
the move Ken made by secretly working on his own OS.

What followed was the logical thing, the BSD devs wanted to remove most of the
proprietary parts of their system and rewrite them so that they could release
them under the same license they used to release the networking code.

Soon a nearly complete free and open source system was available.

This source code is the base of the current BSDs, FreeBSD and NetBSD.

However the lawsuit continued, AT&T filled one in 1992 to stop the
distribution of that code based out of Berkeley until it was proven that
it wasn't based on the original Unix.

This was a big hit, development almost stopped for 2 years and the life of
BSD was in question.
At this time the GNU/Linux combination was brewing and it gained
attraction as a free open source Unix-like OS.


We're gonna discuss Linux now but before that let's review the BSD story.

What is there with the Unix philosophy and the BSDs.
Most of the story is analogous with the original Unix.
What BSD achieved is a superset, a higher vision of what Unix development
was supposed to be like, it's natural evolutionary stage fighting for
survival and adaptation.

Even if the code was rewritten, the spirit is still there.

However, AT&T had the full right to sue them, they owned the code base.
That's how companies work otherwise they don't make money.


Linux story is a bit different but also similar in many ways.

A university student in Finland named Linus was sick of not having
access to an operating system that was affordable and could run on
cheap machines.
He took it upon himself to write one, he tried to simulate as much as
possible a Unix environment.

On another side of the planet, a guy named Richard Stallman was rewriting
a set of tools so that he could release an open source operating system
later on, the GNU project.
Those tools were based on the Unix ones, more or less reimplementations,
all having one simple function.
He also wrote an open source C compiler.

Those projects merged and it created the GNU/Linux combination.

As I said previously, this happened during the cold period of the BSDs
and thus was attractive to many, leaving BSDs to move to GNU/Linux.

This system was truly open, free, was mostly POSIX compliant, and had
an interface that was more or less like Unix.

GNU/Linux ascension began and open source took its full meaning with
the internet becoming popular.

This became the first and biggest networked connected contribution
project, everyone could add their set of small tools to the operating
system and fix bugs they found.

What is to take of the Unix philosophy here?

BSDs was rewritten based on the original Unix while Linux was written just
with the overall perspective of what Unix is like.

This is the utmost example of how Unix simplicity.
It's so simple to grasp that someone could rewrite it entirely just with the
generic notions in mind.
The overall concepts fit into someone's head, they aren't overwhelming.

Now it remains clear that BSDs and Linux aren't the original Unix and this
raises many arguments.
Are they part of the Unix-philosophy if they aren't somehow directly
related to the code of the original authors or can the philosophy live
outside of strict codebase?
Is this diaspora really a next step of the Unix-philosophy, taking the
concept from the early days development and applying them in other places.

One thing that also needs to be mentioned is that commercial Unix operating
systems do also release open source projects and tools, they do contribute
a lot to communities.

But it's not to disagree that the notoriety of Unix wouldn't have been
what it is today if it wasn't for this open contribution movement and
how it adapted and evolved with trends.

To some, it matters what is the opinion of the original Unix developers
about this open source movement that is partly a branch of their own
programming environment.

However, those developers are human beings, they're a group and each of them
has a different opinion of the matter.


There are those that don't like how the many contributions have given rise to
the complexity they tried to avoid in the first place because they are done
by people that don't understand this issue to begin with.

Doug McIlroy

> I don't know the counts of Unix and Linux servers. I do know that my
> heart sinks whenever I look under the hood in Linux. It is has been so
> overfed by loving hands. Over 240 system calls! Gigabytes of source! A
> C compiler with a 250-page user manual (not counting the language
> definition)! A simple page turner, 'less,' has over 40 options and 60
> commands! It's proof that open-source can breed monsters just like the
> commercial pros. Miraculously, though, this monster works.


Ken Thompson

> I think the open software movement (and Linux in particular) is laudable.
> 
> I do believe that in a race, it is naive to think Linux has a hope of
> making a dent against Microsoft starting from way behind with a fraction
> of the resources and amateur labor. (I feel the same about Unix.)
> 
> I must say the Linux community is a lot nicer than the Unix community. A
> negative comment on Unix would warrent death threats. With Linux, it is
> like stirring up a nest of butterflies.


And there are others that admire how open source, and how Linux in particular
have grown.

Dennis Ritchie


> I think the Linux phenomenon is quite delightful, because it draws so
> strongly on the basis that Unix provided. Linux seems to be the among
> the healthiest of the direct Unix derivatives, though there are also
> the various BSD systems as well as the more official offerings from the
> workstation and mainframe manufacturers.
> 
> My own computational world is a strange blend of Plan 9, Windows, and
> Inferno. I very much admire Linux's growth and vigor. Occasionally,
> people ask me much the same question [about Linux], but posed in a way
> that seems to expect an answer that shows jealousy or irritation about
> Linux vs. Unix as delivered and branded by traditional companies. Not
> at all; I think of both as the continuation of ideas that were
> started by Ken and me and many others, many years ago.
> 
> I think one of the interesting things about the Linux phenomenon
> is that [Linus] has been able to keep some kind of control over
> such an amazingly extended development environment. I’m certainly
> glad that I didn’t have to develop C in public, because you get
> more suggestions than you really want. Being in this nice, small
> group, you can control that sort of thing. I honestly don’t know
> the dynamics and the details of the Linux kernel project. However,
> one of the knocks on Linux is that it is undisciplined. But I think
> probably the fairer observation is that it is amazingly disciplined,
> compared to what you would expect, given the nature of the endeavor.
> 
> I don’t really distinguish between Linux and things that are more
> or less direct descendants of Unix. I think they’re all the same at
> some level. Often, people ask me, "Do you feel jealous about Linux
> being the big thing." And the answer is no, for the same reason. I
> think they’re the same.


Brian Kernighan

> Even though the UNIX system introduces a number of innovative programs
> and techniques, no single program or idea makes it work well. Instead,
> what makes it effective is the approach to programming, a philosophy of
> using the computer. Although that philosophy can't be written down in
> a single sentence, at its heart is the idea that the power of a system
> comes more from the relationships among programs than from the programs
> themselves. Many UNIX programs do quite trivial things in isolation,
> but, combined with other programs, become general and useful tools.


> M: I'll change gears again. Unix and C were created at AT&T and
> were released under a license which at that time was virtually an
> open-source license, because AT&T had to do that: being a monopoly it
> had an agreement with the government, as far as I understand, not to
> make money out of computers. A lot of people credit this very fact,
> this liberal license, with the popularity and influence that both Unix
> and C have had. Recently Lucent has released Plan 9 under an open-source
> license. What do you think about this ``new'' phenomenon of open-source?
> 
> K: I think it's actually a good thing for the most part. The original
> Unix license was, as you say, largely done the way it was because AT&T
> was not permitted to be in any business except the telephone business, so
> they couldn't make serious money on any kind of software. Because of that
> they were forced into a very sensible decision, which was to give Unix
> away essentially for free to universities. They did sell it commercially
> for what amounted to a nuisance fee, but for universities they gave it
> away and as a result an entire generation of students and their faculty
> grew up thinking that Unix was the way that you did computing. Unix
> certainly was much more productive than commercial operating systems
> which were available at time, and because the source code came along
> with it, it was easy to see what was going on, and it was easy to make
> improvements. It built a community of people who were interested in
> it, motivated by the same things, who were able all to contribute and
> in that way work themselves up. I think that the current open-source
> movement has much of the same character. Many of the tools developed in
> open-source are based on Unix models. Linux is the obvious thing, being,
> at least on the outside, based on Unix; many of the things that come
> from the Free Software Foundation are reimplementations of standard
> tools and languages from Unix. There are of course other projects,
> arising because of some weird commercial pressure, like Mozilla, the
> Netscape code, which is now in the public domain, and to which people
> are contributing as well. I think that the open-source movement is in
> general a good thing. I am not sure that it will ever replace tailored,
> professional, rock-solid commercial products sold for profit. But what it
> might do in a lot of cases, and I think that genuinely it does do in some
> things like C compilers, is to provide a reference implementation and a
> standard that's pretty good and that other implementations have to roughly
> match or why would anybody pay for them? I think that in that sense it's
> a useful thing. As for Plan 9, I think that's too late, unfortunately. I
> think Plan 9 was a great idea and it should've been released under an
> open-source license when it was first done, eight years ago, but our
> legal guardians would not permit it. I think that they made a grievous
> mistake. The current open-source license is definitely worth having but
> it's not clear whether Plan 9, at least as a general-purpose operating
> system, will have much effect except in a relatively small niche. It
> has many things going for it which make it valuable in different areas,
> particularly where you need a small and highly portable operating system,
> but is it going to take over from Linux? Probably not.


Rob Pike

> This open source fitness is why I think you are about to see more and
> more Go around ...
> 
> 1. What is the best thing about Unix?
> A: The community.
> 
> 2. What is the worst thing about Unix?
> A: That there are so many communities.
> 
> Of course, many of us worked on open source projects before Go, and
> we naturally wanted Go to be part of that open source world. But our
> preferences are not a business justification. The business justification
> is that Go is open source because that's the only way that Go can
> succeed. We, the team that built Go within Google, knew this from day
> one. We knew that Go had to be made available to as many people as
> possible for it to succeed.
> 
> Closed languages die.
> 
> A language needs large, broad communities.



This whole Unix-like system versus original Unix derivative versus
standardizations like POSIX and UNIX versus Unix philosophy makes people
argue a lot.


# The Strict Rules And Extremists


This all has given rise to many of the arguments and extremists of today.

The core of the argument is about the entry barrier.

There's a sense of community and peer pressure.
People want to be part of a group, to blend in.

Groups are more coherent and stronger when the entry barrier is higher.

This is the equivalent of what happened with the standardization and
commercialization of Unix.

While the original Unix wanted to make the entry barrier as low as
possible, the new extremists want to make it high.

This might depend on how you interpret the Unix philosophy.

There's a quote that Dennis Ritchie said:
> Unix is simple. It just takes a genius to understand its simplicity.

This was partly ironic but some take it literally and succumb to ellitism.

They take the idea of minimalism to a fanatic and extreme way critisizing
many other pieces of software calling them "bloated" and creating their
own niche.

It can be argued that when the number of simple pieces become too large
it is harder to get a general overview of how everything falls into place.

And for this reason it might be counter intuitive.
The entry barrier is set higher because you have to learn every single
pieces to be able to use them and their number is big.

It's like a literal understanding of a religion.

People take blobs of the text and apply them word for word without
the context.

The "do one thing and do it well" quote from Douglas McIlroy for instance
is often brought up.

Which was at the time a way to say "don't repeat what others have already done,
if you want to build something new build something that does one new things
and that does it well so that others will be able to also use it and plug it
into their program without having to think twice".

However, it's interpreted as "split your program into extremely small
parts that do insignificant tasks".

The second argument you find is about the genetic fallacy, arguing that any
system that isn't directly linked to the original Unix could not be or have
any of the Unix philosophy in it.

Those movements have got something right in some way.

With their extremism they were able to extract rules or higher philosophy
concepts out of the Unix culture.
Adhering to those gives a somewhat unixy feels to anything.

# The Higher Philosophy

The concepts are the ones that are the most talked about and that I
might not even have to mention in this podcast.


> Write programs that do one thing and do it well.
> Write programs to work together.
> Write programs to handle text streams, because that is a universal interface.

Write programs with a top-bottom approach.
There's the everything is a file concept.
There's the modularity and compactness.
With that comes the cooperation between processing, piping and the likes.
There's the textuality and usual formats used, clear, concise, and transparent.
With that comes streaming, and favoring text UI before GUI, the GUI is just a wrapper over it.
There's the social aspect of code and the barrier to development.
With that comes open source and more contribution.
With that also comes the rebel hacking mindset, the internet culture.

One prevalent writing about the Unix philosophy is Eric Raymond's seventeen
rules mentioned in his "The Art of Unix Programming" book.

Those rules are:
    Rule of Modularity
    Rule of Clarity
    Rule of Composition
    Rule of Separation
    Rule of Simplicity
    Rule of Parsimony
    Rule of Transparency
    Rule of Robustness
    Rule of Representation
    Rule of Least Surprise
    Rule of Silence
    Rule of Repair
    Rule of Economy
    Rule of Generation
    Rule of Optimization
    Rule of Diversity
    Rule of Extensibility

Also Mike Gancarz from the X11 team has his own vision of the Unix philosophy:
    Small is beautiful.
    Make each program do one thing well.
    Build a prototype as soon as possible.
    Choose portability over efficiency.
    Store data in flat text files.
    Use software leverage to your advantage.
    Use shell scripts to increase leverage and portability.
    Avoid captive user interfaces.
    Make every program a filter.


As with all philosophy you can follow extreme strict rules or take the
unspoken rituals and way of life behind it.

The Rootless Root, The Unix Koans of Master Foo short stories take
this approach.
In a series of paraboles the reader slowly understands what Unix is about
and how it can live as a true philosophy.

Here's a beautiful way to put it:


> A student said to Master Foo: “We are told that the firm called Novell
> holds true dominion over Unix.”
> 
> Master Foo nodded.
> 
> The student continued, “Yet we are also told that the firm called
> OpenGroup also holds true dominion over Unix.”
> 
> Master Foo nodded.
> 
> “How can this be?” asked the student.
> 
> Master Foo replied:
> 
> “Novell indeed has dominion over the code of Unix, but the code of
> Unix is not Unix. OpenGroup indeed has dominion over the name of Unix,
> but the name of Unix is not Unix.”
> 
> “What, then, is the Unix-nature?” asked the student.
> 
> Master Foo replied:
> 
> “Not code. Not name. Not mind. Not things. Always changing, yet never
> changing.”
> 
> “The Unix-nature is simple and empty. Because it is simple and empty,
> it is more powerful than a typhoon.”
> 
> “Moving in accordance with the law of nature, it unfolds inexorably
> in the minds of programmers, assimilating designs to its own nature. All
> software that would compete with it must become like to it; empty, empty,
> profoundly empty, perfectly void, hail!”
> 
> Upon hearing this, the student was enlightened.


# Conclusion

Wars are useless It's in fact this clash of schisms within the Unix
community that makes it so heterogeneous and at the same time homogeneous
and coherent with each others.

There's a differentiation between a philosophy and a set of strict standards.

Remember that philosophy is about culture and not about extremists even
if those extremists are the ones on the front line every single time
there's an argument.

------

References:


* <https://en.wikipedia.org/wiki/Philosophy>
* <https://nixers.net/showthread.php?tid=1985 >
* <https://en.wikipedia.org/wiki/Unix_philosophy>
* <https://en.wikipedia.org/wiki/Ken_Thompson>
* <https://en.wikiquote.org/wiki/Dennis_Ritchie>
* <https://en.wikipedia.org/wiki/Douglas_McIlroy>
* <https://en.wikipedia.org/wiki/Brian_Kernighan>
* <https://en.wikipedia.org/wiki/POSIX>
* <https://en.wikipedia.org/wiki/Open_Software_Foundation>
* <https://en.wikipedia.org/wiki/X/Open>
* <https://en.wikipedia.org/wiki/The_Open_Group>
* <https://en.wikipedia.org/wiki/Single_UNIX_Specification>
* <https://en.wikipedia.org/wiki/Unix>
* <http://suckless.org/>
* <http://www.catb.org/~esr/writings/taoup/html/index.html>
* <http://www.catb.org/esr/writings/unix-koans/index.html>
