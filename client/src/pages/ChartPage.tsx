import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const defaultData = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 200, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2400 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2400 },
];
function ChartPage() {
    const [hello, setHello] = useState([]);
    useEffect(() => {
        const url = import.meta.env.DEV ? "http://localhost:8080/api/chart" : "/api/chart";
        fetch(url).then(res => res.json()).then(data => {
            setHello(data);
            console.log(data);
        }).catch(err => {
            console.error(err);
            setHello(defaultData as never[]);
        });
    }, [])
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chart</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0 flex justify-center">
                        {hello.length === 0 ? (<div
  className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] mt-6"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>) :
                            (<LineChart width={800} height={400} data={hello} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} style={{ marginTop: 100 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>)}

                    </div>
                </div>
            </main>
        </>
    )
}

export default ChartPage
