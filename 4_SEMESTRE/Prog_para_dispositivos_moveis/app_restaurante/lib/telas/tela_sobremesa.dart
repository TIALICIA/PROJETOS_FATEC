import 'package:flutter/material.dart';
import '../models/item_cardapio.dart';
import '../utils/formatar_valor.dart';
import 'seletor_card.dart';
import 'tela_pagamento.dart';

class TelaSobremesa extends StatefulWidget {
  final ItemCardapio prato;
  final ItemCardapio bebida;
  final ItemCardapio? sobremesaSelecionada;

  const TelaSobremesa({
    super.key,
    required this.prato,
    required this.bebida,
    this.sobremesaSelecionada,
  });

  @override
  State<TelaSobremesa> createState() => _TelaSobremesaState();
}

class _TelaSobremesaState extends State<TelaSobremesa> {
  final List<ItemCardapio> sobremesas = const [
    ItemCardapio('Pudim de Leite Condensado', 8.50, Icons.cake),
    ItemCardapio('Petit Gâteau', 16.00, Icons.icecream),
    ItemCardapio('Sorvete (2 bolas)', 10.00, Icons.bakery_dining),
    ItemCardapio('Fruta da Estação', 5.00, Icons.eco),
  ];

  ItemCardapio? selecionado;

  @override
  void initState() {
    super.initState();
    selecionado = widget.sobremesaSelecionada;
  }

  void avancar() {
    if (selecionado == null) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TelaPagamento(
          prato: widget.prato,
          bebida: widget.bebida,
          sobremesa: selecionado!,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('3. Sobremesa', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: sobremesas.length,
                itemBuilder: (context, index) {
                  final item = sobremesas[index];
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
            Row(
              children: [
                IconButton.outlined(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.arrow_back),
                  tooltip: 'Voltar',
                ),
                const SizedBox(width: 8),
                IconButton.outlined(
                  onPressed: () => Navigator.popUntil(context, (r) => r.isFirst),
                  icon: const Icon(Icons.home),
                  tooltip: 'Ir ao Início',
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: SizedBox(
                    height: 52,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: selecionado != null ? avancar : null,
                      icon: const Icon(Icons.arrow_forward),
                      label: const Text('Pagamento'),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}