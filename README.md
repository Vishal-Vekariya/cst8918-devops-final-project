# ☁️ CST8918 – DevOps Final Project: Remix Weather Application

This repository showcases our final project for the course **DevOps: Infrastructure as Code (CST8918)**. The goal was to automate the provisioning and deployment of a Remix-based weather application using **Terraform**, **Azure AKS**, and **GitHub Actions**.

We structured our project using Infrastructure as Code (IaC) principles and designed CI/CD pipelines for static tests, build, and deployment.

---

## 👥 Team Members

- [Keshav Lamichhane](https://github.com/Klamichhane738)
- [Vishal Vekariya](https://github.com/Vishal-Vekariya)
- [Meet Jitendrakumar Patel](https://github.com/meetpatel1389)
- [Dhruv Parmar ](https://github.com/dhruv-13))
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
![Image](https://github.com/user-attachments/assets/87743e5b-bdb4-434d-8e3c-07ca563c9ec3)

### 🔍 Static Tests & Terraform Validation

On **every push or pull request** to any branch, the `infra-static_tests.yml` workflow will:

- Run ESLint for the Remix app  
- Run `terraform fmt`, `terraform validate`, and `terraform plan` for infrastructure code  

✅ This ensures all code and infrastructure follow best practices before merging.

![Image](https://github.com/user-attachments/assets/4f460823-8fb8-4e04-861f-6f3dee4aa521)

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

![Image](https://github.com/user-attachments/assets/102880e4-0856-45cd-9ac7-7c93fcb12eb1)

![Image](https://github.com/user-attachments/assets/b1da4b6d-5476-42dc-9610-253e1d5033c3)

## Below is a screenshot of the successful GitHub Actions runs for CI/CD:

![Image](https://github.com/user-attachments/assets/158f9b43-4ab2-4134-ac5f-53b3ce5e20a4)