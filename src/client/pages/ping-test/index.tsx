import { useEffect, useState } from 'react';
import {apiGet} from '../../../api-client/api-client.ts';

const PingTest = () => {
    const [data, setData] = useState<string>('loading...');

    useEffect(() => {
        apiGet<{ message: string }>('/ping')
            .then((response) => {
                console.log(response.message);
                setData(response.message)
            });
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Test GET request</h1>
            <p>Backend response: {data}</p>
        </div>
    );
};

export default PingTest;
