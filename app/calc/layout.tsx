import s from "./layout.module.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
            <div className={s.shell}>
                  
                  <div className={s.header}>Hesaplama işlemleri burada yürütülecek...</div>
                  <div className={s.menu}>Menü</div>
                  <div className={s.contents}> {children} </div>
                  <div className={s.footer}>  Footer </div>

              </div>
    
  )
}
