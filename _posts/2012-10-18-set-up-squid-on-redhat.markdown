---
layout: post
title:  "Set up Squid on RedHat"
date:   2012-10-18
categories: unix
---

Hello readers,

Recently, a friend let me use his Redhat VPS.
I thought of using it as a proxy cache.
First things first, this was the first time I was using a Redhat server and that I was really messing with RPM. So I checked on the package manager and other specifics.

I started by doing a search for the squid package:
{% highlight bash  linenos %}
yum search squid
{% endhighlight %}

Then I went straight forward to install it but...
{% highlight bash  linenos %}
yum install squid
{% endhighlight %}
suddenly an error bumped on the screen!:
Error: Missing Dependency: perl(URI::URL) is needed by package squid

Perl was already installed so I did some googlefu to check for a workaround:
You need to install it from an rpm:
{% highlight bash  linenos %}
wget ftp://ftp.pbone.net/mirror/ftp.centos.org/5.2/os/\
x86_64/CentOS/perl-URI-1.35-3.noarch.rpm
rpm -ivh perl-URI-1.35-3.noarch.rpm
{% endhighlight %}

To this point I had squid installed. Now is the time to set it up.
The configs are in /etc/squid/squid.conf

Now all I needed to do is to start the daemon. (change from sysV to systemd)

With further reading I understood that I wanted to use like this:
http_port 8080

I set the access policy in the file.
At first I added the "allow all" at the end of the file but my browser was still shouting about me having no rights to access the proxy.

The workaround to this was to proxy all my traffic through ssh (thanks to d9u).
{% highlight bash  linenos %}
ssh -C -D 2975 -fN user@address -p 8080
{% endhighlight %}
In the browser :
socks5 localhost:2975

This is working fine but it was not what I really wanted.

Finally, I rechecked the config file and found out that a line at the top was uncommented, lines that contained deny policy. I commented those lines and it worked fine in the browser without proxying through ssh.

Moral of the story:
Squid config doesn't remove each other, I mean that if the same config is in the same file the first will overide the ones that follow.

I hope this helps someone.

See ya!

