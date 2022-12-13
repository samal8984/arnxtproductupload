
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Products = () => {
  let id = new Date();
   const sec= id.getMilliseconds().toString();

   
   
  const [productname, setProductName]= useState('');
  const [productdescription, setProductDescription]= useState('');
  const [productprice, setProductPrice]= useState('');
  const [currency, setCurrency]= useState('');
  const [message,setMessage]= useState(null);
  const registerUrl= 'https://7ufiupng0k.execute-api.ap-south-1.amazonaws.com/sellerupload/productsadd';
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState(null)

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [imageArray, setImageArray]= useState([]);
  const [imageupload, setImageUpload] =useState(false)


  const submitHandler=(event)=>{
    event.preventDefault();
    if(productname==='' || productdescription=== '' || productprice==='' || currency===''){
      setMessage(' All fields are Required');
      return
    }
    const requestConfig={
      headers:{
        'Content-Type':'Application/json'
      }
    }
  

    
    const requestBody={
      productname: productname,
      productdescription: productdescription,
      productprice: productprice,
      currency: currency,
      product_id: "254"
    }
    axios.post(registerUrl,requestBody).then((response) => {
      setMessage(' Registration Successful')
    }).catch(error=>{
      if(error.response.status=== 401 || error.response.status === 403){
        setMessage(error.response.data.message)
      }else{
        setMessage('sorry backend server is down');
      }
    })
    

  }

 

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }


 
  
 

  
  


 useEffect=(()=>{



 
 

 

 },[])

 

 

  const onChange = e => {
  
  

    
   const files = Array.from(e.target.files) 
   
  files.forEach(file => {
    fileToBase64(file, (err, result) => {
      if (result) {
        setFile(result)
        setFileName(file)
        
      }
    })
    
    
    
    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2) {
            setImagesPreview(oldArray => [...oldArray, reader.result])
            setImages(oldArray => [...oldArray, file])
        }
    }
    
    reader.readAsDataURL(file)
})

 
 
}









  function uploadImages(e) {
    for(let i=0; i< images.length;i++){
      
    const url= 'https://fzfxsebcef.execute-api.ap-south-1.amazonaws.com/default/imagesUpload';
    fetch(url,{
      method: "POST",
      body: images[i].name
  

    }).then((res)=>res.json())
       .then((res)=>{
      
      


      
      
        fetch(res.uploadURL, {
          
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg"
          },
    
        body: images[i]
    
        })
           .then((res)=>{
            if(res.status === 200){
              setImageUpload(true);
              setMessage('Images Uploaded Successfully');
              setTimeout(()=>{
                setMessage('')
              },3000)
            
            
            }
           })
           .catch((err)=>console.log(err))
         
       })
       .catch((err)=>console.log(err))
      
  }

      
    }  
   
    
    
   
 



  



  return (
    <div >
        <div className='navbar'>
            <div style={{display:'flex', alignItems:' left'}}>
            <h5 style={{color:'white', fontSize:'30px', margin:' 20px'}} 
            >Product Upload</h5>
            

  
            </div>
           

         </div>

    
    <div style={{display:'flex',marginTop:'15px',marginBottom:'20px'}}>

      <div style={{display:'flex', 
      marginRight:'80px',
      borderRadius:'10px',
      height:'500px',
       width:'350px', border:' 1px solid red',backgroundColor:'black',
       flexDirection:'column'}} >
            <div style={{borderBottom:'2px solid gray',width:'90%',display:'flex',height:'60px',
        marginLeft:'20px', marginBottom:' 25px'}}> 
                <h3 style={{color:'white'}}>
                    Products
                </h3>
            </div>
            <div style={{display:'flex',marginLeft:'15px'}}>
                <div style={{display:'flex',justifyContent:'space-between'
                ,borderBottom:'1px solid gray',width:'90%'}}>
                    <div>
                <h3 style={{color:'gray'}}>Product Name</h3>


                    </div>
                    <div>
                <img src='' alt='' style={{height:'50px',width:'60px'}}/>


                    </div>


                </div>
            </div>

      </div>

        <div>
       
         <div style={{width:' 800px', border:''}} >
            <h4 style={{fontSize:'25px',color:'gray'}}>Please Add Your Products</h4>
           <div  style={{display:'flex', alignItems:'center', justifyContent:'center'}}>

          
            <form className="row g-3" style={{border:''}}  onSubmit={submitHandler} >

            <div style={{display:'flex',height:'auto',width:'auto',
        alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'column',
        margin:' 20px', marginBottom:' 20px' }}>
  <div className="">
    <div style={{display:'flex'}}>
    <label htmlFor="inputEmail4" 
     className="form-label">Product Name</label>


    </div>
    <input type="text" style={{width:'270px',
    borderRadius:'5px', border:'2px solid rgb(219, 189, 189)'}} value={productname} onChange={event=> setProductName(event.target.value) } 
    className="form-control" id="inputEmail4"/>
  </div>
  <div className="">
    <div style={{display:'flex'}}>
    <label htmlFor="inputEmail4" 
      className="form-label">Description</label>


    </div>
    <textarea type="text"   value={productdescription}
     onChange={event=> setProductDescription(event.target.value)} style={{width: '270px', height:'100px',
     borderRadius:'5px',
     border:'2px solid rgb(219, 189, 189)'}} className="form-control" id="inputEmail4"  />
  </div>
  <div className="">
    <div style={{ display:' flex'}}>
    <label for="inputEmail4" className="form-label" >Price</label>


    </div>
    <input type="number" value={productprice} style={{border:'2px solid rgb(219, 189, 189)', borderRadius:'5px',}}
    onChange={event=>setProductPrice(event.target.value)} className="form-control" id="inputEmail4"/>
  </div>
  <div className="" style={{margin:' 20px',width:'300px',display:'flex', marginLeft:''}} >
    
    <label for="inputState" className="form-label" style={{marginRight:' 5px'}}>Currency</label>


    
    <select id="inputState" value={currency} onChange={event=>setCurrency(event.target.value)}
     className="form-select" style={{width:'120px',border:'2px solid rgb(219, 189, 189)',color:'gray',
     borderRadius:'5px'}}>
      <option  selected>Choose...</option>
      <option>$ USD</option>
      <option>₹ INR</option>
      <option> EURO</option>
      <option> USD</option>

    </select>
  </div>
  <div style={{marginLeft:'',marginBottom:'15px'}} >
  <div style={{ display:' flex'}}>
   


    </div>
    <div className='fileinput'>
   
  <label htmlFor='b1' style={{backgroundColor:'#eb91dc', border:'2px solid gray',
    borderRadius:'5px', width:'130px'}} >
      Select Images
    <input type="file"  onChange={onChange} name="upfile" id="b1" multiple/>
  </label>

    </div>
   
  </div>
  <div style={ imageupload ?{display:'none'}: {width:'100%',height:'100%',border:'',display:'flex'}}
   className="imagediv">
    {imagesPreview.map(img=>(
    <img src= {img} key={img} alt= 'Images Preview' style={{width:'80px', height:' 120px',margin:'10px',
     borderRadius:'10px'}} />


    ))}
  </div>

  <div className=""  style={{marginLeft:' 250px',marginTop:'50px',marginBottom:'30px'}}>

    <button type="submit" className="btn btn-primary">Submit</button>
  </div>

  <div style={{marginLeft:'150px'}} >
  <p style={{}} >{message && <p style={{color:'red', fontSize:'15px'}} >Alert: {message} </p>}</p>


  </div>
  </div>
 
  </form>

  
  <div   style={images.length === 6 ?{display:'flex', marginLeft:'30px', marginTop:'250px' }: {display:'none'} }>
              <button  onClick={uploadImages} style={imageupload ? {display:'none'}:{backgroundColor: 'green',
              width:'90px', height:'50px', border:'2px solid black', borderRadius:'15px'
              }} >Send Images</button>
            </div>
  </div>
  
   

            </div>
           
     
           



        </div>
       
       

    </div>
 
 
    <div>
    
   
    </div>
    <div style={{width:'100%', height:'30px', position:'sticky',
      bottom:'0px',display:'flex', backgroundColor:'gray', alignItems:'center',justifyContent:'center'}}>
        <div>
        <p style={{fontSize:'20px',color:'white'}}>CopyRight@arnxt.com</p>


        </div>


    </div>
    </div>
  )
}

export default Products