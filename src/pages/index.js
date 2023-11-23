
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';



export default function Blog() {

  const [post , setPost ] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);



  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      const APOLLO_QUERY = gql`
      query MyQuery($first: Int, $skip: Int) {
        projects(first: $first, skip: $skip) {
          id
          title
          slug
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
        console.log(projectXpage.projects.length);
        console.log(projectXpage.projects[Math.floor(Math.random() * projectXpage.projects.length)])

        setPost(projectXpage.projects[Math.floor(Math.random() * projectXpage.projects.length)])

        console.log('ciao')
        console.log(projectXpage.projects[0].gallery[0].url)

        var cover = projectXpage.projects[0].gallery[0].url
        console.log('cover')

        console.log(cover)

  }



  useEffect(()=>{
    articoli()

  },[])



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
      <h3 class='voceMenu'>PROJECTS</h3>  
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
       <h3 style={{marginRight:0}} class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>
    <div class='divHam'>
    <img class='hamburger'  onClick={() => setIsMenuVisible(!isMenuVisible)} style={{ display: isMenuVisible ? 'none' : 'block' }} src='/hamburger-menu-5.png'/>
    </div>

   </div>
     <div class='contentArea'>
     <div class="flex-container" id="projectsContainer">
     <Link
  href={{
    pathname: '/projectpage/'+ post.slug
  }}> 
 <Image class='indexCover' src={post?.gallery && post.gallery[0]?.url}
        alt="Description of the image"
        width={600} // larghezza dell'immagine
        height={400} // altezza dell'immagine
      />
      </Link>

    

      </div>
     </div>

     </div>

  )

 
}
