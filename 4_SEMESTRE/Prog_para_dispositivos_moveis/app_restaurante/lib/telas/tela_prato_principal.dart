import 'package:flutter/material.dart';
import '../models/item_cardapio.dart';
import '../utils/formatar_valor.dart';
import 'seletor_card.dart';
import 'tela_bebida.dart';

class TelaPratoPrincipal extends StatefulWidget {
  final ItemCardapio? pratoSelecionado;

  const TelaPratoPrincipal({super.key, this.pratoSelecionado});

  @override
  State<TelaPratoPrincipal> createState() => _TelaPratoPrincipalState();
}

class _TelaPratoPrincipalState extends State<TelaPratoPrincipal> {
  final List<ItemCardapio> pratos = const [
    ItemCardapio('Strogonoff de Frango', 28.90, Icons.dinner_dining),
    ItemCardapio('Feijoada Completa', 35.00, Icons.rice_bowl),
    ItemCardapio('Lasanha à Bolonhesa', 32.50, Icons.local_pizza),
    ItemCardapio('Salada Caesar com Grelhado', 24.00, Icons.ramen_dining),
  ];

  ItemCardapio? selecionado;

  @override
  void initState() {
    super.initState();
    selecionado = widget.pratoSelecionado;
  }

  void avancar() {
    if (selecionado == null) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TelaBebida(prato: selecionado!),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('1. Prato Principal', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: pratos.length,
                itemBuilder: (context, index) {
                  final item = pratos[index];
                  return SeletorCard(
                    titulo: item.nome,
                    subtitulo: formatarValor(item.valor),
                    icone: item.icone,
                    selecionado: selecionado == item,
                    onTap: () => setState(() => selecionado = item),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: selecionado != null ? avancar : null,
                icon: const Icon(Icons.arrow_forward),
                label: const Text('Próximo (Bebidas)', style: TextStyle(fontSize: 16)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}