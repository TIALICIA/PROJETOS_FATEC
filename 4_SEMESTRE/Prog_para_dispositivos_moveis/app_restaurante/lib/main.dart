import 'package:flutter/material.dart';
import 'telas/tela_prato_principal.dart';

void main() {
  runApp(const AppRestaurante());
}

class AppRestaurante extends StatelessWidget {
  const AppRestaurante({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pedido de Restaurante',
      themeMode: ThemeMode.system,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF5722),
          brightness: Brightness.light,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF5722),
          brightness: Brightness.dark,
        ),
      ),
      home: const TelaPratoPrincipal(),
    );
  }
}