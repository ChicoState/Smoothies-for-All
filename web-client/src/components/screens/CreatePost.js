import React,{useState, useEffect} from "react";
import M from 'materialize-css';
import {useNavigate} from 'react-router-dom';
import '../../App.css'

const CreatePost = ()=>{
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [tags, setTags] = useState([])
    const smoothieTags = ["Healthy", "Dessert", "High Protein", "Fruits", 
                        "Vegatable", "Breakfast", "Lunch"]

    const ingredientsObjects = ingredients.map(ingredient => {
        return {
            text: ingredient
        };
    });

    const tagsObjects = tags.map(tag => {
        return {
            text: tag
        };
    });

    useEffect(() => {
        //console.log(tags)
        if (url) {
            fetch('/create',{
                method:"post",
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':"Bearer "+localStorage.getItem("jwt")
                },
                
                body:JSON.stringify({
                    title,
                    body,
                    ingredients:ingredientsObjects,
                    tags:tagsObjects,
                    photo:url,
                })
            })
            .then(res => res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error})
                }
                else{
                    data.message ? M.toast({ html: data.message }) : console.error("No message received from the server");

                    navigate('/')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    
    }, [url])
    
    const postDetails = ()=> {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset", "smoothiesforall")
        data.append("cloud_name", "dnu53vuwj")
        fetch("https://api.cloudinary.com/v1_1/dnu53vuwj/image/upload", {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then (data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    return(
        
        <div className="card input-filed"
        
        style={{
            margin: "10px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}
        >
            <input
                type="text"
                placeholder="title" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            {/* <input 
                type="text"
                placeholder="body"   
                value={body}
                onChange={(e)=>setBody(e.target.value)}
            /> */}
            <form>
                <textarea 
                placeholder="body"   
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                />
            </form>

            
            <div className="add_ingredient">                
                <input
                    type="text"
                    placeholder="Ingredient"   
                    value={ingredient}
                    onChange={(e)=>setIngredient(e.target.value)}
                />
                <i className="material-icons"
                onClick={()=>{
                    if (ingredient !== "") {   
                        ingredients.push(ingredient)
                    }
                    setIngredient("")
                }}
                >add</i>
            </div>

            
            <div className="added_ingredients">
                {ingredients.map(item => {
                    return(
                        <div className="edit_ingredients" key={item}>
                            <li>{item}</li>
                            <i className="material-icons"
                            onClick={()=>{
                                const index = ingredients.indexOf(item);
                                if (index > -1) { 
                                  ingredients.splice(index, 1); 
                                }
                                const newIngredients = ingredients.filter(ingredient => ingredient !== item);
                                setIngredients(newIngredients);
                            }}
                            >remove</i>                          
                        </div>     
                    )                 
                })}
            </div>

            

            <p>Tag your smoothie!</p>
            <div className="tag_smoothies">
                {smoothieTags.map(item => {
                    return(
                        <div className="click_tags" key={item}>
                            <li>{item}</li>
                            {tags.includes(item)
                            ? <i className="material-icons"
                                onClick={()=>{
                                    const index = tags.indexOf(item)
                                    if (index > -1) { 
                                        tags.splice(index, 1)
                                    }
                                    const newTags = tags.filter(tag => tag !== item)
                                    setTags(newTags)
                                }}
                                >remove</i>
                            :
                                <i className="material-icons"
                                onClick={()=>{
                                    const newTags = [...tags, item]; 
                                    setTags(newTags);
                                }}
                                >add</i>
                            }                        
                        </div>     
                        )                 
                    })}

            </div>

            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light" 
                    onClick={()=>{                     
                        postDetails()           
                    }}
            >CreatePost</button>
        </div>
    )
}

export default CreatePost