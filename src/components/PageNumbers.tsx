import { useEffect, useState } from "react";
import Header from '@/components/Header'
import {FaAngleDoubleLeft} from "react-icons/fa"
import {FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa"

type PageNumbersProps = {
    numberOfPages: number,
    handlePageChange: (pageNumber: number) => void
};

import styles from "@/styles/pagenumber.module.css";
import Head from "next/head";

let currentPageStart = 1
export default function PageNumbers(props: PageNumbersProps){
    console.log({props});

    let [currentPage, setCurrentPage] = useState(1);
    let [pagesToShow, setPagesToShow] = useState<number[]>([]);

    useEffect(() => {
        setAllPages(1)
    }, [])

    type direction = {
        move: string
    }

    function setAllPages(start: number): void{
        let temp = []
        currentPageStart = start
        let end = props.numberOfPages;

        if((start + 4) <= props.numberOfPages){
            end = start + 4
        }

        for(let i=start;i<=end;i++){
            temp.push(i);
        }

        console.log({start, end});
        

        if(start === 1){
            document.getElementById("fullLeft")?.classList.add("disable")
            document.getElementById("left")?.classList.add("disable")
        }

        if(end >= props.numberOfPages){
            document.getElementById("fullRight")?.classList.add("disable")
            document.getElementById("right")?.classList.add("disable")
        }

        setPagesToShow(temp)
    }

    function movePagesColumn(toMove: direction): void{
        const move = toMove.move;

        if(move === "cleft"){
            setAllPages(1);
            document.getElementById("fullRight")?.classList.remove("disable")
            document.getElementById("right")?.classList.remove("disable")
        }
        
        else if(move === "left"){
            if(currentPageStart - 5 < 0){
                document.getElementById("fullLeft")?.classList.add("disable")
                document.getElementById("left")?.classList.add("disable")
                document.getElementById("fullRight")?.classList.remove("disable")
                document.getElementById("right")?.classList.remove("disable")
                setAllPages(1);
            }else{
                
                console.log(document.getElementById("left")?.classList);
                document.getElementById("fullRight")?.classList.remove("disable")
                document.getElementById("right")?.classList.remove("disable")
                
                setAllPages(currentPageStart - 5);
            }
        }

        else if(move === "right"){
            if(currentPageStart + 5 > props.numberOfPages){
                document.getElementById("fullLeft")?.classList.remove("disable")
                document.getElementById("left")?.classList.remove("disable")
                setAllPages(props.numberOfPages - 4);
            }else{
                setAllPages(currentPageStart + 5);
                document.getElementById("fullLeft")?.classList.remove("disable")
                document.getElementById("left")?.classList.remove("disable")
            }
        }

        else{
            setAllPages(props.numberOfPages - 4)
            document.getElementById("fullLeft")?.classList.remove("disable")
            document.getElementById("left")?.classList.remove("disable")
        }
    }
    
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm" crossOrigin="anonymous" />
            </Head>
            <div className={styles.container}>
                <div className={styles.pages}>
                    <span className={styles.icon} id="fullLeft" onClick={() => movePagesColumn({move: "cleft"})}><FaAngleDoubleLeft /></span>
                    <span className={styles.icon} id="left" onClick={() => movePagesColumn({move: "left"})}><FaAngleLeft /></span>
                    {
                        pagesToShow.map((page: number) => {
                            if(page !== currentPage)
                                return <span key={page} className={styles.icon} id={page.toString()} onClick={() => {props.handlePageChange(page); setCurrentPage(page)}}>{page}</span>

                            return <span key={page} className={`${styles.icon} ${styles.active}`} id={page.toString()} onClick={() => {props.handlePageChange(page); setCurrentPage(page)}}>{page}</span>
                        })
                    }
                    <span className={styles.icon} id="right" onClick={() => movePagesColumn({move: "right"})}><FaAngleRight /></span>
                    <span className={styles.icon} id="fullRight" onClick={() => movePagesColumn({move: "cright"})}><FaAngleDoubleRight /></span>
                </div>
            </div>
        </>
        
    )
}