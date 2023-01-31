import React, { useState } from 'react'
import ImageUploading from "react-images-uploading"
import avatar from "../../../../../img/profile/avatar.jpg"
import { RiAddCircleFill } from 'react-icons/ri';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import RegisterRequest from '../../../../../utils/querys/RegisterRequest';
import useInput from '../../../../../utils/customHooks';
import Alerta from '../../../../../utils/sweetAlert/Alerta';




export default function CardProfile() {

  


  const [images, setImages] = useState([]);
  const [error,setError]=useState("")
  const maxNumber = 69;
  const name = useInput();
  const email = useInput();
  const password = useInput();
  const age = useInput();
  const rol = useInput();
 
  const onChange = (imageList) => {

    setImages(imageList);
  };

  const create = async (formData) =>{
    
  try{
    const {error, data } = await RegisterRequest(formData)

    if(error){
      if (data.includes("Email already registered")){
        Alerta("You already have an account registered with this email", "error");
    }return setError(data)
    }
  }
  catch (error) {;
    console.log(error)
    }
  }
  const handleCreate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", images[0]?.file);
    formData.append("name", name.value.toLowerCase());
    formData.append("email", email.value.toLowerCase());
    formData.append("password", password.value.toLowerCase());
    formData.append("age", age.value.toLowerCase());
    formData.append("rol", rol.value.toLowerCase());
  
    create(formData)
 
  };


  return (

  <>
  
    <form className='formProfile'  onSubmit={handleCreate} encType="multipart/form-data">

      {error && 
    
        <div style={{
          "textAlign":"center",
          "paddingBottom":"20px",
          "color":"red"}}>  
          {error}
        </div>
       }

      <div className="avatar">
         <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg"]}
            >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              dragProps
            }) => (
            

          <>
          {images.length ? 

          <div className="upload__image-wrapper">
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
              </div>
            ))}
            <div className='remove' onClick={onImageRemoveAll}>
              <MdOutlineRemoveCircle className='remove'/>
            </div>           
          </div>

          :
        
          <div className="upload__image-wrapper">
            <img src={avatar} alt="" width="300px" />
            <div className='add'  onClick={onImageUpload}  {...dragProps}  >
            <RiAddCircleFill className='add_icon'/>
            </div>  
          </div>
          }

          </>

        )}
        </ImageUploading>
      </div>

      <div className='item'>
        <label className='label'>Name</label>
        <input className='input' name='name' type="text" {...name} />
        <div  className= {error.includes("name") ? "lineError" : "line"}></div>
      </div>


      <div className='item'>
        <label className='label'>Email</label>
        <input className='input'name='email' type="email" {...email} />
        <div  className= {error.includes("email") ? "lineError" : "line"}></div>
      </div>

    
    

      <div className='item'>
        <label className='label'>Password</label>
        <input className='input' name='password' type="password" {...password} />
        <div  className= {error.includes("password") ? "lineError" : "line"}></div>
      </div> 

      <div className='item'>
        <label className='label'>Age</label>
        <input className='input'  name='age' type="text"  {...age} />
        <div className='line'></div>
      </div>

      <div className='item'>
      <label className='label'>Rol</label>
          <select className='select'  name='rol' {...rol}  >
            <option label=""></option>
            <option >Mentor</option>
            <option >Mentee</option>
        </select>
        <div  className= {error.includes("rol") ? "lineError" : "line"}></div>
      </div>

      <input  className="button" type="submit" value="Create"  />
      
    </form>
       
   </>

  )
}



