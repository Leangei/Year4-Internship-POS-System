import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface CustomerSearchProps {
  query: string
  onQueryChange: (value: string) => void
}

export default function CustomerSearch({ query, onQueryChange }: CustomerSearchProps) {
  const { t } = useTranslation('customer')

  return (
    <div className="dp-search dp-search--lg dp-search--full">
      <span className="dp-search__ico">
        <Search size={13} strokeWidth={2} />
      </span>
      <input
        type="search"
        className="dp-search__input"
        placeholder={t('list.searchPlaceholder')}
        aria-label={t('list.searchPlaceholder')}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  )
}