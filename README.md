## 📋 ProjectManagementBoard

**ProjectManagementBoard** is a full-stack Kanban-style ticket management application built with **Angular** and **.NET**.  
---

### 🖼️ Application Preview

<p align="center">
  <img width="900" alt="Kanban Board Overview" src="https://github.com/user-attachments/assets/4600e0f5-abe9-48ca-a0a8-987273df3422" />
</p>

<p align="center">
  <img width="450" alt="Edit Ticket Modal" src="https://github.com/user-attachments/assets/d40c1acc-0841-4797-bcb3-bd18d88c50bd" />
  <img width="550" alt="Ticket Details View" src="https://github.com/user-attachments/assets/f472bcc2-5f7b-436b-a0f5-e6d7bfdc74be" />
</p>


### Run Project Locally

#### Backend (.NET)

```bash
cd backend/backendapi
dotnet restore
dotnet run
Open Program.cs and update CORS and replace the frontend URL if needed:
"policy.WithOrigins("http://localhost:4200")"
```


#### FrontEnd (Angular)
```bash

cd frontend/task-board
npm install
Update the API URL in src/app/config/environment.ts:
"API_URL: 'http://localhost:5138/api/Tickets'"
ng serve
```
