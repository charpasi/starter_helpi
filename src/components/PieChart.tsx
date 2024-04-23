import './PieChart.css';

interface IPie {
    x0: number;
    y0: number;
    radius: number;
  };
  
  interface IParts {
    value: number;
    label: string;
    startAngle: number;
    endAngle: number;
  };
  
  export class PieChart {}