---
layout: post
title:  "Special Files"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---


# Special Files

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2052))


Everything is a file, right.

Files on Unix have no specific format, nothing is imposed about how they
should be, and there's no need to incorporate anything specific for them
to be files.

There's no file type, all the files are the same.

But that's not really true.

There are two differentiations.

One is at a higher level, a meta level, using mimetypes which we discussed
in an earlier episode about default programs. You can listen to it to
get a small overview.

The other difference is at a lower level, and that's what we're going
to discuss.

Special files.


# What's a file?


But what's a file?  And what makes a file a special file?

A file is defined indirectly by the fact that it's something that is a
conduit of information. When reading a file, the information is passed
along its associated file descriptor, which is an abstract indicator to
access a file or other input/output resources.

The file is an abstract resource from which a sequence of bytes is read
from or written to. The source and destination of those is unspecified,
those could be anything.

Files are found and tracked on the filesystem, accessible by the user.

The filesystem can be considered as an interface that let you access doors
which may lead anywhere.

And that's probably one of the key attribute of Unix based or inspired
systems.

Most of the time, for regular files, those doors lead to the file system
driver itself, the files laid on the disk are read by the filesystem
driver that the kernel has loaded to read it.

The filesystem driver reads the zone of the appropriate disk corresponding
to the file that is needed.

But those doors don't always lead to the file system driver, or the disk,
it's not mandatory. There are other ways in which different things can
happen. The doors can give a series of bytes which aren't stored on the
file system even though it gives the illusion that it does.

In that sense, the rooted file hierarchy of Unix can be misleading to
those who aren't accustomed to this way of thinking.

Those doors can lead to other drivers and can be handled differently
while still keeping the aspect and definition of a file: shown on the
file system, can be read or writen to, and accessible by the user.

Everything on Unix is a file.


# What are those doors?


So what are those doors that are used to represent files on the
filesystem.

The complex answer is that it varies depending on the filesystem that
is in use, and because we're not gonna deal with filesystems in this
episode we'll try to simplify the explanation.

Most filesystems agree on a certain structure or at least on what a
POSIX interface can expect their driver to return when it asks them
about the file.

That structure is the inode or also called vnode on BSD derived systems.

Understanding the inode is crucial to understanding certain special files.

But keep in mind that not all filesystems have inodes though they do
have their equivalence, but we'll ignore this.

So what's an inode?

The inode is a data structure that describes a filesystem object, it's
a description of a file on the filesystem.

However it's not the file itself.

We're going very meta here, but it's not that complicated.

It's just that inodes are truly metadata about the files.

Here's how the process unfolds.

Each file has an associated inode, this inode has some metadata in it, one of
them is a number, the i-number or inode number.

All the inodes structures are stored inside a specific location on the
file system.

Each file systems has their own way to store that structure but usually
the size of it and the number of inodes in it are set at creation
time. Thus, there's a maximum limit of files that can be created on
a filesystem.

Other than that there's another structure that stores a table or index
of inode numbers associated with the file name. Let's just put it
like that for now for the sake of simplicity.

The kernel then can asks the file system driver for an inode number
and get back the inode structure, the inode content, access the file,
and sometimes the kernel even keep its own track of the files structure
in-memory.

Let's not dig deeper and go directly into what that metadata is.

inodes store information about files attributes however they do not
contain the file names or the data itself.

The file names can only be retrieved from that other index table that
associate the names with the inode number.

Those inodes structures are stored per file systems, and thus are
filesystems dependant, that means the same inode number can be found on
two different filesystems.

It would be interesting to do a future episode about file systems.

According to the POSIX standards it stores for regular files the
following info:

* The size of the file in bytes.
* Device ID (this identifies the device containing the file).
* The User ID of the file's owner.
* The Group ID of the file.
* The file mode which determines the file type and how the file's owner,
  its group, and others can access the file.
* Additional system and user flags to further protect the file (limit
  its use and modification).
* Timestamps telling when the inode itself was last modified (ctime,
  inode change time), the file content last modified (mtime, modification
  time), and last accessed (atime, access time).
* A link count telling how many hard links point to the inode.
* Pointers to the disk blocks that store the file's contents (see inode
  pointer structure).


Keep those in mind for now and let's talk about the direct implications.


* Files can have multiple names because multiple names can point to the
  same inode number.
* An inode may have no links, and an unlinked file is equivalent to the
  resource beeing freed if no processes are currently accessing that
  inode.
* The kernel doesn't truly care about filenames but more about inode
  number, once it has mapped that filename to the inode number it just
  discards the filename.
* A file's inode number stays the same when moved to another directory
  on the same device.

Nota bene, even files that aren't literally on the harddisk, like we'll
discuss soon, have inodes, and it's for the purpose we mentioned before,
the representation to the user, and the meta data associated with that
virtual interface.

Let's just jump a bit and say that /dev/null does have an inode number
for example.

The relevant commands related to inodes are:

stat which returns the inode information, which also has a symetrical
system call under the same name.

You can list the file's inode number using the ls -i command.


# Special files


Now that it's out of the way we can start dealing with special files.

There are 7 types of special files and they are:

* Directory
* Symbolic link
* Hard link
* Named pipe
* Socket
* Device file
* Door

You can see them by typing ls -l and looking at the first letter of the
permission field or by issuing the `stat` command and looking at those
same bits in the access part.

Let's deal with them in order.


# Directory


Directories are specified by the 'd' character in the access field.

Remember that structure we said associated names with inode numbers,
well it's the directory, and that structure is called the dentry or
directory entry. It's what keeps the relation between a directory and
the files it contains.

And when the file system driver searches for a filename it searches
recursively inside of them, think of it like pointers.

When you issue a command to get the current working directory it has,
if not cached, to walk backward from one directory parent to another
until it reaches the root directory.

In that dentry, other than listing its children, it also has an entry
for itself and its parent. That explains how the recursive backward
search is possible.

On a lower level, the way a directory is implemented depends on the
filesystem and the OS.

In general they are just a stream of bytes that contains the list we
mentioned, it's literally there on the filesystem, and thus is not
so special.

However, they simply can't be read like the other normal files.

Historically, in vintage Unixes, directories were treated more or less
like normal files, marked as "directory" on the on-disk inode.

That meant you could open a directory like any other file and parse its
content to get back the dentry structure.

In the V7 Unix days, the structure was so simple programs could parse
it themselves.

Starting from BSD, the filename length limit was extended and to save
disk space they gave directory entries variable length objects.

Because yes, directories have a size, and it's the size of the dentries.

This made parsing the structure more complex and thus they added to
the C library a function to do it for you. But still the directory was
considered like a normal file, open and read one entry at a time.

The transition was introduced by Sun which thought that this way of
reading entries wasn't fit and efficient enough to their needs. And thus
they implemented a get dir entries system call that would return the
directory entries back according to the file system format. But again
the directory could still be opened like a normal file.

BSD 4.4 caught up with Sun and also implemented their own get dir
entries in an actual system call instead of having that other call in
the C library.

At some other point in time, Linux took an extra step and forbade read
on directories to force you to use the system call to return the entries.

All of that was great because now you can't accidentally cat a directory
and get all sort of random gibberish back and you can't accidentally
override a directory content.

This feature then spread across the board and that's why directories
are considered special files.


# Symbolic link & Hard link


Symbolic links are specified by the 'l' character in the access field.
Hard links are not specified by any character in the access field.

You can create those links using the ln command, adding the s flag for
symbolic link and ommiting it for hard links.

So what are those?

Both seem like references to files but are they?


# Symbolic links


Let's start with symbolic links.

According to Wikipedia:


> A symbolic link or also called symlink or soft link is the nickname
> for any file that contains a reference to another file or directory
> in the form of an absolute or relative path and that affects pathname
> resolution.

But what does that mean?

A symbolic link is a special file that returns only a single string of
text representing the location of its target, the other file it points to.

It stores it as a name and not as an inode, and the name can be relative
to the path its living in.

When operations are performed on symlinks it's as if it's implied that
they are done on the name the symlinks points to. Meaning that the OS
will search for the path specified in it.

However, both files are totally independant.

Thus if the file it's pointing to is moved, the symbolic link isn't and
might point to a non-existent file, we call those broken or orphaned or
dead or dangling links.

The permissions on a symbolic link doesn't have anything to do with the
target and is only related to the renaming and removal of that symlink.

There's also the issue that symbolic links break the tree shaped hierarchy
of Unix like systems, for example you can have cyclic directories.

Historically symlinks were introduced in 4.2BSD Unix from U.C. Berkeley.

Again, just like directories, symlinks were first regular files that
simply contained the textual reference to the link's target plus being
marked as link on the on-disk inode.

And just like the method with directory which was slow and inneficient
because it use disk-space on small systems, symlinks needed improvement.

This improvement was called fast symlinks which introduced storing the
target link inside the inode structure. The downside is that fast symlinks
only work for path that don't exceed the inode space, for longer path
symlinks falls back to slow symlink on disk.

Fast symlinks are not truly faster but only save disk space because the
kernel still has to query the file system driver for the inode related
to the filename.

Just like directories, symlinks do have a size if it's not a fast-symlink,
and it's exactly the size of the number of characters in the path it
points to.

POSIX doesn't require anything special for symlink implementations but
the majority of POSIX-like systems use the method we mentioned with
fast-links and fallbacks.

So a symbolic link is like an alias, what about hard links.


# Hard links


Hard links are easy to understand if you got the part about inodes
and directories, they're not truly special files.

Hard links are simply diretory entries. They are that association between
a name and an inode. All files have at least one directory entry and
thus all files must at least have one hard link.

But here's the catch, that also mean that a file may have multiple hard
links, that's exactly like giving multiple names to the same file.

Like we said previously about inodes, if no names point to the inode,
the last link is removed, then the file is considered removed and the
data freed. Remember we said that the inode contains an attribute that
counts the number of hard links pointing to it.

We call the process of removing a dentry "unlinking".

Directories are also files and thus the issue that arises is how to
manage hard links to directories. If allowed this would create loops,
acyclic graphs, inside the file system and confuse it. For example what if
a directory was its own parent, this would lead to an infinite recursion.

For this reason, on most of today's Unix-like system creating hard links
to directories is forbiden. While again on original UNIX System V they
were allowed but only with root permission.

Small nota bene about hard links:
The maximum number of hard links to a single file is limited by the size
of the referene counter inside the inode, which is way more than enough
on 32 and 64 bits systems.

Also steming from its definition hard links can only be done on the
same filesystem.

The command used to show the number of links to a file is the `stat`
command or the ls with the -l flag.


# Named pipe


Named piped are denoted by the 'p' character in the access field.

A named pipe or also called FIFO is a file used for IPC that works just
like the Unix pipe concept but passing through a file.

It's an extension of the traditional Unix pipe.

While this traditional pipe is "unnamed" and disappear as soon as the
process finishes, the named pipe is a file that can be reused.

A process connects on one end to send input through the pipe and another
process connects to the other end to receive it.

This allows for transfer of info in a pipeline manner through processes
that don't share the same parent.

Named pipes are special in the sense that they're not really files on
disk but all the stream of data moves in a first-in-first-out manner
and thus have to be distinguished from regular files.

Named pipes are useful for transfering large amount of information from
one application to another without the use of intermediary temporary
files.

Notably, the SIGPIPE signal is sent when the transfer of this info is
suddenly interupted.

However, they're a bit of a relic of the past and are largely disfavored
for named sockets instead, as we'll see in the next section.

The related commands to create named pipes are the `mknod` on older systems
and `mkfifo` on newer ones.


# Socket


Sockets are specified by the 's' character in the access field.

Just like named pipe, they're used for inter-process communication.
The difference is that while named pipe are unidirectional, sockets are
full duplex.

Sockets are a big name, there are many types of sockets and the ones we're
talking about here that are special files are the Unix domain sockets only.

This is done by specifying the protocol family `AF_UNIX` when creating
the socket.

The API for all sockets are pretty similar but instead of passing through
a network it passes entirely through the operating system. The file that
is created for Unix domain socket is used as the address name space,
if two processes open the same inode that is a socket.

Those sockets support two ways of transmission, one that is reliable,
just like named pipes, and two others, ordered and reliable transmission
of datagrams and unordered and unreliable transmission of datagrams.

The first ones are comparable to TCP and the last one to UDP.

Other than sending data through the socket, file descriptors can also be
sent. Which allow a process on the other end of the socket to manipulate
a file it may not already have access to.

Historically, yet again, its from the BSD lineage that we got the good
stuff. They created sockets with the aim of having a way to encapsulate
acess to data networks, a bi-directional stream.

Command wise, there are no specific command that creates a socket. But
let's just say that netcat has an option to create Unix sockets.


# Device file


Device files are specified by the 'c' for character devices and 'b'
for block devices.

The special thing about device files is that they are not handled by
the file system driver but by other specific appropriate drivers for
everyone of them. What the device does with the data is its own business.

A lot of the time it's a communication that happens with a piece of
hardware.

The kernel allocate the resouce for those so called "device nodes" and
identifies them by a major and minor number. Both of those numbers being
stored in an inode attribute for the device type.

Whats important to know is that like the name of a file is unimportant
to the kernel but the inode is, the meaning of a device file is not
determined by its name nor its inode number but by those major and
minor numbers.

Generally the major number identifies the driver to use and the minor
number identifies the device that the driver controls. The driver itself
only cares about the minor number.

You can check those numbers using the ls with the -l flag and find
them where the file size usually is. Or you can use the `stat` command
as usual.

Almost all the files under /dev are device files so you can try that out
there.

/dev may be a devfs, a specific implementation of a device file system
where devices can be dynamically shown without being physically stored.

However, that's not a subject for this podcast.

Before digging into the differences between character devices and block
devices let's say that even though the names of the device files under
/dev are not their true meaning, there are still naming conventions for
common device files.

What's a block device file.

The answer isn't straight forward because the distinction between a block
and character device is not completely universal.

Usually block devices behave like regular files, they are an array
of bytes. So that means you can read at any location and write to any
location on it, but you know that the last place you wrote at you're
gonna be able to read the value you inserted there next time.

Another thing that is specific to it is that the operating system can
cache or buffer those operations to flush them later on.

Block devices are things like disks, which behave like large, fixed-size
files. That means you can typically read big blocks of any size, that's
where the name stems from.

Now what's confusing is that many unix-like operating systems create
both block and character devices to represente hardware like hard disks.

They expose two interfaces.

FreeBSD and Linux notably do not; the former has removed support for
block devices, while the latter creates only block devices.

Then what's a character device then?

It's also hard to say. Simply it's everything else.

Behavior wise they act like pipes or serial ports, writing to them is an
immediate action and you may have no clue what happens to what you sent.
It's not buffered.

It might produce sound or display something on a screen for instance.

When it comes to reading character devices spurt characters individually
and that's where the name stems from.

But that's also blurry because it's not mandatory. For instance the
character device for a hard disk will require that all reads an writes
are aligned to block boundaries and won't allow reading a single byte
by itself.

To avoid confusion some refer to character device as raw devices instead.

Let's note that not all devices under /dev are physical devices, they
can be virtual instead.

Usually if the driver is 1 it means that it's virtual.

Notable examples of that are:

    /dev/null – accepts and discards all input; produces no output (always
      returns an end-of-file indication on a read)
    /dev/zero -> always return 0.
    /dev/full – produces a continuous stream of NUL (zero value) bytes
      when read, and returns a "disk full" message when written to
    /dev/random and urandom -> random pools for pseudo-random numbers.
    /dev/stdin -> which designate the standard input of the current process.


The related commands for the device special files are the following:

You can use mknod to create a new device file.
You can use the cp with the -l flag to copy device nodes.

Older unixes may use a makedev to fill up the /dev directory with the
necessary devices.

You can use lsmod on Linux to list all the loaded modules or even check
them in /proc/devices and /proc/modules.


# Door


The last of the special files is the Door specified by the 'D' character
in the access field.

This special file is specific to Solaris and is used for IPC in a client
server scenario, that's all I'm gonna say.


# Conclusion


This is all about the special files.  

We went through many subject and just scratch the top of them. And so
as usual you can always refer to the show notes for more information so
you can dig into your own research.

If you find anything useful or anything to correct  you can discuss it
in the extended thread on the forums.

Thanks as always for listening.


# Music


Tired of 01010101 (U)
by iamMANOLIS


-----

References:


- <http://www.makelinux.net/ldd3/chp-3-sect-2>
- <https://en.wikipedia.org/wiki/Device_file>
- <http://unix.stackexchange.com/questions/37829/understanding-character-device-or-character-special-files#37831>
- <https://en.wikipedia.org/wiki/Unix_file_types>
- <http://unix.stackexchange.com/questions/60034/what-are-character-special-and-block-special-files-in-a-unix-system>
- <https://en.wikipedia.org/wiki/Symbolic_link>
- <https://en.wikipedia.org/wiki/Hard_link>
- <https://kb.iu.edu/d/abbe>
- <https://kb.iu.edu/d/aibc>
- <https://www.cyberciti.biz/tips/understanding-unixlinux-symbolic-soft-and-hard-links.html>
- <https://en.wikipedia.org/wiki/Inode>
- <https://en.wikipedia.org/wiki/File_descriptor>
- <https://en.wikipedia.org/wiki/Computer_file>
- <http://unix.stackexchange.com/questions/197439/how-is-a-directory-a-special-type-of-file>
- <https://utcc.utoronto.ca/~cks/space/blog/unix/ReaddirHistory>
- <http://www.catb.org/~esr/writings/taoup/html/ch07s02.html>
- <https://en.wikipedia.org/wiki/Named_pipe>
- <http://www.tldp.org/LDP/lpg/node15.html>
- <http://www.linuxjournal.com/article/2156>
- <https://lists.freebsd.org/pipermail/freebsd-performance/2005-February/001143.html>
- <https://en.wikipedia.org/wiki/Unix_domain_socket>
- <https://en.wikipedia.org/wiki/Doors_(computing)>
