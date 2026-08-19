import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (!query || !query.trim()) {
      toast.error('Please enter a search query!');
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <header className={css.header}>
      <span className={css.brand}>Powered by TMDB</span>
      <form action={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}