# https://makefiletutorial.com/#top

PAGEMACROS := inc/page.m4
SRC := $(wildcard *.m4)
OUTPUTS := $(patsubst %.m4,site/%.html,$(SRC))

all: site $(OUTPUTS)

site:
	mkdir site

site/%.html : %.m4
	m4 -P $(PAGEMACROS) $< >$@
	@echo "	$@ created"

clean:
	rm -r site
