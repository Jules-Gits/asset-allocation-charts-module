# Responsive Donut Charts Component

This project demonstrates a responsive React component for displaying donut charts. The charts adapt to different screen sizes, showing 3 charts in a row on wider devices, 2 on narrower devices, and 1 on mobile.

## Features

- Responsive layout using flexbox and media queries
- Interactive donut charts with hover effects
- Centered labels in donut holes
- Sortable data display
- Legend table for each chart

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/responsive-donut-charts.git
   ```
2. Navigate to the project directory:
   ```
   cd responsive-donut-charts
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage

The main component is `DonutChartsModule`. You can import and use it in your React application like this:

```jsx
import DonutChartsModule from './components/DonutChartsModule';

function App() {
  return (
    <div className="App">
      <h1>Responsive Donut Charts</h1>
      <DonutChartsModule />
    </div>
  );
}
```

## Customization

You can customize the charts by modifying the data in `DonutChartsModule.js`. The colors and data for each chart can be adjusted to fit your needs.

## Dependencies

- React
- recharts

## License

This project is open source and available under the [MIT License](LICENSE).