import { getLang } from './general';
import logo from './logo.svg';
import logoRotate from './logo-rotate.svg';

export function Header() {
  return (
    <header class="p-2 bg-secondary">
      <div class="col-sm-12 col-lg-11 col-9 p-centered">
        <div class="navbar">
          <section class="float-left col-2 col-lg-3">
            <a
              href={'/' + getLang() + '/'}
              class="navbar-brand mr-2 p-relative"
            >
              {(() => {
                if (window.site.logo.animate.stt) {
                  return (
                    <img
                      style={{ zIndex: '999999' }}
                      className={'col-12 p-absolute'}
                      src={logoRotate}
                      onLoad={(e) => {
                        e.target.classList.add(window.site.logo.animate.class);
                      }}
                      onTransitionEnd={(e) => {
                        e.target.classList.add('fadeOut');
                        e.target.nextElementSibling.classList.add('fadeIn');
                      }}
                    />
                  );
                }
              })()}
              <img
                src={logo}
                alt={location.origin.replace('https://', '') + ' logo'}
                class="col-12"
                style={
                  window.site.logo.animate.stt ? { opacity: 0 } : { opacity: 1 }
                }
              />
            </a>
          </section>
          <section
            class="float-left hide-md col-10 col-lg-9 d-flex"
            style="align-items:center;flex-direction: row-reverse;"
          >
            <div class="dropdown">
              <a
                href="#"
                class="btn btn-success dropdown-toggle text-capitalize"
                tabindex="0"
              >
                {getLang()} ▼
              </a>
              <ul class="menu">
                <li>
                  <a class="d-block" href="/tr/">
                    Tr
                  </a>
                </li>
                <li>
                  <a class="d-block" href="/en/">
                    En
                  </a>
                </li>
              </ul>
            </div>
            <nav class="mx-2">
              {window.site.menu.map((item, index) => (
                <a
                  href={'/' + getLang() + item.url}
                  class="hvr-sweep-to-right ps-1 text-dark"
                  data-id={item.name}
                >
                  {item.txt}
                </a>
              ))}
            </nav>
          </section>
          <section class="hide show-f-md" style="align-items:center">
            <a
              id="off-canvas-toggle-btn"
              class="off-canvas-toggle btn btn-action bg-dark text-secondary"
              href="#sidebar-id"
            >
              ☰
            </a>
          </section>
        </div>
      </div>
      <div class="off-canvas z-Index-7x">
        <div
          id="sidebar-id"
          class="off-canvas-sidebar"
          style="background:rgba(255,255,255,.8)"
        >
          <nav class="mx-2 d-flex flex-column">
            <br />
            <div class="dropdown">
              <a
                class="btn btn-success dropdown-toggle text-capitalize"
                tabindex="0"
              >
                {getLang()} ▼
              </a>
              <ul class="menu">
                <li>
                  <a class="d-block" href="/tr/">
                    Tr
                  </a>
                </li>
                <li>
                  <a class="d-block" href="/en/">
                    En
                  </a>
                </li>
              </ul>
            </div>
            {window.site.menu.map((item, index) => (
              <a
                href={'/' + getLang() + item.url}
                class="hvr-sweep-to-right ps-1 text-dark"
                data-id={item.name}
              >
                {item.txt}
              </a>
            ))}
          </nav>
        </div>

        <a class="off-canvas-overlay" href="#close"></a>

        <div class="off-canvas-content"></div>
      </div>
    </header>
  );
}
