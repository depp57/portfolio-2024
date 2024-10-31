---
title: "Comment j'ai préparé ma certification CKAD"
date: '2024-10-30'
language: 'fr'
tags: ['Kubernetes', 'DevOps']
catchPhrase: "Après quelques semaines de préparation, j'ai passé ma certification CKAD et je l'ai obtenue !"
coverImage: '/projects/ckad/certificate.webp'
---

# Contenu

Le contenu de l'examen évolue régulièrement selon la version, mais voici les grandes lignes des sujets abordés lors de mon passage (version 1.31) :

- **Application design and build** (20%)
  - Comprendre le concept d'images de conteneurs.
  - Connaitre et utiliser les ressources liées au déploiement d'applications (pods, services, cronjobs, etc.).
  - Utiliser des pods multi-conteneurs (sidecars, init-container, etc.).
  - Comprendre les concepts de volumes et de persistance.

- **Application deployment** (20%)
  - Déployer avec Helm et Kustomize.
  - Déploiements, rolling update et rollbacks.
  - Connaitre quelques stratégies de déploiement (blue/green, canary).

- **Application observability and maintenance** (15%)
  - Comprendre le fonctionnement des LivenessProbes & ReadinessProbes.
  - Manipulation des logs d’un conteneur.
  - Debugging dans Kubernetes.
  - Comprendre le système de dépréciation de l’API Kubernetes.

- **Application environment, configuration, and security** (25%)
  - ConfigMaps et Secrets.
  - SecurityContexts, capabilities, etc.
  - Définir des ressources pour les conteneurs (requests, limits, quotas).
  - Comprendre le mécanisme d'authentification à l'API (RBAC, service accounts).
  - Comprendre le principe d'opérateurs Kubernetes avec les CRDs.

- **Services & networking** (20%)
  - Utiliser des NetworkPolicies simples.
  - Débugger les services.
  - Exposer des services via des Ingress.

# Formation

J'avais déjà eu l'occasion de travailler professionnellement avec Kubernetes pendant un an et demi.
J'ai tout de même suivi une formation en ligne sur Udemy pour me préparer à l'examen,
car j'avais besoin de me rafraîchir la mémoire et me familiariser avec la CLI.

J'ai donc suivi cette formation :
[Kubernetes Certified Application Developer (CKAD) with Tests](https://www.udemy.com/course/certified-kubernetes-application-developer/)
de Mumshad Mannambeth. Un ami me l'avait recommandée et j'ai aussi été très satisfait du contenu!

Elle donne accès à des exercices pratiques et des simulateurs d'examen qui m'ont beaucoup aidé.

# Exercices et simulateurs

Lorsque l'on achète la CKAD, on obtient un accès à la plateforme [killer.sh](https://killer.sh/) pour réaliser deux fois une simulation d'examen.

J'ai réalisé ces simulations quelques jours avant le passage officiel de l'examen. TODO

# Mon expérience

TODO