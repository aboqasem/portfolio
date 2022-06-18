(() => {
  let theme;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme && (storedTheme === 'Dark' || storedTheme === 'Light')) {
    theme = storedTheme;
  }

  if (!theme) {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }

  if (theme === 'Dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
