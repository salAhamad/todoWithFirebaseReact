
export const currentDateAndTime = () => {        
    const time = new Date().toLocaleString("en-us", {
        hour: "2-digit", 
        minute: "2-digit"
    }).split(' ').join('').toLocaleLowerCase();

    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    
    return `${dd}/${mm}/${yyyy}, ${time}`
};

