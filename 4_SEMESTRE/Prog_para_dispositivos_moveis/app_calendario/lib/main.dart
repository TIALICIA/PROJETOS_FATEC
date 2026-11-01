import 'package:device_calendar/device_calendar.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

void main() {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: TelaCompromissos(),
    ),
  );
}

class TelaCompromissos extends StatefulWidget {
  const TelaCompromissos({super.key});

  @override
  State<TelaCompromissos> createState() => _TelaCompromissosState();
}

class _TelaCompromissosState extends State<TelaCompromissos> {
  final DeviceCalendarPlugin _deviceCalendarPlugin = DeviceCalendarPlugin();

  List<Event> _compromissos = [];
  bool _carregando = false;
  bool _mostrarConfiguracoes = false;
  String _mensagem = 'Pressione o botão para consultar os compromissos.';

  String _formatarDataHora(TZDateTime? dataHora) {
    if (dataHora == null) return 'N/D';
    final formato = DateFormat('dd/MM/yyyy HH:mm');
    return formato.format(dataHora.toLocal());
  }

  Future<void> _carregarCompromissos() async {
    if (_carregando) return;

    setState(() {
      _carregando = true;
      _mostrarConfiguracoes = false;
      _compromissos = [];
      _mensagem = 'Verificando permissão do calendário...';
    });

    try {
      var permissao = await _deviceCalendarPlugin.hasPermissions();
      if (permissao.isSuccess && (permissao.data == false)) {
        permissao = await _deviceCalendarPlugin.requestPermissions();
      }

      if (!mounted) return;

      if (!permissao.isSuccess || permissao.data == false) {
        setState(() {
          _mensagem = 'O acesso ao calendário não foi autorizado. Verifique as configurações.';
          _mostrarConfiguracoes = true;
        });
        return;
      }

      setState(() {
        _mensagem = 'Buscando calendários...';
      });

      final resultCalendarios = await _deviceCalendarPlugin.retrieveCalendars();
      if (!resultCalendarios.isSuccess || resultCalendarios.data == null || resultCalendarios.data!.isEmpty) {
        if (!mounted) return;
        setState(() {
          _mensagem = 'Nenhum calendário encontrado no dispositivo.';
        });
        return;
      }

      final agora = DateTime.now();
      final inicio = DateTime(agora.year, agora.month, agora.day);
      final fim = inicio.add(const Duration(days: 7));

      final List<Event> todosCompromissos = [];

      for (final calendario in resultCalendarios.data!) {
        if (calendario.id != null) {
          final resultEventos = await _deviceCalendarPlugin.retrieveEvents(
            calendario.id,
            RetrieveEventsParams(startDate: inicio, endDate: fim),
          );

          if (resultEventos.isSuccess && resultEventos.data != null) {
            todosCompromissos.addAll(resultEventos.data!);
          }
        }
      }

      if (!mounted) return;

      todosCompromissos.sort((a, b) {
        final startA = a.start ?? TZDateTime.now(getLocation('UTC'));
        final startB = b.start ?? TZDateTime.now(getLocation('UTC'));
        return startA.compareTo(startB);
      });

      setState(() {
        _compromissos = todosCompromissos;
        if (todosCompromissos.isEmpty) {
          _mensagem = 'Nenhum compromisso encontrado para os próximos 7 dias.';
        } else {
          _mensagem = '${todosCompromissos.length} compromisso(s) encontrado(s).';
        }
      });
    } catch (erro) {
      if (!mounted) return;
      setState(() {
        _mensagem = 'Ocorreu uma falha ao consultar os compromissos.';
      });
    } finally {
      if (mounted) {
        setState(() {
          _carregando = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Compromissos do Calendário'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton.icon(
              onPressed: _carregando ? null : _carregarCompromissos,
              icon: const Icon(Icons.calendar_month),
              label: const Text('Consultar compromissos'),
            ),
            const SizedBox(height: 12),
            Text(_mensagem),
            if (_mostrarConfiguracoes) ...[
              const SizedBox(height: 8),
              OutlinedButton(
                onPressed: () => _deviceCalendarPlugin.requestPermissions(),
                child: const Text('Solicitar Permissão Novamente'),
              ),
            ],
            const SizedBox(height: 16),
            Expanded(
              child: _carregando
                  ? const Center(child: CircularProgressIndicator())
                  : ListView.builder(
                      itemCount: _compromissos.length,
                      itemBuilder: (context, index) {
                        final evento = _compromissos[index];
                        final ehDiaInteiro = evento.allDay ?? false;

                        return Card(
                          margin: const EdgeInsets.symmetric(vertical: 6),
                          child: Padding(
                            padding: const EdgeInsets.all(12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        evento.title ?? 'Sem título',
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                        ),
                                      ),
                                    ),
                                    if (ehDiaInteiro)
                                      const Chip(
                                        label: Text('Dia inteiro'),
                                        backgroundColor: Colors.blueAccent,
                                        labelStyle: TextStyle(color: Colors.white),
                                      ),
                                  ],
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  'Início: ${ehDiaInteiro ? DateFormat('dd/MM/yyyy').format(evento.start!.toLocal()) : _formatarDataHora(evento.start)}',
                                ),
                                Text(
                                  'Fim: ${ehDiaInteiro ? DateFormat('dd/MM/yyyy').format(evento.end!.toLocal()) : _formatarDataHora(evento.end)}',
                                ),
                                if (evento.location != null && evento.location!.trim().isNotEmpty) ...[
                                  const SizedBox(height: 4),
                                  Text('Local: ${evento.location}'),
                                ],
                                if (evento.description != null && evento.description!.trim().isNotEmpty) ...[
                                  const SizedBox(height: 4),
                                  Text(
                                    'Descrição: ${evento.description}',
                                    style: TextStyle(color: Colors.grey.shade700),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}