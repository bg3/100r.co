String.prototype.toCapitalCase = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() }
String.prototype.toUrl = function () { return this.trim().replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase() }

function Page (id, table, database, parent) {
  const runic = require('./lib/runic')
  const curlic = require('./lib/curlic')

  this.id = id.toLowerCase()
  this.parent = parent || 'home'
  this.filename = this.id.toUrl()

  this.path = function () {
    return `./pages/${this.filename}.html`
  }

  function _description () {
    return 'TO DO'
  }

  function _keywords () {
    let str = ''
    const db = database[parent]
    for (const id in db) {
      str += `${id}, `
    }
    str += Object.keys(table).join(', ').trim()
    console.log(`KEYWORDS: ${str}`)
    return str.toLowerCase().trim()
  }

  function _main (data) {
    return `${runic(data, curlic)}`.trim()
  }

  function _list (name, data) {
    return `<ul>${Object.keys(data).reduce((acc, key, val) => { return key !== 'SETTINGS' ? `${acc}<li><a href='${!parent ? name.toUrl() + '.html#' + key.toUrl() : key.toUrl() + '.html'}'>${key.toCapitalCase()}</a></li>\n` : '' }, '')}</ul>\n`
  }

  function _jump (table) {
    return Object.keys(table).length >= 6 && parent ? `<ul class='jump'>${Object.keys(table).reduce((acc, key, val) => { return `${acc}<li><a href='#${key.toUrl()}'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n` : ''
  }

  function _template (acc, key) {
    if (key === 'SETTINGS') { return acc }
    return `${acc}<h3 id='${key.toUrl()}'><a href='${parent ? '#' + key.toUrl() : key.toUrl() + '.html'}'>${key.toCapitalCase()}</a></h3>\n${Array.isArray(table[key]) ? _main(table[key]) : _list(key, table[key])}\n`
  }

  function _core (id, parent, content) {
    return `<h1>${id.toCapitalCase()}</h1>\n${_jump(table)}${Object.keys(table).reduce(_template, '')}\n`.trim()
  }

  function _navi (database) {
    const keys = Object.keys(database)
    return `<ul>${keys.reduce((acc, key) => {
      const keys = Object.keys(database[key])
      return `${acc}<li><a href='${key.toUrl()}.html'>${key}</a></li>\n<ul>${keys.reduce((acc, key) => { return `${acc}<li><a href='${key.toUrl()}.html'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n`
    }, '')
    }</ul>`.trim()
  }

  function _social () {
    return `
    <ul id='social'>
      <li><a href='https://twitter.com/?' class='twitter' target='_blank'></a></li>
      <li><a href='https://github.com/?' class='github' target='_blank'></a></li>
      <li><a href='https://patreon.com/?' class='patreon' target='_blank'></a></li>
    </ul>
    `
  }

  function _footer () {
    return ``
  }

  this.toHtml = function () {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="author" content="Benjamin Grayland">
  <meta name='description' content='${_description()}'/>
  <meta name='keywords' content='${_keywords()}' />
  
  <title>Park Imminent — ${this.id.toCapitalCase()}</title>

  <link rel="alternate"  type="application/rss+xml" title="Feed" href="../links/rss.xml" />
  <link rel="stylesheet" type="text/css" href="../links/reset.css"/>
  <link rel="stylesheet" type="text/css" href="../links/fonts.css"/>
  <link rel="stylesheet" type="text/css" href="../links/main.css"/>

</head>
<body>
  <div id='wrapper'>
    <div id="header">
      <div id="header-left">
        <a href='http://parkimminent.com'>Park Imminent</a>
      </div>
      <div id="header-right">
        <a href='${this.parent.toUrl()}.html'>${this.parent}</a>
      </div>
    </div>
    <div id='core'>
      ${_core(this.id, this.parent)}
    </div>
    <div id='navi'>
      ${_navi(database)}
    </div>
  </div>
</body>
</html>`
  }
}

module.exports = Page
