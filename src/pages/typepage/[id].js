
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


/*
  const articoliOld = async(id)=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      let idc = 'fsdfsfsdfsdf'
      const APOLLO_QUERY = gql`
      query MyQuery {
        project(where: {id: "cloisgr2g2n5q0bwdwj1syq4s"}) {
          id
          title
          gallery {
            url
          }
        }
      }
      
      
      `;

        const variables = {
            first: 20,
            skip:0
          };

        const projectXpage = await graphcms.request(APOLLO_QUERY,variables)

        console.log(projectXpage.projects);
        setPost(projectXpage.project.gallery)

  }
  */

  const articoli = async (id) => {
    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    // Modifica la query per accettare una variabile
    const APOLLO_QUERY = gql`
        query MyQuery($projectId: String!) {
            collectibles(where: {collectibleType: {name: $projectId}}) {
                id
                title
                slug
                gallery{
                  url
                }
                
              }
        }
    `;

    const variables = {
        projectId: id, // Utilizza la variabile 'id' passata alla funzione
    };

    const projectXpage = await graphcms.request(APOLLO_QUERY, variables);

    console.log('vediamo pro');
    console.log(projectXpage.collectibles);
    setPost(projectXpage.collectibles);

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
      
      
     <div  class="flex-container" id="collectibleContainer">
     {post?.map((o,i)=>{
        return(
            
            <div  style={{ flex: '30%'}} key={'progetto_'+i} >
                <Link href={{
    pathname: '/collectiblepage/'+ o.slug
  }}> 
    <Image class='portCover'
      src={o.gallery[0].url}
        alt="Description of the image"
        width={200} // larghezza dell'immagine
        height={200} // altezza dell'immagine
      />
            <h1 class='titleProjBrand'>{o.title}</h1>

</Link>
            
            </div>

        )
    })}
 <div class='nameBar'>
         <h1>{router.query.id}</h1>
    <Link href="/about">
    <h1>{post?.title}</h1>
       </Link> 
    </div>
   

   
     
    


    
      </div>
     </div>

     </div>

  )

 
}




