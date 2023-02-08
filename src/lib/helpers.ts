import { HomeDataTypes } from "./types";

export const handlePageChange = (pageNumber: number, number_of_pages: number, pageSize: number, completeData: HomeDataTypes[]) => {
    let entries: HomeDataTypes[];
    if(pageNumber === number_of_pages){
      const start = ((pageNumber - 1) * pageSize)
      const end = completeData.length;
      ({start, end});
      
      entries = completeData.slice(start, end);
    }else{
      const start = pageSize * (pageNumber - 1)
      entries = completeData.slice(start, start + pageSize);
    }

    return entries;
  }