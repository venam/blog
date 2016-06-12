---
layout: post
title:  "Tips for a Unix python cli"
date:   2013-06-11
categories: programming
---

Hello fellow Unixer,
In this thread I'll give some tips for doing a python cli program. Feedbacks and comments are highly appreciated. 

## Taking program arguments##
Users normally expect to be able to directly give the program arguments from the command line and to receive help when adding the -h or --help argument.

One way of doing that would be to parse the argc and argv. To do that you'll need to import sys. This method is more of a waste of time then anything else.

A better way of doing that would be to use the module optparse. It handles the help, the long arguments, and the short arguments. 

Here's an example using optparse:
{% highlight python  linenos %}
#!/usr/bin/env python
import optparse
def main():
    p = optparse.OptionParser()
    p.add_option('--person', '-p', default="world")
    options, arguments = p.parse_args()
    print 'Hello %s' % options.person

if __name__ == '__main__':
    main()
{% endhighlight %}
Here's an example of the output of the above program:

<pre>
raptor ~ $ python2 python_cli.py --help                                                <
Usage: python_cli.py [options]

Options:
  -h, --help            show this help message and exit
  -p PERSON, --person=PERSON
</pre>

## Tab completion##
Tab completion can be really nifty and adds a Unix feel to the program.

If you search around the internet you won't find a lot of answers on how to do it.
Here's a module [url](https://raw.github.com/venam/badaboum/master/completer.py) that you can change as desired that when added to the program as followed makes tab completion work when taking the user's input.

{% highlight python  linenos %}
import readline,completer

self.comp = completer.Completer()
readline.set_completer_delims(' \t\n;')
readline.parse_and_bind("tab:complete")
readline.set_completer(self.comp.complete)
{% endhighlight %}

## Creating a prompt/terminal-like/interpreter##
Some people might want to take things a step forward and create a prompt/terminal-like environment in their program.
I mean something similar to the python interpreter, meterpreter, gdb, etc.. 
It is fairly easy to accomplish. All you have to do is play around with the tab completion and make it change how it completes depending of which part of the program the user is in. (State Pattern)

## Adding a choice between cli and curses##
Curses interfaces are not cli but they can give the program a feeling of completeness. There's many hard way of creating curses interfaces like using the curses module. To not loose some neurons along the way use the urwid module [url](http://excess.org/urwid/tutorial.html). It helps creating curses as if the components were like the one of a GUI-like (text-box,button,label,etc..).


That's it! May the force be with you.
