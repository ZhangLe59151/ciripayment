import { Locale } from "vant";
import enUS from "vant/lib/locale/lang/en-US";
import moment from "moment-timezone";

Locale.use("en-US", enUS);

moment.locale("th");

export { moment };
