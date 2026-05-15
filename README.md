# 📚 Book Vault

Welcome to the **Book Vault** collaboration repository! This project is built using a modern React + Vite stack and serves as a centralized hub for managing personal reading archives.

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and `npm` installed.

### 2. Installation & Setup
Clone the repository and install the necessary dependencies:
```bash
git clone <your-repository-url>
cd Book-Vault
npm install
3. Local Development
To run the local development server with Hot Module Replacement (HMR):

Bash
npm run dev
🛠️ Collaboration Workflow
To ensure the stability of the project, we follow a strict feature-branch workflow. Do not commit directly to the main branch.

Pull Latest Changes: Always start by syncing your local repository.

Bash
git checkout main
git pull origin main
Create a Feature Branch: Name your branch based on the feature you are building.

Bash
git checkout -b feature/your-feature-name
Commit & Push: Submit your work to GitHub on your feature branch.

Bash
git add .
git commit -m "feat: short description of work"
git push origin feature/your-feature-name
Open a Pull Request (PR): Navigate to GitHub and open a PR against main for team code review.

🏗️ Technical Stack (Vite + React)
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Official Plugins
@vitejs/plugin-react: Uses Oxc for fast refreshes.

@vitejs/plugin-react-swc: Uses SWC as an alternative.

React Compiler
The React Compiler is currently disabled to maintain optimal development performance. For installation instructions, refer to the React Documentation.

Architectural Standards
Directories: All folder names must be lowercase (e.g., src/components).

Components: React components must use PascalCase (e.g., BookForm.jsx).

ESLint: If moving to production, it is recommended to use TypeScript with type-aware lint rules.

⚠️ Troubleshooting
Case-Sensitivity Errors:
If you encounter errors when renaming files (common when moving between Windows/WSL), use a temporary filename to force the system to register the change:

Bash
mv src/components/Oldname.jsx src/components/temp.jsx
mv src/components/temp.jsx src/components/NewName.jsx

### Explanation of the Merged Structure

1.  **Project Branding:** It starts with the **Book Vault** identity so team members immediately know which project they are working on.
2.  **Workflow First:** By placing the **Getting Started** and **Collaboration Workflow** at the top, you ensure that new contributors see the rules for branch protection before they dive into the code.
3.  **Vite Boilerplate Preservation:** I kept the official Vite plugin and React Compiler information in a "Technical Stack" section. This is useful for team members to understand the underlying build tool and the available ESLint configurations.
4.  **Infrastructure Rules:** I added a specific "Architectural Standards" note. This is based on the casing issues we fixed earlier, ensuring the team knows that folders must be lowercase and components must be PascalCase to prevent build breaks.
5.  **Troubleshooting:** I included the `mv temp.jsx` trick directly in the README. This acts as "self-service" documentation for the team if they run into the same Windows/Linux naming conflicts.