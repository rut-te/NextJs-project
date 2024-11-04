"use client"

import React, { useEffect, useState } from 'react';
import jewelryService from '../../services/jewelry';
import styles from './jewelry.module.css'
import { ClipLoader } from 'react-spinners';

function Page() {

    const [jewelry, setJewelery] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            const data = await jewelryService.getAllJewelry();
            console.log(data);
            setJewelery(data);
            setLoading(false);
        }

        fetchData();

    }, [])

    return (
        <div>
            {loading ? (
                <div>
                    <ClipLoader color="orange" loading={loading} size={50} />
                </div>
            ) : (
                <div>
                    <h2 className={styles.title}>JEWELRY</h2>
                    <div className={styles.prodContainer}>
                        {jewelry.map((product, index) => (
                            <div key={index} className={styles.prod}>
                                <h4>{product.title}</h4>
                                <p>Price: ${product.price}</p>
                                <img src={product.image} alt={product.title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page