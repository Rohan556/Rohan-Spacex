import styles from "@/styles/card.module.css"
import { useRouter } from "next/router"
import { CardPropTypes } from "@/lib/types";

export default function Card(props: CardPropTypes){
    ({props});
    
    const router = useRouter()

    const handleClick = () => {
        router.push(`/launch/${props.data.id}?link=${props.data.links.video_link}`,undefined,  {shallow: true})
    }
    return (
        <div className={styles.container} onClick={() => handleClick()}>
            {/* <Image src={spaceImage} alt="spacex" className={styles.image}/> */}
            <h1 className={styles.missionName}>{props.data.mission_name}</h1>
            <hr className={styles.divider}/>
            <div className={styles.card_content}>
                <h5 className={styles.links} >Related Links</h5>
                <div className={styles.link_container}>
                    <a href={props.data.links.video_link} className={styles.link}>Video Link</a>
                    <a href={props.data.links.article_link} className={styles.link}>Article Link</a>
                    <a href={props.data.links.wikipedia} className={styles.link}>Wikipedia</a>
                </div>
            </div>
        </div>
    )
}