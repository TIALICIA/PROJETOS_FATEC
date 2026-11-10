
import 'package:flutter_test/flutter_test.dart';
import 'package:previsao_tempo_cptec/main.dart';

void main() {
  testWidgets('Aplicativo inicia corretamente', (WidgetTester tester) async {
    await tester.pumpWidget(const PrevisaoTempoApp());

    expect(find.byType(PrevisaoTempoApp), findsOneWidget);
  });
}
