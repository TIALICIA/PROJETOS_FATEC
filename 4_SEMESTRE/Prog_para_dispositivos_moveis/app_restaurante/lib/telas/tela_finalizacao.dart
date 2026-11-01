import 'package:flutter/material.dart';
import '../models/item_cardapio.dart';
import '../utils/formatar_valor.dart';
import 'tela_prato_principal.dart';

class TelaFinalizacao extends StatelessWidget {
  final ItemCardapio prato;
  final ItemCardapio bebida;
  final ItemCardapio sobremesa;
  final String formaPagamento;

  const TelaFinalizacao({
    super.key,
    required this.prato,
    required this.bebida,
    required this.sobremesa,
    required this.formaPagamento,
  });

  double get valorTotal => prato.valor + bebida.valor + sobremesa.valor;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return PopScope(
      canPop: false,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('5. Resumo do Pedido', style: TextStyle(fontWeight: FontWeight.bold)),
          automaticallyImplyLeading: false,
          centerTitle: true,
        ),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      const Icon(Icons.task_alt, size: 64, color: Colors.green),
                      const SizedBox(height: 12),
                      Text(
                        'Pedido Confirmado!',
                        style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                      ),
                      const Divider(height: 32),
                      _LinhaResumo(label: 'Prato Principal', item: prato),
                      const SizedBox(height: 8),
                      _LinhaResumo(label: 'Bebida', item: bebida),
                      const SizedBox(height: 8),
                      _LinhaResumo(label: 'Sobremesa', item: sobremesa),
                      const Divider(height: 32),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Forma de Pagamento:', style: TextStyle(fontSize: 16)),
                          Chip(label: Text(formaPagamento)),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primaryContainer,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Total a Pagar',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: theme.colorScheme.onPrimaryContainer,
                              ),
                            ),
                            Text(
                              formatarValor(valorTotal),
                              style: TextStyle(
                                fontSize: 22,
                                fontWeight: FontWeight.bold,
                                color: theme.colorScheme.onPrimaryContainer,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: theme.colorScheme.primary,
                    foregroundColor: theme.colorScheme.onPrimary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: () {
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (context) => const TelaPratoPrincipal()),
                      (route) => false,
                    );
                  },
                  icon: const Icon(Icons.refresh),
                  label: const Text('Fazer Novo Pedido', style: TextStyle(fontSize: 16)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _LinhaResumo extends StatelessWidget {
  final String label;
  final ItemCardapio item;

  const _LinhaResumo({required this.label, required this.item});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
              Text(item.nome, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
        Text(formatarValor(item.valor), style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
      ],
    );
  }
}