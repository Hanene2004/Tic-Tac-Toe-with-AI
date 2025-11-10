import 'package:flutter/material.dart';
import 'pages/home.page.dart';
import 'pages/meteo.page.dart';
import 'pages/maps.page.dart';
import 'pages/contacts.page.dart';
import 'pages/messenger.page.dart';
import 'pages/chatbot.page.dart';
import 'pages/parametres.page.dart';
import 'pages/authentification.page.dart';
import 'pages/inscription.page.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  // rendu testable : le test appelle MyApp(isLoggedIn: ...)
  final bool isLoggedIn;
  const MyApp({super.key, this.isLoggedIn = false});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.deepPurple, useMaterial3: true),
      // initialRoute dépend de isLoggedIn ; tests peuvent forcer via constructeur
      initialRoute: isLoggedIn ? '/home' : '/inscription',
      routes: {
        '/home': (context) => const HomePage(),
        '/meteo': (context) => MeteoPage(),
        '/maps': (context) => const MapsPage(),
        '/contacts': (context) => const ContactsPage(),
        '/messenger': (context) => const MessengerPage(),
        '/chatbot': (context) => const ChatBotPage(),
        '/parametres': (context) => const ParametresPage(),
        '/authentification': (context) => const AuthentificationPage(),
        '/inscription': (context) => const InscriptionPage(),
      },
    );
  }
}
