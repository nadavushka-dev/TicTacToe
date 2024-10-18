import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "../../../Constants/translations/translations-keys";
import "./Footer.css";

function Footer(): JSX.Element {
  const {t} = useTranslation()

  return (
    <div className="Footer">
      <h4>{t(TRANSLATION_KEYS.FOOTER.CREATED_BY)}</h4>
    </div>
  );
}

export default Footer;
