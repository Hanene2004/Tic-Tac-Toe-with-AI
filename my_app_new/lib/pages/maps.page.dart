import 'package:flutter/material.dart';
import '../menu/drawer.widget.dart';

class MapsPage extends StatelessWidget {
  const MapsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const MyDrawer(),
      appBar: AppBar(
        title: const Text('Maps'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Center(
        child: const Text(
          'Page Maps',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}