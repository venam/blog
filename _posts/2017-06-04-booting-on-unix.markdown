---
layout: post
title:  "Booting On Unix"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: http://podcast.nixers.net/feed/download.php?filename=nixers-podcast-2016-09-131.mp3
podcast_ogg: https://github.com/nixers-projects/podcast/blob/ogg/nixers-podcast-2016-09-13.ogg?raw=true
---

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1987))

The booting process!


# Intro


At the beginning of time there was nothing...
But that all depends on your definition of nothingness,
what is nothingness...

A power button is pressed, and suddenly BIG BANG... After a while you get
a Unix login prompt.

Have you ever wondered what led to this, what happened behind the scenes
from the time you pressed the power button until this prompt appears?

In this episode we're discussing the boot process and what is specific to
Unix about it.

I'm venam and you're listening to the Nixers podcast.


# What is booting


Like all good start, let's start with defining the term we want to study.

The word booting comes from bootstrapping, which is an expression that
comes from a book called The Adventures of Baron Munchausen.  To sum it
up it means the process of self-start, start without external output.

Now in computing the exact definition differs.
What we're talking about today is starting your computer.

But what does that even mean, at what point can we say that a computer has
finished booting?

Some say that it's when the operating system finishes loading, some say
that it's when the operating system starts loading, some say that it's
when it's ready for user interaction, some say that it's when the system
is capable of running tasks and programs.

The definition I find the most accurate is this one: The booting process is
whatever happens before the system gets to a state where it does what it's
intended for.

If it's for user interaction, then you need that.
If it's a thin client that's supposed to open a web-browser only, then it's
everything before that.
And if it's a machine with no user interaction that just handles server
requests than it's that.


Now that we've defined it we can explore every step of this process.


# Steps


Let's go through a rough overview of the steps taken and then jump
into details.

There are 3 major big steps sometimes referred to as phases or as stages.
All steps end by the execution of another major important program that
is started

The first one consists of BIOS, the basic input-output system, which
first does a power on self test on the hardware, and then handles the
job of choosing, pointing the booting device, and executing it.

Then comes the loader. This phase starts at the MBR, master boot record,
but not limited to it because it's extremely small. It handles the job
of choosing a kernel, its parameters, and the location on the disk,
and to load and execute it. (sometimes phase1 is considered the MBR and
phase 2 the loader)

The third phase is the kernel, in this phase the operating system ELF
executable is started, sometimes decompressed, it probes all the hardware
and starts the init process.

We can consider the init process as part of a fourth phase or as part
of the third phase.


# The generic steps

## BIOS

The BIOS, the basic input/output system.

The BIOS is usually located at a read only memory place, in a ROM.
It's the first code executed by the processor upon boot.  As soon as the
power comes, the cpu does the RESET command, which causes it to read from
a hard coded address and execute code from there.  The thing located at
this address is the ROM that contains the BIOS.

The role of the BIOS is to first poll hardwares on the system and check
if it's really gonna be functional and boot.

This is regarded as the POST, power on self test.

The power on self test is what produces the beeps you can hear when
there's a problem with the things connected to the motherboard.

Those beeps indicate what's the problem, it's a way to give info about
the issue happening, about anything that's not functional. A sort of
diagnostic tool.

There's actually a list of the beep codes that you can receive from this.
And also, this isn't just about beeps, some systems have leds of different
colors indicating different issues.

So the POST, power on self test is the first function of the bios, sorta'
like a pre-boot function.

The main function is to select the device to use and boot from.
This is a "Setup" mode where there are a bunch of configurations of the BIOS,
you can choose the boot order, change the motherboard time, set a security
password on UEFI, etc..

So the BIOS has to first probe for possible connected and bootable devices.

Once it's set, the last action the BIOS executes is to load the first
sector of the boot device selected and transfer control to it.


This first section is called the MBR and that's what we're gonna
discuss next.

Conclusion: the BIOS loads the MBR of the selected bootable device.

----

But what does this all have to do with Unix?

Well, all operating systems must provide a way to load them.
Unix is no different.
Even if this isn't directly Unix related and more of a motherboard
vendor relation.


What needs to be mentioned though is that Free-Unix is tightly correlated
with freedom and that most BIOS are proprietary.  For that reason there
are many open source BIOS implemented such as coreboot and libreboot.

The issue with those is that at this level the software is dependent
on the hardware and you need a new software for every new hardware,
and thus it doesn't support all hardwares, it is vendor specific.

But keep in mind that this is close to the Unix world because of the
philosophy of shareable code and openness.

Let's move to the MBR.


## MBR (and volume boot record too)

The MBR, Master Boot Record.

It is located at the first sector of the device that is loaded by the
BIOS. The size of a sector is 512 bytes but in some new instances,
such as the advanced format disks, it can go as big as 4096 bytes.

The MBR has a partition table for the 4 partitions that can be kept
on that disk, the slices, they occupies 64bytes of that MBR, plus a
signature of 4 bytes, and a timestamp of 6 bytes, that only leaves
between 434 and 446 bytes for the machine code that resides there.

There's also GPT, GUID Partition Table (GPT). That's a newest alternative
to MBR to remove the limitation on the number of partitions available
on the disk.

The numbers are not really important, what you just need to remember
here is that a sector is 512 bytes and there's not a lot of space to
execute ton of stuffs.

What happens from this point on differs a bit depending on the intention
and what needs to be achieved.

The goal at this point is to start a kernel and to do that you need
something called a boot loader, or simply a loader.

Sometimes the space of the MBR is sufficient for a very simple loader,
sometimes it is not.

You'll have to use low level tricks to make it fit into those 512 bytes.

Now this is something that changes from one Unix-like OS to the other.

Linux doesn't provide any specific bootloader, it is distribution specific
and open for any third party.
Some of it's bootloader fit in the MBR and some don't.

In the BSD world the bootloader is separated into two stages and usually
comes with the kernel sources.
It is referred to as Boot0 or Boot Easy, also sometimes called bootxx.

If one operating system is installed then it might be simpler to have the
MBR search for the first bootable slice on the disk and run it.

If on the contrary there are more than one and you want a way to choose
the OS, then it's better to chain the programs, split them into parts,
one loading the other so that it's more flexible and not limited to the
512 bytes that are default on most system.

So the MBR is that very small first section of a disk that can be the
loader or it's just a jump point to the loader.
It lists all the bootable slices on that disk, the location of them,
usually called volume boot record and execute the one selected.

Let's discuss more about the loader itself, what's its role, what does
it do, how much can it be extended if it's not only in the MBR but on
the filesystem.

A little not, you can dump the MBR using the dd command:
`dd if=/dev/sda of=mbr_back bs=512 count=1`


## Bootloader/loader -> executes kernel


The bootloader can be located on the booted device filesystem or on the
MBR, depending if it fits or not.

Its role is to select and start the kernel via a menu.

If the boot loader doesn't fit inside the MBR it is split between the
MBR and the larger piece is stored in another location that is invoked
by the MBR.

In that case the boot loader should have knowledge of the partitions on
that filesystem and if they are bootable or not, a more sophisticated
loader.

It also is able to give arguments to the kernel.
Like any other programs the kernel takes arguments.

The standard boot manager on FreeBSD is boot0 also called Boot Easy,
on NetBSD it's bootxx, each BSD comes with it's own bootloader, they're
integrated.
On Linux, on the other hand, it doesn't come with a built-in bootloader but
it relies on third party which can boot many kinds of OS such as GRUB,
and LILO.

Let's just note here that the boot loader for the BSDs directly boots into
the system, it loads the kernel image directly accessing the harddisk,
and that to multiboot you have to switch boot loader to use another one,
they sometime offer a menu to choose different kernels from the same OS.

The first approach is a lighter one as it doesn't have to understand
the underlying file system.

The second approach requires a config file that contains a list of the
physical sectors occupied by the kernel images so that the boot loader
can load them.

Now if the location of that image changes, in the first case it becomes
an issue because you'll have to repopulate the MBR, in the second one
you'll only have to change that configuration file.

However the loader will need a filesystem driver.

GRUB uses that second approach.

When we're at it let's list some bootloaders frequently used in the
Unix world.

GRUB1-2
Lilo (was discontinued in December 2015)
Boot Easy - Bootx - and the BSD ones
SYSLINUX (only for FAT filesystem)
Das U-Boot

So why, that many, how do they differ?

Some fit in the MBR and are lightweight, some don't.
GRUB doesn't git, LILO fits, and suprisingly has a menu to choose the
kernel to boot but it doesn't understand or parse the filesystem layout.
They also differ about where they can be used, on what media, they differ
by the license, the architerure supported, the filesystems supported,
the different configurations, etc..

The configuration for that boot loader are usually in the /boot and the
kernel images are there too.

They also differ by which operating system they are able to execute,
which means the type of executable they can start otherwise you'll have
to transition to another boot loader and leave it handle the booting.

Here's let's remind ourselves that ELF type of executable is the standard
on most Unix. So that's what the loader loads.

As we've said the boot loader can give arguments to the kernel, like
any other program, so it must also be able to start that program, load
it in memory and execute it.

Some kernel can even be loaded over the network through something called
a PXE, preboot execution environment, you can find more info in the
show notes, this is also referred to as diskless booting.
This support can come built-in the BIOS or inside the boot loader.

Now, back on topic.

There are many arguments or variables that a kernel can take.
You can find a list of all the nifty tricks in the show notes.

This is called a loader line, or kernel flags.

Finally the kernel is loaded in memory and starts executing.
Let's jump into that.


## Kernel -> executes init script (/sbin/init)

The kernel is located on the filesystem, it is then loaded in memory.
But sometimes it's compressed and needs to be decompressed before being
loaded, it is unzipped, or more like self-unzipped because it's self
decompression.

The kernel needs to probe devices, initialize them for use, and do a
bunch of other stuffs to make the system usable such as mounting the
filesystem using the temporary filesystem, start the init process,
setup network cards, etc..

There's most of the time a temporary ram filesystem, initrd stands for
Initial RAM Disk.  initrd is used by kernel as temporary root file system
until kernel is booted and the real root file system is mounted. It also
contains necessary drivers compiled inside, which helps it to access
the hard drive partitions, and other hardware.


Let's go a bit more into details here.

Like all program the kernel has a main function, it's written in C so it does.

The most noticeable thing that happens is the initialization of the data
structures used across the operating system such as queues to manage
scheduling and the structure used to represent files, for instance inode
on Linux and vnode on OpenBSD.

There's also the initialization of the device driver and the switch
of the processor to the protected mode, and the initialization of the
interrupt decriptor table used for the mapping of interrupt to system
calls understood by the OS.

The main goal is to reach a state where multitasking can start,
where processes have a meaning.

We know that every process is created by calling fork() on the kernel.

Yet, there has to be a first process that is started, and this one is done
explicitly and not indirectly like other processes.

The kernel is more or less the process 0 detached in the background and
then it give rise to process number 1, the init process.
The init process is in 99% of the case at the /sbin/init, that is what
is being executed.


The kernel then enters it's idle() mode waiting for inputs.

The memory used by the temporary file system that the kernel needed to
boot is freed.

Let's talk about that init process a bit.


## Init -> execute runlevel programs


HEY this isn't a podcast about init systems but yep, the init system
bootstraps the userspace and manages the subsequent processes so we can
talk a bit about it.

Let's list some init system:
SysV
systemd
Upstart
runit


Its role is user space initialization.

It executes a bunch of shell scripts at startup, amongst them can be
configurations and daemons, the services.

Usually there's a certain order in which those services are started and
thus the init process needs a way to manage this.

Let's take the example of sysV, it has the concept of runlevels.

Each runlevel is executed at a different stage.

Now each and every init process has a different way of handling what it
does, some do more than others, some do less.

They all have different way of being configured and this single topic
has raised polemics.


Let's note here that on Linux the init process can be specified as a loader
line inside the boot loader.

Finally, after the init process the login screen appears.


# Cool stuffs and tips


There are many distros used as quick-boot.
What is a quick-boot, it's an OS that boots really fast but has limited
usage, such as simple internet access, some even come inside the BIOS
of some distributors.

Let's name a few:
* Splashtop
* Instant WebKiosk
* HyperSpace
* Instant on

----

Another cool thing to know is that the documentation about booting a BSD
system are almost exactly the same for freebsd and dragonflybsd, it seems
as if they are just copied from one another.

Talking about that there are many good man pages about the booting process.
On netbsd type: man "afterboot".


----

Cool tip: You can troubleshoot stuffs from the bootloader itself if it
offers commands, that highly depends on the bootloader but check it out.

On BSD and Linux there is a single user mode, which is sorta like a debug
mode with high privilege, you can drop into it for repairing partitions
that don't boot correctly.

On BSD you just choose it at the loader, on Linux you might have to specify
the init process in the kernel flag to point to the shell of your choice or
/bin/sh.

----

One hard thing to do is to analyze the boot process, it's very hard to do
because you don't have filesystem access to write logs.

There are some NetBSD researchers that wrote a paper about optimization and
discussed this, you can check it in the show notes.
They had to write kernel logging functions to be able to track everything
they needed.

Other than that, you can analyze the boot process starting from the init
process.
Many init process have analytic tools.

systemd has first made a big claim with it's systemd-analyze tool which
can even output graphs and tell you what is eating up the most of the boot
time.

----

One last thing you can check are the splash screens.

Those are sort of fancy overlays image to hide the logs that appear at boot.

They are available on most distro.


# Conclusion


I didn't go into extreme low level assembly details here, neither specific
details.

If you want to do that you can refer to the show notes.

My goal here is to give the people that have no overview of the booting
process a clearer understanding of what is happening so that they can
debug their own Unix-like OS and appreciate it.

So this is it folks, hope you enjoyed it!


---

References:

- <https://en.wikipedia.org/wiki/Linux_startup_process>  
- <https://en.wikipedia.org/wiki/Booting>  
- <https://en.wikipedia.org/wiki/Coreboot>  
- <https://wiki.archlinux.org/index.php/Master_Boot_Record>  
- <https://wiki.archlinux.org/index.php/Fdisk# List_partitions>  
- <https://www.freebsd.org/doc/en/books/arch-handbook/boot-boot0.html>  
- <http://www.dragonflybsd.org/docs/handbook/Booting/>  
- <http://www.thegeekstuff.com/2011/02/Linux-boot-process/>  
- <https://www.freebsd.org/doc/en/books/handbook/boot.html>  
- <https://www.freebsd.org/doc/handbook/boot.html>  
- <http://glozer.net/soekris/diskless.html>  
- <http://www.netbsd.org/docs/network/netboot/>  
- <https://wiki.netbsd.org/guide/boot/>  
- <http://www.freenix.no/arkiv/daemonnews/200009/sb.html>  
- <http://linoxide.com/linux-how-to/systemd-boot-process/>  
- <https://en.wikipedia.org/wiki/Power-on_self-test>  
- <https://www.coreboot.org/>  
- <https://en.wikipedia.org/wiki/Libreboot>  
- <https://en.wikipedia.org/wiki/Das_U-Boot>  
- <https://en.wikipedia.org/wiki/GNU_GRUB>  
- <https://en.wikipedia.org/wiki/LILO_(boot_loader)>  
- <https://en.wikipedia.org/wiki/SYSLINUX>  
- <https://en.wikipedia.org/wiki/BootX_(Apple)>  
- <https://en.wikipedia.org/wiki/Comparison_of_boot_loaders>  
- <https://en.wikipedia.org/wiki/Preboot_Execution_Environment>  
- <https://en.wikipedia.org/wiki/Runlevel>  
- <https://en.wikipedia.org/wiki/Init>  
- <https://en.wikipedia.org/wiki/Systemd>  
- <http://www.cisr.us/downloads/papers/05paper_linux.pdf>  
- <https://en.wikipedia.org/wiki/Boot_sector>  
- <https://en.wikipedia.org/wiki/Master_boot_record>  
- <https://en.wikipedia.org/wiki/GPT_Partition>  
- <http://os.splashtop.com/>  
- <https://en.wikipedia.org/wiki/Instant_WebKiosk>  
- <https://en.wikipedia.org/wiki/HyperSpace_(software)>  
- <https://en.wikipedia.org/wiki/Instant-on>  

