export const generateBackground=(name) =>{
    let hash = 0;
    let i;

    for (i = 0; i < name?.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

 export const changeBGColor=(value)=>{
  
    if(value  ==="To Do")  {
        return "#FFEAA7";
       
    } else if(value  ==="Doing") {
        return "#CDFADB";
    } 
    else  {
      return "#D64E52";
  }
}