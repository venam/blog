---
layout: post
title:  "Default Unix Programs"
date:   2016-11-25
categories: unix
podcast: 1
podcast_mp3: http://podcast.nixers.net/feed/download.php?filename=nixers-podcast-2016-09-251.mp3
podcast_ogg: https://raw.githubusercontent.com/nixers-projects/podcast/ogg/nixers-podcast-2016-09-25.ogg
---


(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1994))

Default Programs

Welcome to hell, choose your default program!


# Introduction

Welcome to hell, choose your default program!

You'll soon learn in this podcast why this subtitle was chosen.

Let's go, follow my train of thoughts and don't get lost.

The default programs...

# Definition

What's a default program?
Default for what?
What's does default even mean?

Probably something that happens without your interaction, a choice made for
you when you don't want to choose.

The usual normal most plausible way of handling things.

That sounds like a good definition.

So a default program is chosen automatically to launch something.

But launch what exactly, files... there's really nothing else on Unix.
So default programs launch files.

Fair enough, that's simple so far.

Now let's go back in time.

# Environment variables

The first thought that came to mind when thinking of default programs
was environment variables.

I dedicated a podcast episode to environment variables in the past,
you can go back to it for more info.

Ok, so why did I think of that.

Remember there's something very common on the command line because everything
is text, text editors obviously.

There are two environment variables that uses those, they are for the default
choices: `EDITOR` and `VISUAL`.

The difference is that visual is for full screen editing, like emacs
and vim, and editor is for advanced terminal editing, like ed So Editor
is more command line oriented and visual more visually oriented.

Programs that want to open a text file will refer to those environment
variable as the default text editors.

# Shell

Another of those prevalent thing on the CLI, is the shell itself.

And that's, in my opinion, the oldest and first kind of "default program".

The default shell is chosen via the chsh utility.

# Env

We're also executing things on the CLI.
We know they are executable because they have the executable bit set.

But what about scripts like shell or perl scripts for example.
How's the default handling for that, with what are they executed?

That's what the env utility is helping with, selecting the most
appropriate default environment to run the program in.

It's main usage is to modify the environment however most of the time
env is used at the top of scripts in a "shebang",

> So this #! mechanism origins from Bell Labs, between Version 7 and Version 8,
> and was then available on 4.0BSD (~10/'80), although not activated per default.

, to launch the correct interpreter, the environment isn't really
changed here.

How does it achieve that, by searching the PATH environment variable.

We had quite an argument about it on the forums, you can read our opinions.

The core of the argument was about the issues related to env, actually it
was a thread that linked to a blog post, and usually blog posts are for
nagging.

The problems the author of that post were about his concern that the PATH
environment variable might not point to the right interpreter and that env
can only take one flag/argument, amongst other things.

But isn't that what a default program launcher should do, get the first most
appropriate program to run it, get the best env in this case, that's what
we're using it for: launching with the current environment defaults.

So that's for scripts.


# New complex world?

Nowadays we don't only have one simple sort of text file, and not only
text files, we have binary data, images, etc..

We need to open those.

And enviroment variables aren't the way to go...
It's too inflexible, it's too stiff, it's exactly what another operating
system uses.

There are way too many different file types.

I've linked a little list in the show notes to give you an apercu.

How is that handled?

Unix doesn't have file types at the kernel level like other OS such as
windows. That's partly because of the use of ELF which don't include
it inside of them, it doesn't have to examine the extension to know that a
file is executable for instance or that it's an image.

File extensions are not imposed.

We also don't have to do, most of the time, the association manually
like other operating systems.
It seems to happen magically...

# Media Types

Then how the hek do you know what type or format is a file and how to
open it?

That's where media types enter.

What are they?

Wiki def?


> A media type (also MIME type and content type) is a two-part identifier
> for file formats and format contents transmitted on the Internet. The
> Internet Assigned Numbers Authority (IANA) is the official authority for
> the standardization and publication of these classifications. Media types
> were first defined in Request for Comments 2045 in November 1996, at which
> point they were named MIME (Multipurpose Internet Mail Extensions) types.


So it's a file format or content or type identifier that uses a standard
format called RFC 2045.
Simple enough.

History wise the name MIME, Multipurpose Internet Mail Extensions,
format comes from the email format in RFC 822, it's a meta-format to
embed information within this format, don't confuse it with MIME types,
that mean something else today because they're used outside emails.

What does that look like this format?


A media type is composed of a type, a subtype or extension, and optional
parameters, the type and subtype are separated by a slash.

So it looks like Type/Extension,
for example, an HTML file might be designated by text/html.
Or for pdf: application/pdf
For png images: image/png

The first part is the more abstract top-level while the second part of
the MIME-type is expanding faster, for example with new applications or
data encoding standards.


Actually the currently registered top-level type aren't that many,
let's name them: application, audio, example, image, message, model,
multipart, text, video.

# Standards

It's very nice to have a standard for categorizing file types but so what,
how does that help, how is it used across the system.

Let's open useful parentheses and talk about the role the freedesktop
organization.

What's freedesktop.org, it is a project to work on interoperability and
shared base technology for free software desktop environments for the
X Window System (X11) on Linux and other Unix-like operating systems.

In sum, they have standards for all the little details of a full fledge
desktop environments.
From where the recycle bin is to how windows should communicate.

From that definition we might think that it's totally X specific.
Meh, that's sorta' comprehensible but still.

How do they put this in place.

First they have a list of standards you can read about online, they're not
boring at all, which is surprising.

Other than that they have a bunch of utilities:
The relevant ones for this podcast are:

* shared-mime-info which is a huge database of common mime type info,
which we'll discuss in a bit

* libmimetype which let you interact with mime types

* and the xdg-utils which are the implementation of a bunch of desktop
functions such as interacting with the mimes in our case

Notice that xdg in front of util, that's because that once was the name of
the freedesktop.org, they were formerly known as the X desktop group.


# Relation

Let's go back on topic and talk about how does the system handles and
knows that a file is of a certain mime type and execute it.

Here's the generic overview of how it's solved:
The mime type of found for the file and then there's an association
between the mime type of the file and something that executes it, which
is the desktop entry.

# Detection of type

The first step involves detecting the file type.
There are two common ways of determining the file type:

* using the file name extension, for example .html or .jpeg
* using the so-called "magic bytes" at the start of the file

The first method is very simple and fast, but inaccurate if the file is
not named "correctly". The second is more accurate, but slower.

So yeah, there's a list of extensions and of magic bytes that comes with the
freedesktop package I mentioned earlier, shared-mime-info.

So on the system there's a database of MIME-type information with default
generic mime info and new ones registered via the installed applications'
.desktop files which we'll discuss later, for now just remember that
desktop entries are a sort of meta or description of the executables.

The location of that mime database is usually in `/usr/share/mime/` for
the global database and in `~/.local/share/mime` for specific user database.
The default huge fill up standard MIMEs from freedesktop are in:
`/usr/share/mime/packages/freedesktop.org.xml`


Warning: The database files are not meant to be edited directly.
But if you ever happen to want to edit them manually or add a new entry
you can use the

```
update-mime-database ~/.local/share/mime
```

OK, so from that we know how we can tell which mime type a file is.
Yet, we didn't talk about default programs to execute those types yet
so let's do that.

# Lookup process

The lookup process happens in two directions.

On one side you have the list of applications with the list of mime
types they can handle and on the other side you have the list of mime
types with the default application to execute it.


The definition for the application metadata is stored in something called
a desktop entry.


# Desktop Entries

Let's start with the first way: Applications with the list of mimetypes
they support.

You can find those desktop entries in the location `/usr/share/applications`
for global ones or in `.local/share/applications` for user specific ones.

They are the files that end with the extension ".desktop".

I won't discuss the format of that file but I'll just say this:
This file has a lot of metadata about the applications, from the icon, to
the executable, to if it needs a terminal (and will open in the default
set terminal emulator), to its category, and what interests us the most
the supported mime types.

So yeah, the desktop entries can have a list of supported mime types it
can handle.

But it would be too much of a pain to loop through all those files to know
which applications open which file type.
Thus, there's a simplified file in the same directory called
`mimeinfo.cache` that contains just that, all the mime types with a list
of the applications that supports it.

The [MIME cache] group.

These files keep track of which MIME-types are associated with which
.desktop files overall.

Here's the big deal, a file manager can show you that list of supported
applications when you want to open a file, or just refer to the first
one in the list as default when it's not specified.

Nota bene here, if you want to add your own desktop entries you'll have to
update that database by running:

```
update-desktop-database ~/.local/share/applications
```

That is also automatically run by the package manager when a new application
is installed, updated, or removed.

There are also more specific mime settings per applications that are
stored in .keys files and .mime files located in `/usr/share/mime-info` but
this is beyond the scope of this podcast.

Now talking about defaults let's mention that everything in this podcast,
all the settings and programs can be set as default for new users if
changes are done in `/etc/skel`, the skeleton used for new users home
directories.

Some commands that are useful with desktop files are:
desktop-file-install, desktop-file-edit - Installation and edition of
desktop files .application and .desktop

# Mime type to desktop entry

Back on topic!

How do we do the reverse, mime types to desktop entry.

We indicate that in the file mimeapps.list in a group called [Default
Applications], haha, finally talking about default applications for a
given mimetype.

Remember in the last section we said that in the file mimeinfo.cache we
were filling the [MIME cache] group, it's the same notion of grouping
here.

The mime types followed by an equal sign and a list of semi-colon
separated desktop entries files.

When a program is executed it'll try the first entry and move to the
next if there was an issue.

Remember we also said that desktop entries can have the setting terminal
set to true or not and that it'll launch it with the default terminal,
that's where it's set.
The exo-terminal-emulator.desktop on XFCE.

There could be many mimeapps.list around the system in different
locations:

* system-wide,
* per-user,
* custom locations used by some programs and desktop environments

If an entry isn't found in one it moves to the next.

If no entry at all is found it falls back to the method mentioned in the
previous section, using the most-preferred desktop file associated with
the mimetype.

As a note, the mimeapps.list can have other sections such as [Added
Associations] and [Removed Associations] both for whitelisting and
blacklist mime type/desktop association.


Let's review some of the common order that the things are looked up.

The lookup order for this file is as follows:

<pre>
$XDG_CONFIG_HOME/$desktop-mimeapps.listuser overrides, desktop-specific (for advanced users)
$XDG_CONFIG_HOME/mimeapps.listuseruser overrides (recommended location for user configuration GUIs)
$XDG_CONFIG_DIRS/$desktop-mimeapps.listuserusersysadmin and ISV overrides, desktop-specific
$XDG_CONFIG_DIRS/mimeapps.listuserusersysadminsysadmin and ISV overrides
$XDG_DATA_HOME/applications/$desktop-mimeapps.listuserusersysadminsysadminfor completeness, deprecated, desktop-specific
$XDG_DATA_HOME/applications/mimeapps.listuserusersysadminsysadminforfor compatibility, deprecated
$XDG_DATA_DIRS/applications/$desktop-mimeapps.listuserusersysadminsysadminforfordistribution-provided defaults, desktop-specific
$XDG_DATA_DIRS/applications/mimeapps.listuserusersysadminsysadminforfordistributiondistribution-provided defaults
</pre>

After the mimeapps.list is checked it moves the the desktop files.

Another thing that you should take in consideration here and where the real
mess starts is when desktop environments wrap up default applications inside
desktop files.

For example XFCE has the utility exo-open and exo-preferred-applications
to set the default applications for certain tasks.
All the tasks point to desktop entries that start with exo-
For instance, exo-web-browser.desktop
And in that file it simply calls:

```
exo-open --launch WebBrowser %u
```

Where does exo-open fetch the default program from, who knows...
I found that it's in: ~/.config/xfce4/helpers.rc
And it took me a while to find that it was there.

If you thought that was hell then you need to hear that this differs
from DE to DE.
The worst thing is that they might interfere with one another.


# Making Changes

What about making changes to set the default program.

I recommend backing up or only doing it at a user level to not mess
things up.

You could update the mimetypes and desktop files.
Or you could use the program that comes integrated with your DE.
Or I'm not sure of it but you could use other kinds of graphical wrappers.

There are a bunch of useful commands you may need:

# Utilities, commands, tools

<pre>
* Freedesktop
~ > update-desktop-database

~ > xdg-mime query filetype default_program_unix.markdown
text/x-markdown

~ > xdg-mime query default image/png
~ > xdg-mime query default inode/directory

~ > xdg-settings get default-web-browser

* BSD command
~ > file --mime-type podcast/
inode/directory

* perl scripts
~ > mimetype default_program_unix.markdown

~ > mimeopen default_program_unix.markdown
You can give it a -a to select the program (.desktop valid)

* fish shell
~ > mimedb
</pre>


# Conclusion

Flexibility, not hardcoded in the OS
The lookup is a link between mimetype and desktop entries

--(Show Notes)--  
[http://unix.stackexchange.com/questions/4859/visual-vs-editor-whats-the-difference](http://unix.stackexchange.com/questions/4859/visual-vs-editor-whats-the-difference)  
[http://www.in-ulm.de/~mascheck/various/shebang/](http://www.in-ulm.de/~mascheck/various/shebang/)  
[https://nixers.net/showthread.php?tid=1988](https://nixers.net/showthread.php?tid=1988)  
[http://www.cyberciti.biz/tips/finding-bash-perl-python-portably-using-env.html](http://www.cyberciti.biz/tips/finding-bash-perl-python-portably-using-env.html)  
[https://en.wikipedia.org/wiki/Env](https://en.wikipedia.org/wiki/Env)  
[https://en.wikipedia.org/wiki/List_of_file_formats](https://en.wikipedia.org/wiki/List_of_file_formats)  
[https://tools.ietf.org/html/rfc2045](https://tools.ietf.org/html/rfc2045)  
[https://en.wikipedia.org/wiki/Media_type](https://en.wikipedia.org/wiki/Media_type)  
[http://www.catb.org/esr/writings/taoup/html/ch05s02.html](http://www.catb.org/esr/writings/taoup/html/ch05s02.html)  
[https://en.wikipedia.org/wiki/MIME](https://en.wikipedia.org/wiki/MIME)  
[https://ubuntuforums.org/showthread.php?t=726230](https://ubuntuforums.org/showthread.php?t=726230)  
[http://www.linfo.org/etc_skel.html](http://www.linfo.org/etc_skel.html)  
[https://specifications.freedesktop.org/mime-apps-spec/mime-apps-spec-latest.html](https://specifications.freedesktop.org/mime-apps-spec/mime-apps-spec-latest.html)  
[https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)  
[https://utcc.utoronto.ca/~cks/space/blog/linux/XdgMimeTypeSearching](https://utcc.utoronto.ca/~cks/space/blog/linux/XdgMimeTypeSearching)  
[https://specifications.freedesktop.org/](https://specifications.freedesktop.org/)  
[https://specifications.freedesktop.org/shared-mime-info-spec/shared-mime-info-spec-latest.html](https://specifications.freedesktop.org/shared-mime-info-spec/shared-mime-info-spec-latest.html)  
[https://wiki.archlinux.org/index.php/Default_applications](https://wiki.archlinux.org/index.php/Default_applications)  
[https://linux.die.net/man/1/mimedb](https://linux.die.net/man/1/mimedb)  
[http://libre-software.net/change-the-default-application-linux-mint-ubuntu/](http://libre-software.net/change-the-default-application-linux-mint-ubuntu/)  
[http://www.faqforge.com/linux/change-default-application-to-open-files-linux-mint/](http://www.faqforge.com/linux/change-default-application-to-open-files-linux-mint/)  
[http://askubuntu.com/questions/90214/how-to-set-default-program](http://askubuntu.com/questions/90214/how-to-set-default-program)  
[http://unix.stackexchange.com/questions/29940/set-default-application-for-particular-file-types-in-nautilus](http://unix.stackexchange.com/questions/29940/set-default-application-for-particular-file-types-in-nautilus)  
[http://unix.stackexchange.com/questions/41195/how-to-change-the-default-program-for-a-specific-file-extension-system-wise-in-k](http://unix.stackexchange.com/questions/41195/how-to-change-the-default-program-for-a-specific-file-extension-system-wise-in-k)  
[http://unix.stackexchange.com/questions/162742/where-does-firefox-get-the-default-applications-for-opening-files-from](http://unix.stackexchange.com/questions/162742/where-does-firefox-get-the-default-applications-for-opening-files-from)  
[https://wiki.archlinux.org/index.php/Desktop_entries](https://wiki.archlinux.org/index.php/Desktop_entries)  
[http://unix.stackexchange.com/questions/17660/default-applications-gnome-3](http://unix.stackexchange.com/questions/17660/default-applications-gnome-3)  

