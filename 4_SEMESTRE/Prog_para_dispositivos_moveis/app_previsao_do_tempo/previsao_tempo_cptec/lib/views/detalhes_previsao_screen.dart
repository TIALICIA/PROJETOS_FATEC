import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../models/clima_model.dart';
import '../services/cptec_service.dart';

class DetalhesPrevisaoScreen extends StatefulWidget {
  final Cidade cidade;

  const DetalhesPrevisaoScreen({super.key, required this.cidade});

  @override
  State<DetalhesPrevisaoScreen> createState() => _DetalhesPrevisaoScreenState();
}

class _DetalhesPrevisaoScreenState extends State<DetalhesPrevisaoScreen> {
  final CptecService _service = CptecService();
  
  bool _isLoading = true;
  String? _errorMessage;
  String _atualizacao = '';
  List<PrevisaoDia> _previsoes = [];

  @override
  void initState() {
    super.initState();
    _carregarPrevisao();
  }

  Future<void> _carregarPrevisao() async {
  setState(() {
    _isLoading = true;
    _errorMessage = null;
  });

  try {
    final dados = await _service.buscarPrevisao(widget.cidade.id);
    if (!mounted) return;
    setState(() {
      _atualizacao = dados.atualizacao;
      _previsoes = dados.dias;
      _isLoading = false;
    });
  } catch (e) {
    if (!mounted) return;
    setState(() {
      _errorMessage = 'Não foi possível carregar a previsão para esta localidade.';
      _isLoading = false;
    });
  }
}

  IconData _obterIconeClima(String sigla) {
    switch (sigla) {
      case 'e': return Icons.wb_sunny;
      case 'n': return Icons.cloud;
      case 'pn': return Icons.cloud_queue;
      case 'c':
      case 'pc':
      case 'ci': return Icons.grain;
      default: return Icons.wb_cloudy;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.cidade.nome} - ${widget.cidade.uf}'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Atualizar Previsão',
            onPressed: _carregarPrevisao,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
                      ElevatedButton(
                        onPressed: _carregarPrevisao,
                        child: const Text('Tentar Novamente'),
                      ),
                    ],
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Última atualização: $_atualizacao',
                        style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
                      ),
                      const SizedBox(height: 16.0),
                      
                      // Gráfico de Temperaturas
                      if (_previsoes.isNotEmpty) ...[
                        const Text(
                          'Variação de Temperatura (°C)',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 12.0),
                        SizedBox(
                          height: 200,
                          child: LineChart(_construirGrafico()),
                        ),
                        const SizedBox(height: 24.0),
                      ],

                      // Lista de Previsões por dia
                      const Text(
                        'Previsão para 4 dias',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8.0),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: _previsoes.length,
                        itemBuilder: (context, index) {
                          final prev = _previsoes[index];
                          return Card(
                            margin: const EdgeInsets.symmetric(vertical: 6.0),
                            child: ListTile(
                              leading: Icon(
                                _obterIconeClima(prev.tempo),
                                color: Colors.amber[700],
                                size: 36,
                              ),
                              title: Text('Dia: ${prev.dia}'),
                              subtitle: Text('${prev.descricaoTempo} | IUV: ${prev.iuv}'),
                              trailing: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text('Máx: ${prev.max}°C', style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                                  Text('Mín: ${prev.min}°C', style: const TextStyle(color: Colors.blue, fontWeight: FontWeight.bold)),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 16.0),
                      const Center(
                        child: Text(
                          'Fonte: CPTEC/INPE',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }

  // Configuração simplificada e segura do fl_chart
  LineChartData _construirGrafico() {
    List<FlSpot> spotsMax = [];
    List<FlSpot> spotsMin = [];

    for (int i = 0; i < _previsoes.length; i++) {
      spotsMax.add(FlSpot(i.toDouble(), double.tryParse(_previsoes[i].max) ?? 0));
      spotsMin.add(FlSpot(i.toDouble(), double.tryParse(_previsoes[i].min) ?? 0));
    }

    return LineChartData(
      gridData: const FlGridData(show: true),
      titlesData: const FlTitlesData(
        topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
      ),
      borderData: FlBorderData(show: true),
      lineBarsData: [
        LineChartBarData(
          spots: spotsMax,
          isCurved: true,
          color: Colors.red,
          barWidth: 3,
          dotData: const FlDotData(show: true),
        ),
        LineChartBarData(
          spots: spotsMin,
          isCurved: true,
          color: Colors.blue,
          barWidth: 3,
          dotData: const FlDotData(show: true),
        ),
      ],
    );
  }
}