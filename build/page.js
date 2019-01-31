String.prototype.toCapitalCase = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() }
String.prototype.toUrl = function () { return this.trim().replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase() }

function Page (id, table, database, parent) {
  const runic = require('./lib/runic')
  const curlic = require('./lib/curlic')
  const fs = require('fs')
  this.id = id.toLowerCase()
  this.parent = parent || 'index'
  this.filename = this.id.toUrl()

  this.path = function () {
    return this.id === 'index' ? `./index.html` : `./pages/${this.filename}.html`
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

  function _banner (id) {
    const path = id === 'index' ? 'media/banners/' : '../media/banners/'
    const filename = path + id.toUrl() + '.png'
    if (fs.existsSync(filename)) {
      return `\n<img id="banner" src="${path + id.toUrl()}.png">\n`
    }
    return ``
  }

  function _core (id, parent, content) {
    return `<div id="core">\n<h1>${id.toCapitalCase()}</h1>\n${_jump(table)}${Object.keys(table).reduce(_template, '')}\n</div>\n`.trim()
  }

  //  could change this so i'm passing a truncated database to create the sub-content pages, instead of choosing deep/shallow
  function _navi (database, deep) {
    const hidden = ['SETTINGS', 'UNTITLED']   
    const keys = Object.keys(database).filter(key => !hidden.includes(key))

    if (deep) {
      return `<div id="navi-deep">\n<h1>${id.toCapitalCase()}</h1>\n<ul>${keys.reduce((acc, key) => {
        const keys = Object.keys(database[key]).filter(key => !hidden.includes(key))
        return `${acc}<li><a href='./pages/${key.toUrl()}.html'>${key}</a></li>\n<ul>${keys.reduce((acc, key) => { return `${acc}<li><a href='./pages/${key.toUrl()}.html'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n`
        }, '')
      }</ul></div>`.trim()
    } else {
      return `<div id="navi-shallow">\n<h1>${id.toCapitalCase()}</h1>\n<ul>${keys.reduce((acc, key) => {
          const keys = Object.keys(database[key]).filter(key => !hidden.includes(key))
          return `${acc}<li><a href='${key.toUrl()}.html'>${key.toCapitalCase()}</a></li>\n`
        }, '')
      }</ul></div>`.trim()
    }
  }

  function _footer () {
    return `<div id="footer"></div>`
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
  <link rel="stylesheet" type="text/css" href="${this.id === 'index' ? 'links/reset.css' : '../links/reset.css'}"/>
  <link rel="stylesheet" type="text/css" href="${this.id === 'index' ? 'links/fonts.css' : '../links/fonts.css'}"/>
  <link rel="stylesheet" type="text/css" href="${this.id === 'index' ? 'links/main.css'  : '../links/main.css'}"/>

</head>
<body>
  <div id='wrapper'>
    <div id="header">
      <div id="header-left">
        <a href='http://parkimminent.com'>Park Imminent</a>
      </div>
      <div id="header-right">
        ${this.id === 'index' ? `` : this.parent === 'index' ? `<a href="../index.html">index</a>` : `<a href='${this.parent.toUrl()}.html'>${this.parent}</a>` }
      </div>
    </div>${_banner(this.id)}${parent ? _core(this.id, this.parent) : _navi(table, this.id == 'index')}
  </div>
  ${_footer()}
</body>
</html>`
  }
}

module.exports = Page
