import { useTranslation } from 'react-i18next';
import './ModalBase.css';

type ModalBaseProps = {
  title?: string;
  message?: string;
  onClose?: () => void
}

function ModalBase({ title, message, onClose }: ModalBaseProps) {
  const { t } = useTranslation();

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal_content_wrapper">
        {title &&
          <h2>{t(title)}</h2>
        }
        {message &&
          <p>{t(message)}</p>
        }
      </div>
    </div>
  )
}

export default ModalBase;
