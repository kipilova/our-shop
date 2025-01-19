export function getABTestVersion(): 'A' | 'B' {
    const savedVersion = localStorage.getItem('siteVersion');
    if (savedVersion) {
      return savedVersion as 'A' | 'B';
    }
  
    const newVersion = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem('siteVersion', newVersion);
    return newVersion;
  }
  