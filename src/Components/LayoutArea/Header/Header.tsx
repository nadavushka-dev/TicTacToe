import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "../../../Constants/translations/translations-keys";
import "./Header.css";

function Header(): JSX.Element {
  const {t} = useTranslation();
    return (
        <div className="Header">
			<h1>{t(TRANSLATION_KEYS.HEADER.TITLE)}</h1>
        </div>
    );
}

export default Header;
