---
layout: post
title:  "How do you like your beep"
date:   2013-01-27
categories: unix
---
Hello fellow Unixer,

This thread is about how you handle and like to handle the beep.
People working on Windows never hear about the '\a' ,aka beep,aka motherboard speaker.
On Unix it's pretty common to hear this sound when working in the terminal.
The way to handle it differ amongst people.
Some likes to disable it.
Some likes to make it a visual beep.
Some likes to change the beep itself.
Some finds other ways.

Me, myself, and I love to handle the beep with urxvt:


<pre>
URxvt.bell-command: beep -f 5 -r 3 -l 2
</pre>


What it does is that when urxvt receive a '\a' it execute the beep -f 5 -r 3 -l 2 command.
I like this sound better then the normal beep.


If you want to have some fun you can check a simple python program I wrote to generate music using the beeps.


[here on Github](https://github.com/venam/beep_machine)



What about you? 

