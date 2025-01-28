import { useEffect, useState } from 'react';
import './App.css'
import { ThemeProvider } from './context/themeContext';
import Card from './components/card';
import ThemeBtn from './components/themeBtn';

function App() {

  const [themeMode, setThememode] = useState("light");

  const darkTheme = () => {
    setThememode("dark")
  }

  const lightTheme = () => {
    setThememode("light")
  }

  useEffect((() => {
    const root = document.querySelector('html').classList
    root.remove("light", "dark");
    root.add(themeMode)
  }), [themeMode])

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>

      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>

    </ThemeProvider>

  )
}

export default App
