require('./index.scss');

import './components/header/ds-header.html';
import './components/menu/ds-menu.html';
import './components/about/ds-about.html';
import './components/work/ds-work.html';
import './components/contact/ds-contact.html';

(function() {

    // Add webcomponents polyfill if needed
    if ('registerElement' in document &&
        'import' in document.createElement('link') &&
        'content' in document.createElement('template')) {
        // platform is good!
    } else {
        // polyfill the platform!
        var e = document.createElement('script');
        e.src = './webcomponents.bundle.js';
        document.body.appendChild(e);
    }
})();
