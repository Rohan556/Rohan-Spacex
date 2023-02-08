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
    console.log({datas})
    
    let allPaths: StaticPathsType = datas.data?.launches.map((launch:HomeDataTypes) => {
      // console.log(launch);
      
        return {
            params: {
                id: launch.id, link: launch.links.video_link
            }
        }
    })

    //console.log(allPaths);
    
    return {
      paths: allPaths,
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  export async function getStaticProps(context:ContextTypes) {
    console.log({context});
    const id: string = context.params.id
    
    const queryString = `
    query{
        launch(id: "${id}") {
          details
          launch_date_local
        }
      }
    `
    // console.log({queryString});
    
    
    let data = await getData(queryString)

    
    return {
      // Passed to the page component as props
      props:data ,
    }
  }

function Launch(props: LaunchPropsTypes){
    console.log({props});
    
    const router = useRouter();

    const { id } = router.query

    console.log({router: router.asPath.split("?")});

    const splitArray = router.asPath.split("?")

    console.log(splitArray[2]?.slice(2));
    
    const videoLink = splitArray[1]?.split("link=")[1]?.slice(0,-5)+ "embed/" + splitArray[2]?.slice(2)

    const [videoLinks, setVideoLinks] = useState("")

    useEffect(() => {
      setVideoLinks(videoLink)
    }, [])

    console.log(videoLink);
    
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
