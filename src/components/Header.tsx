import styles from "../styles/header.module.css"
import MenuIcon from "@/public/static/MenuIcon.png"
import CloseIcon from "@/public/static/Close.png"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

function Header(){

    const Menus: string[] = ["Home", "About"]
    const [open, setOpen] = useState<boolean>(false)

    return(
    <div className={styles.header}>
        <div className={styles.headerContent}>
            <p className={styles.icon}>SpaceX</p>      
            <div>
                <div className={styles.mobileView}>
                    <div className={styles.mobile} >
                        <Image src={open ? CloseIcon : MenuIcon} alt="Icon" className={styles.openIcon} onClick={() => setOpen(!open)}/>
                        {
                            open && <ul className={styles.mobileMenu}>
                                {
                                    Menus.map((menu: string) => {
                                        let href = "/" + (menu === "Home" ? "" : menu.toLocaleLowerCase());
                                        return <li key={menu} className={styles.menuOption}><Link href={href} className={styles.link}>{menu}</Link></li>
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
                <div className={styles.desktopView}>{
                    <ul className={styles.desktopMenu}>
                        { 
                            Menus.map((menu) => {
                                let href = "/" + (menu === "Home" ? "" : menu.toLocaleLowerCase());
                                return <li key={menu} className={styles.menuOption}><Link href={href} className={styles.link}>{menu}</Link></li>
                            })
                        }
                    </ul>
                    }
                </div>
            </div>
        </div>
        <hr className={styles.divider}/>  
    </div>)
}

export default Header;
