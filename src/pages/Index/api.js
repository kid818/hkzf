import request from "../../utils/http";

export const getSwiper = ()=>{
    return request(`/home/swiper`)
}
export const getGroups = ()=>{
    return request(`/home/groups?area=AREA%7C88cff55c-aaa4-e2e0`)
}
export const getNews = ()=>{
    return request(`/home/news?area=AREA%7C88cff55c-aaa4-e2e0`)
}