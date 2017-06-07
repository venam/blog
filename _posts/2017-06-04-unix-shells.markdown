---
layout: post
title:  "Shells"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---


# Unix Shells

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2047))


# What is it, why?


What's a shell, what does it do, why would we need that?

A shell is a program that acts as an intermediary between the user and
the operating system, the kernel.

It lets you execute commands on a computer.

Specifically, on Unix, the shell is a command-line interface, a prompt
that waits for commands entered by the user, interpret and execute them,
and when its done, prompts again for a new command.

It stays in this state that we call REPL, read evaluate print loop,
or interpreter.

All that while hiding the details of how it did it.

But it's not limited to being on the command line, on some other OS the
shell could be graphical.

So that is its primary function, to execute commands, but it offers other
services, as we'll see.

The name and concept of "shell" originate from the Multics operating
system, Unix predecessor (inspirator), it was coined by Louis Pouzin in 1964. The
name embodies what it's about, putting a fancy shell around the kernel
of the OS for interfacing with it without risks.
Or, taking the term metaphorically, the shell symbolizes authority,
speech, and hearing. Which goes well with its initial usage in
Multics. The shell worked in tandem with a listener which job was to
take user inputs, while the shell processed them afterwards.  On Unix,
the shell does both - Taking inputs and processing them.

What else does it provide?


# Language & Architecture


So we said that a shell let the user insert commands.
Let's mention that those commands can be in the form of text scripts so
that the execution becomes more automated.

The shell is a programming language in itself.
Having everything from variables, loops or iterations, statements,
and condition-testing, control structures.

More like a specialized, domain-specific, interactive scripting language
that implements a model to facilitate interfacing and controling the
operating-system.

On some other systems the shell scripts themselves as a language have
only been used in startup scripts or automating of essential functions
like networking and never seen by users themselves.

So the shell has some keywords that aren't external programs but
built-in it.

The "variables" can hold the usual data or can contain commands, acting
as placeholders.

And because the unit of the Unix system is the file it certainly has
file interaction facilities.

Redirection, filename wildcarding, piping, and here documents come to mind.

- Redirection of output

- Wildcarding used to expand the name of files and match many.

- Piping to send the output of one program as an input to another.

- Here docs to create on the fly an input stream.

All of today's shells have those, yes, there are many shells and that's the
minimum that they all provide.

Again, the shell executes the commands, those can be built inside the
shell or be the name of an executable on your system.

And thus it has to know where the executables are stored on your system.
It has to know about the "environment", it's running on.

That's why shells hold some sort of constant variables called environment
variables.

When the command finishes being executed by the shell its status is held
inside the status variable.

And the location of the executables variable we mentioned before is
stored in one of them, PATH.

You can listen to the podcast about environment variables.
( <https://nixers.net/showthread.php?tid=1936> )


# Environment


The word environment is tied with the shell, it's a filter bubbled world
where you execute commands.

Apart from environment variables the shell can override with its built-in
commands the executables that are found on your system.

For example, it may have it's own version of the pwd command which
doesn't reflect reality.

Shells also often build up their environment by reading multiple
configuration files at different point in time and multiple
circumpstances.

Environment in the meaning of environment variables, of configuration
for the system, and customization of the shell behavior.

There's a link in the show notes documenting which shells reads which
files at which point.

The key is that those files are often "executed" by the shell and thus
whatever script is there will be activated.

Environment also means that things are happening in the shell, someone
is working in this environment.

That's why many shells have multitasking in mind adding features for
managing and controling jobs and running processes.

All this to contribute in making the shell a nice working environment.


# What does it look like?


So as we said the user enters commands at the shell prompt, the shell
evaluates the command, makes substitutions for variables and aliases by
the value they represent, and then runs the command.

Usually it looks like that:

You are presented by the prompt, this can be whatever, from one character
to many, and the prompt can change shape depending on the situation like
for instance showing the directory you are currently in.

So let's say the prompt is a semi-colon.
Everytime you see that semi-colon you know that it's your turn to enter
a command.

You type a command followed by it's arguments/options separated by spaces
and you can add redirection, piping, etc..

Then you press Return/Enter and the command line gets processed by the shell.

That's the general look of it.

```
Prompt command-name argument1 argument2 >file-name
; ls -lah
```

The shell will then interpret what you've entered, maybe it'll start a
child process or detached process as needed.

It moves input and output as defined by piping or redirection, everything
is pipelined and..

When the command is done the exit status is kept in an environment
variable of the shell.

And it presents back the semi-colon prompt.

Now let's go through some of the history of Unix shells.


# History?


As we've said, the concept of shell originated from the Multics
operating system in 1964 which Unix was Unix "predecessor", or more
precisely inspired it, as the guys working on Unix were working on
Multics before Unix.  Unix developement starting around 1969 same year
as Multics was released.

But then what?

It certainly got inspired by the Multics shell.
And the Multics shell was based on the RUNCOM program of Louis pouzin,
remember, the dude who coined the term "shell" in 1964. And that's where
the rc for configuration files comes from.

It goes without saying that the first shell was written by on of the
Unix authors. The Thompson shell, the first Unix shell was written by
Ken Thompson at Bell Labs for the V1 until V6 of Unix, starting from
1971 until 1975.

It was rudimentary and had the basic features, piping, redirection,
simple control structures, goto, sequential commands, asynchronous
commands, and filename wildcarding.

globbing was implemented as an external utility.

What the Thompson shell lacked was the ability to script. Its sole
purpose was as an interactive shell (command interpreter) to invoke
commands and view results.

Today it's not in use anymore but the source code can still be found on
the internet.

So what's next after 1975?

Remember that UNIX was completely re-written in C in 1972 and so there
was a need for more practicality.

Between 1975 and 1977, the Mashy shell added upon the Thompson shell some
new features like shell variables (precursor to environment variables), a
search path mechanism which would later evolve into the $PATH environment
variable, interrupt-handlers, and more extended control structures.

Now after 1977 comes the most well known and influential type of shell
that we know today, the Bourne shell created by Stephen Bourne at AT&T
for V7 UNIX.

So just remember that from V1 till V6 UNIX used the Thompson shell only.

Stephen Bourne was also working on the ALGOL68 compiler and thus the
grammar/syntax of the Bourne is very inspired by it.  The source of the
Bourne shell, even though it's in C has an ALGOL68 flavor.

The Bourne shell excelled at scripting, it added what the Thompson shell was
missing, the language was way more functional.

Apart from the added control flow it added more support for signal handling,
command substitution using backticks, and HERE docs.

However it lacked the ability to create functions and had another one major
drawback, it lacked real interactivity with the user.

And thus there was a gap for something even better.

A guy at the University of Berkeley, Bill Joy, started working on a new
shell they called the C-shell and inserted several new concepts in it
which were completely new at the time.

They added job control, aliasing, and made the shell more interactive
for the user by adding history and malleability.

However, they went for a different syntax type more inspired by the C
language, that's where the name comes from.

And thus, scripts written for the C-shell are not compatible with the
Bourne-shell.

Moreover, the interpreter was badly implemented and buggy. There are
many horror stories related to C-shell scripts.

And thus, everybody stayed with the Bourne-shell and instead considered
adding the best features of the C-shell to the Bourne-shell.

Some people wanted to fix those bugs and created a new shell called
TENEX-shell which was a superset of the C-shell.

But still the Bourne shell prevailed.

And the next big guy who did in fact incorporate the features of the C-shell
into a Bourne-like shell was David Korn with his Korn-shell.

Korn shell became part of the System V but had the drawback of being
proprietary, held by AT&T and it wasn't until in the recent years that
it got released as open source in 2000.

This all happened in the 1980s more precisely 1983.

Around the same time in 1984 started the "open software foundation",
which goal was to create open standards to create UNIX OS, it was the
predesessor to POSIX.

Those guys chose the Bourne Shell type of syntax as a standard for
Unix-like systems and that delt the last blow to the C-shells.

Then you know the story, many others went on.

But the BSDs still cling to the C-shells.

The GNU project created its own version, the Bourne again shell, Bash
which was adopted by Linux, that's in 1989.

And then a panoply of other shells started appearing everywhere with
the expansion of the internet.

Nowadays there are many exotic shells all with different features.

But the Bourne shell remains the most important and historic shell.

So, which shell should you use, what are the differences in today's
shells?


# Differences and portability?


OK, there are now tons of shells.
What are their differences, why should you even change your default shell?

Apart from the obvious schism between C-shells and Bourne-shells, which most
shells descend from, there are only minor, gaudy, and fancy differences.


The differences can fall in one of the following categories:

* Syntax additions/grammar changes in the language/built-in commands
* Customizability/Scriptability/Flexibility
* Interactivity/User-friendliness
* Exotic features


A new shell may be lighter, faster to process scripts, have some new
additions to the language, be based on Bourne, added new customizability,
great interactivity with the user, prefetch directories, save up memory,
etc..

That's the sort of differences we're talking about.

Let's go over some shell very common shell names without giving details.
You can find the details in a wikipedia article that I linked in the
show notes, it compares most shells.

* Thompson shell aka V6 shell
* Bourne shell
* POSIX shell
* csh
* tcsh
* korn shell
* ash
* Bash
* zsh
* fish

Those are probably the most popular ones but there are other cool exotic
shells that need to be mentioned like the scheme shell that takes a
completely different approach on the syntax and uses a scheme-like
one, the Pyshell who does the same thing but with a pythonish syntax,
Busybox which incorporates the most common commands inside the shell
itself making it a mini-environment by itself, the directed graph shell
who can execute commands in parallel and aggregate results, etc..

But don't think about those differences as a one decision action.
You don't have to settle for single shell, you can use different shells
for different situations, don't limit yourself.

For different accounts on your system you may use different shells. For
instance, the root account may use the POSIX shell and the user shell
might be csh.

You call the shell that executes for the certain user, the one specified in
/etc/passwd, the login shell.

In sum, it's the first process that executes when you login with that user for
an interactive session.

Any shell started after login is not a login shell.

The shell can act differently when it's called as a login shell, it knows that
because it gets passed the argument 0 with a - prepended.
For instance, the shell may implement an initialization of environment
variables only when it's called as a login shells.

Special login shells can be used for special users.

Other than that here are a bunch of questions you can ask yourself to
decide on the shells you want to choose (courtesy of an article that I
linked in the show notes.)

- How much time do I have to learn a new shell?
- What do I wish to be able to do with my new shell?
- Do I have to be able to switch back to a different shell?
- How much extra load can the system cope with?
- What support is given for my new shell?
- What shell am I using already?
- Can I afford any minor bugs?
- Do you need to be able to use more than one shell?
- What shell features do I want?

But always remember that you can have many shells on one system.
Unix is customizable and leave you with many options.


# How to change


Ok, we covered a bit of why, now let's go into the how.

It's simple, you install the shell.

The shell will be listed in the /etc/shells file, that a file listing
all valid shells.

You then execute chsh when you are logged in with the user you want to
change the shell of or passing as argument the name of the user you want
to change the shell.

A manual and forced way to do it is to edit the /etc/passwd file.

But a word of warning: If the shell isn't valid, you won't be able to
login with this user anymore.


# Customization


What are the nifty cool stuffs that can be added as sugar on top of the
cake for a better workflow with the shell?

- Aliases, making an alias for a command (ex: .: aliased to cd ../)
- Plugins/Extensions (we'll see later)
- Autoloaded scripts (directly executing what you want to)
- Environment variables
- Appearance/style/prompt (making it look fancy to your likings)
- Shells specific features

* Interactive features
  - Completions
  - Command history
  - Mandatory argument prompt
  - Automatic suggestions
  - Directory history, stack or similar features
  - Implicit directory change
  - Autocorrection
  - Integrated environment
  - Snippets
  - Value prompt
  - Menu/options selector
  - Progress indicator
  - Interactive table
  - Syntax highlighting
  - Context sensitive help
  - Command builder
* Programming features
* String processing and filename matching
* Inter-process communication
* Security features
  - Secure prompt
  - Encrypted variables/parameters
  - Execute permission
  - Untrusted script blocking
  - 6.4.1 Script origin execution restriction
  - 6.4.2 Signed script restriction
  - 6.4.3 Multilevel execution policies
  - Restricted shell subset
  - Safe data subset

The shell is your environment and you want to make it fit your likings.


# Defaults


We've talked about all those shells, so which one are default on some
of the popular Unix systems?

Recent MacOS uses Bash as their default shell.

Many Linux distributions use Bash as their default shell too, /bin/sh
also being a symlink to Bash.

Korn shell is default on OpenBSD, but it's a fork of the public Korn
shell and not the original one.

FreeBSD uses tcsh as the default root shell, and the Bourne
shell-compatible sh as the default user shell

> The tcsh is the default root shell of FreeBSD (the default user shell is POSIX-based)[4][5] and its descendants like DragonFly BSD and DesktopBSD.

> Derivative versions of ash are installed as the default shell (/bin/sh) on FreeBSD, NetBSD, DragonFly BSD, MINIX, and Android,[2][3] and in some Linux distributions.

The proprietary UNIXes follow the POSIX compliance and all use a subset
of the Korn shell.

That is a generic overview of the current situation amongst Unix-like
systems, Linux, the proprietary UNIXes, and for normal users on most BSDs,
prefer Bourne descendants while it's still used as default for the root users on
BSD descendants to use C-shells.

All of this for historical purpose.

_Update_:

> The fact that ksh was "opened" quite late did not stop its success as its language has been widely adapted by then. Concerning root shells, the csh (or TENEX csh) is probably even less common, FreeBSD uses the Almquist shell (like NetBSD does AFAIR).
> 
> Probably related: ksh adaption list.
<http://www.in-ulm.de/~mascheck/various/shells/ksh_versions.html>
>  
>  
> Though,  
> <http://www.bsdnewsletter.com/bsda-book/Change_a_user__39__s_default_shell.html>
> 
> But NetBSD uses the Bourne shell as a user shell since version 4.0:
> <http://www.netbsd.org/docs/misc/>
> But historically used csh (but it doesn't mention its root shell).
> 
> And this,
> <http://www.in-ulm.de/~mascheck/various/shells/>
> which points that many BSDs use csh as the root shell by default.

> "The BSD" (when it still was "the BSD" instead of "a BSD") brought its own software along with the Unix software (notable example: vi instead of ed), so its later descendants came with "a csh" too. The csh/tcsh is mostly deprecated as a root shell in more modern BSDs and - according to the list - rarely to be found on SysV systems at all.

# What to take - More...


That's it folks.

You should definitely try out new shells.

There's nothing stopping you, the choice is yours, don't limit yourself.

Your interface, a way of interfacing with the machine and it can suit
your need to be more efficient.

-----

References:


- <http://tangentsoft.net/misc/unix-shells.svg>
- <http://www.ibm.com/developerworks/library/l-linux-shells/index.html>
- <https://en.wikipedia.org/wiki/Unix_shell>
- <https://en.wikipedia.org/wiki/Bourne_shell>
- <https://en.wikipedia.org/wiki/C_shell>
- <http://www.in-ulm.de/~mascheck/various/shells/ksh_versions.html>
- <https://groups.google.com/forum/?hl=en#!original/comp.lang.misc/NTP2bStD4IE/k-AznHm0jdUJ>
- <http://www.faqs.org/faqs/unix-faq/shell/shell-differences/>
- <https://www.freebsd.org/ports/shells.html>
- <https://www.freebsd.org/doc/en/articles/linux-users/shells.html>
- <https://en.wikipedia.org/wiki/Comparison_of_command_shells>
- <https://kb.iu.edu/d/agvf>
- <https://technet.microsoft.com/en-us/library/cc976865.aspx>
- <https://appstechnotes.files.wordpress.com/2013/02/basic-commands-for-unix-shell-scripting2.pdf>
- <http://unix.stackexchange.com/questions/140286/how-to-find-list-of-available-shells-by-command-line>
- <http://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html>
- <https://www.youtube.com/watch?v=3xPURrPeNcc>
- <http://en.wikipedia.org/wiki/Thompson_shell#History>
- <http://unix.stackexchange.com/questions/14934/why-was-the-word-shell-used-to-descibe-a-command-line-interface>
- <http://www.multicians.org/shell.html>
- <https://en.wikipedia.org/wiki/PWB_shell>
- <https://en.wikipedia.org/wiki/UNIX_System_V>
- <https://en.wikipedia.org/wiki/Tcsh>
- <https://unix.stackexchange.com/questions/38175/difference-between-login-shell-and-non-login-shell>
- <http://bsdwiki.reedmedia.net/wiki/Demonstrate_familiarity_with_the_default_shell.html>
- <https://nixers.net/showthread.php?tid=1995>
- <http://v6shell.org/>
- <https://www.gnu.org/software/bash/>
- <http://www.zsh.org/>
- <http://kornshell.com/>
- <http://www.dmst.aueb.gr/dds/sw/dgsh/>
- <https://kb.iu.edu/d/abdy>
- <https://unix.stackexchange.com/questions/145522/what-does-it-mean-to-be-sh-compatible>
