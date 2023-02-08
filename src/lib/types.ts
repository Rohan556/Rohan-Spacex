type links = {
    video_link: string;
    article_link: string;
    wikipedia: string;
    __typename: string;
}

export type HomeDataTypes = {
    __typename: string;
    id: string;
    links: links;
    mission_name: string;
  };
  
export type HomePropTypes = {
    data: {
      launches: HomeDataTypes[]
    };
    loading: boolean;
    networkStatus: 7
}
  
export type StaticPathsType = {
    params:{
        id: string;
        link: string;
    }
}  

export type ContextTypes = {
    params: {
        id: string;
    }
}

export type LaunchPropsTypes = {
    data: {
        launch: {
            details: string;
            launch_date_local: string;
            __typename: string;
        }
    }
}

export type CardPropTypes = {
    data: {
        id: string;
        links: links;
        mission_name: string;
    }
}