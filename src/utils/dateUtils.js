export function formateDate(time) {
    if(!time){
        return '';
    }
    let date =new Date(time);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay()+" "
    +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}