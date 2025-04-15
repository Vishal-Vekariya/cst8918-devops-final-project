# ☁️ CST8918 – DevOps Final Project: Remix Weather Application

This repository showcases our final project for the course **DevOps: Infrastructure as Code (CST8918)**. The goal was to automate the provisioning and deployment of a Remix-based weather application using **Terraform**, **Azure AKS**, and **GitHub Actions**.

We structured our project using Infrastructure as Code (IaC) principles and designed CI/CD pipelines for static tests, build, and deployment.

---

## 👥 Team Members

- [Keshav Lamichhane](https://github.com/Klamichhane738)
- [Vishal Vekariya](https://github.com/Vishal-Vekariya)
- [Meet Jitendrakumar Patel](https://github.com/meetpatel1389)
- [Dhruv Parmar ](https://github.com/dhruv-13)
---

## 📁 Project Structure

```bash
CST8918-DEVOPS-FINAL-PROJECT/
├── .github/
│   └── workflows/
│       ├── infra-ci-cd.yml            # GitHub Actions: Infra & App Deployment
│       └── infra-static_tests.yml     # GitHub Actions: Static Code Checks
├── app/                               # Remix Weather App Source Code
│   ├── api-services/
│   ├── data-access/
│   ├── routes/
│   ├── utils/
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   └── root.tsx
├── build/                             # Build output
├── infrastructure/                    # Terraform IaC (AKS, ACR, Networking, etc.)
├── public/                            # Static files
├── .eslintrc.cjs
├── .gitignore
├── Dockerfile                         # Docker setup for Remix App
├── package.json
├── package-lock.json
├── remix.config.js
├── remix.env.d.ts
├── tsconfig.json
└── README.md

## All provisioning and deployment steps are automated through GitHub Actions. Simply push changes or open a Pull Request and the workflows will execute accordingly.

### Branches of main project with project structure
![Image](https://github.com/user-attachments/assets/31fe74b9-dcf6-4b94-8a8c-fed1e09a6a73)

### 🔍 Static Tests & Terraform Validation

On **every push or pull request** to any branch, the `infra-static_tests.yml` workflow will:

- Run ESLint for the Remix app  
- Run `terraform fmt`, `terraform validate`, and `terraform plan` for infrastructure code  

✅ This ensures all code and infrastructure follow best practices before merging.

![Image](https://github.com/user-attachments/assets/1ecc74f8-5f9e-46a0-aa31-390ad57d607a)

---

### 🚀 CI/CD Pipeline

On **push to `main`** branch, the `infra-ci-cd.yml` workflow will:

1. **Initialize Terraform**
2. **Apply Infrastructure** (AKS, ACR, Redis, etc.)
3. **Build the Remix Docker image**
4. **Push Docker image to Azure Container Registry (ACR)**
5. **Deploy updated image to Azure Kubernetes Service (AKS)**

> All steps are automated — no need to run `terraform` or `docker` manually.

## Remix Weather Application Screenshot

![Remix Weather App Screenshot](./screenshots/"image.png")

![Image](https://github.com/user-attachments/assets/d66356ad-b145-4785-bfe8-360921a38ff3)

## Below is a screenshot of the successful GitHub Actions runs for CI/CD:

![Image](https://github.com/user-attachments/assets/76e0db91-3acf-40a9-8a7c-2fb51368495b)
