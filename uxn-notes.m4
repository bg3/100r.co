_header(.:Uxn assembly notes:.)m4_dnl
<p>Loose notes as I figure out how to use Uxn assembly.</p>
<h2>neralie.usm</h2>
<p>I reviewed the source to some of the programs that accompany the C Uxn emulator to learn how they work.</p>
<pre>(
	app/neralie : clock with arvelie date

	TODO
		- use splash screen when FPS calculation is unstable
)</pre>
<p>Anything in parentheses is a comment, and is ignored by the assembler.</p>
<pre>%h { .DateTime/hour   DEI }
%m { .DateTime/minute DEI }
%s { .DateTime/second DEI }
%8** { #30 SFT2 }</pre>
<p>These four lines are defining macros. For example, the macro in the first line causes any occurence of <b>h</b> in the code to be replaced with the code between the curly braces.</p>
<p>The first three macros are for loading the system's date device values into <em>the address preceding the macro identifier?</em></p>
<p>The fourth macro 8** performs an arithmetic shift... #30 is decimal 48, but shifting 48 places doesn't seem right.</p>
<pre>( devices )

|00 @System [ &vector $2 &pad $6 &r $2 &g $2 &b $2 ]
|10 @Console [ &vector $2 &pad $6 &char $1 &byte $1 &short $2 &string $2 ]
|20 @Screen [ &vector $2 &width $2 &height $2 &pad $2 &x $2 &y $2 &addr $2 &color $1 ]
|b0 @DateTime [ &year $2 &month $1 &day $1 &hour $1 &minute $1 &second $1 &dotw $1 &doty $2 &isdst $1 ]</pre>
<p>These lines are mapping the system devices to labels. The |xx values are indicating the place in memory where this device lies, then the @Xxx is defining a label for that address. The rest of the line is then creating offsets from the label using 'sub-labels' - these can be addressed like <b>.Screen/x</b>. The $x indicate padding, how much space is between each of the sub-labels.</p>

<pre>( variables )

|0000

@fps [ &current $1 &next $1 &second $1 ]
@number [ &started $1 &count $1 ]
@lines [ &x1 $2 &x2 $2 &y1 $2 &y2 $2 &addr $1 ]
@neralie [ &n0123 $2 &n4 $1 &n5 $1 &n6 $1 &n7 $1 &n8 $1 &n9 $1 &color $1 &x $2 &y $2 &w $2 &h $2 ]
@mul [ &ahi $1 &alo $1 &bhi $1 &blo $1 ]</pre>
<p>These are memory addresses for variables, arranged into labels and sub-labels. The $x values indicate the padding before the address corresponding to the next label. So, @fps (and @fps/&current) are at memory address 0000. &current is intended to take up 1 byte, so there is a padding of $1 afterwards, then &next is at address 0001, and so on.</p>

_footer(.:recipes:.)m4_dnl
