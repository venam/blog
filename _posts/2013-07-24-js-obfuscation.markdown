---
layout: post
title:  "JS/HTML Obfuscation"
date:   2013-07-24
categories: security
---

Hello fellow readers,

This thread is about obfuscating the content of a webpage.
This might not be so useful, security wise, because all the sensitive information should be kept server side.
However, for the ones trying to reverse engineer the page this is a huge obstacle.
#### JS Obfuscation
I found two nifty tools on the internet that are heavily used to obfuscate js.
[jsobfuscator](http://javascriptobfuscator.com/) by CuteSoft.net 
and the extremely popular [packer](http://dean.edwards.name/packer/) by Dean Edwards.
I've stumbled upon the last one while reverse engineering a website where I had to do some vote automation.
The **packer** is characterized by its signature :
[code]
eval(function(p,a,c,k,e,r){....
[/code]
The packer is also ported to multiple other languages.

#### Deobfuscating JS
A little story on the side now. After finding the packer in the html of the website I was working on, I started to search around the internet how to decrypt it. Some people said to use the **decode** button on the packer site and to unlock it by changing the attributes in the page source but this wasn't a smart solution.  
Then, I found an amazing website. The [js beautifier](http://jsbeautifier.org/).
This website de-obfuscate js and makes it look good by rearranging the syntax.
Now, the question is _Can it de-obfuscate consecutive encryptions?_. It's known that doing consecutive hash is a bad security habit because it augments the risk of collision, but, here we are talking about obfuscating the readability of the code and not about a one-to-one correspondence (hash).
The results show that after doing the obfuscation three times the jsbeautifier page cannot de-obfuscate it.  
The jsbeautifier is also ported to multiple other languages.

#### Obfuscating html
This one is just plain stupid but for the sake of it I'll just leave some words about it.
You can obfuscate a page by encrypting it with a password and let js decrypt it with the password key at login.
That's a huge hassle for something of that importance and it makes the website unmaintainable.
If you want to try that out here is a page that let you do that: [protect page with password](http://www.zubrag.com/tools/html-password-protector-encoder.php)
Another method is to just blurt out the page from js. Here's some example websites:
[one](http://www.iwebtool.com/html_encrypter)
[two](http://smartgb.com/free_encrypthtml.php)
This also makes the page extremely hard to maintain.
On the other hand, it prevents bots from spidering your websites and it also prevents login automation via scripts (considering you also post a salt key or another dynamic element in the page at login). It also makes sure that the user have js enabled.
So if you can turn that into an easy to maintain process you will have a pretty obscured website  and might never appear in search engines.

#### Obfuscating Text
Obfuscating text isn't meant to hide it. It stops search engines that crawl your website and seek for keywords on it.
[This](http://www.textobfuscator.com/) amazing website let you do that.
However, this might make the people reading your website really angry.

Last note:  
Encryption on the user side is stupid, never do that. The only time you might want to do that is to not send a password around the network in clear text, thus you hash it before posting it.
Obfuscation is another story. It's just to make the page content unreadable and unmaintainable.  

Feel free to contribute to this thread.

EDIT: I've already posted this thread before the server move. Fortunately, I always save the threads I write.


[Thread](http://nixers.net/showthread.php?tid=591) on Nixers.net
