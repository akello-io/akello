# Notes on how to structure project for multi k8s cluster


Setting up a GitHub repository for developing on multiple Kubernetes clusters requires a clear and organized folder structure. The goal is to keep your environment configurations, manifests, and scripts separated by cluster, while also making it easy to manage deployments across different clusters. Here's an example of how you could organize the folder structure:

### Example Folder Structure for Multi-Cluster Setup

```bash
akello-repo/
│
├── clusters/
│   ├── core-services-cluster/
│   │   ├── manifests/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── configmap.yaml
│   │   ├── helm/
│   │   │   └── charts/
│   │   │       ├── core-service-chart/
│   │   │       └── values.yaml
│   │   ├── scripts/
│   │   │   ├── create_cluster.sh
│   │   │   └── deploy_core_services.sh
│   │   └── README.md
│   │
│   ├── ai-ml-cluster/
│   │   ├── manifests/
│   │   │   ├── deployment.yaml
│   │   │   └── model-inference-service.yaml
│   │   ├── helm/
│   │   │   └── charts/
│   │   │       └── ai-ml-service-chart/
│   │   ├── scripts/
│   │   │   ├── create_cluster.sh
│   │   │   └── deploy_ai_ml_services.sh
│   │   └── README.md
│   │
│   ├── iot-cluster/
│   │   ├── manifests/
│   │   │   ├── mqtt-service.yaml
│   │   │   └── sensor-data-ingestion.yaml
│   │   ├── helm/
│   │   │   └── charts/
│   │   │       └── iot-service-chart/
│   │   ├── scripts/
│   │   │   ├── create_cluster.sh
│   │   │   └── deploy_iot_services.sh
│   │   └── README.md
│   │
│   └── common/
│       ├── manifests/
│       │   └── common-resources.yaml
│       └── helm/
│           └── charts/
│               └── common-resources-chart/
│
├── deployment-scripts/
│   ├── setup_all_clusters.sh   # Creates all clusters
│   ├── deploy_all.sh           # Deploys all services across clusters
│   ├── destroy_all_clusters.sh # Deletes all clusters
│   └── README.md
│
├── docs/
│   ├── architecture-diagram.png
│   ├── setup-guide.md
│   └── cluster-overview.md
│
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── deploy-core-services.yml
│   │       ├── deploy-ai-ml-services.yml
│   │       └── deploy-iot-services.yml
│   ├── Jenkinsfile   # If you're using Jenkins
│   └── gitlab-ci.yml # If you're using GitLab CI
│
└── README.md
```

### Folder Breakdown

#### 1. **`clusters/`**
   This folder contains subfolders for each Kubernetes cluster. Each subfolder has its own:
   - **Manifests**: Kubernetes YAML files specific to that cluster.
   - **Helm Charts**: If you’re using Helm for templating and managing deployments.
   - **Scripts**: Shell scripts for setting up the cluster and deploying services.

   - **`core-services-cluster/`**:
     - This folder contains manifests and Helm charts related to core services like identity management, EHR, or other business logic.
     - It also has a `scripts/` folder to automate cluster creation and service deployment.

   - **`ai-ml-cluster/`**:
     - Contains the manifests and Helm charts for your AI/ML workloads, such as model training and inference services.
     - The `scripts/` folder includes deployment scripts specific to AI-related services.

   - **`iot-cluster/`**:
     - Manifests and Helm charts for handling IoT data ingestion, MQTT brokers, and sensor data services.
     - This folder will have similar deployment scripts for the IoT services.

   - **`common/`**:
     - This is where you store any common resources that are shared across multiple clusters, such as shared secrets, namespaces, or configurations.
     - Both manifests and Helm charts are provided here for common services.

#### 2. **`deployment-scripts/`**
   This folder includes high-level scripts that can:
   - **Create all clusters** using `Kind`, `Minikube`, or your preferred local Kubernetes setup.
   - **Deploy all services** across the clusters, making use of the scripts in the individual cluster directories.
   - **Tear down clusters** when needed.

   These scripts help to automate the entire multi-cluster setup locally and are useful for spinning up or tearing down environments quickly.

#### 3. **`docs/`**
   - This is where you keep documentation for how to set up and maintain the clusters, architecture diagrams, and information about the purpose of each cluster.
   - This folder will guide team members through the reasoning behind the structure, the cluster roles, and how to work within the environment.

#### 4. **`ci-cd/`**
   - This contains your Continuous Integration and Continuous Deployment (CI/CD) configurations, like GitHub Actions workflows, Jenkins pipelines, or GitLab CI configurations.
   - Each CI workflow file (e.g., `.github/workflows/`) is tailored for deploying specific clusters/services automatically when code is pushed to the relevant branches.

#### 5. **`README.md`**
   - Each folder should have a `README.md` that explains what’s inside the folder, its purpose, and instructions on how to use the scripts or resources within it.

### Workflow

1. **Cluster-Specific Development**:
   - When you develop for a specific cluster, you work inside its respective folder (`core-services-cluster`, `ai-ml-cluster`, etc.).
   - Manifests, Helm charts, and deployment scripts for that cluster are stored here, allowing you to manage them independently from other clusters.

2. **Deploying and Managing Services**:
   - You can deploy the clusters and services by running the deployment scripts in `deployment-scripts/`. For example, you might run `setup_all_clusters.sh` to spin up all your clusters, followed by `deploy_all.sh` to deploy all services across clusters.

3. **CI/CD Integration**:
   - Your CI/CD pipelines in `ci-cd/` can be set up to automatically deploy changes to specific clusters based on which parts of the repository are updated. For example, a change in the `ai-ml-cluster` folder could trigger a workflow that only deploys the AI/ML services to the `ai-ml-cluster`.

### Benefits of This Structure
- **Modularity**: Each cluster's configuration is separated, making it easy to develop, test, and deploy independently.
- **Automation**: With the deployment scripts, you can quickly spin up, tear down, and update your entire multi-cluster setup locally.
- **Scalability**: As your clusters grow, this structure can be extended to accommodate additional clusters and services without clutter.
- **CI/CD Ready**: The structure is ready to integrate into your CI/CD pipeline, ensuring a smooth development process and deployment.

By organizing your repository this way, you can manage multiple clusters locally with ease and maintain consistency across your development workflow.