import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:xml/xml.dart' as xml;
import '../models/clima_model.dart';

class CptecService {
  static const String _rawBaseUrl = 'http://servicos.cptec.inpe.br/XML';

  // Buscar lista de cidades
  Future<List<Cidade>> buscarCidades(String nome) async {
    final url = kIsWeb
        ? 'https://corsproxy.io/?${Uri.encodeComponent('$_rawBaseUrl/listaCidades?city=$nome')}'
        : '$_rawBaseUrl/listaCidades?city=$nome';

    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final decodedBody = latin1.decode(response.bodyBytes);
      final document = xml.XmlDocument.parse(decodedBody);
      final cidadesXml = document.findAllElements('cidade');

      return cidadesXml.map((node) {
        return Cidade(
          id: node.findElements('id').single.innerText,
          nome: node.findElements('nome').single.innerText,
          uf: node.findElements('uf').single.innerText,
        );
      }).toList();
    } else {
      throw Exception('Falha ao conectar com o serviço CPTEC/INPE');
    }
  }

  // Buscar previsão da cidade por ID
  Future<Previsao> buscarPrevisao(String idCidade) async {
    final url = kIsWeb
        ? 'https://corsproxy.io/?${Uri.encodeComponent('$_rawBaseUrl/cidade/$idCidade/previsao.xml')}'
        : '$_rawBaseUrl/cidade/$idCidade/previsao.xml';

    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final decodedBody = latin1.decode(response.bodyBytes);
      final document = xml.XmlDocument.parse(decodedBody);
      final cidadeNode = document.findElements('cidade').first;

      String atualizacao = cidadeNode.findElements('atualizacao').isNotEmpty
          ? cidadeNode.findElements('atualizacao').single.innerText
          : 'Sem data';

            List<PrevisaoDia> previsoes =
          cidadeNode.findElements('previsao').map((node) {
        return PrevisaoDia(
          dia: node.findElements('dia').single.innerText,
          tempo: node.findElements('tempo').single.innerText,
          max: node.findElements('maxima').single.innerText,
          min: node.findElements('minima').single.innerText,
          iuv: node.findElements('iuv').single.innerText,
        );
      }).toList();

     return Previsao(atualizacao: atualizacao, dias: previsoes);
    } else {
      throw Exception('Falha ao conectar com o serviço CPTEC/INPE');
    }
  }
}