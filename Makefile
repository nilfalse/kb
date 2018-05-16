SHELL := /bin/bash

DESTINATION = docs
SOURCES = $(shell find . -type f -name '*.md' ! -path './node_modules/*' ! -path './README.md')
DOCS = $(SOURCES:%.md=$(DESTINATION)/%.html)
TEMPLATE = _template
ASSETS = $(patsubst $(TEMPLATE)/%,$(DESTINATION)/%,$(wildcard $(TEMPLATE)/*.js) $(wildcard $(TEMPLATE)/*.css))
IMAGES = $(shell find . -type f -name '*.gif' ! -path './node_modules/*' ! -path './$(DESTINATION)/*')
ILLUSTRATIONS = $(IMAGES:%=$(DESTINATION)/%)

.PHONY : test docs assets clean

all : docs illustrations assets

test : docs illustrations
	rm -f $(DESTINATION)/kb && ln -s $(PWD)/$(TEMPLATE) $(DESTINATION)/kb
	node -e "require('opn')('http://localhost:8000',{wait:false})" &
	(cd docs && python3 -m http.server)

docs : $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html

$(DESTINATION)/404.html : 404.html
	mkdir -p $(shell dirname '$@') && cp 404.html $(DESTINATION)/404.html

$(DESTINATION)/index.html : README.md
$(DOCS) : $(DESTINATION)/%.html : %.md

$(DESTINATION)/%.html :
	mkdir -p $(shell dirname '$@') && (./_tools/markdown.pl < $^ | ./_tools/layout.js > $@)

illustrations : $(ILLUSTRATIONS)
$(ILLUSTRATIONS) : $(IMAGES)
	mkdir -p $(shell dirname '$@') && cp -r $< $@

assets : $(ASSETS)
$(ASSETS) : $(DESTINATION)/% : $(TEMPLATE)/%
	mkdir -p $(shell dirname '$@') && cp $< $@

clean :
	- rm -f $(DOCS) $(DESTINATION)/index.html $(DESTINATION)/404.html $(ASSETS) $(ILLUSTRATIONS) $(DESTINATION)/kb
