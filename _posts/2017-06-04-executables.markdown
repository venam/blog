---
layout: post
title:  "Unix executables"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---

# Executables #

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1931))

### How to explain, what we're gonna explain:

- What is an executable
- The usual process of an executable
- Generic overview of the features, what they mean.
- So what?  The different common types on Unix:
- The types used per OS, and history
- Now what?

# What is an executable

An executable is something that causes a computer to perform some tasks
according to encoded instructions.
It's in opposition to a data file which must be parsed by another program to
be meaningful, for example an image or video.

The instructions are usually in machine code, read by the cpu and so dependent
on the cpu architecture.
An executable once compiled will only work on a particular family of processor
because the machine code instruction differs within the families of
processors. It also differs depending on the hardware, let's say the GPU.

An exception to this are the fat binaries which include the code for multiple
hardwares in a single binary. It makes it bigger though, obviously.
There aren't many implementations of this in the Unix world but the most
relevant example are the OSX and ios binaries, which are architecture
independant, they are fat binaries, which explains why their binaries are huge.

We've said the instructions were in machine code but more generally they
can be in any format, interpreted and reconstituted into bytecode by a
scripting language or a middle man program that will do just in time
compilation or anything else so that the machine understands.
An emulator for example, java bytecode is also a good take.

Today we're not discussing those types of executable, we're discussing the
ones specific to the OS and that interact directly with the application
binary interface.

So what's an ABI, and why are we only talking about binaries that interact
with it.

The ABI is the binary interface that the operating system offers to other
programs to interact with it at the level of machine code.
It's this level that determines how functions calls are made, the system calls.
It's the job of the compiler, the program that will translate the source code
into a binary format, to comply with this ABI.

That's what the ABI is.
Now why are we talking about it?

The ABI has a direct relation to the format of binaries because the ABI
defined specificites the executables should have, such as the size, layout,
and alignment of data types.
The calling conventions, how functions arguments are passed and return values
retrieved, how the parameters are put on the stack.
How the application makes system calls to the OS.

That last one is, and you need to remember, the most important because an
executable can't do much without system calls, without this interaction with
the rest of the system.

------

That's what executable is.
But that's the first part of the explanation.
What's the process that an executable go through to be executed?

------

# The usual process of an executable

The source code is compiled into machine code directly or into an object file
of some sort. From object files they are then linked to libraries and create
an executable, which has the format specific to the operating system.

NotaBene on linking and libraries:
Libraries are a set of instructions and resources stored in an object file on
the system so that other program can call them directly instead of including
them in their binary which would take much more space.
This is referred to as dynamic linking, the process in which the symbols are
just stored in the program and then take meaning when linked to the library.
The process of dynamic linking doesn't happen when the executables are
statically linked to the library, the library is joined at compiled time,
it's part of the executable.
One advantage is that the binary is transportable and that it avoids DLL hell
or dependency hell.

Close the NotaBene

Object files are in something we call container format, executables in executable
format, but the naming convention changes depending on the situation, an object
file and an executable can have, and in most cases have the same format,
but object files are most of the time not executable.

Those formats are divided into sections such as .text (executable code),
.data (static variables), and .rodata(static constants), which we'll discuss
a bit later when we see the different formats in the Unix world.

Enough of compile and linking, let's execute that thing.

When the executable is executed it is loaded into memory and the system reads
it according to the format it understands, jump to the start of the address
space, it finds the entry point of the program.

The part of the operating system responsible for this is called the "Loader"
it's an internal part of the kernel which is responsible for loading programs
and libraries into memory and prepare them for execution, once loaded the OS
can pass the control back to the program.

On Unix particularity the loader is handled by the `execve` system call, it
does the following:
* Validate permission, memory requirements, etc.. The metadata around the exec
* Copy the program image from disk into main mem
* Copy the command line arguments into the stack if any
* Initialize the registers (stack pointer, instruction pointer which will point
  to the first instruction of the program)
* Jump to the program entry point, which we talked about earlier

Let's not forget that executables interact with the rest of the system,
they are linked to rest, they are part of a platform.

That's how the execution takes place.

# Generic overview of the features, what they mean.

OK, so now you know a bit what an executable is and how it works on a generic
level.

So what features can an executable have, something particular to the format
it's stored in.

First of all there's the architecture, the processor for which it has been
compiled for.
Most commonly found around we have the i386 (32 bit) and 86_64 (64bit)
Usually it's because the compiler compiles to adhere to the system ABI.
So if the ABI is 32 bit the binary should be in 32bit.
Now here's a bonus point, 64 bit systems can read instruction from 32 bit
systems.
32 bit system have pointer size of 32 bit, that's what can be held in memory
by a register.
it's 64 bits for  x86_64 systems.
Now one issue here is that 64bits pointers have an overhead but that 64 bit
instructions are faster.
In 2011 some Linux dev came up with something that takes the best of both world
it's called the x32ABI. So it has 32bit pointers but 64 bit arithmetic.

Other than the architecture, some feature that executables can have are
the the file extension, on some OS a file is not executable if it doesn't end
by a certain extension, however we should note that on Unix it's not mandatory
to have extension for executables, they just don't have any.
Instead they have metadata attached to them concerning the permission, showing
if they are executable or not.

There's a lot of metadata attached to those binaries, let's name a few
They have build ids, signatures, comments, etc..

One of those metadata that we might take for granted but really is not is
the explicit processor declaration: saying that this binary works on this
family of processors only. It wasn't always the case, there are executables
that don't explicitly say "I work on i686", it's assumed.

Another metadata is the digital signature.
Code signing to confirms that the code hasn't been altered.
It's a signature that the kernel will verify and won't execute the executable
if it's not signed.

More metadata, some find it cool to even include an icon inside the executable.

Executable can have added sections, called arbitrary memory sections.
On Unix most formats do have this. This allow other programs or the program 
itself to access the information there, and it's accessed faster because it's
stored right in the memory during execution and it stays there.

Two other features that might, again, be taken as granted are the 
string and symbol tables.

Those are where the strings in the executable and the symbols are stored,
remember that the symbols are the functions that needs to be called and that
the linker resolves.

# So what?  The different common types on Unix:

Definition over...
We went over a lot of things, but so what?
We didn't even deal with the implementattions and where they are used.
So we're gonna do that.

# The types used per OS, and history

Let's talk about which Unix OS uses which executable format or object format
by default.

We'll go over 6 distro and you'll get the general idea.

But first let's name the possible executable formats in the Unix world.
We'll go into their details a bit later.

We have the a.out, which is the oldest Unix-like format, it was named by
Ken Thompson in 1968.
The COFF and ECOOF, which was introduced in Unix System V to replace a.out.
It was a sort of improvement because a.out had issues with dynamic linking,
but not a great one because it was a bit too limited. Limited number of sections
, of lenght of the section names, and the symbolic debugging.
Real world implementation of COFF were because of this violating the COFF
standards and so were renamed as extensions.
And we have the ELF: executable and linking format, also published in the
SystemV abi. Unlike a.out and COFF, elf are very flexible.

So those are the object formats on Unix.

Let's get it on with the OS:

Linux used a.out until the kernel 1.2 and then switched to ELF
Minix switched from a.out to ELF in the 3.2.0 release.
NetBSD uses the ELF format
OpenBSD switched from a.out to ELF in 2003 in the release 3.4
FreeBSD switched from a.out to ELF in  version 3.0, though it was considering
itself to be from the "classic" camp, of "proven" technology.
DragonflyBSD also uses the ELF format

ELF is sorta' used a bit everywhere, and a lot in the gaming console world.
All the Playstations OS, the Wii, the nintendo DS, etc... also use it.

Now the weirdos in the gang, are the non-free Unix systems, such as MacOs
Which uses the  "Mach-O" - mach object format, and as we've mentioned this is
a fat binary, It contains the code for multiple CPU families, but that might
work because Apple make their own hardware.

Details:

## a.out
Means Assembler output executables coined by Ken thompson.
As we've said, it's the oldest object format used on Unix.

One fun thing to know is that "a.out" remains the default output name of the
executable that is created by most compilers. Even though they aren't in the
a.out format.

A.out had many variants such as OMAGIC, NMAGIC, QMAGIC, etc..
They all have little differentces which I wont' go over.

The a.out format has 7 sections.

exec header – contains parameters used by the kernel to load a binary
    file into memory and execute it, and by the link editor ld to combine a
    binary file with other binary files; this section is the only mandatory
    one
text segment – contains machine code and related data that are
    loaded into memory when a program executes; may be loaded read-only.
data segment – contains initialized data; always loaded into writable
    memory.
text relocations – contains records used by the link editor
    to update pointers in the text segment when combining binary files.
data relocations – like the text relocation section, but for data segment
    pointers.
symbol table – contains records used by the link
    editor to cross-reference the addresses of named variables and functions
    (symbols) between binary files.
string table – contains the character
    strings corresponding to the symbol names.


## COFF
Common Object File Format (COFF) – This format was used after
a.out but before ELF on Linux/Unix systems.
This was meant as a replacement for a.out, a sort of upgrade.
COFF executables have more sections than a.out and have better debugging
features and the executables are not loaded in contiguous blocks.

The COFF symbolic debugging information consists of symbolic (string)
names for program functions and variables, and line number information,
used for setting breakpoints and tracing execution.


## ELF
ELF has become the standard unix object/executable format.
It's very extensible, the header has a tag for which ABI it was compiled for,
which architecture, etc..

This is one of the features that has made it easy to adopt it on many platforms.
To be the most widely used.

ELF Also has 7 sections, actually the same as the a.out has

exec header
    Contains  parameters used  by the kernel to load a  binary
    file into memory  and execute it,  and by the link  editor
    ld(1) to  combine  a binary file with other binary  files.
    This section is the only  mandatory one.
    For more info on the headers you can check the man page man (5) ELF (for the file format)
    or the wiki page, it explains the headers value and what they mean.
    For instance: the entry point is specified in the `e_entry` header field

text segment
    Contains  machine  code and related data that are loaded
    into memory when  a program executes.  May be loaded
    read-only.

data segment
    Contains  initialized data; always loaded  into writable
    memory.

text relocations
    Contains  records  used by  the link editor  to update
    pointers  in the text segment when combining binary
    files.

data relocations
    Like the  text relocation  section, but for data segment
    pointers.

symbol table
    Contains  records  used by  the link editor  to cross ref-
    erence the addresses of named variables and functions
    (`symbols') between binary files.

string table
    Contains  the character strings corresponding to the
    symbol names.

ELF has a lot of nice features that can be added to it because of its flexibility.

You can sign an ELF binary and it'll be checked by the kernel.
Signing ELF:
http://lwn.net/Articles/532778/
http://freecode.com/projects/elfsign/

It can be extended with icons
icons
http://www.compholio.com/elfres/

The compilers usually add notes to the executable and that is used as a tag
or versioning for the package manager.

# Now what?

man elf
How to get that info, useful tools, analysis
We're gonna focus on the ELF format because it's the defacto nowadays.

The most useful tool is the readelf,
let's explore a binary and check some stuffs with this nice too.

readelf let's you check the dynamic links (symbols), the headers.
readelf -h and your exec and you can clearly see the magic header that shows
it's an ELF executable. the header contains the string "ELF".

It also show many specific things such as the ABI, the machin architecture,
the byte order, etc..

readelf -d /usr/local/bin/2bwm #print the dynamically linked libraries
The magic header:
Magic:                             7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
Class:                             ELF64
    Data:                              2's complement, little endian
Version:                           1 (current)
    OS/ABI:                            UNIX - System V
    ABI Version:                       0
Type:                              EXEC (Executable file)
    Machine:                           Advanced Micro Devices X86-64
    Version:                           0x1
    Entry point address:               0x40328d
    Start of program headers:          64 (bytes into file)
Start of section headers:          40616 (bytes into file)
    Flags:                             0x0
    Size of this header:               64 (bytes)
Size of program headers:           56 (bytes)
    Number of program headers:         9
Size of section headers:           64 (bytes)
    Number of section headers:         28
    Section header string table index: 27

Now let's name a few tools that are useful for exploring and understanding
binaries.

We mentioned readelf.
There's the ldd program to list linked libraries, now we understand that this
tool actually reads from the symbol table.

objdump as the name implies dump info about the object.
objdump can also list dynamic links with the -R flag.

The nm tool lists symbols from an object file. So it fetches things from the
symbol tables of an executable.

The file utility gives info about files, when you give it an executable it
returns stuffs such as the object format, the architecture, the ABI, the
buildid.

The size program can even give you some info.
It returns the size of each sections of the binary, text,data,bss,dec
size /usr/local/bin/2bwm
text    data     bss     dec     hex filename
31779     4000    1304   37083    90db /usr/local/bin/2bwm

hexdump could also be used to check some specific things.

Moreover there are the elfutils utilities and the pax-utils.
```
/usr/bin/lddtree – like ldd, with levels to show dependencies
/usr/bin/dumpelf – dump internal ELF structure
/usr/bin/pspax – list ELF/PaX information about running processes
/usr/bin/scanelf – wide range of information, including PaX details
/usr/bin/scanmacho – shows details for Mach-O binaries (Mac OS X)
/usr/bin/symtree – displays a leveled output for symbols
symtree /usr/local/bin/2bwm #very useful to check for dynamic links
```

Now cool thing, if you want to check the dynamic linked libraries for
example you could use the following 4 different ways:

```
nm -D /usr/local/bin/2bwm
objdump -R /usr/local/bin/2bwm
readelf -d /usr/local/bin/2bwm
ldd /usr/local/bin/2bwm
lddtree /usr/local/bin/2bwm
```

There are multiple libraries for parsing ELF
For instance https://github.com/eliben/pyelftools

A tutorial to inspect an executable with multiple sections.
http://anee.me/reversing-an-elf/

That's about it,
Very long podcast.
I've learned a lot on the way and I hope you did too.
It unmystified a lot of things.

Check the show notes for more info

-----

References:


* <https://en.wikipedia.org/wiki/Executable>
* <https://en.wikipedia.org/wiki/Fat_binary>
* <https://en.wikipedia.org/wiki/Library_(computing)>
* <https://kb.iu.edu/d/akqn>
* <https://en.wikipedia.org/wiki/Dynamic_linker>
* <https://en.wikipedia.org/wiki/Static_library>
* <https://en.wikipedia.org/wiki/Object_file>
* <https://en.wikipedia.org/wiki/Loader_(computing)>
* <https://en.wikipedia.org/wiki/Comparison_of_executable_file_formats>
* <https://en.wikipedia.org/wiki/X32_ABI>
* <https://en.wikipedia.org/wiki/Symbol_table>
* <https://en.wikipedia.org/wiki/A.out>
* <https://en.wikipedia.org/wiki/COFF>
* <https://en.wikipedia.org/wiki/Executable_and_Linkable_Format>
* <http://www.netbsd.org/docs/elf.html>
* <http://www.netbsd.org/docs/compat.html>
* <http://www.openbsd.org/34.html.>
* <http://people.freebsd.org/~meganm/data/FAQ/FAQ85.html>
* <https://people.freebsd.org/~nik/advocacy/myths.html>
* <https://www.dragonflybsd.org/docs/handbook/UnixBasics/>
* <https://en.wikipedia.org/wiki/Mach-O>
* <https://en.wikipedia.org/wiki/Preferred_Executable_Format>
* <https://linux-audit.com/elf-binaries-on-linux-understanding-and-analysis/>
* <http://www.ibm.com/developerworks/aix/library/au-unixtools.html>
