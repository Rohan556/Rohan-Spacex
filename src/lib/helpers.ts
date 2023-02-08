import { HomeDataTypes } from "./types";

export const handlePageChange = (pageNumber: number, number_of_pages: number, pageSize: number, completeData: HomeDataTypes[]) => {
    console.log(pageNumber, number_of_pages);
    let entries: HomeDataTypes[];
    if(pageNumber === number_of_pages){
      const start = ((pageNumber - 1) * pageSize)
      const end = completeData.length;
      console.log({start, end});
      
      entries = completeData.slice(start, end);
    }else{
      const start = pageSize * (pageNumber - 1)
      entries = completeData.slice(start, start + pageSize);
    }

    return entries;
  }