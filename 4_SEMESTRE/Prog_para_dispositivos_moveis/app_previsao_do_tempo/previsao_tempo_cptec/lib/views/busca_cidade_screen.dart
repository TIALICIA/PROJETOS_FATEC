import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/clima_model.dart';
import '../services/cptec_service.dart';
import 'detalhes_previsao_screen.dart';

class BuscaCidadeScreen extends StatefulWidget {
  const BuscaCidadeScreen({super.key});

  @override
  State<BuscaCidadeScreen> createState() => _BuscaCidadeScreenState();
}

class _BuscaCidadeScreenState extends State<BuscaCidadeScreen> {
  final TextEditingController _controller = TextEditingController();
  final CptecService _service = CptecService();
  
  List<Cidade> _cidades = [];
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _carregarUltimaCidade();
  }

  // Persistência local: recupera a última cidade salva ao abrir o app
  Future<void> _carregarUltimaCidade() async {
    final prefs = await SharedPreferences.getInstance();
    final id = prefs.getString('ultima_cidade_id');
    final nome = prefs.getString('ultima_cidade_nome');
    final uf = prefs.getString('ultima_cidade_uf');

    if (id != null && nome != null && uf != null && mounted) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => DetalhesPrevisaoScreen(
            cidade: Cidade(id: id, nome: nome, uf: uf),
          ),
        ),
      );
    }
  }

  // Salva a cidade selecionada no dispositivo
  Future<void> _salvarCidadeLocal(Cidade cidade) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('ultima_cidade_id', cidade.id);
    await prefs.setString('ultima_cidade_nome', cidade.nome);
    await prefs.setString('ultima_cidade_uf', cidade.uf);
  }

  void _pesquisar() async {
    final termo = _controller.text.trim();
    if (termo.isEmpty) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _cidades = [];
    });

    try {
      final resultados = await _service.buscarCidades(termo);
      setState(() {
        _cidades = resultados;
        if (resultados.isEmpty) {
          _errorMessage = 'Nenhuma cidade encontrada para "$termo".';
        }
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Falha na conexão ou serviço indisponível. Tente novamente.';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _selecionarCidade(Cidade cidade) {
    _salvarCidadeLocal(cidade);
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetalhesPrevisaoScreen(cidade: cidade),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Previsão do Tempo CPTEC'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      labelText: 'Informe a cidade',
                      border: OutlineInputBorder(),
                      suffixIcon: Icon(Icons.location_city),
                    ),
                    onSubmitted: (_) => _pesquisar(),
                  ),
                ),
                const SizedBox(width: 8.0),
                ElevatedButton(
                  onPressed: _isLoading ? null : _pesquisar,
                  child: const Text('Buscar'),
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            if (_isLoading)
              const Center(child: CircularProgressIndicator())
            else if (_errorMessage != null)
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  _errorMessage!,
                  style: const TextStyle(color: Colors.red, fontSize: 16),
                  textAlign: TextAlign.center,
                ),
              )
            else
              Expanded(
                child: ListView.builder(
                  itemCount: _cidades.length,
                  itemBuilder: (context, index) {
                    final cidade = _cidades[index];
                    return Card(
                      child: ListTile(
                        title: Text(cidade.nome),
                        subtitle: Text('UF: ${cidade.uf} (ID: ${cidade.id})'),
                        trailing: const Icon(Icons.arrow_forward_ios),
                        onTap: () => _selecionarCidade(cidade),
                      ),
                    );
                  },
                ),
              ),
            const Text(
              'Fonte dos dados: CPTEC / INPE',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}