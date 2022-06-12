import { useEffect } from 'preact/hooks';
import { breakPoint, config, q, uniqid } from './general';
import { Html } from './html';
import { Form } from './form';

export function Page(props) {
  const imgPath = config.imgOrigin + window.site.site + '/img';
  const bP = breakPoint();

  init();

  function init() {
    window.pageId = props.value.pageId;
    document.title = window.site.pages[window.pageId].metatitle;
    q('meta[name="description"]').setAttribute(
      'content',
      window.site.pages[window.pageId].description
    );
  }

  useEffect(() => {
    q('#' + window.pageId).style.transform = 'translateX(0)';
  }, [window.pageId]);

  function slider(e) {
    if (e.target.dataset.id === '1') {
      const id = e.target.dataset.parent;
      if (window.sliderList.includes(id)) {
        clearTimeout(window.timeoutList[id]);
      } else {
        window.sliderList.push(id);
      }

      const len = q('[data-id="' + id + '"] .carousel-item', 'array').length;

      q(
        '[data-id="' + id + '"] .carousel-item:nth-child(1)',
        'addClass',
        'carousel-slidein'
      );
      q(
        '[data-id="' + id + '"] .nav-item:nth-child(1)',
        'addClass',
        'color-white'
      );
      q('[data-id="' + id + '"] .nav-item', 'array').forEach((item, idx) => {
        item.onclick = () => {
          clearTimeout(window.timeoutList[id]);
          curr = idx + 1;
          sliding(curr);
          next();
        };
      });
      let curr = 1;

      if (q('[data-id="' + id + '"]').getBoundingClientRect().height === 0) {
        q('[data-id="' + id + '"]').classList.add(
          q('[data-id="' + id + '"]').dataset.launch
        );
      }

      function sliding(data) {
        q(
          '[data-id="' + id + '"] .carousel-item',
          'removeClass',
          'carousel-slidein'
        );
        q(
          '[data-id="' + id + '"] .carousel-item:nth-child(' + data + ')',
          'addClass',
          'carousel-slidein'
        );
        q('[data-id="' + id + '"] .nav-item', 'removeClass', 'color-white');
        q(
          '[data-id="' + id + '"] .nav-item:nth-child(' + data + ')',
          'addClass',
          'color-white'
        );
      }

      function next() {
        window.timeoutList[id] = setTimeout(() => {
          curr = curr < len ? curr + 1 : 1;

          sliding(curr);
          next();
        }, 4000);
      }
      next();
    }
  }

  return (
    <div
      id={window.pageId}
      key={window.pageId}
      data-type="page"
      style="transform:translateX(-100%);transition:.2s"
    >
      {window.site.pages[window.pageId].content.map((item, index) =>
        (() => {
          const id = uniqid;
          if (item.id === 'banner') {
            return (
              <div
                class="p-relative mb-5 bg-secondary"
                style={{ minHeight: (window.innerWidth * 26) / 100 }}
              >
                <img
                  id={'a' + id + '-banner'}
                  class="img-responsive"
                  src={
                    imgPath +
                    item.img +
                    (window.innerWidth > 768 ? '' : '_md') +
                    '.webp'
                  }
                  alt={item.title}
                />
                <h1 class="bg-gray p-2 text-center col-mx-auto page-title">
                  {item.title}
                </h1>
              </div>
            );
          } else if (item.id === 'slider') {
            return (
              <div
                class="carousel"
                data-id={item.uid}
                style={{ height: '0' }}
                data-launch="sliderLaunch"
              >
                {item.text.map((el, idx) => (
                  <input
                    class="carousel-locator"
                    id={'slide-' + (idx + 1) + '-' + id}
                    type="radio"
                    name="carousel-radio"
                    hidden="true"
                  />
                ))}
                <div class="carousel-container p-relative">
                  {item.text.map((el, idx) => (
                    <figure class="carousel-item">
                      <img
                        class="img-responsive"
                        src={
                          imgPath + '/slides/slide_' + (idx + 1) + bP + '.webp'
                        }
                        alt={el}
                        data-id={idx + 1}
                        data-parent={item.uid}
                        onLoad={slider}
                      />
                      <h2
                        class="p-absolute col-12 text-center h4 text-secondary text-bold text-shadow"
                        style="bottom:50px;"
                      >
                        {el}
                      </h2>
                    </figure>
                  ))}
                </div>
                <div class="carousel-nav">
                  {item.text.map((el, idx) => (
                    <label
                      class="nav-item text-hide c-hand"
                      for={'slide-' + (idx + 1) + '-' + id}
                    >
                      {idx + 1}
                    </label>
                  ))}
                </div>
              </div>
            );
          } else if (item.id === 'card') {
            return (
              <div class="justify-content-center row col-8 col-md-12 col-mx-auto my-5">
                {item.title === null ? (
                  ''
                ) : (
                  <h2 class="border-bottom clearfix col-12 mx-1">
                    {item.title}
                  </h2>
                )}
                {item.cards.map((el, idx) => (
                  <div
                    class="card m-3 p-2"
                    key={idx + Math.random()}
                    style={{ width: '300px' }}
                  >
                    <div class="card-image">
                      <img
                        class="rounded col-12"
                        src={
                          imgPath +
                          el.img +
                          (window.devicePixelRatio > 1 ? '' : '_sm') +
                          '.webp'
                        }
                        alt={el.title === null ? '' : el.title}
                      />
                    </div>
                    <div class="card-body" data-type="html">
                      {el.title === null ? (
                        ''
                      ) : (
                        <h5 class="text-bold">{el.title}</h5>
                      )}
                      {el.text === null ? '' : <Html text={el.text} />}
                      {el.action === null ? (
                        ''
                      ) : (
                        <div class="btn btn-primary">{el.action.text}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          } else if (item.id === 'list-slider') {
            return (
              <div class="justify-content-center row p-2 col-8 col-md-12 col-mx-auto my-5">
                {item.title === null ? (
                  ''
                ) : (
                  <h2 class="border-bottom clearfix col-12">{item.title}</h2>
                )}
                <div
                  class="carousel my-3"
                  data-id={item.uid}
                  data-launch="null"
                >
                  {item.list.map((el, idx) => (
                    <input
                      class="carousel-locator"
                      id={'slide-' + (idx + 1) + '-' + id}
                      type="radio"
                      name="carousel-radio"
                      hidden="true"
                    />
                  ))}
                  <div
                    class="carousel-container p-relative"
                    style="min-height:128px"
                  >
                    {item.list.map((el, idx) => (
                      <figure class="carousel-item">
                        <div class="d-flex justify-content-around bg-white col-12">
                          {el.map((el, idx2) => (
                            <img
                              style={{ maxWidth: '128px' }}
                              class="col-3"
                              src={
                                imgPath +
                                el.img +
                                (window.devicePixelRatio > 1 ? '' : '_sm') +
                                '.webp'
                              }
                              data-id={idx + idx2 + 1}
                              data-parent={item.uid}
                              onLoad={slider}
                              alt={el.text === null ? '' : el.text}
                            />
                          ))}
                        </div>
                      </figure>
                    ))}
                  </div>
                  <div class="carousel-nav">
                    {item.list.map((el, idx) => (
                      <label
                        class="nav-item text-hide c-hand"
                        for={'slide-' + (idx + 1) + '-' + id}
                      >
                        {idx + 1}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            );
          } else if (item.id === 'p') {
            return (
              <div
                class=" row p-2 col-8 col-md-12 col-mx-auto my-5"
                data-type="html"
              >
                <Html text={item.text} />
              </div>
            );
          } else if (item.id === 'form') {
            return (
              <>
                <br />
                <br />
                <Form action={item.action} items={item.items} />
                <br />
                <br />
              </>
            );
          }
        })()
      )}
    </div>
  );
}
