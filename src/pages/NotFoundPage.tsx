import { Link } from 'react-router'
import { buttonClass } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <title>404</title>
      <div>
        <p className="text-gradient text-8xl font-black">404</p>
        <Link to="/" className={buttonClass('primary', 'mt-6')}>
          {t('nav.home')}
        </Link>
      </div>
    </div>
  )
}
