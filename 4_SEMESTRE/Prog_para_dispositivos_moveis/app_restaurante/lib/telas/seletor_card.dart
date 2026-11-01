import 'package:flutter/material.dart';

class SeletorCard extends StatelessWidget {
  final String titulo;
  final String? subtitulo;
  final IconData icone;
  final bool selecionado;
  final VoidCallback onTap;

  const SeletorCard({
    super.key,
    required this.titulo,
    this.subtitulo,
    required this.icone,
    required this.selecionado,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final activeColor = theme.colorScheme.primary;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      margin: const EdgeInsets.symmetric(vertical: 6),
      child: Material(
        color: selecionado ? activeColor.withAlpha(25) : theme.cardColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(
            color: selecionado ? activeColor : theme.dividerColor.withAlpha(50),
            width: selecionado ? 2 : 1,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: ListTile(
          onTap: onTap,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          leading: CircleAvatar(
            backgroundColor: selecionado ? activeColor : theme.colorScheme.surfaceContainerHighest,
            foregroundColor: selecionado ? theme.colorScheme.onPrimary : theme.colorScheme.onSurface,
            child: Icon(icone),
          ),
          title: Text(
            titulo,
            style: TextStyle(
              fontWeight: selecionado ? FontWeight.bold : FontWeight.normal,
              color: selecionado ? activeColor : theme.textTheme.bodyLarge?.color,
            ),
          ),
          subtitle: subtitulo != null
              ? Text(
                  subtitulo!,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: selecionado ? activeColor : theme.textTheme.bodyMedium?.color,
                  ),
                )
              : null,
          trailing: Icon(
            selecionado ? Icons.check_circle : Icons.radio_button_unchecked,
            color: selecionado ? activeColor : theme.disabledColor,
          ),
        ),
      ),
    );
  }
}