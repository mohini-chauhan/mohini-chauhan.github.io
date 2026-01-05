# Charts Components

This folder contains reusable chart components built with Chart.js and React, styled with Tailwind CSS and theme support.

## Default Chart Options

All charts come with comprehensive default configurations that provide a polished, professional appearance:

### **Global Defaults** (`defaultChartConfig`)
- **Responsive design** with 2:1 aspect ratio
- **Styled tooltips** with dark background and rounded corners
- **Grid lines** with subtle colors
- **Interactive elements** with hover effects
- **Point styling** for line charts
- **Smooth animations** and transitions

### **Line Chart Defaults**
- **Smooth curves** with 0.4 tension
- **No fill** under lines by default
- **2px border width** for better visibility
- **Point radius** of 4px (6px on hover)

### **Bar Chart Defaults**
- **Rounded corners** on bars
- **Y-axis starts at zero** for accurate comparisons
- **No X-axis grid** for cleaner look

## Components

### LineChart
A line chart component for displaying data trends over time or categories.

```tsx
import { LineChart } from './components/charts';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

<LineChart data={data} />
```

### BarChart
A bar chart component for comparing values across categories.

```tsx
import { BarChart } from './components/charts';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

<BarChart data={data} />
```

### GaugeChart
A gauge chart component for displaying progress or percentage values.

```tsx
import { GaugeChart } from './components/charts';

<GaugeChart
  value={75}
  max={100}
  label="Progress"
  color="#4CAF50"
/>
```

## Styling & Theming

All charts are styled with **Tailwind CSS** and support both light and dark themes:

- **Container**: `relative h-72 w-full` (responsive, full width, fixed height)
- **Gauge Value**: `text-gray-900 dark:text-gray-100` (theme-aware text color)
- **Flexible**: Pass additional `className` prop for custom styling

## Theme Support

The components automatically adapt to your app's theme context. The gauge chart value text uses `text-gray-900 dark:text-gray-100` for optimal contrast in both light and dark modes.

## Customization

### **Override Defaults**
```tsx
import { LineChart, defaultChartConfig } from './components/charts';

// Customize globally
const customDefaults = {
  ...defaultChartConfig,
  plugins: {
    ...defaultChartConfig.plugins,
    legend: {
      position: 'bottom' as const,
    },
  },
};

// Use in component
<LineChart
  data={data}
  options={{
    ...customDefaults,
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart',
      },
    },
  }}
/>
```

### **Chart-Specific Customization**
```tsx
import { LineChart, lineChartDefaults } from './components/charts';

<LineChart
  data={data}
  options={{
    ...lineChartDefaults,
    elements: {
      line: {
        borderWidth: 4,
        tension: 0,
      },
    },
  }}
/>
```

### LineChart
A line chart component for displaying data trends over time or categories.

```tsx
import { LineChart } from './components/charts';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

<LineChart data={data} />
```

### BarChart
A bar chart component for comparing values across categories.

```tsx
import { BarChart } from './components/charts';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

<BarChart data={data} />
```

### GaugeChart
A gauge chart component for displaying progress or percentage values.

```tsx
import { GaugeChart } from './components/charts';

<GaugeChart
  value={75}
  max={100}
  label="Progress"
  color="#4CAF50"
/>
```

## Styling & Theming

All charts are styled with **Tailwind CSS** and support both light and dark themes:

- **Container**: `relative h-72 w-full` (responsive height, full width)
- **Gauge Value**: `text-gray-900 dark:text-gray-100` (theme-aware text color)
- **Flexible**: Pass additional `className` prop for custom styling

## Customization

All charts accept additional `options` prop to customize Chart.js behavior:

```tsx
<LineChart
  data={data}
  options={{
    plugins: {
      title: {
        display: true,
        text: 'Custom Title',
      },
    },
  }}
/>
```

## Theme Support

The components automatically adapt to your app's theme context. The gauge chart value text uses `text-gray-900 dark:text-gray-100` for optimal contrast in both light and dark modes.