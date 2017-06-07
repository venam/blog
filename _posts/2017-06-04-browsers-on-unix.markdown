---
layout: post
title:  "Browsers"
date:   2017-06-04
categories: unix
podcast: 1
podcast_mp3: https://raw.githubusercontent.com/nixers-projects/podcast/master/nixers-podcast-2016-08-07.mp3
podcast_ogg: https://github.com/nixers-projects/podcast/blob/ogg/nixers-podcast-2016-08-07.ogg?raw=true
---

(Transcript of the [podcast](https://nixers.net/showthread.php?tid=1884))


# Intro#

Browsers, your windows to the WWW
What do you use, customize, the problems you've stumbled upon, how
we're using those browsers in the Unix world, the most used browsers,
why we use them, and all the problems we've encountered

I'm venam and you're listening to. The nixers podcast


## Favorite browsers and engines##


Different browsers run on different engines.
Consequently, more or less, by asking what's your favorite browser,
you are also asking what's your favorite engine.

Let's visit some of the responses we've got from the nixers members,
What are the browsers or engine that integrate the best with their workflow.
The ones they use the most and why.

---

The first responses were some funny trolls.

Quote:

> \> I actually turn on my virtual machine so I can use Internet explorer 1.  
> \> I'm an IE lover! It's the best thing ever! I like all the security holes.  
> \> The lack of HTML5 is just amazing.  
> < I imagine...  
> \> It's a whole 1KB of ram!  
> < That sounds fantastic!  
> Yeah! It's the best browser on the planet!  


Quote:

> \> Wget  
> < that's not a webbrowser!  


> \> Come on guys we all know mothra is the best browser ever  
> < Thanks adam for this plan9 interjection  


After that we had some serious answers.

Most said that they used the stable version of Firefox. Though We didn't hear
about the different releases. It would have been cool to get some tips and
inputs about the developer version, nightly, and why you would prefer those,
but I guess it'll get clearer as the podcast goes on why people use the
stable version.

Let's name some of the reasons why Firefox is used the most.

Quote:

> Usually firefox, not my favorite but the one that makes sense.  
> I stick with firefox because of the addons and customization.  
> It's a good webdev browser.  
> I've used Firefox for a major portion of my life  
> I use FF sometimes  


Other browsers that were mentioned.

Some "stick with Chromium", which we'll talk about later on.
It has a huge legions of fans and haters, it's the controversial browser in
the Unix world.


> \> For my job i am required to use chrome (we target webkit with our sites,  
>   so we all must test on the same platform)  
> \> I use Chrome on pretty well everything  


- "dwb", "it doesn't eat so much ram and just works".
- "qbrowser", based on qtwebkit, it has a "pretty good, minimalist interface" however the downside is that it has no addons.
- "xombrero", based on webkit, it's fast and slick.
- "uzbl", also based on webkit
- "qutebrowser", it's based on pyqt5, "it's very fast and lean.
- "I like the interface and the controls. but until you can do css overrides,
- (inline, plugin, etc) it will not be my personal choice."
- "Opera", "I've used Opera since the days you could open the binary in a
hexeditor to disable the ad-support, from memory that was 1996 or so. I've been
sore to see it become a chromium skin and am still hanging on to it
out of a kind of inertia."


I've tried more minimalistic browsers which has a certain appeal but I also
want them to 'just work and display the page', so I've never actually made the
switch.


## Integration with workflow and customization##

As far as workflow is concerned, it's an unanimity, "obviously everyone
uses vimperator".  It's a part of a nixers daily routine. The vim love
is scattered even in the browsers lands.
Vim-like bindings rule them all.

One of the member uses a custom binding in vim to open webvideos url in
mpv instead of having to open the browser to do so.

Most Nixers keep their browser open all the time.

Some keep it on a workspace alone, others side by side with a terminal
(split the workspace in two) or just use sloppy focus and overlay.

We argued a bit about why we kept the browser open if we didn't use it.
For example, the ones that don't, use a lightweight browser to open links
posted on chats which leads to the browser instantly poping up in front
of them.  For instance, links -g (graphic mode), which can display images.

It was emphasized that it was equally fast, if the main browser is open the entire time.


## RAM nagging##


After the last discussion the typical minimalist talk on ram usage ensue.
Because Keeping browsers open all the time, especially nowadays, destroy
your memory usage.

If you have a limited amount of RAM and are running low on resources, you might
want to adapt the "open links fast with lightweight browsers" approach, but if
you have "16GB of ram" then there's "no problems" because "Ram usage
isn't a problem

> \> If you got 'em use 'em".

Interestingly enough one user with plenty of ram to spare (hear by that 16GB)
even with his huge amount ran into problems related to it.

As you might already know, you can customize Firefox (in the about:config) to
use more ram and access the disk less frequently or not at all in specific
cases.

It's a sort of compromise, use less disk but use more RAM.

We discussed a bit and it happens that increasing the javascript memory limit
from 28MB to 4GB makes Firefox crash and unable to start (Same user that
bragged about his 16GB of spared ram).  Then we asked "How big is your
swap", and the answer was... "I don't have swap", which explained a lot.

Lesson learned, don't be too proud of your big ram!

If you want more info on blasting Firefox with your spared memory see the 
show notes or the transcript, there's a link with a lot of relevant configs.
<https://wiki.archlinux.org/index.php/Firefox_Ramdisk>.


All in all the story repeats itself with all the modern browsers, kids open
tons of tabs and the browser eats up all the ram and swap, the whole system
becomes unresponsive.

This goes for Chrome/Chromium, Firefox, Opera, and alll the webkit based
browsers.

Let's hope we see this change in the coming years.


## Privacy##


In the Unix world privacy is a big topic and because our browsers are the windows
to the internet most of the time, even if the internet isn't limited to www,
we want it to be squeaky clean.

Let's go into some ways our users protect themselves from nastiness.

Ads....

Quote:

> \> If I don't have an adblock I'll cry...


Quote:

> \> I setup a second box as a private DNS server (adsuck) to block ads and keep my privacy.

Those are important claim. The world wide web is getting sick of this culture
of advertisements. It seems we have become the product of this machinery.

We have no clue how to sustain an economy anymore on the internet and this
all needs reshaping.


Firefox...


Firefox has the big win on the privacy issues because it comes with addons
and Mozilla is known to be part of the internet defence league since its
creation in 2012.
It has the trust of users, even though other browsers also have addons, which
we'll discuss in a bit.

Let's list somes useful addons for firefox:

<https://addons.mozilla.org/en-US/firefox/addon/umatrix/>  
<https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/>  
<https://www.eff.org/https-everywhere>  
<https://addons.mozilla.org/en-US/firefox/addon/requestpolicy/>  

Quote:

> \> Https everywhere is kinda slow (as in slow down the browsing)  
> < Not for me  
> \> Not for me either  


Quote:

> \> Noscript! How can you live with noscript enabled?  
> < I don't use noscript for all of it's features  
> < umatrix does most of noscript functions.  
> < I use noscript to block other things such as XSS, cookies, xhr, etc..  


Quote:

> \> To block third parties I use request policy, it's great.  
> \> It uses a whitelist instead of a blacklist  
> < umatrix is a kinda join between request policy and noscript with extra options to specify what type of component you want to block  
> \> Cool  
> < For most sites I only enable css and images, to see the bare page, and load the scripts manually.  
> \> Same  


Some guy went a step further, he takes the approache of segregation and
isolation, splitting the privacy into 3 groups:

	* trusted:
	web sites i trust not to be evil or my own web sites. Web sites i choose
	to use for webrtc, to run freely plugins or that can access to mic.

	* secure:
	web sites i normally think they are safe, but i don’t really know and
	don’t fully trust.

	* paranoid:
	web sites i know to be evil, or just i think probably can be malicious,
	or just i want to be reasonabily sure it’s hard for them to trace me
	and my identity.

<https://firejail.wordpress.com/>  
<https://www.nexlab.net/2016/08/06/desktop-laptop-privacy-security-of-web-browsers-on-linux-part-1-concepts-and-theory/>  

He builds a sanboxed webbrowser using firejail:

> The paranoid version runs in a jail, with a different user with different
> permissions.
> It will not access to sound, mic or cam at all. It will access network
> only through tor, and it will run on a separate networking namespace.
> Also, it will NOT share clipboard with the X11 session, as it will run
> on a completely separate session using xpra.
> It also passes through a proxy or tor.
> Saves all the download to a temporary file system to make it more volatile.


Chromium...it gets a lot of hate, but why?

Quote:

> \> I use dwb...and shitty Chromium


Quote:

> \> I use Chromium  
> < Don't you disable Chromium botnet features?  
> \> I like the botnets, it adds flavors  
> < ...  
> \> ..Don't care about being in a botnet every time I fire up Chromium  


Quote:

> \> Pretty fast and pretty good but it has by the default botnet feature enabled which turns me down.


Quote:

> \> I used Chromium once.  
> \> I searched and found how to disable the tracking and instant searches (Google trying to help you).  
> \> Go to disable them.  
> \> Restart the browser.. Everything is much slower.  
> \> Related??  

Let's not go into the darkhole even more, we're a bit biased.
Chrome and Chromium have their mischievous reputation because of their
default settings but you could make that better.

One user use chromium but compiles it himself using the inox patched to add
security features and a number of plugins to go along with it.

- cvim
- stylish
- clear cache
- edit this cookie
- ublock origin
- gtranslate
- reddit enhancement suite


## Problems##


Flash has been tagged deprecated for some time now (Adobe Flash Player
11.2 is the last version to target Linux).
<https://www.adobe.com/ca/products/flashplayer/distribution3.html>

None of us seemed bothered by it.

Quote:

> \> Flashless is good these days!  
> \> Everything uses HTML5 making the web a better place  


Netflix support was also mentioned.

Quote:

> \> My only major complaint is the Netflix problem  


Hardware acceleration is a pain on Unix.
You usually have to link the drivers directly (location).
It leads to some slow down with webgl, to problems opening the camera, audio, etc..


HTML5 h264 codec, isn't directly supported by Firefox.
It is a non-free plugin that only comes if Firefox was compiled with
the flag enabling it (you can check your about:buildconfig).
<https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC>
There's an open version:
<http://www.openh264.org/>

If you want to have it (with the drm that comes with it) you need to recompile
Firefox. But you can certainly make more use of your precious time! 


# Conclusion#


Remember when the Browser War was said to be over ans everyone was happy
that they can use the standard now?

The evolution of web standards is going way too fast and many things require
you to have a fully compliant and up to date browser.
Those browsers are a huge clog.

# Music Interlude#

Musics from <http://www.bensound.com/royalty-free-music/jazz>
