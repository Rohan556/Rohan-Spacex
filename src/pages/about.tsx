import Header from "@/components/Header";
import styles from "@/styles/about.module.css"

function About(){
    return <>
        <Header /> 
        <div className={styles.container}>
            <h1>About</h1>
            <p>This website intends to use SpaceX open API as a source to display the content.</p>
        </div>
    </>
}

export default About;