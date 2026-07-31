---
title: "SvelteKit"
group: "Frontend web"
level: 3
---

Framework applicatif polyvalent basé sur Svelte, offrant le rendu côté serveur et le routage. Pour des applications web rapides et efficaces avec un minimum de code répétitif.
Avec Svelte 5, je ne suis pas fan de la coexistence de l'ancienne et de la nouvelle syntaxe, ce qui peut être déroutant par moments.

## Retour d'expérience

- Clairement pas pensé pour de simples SPA. Gérer la navigation, les middlewares, ... uniquement côté client est assez laborieux.
- Les classes ne sont pas réactives lorsqu'elles sont utilisées dans un state, il faut déclarer les propriétés de la classe comme des states.
