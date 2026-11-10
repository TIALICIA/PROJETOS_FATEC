
import 'package:flutter/material.dart';
import 'views/busca_cidade_screen.dart';

void main() {
  runApp(const PrevisaoTempoApp());
}

class PrevisaoTempoApp extends StatelessWidget {
  const PrevisaoTempoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: BuscaCidadeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
