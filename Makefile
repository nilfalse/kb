all : test.html
.PHONY : all

test.html : test.md
	./_engine/markdown.js test.md

clean :
	rm test.html
