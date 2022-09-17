import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";
import {Quasar} from "quasar";


export default boot(({ app }) => {
  let locale = Quasar.lang.isoName;
  const i18n = createI18n({
    locale: locale,
    globalInjection: true,
    messages,
    legacy: false
  });

  // Set i18n instance on app
  app.use(i18n);
});
