SHELL := /bin/bash
DESTINATION = docs
SOURCES = $(shell find . -type f -name '*.md' ! -path './node_modules/*' ! -path './README.md' -printf '%P\n')
DOCS = $(patsubst %.md,$(DESTINATION)/%.html,$(SOURCES))

.PHONY : docs clean

all : docs

docs : $(DOCS) $(DESTINATION)/index.html

clean :
	- rm -f $(DOCS) $(DESTINATION)/index.html

$(DESTINATION)/index.html : README.md
$(DOCS) : $(DESTINATION)/%.html : %.md

$(DESTINATION)/%.html :
	mkdir -p $(shell dirname '$@')
	./_engine/markdown.js < $^ > $@
