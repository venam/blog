---
layout: post
title:  "Mathematics The Law Of the World"
date:   2015-05-26
categories: programming
---


Hello fellow readers,  
This post is about a little adventure I had with maths.



I'm currently reading a book called `clever algorithms`, I go along at my own
pace doing researches on hard subjects or things I forgot from high school.
Digging through the [cross entropy algorithm](http://www.cleveralgorithms.com/nature-inspired/probabilistic/cross_entropy.html)
I had to take a break and learn more about distribution.
Namely, I wanted to refresh my mind about the normal/Gauss law.


The algorithm in itself tries to find the best estimation of the 2 parameters
that directs this law, the standard deviation and the mean. It does that through
a series of iterations.


I was curious to know why the Gauss distribution was so widely used.
From sociology, biology, physics, chemistry, economics, politics, it's always
present.
How would you explain that simple law to anyone? 
Explaining an axioms is like explaining something beyond human, something that'll
always be true.
Is it the same thing that Newton felt while discovering the law of gravity.


On the [Wikipedia page](https://en.wikipedia.org/wiki/Normal_distribution) there's
something mentioning a Galton box, a [bean machine](https://en.m.wikipedia.org/wiki/Bean_machine). The more I read about it the
more it got me interested. The idea is simple, it proves that the binomial law
can approximate the normal distribution. It does so by throwing balls in a
container that has obstacle evenly separated. The probability of falling on both
sides is 50%. Thus, depending on the number of layers you can calculate the probability of a ball falling in the last container using Pascale's triangle.


My next goal was to simulate such machine, to visualize that magic thing.
I quickly wrote a small prototype using an engine I extracted from my old game
(a wrapper over box2djs). It was pretty impressive to experience it live.


![Attempt start](http://pub.iotek.org/p/c0YGkoX.png)
![Attempt end](http://pub.iotek.org/p/1KlMPXO.png)


I didn't stop there, I had to go further making the machine bigger and to do
that I had to make it some way scalable.


I divided the machine into parts, the bottom part is the container which is
always going from one side of the screen to the other.
In the middle until the opening of the box are the obstacles. The obstacles can
be readjusters or balls that are placed in an even-odd manner.
The most complicated part is the opening and how to place the beans so they fit
in it.
At first I thought of always taking the right side of the opening as the top-right
corner of the screen and the end of it always at the same height. This solution
didn't work at all with scaling. When the box became too big the opening was
almost flatten out. I then settled to keep the same angle and calculated where
the top of the opening would be, in most cases above the screen, if the bottom of the opening didn't move.
The beans are then randomly put at the highest part of the opening.


Here are some results with a really big bean machine.
![insanely big start](http://pub.iotek.org/p/RLs5fsc.png)
![insanely big result](http://pub.iotek.org/p/aun8zff.png)


You can check the code on [GH](https://github.com/venam/bean-machine).
The parameters can be set at the top of the `InitialStateBuilder.js` file.


See it [live](http://venam.nixers.net/bean_machine)



Overall I'm extremely impressed. One thing leading to another, curiosity is the
fire of our hearts. Maths guides our world and it's cool to write
physical simulations to see it.
