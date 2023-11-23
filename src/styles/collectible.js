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
        collectibles(first: $first, skip: $skip) {
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

        console.log('colll');
        console.log(projectXpage.collectibles);
        setPost(projectXpage.collectibles)

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
        <h3 style={{textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}} class='voceMenu'>COLLECTIBLE</h3> 
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
        <h3 style={{textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}} class='voceMenu'>COLLECTIBLE</h3> 
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
      
     <div class="flex-container" id="collectibleContainer">
     {post.map((prog,i)=>{
        return(
      <div style={{ flex: '30%'}} key={'progetto_'+i} class="flex-item">
<Link
  href={{
    pathname: '/collectiblepage/'+ prog.slug
  }}>
      <Image class="projCoverPort" 
      src={prog.gallery[0].url}
        alt="Description of the image"
        width={200} // larghezza dell'immagine
        height={200} // altezza dell'immagine
      />
</Link>
      </div>
    )
})}
      </div>
     </div>

     </div>

  )

 
}
