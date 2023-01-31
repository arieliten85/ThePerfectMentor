

export default async function userFilter(user,userPages) {


    try{
        if(user.rol === "User"){ 
            const admin = userPages.filter( item => item.rol !== "User")
            return { error: false, data: admin };
            }
            if(user.rol === "Mentee"){ 
            const mentores = userPages.filter( item => item.rol === "Mentor")
            return { error: false, data: mentores };
            }
            if(user.rol === "Mentor"){ 
            const mentees = userPages.filter( item => item.rol === "Mentee")

           
           

            return { error: false, data: mentees };

            //console.log(mentor)
            
            }
  
    }
    catch (error) {;
    return { error: true, data: error.response.data };
    }
}