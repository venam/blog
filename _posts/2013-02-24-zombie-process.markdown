---
layout: post
title:  "zombie process/thread"
date:   2013-02-24
categories: unix
---

Hello readers,

A zombie process is a child process/thread that is still waiting for its parent signal but the parent process is not running anymore, so the thread is doing nothing.
In ps you can notice a zombie process by the little Z as a STAT.

```
3699 tty1     Z      0:00 [zombie.sh] <defunct>
```

Why do zombie process appear?
Because of a program that didn't have good semaphore or mutexes. So it's mainly the programmer's fault.
Will the zombie process use all my cpu?
Nope, like the name says a zombie process is not doing anything and will be extremely low on resources.

How do I kill a zombie thread?

You can't kill a zombie thread. How can you kill something which is already dead?

But isn't there a way to clean them?

Normally the Linux system (Here I don't know about other OS but for Linux it is the process pid 1, the init/systemd) clean the zombie thread at the end of the execution of the mother thread if it was attached (indirectly) or directly cleaned by the programmer via system call.

However there's another way to do it : find the mother thread (via ps -l or looking at the tree in htop or top)
and sending the signal -INT or -HUP to the mother thread.

This might have different effects depending on how the signals are handled by the program. Beware that this might end the process.


May the shotguns against zombies be with you!

(some information might be wrong or not accurate, so don't rely on me and do your own research)
