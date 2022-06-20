(() => {
  const { theme } = localStorage;
  document.documentElement.classList[
    theme === 'Dark' || (theme !== 'Light' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'add' : 'remove'
  ]('dark');
})();
