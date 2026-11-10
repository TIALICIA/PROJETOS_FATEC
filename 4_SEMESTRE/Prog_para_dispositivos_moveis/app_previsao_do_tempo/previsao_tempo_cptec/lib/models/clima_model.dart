class Cidade {
  final String id;
  final String nome;
  final String uf;

  Cidade({required this.id, required this.nome, required this.uf});
}

class PrevisaoDia {
  final String dia;
  final String tempo;
  final String min;
  final String max;
  final String iuv;

  PrevisaoDia({
    required this.dia,
    required this.tempo,
    required this.min,
    required this.max,
    required this.iuv,
  });

  // Tradução das siglas do CPTEC
  String get descricaoTempo {
    switch (tempo) {
      case 'e': return 'Ensolarado';
      case 'n': return 'Nublado';
      case 'pn': return 'Parcialmente Nublado';
      case 'c': return 'Chuvoso';
      case 'pc': return 'Pancadas de Chuva';
      case 'ci': return 'Chuvas Isoladas';
      case 'ec': return 'Ensolarado com Nuvens';
      default: return 'Variável / Outro';
    }
  }
}

class Previsao {
  final String atualizacao;
  final List<PrevisaoDia> dias;

  Previsao({required this.atualizacao, required this.dias});
}