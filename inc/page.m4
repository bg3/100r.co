m4_dnl http://www.alcyone.com/max/info/m4.html
m4_dnl http://www.jpeek.com/articles/linuxmag/2005-02/
m4_dnl http://www.jpeek.com/articles/linuxmag/2005-03/
m4_dnl https://p.hagelb.org/Makefile.html
m4_dnl http://m4-bloggery.invergo.net/fossil/dir?ci=tip
m4_changequote(.:,:.)m4_dnl
m4_define(.:_h1:.,.:<h1>$1</h1>:.)m4_dnl
m4_define(.:_h2:.,.:<h2>$1</h2>:.)m4_dnl
m4_define(.:_link:.,.:<a href="$2">$1</a>:.)m4_dnl
m4_define(.:_idx_link:.,.:<a href="$2.html">$1</a>:.)m4_dnl
m4_define(.:_ul_link:.,.:<li><a href="site/$2.html">$1</a></li>:.)m4_dnl
m4_define(.:_header:., .:<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='utf-8'>
	<meta name='description' content='TODO'/>
	<meta name='viewport' content='width=device-width,initial-scale=1'>
	<link rel='alternate' type='application/rss+xml' title='RSS Feed' href='../links/rss.xml' />
	<link rel='stylesheet' type='text/css' href='/css/style.css'>
	<link rel='shortcut icon' type='image/png' href='/media/services/icon.png'>
	<title> Park Imminent &mdash; $1</title>
</head>
<body>
<header>
	<a href='/index.html'><img src="/media/img/ui/logo.svg" alt="Park Imminent" height="48px"></a>
</header>
<nav></nav>
<main>
m4_ifdef(.:is_indexk:.,,_h1($1)):.)m4_dnl
m4_define(.:_footer:.,.:</main>
<a href="http://webring.xxiivv.com/"><img src="/media/img/ui/rotonde.svg" width="30 !important;" style="margin-top: 6em;"></a>
</body>
</html>:.)m4_dnl
