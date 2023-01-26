import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";


import coffeeStoresData from '../../data/coffee-stores.json';

import styles from "../../styles/coffee-stores.module.css";

import { fetchCoffeeStores } from "../../lib/coffee-stores";

import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../_app";

import { isEmpty } from "../../utils";

// Defining getStaticProps and getStaticPaths to pre-render dynamic pages

//This runs on the server
export async function getStaticProps(staticProps) {
    const params = staticProps.params;      //params is a property to Access the dynamic id on Server side
    
    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStores.find ((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;            // Dynamic id
    });
    console.log({findCoffeeStoreById});
    return {
        props: {
            coffeeStore: findCoffeeStoreById? findCoffeeStoreById : {},
        },
    };
}

export async function getStaticPaths() {

    const coffeeStores = await fetchCoffeeStores();
    console.log(coffeeStores);

    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: true,  
    };
}





// This runs on the client side
const CoffeeStore = (initialProps) => {
    const router = useRouter();

    
    const id = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
    console.log({initialProps});
    const {
        state: { coffeeStores },
    } = useContext(StoreContext);

    useEffect(() => {
        if(isEmpty(initialProps.coffeeStore)) {
            if(coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find ((coffeeStore) => {
                    return coffeeStore.id.toString() === id;            // Dynamic id
                });
            
                setCoffeeStore(findCoffeeStoreById);
            }
        }
    }, [id])


    const { imgUrl, address, location, name} = coffeeStore;

    const handleUpvoteButton = () => {
        console.log("handle upvote");
    };

    //Even though a route exists in json data file, it needs some time to download the data/route and cache it into getStaticPaths()
    //So we have to use a property frpm router to allow us to show a 'Loading' state in meanwhile....
    if(router.isFallback){
        return <div>Loading....</div>;
    }


    return (
        <div className={styles.layout}>
            <Head>
                <title>
                    {name}
                </title>
            </Head>

            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a> ← Back to Home </a>
                        </Link>
                    </div>
                    
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    
                    <Image 
                        src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}    
                        width={600} height={360} 
                        className={styles.storeImg} 
                        alt={name}>

                    </Image>
                    
                </div>
                
                <div className={cls("glass", styles.col2)}>
                    {address && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/places.svg" width="24" height="24" />
                            <p className={styles.text}>{address}</p>
                        </div>

                    )}

                    
                    
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                            <p className={styles.text}>{location.neighborhood?.[0]}</p>       
                        </div>

                  
                    
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>1</p>
                    </div>

                    <button className={styles.upvoteButton} onClick= {handleUpvoteButton}>
                        Up Vote!
                    </button>

                </div>
            </div>
            
        </div>
    );
};

export default CoffeeStore;

