import struct
import sys
import shutil
import os

NUM_RECENT_ITEMS = 5
OUTPUT_DIR = 'site'

def parse_journal(file, projects):
    print("\nParsing journal")
    print("---------------")

    entries = []

    # skip header rows
    next(file)
    next(file)

    num_entries = 0
    num_entries_unknown = 0

    for line in file:
        entry = {}
        entry['date']       = line[:6].strip()
        entry['stats']      = line[7:11]
        entry['workstats']  = line[12:14]
        entry['project']    = line[15:33].strip()
        entry['worktype']   = line[34:47].strip()
        entry['img']        = line[49:52].strip()
        entry['caption']    = line[52:].strip()

        num_entries += 1

        if not entry['project'] in projects:
            print('{} not found in codex!'.format(entry['project'].upper()))
            num_entries_unknown += 1

        entries.append(entry)

    print("\nRead {} entries ({} with unknown projects)".format(num_entries, num_entries_unknown))

    return entries

def strip_codex_code(line):
    idx = line.find(':')
    value = ""
    if (idx == -1):
        print("Incorrectly formatted line in {}".format(current_subject))
    else:
        value = line[idx + 1:].strip()
    return value

def parse_codex(file):
    print("\nParsing codex")
    print("-------------")

    entries = {}
    entry = {}
    current_subject = "none"

    for line in file:

        if len(line.strip()) > 0 and line[:2] != '--':
            if line[0].isspace():
                # could be parent, desc or body
                # TODO both functions are doing the exact same thing.
                if (line.strip().startswith("NAME")):
                    entry['name'] = strip_codex_code(line)
                elif (line.strip().startswith("PARENT")):
                    entry['parent'] = strip_codex_code(line)
                elif (line.strip().startswith("BODY")):
                    entry['body'] = []
                else:
                    if 'body' in entry:
                        entry['body'].append(line.strip())
                    else:
                        print('\tUnknown key found in line:\n\t{}'.format(line.strip()))
            else:                   # if first char is not space, then it marks a new codex entry
                id = line.strip()
                if id in entries.keys():
                    print('Duplicate definition for project {}!'.format(id.upper()))
                else:
                    print('Found project \'{}\''.format(id))
                if entry:           # append the old entry
                    entries[entry['id']] = entry
                entry = { 'id': id }
    if entry:
        print('last entry!! {}'.format(entry['id']))
        entries[entry['id']] = entry

    print("\nFound {} entries:".format(len(entries.keys())))
    for entry in entries.values():
        print('\t{}'.format(entry['id']))

    return entries

def set_children(entries):
    for child in entries.values():
        for k, parent in entries.items():
            if parent['id'] == child['parent']:
                if not 'children' in parent:
                    parent['children'] = []
                parent['children'].append(child['id'])
    return entries

def parse_links(line, codex_entries):

    # [[code]]              displays as the friendly name
    # [[code alt-text]]     displays as alt-text
    # [[url]]               displays as url
    # [[url alt-text]]      displays as alt-text

    start = line.find('[[')
    end = line.find(']]')
    if not (start == -1 or end == -1):
        href = 'index.html'
        text = '???'

        link = line[start+2:end]
        link = link.split(' ', 1)


        if link[0].startswith('http'):
            href = link[0]
            if len(link) == 2:
                text = link[1]
            else:
                text = link[0]
        else:
            href = '{}.html'.format(link[0])
            if link[0] in codex_entries:
                if len(link) == 2:
                    text = link[1]
                else:
                    text = codex_entries[link[0]]['name']
            else:
                print('Codex entry {} linked but not found.'.format(link[0]))

        line = line[:start] + '<a href="{}">{}</a>'.format(href, text) + line[end+2:]
        return parse_links(line, codex_entries) # recursively parse the rest of the line
    else:
        return line

def generate_page(subject, journal_entries, codex_entries):
    # get relevant codex entry and all relevant journal entries.
    # TODO handle multiple codex entries for same subject (skip the second one?)
    c = next((entry for entry in codex_entries.values() if entry['id'] == subject), None)
    js = [entry for entry in journal_entries if entry['project'] == subject]

    if c == None:
        c = {'id': subject, 'parent': 'unwritten', 'name': subject, 'body': ['<p>Nothing has been written about this subject yet.</p>']}
    print('\t{}, {}, {}'.format(subject, len(c), len(js)))

    output_path = os.path.join(OUTPUT_DIR, subject + ".html")
    f = open(output_path, 'w')

    f.write("<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"utf-8\">\n\t<title>Park Imminent: {}</title>\n\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/style.css\">\n\t</head>\n<body>\n".format(subject))
    f.write('<header>\n\t<a href=\"index.html\">Park Imminent</a>\n</header>\n')
    t = trail(codex_entries, subject)
    f.write('<main><p class="breadcrumb">')
    while t:
        n = codex_entries[t.pop()]
        #if t:
        f.write('<a href="{}.html" class="noborder">{}</a><span style="margin-right:0.3em;">\</span>'.format(n['id'], n['name']))
        #else:
        #    f.write('<a href="{}.html" class="noborder">{}</a>'.format(n, n))
    f.write('</p>')
    f.write('<h1>{}</h1>'.format(c['name']))

    # MOST RECENT JOURNAL IMAGE

    # if not js == []:
    #     for entry in js:
    #         print('!\t\t{} [{}]'.format(entry['caption'], entry['img']))
    #         if entry['caption'] and entry['img']:
    #             print('found image')
    #             f.write('<figure><img src="../media/img/journal/{}.jpg" class="wide"><figcaption>{}</figcaption></figure>'.format(entry['img'], entry['caption']))
    #             break

    # CODEX CONTENT

    for line in c['body']:
        f.write(parse_links(line, codex_entries))

    # ADD REMAINING JOURNAL IMAGES

    if not js == []:
        for entry in js[1:]:
            #skipped_first = False
            if entry['caption'] and entry['img']:
                #if skipped_first:
                f.write('<figure class="wide"><img src="../media/img/journal/{}.jpg" class="wide"><figcaption>{} — {}</figcaption></figure>'.format(entry['img'], entry['date'], entry['caption']))
                # skipped_first = True

        f.write('<h2><b>Journal entries</b></h2>\n<ul>\n')
        for entry in js:
            if entry['caption'] and not entry['img']:
                f.write('<li>{} - {}</li>'.format(entry['date'], entry['caption']))

        f.write('</ul>\n')

    if 'children' in codex_entries[subject]:
        f.write('<h2><b>Child pages</b></h2>\n')
        recursive_tree(f, codex_entries, subject)

    f.write('</main></body>')
    f.close()

def trail(entries, current):
    trail = []
    current = entries[current]['parent']
    while current != 'index':
        trail.append(current)
        current = entries[current]['parent']
    return trail

def recursive_tree(fp, entries, start):
    fp.write('<ul class="nobullets">\n')
    for entry in entries.values():
        if entry['parent'] == start:
            fp.write('<li><a class="noborder" href="{}.html">{}</a></li>'.format(entry['id'], entry['name']))
            if 'children' in entry:
                recursive_tree(fp, entries, entry['id'])
    fp.write('</ul>\n')

def generate_index(subjects, journal_entries, entries):
    output_path = os.path.join(OUTPUT_DIR, 'index.html')

    f = open(output_path, 'w')
    f.write("<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"utf-8\">\n\t<title>Park Imminent</title>\n\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/style.css\">\n\t</head>\n<body>\n")
    f.write('<header>\n\t<a href=\"index.html\">Park Imminent</a>\n</header>\n')

    # if not journal_entries == []:
    #     for entry in journal_entries:
    #         print('!\t\t{} [{}]'.format(entry['caption'], entry['img']))
    #         if entry['caption'] and entry['img']:
    #             print('found image')
    #             f.write('<figure><img src="../media/img/journal/{}.jpg" class="wide"><figcaption>{} — {}</figcaption></figure>'.format(entry['img'], entry['date'], entry['caption']))
    #             break

    f.write('<h2>Recent</h2>')

    # RECENT ITEMS
    f.write('<ul class="nobullets">\n')
    for _ in range( NUM_RECENT_ITEMS):
        s = subjects.pop(0)
        f.write('<li><a class="noborder" href=\"{}.html\">{}</a></li>'.format(entries[s]['id'], entries[s]['name']))
    f.write('</ul>\n')

    # TREE
    f.write('<h2>All</h2>')
    recursive_tree(f, entries, 'index')

### MAIN

os.system('clear')

try:
    shutil.rmtree(OUTPUT_DIR)
except OSError as e:
    print(f'Could not remove output dir \'{output_dir}\': {e.strerror}')

os.mkdir(OUTPUT_DIR)

codex_file = open("data/codex.pi", 'r', encoding='utf-8', errors='ignore')
journal_file = open("data/journal.pi", 'r', encoding='utf-8', errors='ignore')

codex_entries = parse_codex(codex_file)
codex_entries = set_children(codex_entries)

project_codes = [entry['id'] for entry in codex_entries.values() if 'id' in entry]

journal_entries = parse_journal(journal_file, project_codes)

print("\nGenerating pages")
print("----------------")

for subject in project_codes:
    if subject != 'index':
        generate_page(subject, journal_entries, codex_entries)

print("\nGenerating index")
print("----------------")

generate_index(project_codes, journal_entries, codex_entries)
