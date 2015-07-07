---
layout: post
title: "July 2015 Project List"
date: 2015-07-06
categories: programming
---


Hello fellow readers,  
In this post I'll list some of the projects I'm currently working on.


###Anchor System - Monster Builder###


_Language: JS_

_Explanation_: I have that idea to create a game that will be driven by evolution. (not that original of an idea)
The main character's actions would decide how its body evolves and help it resolve
puzzles.  
To start with it the best way I found was to first build an anchor system where
every part of a body can be swapped and controlled separately.


It turned out to be a useful and reusable piece for other projects.
I could definitely create a barbie like game with no efforts :p.


The engine I chose to work with is called `Phaser.js`, I wanted to try it since
the time I did those "shitty" HTML5 games 2 years ago.
At the time I did everything from scratch. It was a great learning experience.


It took some time to learn how to use the engine correctly and to engineer how
I was going to implement the anchoring.

_Problems and Solutions_:

To snap the parts together I had to think of a nice and easy implementation.
Phaser.js has a notion of Group. Groups have children which inherit the position,
angle, and all transformation applied to its parent.
Exactly what I was looking for.

First of all let's define a part by it's attributes.
It has an image, an anchor point, a.k.a. center of rotation, sticky parts that
can accept another part of a specific type, a stacking order which decides if
the image is drawn above or below the part it has just snapped with.

A Group has to have a parent and this created some issues.
At first I thought that if every part has a group with its image as a parent it
would work fine but it was much more complicated.
Let's say that the parent of the group is the image and that it snapped with
another part that has a stacking order inferior than itself, the reordering
wouldn't work because a parent is always drawn under the children. Thus, in
this scenario the children cannot be drawn under the parent.

To resolve this I came up with a nifty design. Every part has a group which
has as parent a shadow sprite, an invisible image.
The image of the part is a member of that group and when the part snaps with
another, which in term also has as parent a shadow sprite, its that shadow
sprite that is added to the group and not the image. So reordering the member
of the group, including the image of the part, works fine.

_Examples_:

I took sample images from the mighty editor animation tutorial to show how simple
it was to implement anchoring.

With debug enabledthe sticky parts (red) and the anchor points (blue) are
visually shown.
![anchor debug](http://pub.iotek.org/p/OPpjt7A.png)

A demo of how it looks when debug is off and the parts are dragged into one another.
![anchor1](http://pub.iotek.org/p/GGk4ckX.png)
![anchor2](http://pub.iotek.org/p/efjRv0w.png)
![anchor3](http://pub.iotek.org/p/8Sk3dnt.png)
![anchor4](http://pub.iotek.org/p/k9moy2u.png)

_Link To Project Source_: [Monster Builder](https://github.com/venam/monster-builder)


###LindenMayer System###


_Language: Perl_


_Explanation_: I had the Wikipedia page about Lsystems open in my browser tabs
for around 2 weeks when I told myself that it was time to do something with it.
The nature of the algorithm always caught my attention. It joins recursion,
grammars, and fractal graphics.

It's fun to see things evolve. Simple rules give birth to infinitely complex
outputs.

_Problems and Solutions_:

The first big thing that needed to be put in place was how to output images.
The simplest way to do so, without third party libraries, is to output SVG
(Scalable Vector Graphic). They're as simple as to output XML text into a file.
One advantage is that the quality of the output stays the same at any size, the
disadvantage is that it is slow at rendering a complex image so you have
to convert it to another format such as JPG or PNG before opening it.


The second problem showed itself when I tried to draw my own shapes.


> Chaos: A dynamical system that has a sensitive dependence on its initial conditions.


It's hard to make something that looks good and harder when the initial state
is what decides how everything will turn out.
If you don't choose well it'll be chaos after a number of iterations.

One thing that annoyed me is that whatever Lsystem I tried to create it was
rotating around itself.

I like Lsystems, they remind me of nature inspired programming.
I might introduce an evolutionary factor similar to the
[grammatical evolution](http://www.cleveralgorithms.com/nature-inspired/evolution/grammatical_evolution.html) into the algorithm.
Usually those algorithms converge to an optimal solution. What are we optimizing?
To where will it converge? More rotating shapes? Who knows...

_Examples_:

Other than the typical examples that I found on Wikipedia, I tried my luck writing
brand new systems.

I drew some lines on papers and gave it a go to see what it would look like
after multiple iterations.

![test shap1](http://pub.iotek.org/p/Fdz3SWy.jpg)
![test shape](http://pub.iotek.org/p/ITotFlm.jpg)


Here's one that I did expending the name of my current SO with an arboresque of flowers.

![Reine1](http://pub.iotek.org/p/YGBVLf8.jpg)
![Reine2](http://pub.iotek.org/p/zJ8jTy8.jpg)


That one took some time to implement and the output wasn't what I expected.

![weird](http://pub.iotek.org/p/lrUAtlj.png)


_Link To Project Source_: [Lindenmayer System](https://github.com/venam/Lindenmayer-System)


###Unix Ricing Neural Network aka URNN###


_Language: Shell, C, Perl, Go_


_Explanation_: On the IOtek Telegram group there was a conversation about AI
and it drifted towards what we like doing, unix ricing. We began brainstorming
what a Unix ricing AI would do. A bit later we started considering building one.
Jmbi (Karl McGuire) and I put real ideas together.
We settled to use the FANN (Fast Artificial Neural Network) library and a
simpler idea than the brainstormed ones.

The network works both ways, the inputs and outputs are the wallpaper and the
terminal colorscheme.

In a nutshell, if you input a wallpaper it'll give you a nice terminal colorscheme
to go with it, or, if you input a terminal colorscheme it'll give you a list of
colors that should be present in your wallpaper.

_Problems and Solutions_:

For this project we thought of everything the Unix way. We made a bunch of small
reusable utilities that do one task and do it well, communicating with each
others through simple text inputs and outputs.

Then we just pipe everything into each others to get what we want.


A neural network needs training sets. To train we need real data, we need to
gather a lot of images with related colors.
At the moment I'm doing the process manually and it's a pain in the ass.
I still haven't gathered enough data.

One problem I think will be a hinder is the one to one correspondence between the
colors. I hope it won't be too stubborn and always output the same thing.

_Examples_:

I tested it on my work machine running Ubuntu (I know, I miss my 2bwm).

Here are some of the outputs with a training set of 20 images:

![testing urnn at work 1](http://pub.iotek.org/p/CG8ZGqZ.png)

![testing urnn at work 2](http://pub.iotek.org/p/84nIYJl.png)

They are more or less satisfying for a start.

_Link To Project Source_: [URNN](https://github.com/iotek/urnn)


##Conclusion##


If you have any inquiries, inputs, or tips, please contact me.

See ya!

