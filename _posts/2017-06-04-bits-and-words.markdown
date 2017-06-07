---
layout: post
title:  "Bits and words"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---

# Bits and words

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2071))


## Intro ##


The topics in this episode are fairly simple, even basic, but I'd like
to tackle them from a different perspective.

The information in a computer is represented in binary form. For them
the bit is the basic unit of this information. Bits are binary, and
binary means that there can only be two states, or it's the first or
the second state, nothing else.

The CPU has some built-in commands to manipulate a fix set of those bits.
The set of bits with a fixed size for a processor, that this processor
is designed to handle at a time, is called a word. This varies between
processors.

Because of how tied and low level binary operations are, they are
operations directly supported by the cpu, they are faster than higher
level abstractions and consume less memory space. For this reason it
is sometimes chosen, at the sake of clarity, by some programmers as a
data structure.

We're going to discuss some topics related to words and some usages of
bitwise operations in Unix.


## Tricks In programming languages and the shell ##


In today's world we rarely have to deal with binary operations, unless
we deal with embedded system, everything has been abstracted layers
over layers.

We've inherited all those fancy wrappers but under them lies the work
of the multiple developers who created them.

But it's not wrappers everywhere, there are many places at the user
level where bits are still relevant.

Bits can be manipulated in most programming languages for instance,
you can even do that in shell scripts.

The languages offer some but not all interfaces to those operations that
are one to one correspondant to the CPU instructions.

For example, the C language allows the shifting operation which like
the name implies shifting the bits inside of a word.

Those operations, called bitwise, are fairly standard, and as you might
expect, with years of accumulated knowledge some structures created
themselves around bit manipulation.

Those structures are the ones used to create the abstraction layers we
currently have, and we can still use them for the purpose of efficiency.

I've linked in the show notes two websites which regroup some of those
tips and structures created over time for optimizing common procedures
using bitwise operations.

But, there's a hick here. In some languages those optimizations are not
relevant. They might already be implemented and optimized in the core
library of the language, like C for instance, or the compiler might
know better than you how to optimize the software you are writing. Or
the opposite, the compiler might modify your optimizations at compile
time and render it useless.

Nevertheless, having a look at how certain things can be done more
efficiently and stored using bit-like structures is interesting.


## Unix timestamp ##


A CPU does operations on words, that word, as we've said is a fixed
number of bits.

Today most computers use 32bits or 64bits words.

You might have heard of the deprecation of 32bit machines and wondered
why this was.

That stems from the way some people thought of storing some values on
the long run, over a long period of time.

Values that keep a counter in some data type that is tied to the word
size, which is fixed and is bound to run out of space on the long run.

The most talked about instance of this, though there are many other
examples, is the Unix timestamp which is represented by a simple signed
integer counting the number of seconds since Thursday, 1 January 1970
in UTC.

Not to go into the details but that value cannot be larger than the word
size and thus, as with any counter it'll keep incrementing. The issue is
that in a 32bit machine all the bits of the integer counter will become
1s the 19th of January 2038 and after that the behavior is unexpected
and may vary.

But you don't have to wait until 2038 to test what happens when an
integer overflows, yes, that's the term used to say that all the bits
have been filled. You can already test this with a simple script.

Now we can't change the past and we have to move on, maybe choosing an
integer wasn't the best way to represent time, maybe it was, but there's
nothing to do about it.


## Permission bits ##


One still great relevant usage of bits to represent a concept is the
way file permission is set on Unix-like systems.

File permission is a way to specify/control access rights to files.

Generically speaking, there are two main ways to do this these days
classical or traditional modes and the ACL, Access Control list.

ACL is a superset of the classic Unix file modes that allows more fine
grained configurations.

So how does the permission on files works?

There are only 3 different types of permissions on Unix and those 3
different types can be assigned to 3 different classes of users.

The 3 types of permissions are: read, write, and execute.
Because there are only 3 of them you can easily represent them by a set
of 3 bits that are either on or off for the specified permission.

And that's how it's implemented, the first bit is for read, second for
write, and third for execute.

The 3 classes we talked about are like groups that can be assigned a
different set of those 3 bits. They are the owner class, the group class,
and the other class.

And so you can represent the 3 bit sets of the 3 classes in the same
order and that gives you a big set of 9 bits that you can read.

Those bit sets are also represented in octal or decimal notation for
every class (here it doesn't matter because the number are alway less
than 10), so for example the 777 permission means that all the classes
get all the privileges on the file.

If you're having difficulty with the representation you can always go
back to the binary to octal conversion chart.

You obviously can also get back the file permission in a more human
readable form a symbolic notation if you prefer to.

Let's also mention that there are 3 more modes or bits that can be turned
on in a file the exact same way, the set user ID bit, the set group ID,
and the sticky mode.

This way of activating and deactivating modes is clean and elegant and
fits well that concept.


Relevant manpages:  
```
chmod(2)
chfn
newgrp
chown
chgrp
```

## FS Attributes and ACL ##


The file permissions example has given us an overview of how a group of
bits is a great way to represent configurations or settings or modes or
anything that are either on or off.

Isn't that what bits are for anyway?

Well this type of bit-like structure is also used to configure file
attributes that are specific to the file system in use.

BSD-like systems have a chflags command to change those attributes while
Linux systems running on ext file systems have the chattr command and
lsattr command.

Many other Unix-like system have the equivalents.

Overall it works the same way as with permission bits, you either set
an option available on or off on a file.

For instance, you could tell the file system that a file is immutable
on ext4 by running `chattr -i file`.

Refer to the manual page of the command used to change the attributes
for the list of all the attributes you can change.

However, it's not all rainbows and butterflies, bits aren't very flexible
and are limited to either setting something on or off.

And that is the reason why the ACL (access control list) was created
and is now part of POSIX.

It let you specify permission for a specific user for example, which
wouldn't be possible with just bits.

Check the getfacl and setfacl commands manpages or any of the link in
the show note for more info on that.


## Bitmasks, masks? ##


Ok, so we can represent things by bits, it's cool and compact.

That also means we can apply some of those bitwise operations we talked
about on those bits.

Let's discuss one of them in particular: masking.

Masking bits is the process of taking a group of bits and another group
of bits as a mask and use it in a single operation to set some bits of
the first group to either on or off.

For instance you can do an OR operation and use a mask to set some bits
to 1 or use an AND operation to turn some bits to 0.

The AND mask can also be used to query the status of some bits as it'll
only return bits with the 1 value if both are 1s.

Overall, that's a nice bitwise operation where you metaphorically overlap
a group of bits over another to get the result you need from it.


## umask ##


One of the application of masking in Unix is `umask` which appeared
first in the version 8th of UNIX.

umask is a system call with a symetrical command line program or built-in
shell command to manipulate a mask that controls what file permissions
will be set for newly created files.

It also goes by the name of file mode creation mask.

The mask is applied over the default permission mode and the operation
used between them is the negation, so it's equivalent to an AND operation
between the default permission and the negation of the mask.

In simple term it means that whatever you enable in the mask will be
disabled as a permission.

So for example the default permission for files is usually 666 then when
applying a mask of 000 it will leave it as 666 but applying a mask of
006 will make creating a file have the permission of 660.

The default permission for directories is usually 777.

Now the question that arise is "How to set the default file permission
for a certain disk, or file, or whatever".


## Default Permissions & Mounting ##


The answer is not as straight forward as it might seem. It depends on
multiple small factors all around the system.

When creating a new user you can specify the initial permission of the
home directory.

There are a bunch of configuration files like /etc/login.defs and
/etc/adduser.conf that are checked for that or you might specify it on
the command line when calling adduser or useradd commands.

in /etc/adduser.conf you have the `DIR_MODE` value to set the permission
of the home directory upon creation.

In those files you can also set the default umask applied to the users.

But still, this is not entirely related to the umask, it's not the base.

The default permission may also depend on some of the special bits that
are set on the file.

Those could be the filesystem dependent attributes or the other special
ones we talked about like the sticky bit.

For instance, when a directory's sticky bit is set, only the file's owner,
the directory's owner, or the root user can rename or delete the file.

But that actually only affect already created files, so doesn't have
anything to do with the umask.

Let's zoom back a bit.

Before even interacting with files you have to mount the filesystem that
contains those files.

And at mount time, you can possibly set the default permission of
those files.

This is done in many ways, or from the fstab or from the mtab or from
the command line utility to mount the filesystem.

For instance you can specify in fstab that a system is mounted only in
read-only mode.

However, you need to consider that like the special attributes on a file,
the different options that can be set while mounting a filesystem depends
on which filesystem you are mounting.

When mounting FAT and NTFS for example you can specify an fmask, a dmask,
and a umask, respectively file mask, directory mask, and umask.

But other filesystems don't allow that.

Still, that doesn't answer the question of where that default base
permission comes from?

The real answer is that there are not base permission, it's an illusion.

The truth is that those base permissions, mostly 666 for files and 777
for directories are hardcoded inside the core standard utilities that
make your unix-like system.

Running a simple `strace` on those utilities, like `touch` or `mkdir`
clearly shows this.

```
open("newfile", O_WRONLY|O_CREAT|O_NOCTTY|O_NONBLOCK, 0666) = 3
```

666 is hardcoded in most utilities... Even most shells, that explains
why Unix is evil!

So in sum, there's no base, it's just the utilities protecting you.

You could create your own programs that let you set the base permission
you prefer.

But that's not very wise.

Those values are hardcoded for a reason, they are protecting you from
reckless security issues.

This is the best default permission policy, the principle of least
privilege.

Your shell is protecting you and its worth knowing.


## Conclusion ##


This episode's topic was relatively petty, nothing too complex but I
thought it was interesting to intertwine all those topics around the
concept of bits and words.

There certainly are many more areas in Unix where words and bitwise
operationss are used and I'd love to hear about them.

You might find more value in the show notes so be sure to check those out.

As usual, if you find anything interesting to add or anything to correct
you can bump the extended thread on the forums.

And if you want to contribute there's a link in that extended thread
where you can find many ways to do so.

Cheers!

-----

### Music ###

The Spin Wires Instrumental Tracks Free for Use in Games Videos Other Media kinda like Creative Commons license The Spin - Track 2


-----

## References ##


- Bits  
  - <https://en.wikipedia.org/wiki/Bit>
  - <https://en.wikipedia.org/wiki/Word_(computer_architecture)>  
  - <https://en.wikipedia.org/wiki/Bit_manipulation>  
  - <https://en.wikipedia.org/wiki/Boolean_algebra>  
  - <https://en.wikipedia.org/wiki/Bit_field>  
  - <https://en.wikipedia.org/wiki/Bitwise_operation>  

- programming  
  - <https://www.gnu.org/software/gawk/manual/html_node/Bitwise-Functions.html>  
  - <http://programming.sirrida.de/bit_perm.html>  
  - <https://graphics.stanford.edu/~seander/bithacks.html>  
  - <http://bits.stephan-brumme.com/>  
  - The never ending shell programming questions on unix.com  
  - <http://www.unix.com/shell-programming-and-scripting/199313-how-use-bitwise-operator-bin-sh.html>  
  - <http://www.unix.com/shell-programming-and-scripting/37873-bitwise-negation.html>  

- Unix timestamp  
  - <https://en.wikipedia.org/wiki/Unix_time>  
  - <http://www.unixtimestamp.com/>  
  - <http://maul.deepsky.com/%7Emerovech/2038.html>  
  - <https://en.wikipedia.org/wiki/Integer_overfl>ow

- Generic permission:  
  - <https://wpollock.com/Unix/OctChart.htm>  
  - <https://en.wikipedia.org/wiki/Modes_(Unix)>  
  - <https://en.wikipedia.org/wiki/File_system_permissions>  
  - <http://www.yolinux.com/TUTORIALS/LinuxTutorialManagingGroups.html>  
  - <https://en.wikipedia.org/wiki/Setuid>  
  - <https://en.wikipedia.org/wiki/Setuid>  
  - Manpages:  
  - chmod  
  - chfn  
  - newgrp  
  - chown  
  - chgrp  

- Attributes  
  - Manpages:  
  - chattr(1) – Linux User Commands Manual  
  - lsattr(1) – Linux User Commands Manual  
  - chflags(1) – OpenBSD General Commands Manual  
  - chflags(1) – FreeBSD General Commands Manual  
  - chflags(1) – NetBSD General Commands Manual  
  - chflags(1) – Darwin and macOS General Commands Manual  
  - <https://en.wikipedia.org/wiki/Chattr>  

- ACL:  
  - <https://en.wikipedia.org/wiki/Access_control_list>  
  - <https://www.freebsd.org/doc/handbook/fs-acl.html>  
  - <http://softpanorama.org/Access_control/acl.shtml>  
  - <https://wiki.archlinux.org/index.php/Access_Control_Lists>  
  - <https://en.wikipedia.org/wiki/Extended_file_attributes>  
  - <http://unix.stackexchange.com/questions/1314/how-to-set-default-file-permissions-for-all-folders-files-in-a-directory>  
  - <http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux/>  
  - <http://thegeekdiary.com/unix-linux-access-control-lists-acls-basics/>  
  - <http://docs.oracle.com/cd/E19455-01/805-7229/6j6q8svdb/index.html>  
  - <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Storage_Administration_Guide/ch-acls.html>  

- Masking & umask  
  - man umask  
  - <https://en.wikipedia.org/wiki/Mask_%28computing%29>  
  - <https://www.cyberciti.biz/tips/understanding-linux-unix-umask-value-usage.html>  
  - <https://en.wikipedia.org/wiki/Umask>  
  - <http://pubs.opengroup.org/onlinepubs/007908799/xcu/umask.html>  
  - <http://man.cat-v.org/unix_8th/2/umask>  
  - <http://www.computerhope.com/unix/uumask.htm>  
  - <http://www.cis.rit.edu/class/simg211/unixintro/Access_Permissions.html>  
  - <http://www.tutonics.com/2012/12/linux-file-permissions-chmod-umask.html>  
  - <https://wiki.archlinux.org/index.php/Umask>  


- Default permissions and mounting  
  - <http://askubuntu.com/questions/429848/dmask-and-fmask-mount-options#429858>  
  - <https://en.wikipedia.org/wiki/Fstab>  
  - <http://unix.stackexchange.com/questions/102075/why-are-666-the-default-file-creation-permissions>  
  - <http://www.techrepublic.com/blog/it-security/managing-default-unix-file-permissions-with-adduser-and-umask/>  
  - <https://en.wikipedia.org/wiki/Sticky_bit>  
  - <https://web.archive.org/web/20120203044307/http://content.hccfl.edu/pollock/AUnix1/FilePermissions.htm>  
  - <http://www.linuxquestions.org/questions/linux-desktop-74/applying-default-permissions-for-newly-created-files-within-a-specific-folder-605129/>  
  - <http://archive.oreilly.com/pub/post/666_the_devils_readwrite_permi.html>  
  - <http://git.savannah.gnu.org/cgit/coreutils.git/tree/src/touch.c#n135>  


