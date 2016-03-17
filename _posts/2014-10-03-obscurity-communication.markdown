---
layout: post
title:  "Obscurity Of Communication"
date:   2014-10-03
categories: security
---

####A theory on conspiracies, cabals, secret societies, and terrorists communication


A hot subject these days is privacy.  
Since the Snowden's leaks we have been
getting headlines about privacy every two or three days. This post is not
about something new but it's to dwell into ways of thinking we haven't been
accustomed to. I don't personally have any interest in conspiracy theories
and secret societies but it's still interesting to relate it with terrorism,
as we are in an era of psychotic people.

![pcweenies]({{site.baseurl}}/assets/pcweenies.jpg)


Communication has become way easier & cheaper since the institution of the
world wide web. You can't find as much information at such cheap price
anywhere else. Consequently, every organization is tempted to use it for
their private/secret meeting and messages. However, the internet is wide
open and is not the best place for secret information. To resolve this we
use private networks and encryption.



Mathematicians have been working on encryption for centuries. We've reached a
point where encrypted messages have such high entropy that they are virtually
unbreakable. Adding to this salting, shared keys, private keys, etc.. We get
a new layer of security. Unfortunately, there has been a lot of discussions
going around lately revisiting the efficiency and flaws of certain encryption
protocols we've been using for years.


Another thing that makes people shout is who controls the web. There
are some big entities on the internet that have such power that they control
a lot of end points and centralized services. In theory, or maybe for real,
those big players should be able to trace back everything that happens
online, to graph people, to create relation from all this mess. In some
cases they do but the relations are graphed with reliable data and not some
random mess. The concern is that even if messages are sent encrypted and
cannot be deciphered people can still be mapped as related to each others,
those big guys can still sniff end points. To solve this people have been 
using more untraceable networks like P2P. _What is reliable data?_ I would
say that people are connected if they directly communicate to each others,
as in sending a message to a specific person, which filters out an immensity
of noisy random data and makes it plausible to be stored.

![img1](http://pub.iotek.org/p/b8sKcpg.png)

How to avoid being tangled in this graph?  
  
To avoid it we might need to go back to more radical, human wise, and rustic ways of communication.  
What if we could communicate this way, or at least appear to from a third
party point of view:  

![img2](http://pub.iotek.org/p/Dd4LszJ.png)

The main questions are:  

> How can _(A)_ know that _(B)_ uses this cloud of data
> to go have a look at it?  
> 
> It's true that the connection between _(A)_ and _(B)_
> is completely indirect, _(B)_ sends data to a group of people and not to _(A)_, but is it
> enough to hide the fact that _(A)_ is intimately related to _(B)_?


The answer to the first question is quite simple, _(A)_ and _(B)_ should meet in
real life to agree on the first way of transmission, any type of steganography,
supposing they are able to avoid suspicion while meeting. The first message
sent and the snowball effect can take place. The cloud can be any list of
random websites where people can submit text.


The advantage of this method is that the whole internet is full of public
and non suspicious places where non harmful looking information can be
shared. Also, if someone is caught or reveals information it doesn't break
the whole communication chain between members of the group. For example,
if an unencrypted laptop is found with an undeleted internet history. This
can be avoided by using an open network or an internet café to browse.

Let's give a more elaborate scenario of this concept:  

>  <strong>(A)</strong> & <strong>(B)</strong> are secretly part of some unknown organization<br/>
>  <strong>(A)</strong> & <strong>(B)</strong> discuss and prepare a plan related to country X<br/>
>  <strong>(A)</strong> gives to <strong>(B)</strong> a 24h email before leaving (IRL)<br/>
>  <strong>(B)</strong> sends to <strong>(A)</strong> an encrypted message (PGP) which contains the
>  following:<br/><br/>
>  <pre>
>  {
>  delimiter_start: "Hello my good fellows",<br/>
>  delimiter_end: "Thanks for everything!!",<br/>
>  list_of_websites: "http://bloaa.com",<br/>
>  "http://forumsa.com",<br/>
>  "http://blogb.com",...<br/>
>  }
>  </pre>
>  This represents their secret handshake.<br/><br/>
>  <strong>(A)</strong> uses a specially made program which daily checks those websites
>  and only returns the messages sent from <strong>(B)</strong><br/>
>  if <strong>(A)</strong> finds some text he'll know the special context of it.
>  For example, <strong>(A)</strong> and <strong>(B)</strong> might use some keywords and codes
>  like they do in the army to specify a certain turn of events
>  or actions to take.<br/>
>  Furthermore, some websites allow hollow tags/links, Tags that don't
>  visually appear on the page but that can contain anything. <strong>(A)</strong>
>  could communicate some encrypted (PGP) text to <strong>(B)</strong> using this method.


The conversation goes on and on from unrelated websites to other unrelated
websites.


Now, about the second huge question: <strong>is it enough?</strong><br/>
This takes in consideration that it's not because individuals are not
suspicious, unrelated, visits random webistes, and normal that the WWW giants
won't be interested in their behavior. It would be very improbable, or so
I hope, that an organization would log every single visitors all over the
internet and start relating them together, as in finding which people are
close together and might know each other. To add a layer of obscurity one
can always use P2P networks and proxies in the above scenario.


It can also be argued that proxies, and accessing things through the darknet
isn't always a new layer of privacy. There are many stories where people were
traced back just because they were the only ones on their network to have used
those means of communication to do what they did. Simply explained the packets
sent while browsing through one of those networks might have a special
fingerprint or might be going through a specific port.


For a little introduction watch this easy to understand [video](http://www.irongeek.com/i.php?page=videos/aide2015/overview-of-darknets-adrian-crenshaw) by Adrian Crenshaw.


This is all pretty theoretical and dumb but I still got excited about sharing
what I had come up with. I'll leave you with one question: _How would those
trusting rings be created in that sort of groups without rising suspicion?_

Thanks for reading.



Update:
This can be interestingly related and used in what I described in the article: <a href="http://www.irongeek.com/i.php?page=security/unicode-steganography-homoglyph-encoder">Unicode Text Steganography</a>


A nice and old form of steganography is [the book cipher](https://en.wikipedia.org/wiki/Book_cipher) which uses commonly available books.

Update2: A cool project has been posted on HN about using Reddit as a file storage system.
The [comments](https://news.ycombinator.com/item?id=9662335) are quite interesting, discussing all the unexpected ways of storing data.

Update3: I've found a website implementing the communication through spam.  
It's called [spammimic](https://spammimic.com/index.cgi) and has an encoder to hide your message as if it was a spam and a decoder. Though It is still unsafe to use it directly from their website and to use the same encoding method, it shows how nice the idea is.

