---
title: 'Déploiement de ce portfolio sur mon homelab'
date: '2024-10-16'
language: 'fr'
tags: ['Kubernetes', 'Homelab', 'GitOps', 'CI/CD']
catchPhrase: 'Automatisation du déploiement de mon portfolio avec Kubernetes, Github Actions et ArgoCD.'
coverImage: '/blog/deployed_to_homelab_cover.webp'
---

Dans cet article, j'explique brièvement comment je déploie ce portfolio sur mon homelab Kubernetes. Pour plus de détails, vous pouvez consulter le [dépôt GitHub](https://github.com/depp57/portfolio-2024).

# Étapes

1. Créer les secrets GitHub suivants utilisés par le pipeline CI/CD :

   - `DOCKERHUB_USERNAME` : Nom d'utilisateur pour se connecter au registre Docker (DockerHub
   - `DOCKERHUB_TOKEN` : Token pour se connecter au registre Docker (DockerHub)
   - `DEV_TO_TOKEN` : Token pour accéder à l'API Dev.to (utilisé pour récupérer les articles de blog).
     Il est nécessaire pour le processus de build car Next.js récupère les données au moment du build pour pré-rendre les pages.

2. Pousser les changements sur la branche `main` :
    
```bash
# effectuer des changements et commiter
git push origin main
```
   
3. Cela déclenchera un workflow GitHub Actions qui buildera le site, le conteneurisera et poussera l'image sur la registry DockerHub.

4. Ensuite, je mets à jour le déploiement Kubernetes pour utiliser la nouvelle image (fichier versionné sur Git) :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
        - name: portfolio
          image: depp57/portfolio-2024:<new_tag> # Le tag de l'image est mis à jour à chaque version
          envFrom:
            - secretRef:
                name: portfolio
```

5. Enfin, ArgoCD détectera le changement et mettra à jour le déploiement.
