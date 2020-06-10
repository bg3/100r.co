/*  Pipi
 *  Static site generator for Park Imminent.
 *  B. Grayland
 *  2020/05/10
 */

#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>

#define PI_WHITE "#fffff9"
#define PI_NEWWH "#f7ffff"
#define PI_BLACK "#111111"
#define PI_GREY  "#d1d1d1"
#define PI_RED   "#ef5541"

#define PI_RUNES      " \"+=->#*'|"
#define PI_PARAGRAPH  ' '
#define PI_QUOTE      '\"'
#define PI_IMAGE      '+'
#define PI_HEADING    '='
#define PI_SUBHEADING '-'
#define PI_CODE       '>'
#define PI_NUMBERED   '#'
#define PI_BULLETED   '*'
#define PI_COMMENT    '\''
#define PI_TABLE      '|'

/* structs */

typedef struct page page;
typedef struct line line;

struct page {
  char*   title;
  char*   filename;
  char*   section;
  page*   parent;
  line*   lines;
  int     numlines;
};

struct line {
  char  type;
  char* text;
};


/* getline */

char* gline(FILE * f) {
  size_t size = 0;
  size_t len  = 0;
  size_t last = 0;
  char * buf  = NULL;

  do {
    size += BUFSIZ; /* BUFSIZ is defined as "the optimal read size for this platform" */
    buf = realloc(buf,size); /* realloc(NULL,n) is the same as malloc(n) */
    /* Actually do the read. Note that fgets puts a terminal '\0' on the
       end of the string, so we make sure we overwrite this */
    fgets(buf+last,size,f);
    len = strlen(buf);
    last = len - 1;
  } while (!feof(f) && buf[last]!='\n');
  return buf;
}

/* append buffer */
/*
struct abuf {
  char *b;
  int len;
};

#define ABUF_INIT {NULL, 0}

void abAppend(struct abuf *ab, const char *s, int len) {
  char *new = realloc(ab->b, ab->len + len);
  if (new == NULL) return;
  memcpy(&new[ab->len], s, len);
  ab->b = new;
  ab->len += len;
}
void abFree(struct abuf *ab) {
  free(ab->b);
} */

int string_to_filename(char* str, char* fn) {
  int i = 0;
  int last_char_was_dash = 0;

  for (int j = 0; j < (int) strlen(str); j++) {
    char char_to_write = '\0';
    if (isalnum(str[j])) {
      char_to_write = str[j];
      last_char_was_dash = 0;
    } else if (str[j] == ' ') {
      if (!last_char_was_dash) {
        char_to_write = '-';
        last_char_was_dash = 1;
      }
    }

    if (char_to_write) {
      fn[i] = tolower(char_to_write);
      i++;
    }
  }
  fn[i] = '\0';
  return i;
}

/* html output */

void html_header(FILE* f, char line[]) {
  fprintf(f, "<!DOCTYPE html>\n <html lang=\"en\">\n <head>\n <title>%s</title>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> </head>\n <body>\n", line);
}

void html_banner(FILE* f) {
  fprintf(f, "<nav><h2><a href=\"/index.html\">Park</br>Imminent</a></h2></nav>");
}

void html_title(FILE* f, char line[]) {
  fprintf(f, "<h1>%s</h1>\n", line);
}

void html_footer(FILE* f) {
  fprintf(f, "</body>\n</html>");
}

void html_para(FILE* f, char text[]) {
  fprintf(f, "<p>%s</p>\n", text);
}

void html_quote(FILE* f, char text[]) {
  fprintf(f, "<blockquote>%s</blockquote>\n", text);
}

void html_heading(FILE* f, char text[]) {
  fprintf(f, "<h2>%s</h2>\n", text);
}

void html_subheading(FILE* f, char text[]) {
  fprintf(f, "<h3>%s</h3>\n", text);
}

void html_code(FILE* f, char text[]) {
  fprintf(f, "<pre>%s</pre>\n", text);
}

/* HTML table */

int count_table_columns(char header_row[]) {
  int cols = 1;
  size_t len = strlen(header_row);

  for (size_t i = 0; i < len; i++) {
    if (header_row[i] == '|' && header_row[i + 1] != '\0') {
      cols++;
    }
  }

  return cols;
}

void html_table_start(FILE *f) {
  fprintf(f, "<table>\n");
}

void html_table_row(FILE* f, char text[], int cols) {

  /*
   * cols =
   *           1         2
   * 0123456789012345678901
   * cell1 | cell2 | cell3\0
   * cell1 | cell2 |\0
   * cell1 |\0
   *
   * col_start = 0
   * col_end   = 6
   * print 0-6
   *
   * at last column? write the remaining text into that column.
   * else
   *  check length of remaining string - nonzero?
   *    calc col_end
   *      col_end = null
   *        write remaining string to cell
   *      else
   *        write from col_start to col_end into td
   *        col_start = col_end
   *  else
   *    write an empty cell
   */

  fprintf(f, "<tr>");

  int current_col = 0;
  char* col_start = text;
  char* col_end = strchr(text, '|');

  while (current_col < cols) {
    fprintf(f, "<td>");
    for (; col_start < col_end; col_start++) {
      fprintf(f, "%c", col_start[0]);
    }
    col_start = col_end + 1;
    col_end = strchr(col_start, '|');
    fprintf(f, "</td>");
    current_col++;
  }

  fprintf(f, "</tr>");
}

void html_table_end(FILE *f) {
  fprintf(f, "</table>\n");
}

void html_img(FILE* f, char text[]) {
  int image_number;
  int n;
  //  need to check if sscanf failed - n would be uniitialised otherwise.
  //  also, figcaption seems outdated.
  sscanf(text, "%i %n", &image_number, &n);
  char* caption = text+n;
  fprintf(f, "<figure>\n<img src=\"..\\img\\%i.png\" />\n<figcaption>%s</figcaption>\n</figure>\n", image_number, caption);
}

void unhandled_line(FILE* f, char text[]) {
  fprintf(f, "<p style=\"color: #ef5541\">%s</p>\n", text);
}

char* remove_section_from_title(char* section, char* title) {
  char* split_point;
  split_point = strchr(title, '\\');
  if (split_point) {
    printf("\nTitle\t(%s)\n", split_point + 1);
    printf("Split\t[%ld]\n", split_point - title);
    section = realloc(section, sizeof(char) * (split_point - title));
    memcpy(section, title, split_point - title);
    section[split_point - title] = '\0';
    title = split_point + 1;
    printf("TitleE\t%s\n", title);
    printf("SectionE\t%s\n", section);
    
  }
  return title;
}
     

int remove_char(char* str, char c) {
   int removed = 0;
   char* tmp;

   while (*str) {
     tmp = strchr(str, c);
     if (NULL == tmp) {
       break;
     } else {
       size_t len = strlen(tmp + 1);
       memmove(tmp, tmp + 1, len);
       tmp[len] = 0;
       ++removed;
       str = tmp;
     }
   }
   return removed;
}

char* p_getline(FILE* in) {
  char buffer[10];
  char* input = 0;
  size_t cur_len = 0;

  while (fgets(buffer, sizeof(buffer), in)) {
    size_t buf_len = strlen(buffer);
    char* extra = realloc(input, buf_len + cur_len + 1);
    if (extra == 0)
      break;
    input = extra;
    strcpy(input + cur_len, buffer);
    cur_len += buf_len;
    if (input[cur_len - 1] == '\n')
      break;
  }

  return input;
}

void addLineToPage(line l, page* p) {
  p->numlines++;
  p->lines = realloc(p->lines, sizeof(line) * p->numlines);
  p->lines[p->numlines - 1] = l;
}

int generate_page(FILE* out, page* p) {
  html_header(out, p->title);
  html_banner(out);
  html_title(out, p->title);
  int table_mode = 0; /* later on, make this block mode and use enum to indicate which type */
  int table_cols = 0;
  int n = 0;
  for (int j = 0; j < p->numlines; j++) {
    line l = p->lines[j];
    n++;

    if (table_mode && l.type != PI_TABLE) {
      html_table_end(out);
      table_mode = 0;
      table_cols = 0;
    }

    switch(l.type) {
      case PI_PARAGRAPH:
        html_para(out, l.text);
        break;
      case PI_QUOTE:
        html_quote(out, l.text);
        break;
      case PI_HEADING:
        html_heading(out, l.text);
        break;
      case PI_SUBHEADING:
        html_subheading(out, l.text);
        break;
      case PI_COMMENT:
        continue;
      case PI_CODE:
        html_code(out, l.text);
        break;
      case PI_IMAGE:
        html_img(out, l.text);
        break;
      case PI_TABLE:
        if (!table_mode) {
          table_mode = 1;
          table_cols = count_table_columns(l.text);
          html_table_start(out);
        }
        html_table_row(out, l.text, table_cols);
        break;
      default:
        unhandled_line(out, l.text);
        break;
    }
  }
  html_footer(out);
  return n;
}

int generate_pages(page* pages, int page_count) {
  int n = 0;
  for (int i = 0; i < page_count; i++) {
   char* fn;
    asprintf(&fn, "../site/%s.html", pages[i].filename);
    FILE* out = fopen(fn, "w");
    n += generate_page(out, &pages[i]);
   }
  return n;
}

void generate_index(page* pages, int page_count) {
  FILE* out = fopen("../index.html", "w");
  html_header(out, "Park Imminent");
  fprintf(out, "<nav><h1>Park</br>Imminent</br></h1></nav>");
  fprintf(out, "<ul>");
  for (int i = 0; i < page_count; i++) {
    fprintf(out, "<li><a href=\"./site/%s.html\">%s</a></li>\n", pages[i].filename, pages[i].title);
  }
  fprintf(out, "</ul>");
  html_footer(out);
}
    

void parse_file(FILE* file, page** p_pages, int* page_count) {
  char* rawline = 0;

  while( (rawline = p_getline(file)) ) {
    char rune = 0;
    int  n = 0;
    sscanf(rawline, "%c %n", &rune, &n);
    remove_char(rawline, '\n');
    char* text = rawline + n;

    if (rune == '\n') {
      continue;
    } else if (!strchr(PI_RUNES, rune)) {
      /* must be the title of a new page */
      *page_count = *page_count + 1;
      *p_pages = realloc(*p_pages, sizeof(page) * *page_count);

      int len = (int) strlen(rawline) + 1;
      char* section = NULL;
      rawline = remove_section_from_title(section, rawline); 
      printf("SectionP\t%s\n", section);
      printf("RawlineP\t%s\n", rawline);
      char* fn = (char*) malloc(len * sizeof(char));
      string_to_filename(rawline, fn);
      page* p = *p_pages;
      int address = *page_count - 1;
      p[address] = (page) { .title = rawline, .section = section, .filename = fn, .parent = NULL, .lines = NULL, .numlines = 0 };
    } else {
      line l = { .type = rune, .text = text };
      addLineToPage(l, *p_pages + *page_count - 1);
    }
  }
}

/* init */

int main() {

  char* source_directory = "../data/";
  DIR* dir = opendir(source_directory);

  struct dirent* entry;
  int files = 0;

  page* raw_pages = NULL;

  int num_pages = 0;

  while ((entry = readdir(dir))) {

    if (entry->d_name[entry->d_namlen - 3] == '.' &&
        entry->d_name[entry->d_namlen - 2] == 'p' &&
        entry->d_name[entry->d_namlen - 1] == 'i') {
      files++;
      size_t filename_length = strlen(entry->d_name) + strlen(source_directory);
      char filename[filename_length + 1];
      strcpy(filename, source_directory);
      strcat(filename, entry->d_name);
      printf("Processing file %3d: %s\n", files, entry->d_name);
      FILE* f = fopen(filename, "r");
      printf("num pages: %d\n", num_pages);
      parse_file(f, &raw_pages, &num_pages);
    }
  }
  /* close the FILE */
  generate_pages(raw_pages, num_pages);
  generate_index(raw_pages, num_pages);

  return EXIT_SUCCESS;
}
