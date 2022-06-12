import { Router, route } from 'preact-router';
import { Header } from './header';
import { Footer } from './footer';
import { Page } from './page';
import { getLang } from './general';

export function App() {
  async function handleRoute(e) {
    route(e.url);
  }

  return (
    <>
      <Header />
      <Router onChange={this.handleRoute}>
        {window.site.menu.map((item, index) => (
          <Page path={getLang() + item.url} value={{ pageId: item.name }} />
        ))}
      </Router>
      <Footer />
    </>
  );
}
