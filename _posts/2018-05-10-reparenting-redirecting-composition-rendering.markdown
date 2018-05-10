---
layout: post
title:  "Drawables, Regions, Shapes, Types of WM, Reparenting, Compositing, Redirecting, Unredirecting, Rendering"
date:   2018-05-10
categories: unix
---

![screenshot]({{site.baseurl}}/assets/scrots/22.png)

In this article we're going to go over the big list of words found in
the title.  
&nbsp;&nbsp;&nbsp;&nbsp; When I worked on 2bwm I didn't
have much experience with X programming in general. I've
sort of learned it on the spot. That's why I'm trying to
gain more knowledge before continuing to [re-rewrite 2bwm from
scratch](https://github.com/venam/2bwm/tree/2bwm_refactor).  Now that I've
got a bit more background I think it's good to share it with the world,
for others that are like me, looking for knowledge and good articles on
the topic.

![previous]({{site.baseurl}}/assets/advanced_x/previous.png)

I've set the ground for the basic differences between
XCB, Xlib, Wayland, and others in "[Xcb, X11, Xlib,
Wayland?](https://venam.nixers.net/blog/unix/2016/10/25/x11-blah-blah.html)".
Explained what we meant by window
managers and desktop environments in "[WM &
DE](https://venam.nixers.net/blog/unix/2017/06/04/wm-de.html)". We've
had a group discussion about the topic of customization/ricing in
"[Ricing](https://venam.nixers.net/blog/unix/2017/06/04/ricing.html)".
I've also tried to explain the font stack in "[Fonts on
Unix](https://venam.nixers.net/blog/unix/2017/06/04/fonts-on-unix.html)".
And I'm now implementing [good font support for
xcb](https://github.com/venam/fonts-for-xcb), which I'm going to write
about later on.  
&nbsp;&nbsp;&nbsp; Apart from the basics of basics in X11, like events
creation, event loop, mapping windows, drawing on them using graphic
context, etc.. I'd like in this article to focus on explaining topics
that are more confusing and less discussed. The kind of topics that
are or written too shallowly or written only in not-so-approachable
technical papers.


### Drawables, regions, and shapes ###


If you started reading a bit about the X
windowing system, for example by going through the basic
[Xlib](https://www.student.cs.uwaterloo.ca/~cs349/f15/resources/X/xTutorialPart1.html)
or [XCB
tutorials](https://xcb.freedesktop.org/tutorial/basicwindowsanddrawing/),
then you've certainly heard of X drawables. This is an abstract concept
that might be a bit confusing, what's a drawable?

The quick answer is that X drawables are surfaces to draw on, you pass
their identifier to any drawing functions (geometric shapes and figures,
using graphic context, font, etc..) and they're all going to be treated
the same way. However, that's too broad. To be precise X Drawable is an
abstract type, and it's implemented by both X Windows and Pixmaps. It's a
way to not differentiate, making it generic, when drawing on any of them.  
&nbsp;&nbsp;&nbsp;&nbsp; The difference between a window and a pixmap
is that a window is an actual window that can be mapped on the screen,
with attributes and that can have atoms, receive events, etc.. The
pixmap is only a surface to draw on, hold in memory but never directly
on the screen. To be drawn on the screen a pixmap has to be copied
unto a window, think about it like a stamp that can be reuse.  
&nbsp;&nbsp;&nbsp;&nbsp; As far as the differences in drawing mechanism
goes, when we draw on the pixmap we draw on specifically allocated memory
buffer for it, each pixmap creates its own buffer/its own surface. When we
draw on a window we draw directly on the region of the front buffer that
is owned by this window. The front buffer is the final surface, where
everything is combined and drawn on, that X server takes and display on
the screen pixel per pixel. In a way, this is sort of like the pixmap of
the root window, that is the first parent of all windows. We'll explain
parenting a bit more in a sec, meanwhile here's an illustration that
can help understand this.

![drawables]({{site.baseurl}}/assets/advanced_x/drawables.png)

The X server associates the visible region owned by a window on the front
buffer with the window so that it can pass on events happening on that
region if they have been registered to be passed on by that window. For
example a window might register the expose event, which is an event
that is triggered when the region owned by the window is displayed on
the screen. This is what is meant by region, it's the portion of the
front buffer that is shown, owned, and associated to a window.  
&nbsp;&nbsp;&nbsp;&nbsp; There are actually two regions: the bounding
region and the clip region. The bounding region is the region that
we've been talking about thus far, the surface occupied by the window
to be drawn on and receiving events. However windows can have borders
and this creates a subset inside the window delimited by the borders,
this is the clip region: the area in the bounding region minus the border.

Those regions usually have rectangular shapes, however using an extension
called X Shape we can choose to use any arbitrary shape for the window
regions modifying both bounding regions and clip regions. The new region
shapes are called client regions: client bounding region and client
clip region. Inside the X server the window is still represented as a
rectangle but everything that happens outside the client bounding region
and withing the default bounding region (if the window was considered
a rectangle) is ignored. The intersection between the default bounding
region and the client bounding region is what is actually displayed,
the effective bounding region.  
&nbsp;&nbsp;&nbsp;&nbsp; Here's a summary.

![xshape]({{site.baseurl}}/assets/advanced_x/xshape.png)


### Reparenting ###


There's one thing we need to mention in what we've talked earlier (region,
drawing, events) to make it fully precise.  
&nbsp;&nbsp;&nbsp;&nbsp; We said the root window was the parent of all
windows and that other windows own their bounding regions over it, but
the X windowing system allows any window to be the parent of another
window, and that child window will own a region in it. This is what we
call reparenting.

Reparenting creates a hierarchical structure of windows, each owning
a region within the other window and registering to events from that
window. When an event is received on the root window it'll bubble up to
its direct children, the top-level windows which have as parent the root
window, and if those children have children that registered to received
this event and the event was receive on a region that is owned by them
then they'll receive it, and it continues like that.  
&nbsp;&nbsp;&nbsp;&nbsp; Windows within other windows are called
sub-windows. Those sub-windows can only live within the clip region
of their parent (antecedent clipping), this is the reason it is called
"clip" because other windows are clipped to it. Their X and Y position
are relative to the parent window, like top-level windows have they X
and Y position relative to the root window. This also means that if you
move the parent window it'll move all the sub-windows contained in it.  
&nbsp;&nbsp;&nbsp;&nbsp; The clear disadvantage with using a complex layer
of sub-windows is that it's expensive to push the events all around and
to assign who can draw where and within what. You can find a summary in
this illustration.

![reparenting]({{site.baseurl}}/assets/advanced_x/reparenting.png)


### Redirecting & Composition ###


The disadvantage with having windows drawn directly on the front buffer is
that if some of their region is hidden by another window there's no way to
access the pixels that would've been there. All you have access to is what
is currently seen. With such mechanism it becomes impossible to create
iconic representation of windows in a taskbar for example, or create an
overview mechanism when "alt-tabbing", or to create transparency, etc..

This is where the composite extension comes as a solution. This extension
allows windows to redirect their drawing to an offscreen, not drawn
on the screen, pixmap instead of the front buffer. This means that the
full content of the window is available in that pixmap to be accessed
by other applications.  
&nbsp;&nbsp;&nbsp;&nbsp; However this poses two issues, the first is that
pixmaps are rectangular, and the second is that those redirected offscreen
pixmaps are not drawn on the screen and so they need to be handled and
drawn by another program. The first point is solved via an extension
called the X Fixes extension, an extension that has independent fixes for
many things. The relevant fixes are about region object manipulation. As
for the other point it is up to whoever wants to use the composition
extension to implement how the pixmaps are joined back together and
drawn on the front buffer, which is what we're going to discuss next,
but first an illustration.

![composition]({{site.baseurl}}/assets/advanced_x/composition.png)


### Composition, Rendering, & Undirecting ###


As we've said the role of mixing together the offscreen pixmaps and draw
them on the front buffer should be delegated to a third party software
which we call the compositor.  
&nbsp;&nbsp;&nbsp;&nbsp; There are many ways to implement this compositor
but all of them have to do some rendering, that is manipulating the
pixels of those pixmaps to create a final image suited to be displayed
on the screen. One thing we didn't mention in the previous section is
that the window still owns the region on the front buffer, so it still
receives events that are happening on it, even though the drawing is
redirected somewhere else. And so the compositor has to respect the
positions of the windows.  
&nbsp;&nbsp;&nbsp;&nbsp; There are many rendering engines, X provides
one via the extension X render but compositors don't have to be
limited to using it, the OpenGL provides a way to convert from [pixmap to
texture](https://www.khronos.org/opengl/wiki/Programming_OpenGL_in_Linux:_Creating_a_texture_from_a_Pixmap),
the type of data it can handle. So here you can imagine all sort of
complex manipulation that can happen on those pixmaps.  
&nbsp;&nbsp;&nbsp; However, all of this is costly, pixmaps are drawn
offscreen, the compositor has to join them back together the way it likes
via whatever renderer it has chosen and it has to send back that final
result to the X server for it to be drawn on the front buffer. This can
be slow.  
&nbsp;&nbsp;&nbsp;&nbsp; This is where the Direct Rendering
Infrastructure for OpenGL (DRI) and the Accelerated indirect GLX (AIGLX)
come in to the rescue. There's an early obsolete solution called
[Xgl](https://en.wikipedia.org/wiki/Xgl) which is a custom Xserver
implementation which allows direct rendering, that is the windows can send
directly opengl command to the graphic card, and a newest more flexible
one called [AIGLX](https://en.wikipedia.org/wiki/AIGLX) that let the
windows send GLX (protocol of an X extension) commands to the server
and let the server send those to the graphic card in an accelerated
way. Both of those try to reduce the overhead of the transfer from
the OpenGL renderer with the X server by sharing a direct buffer with
it. This also means that those solution are machine dependent and won't
work over the network.  
&nbsp;&nbsp;&nbsp;&nbsp; The last issue it poses is for applications that
don't want to pass by the compositor because there's no need to: full
screen applications. Full screen applications usually want full graphical
power and passing through composition might be too extensive. This is why
some compositor are smart enough to turn off redirection for full screen
application and letting them own the front buffer all to themselves. This
is called undirecting.  
&nbsp;&nbsp;&nbsp;&nbsp; Checkout this illustration to better grasp all
of this.

![rendering]({{site.baseurl}}/assets/advanced_x/rendering.png)


### Types of window managers ###


What are the ways to build a window manager? This is an interesting
question and based on the content of this article you might have
many ideas. A window manager could be rough, without special border,
without special shape. A window manager could reparent the windows to
one that it uses for decoration. A window manager could create a window
for decoration that it puts in the back of the new spawned windows,
moves it along with it as a decoration, without reparenting it. A window
manager could implement composition in itself instead of relying on a
third party application, adding decoration as it wishes in the rendering
and manipulating the region using XFixes so that it becomes part of
the window. So many ways to create a window manager.  
&nbsp;&nbsp;&nbsp;&nbsp; However there are some standards
that all window managers should try to follow, those are the
ICCCM, Inter-Client Communication Conventions Manual, and EWMH,
Extended Window Manager Hints, standards set by the XDG, the X
desktop group, now called "freedesktop.org". The EWMH are special
atoms set on windows that the window manager should respect and
behave accordingly. For instance a window might have an EWMH that
says it's a taskbar, and so the window manager should not draw
borders around it. There's a lot of specification, check the [ewmh
spec](https://specifications.freedesktop.org/wm-spec/wm-spec-1.3.html)
to know more. The ICCCM is similar in nature but is not limited to the
window manager, the clients should also respect those hints, in fact the
EWMH specs are based on the more generic ICCCM specs. Be sure to check
them out [here](https://tronche.com/gui/x/icccm/).


### Conclusion ###

I hope this article will fill the gap and that it helps understand those
topics. The X windowing system is slowly getting deprecated in favor of
Wayland but the basis is similar so knowing a bit more about X would help.

Cheers!

-----

_References_:  
[Xplain the basics](https://magcius.github.io/xplain/article/x-basics.html)  
[The linux graphic stack](https://keyj.emphy.de/files/linuxgraphics_en.pdf)  
[The linux graphic stack again](http://blog.mecheye.net/2012/06/the-linux-graphics-stack/)  
[X Shape documentation](https://www.x.org/releases/X11R7.7/doc/libXext/shapelib.txt)  
[Xplain about composite](https://magcius.github.io/xplain/article/composite.html)  
[composite documentation](https://www.x.org/archive/X11R7.5/doc/compositeproto/compositeproto.txt)  
[X11 compositor tutorial](http://www.talisman.org/~erlkonig/misc/x11-composite-tutorial/)  
[texture from pixmap](https://www.khronos.org/opengl/wiki/Programming_OpenGL_in_Linux:_Creating_a_texture_from_a_Pixmap)  
[Issues with gaming with compositor](https://blog.martin-graesslin.com/blog/2015/12/gaming-on-linux-move-to-next-generation/)  
[AIGLX](https://en.wikipedia.org/wiki/AIGLX)  
[X Fixes](https://en.wikipedia.org/wiki/XFixes)  
[About writing a window manager](https://www.uninformativ.de/blog/postings/2016-01-05/0/POSTING-en.html)  
[Tutorial on writing a window manager](https://seasonofcode.com/posts/how-x-window-managers-work-and-how-to-write-one-part-i.html)  
[Wm specifications](https://specifications.freedesktop.org/wm-spec/)  
[EWMH specs](https://specifications.freedesktop.org/wm-spec/wm-spec-1.3.html)  
[ICCCM specs](http://tronche.com/gui/x/icccm/)  


