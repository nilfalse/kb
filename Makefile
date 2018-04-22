SHELL := /bin/bash

SOURCES = $(shell find . -type f -name '*.md' ! -path './node_modules/*' ! -path './README.md')
DESTINATION = docs
DOCS = $(SOURCES:%.md=$(DESTINATION)/%.html)
CACHES = $(SOURCES:%.md=$(DESTINATION)/%.html.cached)

.PHONY: explicitly_phony warmup docs clean

all : docs

warmup : $(CACHES) $(DESTINATION)/index.html.cached

docs : $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html

clean :
	- rm -f $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html

$(DESTINATION)/404.html : 404.html
	cp 404.html $(DESTINATION)/404.html

$(DESTINATION)/%.html.cached : explicitly_phony
	- (git show origin/$(TARGET_BRANCH):$*.html > $(DESTINATION)/$*.html) &>/dev/null \
	&& git log --pretty=format:%cd -n 1 --date=iso origin/$(TARGET_BRANCH) -- $*.html

$(DESTINATION)/index.html : README.md
$(DOCS) : $(DESTINATION)/%.html : %.md

$(DESTINATION)/%.html :
	mkdir -p $(shell dirname '$@')
	./_tools/markdown.js < $^ > $@
