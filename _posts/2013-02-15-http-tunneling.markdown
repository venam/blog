---
layout: post
title:  "http tunneling"
date:   2013-02-15
categories: security
---

Got http tunneling working with ssh running on port 80 or 443 on my vps. (other ports were blocked at university)
Tunneling with:
<pre>
ssh -C -D localport -fN user@host -p 443
</pre>

Then set it as a socks5 proxy in the browser.
