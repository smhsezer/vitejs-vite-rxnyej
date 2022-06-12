import { render } from 'preact';
import { getLang, fetch2, config } from './general';
import { App } from './app';
import './animate.css';
import './spectre.css';
import './spectre-exp.css';
import './index.css';

async function init() {
  document.getElementsByTagName('html')[0].setAttribute('lang', getLang());

  const ops = {
    url: 'https://b1r.site/json/',
    method: 'Post',
    data: { file: config.hostname + '_v2_site-' + getLang() },
  };
  window.site = await fetch2(ops);

  document
    .querySelector('meta[name="apple-mobile-web-app-title"]')
    .setAttribute('content', window.site.shortTitle);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', window.site.theme.color);
  document
    .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
    .setAttribute('content', window.site.theme.color);
  document
    .querySelector('meta[name="msapplication-navbutton-color"]')
    .setAttribute('content', window.site.theme.color);

  //Page Referans init
  window.site.menu.forEach((item) => {
    const content = window.site.pages[item.name].content;
    const refArr = content.filter((o) => o.id === 'ref');
    refArr.forEach((element) => {
      const cont = window.site.pages[element.refPage].content.find(
        (o) => o.uid === element.refId
      );
      content.push(cont);
    });
  });

  window.sliderList = [];
  window.timeoutList = {};

  render(<App />, document.getElementById('app'));
}

init();
