import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/global.params.dart';

class MyDrawer extends StatelessWidget {
  const MyDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          // header avec image de profil
          DrawerHeader(
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [
                Theme.of(context).primaryColor.withOpacity(0.9),
                Colors.white
              ]),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircleAvatar(
                  radius: 42,
                  backgroundImage:
                      const AssetImage('assets/images/profile.jpeg'),
                  backgroundColor: Colors.transparent,
                ),
                const SizedBox(height: 8),
                const Text('Utilisateur',
                    style: TextStyle(fontSize: 16, color: Colors.black87)),
              ],
            ),
          ),

          // items dynamiques
          ...GlobalParams.menus.map((item) {
            final title = item['title'] as String;
            final icon = item['icon'] as Widget;
            final route = item['route'] as String;

            if (title == 'Déconnexion') {
              return ListTile(
                leading: icon,
                title: Text(title, style: const TextStyle(fontSize: 18)),
                trailing: const Icon(Icons.arrow_right),
                onTap: () async {
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setBool('connecte', false);
                  if (context.mounted) {
                    Navigator.pushNamedAndRemoveUntil(
                        context, route, (r) => false);
                  }
                },
              );
            }

            return ListTile(
              leading: icon,
              title: Text(title, style: const TextStyle(fontSize: 18)),
              trailing: const Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.pushNamed(context, route);
              },
            );
          }),
        ],
      ),
    );
  }
}
