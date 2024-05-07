
/*import { PieChart, Pie } from 'recharts';
 
interface PieChartProps {
    stats: number[];
}

export const ResultsPieChart: React.FC<PieChartProps> = ({stats}) => {
    const data = [
        { name: 'Realistic', value: stats[0] },
        { name: 'Investigative', value: stats[1] },
        { name: 'Artistic', value: stats[2] },
        { name: 'Social', value: stats[3] }, 
        { name: 'Enterprising', value: stats[4] },
        { name: 'Conventional', value: stats[5] }
    ];    
 
    return (
        <PieChart width={700} height={700}>
            <Pie nameKey = "name" data={data} dataKey="value" outerRadius={250} fill="blue" label/>
        </PieChart>
    );
}
 
export default ResultsPieChart;
*/
import { PieChart, Pie, Cell, Label } from 'recharts';

interface PieChartProps {
    stats: number[];
}

export const ResultsPieChart: React.FC<PieChartProps> = ({ stats }) => {
    const data = [
        { name: 'Realistic', value: stats[0] },
        { name: 'Investigative', value: stats[1] },
        { name: 'Artistic', value: stats[2] },
        { name: 'Social', value: stats[3] },
        { name: 'Enterprising', value: stats[4] },
        { name: 'Conventional', value: stats[5] }
    ];

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${data[index].name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    const colors = ['#513B56', '#348AA7', '#525174', '#5DD39E', '#BCE784', 'rgb(41, 57, 124)'];

    return (
            <PieChart width={700} height={700}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={250}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                    <Label width={30} position="center">
                    </Label>
                </Pie>
            </PieChart>
    );
};

export default ResultsPieChart;
