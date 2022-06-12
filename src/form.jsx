import { getLang, config, fetch2, uniqid, q } from './general';

export function Toastify(props) {
  const time = 5000;
  const $div = document.createElement('div');

  let typeClass = '';
  switch (props.type) {
    case 'info':
      typeClass = 'toast-primary';
      break;
    case 'success':
      typeClass = 'toast-success';
      break;
    case 'warning':
      typeClass = 'toast-warning';
      break;
    case 'error':
      typeClass = 'toast-error';
      break;
    default:
      break;
  }

  function remove() {
    $div.remove();
  }

  $div.className =
    'p-fixed animate__animated animate__bounceInDown animate__fast p-3 text-center toast ' +
    typeClass;
  $div.id = uniqid();
  $div.innerHTML = props.text;
  $div.style = 'top:0';

  const $button = document.createElement('button');
  $button.className = 'btn btn-clear float-right';
  $button.onclick = remove;

  $div.appendChild($button);
  q('body').appendChild($div);

  setTimeout(() => {
    $div.classList.add('animate__fadeOutUp');
  }, time);
  setTimeout(remove, time + 1000);
}

export function Form(props) {
  const action = props.action;
  const items = props.items;
  const values = {};
  const lang = getLang();

  const handleSubmit = async (event) => {
    const form = event.target.parentElement;

    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let resText = '';
      switch (lang) {
        case 'en':
          resText = {
            i: 'Sending Your Message...',
            s: 'Successfully transmitted',
            e: 'Something went wrong. Please try again.',
          };
          break;
        case 'tr':
        default:
          resText = {
            i: 'Mesajınız Gönderiliyor...',
            s: 'Başarıyla iletildi.',
            e: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          };
          break;
      }

      Toastify({ type: 'info', text: resText.i });

      const elements = form.elements;
      for (let i = 0, len = elements.length; i < len; i++) {
        values[elements[i]['name']] = elements[i]['value'];
      }

      const subject =
        capitalizeText(window.pageId) + ' - Form (' + config.origin + ')';

      let messageHtml = '<h1>' + subject + '</h1><br>';
      for (const prop in values) {
        if (prop !== 'from' && prop !== 'button') {
          messageHtml +=
            '<div><b>' + prop + ': </b>' + values[prop] + '</div><hr></br>';
        }
      }

      const data = {
        type: 'sendmail',
        entry: {
          subject: subject,
          from: values['from'],
          to: values['from'],
          messageHtml: messageHtml,
        },
      };
      const options = {
        method: 'POST',
        data: data,
        url: 'https://b1r.site/api/',
      };

      try {
        await fetch2(options);
        Toastify({ type: 'success', text: resText.s });
        form.remove();
      } catch (e) {
        Toastify({ type: 'error', text: resText.e });
      }
    }
  };

  return (
    <form class="p-3 col-6 col-md-12 col-mx-auto border">
      {items.map((el, idx) => (
        <div class="my-2 form-group">
          <label class="form-label">{el.text}</label>
          {el.type === 'textarea' ? (
            <textarea
              class="form-input rounded"
              required={el.required}
              name={el.id}
              rows="4"
            ></textarea>
          ) : (
            <input
              class="form-input rounded"
              required={el.required}
              type={el.type}
              name={el.id}
              placeholder={el.text}
              value={el.value || ''}
            />
          )}
        </div>
      ))}
      <div name="button" class="btn btn-primary" onClick={handleSubmit}>
        {action.text}
      </div>
      <br />
      <br />
      <br />
    </form>
  );
}
