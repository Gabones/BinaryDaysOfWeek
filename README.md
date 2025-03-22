# Binary Days of the Week
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/Gabones/BinaryDaysOfWeek/blob/master/README.pt-br.md)

This project is an educational example that demonstrates how to use the binary representation of numbers to represent valid days of the week. The main idea is to use the bits of a binary number to indicate the days of the week, where each bit represents a specific day.

## Binary Representation of the Days of the Week

Each day of the week is represented by a bit in an 8-bit binary number:

- **1** (00000001) = Sunday
- **2** (00000010) = Monday
- **4** (00000100) = Tuesday
- **8** (00001000) = Wednesday
- **16** (00010000) = Thursday
- **32** (00100000) = Friday
- **64** (01000000) = Saturday

To combine multiple days, simply add the corresponding values. For example:

- Monday (2) + Wednesday (8) = **10** (00001010)

## Project Structure

The project is divided into two main parts:

### Backend

The backend is implemented in C# with ASP.NET Core and uses Entity Framework Core for data persistence. It provides an API to manage different representations of the days of the week:

- **SchedulerBinaryEncoded**: Binary representation of the days.
- **SchedulerEnum**: Representation using enums.
- **SchedulerStringArray**: Representation using string arrays.

#### Main Endpoints

- **CRUD for SchedulerBinaryEncoded**: `/SchedulerBinaryEncoded`
- **CRUD for SchedulerEnum**: `/SchedulerEnum`
- **CRUD for SchedulerStringArray**: `/SchedulerStringArray`

#### Configuration

The backend uses PostgreSQL as the database. To configure the development environment, edit the `appsettings.Development.json` file with the database credentials.

### Frontend

The frontend is implemented in React with TypeScript and uses Material-UI for the user interface. It provides an interface to visualize and manipulate the backend data.

#### Features

- **CRUD**: Interface to manage data tables.
- **Binary Table**: Displays binary numbers and their relation to the days of the week.

## How to Run

### Prerequisites

- Docker and Docker Compose
- Node.js and npm
- .NET SDK 9.0 or higher

### Steps

1. **Start the Database**:
   ```bash
   docker-compose up -d
   ```
2. **Run the Backend**:
    ```bash
    dotnet watch run
    ```
3. **Run the Frontend**:
    ```bash
    yarn install
    yarn dev
    ```

### Technologies Used

- Backend:
    - ASP.NET Core
    - Entity Framework Core
    - PostgreSQL
- Frontend
    - React
    - Typescript
    - Material UI
    - TanStack Query
- Infraestrutura
    - Docker
    - Docker Compose

### License
This project is for educational purposes only and does not have a specific license.