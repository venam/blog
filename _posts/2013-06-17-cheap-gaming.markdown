---
layout: post
title:  "Cheap And Enjoyable Gaming On Unix"
date:   2013-06-17
categories: unix
---

Hello fellow Unixers,

In this thread I'll explain how to enjoy playing games on free Unix OS for a cheap price.

The rumor that gaming on Unix is bad has been around for quite some time now.

While it's almost true for the newest games with the 3D rendering that makes hair looks so real that it feels like your own hair are fake, it's still not true for all games.
I won't start blabbering about "Steam"TM because the internet is already infested with it. I won't, also, write about running games through wine for the same reason.

Search the web for open source games:
====================================

Your first option for playing games for free is to search your distribution repositories for available open source games. Namely, Warzone2100, red eclipse, open arena.
Here are some links with lists of games: [url1](http://www.redferret.net/?p=19113) [url2](https://en.wikipedia.org/wiki/List_of_open-source_video_games)  [url3](http://freegamer.blogspot.co.uk/)

And ... in love with retro gaming:
=========================================================
Retro gaming is amazing! With nowadays computer specs it's easy to emulate all of the old school games.
And guess what, most of the games and emulators are available online for free. (I'm not implying that it's fine to steal all those roms online)

Getting a joypad:
=================
It's ok to play without a joypad/joystick but it's way more entertaining to play with one. I emphasize on that.
You can get a joypad for a really small price. I got mine, a year ago, for 12 Lebanese Pounds which is around $8.
Here's a picture:
![gaphor](/assets/joystick.png)

You might need the driver for it if the emulator needs it. It's normally available in most distribution repositories as "xf86-input-joystick".
Note that sometimes, when you install "xf86-input-joystick", plugin in the joystick and moving the axis might move the mouse around the screen.
A quick way to solve this is to make your "/etc/X11/xorg.conf.d/50-joystick.conf" look like that :
<pre>
Section "InputClass"
    Identifier "joystick catchall"
    MatchIsJoystick "on"
    MatchDevicePath "/dev/input/event*"
    Driver "joystick"
    Option "StartKeysEnabled" "False"
    Option "StartMouseEnabled" "False"
EndSection
</pre>

Getting and setting the emulator:
================================
You can emulate ps2,ps1,atari,sega,snes,nes,nin64,gameboy,gba,nin DS,gamecube,psp,xbox,etc..
I'll focus on the snes, nes, and ps emulators.
I, personally, had less problems emulating games on Linux than on Windows. For example, Chrono Trigger was lagging on Windows and played flawlessly on Linux.

PS1:
The best ps1 emulators are pcsx and pcsxr. [pcsxr](https://pcsxr.codeplex.com/) is a fork of pcsx which continue the unmaintained work of the pcsx team. They claim that the UI is better but I find the pcsx fancier.
You can get pcsx from the official website: [pcsx](http://pcsx.net/) but unfortunately pcsx is harder to setup than pcsxr because you have to get the bios and the plugins yourself.
pcsxr comes with all the plugins and most of the games will work out of the box.
Shots of PCSX and PCSXR:
![gaphor](/assets/pcsx_r.png)

pcsx and pcsxr have almost the same interface and settings.
Configuration > Graphics :
![gaphor](/assets/pcsx_r_config_graph.png)
The dithering option is about the graphic rendering noise. If you let it off the game will run faster but the graphics will be more squary.(I left it off)

The Stretching option is about the little adjustment the graphic engine does to make the picture look better. Playing around with different option won't really affect the game speed and can make the game look a lot better.

Game fixes might be used if you have problems with the emulation. In pcsxr there's no need for them but in pcsx you might need those:

Odd/Even bit hack, Ignore brightness color, PC fps calculation, Old Frame skipping, Repeated flat text triangles, Fake 'gpu busy' states.

Configuration > Controllers :

pcsxr configures the controller for you which is really convenient. You can still change the settings yourself if you prefer. One thing that is missing from other emulator is the support for rumble pack/vibrations. (If you find how to enable this let me know)

Saving/Loading States:

After loading the iso you can press the ESC key and the pcsx/r UI will pop out again. You can, then, choose Emulator > Save State > the slot you want or you can load a state.
You can do the same by use the keybinds: CTRL-1..9 ALT-1..9 respectively to save and to load.

SNES,NES:

My favorite SNES/NES emulator is [zsnes](http://zsnes.com/). It's a really cool emulator, it's written mostly in x86 asm and the UI itself looks like a NES game.
I never had any problem running a game with zsnes.
Shot of ZSNES:
![gaphor](/assets/zsnes.png)

zsnes setting are accessible via the keyboard (ESC) or via the mouse (but not while playing, you need to press ESC before).
CONFIG > VIDEO :
![gaphor](/assets/zsnes_graph.png)
You are presented with choices of aspect ratio. The legend on the right helps you understand the little characters on the right of the aspects.
"ODS" would be the most preferable settings. Use openGL, allow filters, and allow stretching.

On the right tab (FILTERS) you can choose the filter. Remember that using HQ filters will make the rendering a little slower on poor specs machine.

HQ FILTER with 2x makes the games look really nice and clean, don't use SCANLINE nor misc filters.


CONFIG > SOUND :

ENABLE STEREO SOUND but don't SIMULATE SURROUND SOUND. The surround sound changes the feeling of the game. INTERPOLATION and LOWPASS also makes the music feels different.


CONFIG > INPUT :

You can set the key one by one or just press the SET KEY and zsnes will ask for each key while telling you where this key should be on the real NES controller.
[spoiler][img]http://venam.1.ai/gamin/zsnes_conf.png[/img][/spoiler]


MISC > GUI OPTS:

You can change the interface here. For example change the smoke background by a water background.

Saving/Loading States:

While in the game, press the ESC key. Go to GAME > PICK STATE, now choose on which state you would like to save. Then go to GAME > SAVE STATE and the game will save over the state previously choose. Same for opening a state.
The states are independent from game to game which means that saving on state1 for zelda won't save over the state1 of kirby or mario.

The best nintendo64 emulator I used is project64 but unfortunately it only runs in wine, but even in wine it runs flawlessly.
![gaphor](/assets/p64.png)
Here are some options I always set up in it:

Options > Configure Graphics Plugin:

Full Screen Sync : transfer memory

Super2xSal textures.

Don't play with the Advanced settings and remember that direct3D only works in Windows.

Getting the games:
=================
Doing a little research on the internet for the name of the game you want will in 90% of the case give you a download link for the rom. coolrom.com has a huge collection of games.
Some interesting games you should get or read about:

 * chrono trigger
 * super mario all star
 * tetris attack
 * super mario 3
 * super mario world
 * conker bad fur day
 * diddy kong racing
 * dragon valor
 * zelda a link to the past
 * zelda okarina of time
 * bubble bobble
 * banjotooie
 * kirby64
 * Mario Kart
 * Mario Party
 * Super Smash Bros
 * zelda majora smask
 * Yoshi's Story
 * Bloody Roar
 * Chrono Cross
 * Legend of Mana
 * Donkey Kong Country
 * Kirby Superstar
 * Mega Man X
 * Super Metroid
 * Mario Paint
 * Final Fantasy III
 * the pokemon series on gameboy.
and so so so much more...

Getting some zik:
=================
This isn't really related to the games but 8-bit music gives a good feeling while playing games or doing other stuffs.

Joomla had a nice website full of those but the style sheet is kind of dead. [url]http://bits.basementla.bz/Chiptunes/[/url]

Final notice:
=============
Playing games is really fun and can be extremely cheap but remember to do your work. If your summer vacations have started I wish you a good summer full of entertainments.
If you feel bored, play a game!

PS: I'm posting in this section but I don't really know if it's the right place. The General unix section was moved inside the graphic section so I didn't post there.
n t!
