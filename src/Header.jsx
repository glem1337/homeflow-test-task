import SearchBox from './SearchBox';

function Header({ onSearch }) {
  return (
    <header className="flex flex-col md:flex-row justify-between">
      <h1 className="text-8xl">Posh Properties</h1>
      <SearchBox onSearch={onSearch} />
    </header>
  );
}

export default Header;
