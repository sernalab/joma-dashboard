# Diseños de Measurement Cards

Este proyecto incluye 4 diseños diferentes para las cards de medición. Para cambiar entre ellos:

1. Abre `/src/components/dashboard/MeasurementCard.vue`
2. Comenta el diseño actual
3. Descomenta el diseño que quieras usar

## DISEÑO 1 - Minimalista (Activo)
- Valor grande y prominente en el centro
- Icono pequeño en la esquina superior
- Tendencia debajo del valor
- Botón "Ver detalles" integrado

## DISEÑO 2 - Header con valor
- Valor grande en el header con fondo gris
- Badge de tendencia junto al valor
- Icono en caja blanca a la derecha
- Título y descripción en el cuerpo

## DISEÑO 3 - Widget horizontal
- Layout horizontal en una línea
- Icono grande a la izquierda
- Título con subtítulo "Última medición"
- Valor y tendencia a la derecha
- Flecha indicadora de acción

## DISEÑO 4 - Lista compacta
- Diseño muy compacto tipo lista
- Icono en badge de color
- Título con valor y tendencia en línea
- Separador visual "•" entre elementos
- Chevron a la derecha

### Para cambiar de diseño:

1. En el template, comenta el bloque actual:
```vue
<!-- DISEÑO 1 -->
<!--
<Card>
  ...
</Card>
-->
```

2. Descomenta el diseño deseado:
```vue
<!-- DISEÑO 3 -->
<Card>
  ...
</Card>
```

3. Los estilos CSS ya están incluidos para todos los diseños