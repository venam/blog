---
layout: post
title:  "Processes On Unix"
date:   2017-07-27
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---


# Unix Processes #

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2141))

# Introduction #


In this episode we'll tackle a topic that joins many parts of the systems
and so is hard to fully cover.

It has a relationship with everything in the system, it glues it together.

We're going to be discussing processes on Unix.


# What is a process #


## At the same time? ##

What uses does a computer have if it doesn't run any programs?
What uses does it have if it only runs a single program?

We can run many different sorts of programs at "the same time" on a
Unix-like operating system.  
Isn't that convenient?

But what does it mean to run programs at "the same time"?

Let's take the opposite, what does it mean to run a single program
instance on a machine. That would mean this program would be holistic,
it would do everything by itself and could have control of the machine's
entire resources, memory and processors during its lifetime. The switch
from one program to another would mean the end of existence of the first
program and it would be the role of that program to load the next one
in the queue.

If you've read the book Flatland this is metaphorically equivalent to
the one dimensional being.

But we live in the sixth dimension now, things are more complex and
subtle.

To run multiple instances of programs we need to be able to split the
resources amongst them. We don't have one physical CPU and RAM for every
new process we spawn, though this could be interesting to think about,
and so we share spaces in memory, and processor running time.

And that is the problem to tackle: How to run more processes than there
are cpus, how to provide the illusion of endless processors and memories.

There are many more or less satisfactory solutions to this problem.

The terms we use to describe those are:

* Multiprogramming
* Multiprocessing
* Multitasking
* Timesharing
* Multithreading

Let's talk grossly about what they mean.

Multiprogramming is the case of a single program holding the processor
resource at a time, while other programs are loaded in the memory and
waiting for the first one to finish executing its instructions or to let
go of the processor, be it because it's doing some I/O or because it's
completed. Then the processor context-switch to that other task.

This is a bit different than having a single program on a machine,
as you can imagine, because multiple programs can be loaded in memory.

Multiprocessing is a generic term that refers to the concept of having
many hardware processors and having tasks run in parallel on different
CPUs aka "at the same time". Having a new processor for every new program
that wants to run would be a case of multiprocessing.

Multitasking is similar to multiprogramming, as in the processor
executes only one task at a time, but it adds to it that the task can be
interrupted and the CPU can be reassigned/context-switched to another one,
which gives the illusion of parallelism, but is more precisely referred
to as concurrent tasks. It also goes further, the tasks don't have to
be the whole program they could be sub-parts of it, defined as threads
of execution.

Now about timesharing, both multiprogramming and multitasking are
timesharing, as in programs share CPU time or resource time. In
multiprogramming one program as a whole keeps running until it blocks
and in multitasking each running program takes only a fair quantum or
slice of the CPU time.

Lastly, multithreading is about having threads, sub-parts of the same
program, being ran concurrently. The context-switching in this case
is lighter as it doesn't have to switch virtual memory address space
because it's within the same program. It only has to switch processor
state from one thread to another which is efficient.

Ok, that's a lot of concepts to grasp but this gives us an overview of
the concepts.

And for those to work we have to define our main actor here: The task,
the running program, the unit that will use that CPU time, the process.

We kind of understand why we need them but what are they?


## What are they? ##


To get anything done on a Unix system you need processes. The running
programs or computing tasks are running inside them.

Programs themselves are a set of passive machine code, instructions
and data stored in an executable on the disk, it's a non-changing and
static entity.

The operating system takes that executable and forms something useful
from it.

When the program gets active, dynamic, alive, it becomes a process.
It's the state of the program while being executed by the OS, it's the
program instructions in-action. That also means that the same instructions
can be loaded in different processes and that program instructions within
the same processes can be changed.

The instance of the program is loaded in memory and the instructions
finally get to be executed by the processor.

But the process is more than that.

First and foremost it's an operating system abstraction.

A process is an independent container or bundle for a program running.
Inside of it you can find the program execution, its state, the metadata
that describes it, environment. The container also has input and output
and can send messages to other containers.

This specific way of seing processes makes more sense when you think about
them as owner of resources to which their running program currently needs.

That means that the current executing process and activities are separated
from other processes. One process crashing shouldn't make another one
crash (in theory). Processes shouldn't be able to communicate with
the rest of the running ones except through certain specific kernel
mechanisms.

The process entity has a lifetime, a start at the fork() system call
and end at the exit(). It may execute different program instructions
over its lifetime. It has its own address space and control points,
its own state, it has its own execution environment, and is the unit
used for scheduling, managing what holds which resources at one time.

This is the abstraction that a process provides: A processing unit.

Viewing it in another way: processes are tasks, which means they take
up time, which is in opposition to taking up space.

We'll discuss their history, their memory representation, their structural
representation, their state, their scheduling, their lifecycle, their
communication, and much more in the following sections.


## Types Of Processes ##


There's always a process active on Unix, at any time, as soon as the
machine boots up there's a need for at least one process.

That first process is the init process, which is the parent of all
other processes.

This is a conundrum as you need at least a process to create another
process. So you need that first stable process that never disappears.
This is one of the role of that first process.

We'll see what this all means later on.

Whenever you issue a command, on the shell or wherever, it might start a
new process and/or suspend another process, but not always as it might
look like there's another process running but it might be a built-in
command being executed. This is a confusion because of the conflation
between processes and programs. A different program doesn't always mean
a new process.

The process management will also be discussed later.

Generally speaking there are 3 process types: User processes, daemon
processes, and kernel processes.

User processes are the processes that are initiated by the regular user,
they run in "user space".

Daemon processes are processes that are specifically designed to run
properly in the background and offer some service. (See podcast about
daemons)

Kernel processes are processes that live in the kernel space. They are
similar to daemon but have full access to the kernel data structure and
are less flexible configuration wise.

Those grossly are the types of processes you'll encounter.


# Basic attributes & Permissions #


Let's now start the discussion about some elements of the structure
representing a process and certain specificities they have which we can
further elaborate later.

There need to be a way to pinpoint a specific process, to know which
one you are talking about in the list. This is done through a unique
identifier/identification called the process identifier or PID for short.

There's usually a limit to the number of IDs and thus a limit to the
number of processes that can live in a system, we call that the PID
pool. Those IDs are in some systems assigned sequentially and in some
others they're assigned randomly.

Similarly, there are other identifiers attached to processes:

The Parent Process id, PPID which points to the PID of the parent of
this process, the process in question being called the child.

The process-group id, PGID, and the SID, the group and the session the
process belongs to respectively.

A process is also like a sovereign land, with its owner, delimitation,
and rules. That's why it contains some security attributes such as the
process owner, UID, and permissions/privileges.

The user id, UID, is the user who own this process. When the process
tries to accesses a file it checks if the user has the right to do so
in its permission field.

However keep in mind that ownership can change in some specific cases
such as with the setuid and setgid bits.

There are a lot of other things in the process structure as we'll see
but for now let's move to how the multiple programs are handled in memory.


# Scheduling #


This isn't a podcast dedicated to neither scheduling nor virtual memory
but we're still going to give a quick overview of them.

Those are the mechanism that make it possible to run multiple programs
at the same time while using a single resource.

Both of those are parts of the process mechanism that happens in system
mode and not in user mode, usually there's a secure mechanism to switch
between both modes, the system calls.

When a process, task, or thread requests something and has to wait to
get a reply, for example when it does I/O, or when its cpu timeslice
runs out, or when it receives an interrupt be it hardware or software,
then the OS can take the CPU away from that process and make it eligible
to be swapped to disk, it's state is changed to blocked or sleeping.

This specific activity is called context switching.

The scheduler, a part of the kernel, will choose which is the most
appropriate process to run/wakeup next and switch to. This one chosen is
certainly a process that isn't currently waiting for I/O or some other
resources, otherwise it'll create an infinite recursion, it should be a
"runnable processes". Remember that Unix is a timesharing system and
processes take turns referred to as quantum time or cpu timeslices.

There are multiple kinds of scheduling strategies, also called policies,
to ensure fairness and effectiveness amongst processes competing for
cpu resources.

How those schedulers work internally is out of scope.

Let's just mention three or four interesting things.

First, some Unix-like operating systems allow to dynamically switch
the scheduler and some have it built-in at compile time in the kernel,
this is a trade-off between efficiency and convenience. The scheduler
is one of the most executed part of the os, having the extra dynamic
step may make it slower. Linux has the ability to dynamically switch
and most BSDs have it built-in at compile time.

Second, most of today's scheduler have some mathematics behind them,
instead of plain roundrobin between processes. They calculate the next
process to execute on a time quantum according to heuristic and feedback
mechanism regarding their priority, which is also changed according to
this heuristic. The process scheduling priority is another one of those
attributes on the process structure.

Yet another of those attribute is the current CPU the process is running
on. We call that processor affinity, there's no reason why a process
should not run on a different processor everytime it is chosen but
sometimes it's less costly, less complex, and give performance overhead
to do so instead of reassigning it, because of the cache.

There's also a lot of thought going on to choose an appropriate size
for the cpu slice of time so that processes are responsive and at the
same time have a high throughput. And there are thoughts going on about
knowing after how many number of cpu slices the OS should recalculate
the priorities.

For that there needs to be a sort of clock or counter that ticks when the
process is in run mode and fires the scheduler when the process is out
of time. Remember that other processes can't stop the current running
process, it has to stop itself or get in a "wait" mode.

Technically, according to my research, on FreeBSD and Linux the cpu time
slice is by default 100 milliseconds. But it's not a fixed quantum,
it can vary between between 10ms-200ms depending on the priority and
policy mechanism in place.

There exists commands and system calls to change the priority of running
processes. Namely nice and renice. And so you can affect the math behind
how the scheduler assigns cpu time slices if you so desire.

The niceness runs from -20 to 19, where -20 is the highest priority
and 19 the lowest but only root can decrease niceness and thus increase
priority. The default niceness is inherited from the parent process.

Apart from those timers there are a bunch of other timers stored in the
process structure to keep track of some time or tick related functions.

For instance, the kernel keeps track of the process creation time,
as well as the CPU time that the process consumed during its lifetime,
the time it consumes in user mode, plus some specific counters.

Those counters are usually used to send different signals when they
run out.

One of those counter ticks in real time (as in seconds) and when it runs
out it'll send SIGALRM to the process.

Another one ticks only when the process is actually running, it sends
SIGVTALRM to the process.

Another ticks when the process is running plus when its running in system
mode too, it sends SIGPROF.

Ok, so we mainly know that when the process runs out of time it's taken
away and another process can have the CPU for itself.

What does that "take away" move imply, this "swapping to memory or disk",
storing its state, and restoring its state, and how do processes manage
using the same memory at the same time.

Again, this isn't a podcast about memory management, so let's skim over
some of the parts that are interesting to us.


# Memory & Paging - Multiple programs running #


A process is a running program, its instructions are executed on the
processor and its state keeps changing.

This running process has a list of states, pieces that it can update,
that it acesses and that are vital during the course of its executation.

One of those is the data in memory, we call that the address space of
a process. Memory usually contains instructions and variables.

Another part is the values currently in the registers of the
processor. The Processor explicitly uses them to do operations and to
keep track of where the process currently is in it's instruction sets
in memory, where the variables are, be them dynamic or local, etc..

Another one of those is the input/output information, the file descriptors
pointing to the files currently being accessed.

So when the process runs out of cpu time what happens to this dynamic
state?

The answer is that it is swapped, aka suspended to memory.

This consists of saving, creating a snapshot of the whole current machine
state in an appropriate structure and to store it in the memory.

Then the new process that wants to run after this one is restored the
same way.

The swapping of processes takes place at the end of the scheduler,
after the next process has been chosen.

So, is memory split up amongst processes? Do processes have to manage
that memory everytime they access their state and instructions? What
about memory fragmentation?

Yes, there was a time when programs had to contain the logic to manage
shared memory and fragmentation but that time is gone. These days programs
use something called virtual memory, a role now delegated to the kernel,
which makes processes believe that they have their own continuous clean
memory space, aka their own "address space". It takes off a huge burden
from processes.

Virtual memory works by using a combination of hardware and software
techniques. There's a data structure called a page table that has
entries in it used to map virtual memory addresses to real physical
memory addresses.

There may exist some hardware translation in the CPU called a memory
management unity (MMU) that will automatically translate those addresses.
(using its translation lookaside buffer (TLB), which is a cache storing
those mappings, and the kernel may extend on this hardware capability.)

Usually the memory is assigned by chunks called pages, this makes it
easier to translate and assign memory as you can point to the page
number. Moreover those pages have a specific size, the page size, which
makes it convenient too. For example it might be 8192 bytes, 8KB or 4096
bytes, 4KB, which is frequent , but the size maybe differ per processor
implementations.

Moreover, there's also a technique called paging out, which when the
physical memory runs out will move, or page out, the data to disk
instead. This allows to use more memory than is actually available at
the cost of reduced response time.

So if you join context-switching with the memory management we've just
discussed you get an idea of how dispersed the state of a process can be.

There's a lot more to know about virtual memory and context switching,
like for example demand paging, when the memory isn't allocated directly
but only when it's used, and all the specific scheduling techniques,
so we might do a future episode about those.


# Some History #


Where does the ideas about processes and process comes from.

Let's have a look at a bit of history from the early Unix days at
Bell Labs.

In the very early days there weren't many processes running on a machine,
there was only one process running at a time per terminal.

This was still time-sharing because it was shared amongst terminals.
It was a sort of multi-programming environment where there could only
be one process at a time in memory. It was also very restrictive as
disk I/O was done synchronously, you had to wait till it finished until
another process could be placed in memory unlike what we've previously
discussed. It's only later on that memory management and support for
multiple processes was added, partly because new hardware with this
capability was obtained by the lab, it got better once UNIX was re-written
in C.

In those days, the current process facilities, aka process control,
were not present.

Today there are simple mechanism to manage process creation and
lifecycle. The system call fork, exec, wait, and exit. Don't worry too
much about them for now we'll come back to those later, just keep in
mind that those are convenient routines.

Here's how new commands are executed on a shell today:

The shell reads the name of the command from the terminal input and
creates a child process using fork. Then the forked child process
calls exec with the name of that command to call. Meanwhile the parent,
the shell, waits for the command to finish executing. When it's done
it repeats the same procedure, reading from the shell, forking, and
executing.

This will sound familiar if you have some knowledge of fork and exec.
But at the early Bell labs days there were none of these facilities,
no fork, nor wait, nor exec, and even exit meant something different.

This is how a new shell-command/process was started:

The shell closed all opened files, opened a terminal to get the file
descriptor 0 and 1 for input and output, then read a command from the
terminal. So far so good, the only difference is that it closes all
file descriptors first. Now it gets weird: it links the file specifying
the command, opens it, removes the link, then copies a small bootstrap
program to the top of the memory which instruction is to read the file
over the shell code, then it executes it. Which all gives the effect of
an exec. And... When the command finishes it calls exit, which causes
the system to re-read a fresh version of the shell, because the current
code in memory has been tainted by the new command. Finally it repeats
itself, cleaning the opened files, etc..

That's how the primitive execution of new processes started, as a
bootstrap over the previous command and a refresh for an exit.

This simple way had some major issues: no support for background
processes, no support for retaining memory across different command
execution, and there could only be one process per terminal at a time.

It also had to close and reopen all it's file descriptors everytime,
including the terminal file descriptor. Some mini-hacks were made to
counter that like linked the terminal file descriptor in the directory
where the command is called.

Ok. So how did it evolve to give birth to the sys-calls we now have.

Fork and exec were easily added after that, partly inspired by the
division some earlier time-sharing OS at the labs had, the GENIE
time-sharing system.

Mainly the separation between creating a new process as a copy of
the first one and executing a new process over it. Fork does that, it
continues to run the same program as its parent until it performs an
explicit exec.

You can see that this is similar to what was already there it just
needed to extend the process table, which was already used to handle
the one-process-per-terminal time-sharing mechanism.

The code of the parent was swapped to the main disk while it's forked
version ran.

After that the exit system call was also changed. Instead of re-reading
a new copy of the shell it could simply clean up its process table.

As for wait, the primitive version was a sort of message passing
mechanism, sending one WORD size to a receiver or wait for it to be
sent from the sender. But it was a generic message passing mechanism,
there didn't even need to be a relationship between those processes.

It was used like that: the parent shell, after executing a new command,
sent a message to the new process and when the command finishes the shell
would be waiting for the message back from the child, which then would
just exit without sending that message, thus wouldn't exist anymore,
and thus would return an error in the parent saying that it couldn't get
back the message, which finally would let it continue its execution.

This was the primitive for the wait but there was not much use for
the message passing and it was replaced by the more simple and less
generic wait.

This way of waiting also had the issue that the shell depended on a
message that was never be received to continue execution but the forked
process could possible send that message back and disrupt the shell.

This all lead to detached processes (with &) and recursive shell commands.

Later on it was found that processes absolutely needed a way to share
environment, be it path and file descriptors, with their parents,
otherwise commands such as chdir wouldn't work. Here, chdir was
re-implemented as a special command in the shell.

In conclusion, in the early days a process meant "running the
program", its sequence of instructions, on a processor. But gradually it
incorporated more mechanism and facilities within itself and the changing
system around it. It now means "executing a program and its context".

Moreover, multiprogramming evolved into multitasking, multiprocessing,
and multithreading.


# Generic Process State #


Let's go back to our discussion about today's processes.

Processes are state machines, they have an attribute in their structure,
like the other attributes we've mentioned, stored in the process, that
indicates what its status currently is.

The process scheduler is the one that changes this state.

When a process is first created via the fork system call it is marked
as NEW, it's still undergoing process creation.

Its state changes to NORMAL/READY when it can allocate the resources for
execution, putting the executable in memory and filling the stack with
the arguments for example. A NORMAL process is just waiting for the CPU
to be available to start executing, it's ready for scheduling.

From that point on it'll switch between RUNNABLE and STOPPED/SLEEPING
according to the signals it receives. SIGCONT and SIGSTOP respectively.

There are multiple categories for the STOPPED/SLEEPING state. A process
can be waiting for an event, it could be I/O, or it can be stopped because
of signals. The difference between those two is that one is interruptible
sleep and another is uninterruptible sleep, as in one can be triggered
by software interrupts and the other can only be triggered by hardware
interrupts. But that's also tricky because some interruptible states
can be considered uninterruptible because they happen in kernel space
but that's out of scope.

All of that until the process terminates.

When the process terminates it is marked as ZOMBIE, that means it is
waiting to be reaped by its parent, it's undergoing process termination.

If the parent doesn't reap it then it stays in this state until the
parent dies and it's reparented to PID 1 which will then reap it.
I've discussed this amply in the podcast related to zombies.

The last state is TERMINATED but that's not a real state as no process
exists as a TERMINATED process.


# Life Cycle - Process Creation & Inheritance #


We've seen the process states now let's discuss the process life cycle.

Yes, it sounds peculiar but those are two distinct subjects, in the life
cycle we have to discuss the actual creation and deletion, inheritance,
and control of processes (wait & continue). Well, a life cycle is synonym
with life and death.

As you remember from the history we mentioned a bit how processes are
created these days using the UNIX operating system API. It uses the two
step process: They are "forked" from a parent and inherit their context,
and then exec another command over it to become a new program, then they
can call exit to stop existing.

This is how processes are born.

But this is a conundrum as there need to be a first process so that other
process can emerge from it, creating this sort of tree-like structure
of parent-children relationships. There needs to be a root to this tree.

It's convenient because we have a solution to this and it's the PID 1,
the parent of all processes, the mighty init process that is automatically
started at boot time and that promises to stay alive as long as the system
is running. Every process is a copy of the init process in a certain way.


## fork() ##


Let's focus on fork().

As we said multiple times and as you understood from its history,
the fork system call creates a copy of the calling process. It inherits
everything the parent has in memory (thread structure and virtual memory)
and also its file descriptors, it's almost an exact copy, other than to
have a different PID and PPID.

Thus the child will resume execution where its parent left off if it
doesn't call exec directly, meanwhile the parent being suspended.

Fork is the only system call that returns two values, zero for the child
and the PID of the child to the parent. It's made that way so that the
parent can identify and wait on the child, as for the child it's easy
to find out its parent pid by calling `getppid()`.

The usage of fork is the base for what we call the process tree and
process creation, the tree of parent and children processes. The only
process that isn't forked is the init process.

There are other versions of fork available on some system. For instance
the rfork sys-call on some BSDs, and a similar clone() in the Linux
kernel, that creates a new process entry that shares only a selected set
of resources.

Another one of those version of fork is the vfork call, or in some
version the posix_spawn, ensures that the parent will not run until the
child does either exec or exit.

With vfork, the child borrows the MMU setup from the parent and memory
pages are shared among the parent and child process with no copying done,
and in particular with no copy-on-write semantics. Which means that it
won't necessarily allocate more memory, no more page table, but just
shares it, which also means it could possibly overwrite it.

> The vfork() function has the same effect as fork(2), except that the
> behavior is undefined if the process created by vfork() either modifies
> any data other than a variable of type pid_t used to store the  return
> value from vfork(), or returns from the function in which vfork() was
> called, or calls any other function before successfully `calling _exit(2)`
> or one of the exec(3) family of functions.


## Exec family ##


What about exec now.

We've also discussed exec before, it replaces the current process
with a new one, loading the executable into memory, inheriting some of
the context and environment but not the state, nor  memory, nor file
descriptors.

There is a family of exec system calls. The difference between the
variants lays in the way they are called and how the environment of the
new process is set up. You have execl, execlp, execle, execv, execvp,
execvpe.

Here's how to make meaning out of those:

All of them have exec in them, what differs is in the last characters.

There are two categories, the execl and execv, which varies only by the
way the executable path is specified: The v stands for an array that
ends with NULL and the l stands for variadic.

Now with those in mind you can add two things, one is about adding new
environment variables and the other is about specifying if the executable
should be searched in the path. Respectively those are the 'e' and 'p'.


## Wait & Exit ##


So that's it the process is running now the parent can `wait` until it
`exit`s.

The parent waits on its children PIDs and when they exit it receives
back the exit code/status of that child process. The status ranges from
0 to 255, 0 meaning success.

More precisely the exit routine does the following:

- Canceling any pending timers and ticks
- Releasing virtual-memory resources
- Closing open descriptors


## Grouping/Session/Foreground/Background, IPC, And Others ##


There are still some topics to mention about processes: Grouping
and sessions, job control, environment variables, and inter process
communication aka IPC.

Both of those are out of scope to this podcast.

Let's just mention that grouping and session are ways to classify
processes hierarchically, even more than just the process tree.

Sessions are processes belonging to the same TTY and groups are just
sub-groups part of the same session.

Those are important because it allows processes to know on which terminal
they should output or take input from. It's also useful to create that
sort of separation, for example in a session there's only one process
that is active in the foreground at a time but that doesn't always mean
that there's only one process running at a time, the other processes/jobs
could be in the background.

I've discussed this a bit in the podcast about terminals.
I've also dedicated a whole podcast about environment variables.

Regarding IPC there are so many techniques that can be used.

The most interesting for us in this podcast is the one that has a place
in the structure of the process, the signals. Though, pipes could be
said to be there too as they are file descriptors.

Signal handlers are part of this structure as they are software
interrupts, forces context switch, and thus need to be handled at the
kernel level.

There's, again, a whole podcast dedicated to them.


# Process Representation #


We've skimmed the topic of parent and children relationship between
processes, we've also tackled a bit with the process attributes, and
a lot of other things, now let's talk in more depth about the process
structure: How are processes represented in the kernel.

The kernel is a program and like any program it needs structures to
organise data. Processes are not an exception. Most of Unix-like OS are
written in C and thus use C-structures to represent processes.

The technical name for this is the "process control block", PCB, aka
the task controlling block or task struct, or switch frame.

In my opinion the BSD way of representing this structure is cleaner and
less complex than in Linux where it has a bunch of IFDEF mess.

However, most Unix-based OS have the same common components in it.

You can follow along with the show notes if you have them in front of you.

This regroups many of the concepts we've discussed thus far with a lot of
more fine grained details. As we've said earlier, it's whatever context
the process needs to be aware of.

Let's also remind that threads are equivalent more or less to processes,
they are tasks, and that they may use the same structure but share the
same virtual memory.

So that PCB contains:

It has its identification information, the PID. The PID is chosen
differently according to the operating system. Some assign it randomly
and some sequentially. However, as with any resources, this pool is
limited and may run out of PID to give.

It has the memory address space for this program, aka its virtual
memory. In it you can find the image of the executable, in whatever
format or form it takes.

It also contains metadata, links, for accessing shared memory amongst
processes, like with libraries.

The structure contains the state the process is currently in: UNUSED,
EMBRYO, SLEEPING, RUNNABLE, RUNNING, ZOMBIE

It may contain the path or inode/vnode pointing to the currently
executed code.

It contains a list of the file descriptors currently associated with
the process.

It has a creation mask, the umask.

It has an inode/vnode pointing to the current directory of the process.

It has some security attributes ID, such as owner, groups, effective uid.

It contains the processor state and context.

It has a link to its parent ID.

It has signal handling attributes, callbacks to what should be executed
when they are triggered. That includes their state, their mask, and
actions, etc..

It has other security and limit attributes.

The process also has all the timers and counters we've mentioned
before. Keeping track of CPU utilization and ticks.

It has scheduling stuffs, priority and scheduling class.

It may even have some tracing information for debugging.

All of that and even more subtleties we aren't going to mention but that
you'll feel more confident reading now.

Data structurally processes are usually stored in multiple lists, queues,
and trees.

Queues for scheduling, tree for the process hierarchy, and more.

Specifically for scheduling there might be sub-queues used to store
processes of certain types to optimize lookup.

There might be a list with zombie processes that doesn't need to be
schedule but cleaned up and another one with all the other ones.

There might also be a queue for the processes currently stopped and the
ones sleeping.

All of this is accessible from kernel space but not everything is from
the user-space.

You only have access to the limited set of those attributes that you
can manipulate via system calls.

For instance you can't force changing the PID of a process or change
it's virtual memory directly or force context switching.


## Cgroups, jails, & limitation/security ##


Let's bring up some broader subjects, some extra topics.

There are many fancier techniques to manage processes, used for
limitation, containerization, and security.

Those techniques could be using limits or control groups aka cgroups,
or jails, or whatever container.

cgroups for example is a Linux kernel feature that acts on a group of
process to limits, acounts for, and isolates resource usage, be it CPU,
memory, disk I/O, networking, etc..

It provides an interface to control processes group all together.

For example it helps managing the priority (nice) of a group according
to some rules.

The Linux kernel also offers some isolation features, such that processes
run in a separate namespace from other processes, used along with cgroups
it can keep processes from seeing others resources.

There are other environment isolation mechanism such as jails and chroot.


# Debugging #


Let's list some great tools for debugging the processes tree.

The `pstree` command will display the whole process hierarchy.

The `ps` command is the must know command to check what's happening with
processes, it has everything in it, the manpage says it all.

There are `top` and `htop` for live monitoring of processes.

You can trace the process execution of another process via the `ptrace`
system call, it's used a lot in the gnu debugger, gdb.

There's also a tool called `vmtouch` that you can use to check how much
virtual memory things are taking up. (<https://hoytech.com/vmtouch/>)

Those should be enough to get you going.


# Conclusion #


Processes are interesting but hard to tackle as a subject.

This podcast felt a bit limited in its scope but that is because processes
touch everything around the system.

So let's wrap this up.

Those were the processes on Unix, with their flaws and qualities.

And as usual, there's some good content in the show notes so be sure to
check those out.

Cheers.


-------

## References ##

- What is a process  

   <https://en.wikipedia.org/wiki/Process_(computing)>  
   <http://www.theunixschool.com/2012/09/what-is-process-in-unix-linux.html>  
   <http://www.geekinterview.com/question_details/30120>  
   <https://gabrieletolomei.wordpress.com/miscellanea/operating-systems/multiprogramming-multiprocessing-multitasking-multithreading/>  

- Memory & Paging - Aka the issue with time-sharing #

   <https://en.wikipedia.org/wiki/Demand_paging>  
   <https://en.wikipedia.org/wiki/Page_table>  
   <https://en.wikipedia.org/wiki/Virtual_memory>  

- History

   <https://www.bell-labs.com/usr/dmr/www/hist.html>  

- Process attributes/structure - Kernel representation - tree & parenting

   <https://en.wikipedia.org/wiki/Process_control_block>  
   <http://www.khmere.com/freebsd_book/html/ch03.html>  
   <https://www.freebsd.org/doc/en_US.ISO8859-1/books/design-44bsd/overview-memory-management.html>  
   <https://www.ibm.com/developerworks/aix/library/au-speakingunix8/>  
   <https://en.wikipedia.org/wiki/Process_control_block>  
   <http://www.tldp.org/LDP/tlk/kernel/processes.html>  
   <https://www.freebsd.org/doc/en_US.ISO8859-1/books/design-44bsd/overview-process-management.html>  
   <https://encrypted.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwiAr73k2PPTAhWHCsAKHfpyCEcQFggwMAI&url=http%3A%2F%2Fwww.ecs.csun.edu%2F~cputnam%2FComp420%2FPutnam%2FProcess%2520%26%2520Kernel%25202.doc&usg=AFQjCNFGyY-iUFo-TZYlQ02wcIDTEjYXow&sig2=KNf1n4v3uThPE78JaslEcg>  
   <http://www.informit.com/articles/article.aspx?p=366888&seqNum=2>  
   <https://people.freebsd.org/~meganm/data/tutorials/ddwg/ddwg63.html>  
   <http://lxr.linux.no/#linux+v2.6.30.5/include/linux/sched.h#L1117>  

- Generic process state

   <https://en.wikipedia.org/wiki/Process_state>  
   <https://idea.popcount.org/2012-12-11-linux-process-states/>  
   <http://stackoverflow.com/questions/1475683/linux-process-states>  
   <https://access.redhat.com/sites/default/files/attachments/processstates_20120831.pdf>  
   <http://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf>  

- Scheduling

   <http://www.cs.kent.edu/~javed/class-OS10S/OS-AL05.pdf>  
   <https://en.wikipedia.org/wiki/nice_(Unix)>  
   <https://www.ukessays.com/essays/information-systems/compare-cpu-scheduling-of-linux-and-windows.php>  
   <https://stackoverflow.com/questions/16401294/how-to-know-linux-scheduler-time-slice>  

- Life Cycle - Inheritance - Process Creation

   <https://en.wikipedia.org/wiki/Process_lifecycle>  
   <http://www.cs.miami.edu/home/burt/learning/Csc521.111/notes/process-life-cycle.html>  

- fork & Exec family

   <https://users.cs.cf.ac.uk/Dave.Marshall/C/node22.html>  
   <http://condor.depaul.edu/dmumaugh/readings/handouts/CSC343/UNIXprocfuncs.html>  
   <https://en.wikipedia.org/wiki/Fork_(system_call)>  
   <https://www.ibm.com/developerworks/aix/library/au-unixprocess.html>  

- Grouping/Session/IDs - Foreground/Background

   <https://www.st-andrews.ac.uk/ITS/training/unix/unix7.html >  
   <http://nob.cs.ucdavis.edu/classes/ecs030-2002-02/handouts/unixproc.html>  
   <http://heather.cs.ucdavis.edu/~matloff/UnixAndC/Unix/Processes.pdf>  
   <http://ptgmedia.pearsoncmg.com/images/0201702452/samplechapter/mckusick_ch04.pdf>  
   <http://www.tutorialspoint.com/unix/unix-processes.htm>  

- Reparenting & Zombies

   <http://www.brianstorti.com/an_introduction_to_unix_processes/>  

- Signals & Management

   <https://en.wikipedia.org/wiki/Process_management_%28computing%29>  

- cgroups, jails, & limitation/security

   <http://www.informit.com/articles/article.aspx?p=366888&seqNum=9>  
   <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Resource_Management_Guide/ch01.html>  
   <https://www.janoszen.com/2013/02/06/limiting-linux-processes-cgroups-explained/>  
   <http://blog.scoutapp.com/articles/2014/11/04/restricting-process-cpu-usage-using-nice-cpulimit-and-cgroups>  
   <https://en.wikipedia.org/wiki/Cgroups>  

- IPC

   <https://caml.inria.fr/pub/docs/oreilly-book/html/book-ora168.html>  
   <http://www.catb.org/~esr/writings/taoup/html/ch07s02.html>  


