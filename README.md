# Jasmine

*Jasmine* est une application pensée et conçue pour le tourisme médical,
destinée à aider les étrangers arrivant en France dans leurs démarches,
aussi bien auprès des médecins que des services adjacents tels que
l'hébergement, les transports ou les interprètes.

## Installation

### Pré-requis

Vérifier que vous disposez bien de **Ionic** et **Cordova**  installés
de façon globale sur votre ordinateur avec les commandes :  
`ionic -v && cordova -v`  

Dans le cas contraire, installez-les via :  
`npm install -g ionic cordova`  

### Plugins et dépendances

Après avoir cloné le repo, installez les différentes dépendances :  
`npm install`

Puis, pour installer les différents plugins nécessaires à l'application,
faites (selon la plateforme que vous souhaitez installer):  
`ionic cordova build android`  
ou  
`ionic cordova build ios`

### Démarrer l'application

Pour démarrer l'application, utilisez la commande :  
`ionic serve`  

Si vous voulez la démarrer sur un emulateur, utilisez plutôt :  
`ionic cordova run android` ou `ionic cordova run ios`
