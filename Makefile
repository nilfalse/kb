SHELL := /bin/bash

SOURCES = $(shell find . -type f -name '*.md' ! -path './node_modules/*' ! -path './README.md')
DESTINATION = docs
DOCS = $(SOURCES:%.md=$(DESTINATION)/%.html)

.PHONY : test docs clean

all : docs

test : all
	node -e "require('opn')('http://localhost:8000',{wait:false})" &
	(cd docs && python3 -m http.server)

docs : $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html

clean :
	- rm -f $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html

$(DESTINATION)/404.html : 404.html
	mkdir -p $(shell dirname '$@')
	cp 404.html $(DESTINATION)/404.html

$(DESTINATION)/index.html : README.md
$(DOCS) : $(DESTINATION)/%.html : %.md

$(DESTINATION)/%.html :
	mkdir -p $(shell dirname '$@')
	./_tools/markdown.pl < $^ > $@
