import 'package:flutter_test/flutter_test.dart';
import 'package:app_restaurante/main.dart';

void main() {
  testWidgets('Teste inicial', (WidgetTester tester) async {
    await tester.pumpWidget(const AppRestaurante());
    expect(find.text('1. Prato Principal'), findsOneWidget);
  });
}