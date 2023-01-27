import styles from "../styles/header.module.css"
import MenuIcon from "@/public/static/MenuIcon.png"
import Image from "next/image"

function Header(){

    const Menus: string[] = ["Home", "About"]

    return(
    <div className={styles.header}>
        <div className={styles.headerContent}>
            <p className={styles.icon}>SpaceX</p>      
            <div>
                <div className={styles.mobileView}>
                    <div className={styles.mobile} >
                        <Image src={MenuIcon} alt="Icon" className={styles.openIcon} />
                        <ul className={styles.mobileMenu}>
                            {
                                Menus.map((menu: string) => {
                                    return <li key={menu} className={styles.menuOption} >{menu}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles.desktopView}>
                    <ul className={styles.desktopMenu}>
                        {
                            Menus.map((menu) => {
                                return <li key={menu} className={styles.menuOption}>{menu}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
        <hr className={styles.divider}/>  
    </div>)
}

export default Header;
