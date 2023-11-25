import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




export default function Blog() {


  const router = useRouter()
  const [post , setPost ] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleLogoError = () => {
    // Gestisci l'errore nell'URL dell'immagine di fallback o nascondi completamente l'elemento
    setLogoError(true);
  };


  const articoli = async (id) => {
    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    // Modifica la query per accettare una variabile
    const APOLLO_QUERY = gql`
        query MyQuery($projectId: String!) {
            projects(where: {slug: $projectId}) {
                id
                title
                gallery {
                    url
                }
                brand{
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
    console.log(projectXpage.projects[0]);
    setPost(projectXpage.projects[0]);

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


  // Configurazione per react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  



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
    {isMenuVisible ? (
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
  ) : (
    <div class='divHam'>
  
      
    <img class='hamburger'  onClick={() => setIsMenuVisible(!isMenuVisible)} style={{ display: isMenuVisible ? 'none' : 'block' }} src='/hamburger-menu-5.png'/>
    </div>
)}
   </div>
   <div className="contentArea">
    <div class='slideDesktop'>
        <Slider {...settings}>
          {post?.gallery?.map((o, i) => (
            <div key={i}>
              <Image
                className="galleryImg"
                src={o.url}
                alt="Description of the image"
                width={600}
                height={400}
              />
            </div>
          ))}
        </Slider>

    

        </div>
        <div className='sliderMobile'>
        {post?.gallery?.map((o,i)=>{
        return(
          
     
            <Image class="galleryImg" 
            src={o.url}
            alt="Description of the image"
            width={600} // larghezza dell'immagine
            height={400} // altezza dell'immagine
            loading="lazy"
        unoptimized={false} // Se non hai bisogno di ottimizzazione automatica
        onError={handleLogoError}
          />

        )
    })}

        </div>

        <div className="nameBar">
          <h1>{post?.title}</h1>
          <Link
            href={{
              pathname: '/brandpage/' + post?.brand?.name,
            }}
          >
            <h1 class='underlineText' style={{marginLeft:'10px'}}>{post?.brand?.name}</h1>
          </Link>
        </div>


      </div>
    </div>
  );
}