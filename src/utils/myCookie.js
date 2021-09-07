

 //添加cookie
 export function setCookie(name,value,time){ 
    var date= new Date(); 
    date.setDate(date.getDate()+time); 
    document.cookie = name+"="+value+";expires="+date; 
} 

//获得cookie
export function getCookie(name){ 
    var arr = document.cookie.split(";"); 
    for(var i=0; i<arr.length; i++){ 
    var arr2 = arr[i].split("="); 
    // console.log(arr2);
    // 防止有空格干扰
        if(arr2[0].trim() === name){ 
            // console.log(arr2[1]);
            return arr2[1]; 
        } 
    } 
    return false; 
} 

 //删除cookie
 function removeCookie(name){ 
    setCookie(name,"",0) 
} 
