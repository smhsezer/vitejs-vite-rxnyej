import { Html } from './html'

export function Footer() {
  return (
    <footer class="mt-auto bg-dark text-white p-2 clearfix">
      <div class="row col-8 col-md-12 col-mx-auto my-5">
        {window.site.footer.map((item, id) => (
          <Html text={item.text} />
        ))}
      </div>
      <div class="text-center d-block py-2">{window.site.copyright}</div>
    </footer>
  );
}
