---
layout: post
title:  "Making the best CLI"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: http://podcast.nixers.net/feed/download.php?filename=nixers-podcast-2016-11-251.mp3
podcast_ogg: https://github.com/nixers-projects/podcast/blob/ogg/nixers-podcast-2016-11-25.ogg
---

Making the best CLI programs

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1893))

Unix is known for its set of small command line utilities. What are
your ideas and features for the best CLI programs. What makes a complete
utility.


-----


There's no best way... Extravagant title.

There's not one way, there are multiple ways and some are more used than
others some less used, every one of them has its advantages, some are
more frequently used, more common let's say.


-----


* Distinction - Removing the fuzziness around the title, previous recording

"""
I missed out a lot of things in my earlier version of this podcast,
and there also might have been some confusion - Partially because it was
one of the first episode and I was getting used to presenting subjects
in the form of podcasts.
"""

What's a CLI, and what exactly are we going to talk about today?

There are many ways of interfacing with a machine the most popular ones are
the text interface and the graphical interface.

Other types of interaction exist such as an audio interface (like OK
Google), tactile, etc.. There's probably one for every of the five senses.

We're discussing the command line interface which is a subset of
text interfaces. Within this subset there is yet another subset layer
containing different types of command line ui.

What's a text UI?

Text UI or text mode is an interface which only outputs text - not
surprising.

Text UI are probably the oldest and simplest type of UI that is still
alive today. It was first used on teletype printers which are sort of
like typewriters but connected to computers.

The first versions of Unix had their outputs on those teletype printers,
and thus the text ui and more precisely the command line utilities
were favored.

Unix is now well known for its set of small command line utilities,
they're inherent to unix.

What are your ideas and features for the best CLI programs. What makes
a complete utility.

What are the intricacies that make the best command line interface.

What does "best" mean?

That's what we're gonna see, the multiple definitions of best by
considering the multiple facets a command line interface should have.


-----


* Why is it so prevalent - Usability and History (Just scrapping the top)

Let's visit the reasons why we use CLI and from those premises maybe
we can deduce some things that might lead us in the direction of the
"best" CLI.

As we've said the command-line interface evolved from a need to
communicate with a machine remotely via a teleprinter.

You issue commands, exchange info, and the machine prints back the
associated computed answer.

Because of the nature of paper, everything had to be printed as text
line by line.

Soon enough, the paper was replaced by glass tty and peanuts peanuts
later we have what we have today.

CLI still remains a powerful way of communicating with a machine.

Why's that?

The most important is that it goes along with the core of unix minimalism,
it works in the most minimal environment.

It's also a transparent view on the operating system because most system
calls have symetrical command line utility associated with it.

You enter those commands in a shell or "command line interpreter".

The unix shell is known for it's ability to combine, compose, and automate
multiple commands together in a script-like fashion.

It has its advantages and that's why it prevails.

Unix is an expert-friendly system where you can easily configure
everything for your precise needs, and that's the attraction.


-----


* Unix Philosophy ( Dumb, KISS, output )

The unix philosophy percolates into the way of interfacing.

Or maybe it's just that both the way of interfacing and the unix
philosophy move along in an arms race influencing each others.

A good command line utility may want to follow the direction of the
Unix philosophy.

Bluntly put, small programs that are easy to combine with other programs.

One that does exactly what it says with no extra whistles and bells.


-----


* Flexibility: Configuration ( Again type of interaction )

A user needs to tell the program he's interfacing with exactly what
he needs.

One way to do that is through configuration.

But what should be configurable and how should the user configure it?

Unix users crave flexibility and power but at the same time want to keep
programs simple and minimal.

There's the dilemma between too much choose and configuration and not
enough, what should we keep and what should we leave out.

Before dealing with the ways you can get the configurations from let's
first lay down some simple principles that can help choose whether a
configuration option is needed or not.

First, don't make it mandatory to provide configuration for things you could
deduce without the user's interaction.

That goes as well for environment and for reasonable default values.

Auto-detection is a great way to reduce the overhead and have a clean
command line interface.

Second, don't add an option or feature or configuration that could
be done by using another command line tool, that complexity should be
deferred to the other specialized program.

Ask yourself the following questions:

Can I leave this feature out?

Why am I fattening the manual and burdening the user?

Could the program's normal behavior be changed in an innocuous way that
would make the option unnecessary?

Is this option merely cosmetic? Should I be thinking less about how to
make the user interface configurable and more about how to make it right?

Should the behavior enabled by this option be a separate program instead?

Those are the kind of things you need to have in mind when choosing the
options your command line utility will have.

But remember, it's through a series of iterations and usage that you'll find
what is superfluous and what is not.

However, once an option is added it's harder to remove it, thus start
with as few as possible.


-----


* Type of interaction ( input, output, sink, pipe, etc.. )


To understand how the user will provide the orders to a programs we need to
go over the ways a command line program can run.

There are different patterns or "type" of CLI.

One way of looking at it might be by looking at the temporality, long
running programs vs one-shot programs.

In the case of the long running program it may be better to have a
configuration file so that the cli can parse them during the run.

Also for long running program you may want to have a way to recover in
case of failure and even have a flag of verbosity so that you can tell
the user that things are currently happening.

On the other hand one-shot programs can have command line options.

But that also depends on the frequency of usage, because it maybe
be tedious to always type the same arguments for a one shot program,
especially if there are many.

You may want to provide a way to wrap them, or let the user wrap them
himself in a script.

The generic design of a CLI goes as follow:
* Gather input from somewhere
* Do something with the data
* Display result somewhere or not

Depending on where it gathers inputs, what kind of changes it makes,
and where it displays results, the name of the command line pattern
differs and also the way of using it while jamming it inside a script.

For example:

The Sink Pattern takes an input and doesn't return output, which turns it
into a dark hole when put in the middle of a series of commands separated
by pipes.


Different patterns:

- The Filter Pattern
- The Cantrip Pattern
- The Source Pattern
- The Sink Pattern
- The Compiler Pattern
- The ed pattern
- The Roguelike Pattern
- The ‘Separated Engine and Interface’ Pattern
- The CLI Server Pattern
- Language-Based Interface Patterns

The most important part of this is that everything that is input (stdin)
and output (stdout and stderr when there are errors) should be easy
parseable text and not necessarily readable output.

This goes along with the "composability" of unix programs.
Unix has that great inter-process communication.

It can be argued that 3 standard file descriptors are not enough but in
most cases they're enough.

Also, on the topic of format, just like extra configurations, once you've
chosen an input or output format it's hard to change later on.

In sum, the best CLI is composable, whichever pattern it chooses to
implement.


-----


* Command Line Options... Then how do we interact

Argument parsing, input parsing, configuration file parsing.

Do not reinvent any of those, don't surprise your users with your brand
new self-righteous wisdom, they don't need it.

Let's take the example of argument parsing:

There were no standard for command line argument parsing until the 1985
UNIFORUM conference.  AT&T released the getopt argument parsing library
which then became a standard in POSIX.

Now it's a standard and if softwares choose not to implement it they
confuse users. Which doesn't make a good CLI.

Other than getopt, there are many other libraries that adhere to the
standard and make it simple to parse arguments.

Another thing that is frequently mentioned is the number of command
line arguments. Just like we've said before in an earlier section,
you shouldn't add configurations where no configuration is necessary.

If you feel like you're adding a flag for a feature that could be a
program on its own then split it on its own.

You should limit the number of flags.

Namely, there are two standard ways of passing arguments to a program
on the command line: one-letter flags and long arguments.

The original Unix tradition uses the single letter while the GNU project
added the long ones.

You should support both and adhere to the standard.
Provide long, readable option names with short aliases.


-----


* Least surprise ( Flags, Name, etc.. )

Expectation is everything.
Don't break the expectations of the users, always refer to the least
surprise rule.

When in doubt, use the most common option.

For example, regarding command line options, they should be intuitive.
Everyone expects a -V for version or verbose, a -h for help, etc...
Those two are the most prevalent but other characters are too, -f for
file, -a for all, -o for output, those are obvious.

Same goes for program names, use mnemonic, names that are obvious and
relate to what your program does.
You should attempt to make the command name easy to remember.

This whole topic of least surprise has been repeated over and over in the
other sections but implicitly.
It's probably one of the most important part to make a great CLI.


-----


- Documentation (Everything, even bugs, signal handling) - goes along with least suprise


Another thing that users expect on Unix is documentation that comes
along with a software.


Someone might issue a -h flag and expect back a small help message.
Or sometimes just running a program without any flag.

We also expect a man page that lists everything related to the software.
From what the software does, to the ENV it uses, to error codes, to
bugs, etc..
Don't forget to mention if you log errors and where.
If you store configuration files, if you have a verbose flag, a human
readable flag to add colors to the output, etc..

We expect a README and INSTALL files coming with the software's source.

Those are all ways to tell your users how to correctly use your software.

You could also go as far as creating a webpage, IRC channel, and newsletter.

When a command line program is alive is has a community around it.

The key point is that the user should be notified of everything, you
should be transparent.

This is truly important because CLI are the main way of interfacing with
a Unix machine and without documentation the tool is useless.


-----


* Argument of completeness
* Over the edge: Small Scripting/mini language, curses, prompt - part
  of cli or not (text ui) -> GUI with scripting


There are other non-mandatory features that could, maybe, make your
CLI better. However, for some they are considered bloat.

One thing is related to the documentation. You could add, along with your
CLI, during installation, a tab completion for the shell.

zsh and fish shell offer those.

Instead of memorizing all the command line options your user can just cycle
through them and read what they do.

However, that may mean that your CLI options are not straightforward
and you may want to revisit your design.


One type of CLI we forgot to mention are the ones included inside other
softwares, such as GDB, the gnu debugger.

Like the shell, they are interactive prompt, interpreters.

They are a step above the ones mentioned above, it lives in it's own
read-interpret-print-loop.

A step even above that, a type of interface that is also based on text, is
the curses interface or roguelike ui.

It's a fancy kind of text ui in the console.

Those are not fast applications, they can't be jammed on the command
line either. And thus you have to use them only in specific scenarios.

A good case would be an installer, you use this type of UI to ask all
the configurations upfront and then, when over, execute whatever needs
to be executed.

It's also nice to have multiple kinds of UI for the same program, if they
interface the same library, make them work in a hybrid way.

Let's mention the last category, scripting languages or mini-language.

Awk, perl, ruby, sed, etc..

Those are mini-programming-languages that you can use alongside your
command line programs.

Even the shell is a programming language by itself.

> Although most users think of the shell as an interactive command
> interpreter, it is really a programming language in which each statement
> runs a command. Because it must satisfy both the interactive and
> programming aspects of command execution, it is a strange language,
> shaped as much by history as by design.

— Brian Kernighan & Rob Pike

All in all programs with command-line interfaces are generally easier
to automate via scripting.


-----


Let's conclude on a controversial note.

The main things we've mentioned in this podcast to make the "best" CLI
are related to not going against the tide and not doing the unexpected.

This may seem like an argument against innovation and I can understand that
point of view.

If we simply follow the same old mantra and keep repeating it, it seems
like we're not gonna invent anything.

Well, take the mantra and shape it gently.
Don't underestimate many many years of iterative testing.


-----


This is it for the best CLI, mixed a bit of everything


-----


Show notes/References:

- <https://en.wikipedia.org/wiki/Command-line_interface>
- <http://eng.localytics.com/exploring-cli-best-practices/>
- <http://harmful.cat-v.org/cat-v/unix_prog_design.pdf>
- <http://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments>
- <http://www.cs.pomona.edu/classes/cs181f/supp/cli.html>
- <http://julio.meroh.net/2013/09/cli-design-handling-output-messages.html>
- <http://julio.meroh.net/2013/09/cli-design-series-wrap-up.html>
- <http://www.catb.org/~esr/writings/taoup/html/ch11s07.html>
- <http://www.catb.org/~esr/writings/taoup/html/ch11s06.html>
- <http://www.catb.org/~esr/writings/taoup/html/ch10s01.html>
- <http://www.catb.org/~esr/writings/taoup/html/ch10s05.html>
- <http://www.catb.org/~esr/writings/taoup/html/ch11s04.html>
- <http://venam.nixers.net/blog/unix/2014/06/15/manpage.html>
- <http://perl6maven.com/parsing-command-line-arguments-perl6>
- <https://github.com/venam/Unix-Python-CLI-Template>
- <http://docopt.org/>
- <https://en.wikipedia.org/wiki/Getopt>

Music: <https://dexterbritain.bandcamp.com/album/creative-commons-volume-1>
