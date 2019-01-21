'use strict'

function Manager (tables) {
  const Page = require('./page')
  const Feed = require('./feed')
  const Index = require('./index')

  this.pages = {}
  this.feeds = {}

  this.pages['index'] = new Page('index', tables, tables, null)

  for (const parent in tables) {
    const table = tables[parent]
    this.pages[parent] = new Page(parent, table, tables)
    for (const id in table) {
      const sub = table[id]
      if (this.pages[id]) { console.warn(`Re-declaring page #${id}!`); return }
      this.pages[id] = new Page(id, sub, tables, parent) 
    }
  }

  this.feeds.rss = new Feed('rss', tables.journal)
}

module.exports = Manager
