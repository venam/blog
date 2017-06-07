---
layout: post
title:  "Terminals"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: 
podcast_ogg: 
---

# Terminals #

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=2108))


# Intro #


We spend so much time typing at a terminal and yet the underlying
mechanisms and history behind it are often overlooked.

The TTY is an integral part of Unix and we take most of its behavior
for granted even though it has a huge history baggage that it carries
to this day.

For instance pressing control-C or control-Z to stop or put in the
background a process, or using control-A to go to the beginning of
the line.

You might think that the control-A comes from the EMACS keybinds but it
doesn't, it's the opposite, the EMACS keybinds are inspired by the TTY.

In this episode we're going to dive in the world of terminals.

A big, rough, and unhoned overview of this part of Unix.


# The terminal itself #


## Definition ##


So really, what's a terminal?

This is a rather evolving or evolved definition, originally it was a
hardware device with a single purpose, now it more or less isn't.

Because of the changing definition many will disagree about it, even
fight over the semantics and epistemology.

The name itself is about: teleprinters/teletypewriters (TeleTYpewriter,
TTY).

> Originally, they meant a piece of equipment through which you could
> interact with a computer: in the early days of unix, that meant a
> teleprinter-style device resembling a typewriter, sometimes called
> a teletypewriter, or "tty" in shorthand. The name "terminal"
> came from the electronic point of view, then end of a serial connection,
> and the name "console" from the furniture point of view. Very early
> in unix history, electronic keyboards and displays became the norm
> for terminals.

Generically, it's an "input/output device which function is to display
and input data", but that's overly generic.

Thus many things are regarded as terminals, they come in many forms:

It could be a "serial devices connected by a serial port such as
printers/teleprinters teletypewriters, or modems supporting remote
terminals via dial-up access, and directly-connected local terminals.

Or it could be a "display adapter and keyboard hardware directly
incorporated into the system unit taken together to form a local
"console", which may be presented to users and to programs as a single
CRT terminal or as multiple virtual terminals".

Or it could be a "software terminal emulators, such as the xterm, Konsole,
GNOME Terminal, and Terminal programs, and network servers such as the
rlogin daemon and the SSH daemon, which make use of pseudoterminals".

For the moment we haven't talked about graphics and text but a lot of
the time when we think of terminals we picture character-cell terminals
or text-terminals with maybe a keyboard attached to it.

Those are devices connected to a host computer by a serial cable which
transfers the textual information, in ASCII or EBCDIC form. The text on
those terminals is displayed character by character from a pre-selected
array of characters that the terminal has for each.

But that doesn't mean it's only normal text that appears on the terminal
it can be represented in any way, a good example is the braille terminal
that displays the braille representation of asciis.

This kind of device can have a typewriter or a video display, in this
case we would call it a video display terminal or video display unit,
VDU, or "glass TTY".

But there are graphical terminals too that use vector mode or raster
mode and can display images.

The cable used to hook up the text terminal to the host machine is
usually a RS-232-C cable that talks the RS-232, the defacto protocol
of text terminals, which is plainly said just 1 start bit, 8 data bits
(the first 7 usually for ascii and the last one unspecified), no parity,
and 1 stop bit.

For graphic terminals the protocols could be Tektronix for vector
graphics, or ReGIS, or anything else as there are many and graphic
terminals weren't used that much.

This all make it seem like a terminal is just a thin client.

The device where you swipe/scan your credit card at a restaurant is
called a terminal too.

The word terminal in its traditional meaning is a device through which
you interact with a computer.

In the Unix world this all gets mixed up, a tty is a special file,
a character device with additional commands beyond read and write,
terminal may be synonymous with tty because the teletype were the first
to be terminal ends to computers, as we'll see.

A lot of the vocabulary is used interchangeably.


## Dumb & Smart ##


We now have a vague idea of what a terminal is, an input/output
bidirectional device that doesn't process anything, a thin client.

However that's not even close to what a terminal is.

There is a distinction between what some consider dumb terminals and
intelligent terminals.

In fact there are many different definitions that may contradict each
others.

Some say that "dumb terminals" are the ones that do no big processing
and only interpret a limited number of "control codes" such as carriage
return and line feed but don't have the ability to process special escape
sequence like clearing the screen. The "intelligent" terminals in that
case are the ones that process the special escape sequences.

Remember here the keyword "control codes", we'll come back to those
later on.

This also means that everything that travels the I/O streams for "dumb
terminals" is dead simple and unstructured while that for intelligent
terminals there could be format specifications, for instance TCP/IP is
a good example of such protocol.

But then again the RS-232 or similar protocols would only fit the dumb
terminal definition.

Another definition says that "dumb terminals" don't do their own
processing while "intelligent terminals" have microprocessor built in
them to process inputs before sending them.

Others say that "smart terminals" are "fat clients", that they don't
depend on a host, unlike thin clients. They do all the processing
themselves, while "dumb terminals" are "thin clients".

In that case Chromebooks and Citrix are considered dumb terminals.

But they aren't really, this was just an extreme example to show the
absurdity. Dumb terminal are thin clients but thin clients are not
dumb terminals.

Others say that the terms "dumb" and "intelligent" terminals are marketing
terms to sell personal computers and that in fact all terminals are
dumb from the straight go, that it goes with the definition of what a
terminal is.

I quite like that last approach.


## Some bits of history ##


Those are all fine definitions but they're not really precise, they're
just examples of what could represent the concept of a terminal.

The essence of terminals is more in their history than anything else,
and it's a changing history.

Let's start with a part that might be surprising, but when you think about
it is not so surprising, which is that the teletype evolved independently
from the computer in what you could call its infancy.

The teletype derives from a device that was invented in 1869, the [ticker
tape](https://en.wikipedia.org/wiki/Ticker_tape) or stock ticker which
was an electro-mechnical machine, basically a typewriter connected through
wires to the telegraph network that printed on ticker tape printer. It's
purpose was to distribute stock prices over long distances in realtime
over telegraph lines. This evolved into ASCII-based teletype which were
connected in a large network called a Telex, used to transfer commercial
telegrams. All of this without ever being connected to a computer.

On the other side computers were gigantic monsters that executed programs
through batch processing, that is you entered the program through a
punch card, for example, and then you couldn't do any manual intervention
until it was finished, that's it end of the line. Soon enough realtime
interaction was possible and teletypes were used as input and output
devices because they were already everywhere on the market.

Printing terminals were truly limited by the speed at which paper could
be printed, and for interactive use the paper record was necessary so
that you could see what you were typing.

The brand new shiny video computer displays were introduced at this point,
also nicknamed "Glass TTYs" or "Visual Display Units"-VDU, which had a
significant advantage and improvement over typewriters.

There were a lot of vendors but the two most popular and well known of
those were the (DEC) Digital Equipment Corporation VT100 and the IBM3270.

IBM 3270 because it was used with the IBM mainframe, not with Unix,
the VT100 was, and is still iconic today.

But why is the VT100 iconic, from all the vendors?

Digital Equipment Corporation which was founded in 1957 is one of the
classic company that made computers a bit more practical starting with
their PDP-1 that included a CRT in its operator console, then continued
with today's well known VT series of glass TTY.

At the time there were so many video terminal that the market was labelled
"the tower of Babel", each manufacturer had their own proprietary set
of terminal functions, codes, escape sequences, control characters, etc..

Each of them had different characteristics used to control the physical
appearance on the screen, some of the controls used when connected online
or offline, as in to a computer or not. Because remember that teletype
were there before being connected to computers.

It was a conventions used when the tele-typewriters were connected
to printers. Which was essential because both end needed to know what
characteristics the connection had. Both ends need to communicate the
exact same way, the default settings didn't cut it off.

More on that later...
Again remember that keyword "control characters", I said I'll come back
to it.

So programmers grew frustrated, there needed to be regrouping and
identifying of terminal types and related control codes to use.

A compatibility layer was needed for the panoply of different teletype models.

Eventually it led to the development of the ANSI standard for device
control, the X3.64 standard in 1977.

The VT100 from DEC, with its 8-bit Intel 8080 chip to interpret escape
sequences, was one of the first, but not the first, to implement
it. However it got really popular.

From this point on all terminals had backward compatibility with the
VT100, and more precisely the X3.64 standard, so programmers favored
the standard over added product features.

The output appearance escape sequences were now standardized

A last note on this topic.

Green monochrome screens, from IBM PCs for example, were not text
terminals, per say, to be pedantic. Those screens didn't contain any
character generation, the image displayed is processed by the CPU and
sent directly to the device to be displayed.

More on that in a previous episode about green on black.


## Terminal Emulators - AKA Today ##


It's good to know that there were terminal emulators for a long
time. Before TCP/IP that's what was used to remotely communicate with
terminals of different types, it was the emulation layer.

Modern personal computers have a built-in keyboard and screen and so
there's not much need to own a physical terminal anymore.

Instead we have terminal emulators and virtual consoles providing multiple
text-terminals on a single machine, which are provided by most of today's
operating systems, especially on Unix-like systems.

Terminal emulators are pieces of softwares which emulate and behave like
real text terminal to some degree, some with better emulation than others.

We'll dive into the architecture later on.

Those emulation softwares are compatible with all the most common terminal
escape sequences and control characters, they use the ANSI standard that
we talked about earlier X3.64.

It's pretty advantageous and useful to be able to support anything on
a single machine.

We'll talk about why is everything supported later one, using
termcap/terminfo.

Even though some argue that this emulation sometimes has many drabacks
such as the constructed architecture to make it work and physical things
such as the keyboard layouts not being the same, and the legacy aspect
it has.

> ...my experience with "VT100" emulators suggests that many, maybe even
> most, lack some fundamental capability [such as] the ability to respond
> to an auto-identification query, the ability to perform certain screen or
> cursor operations, the ability to transmit appropriate "editing keypad"
> escape sequences, etc. Beware.

Most of today's terminal emulators emulate the VT100 or at least are
compatible with it. For example xterm emulates VT220, urxvt the VT102,
the termite terminal uses the VTE library which is also used in the
gnome-terminal, a sort of easy wrapper that emulates the VT220.

How close a given terminal or terminal-emulator program comes to precisely
emulating a real VT100 can be measured by using the program vttest.

vttest - tool for testing VT100 compatibility of terminals
<https://en.wikipedia.org/wiki/Vttest>


# Control characters


## A First Approach ##


I kept on repeating that we'll explain what those control codes and
escape sequences are about, so let's do that now.

The terminal protocol only lets 8 bits, which 7 are ASCII, go over the
wire and so there was a need for a way to send special commands to the
terminal through ASCII, a way to control the terminal or the computer
that the terminal is connected to.

The rather simplistic way implemented was to add a key that if held down,
that key being the control key, and pressing another character it would
clear up, grounds, zeros the voltage, of the 7th and 6th bits, so that
the 8bits, ASCII character code is modified.

When you remove the 6 and 7th bit you don't get actual printing characters
but you get special ones that have a special meaning.

That's simple enough, right?

This is apparent when you look at a physical typewriter such
as the Teletype Model 33 ASR, which was originally used for
telegraphy. (<https://www.flickr.com/photos/osr/8699656409/lightbox>)
It was written on the keys what those control codes would do, on the
image I've linked you can clearly see the CTRL-G - BELL and CTRL-I - TAB.

One interesting consequence is that adding SHIFT to the Control code
doesn't give a new bit sequence. That is because holding shift has
the effect of setting to true the 6th bit which is then nullified by
holding control.

As a result multiple key combinations can be equivalent, for example:  

    Ctrl+i, Ctrl+Shift+i, Tab
    Ctrl+j, Ctrl+Shift+j, Enter
    Ctrl+[, Ctrl+Shift+[, Escape
    Ctrl+d, Ctrl+Shift+d, EOF
    Ctrl+g, Ctrl+Shift+g, BEL

Those could be advantageous when the usual key, for instance escape,
is not placed in an ergonomic manner, you can use the equivalent key
combination instead.

In the early days, the control character implementation was hardware
based, the changing of the ASCII code was done before being sent to the
machine, but these days every key are distinguished and the interpretation
is left to the software.


## Learning To Walk ##


Before continuing with the other kinds of special sequences let's
discuss some methods, docs, and investigation tools that can be used
to verify what happens when certain keys are pressed and interpreted by
the terminal.

The first most important one is the man page section 7 for `ascii`.

It contains a table of ascii characters where it's easy to see how
control characters are triggered, they're adjacent to their non 6&7th bit
nullified version. For example the "start of heading" control character
is next to the "A" character, pressing ctrl-a is equivalent to entering
the "start of heading".

Another thing you can do with that table is checkout the list of control
characters.

Now a great way to actually analyze what is happening when entering
characters on a terminal is get inside a mode where only the terminal
interprets them via its reading library, via its `readline` function,
or any of its low level mechanism.

You can run `cat -v` or `tee` or `script` and enter the key combination
you want, it'll greet you back with a visual representation of those
non-printable characters we call the "caret notation".

For instance it shows `^[` , caret & bracket, for the escape character.

This is an easy way to make sure everything you thought was happening
is truly happening.


## Flow Control ##


There are two control characters that are present for the control of
transmission over the RS-232 protocol.

They are usually called "flow control characters" as they have the
ability to tell the terminal to stop the transmission and to resume it.

The XOFF and XON controls, which are otherwise referred in the ASCII
table as device control 1 and 3 respectively.

This is a useful feature if the computer at the end of the terminal is
sending characters too fast and the terminal is not able to keep up with
the printing.

As we said and will come back to later, every terminal has their own
settings and features and the computer and the terminals had to agree
on what base settings they are gonna communicate.

One of those settings is the baud rate, the rate of character transfer,
the output speed of the terminal in bits per second.

You can imagine that the flow control is useful if a terminal is
mis-configured and its baudrate is lower than what the computer presumes.

We'll come back to the settings later.


## Meta|Special|Super|Magic ##


What's up with the other special keys on the keyboard?

Generically, those keys are called "modifiers" as they change the behavior
of other keys when you hold it.

We already saw one subset of those modifiers when discussing control,
another subset is about "bucky bit"s.

A bucky bit is a bit that gets set when you press a modifier at the
same time.

You might already know one, for instance we talked about the SHIFT key
which set the 6th bit, but that's the exception to the bucky bit criteria
because SHIFT isn't considered a bucky bit changer.

One of those "bucky bit setter" originated from the MIT Lisp machine
keyboard, the space-cadet keyboard, and the Sun Microsystems keyboard,
which had a META and diamond keys which would set the 8th bit to true,
the 8th bit which value was left unspecified because the ASCII set fit
in 7 bits and not 8.

And so by only checking the 8th bit is set you can know if
META/Special/Super is pressed or not.

The Meta key is used a lot these days for multiple purposes, but that's
all left to the software interpretation and not the terminal. There are
now many new bucky bit setters these days but that's not a subject for
this podcast.


## On the Alt, Meta, & Esc Keys ##


Another modifier is the ALT key, the weird kiddo in the family.

It's original purpose was more or less one of a bucky-bit setter, but
it then morphed with time.

ALT historically comes from IBM PCs where you held the ALT key and
typed decimal numbers on the keypad to insert character by their keycode
instead of typing them. It was used for characters that didn't appear
on the keyboard such as UTF-8 chars for other languages. The way it
worked was by using a BIOS buffer that would wait for input when ALT
was pressed and then map it as if it was a single keystroke.

This is a feature we today refer to as a "compose key" or "Alt codes key".

ALT was re-purposed to serve as a META key when Unices were ported to the
PC, but the technique of setting the 8th bit to 1 was not so compatible
with the advent of networking, which would mess up the bits. That last
bit is not inside ASCII. META-aware application checking the 8th bit
was not viable anymore, it would cause troubles.

Instead they found a new way to do META-like behavior, they would
first send and "ESC" before sending the character that was pressed when
holding ALT.

This more or less worked because applications were already handling
ESCape codes, a series of characters to manipulate at a software level
the appearance of text on the screen, and so they were already waiting
to process the rest of the stream.

Those escape sequences we talked about earlier.

Now meta would mean, "if you see escape whatever follows should be
considered as if it was entered with META held down".

This creates the issue that you can't have separate key interpretation in
your terminal software for ESC and ALT+char since they are the same thing.

ESC sends directly an escape characters while ALT waits for a second
character to follow.

For instance when in Vim while in insert mode if you press ESC or
ALT+anything it will go back to normal mode.

Or open a terminal and type some command for instance "ls -lah" then
try "ALT-b" to go a word backward, then "ALT-f" to go a word forward,
now replace ALT with ESC but press each key separately, see how it
accomplishes the same thing.

Now you too have to add to the equation what we've talked about earlier
about equivalence when you hold the control key and you get an idea of
the mess.

Moreover, on slow and low quality connections this can cause issues if
the handling of the ALT key is left to the application at the other end,
this is usually corrected by increasing the time it waits for a key
following the ALT.


## Internal Functions Keys ##


One last thing to mention are the internal to the terminal debugging
or functionalities/features.

There are a bunch of keys, the function keys that act on the terminal
itself and are not transferred.

According to your definition and depending on the features of those
function keys you could possibly call those terminal "intelligent
terminals".

Those keys were originally used to debug and have an idea of what was
sent over the wire.

On other terminals where you could connect to multiple computers they
are used to switch between sessions.

But I have something to admit, whatever I said about the purpose of keys
and their interpretations is a bit of a lie, more or less.

Those all depends on the terminal settings and their interpretation by
that terminal. It's not anchored, so take it lightly. This is what we're
gonna discuss next.


# Terminal settings #


As I've said those special characters varies from one terminal to the
other, but they also vary in their interpretation at the host level. This
layer of configuration and agreement between the host and terminal,
of what settings are set for what terminal is what we're going to
discuss now.

Later on we'll deal with the architecture of the terminal emulation
interface and how things fall into place.

The actual interpretation of control codes resides in the POSIX termios
interface.

> The termios functions describe a general terminal interface that is
> provided to control asynchronous communications ports.


## Physical terminals ##


Historically, physical terminal were connected to a UART, a Universal
Asynchronous Receiver and Transmitter. Which is a hardware component
that controls serial communications sending bytes asynchronously from
one end to the other with adjustable speed rate.

> The UART is a computer hardware device for asynchronous serial
> communication in which the data format and transmission speeds are
> configurable.

So the terminal and host are connected to the UART and the OS manages
this via the UART driver to control the speed of the transmission,
the parity, and the control flow.

In direct relation with that, Unix systems used to manipulate and
interpret the input and output streams with the ioctl() system call
before that with stty() and gtty() system calls.

ioctl() reads stream from the terminal device file, as with Unix
everything is a file.

This is called "line editing" or "line discipline", which is a buffer
that the OS provides for interpreting, editing, erasing, clearing lines,
reprinting, echoing, etc..

Basically, a "line discipline" aka LDISC is an input/output policy for
interpretation of characters that goes with the terminal requirements,
it sits one layer above the serial driver and shapes its behavior. It's
the glue between kernel space and user space.

There's a "line disciplines" for every terminal attached to the machine
according to the terminal and host settings.

On Linux you can check the current line discipline for the tty in use
at the special: `/proc/tty/ldiscs` file.

Along with that comes the session management that knows what to do with
processes according to the control character received. For instance
putting a process in the background or foreground.

We'll discuss more of that later with the architecture.

Together, the UART driver, the line discipline instance, and the TTY
driver, can be referred to as the TTY.


## Standards ##


Simply explained for now, there's a controlling terminal, a terminal your
shell is connected to, a terminal with specific settings, and there's a
line discipline, or some layer that intercepts and understands control
characters you enter via that terminal.

But it was not all that great in the days.

For instance there was a time when some keys were set in the drivers,
for instance to represent "erase" and "kill" you were forced to use '#'
and '@' and you couldn't change it. Or then later you could only change
it as part of the login process.

There were many different interfaces for different Unixes which led to
the need for standardization, which POSIX took on.

They made every Unix use a single specification for the "line discipline",
and integrated the BSD job control (which we'll discuss later). They
dumped the raw ioctl(), which was different from platform to platform, for
the more generic abstract termios that can be ported to any architecture.

The names and parameters to configure the terminals got standardized
through a data structure that contains all the options.

Now processes can read and modify the configurations of the opened TTY
devices via a cleaner and stable interface. And if you're writing a
program that intercepts those control characters or disables them or
interact with terminal streams you can use that as the base.

That data structure in the termios, a simple C data structure, is the
representation of a terminal interface.

There are also functions that let you interact with that structure,
namely the `tcgetattr` and `tcsetattr`.


```
struct termios {
    tcflag_t c_iflag ;  // Input modes
    tcflag_t c_oflag ;  // Output modes
    tcflag_t c_cflag ;  // Control modes
    tcflag_t c_lflag ;  // Local modes
    cc_t c_cc[NCCS] ;   // Control characters
};
```

The data structure contains the UART parameters, the line discipline
stuffs, and the control stuffs, all in one place.

It has flags for many configs that you can enable or disable, there's
a good list of them in the `termios` man page.

For instance you can set the baud rate, the speed of the UART, or the
parity, with the `c_cflag` field in the structure.  Or you can change
the input or output modes with the `c_iflag` and `c_oflag`, or even
what the control characters mean via the `c_cc` field, or how signals
are fired via the `c_lflag`.

The output processing flag affect how certain characters are displayed
on the screen, for instance the newline and tab characters.

The input processing `c_iflag` directly affect how the `read()`
system call works on a terminal device and how the line discipline and
signal-generation will work.

There are multiple modes that are possible:

There's the character mode aka character-at-a-time or raw mode, which
let's everything you type to be sent immediately to the receiving
system without even doing any line editing or interpretation of control
sequences. Everything is treated as normal character input and the
application receives entire character streams unaltered.

There's the line mode aka cooked mode aka line-at-a-time mode, which
provides a local line editing buffer function, and sends an entire input,
when pressing RETURN, line at a time after passing through the line
discipline. A so-called "line mode terminal" operates solely in this mode.

There's the cbreak mode, which is another subset of the
character-at-a-time modes jokingly referred to as a "half-cooked" mode
or "rare" mode, which like the raw mode sends directly all characters
to the application without line discipline performed however it handles
"interrupt" and "quit" control characters, as well as modem flow control
or signal generation characters.

There's a last mode which is the block mode, aka screen-at-a-time mode,
which sends whole screens to and from the terminal. The user fills many
forms and then sends the data to the server. Sort of like a web REST API.

The popular terminal IBM 3270 for the IBM mainframe we talked about
earlier is block oriented.

When you think of it block modes are one of the instance of "intelligent
terminal" in one of the earlier definitions we gave.

POSIX doesn't have anything for that kind of the terminals, it wasn't
built for block terminals.

Some refer to the line mode as canonical and the raw mode as
non-canonical.


## Command Line ##


The programmatic interface to control terminals might be too tedious
so a much more convenient way to configure the terminal is to use the
`stty` command directly from the shell. It is a thin wrapper around the
functions of the termios API to set and get values.

The `stty` command acts on a terminal device and by default if you don't
pass the parameter it acts on the one you are connected to.

To get the terminal you are currently sitting at you can use the `tty`
command, but it might not be portable.

When you call `stty` without arguments it prints out the differences
between the current settings and what it considers "sane" defaults. When
you pass the -a, or everything on BSD, it print the values for all the
flags of the termios structure in a human readable format.

You can also set or unset flags and options as you wishes adding a dash(-)
before it for switching off and nothing for setting it.

Overall, it's an easier way to interact with termios.

For example, you can play around with the control characters by changing
what the interrupt character is instead of the usual default of ctrl-c or
change the erase character from backspace to something else or change
the word erase character from ctrl-w to something else or you can
disable control flow or change the baud rate, change between canonical
and non-canonical mode, enable echoing back to the screen, change the
number of rows and lines, etc..

There are a lot of interesting things you can do and it's a portable
way to do it.

You can add those to your shell so that your preferred settings are
there at login. The issue becomes if your terminal emulator intercepts
and does something with it before sending it to the line discipline,
which then nullifies its effect.

Though it's better to get used to the default "sane" settings, like
ctrl-u for line erase, like that you'll be at ease on any terminal.


## Applications Expectations ##


Applications are written to run on many, if not all, terminals.

It doesn't want to care if it's a physical "vt100" or if it's PUTTY
on windows.

The software gets "told" which terminal it is currently working on and
assumes and expect certain capabilities in response to that.

Usually that name is stored in an environment variable called TERM,
this variable can be automatically set or manually set.

The `tset` or `reset` or `getty` programs initializes that value by
querying the terminal trying to find a sensible state, it's usually
called inside a .profile or anything that's there before.

That implies that before login the system can not have any idea what kind
of terminal you are running. It's a misconception that misconfigured
terminfo/termcap/gettytab or $TERM environment variable affects the
ability to login to a terminal.

Sometimes the expectations of the program are wrong, an example would
be to think the terminal has 20 columns instead of 10 and that can mess
the output but that usually happens if it's a badly written program.

Most softwares assume the most common default terminal settings, the
standard one we discussed in an earlier section, the VT100, just so that
the software and terminal can agree on something.

But How Do You Know which settings goes with which terminal?

How do you map the terminal settings related to the terminal in that
TERM environment variable?

That's where terminfo and termcap appear.

They are are databases of terminal capabilities and features which mainly
are comprise of the escape codes that are supported by the terminals,
those are mostly for visual attributes.

But it doesn't take car of everything, for instance it's the `tabs`
program that is used to control the tab behavior on terminals and not
necessarily terminfo nor termcap.

The terminfo is the newest version of the termcap one, termcap can be
converted to terminfo using the captoinfo command.

termcap is a text file in `/etc/termcap` while terminfo is a bunch of
binary files in sub-directories under `/usr/lib/terminfo` for every
different type of terminal.

Libraries such as ncurses are built on top of terminfo so that it can
use the escape codes properly.

It's better to retrieve them from the database then to have them
hardcoded, and yes, there was a time where those have been hardcoded
in softwares.

There's a much simpler version of termcap for BSD that is called by
`getty` during login called `gettytab`.

For example checkout the `infocmp` command which will output the escape
characters for your current terminal or the `tput` which can be used to
query terminfo.

For more information you can check the man pages for `terminfo` and
`termcap`.


# The architecture #


Now let's deal with the architecture.

How does everything fall into place, all the pieces.

First of all let's review a bit of what we've seen so far.

We have the physical terminals with their history, capabilities, and
keys that are connected via RS-232 to the host.

Or those could be virtual terminals, we'll discuss how those work in a bit.

Then there's the mapping of the terminal as a file device in /dev so
that it can be interacted with.

For instance you can check the man page `ttyS` to find out how to manually
create this file for serial terminals.

After that there's the actual login, then the tset or getty to get & set
the TERM environment variable to the appropriate value and appropriate
related terminfo.

> The getty utility is called by init(8) to open and initialize the tty
> line, read a login name, and invoke login(1).
> 
> The argument tty is the special device file in /dev to open for the ter-
> minal (for example, ``ttyh0'').  If there is no argument or the argument
> is  `-', the tty line is assumed to be open as file descriptor 0.

After that starts the actual architectural cycle of input, send,
interpret, loop.

What we've seen so far of that is the actual physical input on the
terminal, the transfer of 8 bits for RS-232 (or RS-422 or RS-485 serial
interface) , the UART to control the rate of transfer/baud-rate, and
the line discipline that is attached to this current terminal with
its settings.

Now let's actually finish that cycle by discussing the architecture
of virtual terminals, of virtual consoles, and of session and process
control that we said we would come back to.


## Generic Arch ##


Unix was designed with this sort of thin client, or dumb text terminal if
you prefer, in mind. Much of the architectural thinking emerges from that.

That's why it was helpful to review a bunch of things about terminal
before explaining the architecture.

On most Unix there are many terminal drivers responsible for the
underlying control of the I/O instructions and interrupt requests for
input and output, that can be used in different situations, the console
driver, the virtual console (vc) driver, the serial driver, the pseudo
terminal drivers, etc..

The line discipline itself is independent from the driver.

```
/proc/tty/drivers
/dev/tty             /dev/tty        5       0 system:/dev/tty
/dev/console         /dev/console    5       1 system:console
/dev/ptmx            /dev/ptmx       5       2 system
/dev/vc/0            /dev/vc/0       4       0 system:vtmaster
serial               /dev/ttyS       4 64-95 serial
pty_slave            /dev/pts      136 0-1048575 pty:slave
pty_master           /dev/ptm      128 0-1048575 pty:master
unknown              /dev/tty        4 1-63 console
```

We've already seen how the physical line for physical terminal worked,
and this doesn't change much even if you add a long-distance phone
line in the middle, be it a corporate terminal or console server or not
(Which is outside the scope of this podcast).

```
Terminal <-> modem <-> physical line <-> modem <-> UART <-> ...
```

Now how does the Linux console work, it's not a physical terminal,
it's directly attached to the same machine you are running Linux on.

You got on one side the display with its VGA driver.
On the other side you have the keyboard with its keyboard driver.

Both are connected to a terminal emulator, one end for output - the
screen, and the other for input - the keyboard.

This terminal emulator is connected to the line discipline as usual plus
the TTY driver for the capabilities and the rest, and that TTY driver
handles user process management.

```
display <- VGA driver <- terminal emulator <-> line discipline <-> TTY driver <-> user process
keyboard -> keyboard driver .-^
```

The only big difference is that there's no UART, this is handled in the
emulator, "video terminal", instead.

Let's also note that this doesn't employ terminfo, the console has its
own set of escape codes and special sequences hardcoded.

Or sometimes is has a simplified version of those info, for example the
`gettytab` file, which is a simplified version of the termcap database
accessed during the login process.

When we move up to userland things get more abstract.

It uses a concept called the pseudo terminal or pty a virtual terminal,
which now requires two different driver part (under /dev again), two
different end-points, one called the PTY slave or pts and another the
PTY master or ptmx.

Both ends are bidirectional communication channels but do different jobs.

The processes connect to the slave end, the slave behaves exactly like a
classic terminal, the slave driver responds to what the line discipline
sends it.

On the other end, the master side is the one that acts as input and
output. It sends the characters to the line discipline so that it can
interact with the slave and receives back the output of the interaction.

It's the master that is connected to your terminal emulator and the
slave that is connected to the program you are running.

Whatever is written in one end can be read out from the other after
passing through the line discipline.

```
Line discipline <-> TTY driver (PTY slave side) <-> user process
 `-> PTY master side <-> xterm process
```

Technically under Linux the ptmx is a character file with major number
5 and minor number 2 and owned by the root user. When a process opens
/dev/ptmx it gets back from it a file descriptor to a slave, a pts
device under /dev/pts directory, which will be owned by the user that
requested it.

Every time you request from the master you get a different slave, this
slave file is the reply to the `tty` command we talked about earlier.

Note that there's usually a limit to the number of opened pseudo
terminal, in Linux you can check it in `/proc/sys/kernel/pty/max`,
usually 256. Another file `/proc/sys/kernel/pty/nr` in Linux indicates
the number of already opened pseudo terminals.

Now when you want to open the pseudoterminal slave for process interaction
you must pass the master's file descriptor to be able to unlock it,
so that it grants you access.

There's a bunch of POSIX system calls that helps with all that such as
`posix_openpt, getpt, grantpt, unlockpt, ptsname`, etc..

The BSD style of pseudo terminals provides them as precreated pairs
with names of the form of /dev/ptyXY for the master and /dev/ttyXY for
the slave.

For example /dev/ptyp1 and /dev/ttyp1 is a BSD pseudoterminal pair. When
a process wants a pseudo terminal pair on BSD it tries to open(2) each
pseudo terminal master until it succeeds.

It's also nice to know that you can send data to the slave pseudo tty from
the command line and it'll get processed and outputed to the master end.
It's useful to send input to programs that don't usually accept input
such as su or passwd. It can also be used for chatting.

This whole pseudo terminal thing is a bit of a hack to facilitate terminal
emulation in userland and not break the TTY subsystem.

Also here, you can note that there's no UART, obviously.

Pseudo terminals have kernel buffer to sync the rate of data flowing
which is the same thing as the baud-rate.

When the process can't call write(2) to a stream because the buffer is
filled it puts the process in a sleep state, and then alternates it back
to running when it can.

And as with physical terminals you can stop the stream using flow control
characters XON, XOFF.

This shows how the OS process states are tied to the flow.

On a terminal you usually run processes, and frequently it's through
the shell, the command prompt.

So let's take a step back and see how all of this fits into the process
model.

For example when ctrl-c is received it won't be handed off to the
application through read(2), but will instead cause a SIGINT to be
delivered to the foreground job.

Why and how is that?


### Signals ###


In kernel land, things communicate via interrupts, be them hardware
interrupts or software interrupts.

Signals are a sort of software interrupt and this is what the kernel
uses to communicate with processes. In our case, it's the line discipline
that lives in kernel land and that sends that to the processes.

If you want more info about signals you can go back to the episode we
had about them.

One interesting thing to add to what we previously discussed is how the
name and behavior of the signals originated from the actual physical
terminals.

For instance SIGHUP is a signal that indicates that the UART driver
hanged up, that the connection is cut.

SIGINT, is a signal sent by the TTY driver to the foreground process
to say that the control character for interrupt, ctrl-c usually, has
been received.

There's also a signal sent for when the terminal size changes, the
SIGWINCH.

There are quite a bunch of them.


### Job Control ###


If you remember I've mentioned that POSIX implemented along with the
termios the job control mechanism of BSD.

It was a feature of the C shell.

This allowed flexible manipulation of processes.

A shell gets a terminal session, that means access to a slave terminal
for example.

And then there's an array of processes under that session called the
process group.

The processes within a group are called jobs.

There's the notion of foreground process in the tty driver, the process
that receives the signal that is sent to that session, and the process
who may perform input and output to that terminal.

There's only one foreground process for one session on a terminal.
It's a way to control which process may perform input output from the
terminal at a given time.

There are also signal sent because processes from that group that aren't
the foreground process, so called background processes, because there
can only be one foreground, are trying to access the controlling terminal.

The grouping also allows you to deliver signals to them all at the
same time.

You can swap between which job within the group is the foreground or
background one using those signals, putting the one in the foreground
in running state and the others in the wait state.

For example when you login you get a session created by the setsid()
system call on the login terminal, and all processes there are under the
same group and inherit this terminal, and the foreground process is the
session leader of that process group.

It's the session leader that tells the terminal which job is the
foreground one.

When a controlling terminal process terminates the session ends and it
allows it to be acquired by a new session leader.

Process management is outside of the scope of this episode so we'll keep
to what is interesting to us.

This is the kind of structure inside a TTY driver, here pts:

```
TTY Driver (/dev/pts/0).

    Size: 45x13
    Controlling process group: (101)
Foreground process group: (103)
    UART configuration (ignored, since this is an xterm):
        Baud rate, parity, word length and much more.
        Line discipline configuration:
        cooked/raw mode, linefeed correction,
        meaning of interrupt characters etc.
        Line discipline state:
        edit buffer (currently empty),
        cursor position within buffer etc.
```

Overall, it's all about juggling with signals and swapping between
foreground, background.


# Conclusion #


One thing we forgot to add to the equation is the layer the shell
has before interacting with the terminal architecture. This adds more
complexity as the shell can capture and interpret characters which could
be other control characters. And over all that, if you're running an X
environment and communicating over SSH, this all becomes overly complex
for the simple explanation I provide here.

If terminals interests you you can get one of the old physical one and an
adapter for the RS-232 protocol, or whatever the protocol that terminal
uses, so that you can have fun with it.

Terminals themselves and the architecture is a bit messy but it is still
very useful and widely used. You can't really remove terminals because
of the huge baggage, the existing tooling, and expectations softwares
have for them. If you really wanted to replace them you'd have to support
backward compatibility and it would go against the point of innovation.

This is all truly fascinating, the whole story and how it evolved with
time and all the pieces joining each others.

This was a bit of a rough explanation but I hope it was fun to go through.

As usual, if you want more info you can check the show notes and the
related manpages. You can even go through the POSIX standard page,
it'll be easier to read now.

Cheers!

------------

Music: 
Libre De Droits/Creative Commons - Volume 1 : Experiences
by Maxime Blégent (Azolan Sollicitus)
<https://azolanmusic.bandcamp.com/album/libre-de-droits-creative-commons-volume-1-experiences>


------------

References:

History:

- <https://en.wikipedia.org/wiki/Computer_terminal>
- <https://web.archive.org/web/20100523190056/http://www.cs.utk.edu/~shuford/terminal>
- <https://web.archive.org/web/20100606062250/http://www.cs.utk.edu/~shuford/terminal/dec.html>
- <https://unix.stackexchange.com/questions/4126/what-is-the-exact-difference-between-a-terminal-a-shell-a-tty-and-a-con#4132>
- <https://askubuntu.com/questions/14284/why-is-a-virtual-terminal-virtual-and-what-why-where-is-the-real-terminal>

Text-terminal:

- <http://tldp.org/HOWTO/Text-Terminal-HOWTO.html>
- <https://en.wikipedia.org/wiki/VT100>
- Ported terminal from RS-232 to TCP/IP <https://web.archive.org/web/20160326114119/http://aplawrence.com/Reviews/portserver.html>
- <https://oldfellowstoys.net/usb-to-rs-232-adapter-110-baud/>
- <https://en.wikipedia.org/wiki/RS-232>
- Architecture serial console: <http://www.tldp.org/HOWTO/Remote-Serial-Console-HOWTO/>
- <https://en.wikipedia.org/wiki/ANSI_escape_code>
- <http://www.noah.org/python/pexpect/ANSI-X3.64.htm>
- <https://www.commfront.com/pages/3-easy-steps-to-understand-and-control-your-rs232-devices>
- <https://en.wikipedia.org/wiki/Block-oriented_terminal>

Keys, Modifying Keys & Control Chars

- <https://en.wikipedia.org/wiki/Control_character>
- <https://en.wikipedia.org/wiki/ANSI_escape_code>
- <http://catern.com/posts/terminal_quirks.html>
- <https://lyngvaer.no/log/understanding-modifier-keys-in-terminal>
- <https://en.wikipedia.org/wiki/Caret_notation>
- <https://en.wikipedia.org/wiki/IBM_PC_keyboard>
- <https://en.wikipedia.org/wiki/Modifier_key>
- <https://en.wikipedia.org/wiki/Super_key_%28keyboard_button%29>
- <https://en.wikipedia.org/wiki/Control_key>
- <https://en.wikipedia.org/wiki/Alt_code>
- <https://en.wikipedia.org/wiki/Meta_key>
- <https://en.wikipedia.org/wiki/Bucky_bit>
- <http://docstore.mik.ua/orelly/unix3/upt/ch05_08.htm>
- <https://lyngvaer.no/log/understanding-modifier-keys-in-terminal>

Terminal Settings

- <https://en.wikipedia.org/wiki/UART>
- <https://en.wikipedia.org/wiki/Line_discipline>
- <http://www.linux-mag.com/id/1891/>
- <https://www.freebsd.org/doc/en_US.ISO8859-1/articles/serial-uart/>
- terminfo resource: <http://catb.org/~esr/terminfo/index.html>
- <http://stackoverflow.com/questions/358342/canonical-vs-non-canonical-terminal-input#358381>
- <https://web.archive.org/web/20160324124043/http://aplawrence.com/Unixart/terminals.html>
- <http://www.linux-tutorial.info/modules.php?name=MContent&pageid=73>
- <http://aplawrence.com/Unixart/termcap.html>
- <https://docstore.mik.ua/orelly/unix/upt/ch05_07.htm>
- <http://www.tldp.org/HOWTO/Text-Terminal-HOWTO-16.html>
- tset and reset
- man 5 terminfo
- man 5 termcap
- terminfo and termcap
- tput
- infocmp - compare or print out terminfo descriptions
- man (1) captoinfo

Architecture:

- <http://www.tldp.org/HOWTO/Text-Terminal-HOWTO-15.html>
- <https://www.freebsd.org/cgi/man.cgi?query=getty&sektion=8>
- <https://www.freebsd.org/cgi/man.cgi?query=gettytab&sektion=5&apropos=0&manpath=FreeBSD+11.0-RELEASE+and+Ports>
- <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/5/html/Deployment_Guide/s2-proc-tty.html>
- <https://en.wikipedia.org/wiki/Terminal_server>
- <https://en.wikipedia.org/wiki/POSIX_terminal_interface>
- <http://www.linusakesson.net/programming/tty/>
- <http://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap11.html>
- <http://www.unix.com/man-page/FreeBSD/4/termios/>
- <https://blog.nelhage.com/2009/12/a-brief-introduction-to-termios/>
- <http://www.unix.com/man-page/freebsd/4/tty/>
- man 7 pty
- man 7 pts or man 7 ptmx
- Job control: <http://www.informit.com/articles/article.aspx?p=366888&seqNum=8>
- Process model: <http://www.informit.com/articles/article.aspx?p=397655&seqNum=6>
- parent terminal: <https://nixers.net/showthread.php?tid=1925>
- session & process: <http://stackoverflow.com/questions/6548823/use-and-meaning-of-session-and-process-group-in-unix>
- process group: <https://en.wikipedia.org/wiki/Process_group>
