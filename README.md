# Attendance Tracking Application

This is a simple attendance tracking application that allows users to record attendance for various services. The application includes fields for date, leader, preacher, type of service, and counts for brothers, sisters, visitors, children, visiting brothers, and offering. It also calculates the total attendance based on the input values.

## Project Structure

```
attendance-tracking-app
├── src
│   ├── index.html        # HTML structure of the application
│   ├── app.js            # JavaScript logic for handling attendance tracking
│   ├── styles.css        # Styles for the application
│   └── types
│       └── index.d.ts    # TypeScript types and interfaces
├── package.json          # npm configuration file
└── README.md             # Documentation for the project
```

## Features

- Input fields for:
  - Date
  - Leader
  - Preacher
  - Type of Service
  - Brothers
  - Sisters
  - Visitors
  - Children
  - Visiting Brothers
  - Offering
- Button to calculate total attendance
- Displays total attendance dynamically

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd attendance-tracking-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Open `src/index.html` in your web browser to view the application.

## Usage

- Fill in the required fields in the form.
- Click the "Calculate Total Attendance" button to see the total attendance based on the input values.

## License

This project is licensed under the MIT License.