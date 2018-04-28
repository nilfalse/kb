SHELL := /bin/bash

SOURCES = $(shell find . -type f -name '*.md' ! -path './node_modules/*' ! -path './README.md')
DESTINATION = docs
DOCS = $(SOURCES:%.md=$(DESTINATION)/%.html)
TEMPLATE = _template
ASSETS = $(patsubst $(TEMPLATE)/%,$(DESTINATION)/%,$(wildcard $(TEMPLATE)/*.js) $(wildcard $(TEMPLATE)/*.css))

.PHONY : test docs assets clean

all : docs assets

test : docs
	ln -sf $(TEMPLATE) $(DESTINATION)/kb
	node -e "require('opn')('http://localhost:8000',{wait:false})" &
	(cd docs && python3 -m http.server)

docs : $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html

$(DESTINATION)/404.html : 404.html
	mkdir -p $(shell dirname '$@')
	cp 404.html $(DESTINATION)/404.html

$(DESTINATION)/index.html : README.md
$(DOCS) : $(DESTINATION)/%.html : %.md

$(DESTINATION)/%.html :
	mkdir -p $(shell dirname '$@')
	./_tools/markdown.pl < $^ | ./_tools/layout.js > $@

assets : $(ASSETS)

$(ASSETS) : $(DESTINATION)/% : $(TEMPLATE)/%
	mkdir -p $(shell dirname '$@')
	cp $< $@

clean :
	- rm -f $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html $(ASSETS) $(DESTINATION)/kb
