import React, { useEffect, useState } from 'react';

const YourComponent = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/NEWS/');
                const jsonData = await response.json();
                setEntries(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {entries.map(item => (
                <div key={item.id}>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default YourComponent;
