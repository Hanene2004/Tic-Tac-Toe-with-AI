import 'package:flutter/material.dart';
import '../menu/drawer.widget.dart';
import 'meteo-details.page.dart';

class MeteoPage extends StatelessWidget {
  final TextEditingController txt_ville = TextEditingController();

  MeteoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MyDrawer(),
        appBar: AppBar(
          title: const Text('Météo'),
        ),
        body: Column(
          children: [
            Container(
              padding: EdgeInsets.all(10),
              child: TextFormField(
                  controller: txt_ville,
                  decoration: InputDecoration(
                      prefixIcon: Icon(Icons.location_city),
                      hintText: "Ville",
                      border: OutlineInputBorder(
                          borderSide: BorderSide(width: 1),
                          borderRadius: BorderRadius.circular(10)))),
            ),
            Container(
                padding: EdgeInsets.all(10),
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        minimumSize: const Size.fromHeight(50)),
                    onPressed: () {
                      _onGetMeteoDetails(context);
                    },
                    child: Text('Chercher', style: TextStyle(fontSize: 22)))),
          ],
        ));
  }

  void _onGetMeteoDetails(BuildContext context) {
    String ville = txt_ville.text;
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => MeteoDetailsPage(ville)));
    txt_ville.text = "";
  }
}
