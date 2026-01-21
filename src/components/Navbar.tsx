import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  isBannerVisible?: boolean
}

export default function Navbar({ isBannerVisible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }
  }, [scrolled])

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const navStyle = {
    boxShadow: scrolled ? "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 5px 18px 0 rgba(204,204,204,0.1)" : "none",
    border: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
  }

  return (
    <div
      className={`fixed ${isBannerVisible ? "top-[44px] sm:top-12" : "top-0"} left-0 right-0 z-50 flex justify-center px-6 md:px-8 transition-all duration-300`}
    >
      <div className="w-[calc(100%-24px)] max-w-[1400px] mt-2">
        <nav
          className="flex items-center justify-between p-2 h-16 bg-black rounded-[16px] text-white font-geist"
          style={navStyle}
        >
          <div className="flex items-center ml-[15px]">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="2" fill="#22D3EE"/>
            </svg>
            <span
              className="logo-text"
              style={{
                fontFamily: '"GeistSans", sans-serif',
                fontSize: "18px",
                lineHeight: "1.1",
                fontWeight: "600",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                width: "auto",
                height: "auto",
              }}
            >
              Читайполка
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Каталог
            </a>
            <a href="#authors" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Авторы
            </a>
            <a href="#library" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Библиотека
            </a>
            <a href="#community" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Сообщество
            </a>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:opacity-90 px-6 h-12 rounded-lg"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",
                letterSpacing: "0.56px",
                height: "48px",
                borderRadius: "8px",
              }}
            >
              ВОЙТИ
            </Button>
          </div>

          <button
            className="md:hidden flex items-center justify-center mr-2 p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
        )}

        <div
          className={`fixed top-[76px] right-6 w-[calc(100%-48px)] max-w-[400px] bg-black border border-[#1a1a1a] rounded-[16px] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-20px] opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-4 flex flex-col gap-3">
            <a
              href="#catalog"
              className="text-white hover:text-cyan-400 transition-colors py-3 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Каталог
            </a>
            <a
              href="#authors"
              className="text-white hover:text-cyan-400 transition-colors py-3 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Авторы
            </a>
            <a
              href="#library"
              className="text-white hover:text-cyan-400 transition-colors py-3 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Библиотека
            </a>
            <a
              href="#community"
              className="text-white hover:text-cyan-400 transition-colors py-3 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Сообщество
            </a>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:opacity-90 rounded-lg w-full mt-2"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",
                letterSpacing: "0.56px",
                height: "48px",
                borderRadius: "8px",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              ВОЙТИ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}