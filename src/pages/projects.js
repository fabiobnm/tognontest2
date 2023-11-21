import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';




export default function Blog() {

  const [post , setPost ] = useState([])


  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      const APOLLO_QUERY = gql`
      query MyQuery($first: Int, $skip: Int) {
        projects(first: $first, skip: $skip) {
          id
          title
          gallery {
            url
          }
          slug
        }
      }
    `;

        const variables = {
            first: 20,
            skip:0
          };

        const projectXpage = await graphcms.request(APOLLO_QUERY,variables)

        console.log(projectXpage.projects);
        setPost(projectXpage.projects)

  }



  useEffect(()=>{
    articoli()

  },[])



  return (
<div>
   <div class='header'>
   <div class='logo'><Link href="/">
    <img class='logoImg' src="/LogoTognon.png"/>
    </Link>
    </div>
    <div class="menu">
    <Link href="/projects">
    <h3 class='voceMenu' style={{textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}}>PROJECTS</h3>  
    </Link>
    <Link href="/collectible">
      <h3 class='voceMenu'>COLLECTIBLE</h3> 
      </Link>

      <Link href="/about">
       <h3 class='voceMenu'>ABOUT</h3>  
       </Link>   
        </div>

   </div>
     <div class='contentArea'>
      
     <div style={{paddingRight:'50px'}} class="flex-container" id="projectsContainer">
    {post.map((prog,i)=>{
        return(
      <div style={{ flex: '30%'}} key={'progetto_'+i} class="flex-item">

<Link
  href={{
    pathname: '/projectpage/'+ prog.slug
  }}> 
   <Image class="projCover"
        src={prog.gallery[0].url}
        alt="Description of the image"
        width={300} // larghezza dell'immagine
        height={200} // altezza dell'immagine
      />


</Link>
      <h1 class='titleProjMobile' >{prog.title}</h1>
      </div>
    )
})}
      </div>
     </div>

     </div>

  )

 
}
