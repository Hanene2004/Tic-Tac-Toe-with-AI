import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_app/menu/drawer.widget.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});

  late SharedPreferences prefs;

  // Fonction pour la déconnexion
  Future<void> _deconnexion(BuildContext context) async {
    prefs = await SharedPreferences.getInstance();
    await prefs.setBool("connecte", false);

    // Naviguer vers la page Authentification et supprimer l'historique
    Navigator.pushNamedAndRemoveUntil(
        context, '/authentification', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MyDrawer(),
      appBar: AppBar(
        title: const Text('Page Accueil'),
        backgroundColor: Colors.green,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Bienvenue !',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 40),

            // Grille d'images utilisant GlobalParams.accueil
            Wrap(
              spacing: 16.0,
              runSpacing: 16.0,
              children: GlobalParams.accueil.map((item) {
                return InkWell(
                  onTap: () {
                    Navigator.pushNamed(context, item["route"]);
                  },
                  child: Ink.image(
                    height: 180,
                    width: 180,
                    image: item["image"] as AssetImage,
                    fit: BoxFit.cover,
                  ),
                );
              }).toList(),
            ),

            const SizedBox(height: 40),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(50),
                backgroundColor: Colors.green,
              ),
              onPressed: () {
                _deconnexion(context);
              },
              child: const Text(
                'Déconnexion',
                style: TextStyle(fontSize: 22, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class GlobalParams {
  static List<Map<String, dynamic>> menus = [
    {
      'title': 'Accueil',
      'icon': const Icon(Icons.home, color: Colors.blue),
      'route': '/home'
    },
    {
      'title': 'Météo',
      'icon': const Icon(Icons.wb_sunny, color: Colors.blue),
      'route': '/meteo'
    },
    {
      'title': 'Maps',
      'icon': const Icon(Icons.map, color: Colors.blue),
      'route': '/maps'
    },
    {
      'title': 'Contacts',
      'icon': const Icon(Icons.contact_page, color: Colors.blue),
      'route': '/contacts'
    },
    {
      'title': 'Messages',
      'icon': const Icon(Icons.message, color: Colors.blue),
      'route': '/messenger'
    },
    {
      'title': 'ChatBot',
      'icon': const Icon(Icons.chat, color: Colors.blue),
      'route': '/chatbot'
    },
    {
      'title': 'Paramètres',
      'icon': const Icon(Icons.settings, color: Colors.blue),
      'route': '/parametres'
    },
    {
      'title': 'Déconnexion',
      'icon': const Icon(Icons.logout, color: Colors.red),
      'route': '/authentification'
    },
  ];

  static List<Map<String, dynamic>> accueil = [
    {
      'route': '/meteo',
      'image': const AssetImage('assets/images/meteo.jpeg'),
      'title': 'Météo'
    },
    {
      'route': '/maps',
      'image': const AssetImage('assets/images/maps.png'),
      'title': 'Maps'
    },
    {
      'route': '/contacts',
      'image': const AssetImage('assets/images/contacts.png'),
      'title': 'Contacts'
    },
    {
      'route': '/messenger',
      'image': const AssetImage('assets/images/messenger.jpeg'),
      'title': 'Messages'
    },
    {
      'route': '/chatbot',
      'image': const AssetImage('assets/images/chatbot.jpeg'),
      'title': 'ChatBot'
    },
    {
      'route': '/parametres',
      'image': const AssetImage('assets/images/parametres.png'),
      'title': 'Paramètres'
    },
  ];
}
