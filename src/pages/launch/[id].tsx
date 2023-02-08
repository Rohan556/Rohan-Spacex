import { useRouter } from "next/router";
import getData from "@/lib/ApolloService";
import Header from "@/components/Header";
import styles from "@/styles/launch.module.css"
import { useEffect, useState } from "react";
import { HomeDataTypes, StaticPathsType, HomePropTypes, ContextTypes, LaunchPropsTypes } from "@/lib/types";

export async function getStaticPaths() {

    const queryString = `
        query {
          launches {
            id
            mission_name
            links {
              video_link
              article_link
              wikipedia
            }
          }
        }
      `
    let datas:any = await getData(queryString)
    let allPaths: StaticPathsType = datas.data?.launches.map((launch:HomeDataTypes) => {
      // (launch);
      
        return {
            params: {
                id: launch.id, link: launch.links.video_link
            }
        }
    })

    //(allPaths);
    
    return {
      paths: allPaths,
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  export async function getStaticProps(context:ContextTypes) {
    const id: string = context.params.id
    
    const queryString = `
    query{
        launch(id: "${id}") {
          details
          launch_date_local
        }
      }
    `
    // ({queryString});
    
    
    let data = await getData(queryString)

    
    return {
      // Passed to the page component as props
      props:data ,
    }
  }

function Launch(props: LaunchPropsTypes){
    const router = useRouter();

    const { id } = router.query

    const splitArray = router.asPath.split("?")
    
    const videoLink = splitArray[1]?.split("link=")[1]?.slice(0,-5)+ "embed/" + splitArray[2]?.slice(2)

    const [videoLinks, setVideoLinks] = useState("")

    useEffect(() => {
      setVideoLinks(videoLink)
    }, [])
    
    return (
      <>
        <Header />
        <div className={styles.container}>
          <iframe src={`${videoLinks}`} className={styles.iframe}/>
          <h1 className={styles.details}>Information</h1>
          <p className={styles.properties}><span className={styles.heading}>Detail:</span> {props.data.launch.details}</p>
          <p className={styles.properties}><span className={styles.heading}>Launch Date:</span> {props.data.launch.launch_date_local}</p>
        </div>
      </>
     
    ) 

}

export default Launch
