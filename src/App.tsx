import { HashRouter, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { Products } from './components/Products'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import './app.module.scss'

// function getABTestVersion(): 'A' | 'B' {
//   // Проверяем, есть ли сохранённая версия
//   const savedVersion = localStorage.getItem('siteVersion');
//   if (savedVersion) {
//     return savedVersion as 'A' | 'B';
//   }

//   // Выбираем случайно
//   const newVersion = Math.random() < 0.5 ? 'A' : 'B';
//   localStorage.setItem('siteVersion', newVersion);
//   return newVersion;
// }

function App() {
  // const version = getABTestVersion();

  return (
    <HashRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Products />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default App;
