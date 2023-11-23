
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'



export default function Blog() {


  const router = useRouter()

  const [post , setPost ] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);



  const articoli = async (id) => {
    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    // Modifica la query per accettare una variabile
    const APOLLO_QUERY = gql`
        query MyQuery($projectId: String!) {
          collectibles(where: {slug: $projectId}) {
                id
                title
                gallery {
                    url
                }
                collectibleType {
                  name
                }
              
            }
        }
    `;

    const variables = {
        projectId: id, // Utilizza la variabile 'id' passata alla funzione
    };

    const projectXpage = await graphcms.request(APOLLO_QUERY, variables);

    console.log('vediamo pro');
    console.log(projectXpage.collectibles[0]);
    setPost(projectXpage.collectibles[0]);

    console.log('ei')
    console.log(post.gallery)

}



  useEffect(()=>{
     //articoli()

  },[])

  useEffect(()=>{
    console.log('mostra');
    console.log(router.query.id);
    if(router.query?.id){
        articoli(router.query.id)
    }
    
 

  },[router])



  return (
<div>
<div class='header'>
   <div class='logo'>
      <Link href="/">
       <img class='logoImg' src="/LogoTognon.png"/>
      </Link>
    </div>

    <div class="menu">
      <Link href="/projects">
      <h3  class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 style={{marginRight:0}} class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>

    <div class="menuMobile" style={{ display: isMenuVisible ? 'flex' : 'none' }}>
      <Link href="/projects">
      <h3 class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>

    <div class='divHam'>
    <img class='hamburger'  onClick={() => setIsMenuVisible(!isMenuVisible)} style={{ display: isMenuVisible ? 'none' : 'block' }} src='/hamburger-menu-5.png'/>
    </div>

   </div>
     <div class='contentArea'>
      
     

     <div  class="flex-container" id="flexContainer">
   
    {post?.gallery?.map((o,i)=>{
        return(
          

            <Image class="galleryImg" 
            src={o.url}
            alt="Description of the image"
            width={600} // larghezza dell'immagine
            height={400} // altezza dell'immagine
          />

        )
    })}


    
      </div>

      <div class='nameBar'>
    <h1 >{post?.title}</h1>
                 <Link href={{
    pathname: '/typepage/'+ post?.collectibleType?.name
  }}> 
    <h1>{post?.collectibleType?.name}</h1>
       </Link> 
    </div>

   
     </div>

     </div>

  )

 
}




