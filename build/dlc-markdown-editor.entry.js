import { e as registerInstance, f as h, g as getElement } from './dlc-markdown-editor-0cf5bcf8.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var marked = createCommonjsModule(function (module, exports) {
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d{1,9}\.)/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ {0,3}(`{3,}|~{3,})([^`\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar
 */

block.pedantic = merge({}, block.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = Object.create(null);
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.pedantic) {
    this.rules = block.pedantic;
  } else if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      listStart,
      listItems,
      t,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? rtrim(cap, '\n')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2] ? cap[2].trim() : cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (cap = this.rules.nptable.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(item.cells[i], item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      listStart = {
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : '',
        loose: false
      };

      this.tokens.push(listStart);

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      listItems = [];
      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) */, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull.length > 1 ? b.length === 1
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        if (loose) {
          listStart.loose = true;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        t = {
          type: 'list_item_start',
          task: istask,
          checked: ischecked,
          loose: loose
        };

        listItems.push(t);
        this.tokens.push(t);

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      if (listStart.loose) {
        l = listItems.length;
        i = 0;
        for (; i < l; i++) {
          listItems[i].loose = true;
        }
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (cap = this.rules.table.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noop,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
};

// list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)
inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|`(?!`)|[^\[\]\\`])*?/;
inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*)/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});

inline.gfm.url = edit(inline.gfm.url, 'i')
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace(/\{2,\}/g, '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.pedantic) {
    this.rules = inline.pedantic;
  } else if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(cap[1]);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
      }

      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      var lastParenIndex = findClosingBracket(cap[2], '()');
      if (lastParenIndex > -1) {
        var linkLen = cap[0].length - (cap[2].length - lastParenIndex) - (cap[3] || '').length;
        cap[2] = cap[2].substring(0, lastParenIndex);
        cap[0] = cap[0].substring(0, linkLen).trim();
        cap[3] = '';
      }
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: InlineLexer.escapes(href),
        title: InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      src = src.substring(cap[0].length);
      out += this.renderer.link(href, null, text);
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      if (this.inRawBlock) {
        out += this.renderer.text(cap[0]);
      } else {
        out += this.renderer.text(escape(this.smartypants(cap[0])));
      }
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

InlineLexer.escapes = function(text) {
  return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = link.href,
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || marked.defaults;
}

Renderer.prototype.code = function(code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0];
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw, slugger) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + slugger.slug(raw)
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.checkbox = function(checked) {
  return '<input '
    + (checked ? 'checked="" ' : '')
    + 'disabled="" type="checkbox"'
    + (this.options.xhtml ? ' /' : '')
    + '> ';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + body
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' align="' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }

  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
};

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
};

TextRenderer.prototype.br = function() {
  return '';
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
  this.slugger = new Slugger();
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)),
        this.slugger);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';
      var loose = this.token.loose;
      var checked = this.token.checked;
      var task = this.token.task;

      if (this.token.task) {
        body += this.renderer.checkbox(checked);
      }

      while (this.next().type !== 'list_item_end') {
        body += !loose && this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }
      return this.renderer.listitem(body, task, checked);
    }
    case 'html': {
      // TODO parse inline content if parameter markdown=1
      return this.renderer.html(this.token.text);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
    default: {
      var errMsg = 'Token with "' + this.token.type + '" type was not found.';
      if (this.options.silent) {
        console.log(errMsg);
      } else {
        throw new Error(errMsg);
      }
    }
  }
};

/**
 * Slugger generates header id
 */

function Slugger () {
  this.seen = {};
}

/**
 * Convert string to unique id
 */

Slugger.prototype.slug = function (value) {
  var slug = value
    .toLowerCase()
    .trim()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');

  if (this.seen.hasOwnProperty(slug)) {
    var originalSlug = slug;
    do {
      this.seen[originalSlug]++;
      slug = originalSlug + '-' + this.seen[originalSlug];
    } while (this.seen.hasOwnProperty(slug));
  }
  this.seen[slug] = 0;

  return slug;
};

/**
 * Helpers
 */

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function (ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function (ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function (match, offset, str) {
        var escaped = false,
            curr = offset;
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
      cells = row.split(/ \|/),
      i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
  if (str.length === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  var suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < str.length) {
    var currChar = str.charAt(str.length - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, str.length - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  var level = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.getDefaults = function () {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: new Renderer(),
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false
  };
};

marked.defaults = marked.getDefaults();

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.Slugger = Slugger;

marked.parse = marked;

if ('object' !== 'undefined' && 'object' === 'object') {
  module.exports = marked;
} else if (typeof undefined === 'function' && undefined.amd) {
  undefined(function() { return marked; });
} else {
  root.marked = marked;
}
})(commonjsGlobal || (typeof window !== 'undefined' ? window : commonjsGlobal));
});

class SimpleStyler {
    style(_selectedText) {
        throw new Error("Method not implemented.");
    }
    hasStyle(_selectedText) {
        return this._styleRegExp.test(_selectedText);
    }
    hasUnselectedStyle(_selectedText) {
        throw new Error("Method not implemented.");
    }
    hasHalfStyle(_selectedText) {
        throw new Error("Method not implemented.");
    }
    removeStyle(_selectedText) {
        throw new Error("Method not implemented.");
    }
    setElement(element) {
        this.editorElement = element;
    }
    getElement() {
        return this.editorElement;
    }
}

class LinkStyler extends SimpleStyler {
    constructor() {
        super(...arguments);
        this._styleRegExp = /\[([^\[]+)\]\(([^\)]*)\)/;
    }
    style(_selectedText) {
        return new Promise((resolve, _) => {
            let textHasStyle = this.hasStyle(_selectedText);
            let insertText = textHasStyle ? this.removeStyle(_selectedText) : `[${_selectedText}]()`;
            resolve(insertText);
        });
    }
    removeStyle(_selectedText) {
        return _selectedText.match(/\[([^\[]+)\]/)[1];
    }
}

class SelectionTextUtils {
    /**
     * Gets the current selected text
     */
    static getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        }
        else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }
    /**
     * Expands the selection to "numCharsBefore" and "numCharsAfter" the selected text
     * @param element The element
     * @param numCharsBefore The number of characters to select before the selected text on the element
     * @param numCharsAfter The number of characters to select after the selected text on the element
     */
    static selectMoreText(element, numCharsBefore, numCharsAfter) {
        element.focus();
        let ss = element.selectionStart;
        let se = element.selectionEnd;
        element.setSelectionRange(ss - numCharsBefore, se + numCharsAfter);
    }
    /**
     * Gets the "numChars" characters before the selected text
     * @param element The element
     * @param numChars The number of characters
     */
    static getCharsBeforeSelection(element, numChars) {
        let ss = element.selectionStart;
        return element.value.substring(ss - numChars, ss);
    }
    /**
     * Gets the "numChars" characters after the selected text
     * @param element The element
     * @param numChars The number of characters
     */
    static getCharsAfterSelection(element, numChars) {
        let se = element.selectionEnd;
        return element.value.substring(se, se + numChars);
    }
}

class GenericSurroundingSymbolsStyler {
    style(_selectedText) {
        return new Promise((resolve, _) => {
            let textHasStyle = this.hasStyle(_selectedText);
            if (!textHasStyle) {
                let textHasUnselectedStyle = this.hasUnselectedStyle(_selectedText);
                if (textHasUnselectedStyle) {
                    textHasStyle = textHasUnselectedStyle;
                    SelectionTextUtils.selectMoreText(this.editorElement, this._symbol.length, this._symbol.length);
                    _selectedText = SelectionTextUtils.getSelectionText();
                }
            }
            let insertText = textHasStyle ? this.removeStyle(_selectedText) : `${this._symbol}${_selectedText}${this._symbol}`;
            resolve(insertText);
        });
    }
    hasStyle(_selectedText) {
        return this._styleRegExp.test(_selectedText);
    }
    hasUnselectedStyle(_selectedText) {
        return this.hasHalfStyle(SelectionTextUtils.getCharsBeforeSelection(this.editorElement, this._symbol.length)) &&
            this.hasHalfStyle(SelectionTextUtils.getCharsAfterSelection(this.editorElement, this._symbol.length));
    }
    hasHalfStyle(_selectedText) {
        return this._halfStyleRegexp.test(_selectedText);
    }
    removeStyle(_selectedText) {
        return _selectedText.substring(this._symbol.length, _selectedText.length - this._symbol.length);
    }
    setElement(element) {
        this.editorElement = element;
    }
    getElement() {
        return this.editorElement;
    }
}

class StrikethroughStyler extends GenericSurroundingSymbolsStyler {
    constructor() {
        super(...arguments);
        this._symbol = '~~';
        this._styleRegExp = /^\~\~(.*?)\~\~$/;
        this._halfStyleRegexp = /\~\~(.*?)/;
    }
}

class BoldStyler extends GenericSurroundingSymbolsStyler {
    constructor() {
        super(...arguments);
        this._symbol = '**';
        this._styleRegExp = /^(\*\*|__)(.*?)(\*\*|__)$/;
        this._halfStyleRegexp = /(\*\*|__)(.*?)/;
    }
}

class ItalicsStyler extends GenericSurroundingSymbolsStyler {
    constructor() {
        super(...arguments);
        this._symbol = '*';
        this._styleRegExp = /^(\*|_)(.*?)(\*|_)$/;
        this._halfStyleRegexp = /(\*|_)(.*?)/;
    }
    style(_selectedText) {
        let boldStyler = new BoldStyler();
        return new Promise((resolve, _) => {
            let insertText, textHasStyle = false;
            //As italics and bold use both same symbol (*), we must check first if the selected text is bold
            if (boldStyler.hasStyle(_selectedText)) {
                let textTmp = boldStyler.removeStyle(_selectedText);
                textHasStyle = this.hasStyle(textTmp);
                //If it's bold, we check if it's also italics, and if true we remove the italics style
                if (textHasStyle) {
                    insertText = this.removeStyle(_selectedText);
                }
                else {
                    //If it's no italics, we check if it's italics taking into account the surronding not selected text
                    let textHasUnselectedStyle = this.hasUnselectedStyle(_selectedText);
                    if (textHasUnselectedStyle) {
                        textHasStyle = textHasUnselectedStyle;
                        SelectionTextUtils.selectMoreText(this.editorElement, this._symbol.length, this._symbol.length);
                        _selectedText = SelectionTextUtils.getSelectionText();
                    }
                    insertText = `${this._symbol}${_selectedText}${this._symbol}`;
                }
            }
            else {
                //Text has not bold style, we check if text has italics style
                textHasStyle = this.hasStyle(_selectedText);
                if (!textHasStyle) {
                    let textHasUnselectedStyle = this.hasUnselectedStyle(_selectedText);
                    if (textHasUnselectedStyle) {
                        textHasStyle = textHasUnselectedStyle;
                        SelectionTextUtils.selectMoreText(this.editorElement, this._symbol.length, this._symbol.length);
                        _selectedText = SelectionTextUtils.getSelectionText();
                    }
                }
                insertText = textHasStyle ? this.removeStyle(_selectedText) : `${this._symbol}${_selectedText}${this._symbol}`;
            }
            resolve(insertText);
        });
    }
}

class EditorShortcutUtilsInterface {
    exposeShortcuts() {
        window.addEventListener('keydown', (e) => {
            for (let shortcut of this.shortcuts) {
                if ((shortcut.usesMetaKey && e.metaKey || !shortcut.usesMetaKey) && e.keyCode === shortcut.keyCode) {
                    shortcut.stylerFactory.style(shortcut.styler);
                }
            }
        });
    }
}

class EditorShortcutUtils extends EditorShortcutUtilsInterface {
    constructor(defaultStylerFactory) {
        super();
        this.defaultStylerFactory = defaultStylerFactory;
        this.shortcuts = [
            {
                keyCode: 66,
                usesMetaKey: true,
                styler: new BoldStyler(),
                stylerFactory: this.defaultStylerFactory
            },
            {
                keyCode: 73,
                usesMetaKey: true,
                styler: new ItalicsStyler(),
                stylerFactory: this.defaultStylerFactory
            },
            {
                keyCode: 186,
                usesMetaKey: true,
                styler: new StrikethroughStyler(),
                stylerFactory: this.defaultStylerFactory
            },
            {
                keyCode: 75,
                usesMetaKey: true,
                styler: new LinkStyler(),
                stylerFactory: this.defaultStylerFactory
            }
        ];
    }
}

class DefaultStylerFactory {
    constructor(element) {
        this.element = element;
    }
    style(styler) {
        styler.setElement(this.element);
        let selectedText = SelectionTextUtils.getSelectionText();
        styler.style(selectedText).then((insertText) => {
            document.execCommand("insertText", false, insertText);
        });
    }
}

class Heading1Styler extends SimpleStyler {
    constructor() {
        super(...arguments);
        this._styleRegExp = /^(#{1})(\ )(.*)/;
    }
    style(_selectedText) {
        return new Promise((resolve, _) => {
            let textHasStyle = this.hasStyle(_selectedText);
            let insertText = textHasStyle ? this.removeStyle(_selectedText) : `# ${_selectedText}`;
            resolve(insertText);
        });
    }
    removeStyle(_selectedText) {
        return _selectedText.substring(2, _selectedText.length);
    }
}

class DlcMarkdownEditor {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Whether enable or not the keyboard shortcuts
         */
        this.enableShortcuts = true;
        this.stylers = {
            bold: new BoldStyler(),
            italics: new ItalicsStyler(),
            link: new LinkStyler(),
            h1: new Heading1Styler()
        };
    }
    setPreviewerStyle(newValue, _) {
        if (newValue === 'github') {
            this.setPreviewerClasses('markdown-body');
        }
        else {
            this.removePreviewerClasses('markdown-body');
        }
    }
    componentDidLoad() {
        this.setEditorElement();
        this.convertTextToMarkdownListener();
        this.setEditorElContent();
        this.setPreviewerStyle(this.previewerStyle);
        //Last action
        this.prepareEditor();
    }
    componentDidUpdate() {
        this.setEditorElement();
        this.convertTextToMarkdownListener();
        this.setEditorElContent();
        this.modifyElInStylerFactory();
    }
    /**
     * Bold the selected text
     */
    async bold() {
        this.stylerFactoryInterface.style(this.stylers.bold);
    }
    /**
     * Format the selected text into italics
     */
    async italics() {
        this.stylerFactoryInterface.style(this.stylers.italics);
    }
    /**
     * Create a link onto the selected text
     */
    async link() {
        this.stylerFactoryInterface.style(this.stylers.link);
    }
    /**
     * Convert the selected text into an h1
     */
    async h1() {
        this.stylerFactoryInterface.style(this.stylers.h1);
    }
    async setPreviewerClasses(...classes) {
        //let previewer = this.el.shadowRoot.querySelector('.previewer');
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper__area');
        if (previewer) {
            previewer.classList.add(...classes);
        }
    }
    async removePreviewerClasses(...classes) {
        //let previewer = this.el.shadowRoot.querySelector('.previewer');
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper__area');
        if (previewer) {
            previewer.classList.remove(...classes);
        }
    }
    showPreviewer() {
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper');
        previewer.style.display = 'initial';
    }
    closePreviewer() {
        console.log('closePreviewer');
        let previewer = this.el.shadowRoot.querySelector('.previewer-wrapper');
        console.log(previewer);
        previewer.style.display = 'none';
    }
    watchCustomEditorElement(newValue, oldValue) {
        //When the customEditorElement is modified (user passes a new one),
        //we must reset the attributes that were set
        if (oldValue !== newValue) {
            this.editorEl = null;
            this.outerHtml = null;
        }
    }
    watchContent(newValue, oldValue) {
        //If user passes a new content, synchronize the editor element value with that content
        if (oldValue !== newValue) {
            this.editorEl.value = newValue;
        }
    }
    prepareEditor() {
        // Prepare the editor: enable shortcuts, create the styler factory with the element
        this.stylerFactoryInterface = new DefaultStylerFactory(this.editorEl);
        if (this.enableShortcuts) {
            let editorShortcutUtils = new EditorShortcutUtils(this.stylerFactoryInterface);
            editorShortcutUtils.exposeShortcuts();
        }
    }
    setEditorElement() {
        //The editor element must be set looking for in the Shadow DOM. It could be a textarea or an input element,
        //and it could be nested in any children of the shadow root
        if (!this.editorEl) {
            //this.editorEl = this.el.shadowRoot.querySelector('.editor');
            this.editorEl = this.el.shadowRoot.querySelector('textarea, input');
        }
    }
    convertTextToMarkdownListener() {
        //We must handle the user inputs in the editor and update the markdown
        if (this.editorEl) {
            this.editorEl.oninput = _ => {
                this.content = this.editorEl.value;
                this.updateMarkdownPreview();
            };
        }
    }
    updateMarkdownPreview() {
        //Convert the editor value (content) into markdown
        this.markdownText = marked(this.content);
    }
    getEditorElementHtml() {
        return this.customEditorElement ? this._getEditorElementCustom() : this._getEditorElementDefault();
    }
    /*    private _getEditorElementCustom() {
            if (this.editorEl) {
                return this.editorEl.outerHTML;
            }
            let el = document.createElement(this.customEditorElement) as HTMLInputElement;
            if (el) {
                el.className = 'editor';
                el.contentEditable = 'true';
                return el.outerHTML;
            }
            return null;
        }*/
    _getEditorElementCustom() {
        //Custom editor element. Retrieve the element passed in by the user and assign the required properties
        //Then, return the outerHTML in order to print it in the render function
        if (this.outerHtml) {
            return this.outerHtml;
        }
        let el = this.customEditorElement;
        if (el) {
            el.className = `editor${el.className ? " " + el.className : ""}`;
            el.contentEditable = 'true';
            el.setAttribute('part', 'editor');
            this.outerHtml = el.outerHTML;
            return el.outerHTML;
        }
        return null;
    }
    _getEditorElementDefault() {
        //If user didn't pass in a custom element, we create by default a textarea for the editor
        if (this.outerHtml) {
            //return this.editorEl.outerHTML;
            return this.outerHtml;
        }
        let el = document.createElement('textarea');
        if (el) {
            el.className = 'editor';
            el.contentEditable = 'true';
            el.setAttribute('part', 'editor');
            this.outerHtml = el.outerHTML;
            return el.outerHTML;
        }
        return null;
    }
    setEditorElContent() {
        if (this.editorEl && this.content && !this.editorEl.value) {
            this.editorEl.value = this.content;
        }
    }
    modifyElInStylerFactory() {
        if (this.editorEl && this.stylerFactoryInterface.element !== this.editorEl) {
            this.stylerFactoryInterface.element = this.editorEl;
        }
    }
    render() {
        this.updateMarkdownPreview();
        return (h("div", { class: "wrapper", part: "container" }, h("div", { class: "editor-wrapper" }, h("div", { class: "buttons" }, h("button", { class: "button button__bold", onClick: _ => this.bold() }, h("strong", null, "B")), h("button", { class: "button button__italics", onClick: _ => this.italics() }, h("i", null, "I")), h("button", { class: "button button__link", onClick: _ => this.link() }, h("ion-icon", { name: "link" })), h("button", { class: "button button__h1", onClick: _ => this.h1() }, "H", h("sub", null, "1")), h("button", { class: "button button__h2", onClick: _ => this.h1() }, "H", h("sub", null, "2")), h("button", { class: "button button__h3", onClick: _ => this.h1() }, "H", h("sub", null, "3")), h("button", { class: "button button__show-previewer", onClick: _ => this.showPreviewer() }, h("ion-icon", { name: "search" }))), h("div", { class: "editor-wrapper__area", innerHTML: this.getEditorElementHtml() })), h("div", { class: "previewer-wrapper" }, h("div", { class: "buttons" }, h("button", { class: "button button-copy-html" }, h("ion-icon", { name: "copy" })), h("button", { class: "button button__close-previewer", onClick: _ => this.closePreviewer() }, h("ion-icon", { name: "close" }))), h("div", { class: "previewer-wrapper__area", part: "previewer", innerHTML: this.markdownText }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "previewerStyle": ["setPreviewerStyle"],
        "customEditorElement": ["watchCustomEditorElement"],
        "content": ["watchContent"]
    }; }
    static get style() { return "\@import url(\"https://fonts.googleapis.com/css?family=Roboto&display=swap\");\n\@font-face {\n  font-family: octicons-link;\n  src: url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAZwABAAAAAACFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEU0lHAAAGaAAAAAgAAAAIAAAAAUdTVUIAAAZcAAAACgAAAAoAAQAAT1MvMgAAAyQAAABJAAAAYFYEU3RjbWFwAAADcAAAAEUAAACAAJThvmN2dCAAAATkAAAABAAAAAQAAAAAZnBnbQAAA7gAAACyAAABCUM+8IhnYXNwAAAGTAAAABAAAAAQABoAI2dseWYAAAFsAAABPAAAAZwcEq9taGVhZAAAAsgAAAA0AAAANgh4a91oaGVhAAADCAAAABoAAAAkCA8DRGhtdHgAAAL8AAAADAAAAAwGAACfbG9jYQAAAsAAAAAIAAAACABiATBtYXhwAAACqAAAABgAAAAgAA8ASm5hbWUAAAToAAABQgAAAlXu73sOcG9zdAAABiwAAAAeAAAAME3QpOBwcmVwAAAEbAAAAHYAAAB/aFGpk3jaTY6xa8JAGMW/O62BDi0tJLYQincXEypYIiGJjSgHniQ6umTsUEyLm5BV6NDBP8Tpts6F0v+k/0an2i+itHDw3v2+9+DBKTzsJNnWJNTgHEy4BgG3EMI9DCEDOGEXzDADU5hBKMIgNPZqoD3SilVaXZCER3/I7AtxEJLtzzuZfI+VVkprxTlXShWKb3TBecG11rwoNlmmn1P2WYcJczl32etSpKnziC7lQyWe1smVPy/Lt7Kc+0vWY/gAgIIEqAN9we0pwKXreiMasxvabDQMM4riO+qxM2ogwDGOZTXxwxDiycQIcoYFBLj5K3EIaSctAq2kTYiw+ymhce7vwM9jSqO8JyVd5RH9gyTt2+J/yUmYlIR0s04n6+7Vm1ozezUeLEaUjhaDSuXHwVRgvLJn1tQ7xiuVv/ocTRF42mNgZGBgYGbwZOBiAAFGJBIMAAizAFoAAABiAGIAznjaY2BkYGAA4in8zwXi+W2+MjCzMIDApSwvXzC97Z4Ig8N/BxYGZgcgl52BCSQKAA3jCV8CAABfAAAAAAQAAEB42mNgZGBg4f3vACQZQABIMjKgAmYAKEgBXgAAeNpjYGY6wTiBgZWBg2kmUxoDA4MPhGZMYzBi1AHygVLYQUCaawqDA4PChxhmh/8ODDEsvAwHgMKMIDnGL0x7gJQCAwMAJd4MFwAAAHjaY2BgYGaA4DAGRgYQkAHyGMF8NgYrIM3JIAGVYYDT+AEjAwuDFpBmA9KMDEwMCh9i/v8H8sH0/4dQc1iAmAkALaUKLgAAAHjaTY9LDsIgEIbtgqHUPpDi3gPoBVyRTmTddOmqTXThEXqrob2gQ1FjwpDvfwCBdmdXC5AVKFu3e5MfNFJ29KTQT48Ob9/lqYwOGZxeUelN2U2R6+cArgtCJpauW7UQBqnFkUsjAY/kOU1cP+DAgvxwn1chZDwUbd6CFimGXwzwF6tPbFIcjEl+vvmM/byA48e6tWrKArm4ZJlCbdsrxksL1AwWn/yBSJKpYbq8AXaaTb8AAHja28jAwOC00ZrBeQNDQOWO//sdBBgYGRiYWYAEELEwMTE4uzo5Zzo5b2BxdnFOcALxNjA6b2ByTswC8jYwg0VlNuoCTWAMqNzMzsoK1rEhNqByEyerg5PMJlYuVueETKcd/89uBpnpvIEVomeHLoMsAAe1Id4AAAAAAAB42oWQT07CQBTGv0JBhagk7HQzKxca2sJCE1hDt4QF+9JOS0nbaaYDCQfwCJ7Au3AHj+LO13FMmm6cl7785vven0kBjHCBhfpYuNa5Ph1c0e2Xu3jEvWG7UdPDLZ4N92nOm+EBXuAbHmIMSRMs+4aUEd4Nd3CHD8NdvOLTsA2GL8M9PODbcL+hD7C1xoaHeLJSEao0FEW14ckxC+TU8TxvsY6X0eLPmRhry2WVioLpkrbp84LLQPGI7c6sOiUzpWIWS5GzlSgUzzLBSikOPFTOXqly7rqx0Z1Q5BAIoZBSFihQYQOOBEdkCOgXTOHA07HAGjGWiIjaPZNW13/+lm6S9FT7rLHFJ6fQbkATOG1j2OFMucKJJsxIVfQORl+9Jyda6Sl1dUYhSCm1dyClfoeDve4qMYdLEbfqHf3O/AdDumsjAAB42mNgYoAAZQYjBmyAGYQZmdhL8zLdDEydARfoAqIAAAABAAMABwAKABMAB///AA8AAQAAAAAAAAAAAAAAAAABAAAAAA==) format(\'woff\');\n}\n\n.markdown-body .octicon {\n  display: inline-block;\n  fill: currentColor;\n  vertical-align: text-bottom;\n}\n\n.markdown-body .anchor {\n  float: left;\n  line-height: 1;\n  margin-left: -20px;\n  padding-right: 4px;\n}\n\n.markdown-body .anchor:focus {\n  outline: none;\n}\n\n.markdown-body h1 .octicon-link,\n.markdown-body h2 .octicon-link,\n.markdown-body h3 .octicon-link,\n.markdown-body h4 .octicon-link,\n.markdown-body h5 .octicon-link,\n.markdown-body h6 .octicon-link {\n  color: #1b1f23;\n  vertical-align: middle;\n  visibility: hidden;\n}\n\n.markdown-body h1:hover .anchor,\n.markdown-body h2:hover .anchor,\n.markdown-body h3:hover .anchor,\n.markdown-body h4:hover .anchor,\n.markdown-body h5:hover .anchor,\n.markdown-body h6:hover .anchor {\n  text-decoration: none;\n}\n\n.markdown-body h1:hover .anchor .octicon-link,\n.markdown-body h2:hover .anchor .octicon-link,\n.markdown-body h3:hover .anchor .octicon-link,\n.markdown-body h4:hover .anchor .octicon-link,\n.markdown-body h5:hover .anchor .octicon-link,\n.markdown-body h6:hover .anchor .octicon-link {\n  visibility: visible;\n}\n\n.markdown-body {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  color: #24292e;\n  line-height: 1.5;\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\n  font-size: 16px;\n  line-height: 1.5;\n  word-wrap: break-word;\n}\n\n.markdown-body .pl-c {\n  color: #6a737d;\n}\n\n.markdown-body .pl-c1,\n.markdown-body .pl-s .pl-v {\n  color: #005cc5;\n}\n\n.markdown-body .pl-e,\n.markdown-body .pl-en {\n  color: #6f42c1;\n}\n\n.markdown-body .pl-s .pl-s1,\n.markdown-body .pl-smi {\n  color: #24292e;\n}\n\n.markdown-body .pl-ent {\n  color: #22863a;\n}\n\n.markdown-body .pl-k {\n  color: #d73a49;\n}\n\n.markdown-body .pl-pds,\n.markdown-body .pl-s,\n.markdown-body .pl-s .pl-pse .pl-s1,\n.markdown-body .pl-sr,\n.markdown-body .pl-sr .pl-cce,\n.markdown-body .pl-sr .pl-sra,\n.markdown-body .pl-sr .pl-sre {\n  color: #032f62;\n}\n\n.markdown-body .pl-smw,\n.markdown-body .pl-v {\n  color: #e36209;\n}\n\n.markdown-body .pl-bu {\n  color: #b31d28;\n}\n\n.markdown-body .pl-ii {\n  background-color: #b31d28;\n  color: #fafbfc;\n}\n\n.markdown-body .pl-c2 {\n  background-color: #d73a49;\n  color: #fafbfc;\n}\n\n.markdown-body .pl-c2:before {\n  content: \"^M\";\n}\n\n.markdown-body .pl-sr .pl-cce {\n  color: #22863a;\n  font-weight: 700;\n}\n\n.markdown-body .pl-ml {\n  color: #735c0f;\n}\n\n.markdown-body .pl-mh,\n.markdown-body .pl-mh .pl-en,\n.markdown-body .pl-ms {\n  color: #005cc5;\n  font-weight: 700;\n}\n\n.markdown-body .pl-mi {\n  color: #24292e;\n  font-style: italic;\n}\n\n.markdown-body .pl-mb {\n  color: #24292e;\n  font-weight: 700;\n}\n\n.markdown-body .pl-md {\n  background-color: #ffeef0;\n  color: #b31d28;\n}\n\n.markdown-body .pl-mi1 {\n  background-color: #f0fff4;\n  color: #22863a;\n}\n\n.markdown-body .pl-mc {\n  background-color: #ffebda;\n  color: #e36209;\n}\n\n.markdown-body .pl-mi2 {\n  background-color: #005cc5;\n  color: #f6f8fa;\n}\n\n.markdown-body .pl-mdr {\n  color: #6f42c1;\n  font-weight: 700;\n}\n\n.markdown-body .pl-ba {\n  color: #586069;\n}\n\n.markdown-body .pl-sg {\n  color: #959da5;\n}\n\n.markdown-body .pl-corl {\n  color: #032f62;\n  text-decoration: underline;\n}\n\n.markdown-body details {\n  display: block;\n}\n\n.markdown-body summary {\n  display: list-item;\n}\n\n.markdown-body a {\n  background-color: transparent;\n}\n\n.markdown-body a:active,\n.markdown-body a:hover {\n  outline-width: 0;\n}\n\n.markdown-body strong {\n  font-weight: inherit;\n  font-weight: bolder;\n}\n\n.markdown-body h1 {\n  font-size: 2em;\n  margin: .67em 0;\n}\n\n.markdown-body img {\n  border-style: none;\n}\n\n.markdown-body code,\n.markdown-body kbd,\n.markdown-body pre {\n  font-family: monospace,monospace;\n  font-size: 1em;\n}\n\n.markdown-body hr {\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n\n.markdown-body input {\n  font: inherit;\n  margin: 0;\n}\n\n.markdown-body input {\n  overflow: visible;\n}\n\n.markdown-body [type=checkbox] {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0;\n}\n\n.markdown-body * {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.markdown-body input {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.markdown-body a {\n  color: #0366d6;\n  text-decoration: none;\n}\n\n.markdown-body a:hover {\n  text-decoration: underline;\n}\n\n.markdown-body strong {\n  font-weight: 600;\n}\n\n.markdown-body hr {\n  background: transparent;\n  border: 0;\n  border-bottom: 1px solid #dfe2e5;\n  height: 0;\n  margin: 15px 0;\n  overflow: hidden;\n}\n\n.markdown-body hr:before {\n  content: \"\";\n  display: table;\n}\n\n.markdown-body hr:after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n\n.markdown-body table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.markdown-body td,\n.markdown-body th {\n  padding: 0;\n}\n\n.markdown-body details summary {\n  cursor: pointer;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  margin-bottom: 0;\n  margin-top: 0;\n}\n\n.markdown-body h1 {\n  font-size: 32px;\n}\n\n.markdown-body h1,\n.markdown-body h2 {\n  font-weight: 600;\n}\n\n.markdown-body h2 {\n  font-size: 24px;\n}\n\n.markdown-body h3 {\n  font-size: 20px;\n}\n\n.markdown-body h3,\n.markdown-body h4 {\n  font-weight: 600;\n}\n\n.markdown-body h4 {\n  font-size: 16px;\n}\n\n.markdown-body h5 {\n  font-size: 14px;\n}\n\n.markdown-body h5,\n.markdown-body h6 {\n  font-weight: 600;\n}\n\n.markdown-body h6 {\n  font-size: 12px;\n}\n\n.markdown-body p {\n  margin-bottom: 10px;\n  margin-top: 0;\n}\n\n.markdown-body blockquote {\n  margin: 0;\n}\n\n.markdown-body ol,\n.markdown-body ul {\n  margin-bottom: 0;\n  margin-top: 0;\n  padding-left: 0;\n}\n\n.markdown-body ol ol,\n.markdown-body ul ol {\n  list-style-type: lower-roman;\n}\n\n.markdown-body ol ol ol,\n.markdown-body ol ul ol,\n.markdown-body ul ol ol,\n.markdown-body ul ul ol {\n  list-style-type: lower-alpha;\n}\n\n.markdown-body dd {\n  margin-left: 0;\n}\n\n.markdown-body code,\n.markdown-body pre {\n  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;\n  font-size: 12px;\n}\n\n.markdown-body pre {\n  margin-bottom: 0;\n  margin-top: 0;\n}\n\n.markdown-body input::-webkit-inner-spin-button,\n.markdown-body input::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  appearance: none;\n  margin: 0;\n}\n\n.markdown-body .border {\n  border: 1px solid #e1e4e8!important;\n}\n\n.markdown-body .border-0 {\n  border: 0!important;\n}\n\n.markdown-body .border-bottom {\n  border-bottom: 1px solid #e1e4e8!important;\n}\n\n.markdown-body .rounded-1 {\n  border-radius: 3px!important;\n}\n\n.markdown-body .bg-white {\n  background-color: #fff!important;\n}\n\n.markdown-body .bg-gray-light {\n  background-color: #fafbfc!important;\n}\n\n.markdown-body .text-gray-light {\n  color: #6a737d!important;\n}\n\n.markdown-body .mb-0 {\n  margin-bottom: 0!important;\n}\n\n.markdown-body .my-2 {\n  margin-bottom: 8px!important;\n  margin-top: 8px!important;\n}\n\n.markdown-body .pl-0 {\n  padding-left: 0!important;\n}\n\n.markdown-body .py-0 {\n  padding-bottom: 0!important;\n  padding-top: 0!important;\n}\n\n.markdown-body .pl-1 {\n  padding-left: 4px!important;\n}\n\n.markdown-body .pl-2 {\n  padding-left: 8px!important;\n}\n\n.markdown-body .py-2 {\n  padding-bottom: 8px!important;\n  padding-top: 8px!important;\n}\n\n.markdown-body .pl-3,\n.markdown-body .px-3 {\n  padding-left: 16px!important;\n}\n\n.markdown-body .px-3 {\n  padding-right: 16px!important;\n}\n\n.markdown-body .pl-4 {\n  padding-left: 24px!important;\n}\n\n.markdown-body .pl-5 {\n  padding-left: 32px!important;\n}\n\n.markdown-body .pl-6 {\n  padding-left: 40px!important;\n}\n\n.markdown-body .f6 {\n  font-size: 12px!important;\n}\n\n.markdown-body .lh-condensed {\n  line-height: 1.25!important;\n}\n\n.markdown-body .text-bold {\n  font-weight: 600!important;\n}\n\n.markdown-body:before {\n  content: \"\";\n  display: table;\n}\n\n.markdown-body:after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n\n.markdown-body>:first-child {\n  margin-top: 0!important;\n}\n\n.markdown-body>:last-child {\n  margin-bottom: 0!important;\n}\n\n.markdown-body a:not([href]) {\n  color: inherit;\n  text-decoration: none;\n}\n\n.markdown-body blockquote,\n.markdown-body dl,\n.markdown-body ol,\n.markdown-body p,\n.markdown-body pre,\n.markdown-body table,\n.markdown-body ul {\n  margin-bottom: 16px;\n  margin-top: 0;\n}\n\n.markdown-body hr {\n  background-color: #e1e4e8;\n  border: 0;\n  height: .25em;\n  margin: 24px 0;\n  padding: 0;\n}\n\n.markdown-body blockquote {\n  border-left: .25em solid #dfe2e5;\n  color: #6a737d;\n  padding: 0 1em;\n}\n\n.markdown-body blockquote>:first-child {\n  margin-top: 0;\n}\n\n.markdown-body blockquote>:last-child {\n  margin-bottom: 0;\n}\n\n.markdown-body kbd {\n  background-color: #fafbfc;\n  border: 1px solid #c6cbd1;\n  border-bottom-color: #959da5;\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 -1px 0 #959da5;\n  box-shadow: inset 0 -1px 0 #959da5;\n  color: #444d56;\n  display: inline-block;\n  font-size: 11px;\n  line-height: 10px;\n  padding: 3px 5px;\n  vertical-align: middle;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  font-weight: 600;\n  line-height: 1.25;\n  margin-bottom: 16px;\n  margin-top: 24px;\n}\n\n.markdown-body h1 {\n  font-size: 2em;\n}\n\n.markdown-body h1,\n.markdown-body h2 {\n  border-bottom: 1px solid #eaecef;\n  padding-bottom: .3em;\n}\n\n.markdown-body h2 {\n  font-size: 1.5em;\n}\n\n.markdown-body h3 {\n  font-size: 1.25em;\n}\n\n.markdown-body h4 {\n  font-size: 1em;\n}\n\n.markdown-body h5 {\n  font-size: .875em;\n}\n\n.markdown-body h6 {\n  color: #6a737d;\n  font-size: .85em;\n}\n\n.markdown-body ol,\n.markdown-body ul {\n  padding-left: 2em;\n}\n\n.markdown-body ol ol,\n.markdown-body ol ul,\n.markdown-body ul ol,\n.markdown-body ul ul {\n  margin-bottom: 0;\n  margin-top: 0;\n}\n\n.markdown-body li {\n  word-wrap: break-all;\n}\n\n.markdown-body li>p {\n  margin-top: 16px;\n}\n\n.markdown-body li+li {\n  margin-top: .25em;\n}\n\n.markdown-body dl {\n  padding: 0;\n}\n\n.markdown-body dl dt {\n  font-size: 1em;\n  font-style: italic;\n  font-weight: 600;\n  margin-top: 16px;\n  padding: 0;\n}\n\n.markdown-body dl dd {\n  margin-bottom: 16px;\n  padding: 0 16px;\n}\n\n.markdown-body table {\n  display: block;\n  overflow: auto;\n  width: 100%;\n}\n\n.markdown-body table th {\n  font-weight: 600;\n}\n\n.markdown-body table td,\n.markdown-body table th {\n  border: 1px solid #dfe2e5;\n  padding: 6px 13px;\n}\n\n.markdown-body table tr {\n  background-color: #fff;\n  border-top: 1px solid #c6cbd1;\n}\n\n.markdown-body table tr:nth-child(2n) {\n  background-color: #f6f8fa;\n}\n\n.markdown-body img {\n  background-color: #fff;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  max-width: 100%;\n}\n\n.markdown-body img[align=right] {\n  padding-left: 20px;\n}\n\n.markdown-body img[align=left] {\n  padding-right: 20px;\n}\n\n.markdown-body code {\n  background-color: rgba(27,31,35,.05);\n  border-radius: 3px;\n  font-size: 85%;\n  margin: 0;\n  padding: .2em .4em;\n}\n\n.markdown-body pre {\n  word-wrap: normal;\n}\n\n.markdown-body pre>code {\n  background: transparent;\n  border: 0;\n  font-size: 100%;\n  margin: 0;\n  padding: 0;\n  white-space: pre;\n  word-break: normal;\n}\n\n.markdown-body .highlight {\n  margin-bottom: 16px;\n}\n\n.markdown-body .highlight pre {\n  margin-bottom: 0;\n  word-break: normal;\n}\n\n.markdown-body .highlight pre,\n.markdown-body pre {\n  background-color: #f6f8fa;\n  border-radius: 3px;\n  font-size: 85%;\n  line-height: 1.45;\n  overflow: auto;\n  padding: 16px;\n}\n\n.markdown-body pre code {\n  background-color: transparent;\n  border: 0;\n  display: inline;\n  line-height: inherit;\n  margin: 0;\n  max-width: auto;\n  overflow: visible;\n  padding: 0;\n  word-wrap: normal;\n}\n\n.markdown-body .commit-tease-sha {\n  color: #444d56;\n  display: inline-block;\n  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;\n  font-size: 90%;\n}\n\n.markdown-body .blob-wrapper {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n\n.markdown-body .blob-wrapper-embedded {\n  max-height: 240px;\n  overflow-y: auto;\n}\n\n.markdown-body .blob-num {\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -webkit-user-select: none;\n  color: rgba(27,31,35,.3);\n  cursor: pointer;\n  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;\n  font-size: 12px;\n  line-height: 20px;\n  min-width: 50px;\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: right;\n  user-select: none;\n  vertical-align: top;\n  white-space: nowrap;\n  width: 1%;\n}\n\n.markdown-body .blob-num:hover {\n  color: rgba(27,31,35,.6);\n}\n\n.markdown-body .blob-num:before {\n  content: attr(data-line-number);\n}\n\n.markdown-body .blob-code {\n  line-height: 20px;\n  padding-left: 10px;\n  padding-right: 10px;\n  position: relative;\n  vertical-align: top;\n}\n\n.markdown-body .blob-code-inner {\n  color: #24292e;\n  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;\n  font-size: 12px;\n  overflow: visible;\n  white-space: pre;\n  word-wrap: normal;\n}\n\n.markdown-body .pl-token.active,\n.markdown-body .pl-token:hover {\n  background: #ffea7f;\n  cursor: pointer;\n}\n\n.markdown-body kbd {\n  background-color: #fafbfc;\n  border: 1px solid #d1d5da;\n  border-bottom-color: #c6cbd1;\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 -1px 0 #c6cbd1;\n  box-shadow: inset 0 -1px 0 #c6cbd1;\n  color: #444d56;\n  display: inline-block;\n  font: 11px SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;\n  line-height: 10px;\n  padding: 3px 5px;\n  vertical-align: middle;\n}\n\n.markdown-body :checked+.radio-label {\n  border-color: #0366d6;\n  position: relative;\n  z-index: 1;\n}\n\n.markdown-body .tab-size[data-tab-size=\"1\"] {\n  -moz-tab-size: 1;\n  -o-tab-size: 1;\n  tab-size: 1;\n}\n\n.markdown-body .tab-size[data-tab-size=\"2\"] {\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n\n.markdown-body .tab-size[data-tab-size=\"3\"] {\n  -moz-tab-size: 3;\n  -o-tab-size: 3;\n  tab-size: 3;\n}\n\n.markdown-body .tab-size[data-tab-size=\"4\"] {\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n}\n\n.markdown-body .tab-size[data-tab-size=\"5\"] {\n  -moz-tab-size: 5;\n  -o-tab-size: 5;\n  tab-size: 5;\n}\n\n.markdown-body .tab-size[data-tab-size=\"6\"] {\n  -moz-tab-size: 6;\n  -o-tab-size: 6;\n  tab-size: 6;\n}\n\n.markdown-body .tab-size[data-tab-size=\"7\"] {\n  -moz-tab-size: 7;\n  -o-tab-size: 7;\n  tab-size: 7;\n}\n\n.markdown-body .tab-size[data-tab-size=\"8\"] {\n  -moz-tab-size: 8;\n  -o-tab-size: 8;\n  tab-size: 8;\n}\n\n.markdown-body .tab-size[data-tab-size=\"9\"] {\n  -moz-tab-size: 9;\n  -o-tab-size: 9;\n  tab-size: 9;\n}\n\n.markdown-body .tab-size[data-tab-size=\"10\"] {\n  -moz-tab-size: 10;\n  -o-tab-size: 10;\n  tab-size: 10;\n}\n\n.markdown-body .tab-size[data-tab-size=\"11\"] {\n  -moz-tab-size: 11;\n  -o-tab-size: 11;\n  tab-size: 11;\n}\n\n.markdown-body .tab-size[data-tab-size=\"12\"] {\n  -moz-tab-size: 12;\n  -o-tab-size: 12;\n  tab-size: 12;\n}\n\n.markdown-body .task-list-item {\n  list-style-type: none;\n}\n\n.markdown-body .task-list-item+.task-list-item {\n  margin-top: 3px;\n}\n\n.markdown-body .task-list-item input {\n  margin: 0 .2em .25em -1.6em;\n  vertical-align: middle;\n}\n\n.markdown-body hr {\n  border-bottom-color: #eee;\n}\n\n.markdown-body .pl-0 {\n  padding-left: 0!important;\n}\n\n.markdown-body .pl-1 {\n  padding-left: 4px!important;\n}\n\n.markdown-body .pl-2 {\n  padding-left: 8px!important;\n}\n\n.markdown-body .pl-3 {\n  padding-left: 16px!important;\n}\n\n.markdown-body .pl-4 {\n  padding-left: 24px!important;\n}\n\n.markdown-body .pl-5 {\n  padding-left: 32px!important;\n}\n\n.markdown-body .pl-6 {\n  padding-left: 40px!important;\n}\n\n.markdown-body .pl-7 {\n  padding-left: 48px!important;\n}\n\n.markdown-body .pl-8 {\n  padding-left: 64px!important;\n}\n\n.markdown-body .pl-9 {\n  padding-left: 80px!important;\n}\n\n.markdown-body .pl-10 {\n  padding-left: 96px!important;\n}\n\n.markdown-body .pl-11 {\n  padding-left: 112px!important;\n}\n\n.markdown-body .pl-12 {\n  padding-left: 128px!important;\n}\n\n.wrapper {\n  font-family: \"Roboto\", sans-serif;\n  height: 100%;\n  min-height: 10rem;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  /*.previewer {\n      height: 100%;\n      width: 45%;\n      //margin: 1rem;\n      display: inline-block;\n      overflow-y: scroll;\n      //Style\n      border: 1px solid black;\n      margin: 0 .5rem;\n  }*/\n}\n.wrapper .editor-wrapper, .wrapper .previewer-wrapper {\n  height: 100%;\n  width: 45%;\n  margin: 0 0.5rem;\n}\n.wrapper .editor-wrapper__area, .wrapper .previewer-wrapper__area {\n  height: calc(100% - 2rem - 1px - .1rem);\n}\n.wrapper .editor {\n  height: 100%;\n  width: 100%;\n  padding-left: 0.5rem;\n  padding-top: 0.5rem;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.wrapper .previewer-wrapper__area {\n  overflow-y: scroll;\n  /*padding: 0 !important;\n  padding-left: .5rem !important;\n  padding-top: .5rem !important;\n  box-sizing: border-box;*/\n}\n\n.buttons {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  border-top: 1px solid;\n  border-left: 1px solid;\n  border-right: 1px solid;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-color: #d1d5da;\n  border-bottom: none;\n  border-top-style: dashed;\n  border-left-style: dashed;\n  border-right-style: dashed;\n}\n\n.button {\n  font-size: 1.2rem;\n  width: 2.5rem;\n  height: 2rem;\n  margin: 0.1rem 0.5rem;\n  padding: 0;\n  border: none;\n  cursor: pointer;\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n}\n.button:hover {\n  background-color: #ebebeb;\n  border-radius: 0.2rem;\n}\n.button ion-icon {\n  vertical-align: middle;\n}\n.button__show-previewer {\n  display: none;\n}\n.button__close-previewer {\n  display: none;\n}\n\n.markdown-body {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 30px;\n}\n\n\@media (max-width: 767px) {\n  .markdown-body {\n    padding: 15px;\n  }\n\n  .wrapper .previewer-wrapper {\n    display: none;\n    position: absolute;\n    z-index: 999;\n    margin: 0;\n    width: calc(100% - .5rem);\n    background-color: #fff;\n    opacity: 1;\n  }\n  .wrapper .editor-wrapper {\n    width: 100%;\n  }\n\n  .button__show-previewer {\n    display: initial;\n  }\n  .button__close-previewer {\n    display: initial;\n    margin-left: auto;\n  }\n}"; }
}

export { DlcMarkdownEditor as dlc_markdown_editor };
