export const config = {
  origin: 'rodasshipgroup.com',
  hostname: 'rodasshipgroup.com',
  imgOrigin: 'https://kl9yubfg.b-cdn.net/',
};

export const capitalizeText = (s) =>
  (s && s[0].toUpperCase() + s.slice(1)) || '';

export const breakPoint = () => {
  //Detect Screen Size
  const { innerWidth, devicePixelRatio } = window;
  let breakpoint = '';
  const w = innerWidth * devicePixelRatio;
  if (w <= 576) {
    breakpoint = '_sm';
  } else if (w <= 768) {
    breakpoint = '_md';
  } else if (w <= 1200) {
    breakpoint = '_xl';
  } else if (w <= 1400) {
    breakpoint = '_xxl';
  } else {
    breakpoint = '';
  }

  return breakpoint;
};

export const getLang = () => {
  let { pathname } = location;

  const pathArr = pathname.split('/');
  const lang = pathArr[1];

  return lang;
};

export const q = (data, task, data3) => {
  var selector = data,
    elem = null,
    result = null,
    len = null;
  elem = document.querySelectorAll(selector);
  len = elem.length;

  if (typeof task === 'undefined') {
    if (len === 1) {
      result = elem[0];
    } else if (len > 1) {
      result = elem;
    }
  } else if (task === 'length') {
    result = len;
  } else {
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        switch (task) {
          case 'hide':
            elem[i].style.display = 'none';
            break;
          case 'show':
            elem[i].style.display = 'block';
            break;
          case 'flex':
            elem[i].style.display = 'flex';
            break;
          case 'table':
            elem[i].style.display = 'table';
            break;
          case 'inline':
            elem[i].style.display = 'inline';
            break;
          case 'inline-block':
            elem[i].style.display = 'inline-block';
            break;
          case 'visible':
            elem[i].style.visibility = 'visible';
            break;
          case 'hidden':
            elem[i].style.visibility = 'hidden';
            break;
          case 'toggle':
            if (
              elem[i].style.display === 'none' ||
              elem[i].style.display === '' ||
              elem[i].style.display === null
            ) {
              elem[i].style.display = 'block';
            } else {
              elem[i].style.display = 'none';
            }
            break;
          case 'remove':
            elem[i].remove();
            break;
          case 'addClass':
            elem[i].classList.add(data3);
            break;
          case 'removeClass':
            elem[i].classList.remove(data3);
            break;
        }
      }
      result = len === 1 && task !== 'array' ? elem[0] : elem;
      elem = null;
    } else if (task === 'array') {
      return elem;
    }
  }
  return result;
};

export async function fetch2(ops) {
  const response = await fetch(ops.url, {
    method: ops.method,
    /*headers: {
      'Content-Type': 'application/json',
    },*/
    body: JSON.stringify(ops.data),
  });

  let res = null;
  const msg = {
    413: {
      tr: 'İşlem başarısız! Yüklenen dosya boyutu çok büyük.',
      en: 'Operation failed! The uploaded file size is too large.',
    },
  };

  switch (response.status) {
    case 200:
    case 304:
      res = await response.json();
      break;
    case 413:
      alert(msg[response.status][detectLang()]);
  }

  return res;
}

export const uniqid = () => {
  return "u" + (Math.random().toString(16).slice(2));
};
