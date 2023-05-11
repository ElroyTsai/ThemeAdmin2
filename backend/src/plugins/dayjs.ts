import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

//*加載語系
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import "dayjs/locale/el";

//*加入套件
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

//*設置語系
// switch (i18n.language) {
//   case "en_US":
//     dayjs.locale("en");
//     break;
//   case "el_GR":
//     dayjs.locale("el");
//     break;
//   default:
//     dayjs.locale("zh-cn");
// }
