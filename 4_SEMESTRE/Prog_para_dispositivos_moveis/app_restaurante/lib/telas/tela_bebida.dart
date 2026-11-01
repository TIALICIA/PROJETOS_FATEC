import 'package:flutter/material.dart';
import '../models/item_cardapio.dart';
import '../utils/formatar_valor.dart';
import 'seletor_card.dart';
import 'tela_sobremesa.dart';

class TelaBebida extends StatefulWidget {
  final ItemCardapio prato;
  final ItemCardapio? bebidaSelecionada;

  const TelaBebida({
    super.key,
    required this.prato,
    this.bebidaSelecionada,
  });

  @override
  State<TelaBebida> createState() => _TelaBebidaState();
}

class _TelaBebidaState extends State<TelaBebida> {
  final List<ItemCardapio> bebidas = const [
    ItemCardapio('Refrigerante Lata', 6.00, Icons.local_drink),
    ItemCardapio('Suco Natural 500ml', 9.50, Icons.local_cafe),
    ItemCardapio('Água Mineral', 4.00, Icons.water_drop),
    ItemCardapio('Chá Gelado', 7.00, Icons.emoji_food_beverage),
  ];

  ItemCardapio? selecionado;

  @override
  void initState() {
    super.initState();
    selecionado = widget.bebidaSelecionada;
  }

  void avancar() {
    if (selecionado == null) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TelaSobremesa(
          prato: widget.prato,
          bebida: selecionado!,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('2. Bebida', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: bebidas.length,
                itemBuilder: (context, index) {
                  final item = bebidas[index];
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
                Expanded(
                  child: SizedBox(
                    height: 52,
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Voltar'),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 2,
                  child: SizedBox(
                    height: 52,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: selecionado != null ? avancar : null,
                      icon: const Icon(Icons.arrow_forward),
                      label: const Text('Próximo (Sobremesa)'),
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