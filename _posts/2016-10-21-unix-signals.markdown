---
layout: post
title:  "Unix Signals"
date:   2016-10-21
categories: unix
podcast: 1
podcast_mp3: http://podcast.nixers.net/feed/download.php?filename=nixers-podcast-2016-10-181.mp3
podcast_ogg: https://raw.githubusercontent.com/nixers-projects/podcast/ogg/nixers-podcast-2016-10-18.ogg
---

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2003))

Unix signals  
Trap me up!

# History

Let's go over some history.

Signals have been there since the very first version of Unix.

They were just a bit different from what we know today.  For many reasons
in fact, they've went through many iterations of development and ideas.

Today we have one single system call to catch all signals but that only
appeared in version 4 of Unix and before that there were different system
calls to catch different types of signals.

In version 7 of Unix signals received a symbolic name for the number
corresponding to the signal, for instance: "KILL" "HUP".

The kill command appeared early on in version 2 of Unix.

BSD soon added the SIGUSR1 and SIGUSR2 signals to their version with
the aim of using it for IPC.

```
This is a general principle — people will want to hijack any tools
you build, so you have to design them to either be un-hijackable or to
be hijacked cleanly. Those are your only choices. Except, of course,
for being ignored—a highly reliable way to remain unsullied, but less
satisfying than might at first appear.
```
- Ken Arnold

A main contributor to the original Berkeley (BSD), noticeably noted for:

* curses and termcap: 
* The most widely used version of fortune
* Ctags

Talking about BSD, BSD 4.x implemented the so called "reliable" signals
that don't reset unless explicitly requested to and also introduced
primitives to block or temporarily suspend processing of a given set
of signals.

Most modern unixes support both styles, the old (Sytem V) and the BSD
ones, the BSD handling being favored for new code.

In fact the modern signals API is portable across all recent Unix
versions.  It's a POSIX standard.  However, even though some signal
codes stay the same across Unix, others differ.


In sum, signals have quite a history of design changes in the signal
code and various implementations of UNIX.

Those changes were done partly because the early implementations were
deficient or had some obvious flaws, and also because the workflow
around them gradually changed.


No worries if you didn't get anything of what I just said, everything
will be explained in the next sections and you'll be able to do some
mental gymnastic to link back to this little history part.


# What are signals


A signal is an asynchronous message or event that interrupts a running
process.

They are intrinsically defined by their effects.

Signals are software interrupts, just like hardware interrupts, they
nudge or notify a process, stop it's normal flow of execution, and then the
process decides what to do with the signal it receives.

For that reason they can be used as a limited form of inter-process
communication. They're useful in the case where you need small
computational and memory footprint because the signals are implemented
at the kernel level.

Signals weren't meant to be used as IPC but BSD adding SIGUSR1 and
SIGUSR2 allowed to do this more easily.

Doing IPC this way introduces many unexpected issues.


# Hardware


Signals are comparable to hardware interrupts, which are nudges the
hardware push when it wants to tell the CPU something. For instance the
disk input output interface nudges the CPU when it finishes an operation.

When the CPU is nudged, the kernel handles it in an interrupt handler,
it's just a function that chooses what to do based on the source and
cause of the interrupt.

Imagine it like event driven programming, because this is what it is.

One might wonder if there's a direct relation between hardware interrupts
and signals.
That's a fair question to ask.

There is in fact one.

Let's take an explanatory scenario.
When a process attempts to execute any code that generates a hardware
exception or failure the cpu will receive an interrupt from that piece of
hardware.

For example dividing by zero.  
Just like we mentioned above, it's a hardware nudge.

What's the next step, the kernel enters the event handling routine, which
here is the kernel exception handler.

Now depending on the situation, sometimes the kernel can handle the
failure by itself and continue execution normally, otherwise, in other
situations it has to propagate it.

The kernel, in this case, defer the exception to the faulty process in
the form of a signal corresponding to the error.

The division by zero would send back to the process a SIGFPE signal,
floating point exception, or if the process wants to access and address
outside of it's memory virtual address space it would get a SIGSEGV
signal.
But, it's important to mention, that's only on x86 CPUs. Because like
everything hardware related this differs from architecture to architecture.

The mapping between those signal names and exceptions is dependent upon
the architectures, since exception types differ between architectures.


Another thing to mention is how this affects the asynchronicity versus
synchronicity of the signal handling.

This depends on the source of the signal and the underlying reason or cause.

Synchronous signals occur as a result of executing instructions that
are error prone and unrecoverable. Errors that need immediate handling,
such as division by zero. Those signals are sent to the faulty thread that
caused the error within the process.

This is the type we mentioned above.
It's also referred to as a trap because the kernel initiate its trap handler.

But the name trap is also used for any signal handler function.

On the other hand, asynchronous signals are external to the process or thread
itself. It's another process initiating a system call that will then push the
signal to the target process.

We'll discuss the specific system calls later.

Let's add that synchronicity is usually assured if it's the process
itself that initiate the signal even though it can be using system calls
that are asynchronous.

Like the synchronous ones, the asynchronous ones are usually referred to as
interrupts.

But again, the naming convention are mixed, and can be used interchangeably.

However, you cannot assume that a signal will be handled synchronously or
asynchronously and that's one of the issues.


# Synchronicity


There are ways to make sure the messages are sent in order, or synchronously,
or at least try to avoid the issue.

You can suspend execution until a signal is received by using the

<pre>
pause(2)        Suspends execution until any signal is caught.
sigsuspend(2)   Temporarily  changes the signal mask (see below) and
                suspends execution until one of the unmasked signals
                is caught.
</pre>

Or you can try to synchronously catch signals by avoiding using signal
handlers and instead block execution until a signal is delivered using:

* `sigwaitinfo(2)`, `sigtimedwait(2)`, and `sigwait(3)` suspend execution
until one of the  signals  in  a specified set is delivered.  Each of
these calls returns information about the delivered signal.

* `signalfd(2)` [Linux specific] returns a file descriptor that can be used to read
information about signals that are delivered to the caller.  Each `read(2)`
from this file descriptor blocks until one of  the  signals in  the
set specified in the `signalfd(2)` call is delivered to the caller.
The buffer returned by `read(2)` contains a structure describing the signal.

Last but not least you can modify the signal mask, that is to modify
the status of signals, between blocked, pending, and delivered.
"A set of bits representing their status."

When a signal is blocked it won't be delivered until its unblocked, it'll
stay in pending mode in a kernel queue.

This mask is specific to the thread and there are system calls to
manipulate them.
But that poses the problem of a signal directed at a process and not
a thread, the kernel will still send that signal to the process to an
arbitrary thread that doesn't have it blocked.

You can then unblock the handlers on demand and process the signals.

A nota bene here, blocking signal is extremely useful when you don't want
your process to suddenly stop executing in critical parts of your code to
avoid race conditions and interruptions.
We'll come back to this idea when discussing atomic instructions.

So to recap those 3 new handling ways they mostly consist of blocking the
process or/and signals and wait so that we can safely poll new signals
by releasing the process or the signals.

There are many examples in the show notes.

Those all introduce even more issues of their own.


# Meanings


Signals come from many sources.
What can be and is signaled exactly?

* Something executing the system call that transmit a signal to a process
* Sending a signal from the process unto itself
* When a child process exits
* When the parent process dies or hangup
* When the program behaves incorrectly
* Hardware failure

Each of those should have a unique signal name, at least to categorize them.
Those abbreviated signal names begin with SIG, they have this prepended.
For instance SIGINT, the signal interrupt that is sent when a user hits
ctrl+c on the shell when a program is executing.

So what are the standard signals?

You can specify a signal by its number or by its name.

The POSIX specifies many signal names that are common between unix OSs however,
the numbers aren't all portable, they might differ from one unix like OS to
another.

There are some that are portable across them, their numbers are static.

They are the following:

<pre>
Signal  Portable number Default Action        Description
`----------------------------------------------------------------------------`
SIGHUP     1            Terminate             Hangup/ line hangup
SIGINT     2            Terminate             Terminal interrupt signal. (ctr-c)
SIGQUIT    3            Terminate (core dump) Terminal quit signal.
SIGABRT    6            Terminate (core dump) Process abort signal (abort syscall)
SIGKILL    9            Terminate             Kill (cannot be caught or ignored).
SIGALRM    14           Terminate             Alarm clock
SIGTERM    15           Terminate             Termination signal. (default one when using the kill command)
</pre>

The other standard ones are:


<pre>
Signal Portable number Default Action         Description
`----------------------------------------------------------------------------`
SIGSTOP    n/a         Stop                   Stop executing (cannot be caught or ignored).
SIGBUS     n/a         Terminate (core dump)  Access to an undefined portion of a memory object.
SIGCONT    n/a         Continue               Continue executing, if stopped.
SIGFPE     n/a         Terminate (core dump)  Erroneous arithmetic operation.
SIGILL     n/a         Terminate (core dump)  Illegal instruction.
SIGPIPE    n/a         Terminate              Write on a pipe with no one to read it.
SIGPOLL    n/a         Terminate              Pollable event.
SIGPROF    n/a         Terminate              Profiling timer expired.
SIGSEGV    n/a         Terminate (core dump)  Invalid memory reference.
SIGSYS     n/a         Terminate (core dump)  Bad system call.
SIGTRAP    n/a         Terminate (core dump)  Trace/breakpoint trap.
SIGTSTP    n/a         Stop                   Terminal stop signal.
SIGTTIN    n/a         Stop                   Background process attempting read.
SIGTTOU    n/a         Stop                   Background process attempting write.
SIGCHLD    n/a         Ignore                 Child process terminated, stopped, or continued.
SIGURG     n/a         Ignore                 High bandwidth data is available at a socket.
SIGVTALRM  n/a         Terminate              Virtual timer expired.
SIGXCPU    n/a         Terminate (core dump)  CPU time limit exceeded.
SIGXFSZ    n/a         Terminate (core dump)  File size limit exceeded
SIGUSR1    n/a         Terminate              User-defined signal 1. (BSD introduced)
SIGUSR2    n/a         Terminate              User-defined signal 2. (BSD introduced)
</pre>

There are 5 behaviors that the default handlers can have:

* Terminate — Abnormal termination of the process. The process is
              terminated with all the consequences of `_exit()` except
              that the status made available to `wait()` and `waitpid()`
              indicates abnormal termination by the specified signal.
              (forces the process to exit.)
* Terminate (core dump) — Abnormal termination of the
              process. Additionally, implementation-defined abnormal
              termination actions, such as creation of a core file,
              may occur.
              (forces the process to exit and create a core file.)
* Ignore    — Ignore the signal.
              (ignores the signal; no action taken.)
* Stop      — Stop (not terminate) the process.
              (stops the process.)
* Continue  — Continue the process, if it is stopped; otherwise, ignore
              the signal.

You can find more list of signals with their descriptions in the show notes.


# Receiving


The behavior of those signals is predefined, it's the default signal.

But you can override them, that means having your own handler that catches
the signal to do the things you want, such as cleanup.

What's also particular about the different signals is that there are
two that cannot be intercepted by the user/overriden and they are the
SIGSTOP and SIGKILL. SIGSTOP always moves a process to the background
and SIGKILL always terminates it, it's what usually happen when you
do ctrl-z.  They cannot be handled, so stopping a process with SIGKILL,
for example, is considered a bad idea because the program cannot clean
itself before exiting.

So what is there to know about declaring a custom signal handler that
overrides the default action.

Like we said that function is asynchronous, so keep that in mind for now,
we'll return to it later.

Remember we said there had been many changes to the signals interface.
Well here's one difference.
There are actually two different flavors of signals handling.

In older implementations (before early System V), the handler
for a given signal is reset to the default for that signal whenever the
handler fires. The result of sending two of the same signal in quick
succession is therefore usually to kill the process, no matter what
handler was set or it even had unexpected behavior such as race conditions
and anomalies when sending multiple signals in a row.

Which is why starting from the BSD 4.x version, new reliable signals
were introduced, signals that don't reset unless requested.

They also introduced primitives to block or temporarily suspend processing
of a given set of signals, which is in fact the signal mask we mentioned
earlier, the one that control which signals are received by a thread in a
process or by the process itself.

Modern Unixes support both styles but you you should use the BSD-style
when you have the choice.

So we'll discuss this new interface and what we need to pay attention
to when writing them.

NB: The default signal handler also has a name: SIG_DFL and to ignore
it's the SIG_IGN. So you can reset them back to those in case you need
or want to.

The old system call is still available but deprecated and it's the
`signal(2)` function.  The new one is the `sigaction(2)` system call.

To catch a signal you have to register this signal handling function
to the kernel.

<pre>
int sigaction (int signum, const struct sigaction *act, struct sigaction *oldact);

struct sigaction {
    void      (*sa_handler)(int);
    void      (*sa_sigaction)(int, siginfo_t *, void *);
    sigset_t   sa_mask;
    int        sa_flags;
    void      (*sa_restorer)(void);
};
</pre>


So you specific a signal number to be caught and a structure sigaction
with the information related, like the mask and the handler funtion.

In comparison with the older version of the signal handler this one is
more complex. The old one only took as argument the signal number and
a pointer to the handler function.

Also remember to always use the signal names and not the numbers directly
as we've said before only certain numbers are portable across different
unix-like operating systems.


Now what is there that is special inside this function?

Apart from knowing that the handlers are asynchronous and that SIGKILL
and SIGSTOP cannot be caught, what's next?


# Specific signals, different ways to handle them


When overriding signals you should consider the rule of least surprise.
There are conventional signal names and they are expected to act like
their name says otherwise the behavior you are sugar coating it with
will confuse the users of your program.

For instance SIGHUP, a signal originally sent to a program on a
serial-line drop, like when the connection is interrupted, is more often
used to reinitialize daemons or reload the configuration files.

It's conventional to implement that signal handler this way, it is the
existing model.

The same goes for SIGCHLD that is used to check if a child process has exited
to clean up after it.
Also for SIGTERM, the graceful shutdown signal.
And SIGUSR1 and 2 used for special signal handling.
If you receive a hardware error you can cleanup and then create a dump
by calling back the default signal handler that creates a dump, such
as `abort(2)`.
Also about sleep and alarms, alarm() arranges for a SIGALRM signal to
be delivered to the calling process in seconds seconds, but that's not
always the case, however you can't assume things.

Moreover, don't forget to document the latter as otherwise no one can assume
the things that will happen when they are triggered.

Let's mention something and then move on to the specificities inside the
handler function.


# Threads and Signals


And this thing is threads, how should they behave when they receive signals?
What if a process receives a signal, to which thread is it sent?
They have the same PID so what?

We already mentioned that every thread has its own signal mask but what
about the rest?

The signal disposition, that is how signals are handled is the same within
the same process and it cannot be unique amongst threads.
So the signal handlers are shared.

What about children processes, they inherit the handlers and masks
of their parents only if they are created with `fork(2)` and not with
`exec(2)`, with the exec family of system calls the handlers are all set
to the default.

And also, a new child always start with an empty signal queue.

But to which thread is the signal sent?

The signal isn't multiplied and sent to multiple threads, don't
make that assumption because it's wrong, only one signal is sent.

Let's start with synchronous signals, the one we mentioned in the first
section, the ones that happen when a hardware error is encountered for
example, they are sent to the thread that initiated that error.

For asynchronous signals there's really no order, they are simply sent
to the first thread found that isn't blocking the signal.
It's more or less arbitrary.
In fact it's sent to the first thread that isn't blocking in the pid hash
stored by the kernel, and implementation wise hashes have no real order.

However, there's the `pthread_sigmask(3)` function that can be used exactly like
`sigprocmask(2)` to manage the masks and control what goes where.

There's even a function that can be used to send signal to a specific thread
and not a process, it's the `pthread_kill(2)`, but it should be used inside the
process itself.
We'll see more of the methods used to send signals in a bit.

Now let's move to what you do inside that handler.


# Atomic instructions


The key idea is that everything can be suspended at any moment when a signal
is received and thus for maximum portability a signal handler should only do
a minimal amount of actions:

Make successful calls to the function `signal()` or `sigaction()`
Assign values to objects of type `volatile sig_atomic_t`
Return control to its caller

Why this atomic thing?

Let's discuss this topic of atomic instructions.

This `sig_atomic_t` is the only type that is guaranteed to be automatically
read and written  in signal handlers. Its size is undefined, but it's
an integer type. It's the only safe type in the handler, anything else
that is non-atomic cannot be used with certainty.  You also need that
volatile keyword because otherwise compiler optimizations might mess up
what happens inside the handler.

However, some consider volatile harmful and not necessarily necessary.
[https://www.kernel.org/doc/Documentation/volatile-considered-harmful.txt]()

Other than that you need to pay attention to whatever you're doing inside
those handlers and to when they are called.

Your program can be interrupted at any time...
Actually that's not completely true, it can only be interrupted after
an atomic instruction.

Not all system calls are atomic, and thus might be stopped right in the middle
of what they were performing, this is excruciatingly annoying when you were
doing I/O operations as you don't know what would happen when the process
comes back, will it continue operation, restart it, ignore it, or fail.

Every system or standard library function can potentially be interrupted.
It's important to check the documentation to the related functions you
are using, maybe they have a "safe" version you can use or at least they
might specify the behavior they have when they are interrupted.

The safe functions are called async-signal-safe functions and they are defined
in POSIX.

You can find a list of them online.

Overall you need to avoid side-effect inside the handler.

One last thing to say is that intercepting signals on the shell is done using
the trap command.


# Sending


We've seen how to intercept those signals, now how do we send them.
Other than the self-generated errors, how can we intentionally create them.

There are multiple ways.

Typing certain key combinations at the controlling terminal of a running
process causes the system to send it certain signals:

<pre>
Ctrl-C  (in older Unixes, DEL) sends an INT signal ("interrupt", SIGINT);
        by default, this causes the process to terminate.
Ctrl-Z  sends a TSTP signal ("terminal stop", SIGTSTP); by default,
        this causes the process to suspend execution.
Ctrl-\  sends a QUIT signal (SIGQUIT); by default, this causes the process
        to terminate and dump core.
Ctrl-T  (not supported on all UNIXes) sends an INFO signal (SIGINFO);
         by default, and if supported by the command, this causes the
         operating system to show information about the running command.
</pre>

These default key combinations can be changed with the stty command,
that's because the key sequence is defined in the terminal session.

Remember we said that to propagate the signal to threads inside a process
we use the `pthread_kill(3)` well, that comes from the `kill(2)` system call.

This system call is used to send a specified signal to a process if permission
allows it.

And like most system calls it comes with a shell command that wraps it,
the kill command.

What permission do you need to send a signal to a process, it's quite simple.

* You can kill all your own process.
* Only root user can kill system level process.
* Only root user can kill process started by other users.

There are other specific system calls to send signals but kill is the most
relevant one, the others are just wrappers.

For instance `abort(3)` and `raise(3)` are respectively used to send the SIGABRT
to a signal and to send signal to the current process.

On the command line there are many utility helpers to help narrow down the
choices.

* For instance you can send a signal from process viewers such as top and htop.
* You can send a signal using pkill, using a program name instead of it's pid.
* You can do a killall to do something similar to pkill but to all processes
  with the matching name.
* You can use `kill -l` to list all the signals available on your platform.

You can even check the signal mask of the processes to know which one ignores
which signal.
You can do that using the `kill -L <pid>` to get the hexadecimal value
of the signal handler.
Or on Linux you can use /proc/<pid>/status and verify the SigIgn for instance.

[https://unix.stackexchange.com/questions/85364/how-can-i-check-what-signals-a-process-is-listening-to]()

Indeed many ways to send signals and manage them.

Let's also say that signals are a great way to do job control on the command
line, especially with foreground and background jobs.
But that's another topic for another time.


# BSD signal semantic?


Let's move to a discussion on BSD.

If you remember in the introduction I talked about how BSD implemented
reliable signals.
Well, they've done a lot of thinking on that part.

Not only about non-resetting signal handlers and adding the ability to
block signals and control them in a flexible manner but more.

Let's first recap that now that you've got the hang of signals.

In the system C style:

* Recursive signal handling is always allowed.
* Signal handlers are reset to SIG_DFL prior to being called.
* System calls interrupt when a signal is delivered.

Now in the BSD 4.x style:

* Signals are blocked for the duration of a signal handler (i.e. recursive
  signals are not normally allowed).
* A "signal mask" can be set to block most signals during critical regions.
* Signal handlers normally remain installed during and after signal delivery.
* A separate signal handler stack can be used if desired.
* Most system calls are restarted following delivery of a signal.

This all seems lovely but there's even more discussion that the BSD guys
brought up.

For instance they've wondered and came up to the conclusion that signal
catching functions should be reentrant.
That means that that it's a function whose execution can be restarted
at any point without it being affected. That makes sense because signals
are mostly asynchronous.

They've reached an even higher level.

What about shell scripts?
What if you have a script running and that script calls sequentially
multiple other sub-scripts and in the middle you press ctrl-c on the
terminal.

What will happen?
How will the signal propagate?

Will it stop only the current command that was running at the time?
Will the parent script be notified of that signal?

Those are all important questions to ask.

They came up with three keywords for those:

* "immediate unconditional exit"

The shell itself exits immediately when it receives SIGINT.

* "wait and unconditional exit"

<pre>
As a variant of the former, when the shell receives SIGINT while it is
waiting for a child to exit, the shell does not exit immediately. but
it remembers the fact that a SIGINT happened. After the called program
exits and the shell's wait ends, the shell will exit itself and hence
discontinue the script.
</pre>

* "wait and cooperative exit"

<pre>
As in the WUE way, the shell waits for the child to complete. It figures
whether the program was ended on SIGINT and if so, it discontinue the
script. If the program did any other exit, the script will be continued.
</pre>

Now different shells handle signals different ways but what we want is
the signal to reach the current running process and then propagate to
the parent if needed. This is the "wait and cooperative exit."

However the parent won't be notified, as in it won't receive the signal
of the child, if this child process messes the signal handling.
That's an issue in it's own way because it's against the principle of least
suprise.

So they've came up with a sort of standard on how to properly handle
signals.

That works somehow like a reseter of the handler inside the signal handler.

At the end of the handler you should call back the default handler for the
signal received, using the `raise(3)` function or simply just `kill(2)`. So
now that signal will propagate to the parent.

That's about it, fancy smart BSD guys, kudos!

# Other Uses

Signals are used in other places.

As we've said they're a sort of bad way to do IPC.

You can "watch" processes using signal.

There are even real-time signals for real-time operating systems however
they're badly implemented on a lot of Unix-like OS, probably only used in
real-time operating systems only, as that's their only use.


# Conclusion


Signals are tough, they're not trivial.
I assumed they would be an easier topic to treat than what they really
turned out to be.

However, I'm impressed by how engrained they are in the Unix history and
how the BSD guys have added to them.

Overall, they're pretty nifty but horrendous to handle properly.
So beware of that.

Don't worry, with a bit of trial and errors your signal handlers
should work fine.

Plus, you've now got the hang of how they work deep down so you can
debug them.



--(Show Notes)--  
<pre>
signal(7) #list of signals  
signal(2),  
kill(1),  
alarm(2),  
kill(2),  
killpg(2),  
pause(2),  
sigaction(2),  
signalfd(2),  
sigpending(2),  
sigproc‐  
mask(2),  
sigsuspend(2),  
bsd_signal(3),  
raise(3),  
siginterrupt(3),  
sigqueue(3),  
sigsetops(3),  
sigvec(3),  
sysv_signal(3),  
</pre>

[https://en.wikipedia.org/wiki/Unix_signal]()  
[http://www.thegeekstuff.com/2012/03/linux-signals-fundamentals/]()  
[https://namingschemes.com/UNIX_Signals]()  
[http://www.tech-faq.com/unix-signals.html]()  
[http://www.linuxprogrammingblog.com/all-about-linux-signals]()  
[http://www.linuxjournal.com/article/3985]()  
[http://www.tutorialspoint.com/unix/unix-signals-traps.htm]()  
[http://people.cs.pitt.edu/~alanjawi/cs449/code/shell/UnixSignals.htm]()  
[https://utcc.utoronto.ca/~cks/space/blog/linux/WhatSignalsIgnored]()  
[http://www.digplanet.com/wiki/SIGHUP]()  
[http://jvns.ca/blog/2016/06/13/should-you-be-scared-of-signals/]()  
[https://en.wikipedia.org/wiki/Job_control_(Unix)]()  
[https://en.wikipedia.org/wiki/Kill_(command)]()  
[https://en.wikipedia.org/wiki/C_signal_handling]()  
[https://www.cons.org/cracauer/sigint.html]()  
[http://www.catb.org/~esr/writings/taoup/html/ch07s02.html]()  
[https://unix.stackexchange.com/questions/85364/how-can-i-check-what-signals-a-process-is-listening-to]()  
[https://en.wikipedia.org/wiki/Kill_(command)]()  
[https://en.wikipedia.org/wiki/Ken_Arnold]()  
[http://www.cs.ucsb.edu/~almeroth/classes/W99.276/assignment1/signals.html]()  
[https://siguniang.wordpress.com/2011/12/27/dont-mix-alarm-with-sleep/]()  
[https://ldpreload.com/blog/signalfd-is-useless interesting article - but as with all blogs it's purpose is to nag about the situation. You can read it after this podcast.]()  
[https://busybox.net/~vda/init_vs_runsv.html how signals are used in a bad way and an alternative]()  


Music: Kronstudio - Volume  
