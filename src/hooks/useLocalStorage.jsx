export default function useLocalStorage() {
  const getLocalStorageLevels = () => JSON.parse(localStorage.getItem('levels'));

  const setLocalStorageLevels = (levels) => {
    localStorage.setItem('levels', JSON.stringify(levels));
  };

  return {
    getLocalStorageLevels,
    setLocalStorageLevels
  };
}
