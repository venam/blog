---
layout: post
title:  "Society, Hacking, Anonymity, Mystification, and Hysteria"
date:   2016-03-22
categories: psychology
---

![glitch0](http://41.media.tumblr.com/12fb6ded111b9ba67f971b16b7bc76df/tumblr_o1heyveugj1qkbwrdo1_500.jpg)

Hello fellow readers,  
This post is a refresh on correlated subjects I've discussed in the past.

I'm revisiting them considering the recent media coverage.  
Social awakening is at the door.


Recommended, but not mandatory, before reading this article:  

* [A view on social changes in 2015](http://venam.nixers.net/blog/psychology/2015/05/06/view-on-social-changes.html)  
* [Social Networking](http://venam.nixers.net/blog/philosophy/2012/10/26/social-networking.html)  
* [Evolution of security](http://venam.nixers.net/blog/security/2012/08/28/evolution-of-security.html)  
* [Obscurity of Communication](http://venam.nixers.net/blog/security/2014/10/03/obscurity-communication.html)  
* [What is programming](http://venam.nixers.net/blog/programming/2015/11/04/what-is-programming.html)  


![today]({{site.baseurl}}/assets/today.png)

2015 was a year with phenomenal hacks and password leaks.  
Let's list some of those:

- We continue to have our minds blown by new data brought by whistle-blowers like [Edward
Snowden](https://en.wikipedia.org/wiki/Snowden_leaks). Since 2013 the astonishing
content reveals and confirms assumptions we had about worldwide surveillance.


- The start of the [San Berdardino](https://en.wikipedia.org/wiki/2015_San_Bernardino_attack)
case was in 2015. The US intelligence agency is requesting Apple to create a master key to open any iphone so they
can inspect the data on _one_ of the shooter's phone. If this happens it will have significant repercussions.

- Female celebrities have been shamed publicly in a scandal named
["The Fappening"](https://en.wikipedia.org/wiki/ICloud_leaks_of_celebrity_photos).
It consisted of cracked iCloud accounts that contained naked pictures later
released to the public.


- The remains of 2014's [Heartbleed](https://en.wikipedia.org/wiki/Heartbleed)
, [shellshock](https://en.wikipedia.org/wiki/Shellshock_(software_bug))
, and other high risk 0days are still here.
With high internet speed, hackers are scanning the entire internet for those
vulnerabilities and building empires of minions.


- We suffered [Ashley Madison](https://en.wikipedia.org/wiki/Ashley_Madison_data_breach),
[Slack](https://en.wikipedia.org/wiki/Slack_(software)), 
and [many others](https://haveibeenpwned.com/PwnedWebsites) database breaches.
How is the information of people still stored with weak hashes or no encryption
remains baffling.

- The largest DDoS attacks have been launched.
A Distributed Denial of Service consists of "taking down" a website by
initiating huge amount of connections from multiple machines all across the internet.

- Some attacks were directed at [Github](http://arstechnica.com/security/2015/03/massive-denial-of-service-attack-on-github-tied-to-chinese-government/), [Linode](https://blog.linode.com/2016/01/29/christmas-ddos-retrospective/), and the last massive at [BBC and presidential candidate Donald Trump](http://thehackernews.com/2016/01/biggest-ddos-attack.html).


On the bright side we've had advances in the computer field. Artificial
intelligence having majors step forward.

![glitch6](http://45.media.tumblr.com/cfea8e2c8a90b9e95ec6b2e25286745c/tumblr_nxv9j3YuAZ1qkbwrdo1_500.gif)

- AlphaGo, powered by Google's DeepMind, finally [beats](https://googleblog.blogspot.com/2016/03/what-we-learned-in-seoul-with-alphago.html) the Go world champion.
Go being a game that was thought to be too complex to compute.

- We can now train [recurrent neural networks](https://en.wikipedia.org/wiki/Recurrent_neural_network)
in a small amount of time using our powerful graphic cards (GPUs). [Google's DeepDream](https://github.com/google/deepdream) is an example of its implementation.

- A computer program, Eugene Goostman, [claim to have passed the turing test](http://www.bbc.com/news/technology-27762088)
for the first time (even if it [doesn't seem like](http://www.scottaaronson.com/blog/?p=1858) it's really doing a great job.)

- The self driving cars are ready to be [released](http://blogs.wsj.com/speakeasy/2013/12/02/self-driving-nissan-electric-car-takes-to-highway/), [Google's self driving car too](https://www.google.com/selfdrivingcar/).

- Cryptocurencies are taken more seriously by brokers.

- Virtual Reality sets are there: [Valve HTC Vive](http://www.htcvive.com/us/), [Sony VR](https://www.playstation.com/en-us/explore/playstation-vr/), [Microsoft HoloLens](https://www.microsoft.com/microsoft-hololens/en-us/development-edition?icid=Homepage_LeftNav_07_Hololens_en_US), [Oculus Rift](https://www.oculus.com/en-us/rift/).

- Drones, miniature computers ([Rasberry pi](https://www.raspberrypi.org/) for instance), and embedded devices are now cheap and common.
It's the beginning of the internet of things ([IoT](https://en.wikipedia.org/wiki/Internet_of_things)).


Socially many changes are happening, we'll discuss them in a bit.


![security]({{site.baseurl}}/assets/security.png)


What is information?

Everything is information.  
Information is everything.

You access, transfer, manipulate, and protect information.

Not only the information needs to be protected, all that revolves around it too.
The so called _"metadata"_.

Metadata can be used to make assumptions about individuals.  
For instance, the browser's user-agent, the IP, the location, the default language,
the internet provider, etc.. All those are metadata that can be read without
accessing the information itself. Trackers, such as Google
ads, gather them to classify your interests. Combining all the metainfo
together creates a [unique identifier of your browser](https://panopticlick.eff.org/).

Information needs to be protected for multiple reasons. One of the idea that
frightens people is information monopoly - being able to control an entire
population, knowing their past and directing their future.


![glitch4](http://41.media.tumblr.com/2ba8ce67589f3a9f07d446a7e2ffb83a/tumblr_o3ioijbRzo1qkbwrdo1_500.jpg)

Some corporations affirm that they secure your data using "safe" protocols
and encryptions. However, they resort to the "security through obscurity",
hiding your messages with proprietary softwares that only they have access to.
No one else can confirm their true motives and actions.

This means that _probably_ no "attacker" can access the data but that big corporations can.(Here we go with the fear of big corporation...But this time it's true! No paranoia please.)


![glitch7](http://41.media.tumblr.com/c238ca3234d74aa6ba8b29a383cbfbe7/tumblr_ny5e2yFWd71qkbwrdo1_500.jpg)

What is encoding, encryption, obfuscation, and hashing?

For a long answer [see](https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/).

* Encoding:

Think of encoding as a translation from one language to another.
It's the process that converts data so it can be understood by another program.
And like human language it's reversible once you know the tongue.

* Obfuscation:

Obfuscation is the ["Where's Waldo"](https://en.wikipedia.org/wiki/Where's_Wally?) game.
The information is there but it's hard to find. You have no indication
of where it is and how it is constructed - "security through obscurity".

* Hashing:

Hashing is metadata. It's the unique fingerprint of your information. You enter
the information in the input pipe and you get an identifier on the other end.
You cannot get information out of an identifier, a so called "one way encryption".

This is used to confirm users passwords on the internet. Instead of
storing a clear-text version of the password you store it's unique identifier
and compare it to the identifier of what the user enters.

There certainly are more secure practices but it goes out of the scope of this article.


* Encryption:

Encryption is the lock safe. This is what is used to make the data readable
by the intended parties only. Most of strong encryptions use a public and
private key mechanism.

The public key of your friend is used to encrypt the data you want to send him
and your friend uses his private key to open it. No one in the middle has the
private key, so no one can open it. There's a password on the private key
so that it doesn't get stolen.

However, there are always flaws.

![glitch5](http://36.media.tumblr.com/b401817bf52070f89fd52977b2466d60/tumblr_o0gofuZmmJ1qkbwrdo3_500.jpg)

What is end-to-end encryption and what is server side encryption?

One of the flaws of key-based encryption is the man-in-the-middle attack.

Let's say someone gave you a wrong public key pretending to be your friend.
You encrypt the data using that key, the person intercepts it, decrypt it, save it,
encrypt it back with your friend's public key, and finally send it to him.

This scenario is real, [sslstrip](https://github.com/moxie0/sslstrip) is an implementation.
You need to [wire tap](https://en.wikipedia.org/wiki/Telephone_tapping) the communication for it to work.

It can also happen on the server itself.

When all communications pass through the same node (the company's server), it
makes the manipulation easier.

That's why when using key-based encryption you should always confirm the public
keys of the participants so that they haven't been tempered.

Centralized networks have too much power.

For example [Verisign](http://www.verisign.com/) controls most of the SSL (secure socket layer)
certificates of the internet, used to make secure connection to websites.

Moxie Marlinspike created a solution to this issue called [convergence](http://convergence.io/).
Instead of asking one authority about certificate you have many decentralized ones and a local
cache on your machine. Very similar to [certificate pinning](https://en.wikipedia.org/wiki/Certificate_pinning)

A better way to use a service is to have it de-centralized.

[Peer-to-peer networks](https://en.wikipedia.org/wiki/Peer_to_peer_network) distribute the load between
all the users in the network, making it secure against attacks where the path of information should be known.

But breaches happen, and databases are leaked. Your passwords
and data are released.

Or worse, weak passwords that can be guessed.

![glitch8](http://41.media.tumblr.com/d7f33ac37ef1d0b89009b1a67c4c75f8/tumblr_ny5dy8h1Dp1qkbwrdo1_500.jpg)

Even when the password is hashed, which as you remember is the fingerprint of
the password, crackers can find what your password was.

They hash-crack, they compute all passwords' hash as fast as possible, and
check if it matches the hash.

This is faster when using pre-computed hashes and GPU processing, it's a matter of minutes.

There are public [databases online](http://hashtoolkit.com/reverse-hash) listing billions of precomputed hashes.


How can we resolve this?

The best way would be to stop using passwords and switch to key-based authentication.

Another solution is to use [multiple factors authentication](https://en.wikipedia.org/wiki/Two-factor_authentication).
After inserting your password you have to enter another information that only
you could have, such as a USB key or passcode sent to your cellphone.

This is hardly enough.

![glitch13](http://49.media.tumblr.com/tumblr_ll88corp1n1qk3206o1_500.gif)

There will always be entry points in the system.
The system is "exploited" by attacking the openings that interacts with the
*real world*. Anything in a system that accepts external outputs can be vulnerable.

This normally requires a high level of skills unlike
the other methods that any ["script-kiddie"](https://en.wikipedia.org/wiki/Script_kiddie) could use to impress his friends.

Those flaws are ways to get access to your machine.
In many cases it happens in a humanly manner, [the social engineering attack](https://en.wikipedia.org/wiki/Social_engineering_(security)).
People entice you into downloading or visiting their malicious software or page.

Interestingly, DARPA is working on an AI that would automatically detect those
flaws, [0days](https://en.wikipedia.org/wiki/Zero-day_attack), and patch them. They called it the [Cyber Grand Challenge](http://www.cybergrandchallenge.com/)

More on it [here](https://www.youtube.com/watch?time_continue=1&v=OVV_k73z3E0)


![tracking]({{site.baseurl}}/assets/tracking.png)


In the past, things you've said could've been erased and forgotten.
Today's surveillance is more dangerous because of our jump into
the digital age.  
All utilities are getting connected to the global network, the internet of
things is being built.  
We can now trace back years of conversations and online habits.


It would be hypocrite not to acknowledge that surveillance is taking place and
that governments wouldn't try to develop this technology - the
surveillance state.

![glitch9](http://40.media.tumblr.com/b2a6024f11b589e4db82d73cc989048d/tumblr_nmgvfgrOwG1qkbwrdo1_500.jpg)

[Carnivore project](https://en.wikipedia.org/wiki/Carnivore_(software)),
[PRISM](https://en.wikipedia.org/wiki/PRISM_(surveillance_program)),
[5Eyes](https://en.wikipedia.org/wiki/Five_Eyes),
[XKeyscore](https://en.wikipedia.org/wiki/XKeyscore), and other
[mass surveillance](https://en.wikipedia.org/wiki/Mass_surveillance) systems
are there. They track behaviors on the internet and on cellular networks.

Analysts crave this amount of data. With enough you can accurately [deduce and predict](http://venam.nixers.net/blog/philosophy/2015/08/12/futurists.html)
the direction in which a society is heading. A Godly power with unlimited
potential.

This can be used for so much good or so much evil depending on who's
hands it has fallen into.


> From now, know that every border you cross, every purchase you make, every call you dial, every cell phone tower you pass, friend you keep, article you write, site you visit, subject line you type, and packet you route, is in the hands of a system whose reach is unlimited but whose safeguards are not. Your victimization by the NSA system means that you are well aware of the threat that unrestricted, secret abilities pose for democracies. This is a story that few but you can tell.


On its way to destination the packet of data can be stored anywhere.
From [internet providers](https://www.teamupturn.com/reports/2016/what-isps-can-see),
to search engines, to certificate authorities like Verisign, to domain name servers, to trackers like
Facebook and Google ads, and to any centralized service.

Imagine the training set that a neural network or artificial intelligence, has
been fed with. All of that used for classification of individuals, marketing,
intelligence, and influence.


Is it possible to have privacy and anonymity in this kind of world?

Joe Cicero [discussed](http://www.irongeek.com/i.php?page=videos/cyphercon2016/cyphercon11-pissed-privacy-in-a-surveillance-state-evading-detection-joe-cicero) this topic at Cyphercon 2016.
The conclusion was disapointing; to have privacy you have to let go of your own
self, to detach yourself from everyone else, to cut contact even with your personality.


Privacy and anonymity don't rhyme with freedom.


There are alternative distributed networks that offer more security.

Using [proxies](https://en.wikipedia.org/wiki/Proxy_server), [VPN](https://en.wikipedia.org/wiki/Virtual_private_network),
[TOR](https://en.wikipedia.org/wiki/Tor_(anonymity_network)), [I2P](https://en.wikipedia.org/wiki/I2P),
other [P2P networks](https://en.wikipedia.org/wiki/Peer-to-peer),
[Freenet](https://en.wikipedia.org/wiki/Freenet),
operating systems made towards privacy such as [Tails](https://en.wikipedia.org/wiki/Tails_(operating_system)),
etc..

[Here](https://www.torproject.org/about/overview.html.en)'s an overview of
how the TOR network works.

Layers of encryptions mean nothing if you are using a non-secure connection,
non-SSL, at the exit node.
All in all, it means nothing if you are giving away metadata.

You contact your domain name server, giving it the list of websites you visited.
The platform you are using might give out your location. Someone that uses TOR to browse
anonymously can be tracked if it's the only person in the area to use TOR.

![the anonymous internet](https://upload.wikimedia.org/wikipedia/commons/4/41/Geographies_of_Tor.png)

We've even reached the level where we can associate back the writing style
to the person. Projects suchs as [anonymouth](https://github.com/psal/anonymouth)
and [JStylo](https://psal.cs.drexel.edu/index.php/JStylo-Anonymouth) implement
the method and counter-method.


And we didn't talk about the flaws in those networks yet!


It's hard but not impossible to be out of the "system".  
As I've said before to have privacy you have to let go of your own self.

You should never trigger a flag that would insert you in the "database".

The solution revolves around being normal, to fit in the crowd and not attract
attention.

I've discussed this technique in [an older post](http://venam.nixers.net/blog/security/2014/10/03/obscurity-communication.html).
It uses popular crowded places and the power of [steganography](https://en.wikipedia.org/wiki/Steganography). Sort of like [communicating through spams](https://spammimic.com/index.cgi) but safer.


![hysteria]({{site.baseurl}}/assets/hysteria.png)


It's strange when you notice how after sensational events media companies
overused it, sucking as much money as they can.

People love the sensational, it's addictive!

There's subtilities on the topic inserted in what you see in movies, read in
articles, and hear on radio.

What I've mentioned in the first section of this post has been well covered by them.


However, like Chinese whispers, the facts and what is presented differ, for
example [by editing pictures](https://sabrinahicks.wordpress.com/), or just
plain [media manipulation](https://www.youtube.com/watch?v=0K2pLo8JV5Y).


![glitch2](http://49.media.tumblr.com/33040bfa349fc8b5017396f79a514179/tumblr_o1ozlv0KbR1qkbwrdo1_400.gif)

Sometime the reason for manipulation is because of curruption, sometime brainwash,
sometime misinformation/uneducation of the presenters, sometime about personal ideals.


This contributes to the mystification and hysteria, the
legions of paranoid citizens believing what they've seen in the multimedia.

An average person isn't well informed on many subjects and doesn't have the
curiosity of fetching the information. Or worse, when researching a topic, [the
results of his research are manipulated](http://www.computerweekly.com/news/1280091581/Google-tailors-search-results-based-on-user-behaviour).


The fear and demonization of what is strange and unknown is part of the basics
of human psychology. We all look for the "big bad guys" trying to take over
the world and have nightmares of world cataclysm.


The misinformation on hackers started a decade ago along with the hype
on sci-fi but the fantasies are now redirected on real persons.

This lead to a many having no knowledge of the internet and technology as a
whole. Why should they?

Common misconceptions are:

* "Hackers" are bad (From people who confuse the term hackers with cracker).
* "Hackers" are wizards that can break into anything in seconds.
* "Anonymous" is a group of individuals (as in it's always the same persons and they all have the same opinions).
* "Linux" is for thieves.
* "Viruses" are like body viruses.

And more..

Today's frightening one is:

* Encryption is a device used by terrorists, [an illegal math](http://blog.prakashvenkat.com/illegal/).

Blame it on the bad coverage of the San Bernardino case.

Hopefully, there's still hope,
a British show has [taken the step](https://www.youtube.com/watch?v=zsjZ2r9Ygzw)
to inform people about what is happening.

The next target is the [Whatsapp](https://www.eff.org/deeplinks/2016/03/next-front-new-crypto-wars-whatsapp)
chat platform, which they want to remove encryption from.
It partnered with [Open Whisper](https://whispersystems.org/),
an encryption company lead by Moxie Marlinspike, last year.

![glitch10](http://40.media.tumblr.com/tumblr_lmqldb7dyp1qkbwrdo1_500.jpg)

As I've said in other articles

> All the human knowledge is available online but with a mindset of laziness it’s hard to overcome the step needed for brighter days. It’s undeniable that the capacity to search anything has helped scientists, developers, and the geniuses of the next generation.
> 
> Shamefully, most are satisfied and find self affirmation on online social media, memes networks, and porn websites. Children have brains like sponges, they absorb all the liquids, all the propaganda. And hek we got a pollution of propaganda on the internet.
> 
> News have never spread so fast in the entire history of mankind. News have never been as altered from the objective truth. And it doesn’t stop with news, it’s manipulation all the way down.
> 
> Talk about crowd manipulation on a giant scale, a brainwash. The problem is that people don’t take a propaganda for a propaganda until they realize it’s propaganda. It’s a group movement. The entity takes over the individual. We’re driven by something we can’t control. Add to this that it moves so fast that it’s unstoppable and unjudgeable.
> 
> In conclusion, if we want to extract the dirt from the next generation it’s going to be the self satisfaction by technology instead of dream for a future. 
> 

Their social media is:

> The place where everyone already has accounts, receives notifications and visits on a daily basis


[The Truman Show](https://en.wikipedia.org/wiki/The_Truman_Show) is happening,
[The Matrix](https://www.youtube.com/watch?v=m8e-FF8MsqU) is happening.

How many times should we listen to Plato's [Allegory of the Cave](https://en.wikipedia.org/wiki/Allegory_of_the_Cave) to understand it.

The next section will deal with the people who have seen the sun.


![cyberpunks]({{site.baseurl}}/assets/cyberpunks.png)


There's more to the internet than what the casual person does with it. It's
not just about marketing, Facebook, Twitter, and social media.

That's not even the tip of the iceberg, the web is deep.  
It has many sub-cultures, and [phenomena](https://en.wikipedia.org/wiki/List_of_Internet_phenomena).

The internet has far more to offer.  
It contains most of humankind knowledge.

![glitch3](http://45.media.tumblr.com/d9dde12a3d810472a5871fa2800503da/tumblr_o441r8z04i1qkbwrdo1_500.gif)

You can spend a day discovering what you've always been wondering about, jumping
from website to website, from definition to definition, ad infinitum.

On your quest you meet strangers with the same interests, persons that you
wouldn't be able to meet in your daily life because of distance, both physical
and social.

The internet gives people back their freedom, a shame that we are having it taken
from us.

It is a second life.  
After discussing with the earlier strangers for months you won't consider them
strangers anymore. After working on projects together, discovering the world,
and arguing on multiple subjects.

From forums, to image boards, to blogs, to custom built websites, to irc gateway,
to exotic chat rooms, to [shell accounts](http://www.tilde.club/), to forgotten softwares.  
You can have your own "niche" in your own corner of the internet, away from the
mainstream influence.

There is place for imagination.

![glitch11](http://49.media.tumblr.com/tumblr_lm4eh1F0TA1qkbwrdo1_500.gif)

There's no term for the people that do that but I like to refer to them
as cyberpunks, going against the current trends in [cyberculture](https://en.wikipedia.org/wiki/Cyberculture).
They are very passionate persons seeking more and internet is just an extension
of that passion.


The idea media is the internet.


Some of them have been using the internet since its beginning, they know everything
about it and are nostalgic of the old days.

Some sub-cultures still cultivate this mentality.
They admire [ASCII](https://en.wikipedia.org/wiki/ASCII_art)
and [ANSI art](https://en.wikipedia.org/wiki/ANSI_art), they
get hyped on [chiptune](https://en.wikipedia.org/wiki/Chiptune), they love to
play [wargames](https://en.wikipedia.org/wiki/Wargame_(hacking)) and capture the
flag, they use [Unix-like](https://en.wikipedia.org/wiki/Unix-like) operating
systems, they get crazy on [internet hunts](https://en.wikipedia.org/wiki/The_Internet_Hunt)
and [alternative reality](https://en.wikipedia.org/wiki/Alternate_reality_game) games.

Wargames are games where you have to legally hack into softwares. It helps
understand what can be vulnerable in a system.

To play them you need a wide knowledge of programming, many different type of
technologies, networking, social engineering, and more.

I've [written](http://venam.nixers.net/blog/programming/2015/09/04/wargames-tips.html) about it before.

Alternative reality games are similar to wargames as in you have to crack enigma.
The difference is that they use steganography more than wargames.
[Cicada 3301](https://en.wikipedia.org/wiki/Cicada_3301),
an online secret community, have used it multiple times to hire new members.

The hitch about ARG is that they are extremly easy to put in place but hard for
the players to beat.

Xero on Nixers [made one](https://nixers.net/showthread.php?tid=1800) for the
community. I made some too on a hidden website... but that's another story.


![conclusion]({{site.baseurl}}/assets/conclusion.png)

No, you aren't anonymous!

A song by Rockwell and Michael Jackson: [I always feel like... Somebody's watching me!](https://www.youtube.com/watch?v=7YvAYIJSSZY)


Thanks [xero](http://xero.nu) for the proof reading, the [fonts](https://github.com/xero/figlet-fonts), and the awesome [glitches images](http://x-ero.tumblr.com/) found in this post.
