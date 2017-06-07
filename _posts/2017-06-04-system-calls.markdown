---
layout: post
title:  "Unix system calls"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---

# System calls #

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1977))


> The most common Unix system calls.
> A quick overview.

# Intro

System calls are one subject that scares many people.  Actually most
of the low level stuffs happening on the operating system scares a lot
of people.  I admit, I was a bit afraid of dealing with this subject.
Not because it's hard or anything but because it's something that we're
not used to dealing with everyday, it's like a hidden magic spell.

I was also afraid of dealing with this subject because I thought I
could make mistakes while explaining it and giving other people false
assumptions about the mechanism of their Unix operating systems.

But that's ok...
We'll explain everything slowly.

In this podcast we're discussing system calls on Unix operating systems,
it's gonna be a quick overview of what's happening there.
If you're someone that hardly know anything about them then it's the
episode you need to listen to.

Here we go.

I'm venam and you're listening to the nixers podcast!


# What's a system call

## What it is

Let's go over the definition of what is a system call.

A system call is a way to request a service from the kernel of the
OS from the userland.  It's the interface that sits between processes
running on the machine and the operating system.

The services offered by the kernel vary from one OS to another, but as
we'll see there's something that sticks and stays coherent between all
the Unix-like operating systems.

Most importantly the system calls are an abstration layer between the
hardware and the user-space.  It's the same system calls for different
hardware architecture, which means you don't have to change anything to
your program in user-space for it to be portable from cpu brand to brand,
it's ubiquitous.

It also generalizes functions across programming languages, any
programming language can access the system calls.
For the programmer it's just another function to call.

In this definition, we've mentioned a bunch of reasons why systems
calls are useful but what else can we say about why we have
them.

Couldn't this have been done another way?


## Why?


So why do we have an interface between the OS, the processes, and the
hardware?

Let's review our definition of what an operating system kernel is:


> A kernel is the operating system software running in protected mode
> and having access to the hardware's privileged registers. The kernel
> is not a separate process running on the system. It is the guts of
> the operating system, which controls the scheduling of processes to
> achieve multitasking, and provides a set of routines, constantly in
> memory, to which every user-space process has access.


So the kernel is always "In-memory" and scheduling processes for
multi-tasking, and it provides functions. But what's that "protected
mode"?


Most CPUs, most processors, have a security model built-in or also called
CPU modes. The common one is the rings model which specifies multiple
privileges levels at which a software can be executed.  The kernel is
executed in unrestricted access mode, it can do anything allowed by the
cpu, read any part of memory, etc... All other programs run in a layer
above. They are limited to their own address space and can't mess up the
harware devices, they are limited to their level of access to resources.
They are prevented from it at a hardware level.

That is what is meant by protected mode and this is a must in any
multi-tasking operating system.

The concept of rings protection was introduced in Multics, an OS which
highly influenced the development of Unix.

This concept is core to Unix with its preemptive multitasking, where the
cpu clock interrupts rapidly and routinely between processes, switching
control from one to the other.

So what does this have to do with system calls, you might ask.

Programs need to access devices and components otherwise nothing would work.

That's where system calls enter the scene.

They provide well defined and safe implementations for those operations.
The OS handles the highest level of privileges and allow applications
to request access to them via system calls.

The system call initiate an interrupt or also called "trap" which puts
the CPU into elevated privilege and then it passes control to the kernel
which handles arguments and determines if the call should be done or
not. It then does its thing and return to the normal privilege level
and pass back the control to the calling program.

This is similar to multitasking where the cpu switches control using
interrupts, as we've said.

Couldn't this have been done another way?  Instead of having a central
unit that controls the access to the important parts of the system and
hardwares, a part that is there for us not to mess up our machine.

Well, no current operating systems do.
There is however a concept called an exokernel where the operating system
doesn't offer a general abstraction of the resources but forces the 
application developers to make decisions about those hardware abstractions
instead of the kernel.

That is in opposition with a microkernel and a monolithic architecture.
The monolithic architecture is the most common among Unix-like operating
systems.

So, then system calls are there as a way to protect you from yourself
destroying your machine.


That was the why.
Now let's take a look at those system calls, from an outer point of view
and inner point of view.


## What it looks like to the programmer - Library as middle man


As we said, system calls are like a library or API that sits between
normal programs and the kernel.


On Unix-like systems, that API is usually part of an implementation of
the C library (libc), such as glibc, that provides wrapper functions for
the system calls, often named the same as the system calls they invoke.

Those system calls can be implemented across programming languages (partly
because other programming languages have a lower C layer but they can
also be done directly in the language if it has assembly facilities) and
will look to the programmer just like another function. But in actuality,
the code for the function is contained within the kernel.

That C library wrapper, other than exposing an ordinary function to the
outside world, is made in a way that is modular and portable.

It's not actually the C library but the assembly code that is implemented
in it.

It works this way:
The wrapper places the arguments to be passed to the system call in the
appropriate register in the appropriate way and also sets a unique system
call number for the kernel to call.

This way the API is portable, those unique system call numbers are stable.

So the call to the library function itself does not cause a switch to
kernel mode directly, it's when this part of the code with the code or
number of the system call that is sent to the kernel that it's executed.

This is highly implementation and platform dependent unlike the number
assigned to the system call itself at that level above.

This level is called the application binary interface and it unstable,
it changes through time. However, the name of the system calls don't,
like we said: They are an abstraction.


## Super little Details


At the low level, there are differences between the Unix-like OS in
the way the system calls are managed and received by the kernel.

The Linux and BSDs both need to have them written in assembly.

FreeBSD supports both the BSD style of system calls and the Linux style.

In the BSD world they use the C calling convention, also known as cdecl,
which stands for C declaration. A declaration that originates from the
C programming language.

That means that any program written in any language can access the kernel, as
long as they can understand C functions.

The kernel is access using int 80h, also both on Linux and the BSDs.

`interrupt vector 0x80`

Specifically the convention for Free|Open|Net|DragonFly]BSD UNIX System
Calls is that they are done by passing the parameters by pushing them
to the stack and then doing the int $0x80 instruction.

```
kernel:
	int	80h	; Call kernel
	ret

open:
	push	dword mode
	push	dword flags
	push	dword path
	mov	eax, 5
	call	kernel
	add	esp, byte 12
	ret
```

On Linux the difference is in the way the parameters are passed to the
system call.
The parameters, however, are not passed on the stack but in EBX, ECX,
EDX, ESI, EDI, EBP: are used for passing 6 parameters to system calls.
The return value is in %eax. All other registers (including EFLAGS)
are preserved across the int 0x80.
So, ABCD, registers, and they're filled in the order of the CPU endian.
```
open:
	mov	eax, 5
	mov	ebx, path
	mov	ecx, flags
	mov	edx, mode
	int	80h
```

For both Linux and BSDs the system call number is passed by filling the
%eax register.

And more generally speaking the arguments are filled just before that
but in different ways.

Let's note that FreeBSD gives you the choice to use the Linux way of doing
system calls only if the kernel has Linux emulation installed.
Moreover you need to specify that a program is branded Linux.
You do that using the brandelf tool:

% brandelf -t Linux filename

As a note here, if you want to write any program in assembly it'll always come
down to this: You wanna interact with your system so you're gonna be doing
the usual jumps and loops but other than that it's all just about filling
registers to do the system calls and managing memory.


Let's now discuss more about the CPUs.


# CPU - The underlying principles


As we've said, system calls in most Unix-like systems are processed in
kernel mode which is done by changing the processor execution mode to
a more privileged one.
This, however, does not mean that there's gonna be a process or context
switch, it's not a switch of process, it's just a temporary delegation
to the kernel while the calling process is waiting for the response.

We've mentioned that earlier.

But what does happen when it's running in a multithreaded application.
As we know, threads in the Unix world are small processes with their
own IDs.

There are many ways to handle this situation.
Most Unix-like OS use the one-to-one model, which means that every threads
get attached to a distinct kernel-level thread during the system call.
This solves the issue of blocking system calls.

Let's mention that there are other ways to do that such as:

Many-to-one model:
All system calls from any user thread in a process are handled by a single
kernel-level thread. Which means every thread has to wait for the other
to finish

Many-to-many model:
In this model a pool of user threads is mapped to a pool of kernel
threads. All system calls from a user thread pool are handled by the
threads in their corresponding kernel thread pool

Hybrid model:
This model implements both many to many and one to one model depending
upon choice made by the kernel. This is found in old versions of IRIX,
HP-UX and Solaris.

Let's go back to the CPU.

Different architectures give out different facilities.

One of them for example is found in the x86 instruction set that contains
the SYSCALL/SYSRET and SYSENTER/SYSEXIT, both implemented by AMD and
Intel vendors. Those are fast control transfer instruction designed to
quickly transfer control to the kernel for a system call without the
overhead of an interrupt

Another one of those nifty mechanism is the old x86 call gate, which allows
programs to directly call a kernel function using a safe control transfer
mechanism.


Let's talk about real examples of system calls and what are the ones
available on most Unix.


## Examples


Let's read a little excerpt

> On Unix, Unix-like and other POSIX-compliant operating systems, popular
> system calls are open, read, write, close, wait, exec, fork, exit, and
> kill. Many modern operating systems have hundreds of system calls. For
> example, Linux and OpenBSD each have over 300 different calls, NetBSD
> has close to 500, FreeBSD has over 500, while Plan 9 has 51.

POSIX... Wait, we haven't mentioned POSIX yet.

What's that thing?
Let's go!


# POSIX?

What's that POSIX thing?
Posix stands for Portable Operating System Interface and it's a family
of standards specified by the IEEE Computer Society for maintaining
compatibility between operating systems.

POSIX standards are about the API of an OS and the command line shells
and utility interfaces of Unix-like OS.

So, it's a standard that is there for the compatibility between Unix-like
OS but as with all standards the list of points to follow is huge and
most just partly fullfil it and that's not really an issue as long as
they take the most important bits and pieces.

All the modern and most popular Unix-like OS are only partly adhering to it.
Only OSX amongst the "new team" is fully compliant.

Other than that you have AIX, HP-UX, IRIX, Solaris, Tru64, UnixWare,
QNX, Neutrino

Weirdly enough those are all mostly closed source operating systems
which is suspiciously annoying.

But not being fully compliant doesn't mean that the system isn't Unix-like.

## With Unix?

There's another standard called the Single UNIX specification.

It shows if a system can be compliant to be qualified as a "UNIX" trademark.
Again a very commercial way of seeing what Unix really is.

And very few BSD and Linux-based operating systems are submitted for
compliance with the Single UNIX Specification. Also, again, only closed
source Unix-like OSs adhere to it.

Unix is more about the philosophy and the way of working with this
multitasking OS, taking the spirit back from the Bell Labs.


Well, what does that all have to do with system calls?
It turns out that those standards have a set of functions that are
sometimes implemented as system calls.


## Categories of syscalls


POSIX calls can be implemented in the standard libarary or as system call.

It is a specification and does not "know" about syscalls which,
in the POSIX view, are an implementation detail.

Nothing mandates the way they are implemented.
They can even be implemented in non-Unix like OS.

To know which one are system calls you need to see which one overlaps
with them.

Let's talk about POSIX.

POSIX is divided in two parts:
The system interfaces, and the commands and utilities

We're not interested in the commands and utilities and only interested
in the system interface, and only if those are also system calls.

There are 5 main categories of system calls:
* Process Control
* File management
* Device Management
* Information Maintenance
* Communication


They overlap with some of the features in POSIX.
Such as process creation and control in POSIX overlaps with process control,
Clock and timers in POSIX overlaps with information maintenance.

What is to know here is that there are way more POSIX specifications
than would be needed for system calls.
So there's more of a chance that a POSIX specification would not be a
system call.

The list of POSIX specifications are quite extensive.
Ranging from thread creation, managing shared memory, pipes, timers,
bus error, signals, etc..

You can read more about those from the links in the show notes.


```
POSIX.1: Core Services (incorporates Standard ANSI C) (IEEE Std 1003.1-1988)
	Process Creation and Control
	Signals
	Floating Point Exceptions
	Segmentation / Memory Violations
	Illegal Instructions
	Bus Errors
	Timers
	File and Directory Operations
	Pipes
	C Library (Standard C)
	I/O Port Interface and Control
	Process Triggers

POSIX.1b: Real-time extensions (IEEE Std 1003.1b-1993, later appearing as librt—the Realtime Extensions library)[8])
	Priority Scheduling
	Real-Time Signals
	Clocks and Timers
	Semaphores
	Message Passing
	Shared Memory
	Asynchronous and Synchronous I/O
	Memory Locking Interface

POSIX.1c: Threads extensions (IEEE Std 1003.1c-1995)
	Thread Creation, Control, and Cleanup
	Thread Scheduling
	Thread Synchronization
	Signal Handling
```


# The most common ones


To find the most common let's do something crazy.
Let's check the source of openbsd, netbsd, linux, and freebsd, and list
the common ones, we can even know if they are in POSIX.

That will answer if the common system calls are all POSIX or if there are
some exceptions.

There are 136 common system calls betwen openbsd, netbsd, linux and freebsd.

They are the following:

```
accept
access
acct
bind
chdir
chmod
chown
chroot
clock_getres
clock_gettime
clock_settime
close
connect
dup
dup2
execve
exit
faccessat
fchdir
fchmod
fchmodat
fchown
fchownat
fcntl
flock
fork
fstat
fsync
ftruncate
getdents
getegid
geteuid
getgid
getgroups
getitimer
getpeername
getpgid
getpgrp
getpid
getppid
getpriority
getrlimit
getrusage
getsid
getsockname
getsockopt
gettimeofday
getuid
ioctl
kill
lchown
link
linkat
listen
lseek
lstat
madvise
mincore
mkdir
mkdirat
mknod
mknodat
mlock
mlockall
mmap
mount
mprotect
msgctl
msgget
msgrcv
msgsnd
msync
munlock
munlockall
munmap
nanosleep
open
openat
pipe2
poll
preadv
ptrace
pwritev
read
readlink
readlinkat
readv
reboot
recvfrom
recvmsg
rename
renameat
rmdir
sched_yield
select
semget
semop
sendmsg
sendto
setgid
setgroups
setitimer
setpgid
setpriority
setregid
setreuid
setrlimit
setsid
setsockopt
settimeofday
setuid
shmat
shmctl
shmdt
shmget
shutdown
sigaltstack
sigpending
sigprocmask
sigsuspend
socket
socketpair
stat
symlink
symlinkat
sync
truncate
umask
unlink
unlinkat
utimensat
utimes
vfork
wait4
write
writev
```

Only 5 aren't POSIX:

flock
ioctl
mount
reboot
wait4

But overall they're mostly POSIX, 97% of the time when they are common
with other OSs.


----


Categories a system call can be part of:


```
Process Control
	load
	execute
	end, abort
	create process (for example, fork on Unix-like systems, or NtCreateProcess in the Windows NT Native API)
	terminate process
	get/set process attributes
	wait for time, wait event, signal event
	allocate, free memory
File management
	create file, delete file
	open, close
	read, write, reposition
	get/set file attributes
Device Management
	request device, release device
	read, write, reposition
	get/set device attributes
	logically attach or detach devices
Information Maintenance
	get/set time or date
	get/set system data
	get/set process, file, or device attributes
Communication
	create, delete communication connection
	send, receive messages
	transfer status information
	attach or detach remote devices
```

# Tips and tools

man syscalls
Check the source

Tools such as ktrace (BSD), strace (Linux), DTrace (Solaris),  and
truss allow a process to execute from start and report all system calls
the process invokes, or can attach to an already running process and
intercept any system call made by said process if the operation does
not violate the permissions of the user. This special ability of the
program is usually also implemented with a system call, e.g. strace is
implemented with ptrace or system calls on files in procfs.

-----

References:


* <https://en.wikipedia.org/wiki/System_call>
* <https://en.wikipedia.org/wiki/POSIX>
* <https://en.wikipedia.org/wiki/Protection_ring>
* <https://docs.python.org/2/library/posix.html>
* <http://php.net/manual/en/ref.posix.php>
* <http://stackoverflow.com/questions/30155858/are-unix-linux-system-calls-part-of-posix-library-functions>
* <https://en.wikipedia.org/wiki/Single_UNIX_Specification>
* <http://www.linuxjournal.com/article/4048>
* <http://www.catb.org/esr/writings/taoup/html/ch03s01.html>
* <https://www.freebsd.org/doc/en/books/developers-handbook/x86-system-calls.html>
* <http://stackoverflow.com/questions/2535989/what-are-the-calling-conventions-for-unix-linux-system-calls-on-x86-64>
* <https://en.wikipedia.org/wiki/X86_calling_conventions>
* <https://en.wikipedia.org/wiki/Single_UNIX_Specification>
* <http://man.openbsd.org/OpenBSD-5.1/syscall.9>
* <http://netbsd.gw.com/cgi-bin/man-cgi?syscall+2+NetBSD-current>
* <https://pc2.uni-paderborn.de/fileadmin/pc2/media/staffweb/Andre_Brinkmann/Courses/Operating_Systems_WS0910/Exercise%201.pdf>
* <http://man7.org/linux/man-pages/man2/syscalls.2.html>
* <http://bxr.su/OpenBSD/sys/kern/syscalls.c>
* <http://bxr.su/NetBSD/sys/kern/syscalls.c>
* <http://fxr.watson.org/fxr/source/kern/syscalls.c>
* <http://plan9.bell-labs.com/sources/plan9/sys/src/libc/9syscall/sys.h>
* <http://tldp.org/HOWTO/Assembly-HOWTO/linux.html>
* <http://tldp.org/HOWTO/Assembly-HOWTO/hello.html>
* <http://asm.sourceforge.net/syscall.html>
* <http://docs.cs.up.ac.za/programming/asm/derick_tut/syscalls.html>
* <https://en.wikipedia.org/wiki/Interrupt_vector_table>
* <http://cs-pub.bu.edu/fac/richwest/cs591_w1/notes/wk3_pt2.PDF>


