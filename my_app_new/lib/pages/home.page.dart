import 'package:flutter/material.dart';
import '../menu/drawer.widget.dart';
import '../config/global.params.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const MyDrawer(),
      appBar: AppBar(
        title: const Text('Accueil'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
        child: Column(
          children: [
            CircleAvatar(
              radius: 48,
              backgroundImage: const AssetImage('assets/images/profile.jpeg'),
            ),
            const SizedBox(height: 12),
            const Text('Bienvenue !',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const SizedBox(height: 18),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: GlobalParams.accueil.map((item) {
                return _buildImageCard(context, item['title'] as String,
                    item['image'] as AssetImage, item['route'] as String);
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildImageCard(
      BuildContext context, String title, AssetImage image, String route) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, route),
      child: Container(
        height: 140,
        width: 140,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          image: DecorationImage(image: image, fit: BoxFit.cover),
          boxShadow: [
            BoxShadow(
                color: Colors.black.withOpacity(0.08),
                blurRadius: 6,
                offset: const Offset(0, 4))
          ],
        ),
        alignment: Alignment.center,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
          color: Colors.black45,
          child: Text(title,
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.bold)),
        ),
      ),
    );
  }
}
