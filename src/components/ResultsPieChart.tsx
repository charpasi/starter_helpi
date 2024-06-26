import { PieChart, Pie, Cell, Label } from 'recharts';

interface PieChartProps {
    stats: number[];
}

export const ResultsPieChart: React.FC<PieChartProps> = ({ stats }) => {
    const data = [ // categories of the pie chart and their relative values
        { name: 'Realistic', value: stats[0] },
        { name: 'Investigative', value: stats[1] },
        { name: 'Artistic', value: stats[2] },
        { name: 'Social', value: stats[3] },
        { name: 'Enterprising', value: stats[4] },
        { name: 'Conventional', value: stats[5] }
    ];
    // renders the custom text label that appears on the pie chart 
    // obtained from ChatGPT (recharts does not have simplified way of doing this without individual function)
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
        // additional check for personality traits with values of 0
        if (data[index].value > 0) {
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
        }
        return null; // return null if value is 0
    };
    // colors of the pie chart correspond to order defined in data
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
