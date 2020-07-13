// External Dependencies
import toString from 'lodash/toString';
import isEqual from 'lodash/isEqual';

const Utils = {

  decodeHtmlEntities(value) {
    value = toString(value);

    return value.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  },

  shouldComponentUpdate(component, nextProps, nextState) {
    return ! isEqual(nextProps, component.props) || ! isEqual(nextState, component.state);
  },

  isScriptExcluded(node) {
    const { whitelist, blacklist } = window.ET_Builder.Preboot.scripts;
    const { nodeName, innerHTML, src } = node;

    if (nodeName !== 'SCRIPT') {
      return false;
    }

    if (innerHTML) {
      // Whitelist has precendence over blacklist
      return !whitelist.innerHTML.test(innerHTML) && blacklist.innerHTML.test(innerHTML);
    }

    return blacklist.src.test(src);
  },

  isScriptTopOnly(node) {
    const { topOnly } = window.ET_Builder.Preboot.scripts;
    const { nodeName, src } = node;

    if (nodeName !== 'SCRIPT') {
      return false;
    }

    return topOnly.src.test(src);
  },
};

const {
  decodeHtmlEntities,
  shouldComponentUpdate,
  isScriptExcluded,
  isScriptTopOnly,
} = Utils;

export {
  decodeHtmlEntities,
  shouldComponentUpdate,
  isScriptExcluded,
  isScriptTopOnly,
}

export default Utils;
