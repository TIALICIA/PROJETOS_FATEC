import 'package:flutter/material.dart';
import '../models/item_cardapio.dart';
import 'seletor_card.dart';
import 'tela_finalizacao.dart';

class TelaPagamento extends StatefulWidget {
  final ItemCardapio prato;
  final ItemCardapio bebida;
  final ItemCardapio sobremesa;
  final String? pagamentoSelecionado;

  const TelaPagamento({
    super.key,
    required this.prato,
    required this.bebida,
    required this.sobremesa,
    this.pagamentoSelecionado,
  });

  @override
  State<TelaPagamento> createState() => _TelaPagamentoState();
}

class FormaPagamentoItem {
  final String nome;
  final IconData icone;

  const FormaPagamentoItem(this.nome, this.icone);
}

class _TelaPagamentoState extends State<TelaPagamento> {
  final List<FormaPagamentoItem> formasPagamento = const [
    FormaPagamentoItem('Pix', Icons.pix),
    FormaPagamentoItem('Cartão de crédito', Icons.credit_card),
    FormaPagamentoItem('Cartão de débito', Icons.credit_score),
    FormaPagamentoItem('Dinheiro', Icons.attach_money),
  ];

  String? selecionado;

  @override
  void initState() {
    super.initState();
    selecionado = widget.pagamentoSelecionado;
  }

  void avancar() {
    if (selecionado == null) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TelaFinalizacao(
          prato: widget.prato,
          bebida: widget.bebida,
          sobremesa: widget.sobremesa,
          formaPagamento: selecionado!,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('4. Forma de Pagamento', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: formasPagamento.length,
                itemBuilder: (context, index) {
                  final opcao = formasPagamento[index];
                  return SeletorCard(
                    titulo: opcao.nome,
                    icone: opcao.icone,
                    selecionado: selecionado == opcao.nome,
                    onTap: () => setState(() => selecionado = opcao.nome),
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
                      icon: const Icon(Icons.check_circle_outline),
                      label: const Text('Finalizar Pedido'),
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