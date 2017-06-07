---
layout: post
title:  "File hierarchy"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---


# Unix file hierarchy

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2006))


Files, the predominant representation of everything on Unix, how are
they scattered around?

-----


* What - The start and meanings
* Who owns it now and when
* Iterative makeup adjustments
* So what - The Issues
* Now what - Reviewing it
* Conclusion


-----

# What - The start and meanings

## Principle - What are files

The filesystem is represented as a rooted tree of directories where the
root is denoted by the '/' character.
When specifying that a file or directory is under another a '/' is also
used as a separator. For example /bin/init is a file under the root
directory which is under the bin directory.

Everything is under that '/', it doesn't matter if it's a hard disk,
a network card, or your favorite game. They're all somewhere under
that root.

There are 3 main filetypes: ordinary files, directories, and special files
such as devices and virtual files.

However, the unix directories don't literally contain those files.
Instead they contain their names and pair them with a reference to their
inode number which contains the file and its metadata.  That explains
why we can have links hard and soft.

## Original Layout

So, with that in mind, what was the original layout or directory structure
under the root in the original unix version.

Let's review the layout from the original UNIX Programmer's manual
hier(7) manpage.  You can get it from the show notes.

    /      root
    /dev   devices
    /bin   utility programs
    /lib   object libraries and other stuff
    /etc   essential data and dangerous maintenance utilities (passwd, group, motd, init, rc)
    /tmp   temporary files, usually on a fast device
    /usr   general-purpose directory, usually a mounted file system

This seems highly minimal compared what we currently have.
Where does all those new directories come from, why were they added?

Let's first blame someone by digging into who's in control of the
current standards.


# Who owns it now and when


Amongst all the Unix standards out there, such as the single UNIX specification
and the stuffs from the open group, the one that holds the hierarchy is the
Filesystem Hierarchy Standard, FHS.
It's under the governance of the Linux Fondation.

Like all standards it's meant as a guideline and it doesn't have to be
followed thoroughly, it's just a reference.

Until today there are only Linux distributions adhering to it, and thus
the BSDs and other unix-like variants don't necessarily preach its words.

So what are they trying to achieve and how?

They want to predict the location of installed files and directory,
to make it less chaotic, by specifying what every area of the system
should contain, the principle behind them, and the mimimum files and
directory requirements.

Let's unpack that idea of principle behind directories.

They wrote down standards for everyone one of the directory that should
appear under the root.
Another one of the distinction they put forward is the one between shareable,
unshearable, static, and variable, directories.

Typically, everything under /var is of variable size, /usr and /opt are
shareable and everything else is unshareable and static.

Following that logic, /usr and /opt can be left out of a system and the
remaining content should be enough to boot, restore, recover, and/or
repair the system.

Now let's jump into the real deal, what are they prescribing we should
definitely have under the root directory and what are they mentioning
that is special about those specific dirs.

Let's say here that instead of the original 6 directories there is now
14 directories, that's 8 brand new directories under the root.

```
Directory     Description
bin           Essential command binaries
              (They even have a list of must have commands under that dir,
               such as cat, cp, date, dd, kill, ls, etc.. the usual
               stuff that are correspondant with system calls)
boot          Static files of the boot loader
              ( Which was there before but not as a directory but as a
               file, you might have wondered where it was booting from
               in the original unix without that directory, so that
               explains it.)
dev           Device files
etc           Host-specific system configuration
lib           Essential shared libraries and kernel modules
media         Mount point for removable media
mnt           Mount point for mounting a filesystem temporarily
opt           Add-on application software packages
run           Data relevant to running processes
sbin          Essential system binaries
srv           Data for services provided by this system
tmp           Temporary files
usr           Secondary hierarchy
var           Variable data
```

Why did all those new directories appear?
What the hek happened?
Aren't we supposed to be minimalists, where does that come from?


# Iterative makeup adjustments


Where did all those new directories spurt out from?
It's all because of an infectious aging process that slowly started in
the early unix days.


## Back in the days

Remember the 6 directories under root in the original Unix.
Well, there's something that needs to be mentioned.
If you noticed, there's no /home so where did the home directory go?
/usr, the general purpose directory was in fact where that directory was
stored. It meant "user", and not "unix system resources".

This started because there was not enough size on the medium to store the
directories that grew fast, such as the user directory.

And thus /usr was mounted on a separate filesystem.

Early on, the biggest binaries where moved to that separate filesystem,
both because they weren't essential to boot the system and because
they've ran out of space on the first medium.

That was when the /usr/bin, /usr/lib, and /usr/tmp where introduced.
All of them non-essential for the minimal system but still needed by users.

This notion of splitting across several places became inherent.

After Unix got a bit popular outside of the Bell Labs, people wanted to
install their own utilities without infringing on the default installation.
That means keeping their custom programs while they can update the
whole system.

And thus they introduced another split under /usr, the /usr/local, which
contains a replica of the higher hierarchy /usr/local/bin, /usr/local/lib.

Yet again, another split happened when independent software vendors
wanted to offer their packages. They didn't want to interfere with users
and they didn't want to mess up the whole install and thus places their
packages under /usr/local/vendor, as another replica of the hierarchy,
/usr/local/vendor/bin /usr/local/vendor/lib.


That's a lot of replica of the same hierarchy in multiple places.

That's about /usr but there are many other directories that appeared.

Let's talk about /var, where did this come from?

We talked about variable sized directories, right, and about problems
with disk space.  This is where I'm going at, the log directory, the
spool, and tmp directories, were all under /usr before but because they
grew in size they were moved to a brand new directory under the root:
/var so that it could be placed on another disk.

Size was a really big issue at the time, it brought more schism in
the hierarchy.

Having /usr on another disk and moving the binaries wasn't creating
enough space to store the programs.

Anyway, another thing with commercial vendors happened, they suddenly
wanted to leave behind the /usr/local/vendor hierarchy and move it to
/var/opt because it gave them the flexibility to offer packages that
couldn't be shared across multiple machines incidentally. Also, those
packages were more or less optional, think of it like a local repository
of proprietary packages.

Soon enough, vendors thought, insidiously, that it would be better
to store all those packages under /opt instead. Bringing yet another
directory under the root.

In the same manner, because of the new clutter created, new directories
started to appear under root, for example the home directory, which was
originally /usr and now is independant under root.
The /usr had now become too crowded for what it was original designed for.

Ironic, isn't it?

The fancy names "U NIX s ource r epository" or "U NIX s ystem r esources"
are all made-up names, and it's too late to rename them anyway.

By the way, you can still install packages in your home directory, you
just have to install them in ~/.local and put the settings in ~/.config.

More and more artificial justifications appeared and people are now
following them.
That's one reason why the FHS exists, to formalize those nebulous ideas
we have about those places on our system.

Legacy mixed with pompous new creative and destructive ideas.

So if you ask yourself where you should install your stuffs or where
you should look for when searching for specific things you better take
a look at the FHS because you indeed need a standard to be able to make
sense of this.


# So what - The Issues


The world didn't crumble, so what could be the issue?

Well, we've been stacking problems, piling them up years after years,
so it might someday eventually if we don't manage the mess.

There are many arguments on the current issues with the hierarchy.

Let's go over them.

One of them was already mentioned at the end of the previous section,
the confusion that this iterative dichotomy has brought.

The hierarchy has experienced a continuously increasing entropy on
multiple scales. Starting from the hierarchy of the original Unix Seventh
Edition everyone has put their hands on it.

It's hard to know where to place your executable because we are saturated
with different valid contestants for this place.

The confusion has another catalyst and that is legacy.

The history of /usr alone is mind boggling, it was first the user directory,
then separated to another disk to host big stuffs, then the home directory
was removed from it, and now it's vaguely if even used as a directory hosted
on another partition. And thus they had to reintroduce this concept by
creating /usr/share, which would be the shared directory for multiple
architecture.
And again, this new directory under /usr is not commonly shared amongst
machines, bringing more questions about its existence.

On the topic of questioning the current existence of some directories,
many others are criticised. For example, the issues with size aren't
relevant as of today, and thus the distinction between /usr/bin and /bin
and others is minimal.

In so far as booting with a minimal rescue system is concerned, it doesn't
make sense today either, as we can boot from external medium to rescue
a system.

Moreover, having multiple binaries in multiple places poses the issue
of not knowing if you are invoking the right program at the right time,
as there can be many copies of the executable under different places.

It obviously also brings 3 obvious problems: simplicity, maintainability, and
flexibility, which are at stakes.


#Now what - Reviewing it


Ok, it's not that great but are there alternatives.

There are some distributions such as  morpheus linux and sabotage linux
that try to stay true to the original Unix spirit.

Morpheus Linux is maintained by the guys at suckless.org so it's peer
reviewed by persons that take that topic at heart.

Sabotage Linux takes the approach a bit differently by completely omitting
the /usr and /sbin directories.

There's also those that take the time to review the concept and reshape
it, make it more reflective of what we need today, bring it to date.

I could find two of those projects:

* objectroot
* GoboLinux

Each of them redefine the hierarchy of the filesystem while at the same
time retaining backward compatibility, which sounds awesome.

GoboLinux has longer user-friendly names for the directories, for instance
executables are all stored under /Programs and under /Programs there are
sub-directories for the programs that stores them by versions.

One thing to notice with GoboLinux is that it only has 6 directories
under the root, just like the original Seventh Edition.

They are the following:

* Depot
* Mount
* System
* Files
* Programs
* Users

Also, it was created by the guy that wrote htop and LuaRocks, so cool.

objectroot is another approach.

While GoboLinux is a Linux distribution, objectroot is more of a new
set of rules, easier to apply on current distributions.

It has 5 directories under the root and they are:

    /hosts — Operating system instances.  [ More ... ]
    /org   — Application and system software.  [ More ... ]
    /users — Users' home directories.  [ More ... ]
    
    /boot  — Second-stage bootloader. Optional.
    /mnt   — Temporarily mounted filesystems. Optional.
    
    /boot and /mnt being optional, that makes only 3 essential directories.

That seems minimal, why is that?
/users is pretty obvious to understand but what about the others.

/org contains shareable softwares between machines.
/hosts brings the concept of distributed computing, it contains sub
directories with specific files for every machine, /hosts/self being
the machine you are sitting at.
Under that directory you find the typical stuffs.

You can know more about those different hierarchies by taking a look at
their respective websites.

# Conclusion

That's about it.
Now you're enlighten about the dark history of the unix hierarchy of today.

There's not much you can do about it though.
The least you could possibly do is to take a look at the FHS and follow the
standards.

A good thing to mention here is that most unix variants have their own
hier(7) manpage and they're pretty similar, minus the little details.
So stick to that.

Also, don't get the bright idea of splitting stuffs into a new directory
under the root, just no, stop that.

It just won't make it easier...
No, no, I said no, don't do that, bad idea.

Will we ever learn?


# Music

Soundtrack by kronstudio and it's GEM.
Checkout their website they have amazing tunes there.

-----

References:

- <https://archive.org/details/bstj57-6-1905>
- <http://cm.bell-labs.com/7thEdMan/v7vol1.pdf>
- <https://en.wikipedia.org/wiki/Unix_filesystem>
- <https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard>
- <http://www.pathname.com/>
- <http://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html>
- <https://wiki.linuxfoundation.org/lsb/fhs>
- <http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/Linux-Filesystem-Hierarchy.pdf>
- <http://objectroot.org/articles/brief-history-of-hier/>
- <http://gobolinux.org/index.php?page=doc/articles/clueless>
- <http://gobolinux.org/index.php?page=k5>
- <http://lists.busybox.net/pipermail/busybox/2010-December/074114.html>
- <http://askubuntu.com/questions/130186/what-is-the-rationale-for-the-usr-directory>
- <http://sabotage.tech/>
- <http://morpheus.2f30.org/index.html>


The man pages:
- man 7 intro
- proc(5) {linux}
- hier(7)
- <http://www.pathname.com/fhs/pub/fhs-2.3.html>
- <http://man.openbsd.org/OpenBSD-current/man7/hier.7>
- <https://www.freebsd.org/cgi/man.cgi?query=hier>
- <https://www.freebsd.org/cgi/man.cgi?query=hier&manpath=2.9.1+BSD>
- <https://www.freebsd.org/cgi/man.cgi?query=hier&manpath=ULTRIX+4.2>
- <https://www.freebsd.org/cgi/man.cgi?query=hier&manpath=SunOS+4.1.3>
- <https://linux.die.net/man/7/hier>
